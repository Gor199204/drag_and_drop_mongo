const express = require('express');
const router = express.Router();

let { getAllLists, getListById, addList, updateList, removeList } = require('../controllers/listController')


/**
 * @swagger
 * /lists:
 *   get:
 *     description: All lists
 *     responses:
 *       200:
 *         description: Returns all the lists
 */

 router.get('/', async (req, res) => {
    let response = await getAllLists(req.query.s, req.query.page, req.query.limit);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /lists/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The list ID.
 *     description: Get a list by id
 *     responses:
 *       200:
 *         description: Returns the requested lists
 */
 router.get('/:id', async (req, res) => {
    let response = await getListById(req.params.id);
    res.json(response);
});

/**
 * @swagger
 * /lists:
 *   post:
 *     parameters:
 *      - in: body
 *        name: lists
 *        description: New lists
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            card_positions:
 *              type: string
 *            position:
 *              type: number
 *     responses:
 *       201:
 *         description: Created
 */
 router.post('/', async (req, res) => {
    let body = {
        listName: req.body.listName,
        list: req.body.list,
        listContext: req.body.listContext,
    };
    let response = await addList(body);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /lists/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The lists ID.
 *      - in: body
 *        name: lists
 *        description: Update lists
 *        schema:
 *          type: object
 *          properties:
 *            listName:
 *              type: string
 *            list:
 *              type: string
 *            listContext:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
 router.patch('/:id', async (req, res) => {
    let listName = null, list = null, listContext = null;
    if (req.body.listName) {listName = req.body.listName}
    if (req.body.list) {list = req.body.list}
    if (req.body.listContext) {listContext = req.body.listContext}
    let response = await updateList(req.params.id, listName, list, listContext);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /lists/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The list ID.
 *     description: Delete a list by id
 *     responses:
 *       200:
 *         description: Returns the requested list
 */
 router.delete('/:id', async (req, res) => {
    let response = await removeList(req.params.id)
    try {
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(response);
    }
});

module.exports = router;