import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Login.jsx";
import ForgotPassword from "./ForgotPass.jsx";
import Signup from "./SignUp.jsx";
import DeleteUpdate from "./Delete_Update.jsx";
import Dashboard from "./frontend/Dashboard.jsx";
import Wrapper from "./frontend/Wrapper.jsx";
import { userStore } from "./storeRedux/store.js";
import "./App.css";

export default function App() {
    return (
        <Provider store={userStore}>
            <Routes>
                <Route
                    path="/"
                    element={<Wrapper children={<Login />}></Wrapper>}
                />
                <Route
                    path="/forgot"
                    element={<Wrapper children={<ForgotPassword />}></Wrapper>}
                />
                <Route
                    path="/signup"
                    element={<Wrapper children={<Signup />}></Wrapper>}
                />
                <Route
                    path="/manage"
                    element={<Wrapper children={<DeleteUpdate />}></Wrapper>}
                />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Provider>
    );
}
