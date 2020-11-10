import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { create } from "https://deno.land/x/djwt/mod.ts"

import { User } from "../types.ts";
import { runQuery } from "../db.ts";

// @desc    Index all of the users in the database
// @route   GET /users/index
export const indexUsers = async ({ response }) => {
    const users = await runQuery("SELECT id, username, email, created_at, updated_at FROM users;");
    
    if(!users.length) {
        response.status = 400;
        response.body = { 
            success: false, 
            data: "No user has been registered." 
        };
        return;
    }
    response.status = 200;
    response.body = {
        success: true,
        data: users
    };
    return;
}

// @desc    Index user by id
// @route   GET /users/:id
export const indexUser = async ({ request, response }) => {
    if(!request.token) {
        response.status = 400;
        response.body = {
            success: false,
            data: "There was a problem retrieving the token from the middleware"
        }
        return;
    }

    const user = await runQuery(`SELECT id, username, email, created_at, updated_at FROM users WHERE id=${request.token.id};`);

    if (!user.length) {
        response.status = 404;
        response.body = {
            success: false,
            data: "User not found"
        };
        return;
    }
    response.status = 200;
    response.body = {
        success: true,
        data: user
    };
    return;
}
// #WARN: EXTREMELY VULNERABLE TO SQL INJECTION
// @desc Authenticates an user based on the inputted email and password.
// @route POST /users/auth
export const authenticateUser = async ({ request, response }) => {
    const { email, password } = await (await request.body()).value;
    const SECRET = Deno.env.get("TOKEN_SECRET") || "0";

    const auth = await runQuery(`SELECT email, password FROM users WHERE email='${email}';`);

    if(auth == []) {
        console.log("auth is empty")
        response.status = 400;
        response.body = {
            success: false,
            data: "User not found",
        };
        return;
    }
    if(!await bcrypt.compare(password, auth[0][1])) {
        console.log("password is no bueno")
        response.status = 400;
        response.body = {
            success: false,
            data: "Incorrect password.",
        };
        return;
    }
    const user = await runQuery(`SELECT id, email, username, created_at, updated_at FROM users WHERE email='${email}';`);
    const jwt = await create({ alg: "HS512", typ: "JWT" }, { "id": user[0][0] }, SECRET) // user[0][0] == id

    response.status = 200;
    response.body = {
        success: true,
        data: {user, jwt}
    };
}

// @desc    Add an user to the database
// @route   POST /users/
export const storeUser = async ({ request, response }) => {
    if(!request.hasBody) {
        response.status = 300;
        response.body = {
            success: false,
            data: "No data was received by the server."
        }
        return;
    }

    const { username, email, password }: Omit<User, "id"> = await (await request.body()).value;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await runQuery(`INSERT INTO users (username, email, password)\nVALUES ('${username}', '${email}', '${hashedPassword}')\nRETURNING *;`);
    response.body = {
        success: true,
        data: user
    }
}
// @desc    Updates user in the database by id
// @route   POST /users/
export const updateUser = async ({request, response}) => {
    if(!request.token) {
        response.status = 400;
        response.body = {
            success: false,
            data: "There was a problem retrieving the token from the middleware"
        }
        return;
    }

    const { username, email, password }: Omit<User, "id"> = await (await request.body()).value;

    if(!request.hasBody) {
        response.status = 300;
        response.body = {
            success: false,
            data: "No data was received by the server."
        }
        return;
    }
    const user = await runQuery(`UPDATE users\nSET username = '${username}',\n    email = '${email}',\n    password = '${password}'\nWHERE id = ${request.token.id}\nRETURNING *;` )
    response.body = {
        success: true,
        data: user
    }
}

// @desc    Index user by id
// @route   GET /users/:id
export const deleteUser = async ({ request, response }) => {
    if(!request.token) {
        response.status = 400;
        response.body = {
            success: false,
            data: "There was a problem retrieving the token from the middleware"
        }
        return;
    }

    const ok = await runQuery(`DELETE FROM users\nWHERE id=${request.token.id};`);


    if(!ok) {
        response.status = 400;
        response.body = {
            success: false,
            data: "Not able to delete the user"
        }
    }
    response.status = 200;
    response.body = {
        success: true,
        data: []
    }
}
