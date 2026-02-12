import express from "express";
import {
  createRecord,
  login,
  updateAnyRecord,
  deleteAnyRecord,
  getAllUsers,
} from "../database/db_controller.js";

const router = express.Router();

/*
  Route params:
  :db         -> database name (SchoolDB / CompanyDB)
  :collection -> collection name (users / students / employees)
*/


router.post("/:db/:collection", createRecord);


router.post("/:db/:collection/login", login);


router.put("/:db/:collection/:email", updateAnyRecord);


router.delete("/:db/:collection/:email", deleteAnyRecord);

router.get("/:db/:collection/records", getAllUsers)

export default router;