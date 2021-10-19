
const users_schema = require('../schemas/usersSchemas');

async function getAllUsers(search, reqPage, reqLimit) {
    let options = {};

    if (search) {
        options = {
            ...options,
            $or: [
                {movieName: new RegExp(search.toString(), 'i')},
                {list: new RegExp(search.toString(), 'i')}
            ]
        }
    }

    let total = users_schema.countDocuments(options);
    let page = parseInt(reqPage) || 1;
    let limit = parseInt(reqLimit) || parseInt(await total);
    let last_page = Math.ceil(parseInt(await total)/limit);
    if (last_page < 1 && total > 0) {
        last_page = 1
    }

    try {
        const lists = await users_schema.find(options).skip((page - 1) * limit).limit(limit);
        return {
            success: true,
            data: lists,
            total: (await total).toString(),
            page: (await page).toString(),
            last_page: (await last_page).toString(),
        };
    } catch (err) {
        return { success: false, message: "Users not found" };
    }
}

async function getUserById(id) {
    let list;
    try {
        list = await users_schema.findById(id);
        if (list == null) {
            return { success: false, message: 'Cannot find user' };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }

    return {
        success: true,
        data: list,
    };
}

async function addUser(body) {
    const list = new users_schema(body);

    try {
        const newList = await list.save();
        return {
            success: true,
            data: newList,
        };
    } catch (err) {
        return { success: false, message: "Failed to add user" };
    }
}

async function updateUser(id, movieName = null, reqList = null, movieContext = null) {
    let list;
    try {
        list = await users_schema.findById(id);
        if (list == null) {
            return { success: false, message: 'Cannot find user' };
        }
        if (movieName != null) {
            list.movieName = movieName
        }
        if (reqList != null) {
            list.list = reqList
        }
        if (movieContext != null) {
            list.movieContext = movieContext
        }

        try {
            const updatedList = await list.save()
            return {
                success: true,
                data: updatedList,
                message: "User updated successfully"
            };
        } catch (err) {
            return { sucess: false ,message: "Failed to update user" };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
}

async function removeUser(id) {
    let list;
    try {
        list = await users_schema.findById(id);
        if (list == null) {
            return { success: false, message: 'Cannot find user' };
        }

        try {
            await list.remove()
            return {
                success: true,
                message: 'Deleted User'
            };
        } catch (err) {
            return { success: false ,message: err.message };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser
}