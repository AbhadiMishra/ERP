import { findCollection } from "./db_connection.js";
import User from "./schema.js";
import { createHash } from "crypto";

// 1. signUp function to post data in the database
let idCounter = 0;
export async function signUp(data, collectionName, databaseName) {
    const collection = await findCollection(collectionName, databaseName);

    // email uniqueness check (only if email exists)
    if (data.email) {
        const existing = await collection.findOne({ email: data.email });
        if (existing) {
            throw new Error("Record already exists");
        }
    }
    console.log(data.dob);
    const record =
        collectionName === "users"
            ? new User(
                  data.username,
                  data.email,
                  data.password,
                  data.department,
                  data.dob,
                  idCounter,
              )
            : { ...data, createdAt: new Date() };

    const result = await collection.insertOne(record);

    if (!result.insertedId) {
        throw new Error("Insert failed");
    }
    idCounter++;
    return { message: "Record inserted successfully", id: record._id ?? null };
}

// 2. signIn function to get data from the database

export async function signIn(email, password, collectionName, databaseName) {
    const collection = await findCollection(collectionName, databaseName);

    const hashedPassword = createHash("sha256").update(password).digest("hex");

    const record = await collection.findOne({
        email,
        password: hashedPassword,
    });

    if (!record) {
        throw new Error("Invalid credentials");
    }

    return {
        message: "Login successful",
        id: record._Id,
        username: record.username,
    };
}

// 3. updateRecord to update the record

export async function updateRecord(
    filter,
    updates,
    collectionName,
    databaseName,
) {
    const collection = await findCollection(collectionName, databaseName);

    if (updates.password) {
        updates.password = createHash("sha256")
            .update(updates.password)
            .digest("hex");
    }

    const result = await collection.updateOne(filter, { $set: updates });

    if (result.matchedCount === 0) {
        throw new Error("Record not found");
    }

    return { message: "Record updated" };
}

// 4. deleteRecord to delete a record

export async function deleteRecord(filter, collectionName, databaseName) {
    const collection = await findCollection(collectionName, databaseName);

    const result = await collection.deleteOne(filter);

    if (result.deletedCount === 0) {
        throw new Error("Record not found");
    }

    return { message: "Record deleted" };
}

// 5. get all user data

export async function getUsers(collectionName, databaseName) {
    const collection = await findCollection(collectionName, databaseName);

    const cursor = await collection.find(); // cursor
    const result = await cursor.toArray(); // ✅ convert to array

    return result;
}
