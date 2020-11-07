import { User } from "../types.ts";
import { generateUsers } from "../useCases/userCase.ts";

let users: (User | null)[] = await generateUsers(25) ;

// @desc    Index all of the users in the ser ver
// @route   GET /users/index
export const indexUsers = ({ response }: { response: any }) => {
    if(users) {
        response.status = 200;
        response.body = {
            success: true,
            data: users
        };
        return;
    }
    response.status = 400;
    response.body = { 
            success: false, 
            data: "No user has been registered." 
    };
    return;
}

// @desc    Index user by id
// @route   GET /users/:id
export const indexUser = ({ params, response }: { params: {id: string}, response: any }) => {
    const user: User | null | undefined = users.find(usr => usr?.id === Number(params.id))
    if (user !== null && user !== undefined) {
        response.status = 200;
        response.body = {
            success: true,
            data: user
        };
        return;
    }
    response.status = 404;
    response.body = {
        success: false,
        data: "User not found"
    };
    return;
    
}

// @desc    Updates an user by id
// @route   PUT /users/:id
export const updateUser = async ({ params, request, response }: { params: {id: string}, response: any, request: any  }) => {   
    const data: User = await (await request.body()).body;
    
    if(!request.hasBody) {
        response.status = 300;
        response.body = {
            success: false,
            data: "No data was received by the server."
        };
        return;
    } 
    const index: number = users.findIndex(usr => usr?.id === Number(params.id));
    
    if(index !== -1) {
         
        users = users.map(user => 
            user?.id === Number(params.id) 
            ?
            {...user, ...data}
            : 
            user
         );

        response.status = 200;
        response.body = {
            success: true,
            data: users[index]
        };
        return;
    }
    response.status = 404;
    response.body = {
        success: false,
        data: "Couldn't find the user"
    } ;
    return;
}

// @desc    Add an user to the database
// @route   POST /users/
export const storeUser = async ({ request, response }: { request: any, response: any }) => {
    const data: Omit<User, "id"> = await (await request.body()).value;

    if(!request.hasBody) {
        response.status = 300;
        response.body = {
            success: false,
            data: "No data was received by the server."
        }
        return;
    }

    if(!data) {
        response.status = 400;
        response.body = {
            success: false,
            data: "Failed to retrieve data."
        }
    }

    users.push({id: users.length, ...data});
    response.status = 200;
    response.body = {
        success: true,
        data: users[users.length-1] // should use user, wanted to see if it had updated array.
    };
    return;
}

// @desc    Deletes an user by id
// @route   DELETE /users/:id
export const deleteUser = ({ params, request, response }: { params: { id: string}, request: any, response: any }) => {
    const index = users.findIndex(usr => usr?.id === Number(params.id))
    if(index !== -1) {
        users[index] = null;
        response.status = 200,
        response.body = {
            success: true,
            data: users[index]
        };
        return;
    }
    response.status = 404;
    response.body = {
        success: true,
        data: "User not found"
    };
    return;
}
 
