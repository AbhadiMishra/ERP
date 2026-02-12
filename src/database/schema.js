// user record schema

import { createHash } from "crypto";

class User {
    constructor(username, email, password, department, dob, Id) {
        this.Id = Id;
        this.username = username;
        this.email = email;
        this.password = this.encryptPassword(password);
        this.createdAt = new Date();
        this.dateOfBirth = dob;
        this.department = department;
    }

    encryptPassword(password) {
        return createHash("sha256").update(password).digest("hex");
    }
}

export default User;