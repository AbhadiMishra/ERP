import express from "express";
import {
  createRecord,
  login,
  updateAnyRecord,
  deleteAnyRecord,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/:db/:collection", createRecord);

router.post("/:db/:collection/login", login);

router.put("/:db/:collection/:email", updateAnyRecord);

router.delete("/:db/:collection/:email", deleteAnyRecord);

router.get("/:db/:collection/records", getAllUsers);

export default router;
