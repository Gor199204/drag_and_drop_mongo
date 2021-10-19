const express = require('express');
const cardRouter = express.Router();

let { getAllCards, getCardById, addCard, updateCard, removeCard } = require('../controllers/cardController')


/**
 * @swagger
 * /cards:
 *   get:
 *     description: All cards
 *     responses:
 *       200:
 *         description: Returns all the cards
 */

cardRouter.get('/', async (req, res) => {
    let response = await getAllCards(req.query.s, req.query.page, req.query.limit);
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /cards/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The card ID.
 *     description: Get a card by id
 *     responses:
 *       200:
 *         description: Returns the requested card
 */
cardRouter.get('/:id', async (req, res) => {
    let response = await getCardById(req.params.id);
    res.json(response);
});

/**
 * @swagger
 * /cards:
 *   post:
 *     parameters:
 *      - in: body
 *        name: card
 *        description: New card
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            list_id:
 *              type: array
 *              items:
 *                type: string
 *            description:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
cardRouter.post('/', async (req, res) => {
    let body = {
        title: req.body.title,
        list_id: req.body.list_id,
        description: req.body.description,
    };
    let response = await addCard(body);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /cards/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The card ID.
 *      - in: body
 *        name: card
 *        description: Update card
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *            list_id:
 *              type: array
 *              items:
 *                $ref: '../schemas/listsSchemas'
 *            description:
 *                type: string
 *     responses:
 *       201:
 *         description: Created
 */
cardRouter.patch('/:id', async (req, res) => {
    let title = null, list_id = null, description = null;
    if (req.body.title) { title = req.body.title }
    if (req.body.list_id) { list_id = req.body.list_id }
    if (req.body.description) { description = req.body.description }
    let response = await updateCard(req.params.id, title, list_id, description);

    if (response.success == true) {
        res.status(201).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @swagger
 * /cards/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The card ID.
 *     description: Delete a card by id
 *     responses:
 *       200:
 *         description: Returns the requested card
 */
cardRouter.delete('/:id', async (req, res) => {
    let response = await removeCard(req.params.id)
    try {
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(response);
    }
});

module.exports = cardRouter