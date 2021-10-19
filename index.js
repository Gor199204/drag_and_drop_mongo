const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Joi = require('joi');
const userValidation = require('./validations/userSchemaValidation');
const userSeqValidation = require('./validations/userSeqSchemaValidation');
const listValidation = require('./validations/listSchemaValidation');
const cardValidation = require('./validations/cardSchemaValidation');
const users_schema = require('./schemas/usersSchemas');
const list_schema = require('./schemas/listsSchemas');
const card_schema = require('./schemas/cardsSchemas');
const user_seq_schema = require('./schemas/userSequenceSchemas');
const cors = require('cors');
const { updateOne } = require("./schemas/listsSchemas");
const { lists, cards, users } = require("./routes/index");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const fs = require("fs");
// const usersdb = require("./userSchema.js");
// const validation = require("./validation.js")



const mongoHost = mongoose.connect(process.env.URL).then(() => console.log("///////////////////Mongo///////////////////",))
    .catch((e) => console.log(e));

const router = express.Router();

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());


app.post('/cards', async (req, res) => {

    const { title, list_id, description } = req.body;
    card_schema.create({
        title,
        list_id,
        description
    }).then(card => res.send(card))

});

app.patch("/cards/:id", cors(), async (req, res) => {

    const card = await card_schema.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.send(card)
    

});


app.get("/cards", cors(), async (req, res) => {

    card_schema.find({}).then(cards => {
        res.send(cards);
    });

});

app.get("/cards/:id", cors(), async (req, res) => {

    card_schema.findOne({ _id: req.params.id }).then(cards => {
        res.send(cards);
    });

});



app.delete('/cards/:id', cors(), async (req, res) => {
    const deleteCards = await card_schema.deleteOne({ _id: req.params.id })
    res.sendStatus(202);
})


app.post("/lists", cors(), async (req, res) => {

    const { title, card_positions, position } = req.body;
    list_schema.create({
        title,
        card_positions,
        position
    }).then(list => {

        res.send(list._id);
    })
})

app.patch('/lists/:id', cors(), async (req, res) => {

    const list = await list_schema.findById(req.params.id);
    const updatedList = await list.updateOne(req.body)
    res.send(list);

});

app.get("/lists", cors(), async (req, res) => {
    list_schema.find({}, {}).then(lists => {
        res.send(lists);
    });
});

app.delete("/lists/:id", cors(), async (req, res) => {

    const deleteList = await list_schema.deleteOne({ _id: req.params.id })
    res.sendStatus(202);

})


app.post("/users", cors(), async (req, res) => {
    const { firstName, lastName, country, email, age, subscribed_to_cards } = req.body
    // const lastNameJoi = userValidation.lastName;
    // const countryJoi = userValidation.country;
    // const emailJoi = userValidation.email;
    // const ageJoi = userValidation.age;
    const subToCards = await list_schema.findOne({}, {})

    if (email) {
        console.log("email is", email);
        const busyEmail = await users_schema.findOne({ email });

        if (busyEmail !== null) {
            console.log("email is busy");
        } else {

            users_schema.create({
                firstName,
                lastName,
                country,
                email,
                age,
                subscribed_to_cards
            }).then((users) => {

                res.send(users._id);
            })
        }
    }

});

app.patch("/users/:id", cors(), async (req, res) => {

    const user = await users_schema.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.send(user)

});

app.get("/users", cors(), async (req, res) => {

    users_schema.find({}).then(users => {
        res.send(users);
    });

});

app.get("/users/:id", cors(), async (req, res) => {

    users_schema.findOne({ _id: req.params.id }).then(users => {
        res.send(users);
    });

});

app.delete("/users/:id", cors(), async (req, res) => {

    const deleteUser = await users_schema.deleteOne({ _id: req.params.id })
    console.log(req.body);
    res.sendStatus(202);

});



app.post('/user-sequence', cors(), async (req, res) => {

    const { _id, sequence, updated_at } = req.body;
    user_seq_schema.create({
        _id,
        sequence,
        updated_at
    }).then(seq => {
        res.send(seq)
    })

})

app.get('/user-sequence/:id', cors(), async (req, res) => {

    user_seq_schema.find({}).then(seq => {
        res.send(seq)
    })

})



const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'DRAG AND DROP REST API',
            description: "A REST API built with Express and MongoDB"
        },
    },
    apis: ["./routes/listRoutes.js", "./routes/cardRoutes.js", "./routes/userRoutes.js"]
}

app.use('/lists', lists)
app.use('/cards', cards)
app.use('/users', users)

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.listen(process.env.PORT);