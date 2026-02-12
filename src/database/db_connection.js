import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");

let db;

const DB_NAME = "schoolDB";
const Coll_name = "users";

// exporting connectDB use it elsewhere for getting database
export async function connectDB(dbname = DB_NAME) {
    try {
        if (!db) {
            await client.connect();
            db = client.db(dbname);
            console.log("MongoDB driver Connected.");
        }
        return db;
    } catch (err) {
        console.error("MongoDB Connection failed: ", err);
        process.exit(1);
    }
}

export async function findCollection(coll_name = Coll_name, db_name = DB_NAME) {
    try {
        const db = await connectDB(db_name);
        const collection = await db.collection(coll_name);
        return collection;
    } catch (err) {
        console.error("Collection initialization failed: ", err);
    }
}