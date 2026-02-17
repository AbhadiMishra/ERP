import {
  signUp,
  signIn,
  updateRecord,
  deleteRecord,
  getUsers,
} from "../services/userService.js";

export const createRecord = async (req, res) => {
  try {
    const result = await signUp(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await signIn(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const updateAnyRecord = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await updateRecord(email, req.body);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const deleteAnyRecord = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await deleteRecord(email);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await getUsers();
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
