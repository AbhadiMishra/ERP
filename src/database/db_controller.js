import { stepButtonClasses } from "@mui/material";
import { signUp, signIn, updateRecord, deleteRecord, getUsers } from "./db_provider.js";

/*
  IMPORTANT SECURITY NOTE:
  Never trust raw db/collection names from users.
  We whitelist allowed databases & collections.
*/

const ALLOWED_DATABASES = ["schoolDB"];
const ALLOWED_COLLECTIONS = ["users", "students", "employees"];

function validateSource(db, collection) {
    if (!ALLOWED_DATABASES.includes(db)) {
        throw new Error("Invalid database");
    }
    if (!ALLOWED_COLLECTIONS.includes(collection)) {
        throw new Error("Invalid collection");
    }
}

export async function createRecord(req, res) {
    try {
        const { db, collection } = req.params;

        validateSource(db, collection);

        const result = await signUp(req.body, collection, db);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function login(req, res) {
    try {
        const { db, collection } = req.params;
        const { email, password } = req.body;

        validateSource(db, collection);

        if (collection !== "users") {
            return res
                .status(400)
                .json({ error: "Login allowed only for users" });
        }

        const result = await signIn(email, password, collection, db);

        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

export async function updateAnyRecord(req, res) {
    try {
        const { db, collection, email } = req.params;

        validateSource(db, collection);

        const result = await updateRecord(
            { email: email },
            req.body,
            collection,
            db,
        );

        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export async function deleteAnyRecord(req, res) {
    try {
        const { db, collection, email } = req.params;

        validateSource(db, collection);

        const result = await deleteRecord({email: email}, collection, db);

        res.json(result);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export async function getAllUsers(req, res) {
    try{
        const { db, collection } = req.params;

        validateSource(db, collection);

        const result = await getUsers(collection, db);
        // console.log(result)
        res.json(result);

    } catch(err){

        res.status(404).json({error: err.message})
    }
}