import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Async thunks for API calls

// Login user
export const loginUser = createAsyncThunk(
    "user/login",
    async ({ email, password, loginType }, { rejectWithValue }) => {
        try {
            const db = "schoolDB";
            const collection = loginType === "employee" ? "users" : "students";

            const response = await axios.post(
                `${BASE_URL}/${db}/${collection}/login`,
                { email, password }
            );

            return {
                ...response.data,
                email,
                loginType,
                collection,
                role: response.data.role, // Store the user's role
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.error || "Login failed"
            );
        }
    }
);

// Signup user
export const signupUser = createAsyncThunk(
    "user/signup",
    async (userData, { rejectWithValue }) => {
        try {
            const db = "schoolDB";
            const collection = userData.type === "employee" ? "users" : "students";

            const payload =
                userData.type === "employee"
                    ? { ...userData, dob: userData.DOB }
                    : {
                          username: userData.username,
                          email: userData.email,
                          password: userData.password,
                          dob: userData.DOB,
                      };

            const response = await axios.post(
                `${BASE_URL}/${db}/${collection}`,
                payload
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.error || "Signup failed"
            );
        }
    }
);

// Fetch all users
export const fetchUsers = createAsyncThunk(
    "user/fetchAll",
    async ({ collection = "users", db = "schoolDB" }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/${db}/${collection}/records`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.error || "Failed to fetch users"
            );
        }
    }
);

// Update user
export const updateUser = createAsyncThunk(
    "user/update",
    async ({ collection, email, updates }, { rejectWithValue }) => {
        try {
            const db = "schoolDB";
            const response = await axios.put(
                `${BASE_URL}/${db}/${collection}/${email}`,
                updates
            );
            return { email, updates, ...response.data };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.error || "Update failed"
            );
        }
    }
);

// Delete user
export const deleteUser = createAsyncThunk(
    "user/delete",
    async ({ collection, email }, { rejectWithValue }) => {
        try {
            const db = "schoolDB";
            const response = await axios.delete(
                `${BASE_URL}/${db}/${collection}/${email}`
            );
            return { email, ...response.data };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.error || "Delete failed"
            );
        }
    }
);

// User slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        // Current logged-in user
        currentUser: null,
        isAuthenticated: false,
        
        // All users list (for admin/dashboard)
        users: [],
        userCount: 0,
        
        // Loading states
        loading: false,
        actionLoading: false, // For update/delete operations
        
        // Error handling
        error: null,
        actionError: null,
        
        // Success messages
        successMessage: null,
    },
    reducers: {
        // Logout
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.error = null;
            state.successMessage = "Logged out successfully";
        },
        
        // Clear errors
        clearError: (state) => {
            state.error = null;
            state.actionError = null;
        },
        
        // Clear success message
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
        
        // Set current user (useful for persistence)
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = !!action.payload;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.currentUser = action.payload;
                // action.payload now includes role
                state.successMessage = "Login successful";
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            });

        // Signup
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = "Account created successfully";
                state.error = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch Users
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.userCount = action.payload.length;
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Update User
        builder
            .addCase(updateUser.pending, (state) => {
                state.actionLoading = true;
                state.actionError = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.successMessage = "Record updated successfully";
                
                // Update user in the list
                const index = state.users.findIndex(
                    (user) => user.email === action.payload.email
                );
                if (index !== -1) {
                    state.users[index] = {
                        ...state.users[index],
                        ...action.payload.updates,
                    };
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload;
            });

        // Delete User
        builder
            .addCase(deleteUser.pending, (state) => {
                state.actionLoading = true;
                state.actionError = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.successMessage = "Record deleted successfully";
                
                // Remove user from the list
                state.users = state.users.filter(
                    (user) => user.email !== action.payload.email
                );
                state.userCount = state.users.length;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.actionLoading = false;
                state.actionError = action.payload;
            });
    },
});

export const { logout, clearError, clearSuccessMessage, setCurrentUser } =
    userSlice.actions;

export default userSlice.reducer;
