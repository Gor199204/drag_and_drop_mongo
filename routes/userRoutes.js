const express = require('express');
const userRouter = express.Router();

let { getAllUsers, getUserById, addUser, updateUser, removeUser } = require('../controllers/userController')


/**
 * @swagger
 * /users:
 *   get:
 *     description: All users
 *     responses:
 *       200:
 *         description: Returns all the users
 */

userRouter.get('/', async (req, res) => {
    let response = await getAllUsers(req.query.s, req.query.page, req.query.limit);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The user ID.
 *     description: Get a user by id
 *     responses:
 *       200:
 *         description: Returns the requested users
 */
userRouter.get('/:id', async (req, res) => {
    let response = await getUserById(req.params.id);
    res.json(response);
});

/**
 * @swagger
 * /users:
 *   post:
 *     parameters:
 *      - in: body
 *        name: users
 *        description: New users
 *        schema:
 *          type: object
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            country:
 *              type: string
 *            email:
 *              type: string
 *              required: true
 *            age:
 *              type: number
 *            subscribed_to_cards:
 *              type: array
 *              items:
 *                type: string
 *     responses:
 *       201:
 *         description: Created
 */
userRouter.post('/', async (req, res) => {
    let body = {
        userName: req.body.userName,
        user: req.body.user,
        userContext: req.body.userContext,
    };
    let response = await addUser(body);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The users ID.
 *      - in: body
 *        name: users
 *        description: Update users
 *        schema:
 *          type: object
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            country:
 *              type: string
 *            email:
 *              type: string
 *              required: true
 *            age:
 *              type: number
 *     responses:
 *       201:
 *         description: Created
 */
userRouter.patch('/:id', async (req, res) => {
    let firstName = null, lastName = null, country = null, email = null, age = null;
    if (req.body.firstName) { firstName = req.body.firstName }
    if (req.body.lastName) { lastName = req.body.lastName }
    if (req.body.country) { country = req.body.country }
    if (req.body.email) { email = req.body.email }
    if (req.body.age) { age = req.body.email }
    let response = await updateUser(req.params.id, firstName, lastName, country, email, age);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The users ID.
 *     description: Delete a users by id
 *     responses:
 *       200:
 *         description: Returns the requested users
 */
userRouter.delete('/:id', async (req, res) => {
    let response = await removeUser(req.params.id)
    try {
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(response);
    }
});

module.exports = userRouter;