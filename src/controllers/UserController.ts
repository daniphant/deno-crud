import { User } from "../types.ts";
import db, { runQuery } from "../db.ts";

// @desc    Index all of the users in the ser ver
// @route   GET /users/index
export const indexUsers = async ({ response }) => {
    const users = await runQuery("SELECT * FROM users;");
    
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
export const indexUser = async ({ params, response }: { params: {id: string} }) => {
    const user = await runQuery(`SELECT * FROM users WHERE id=${params.id}`);

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

// @desc    Add an user to the database
// @route   POST /users/
export const storeUser = async ({ request, response }) => {
    const { username, email, password }: Omit<User, "id"> = await (await request.body()).value;

    if(!request.hasBody) {
        response.status = 300;
        response.body = {
            success: false,
            data: "No data was received by the server."
        }
        return;
    }

    const user = await runQuery(`INSERT INTO users (username, email, password)\nVALUES ('${username}', '${email}', '${password}')\nRETURNING *;`);
    response.body = {
        success: true,
        data: user
    }
}