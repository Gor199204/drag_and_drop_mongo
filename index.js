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
const user_seq_schema = require('./schemas/userSequenceSchemas')
// const fs = require("fs");
// const usersdb = require("./userSchema.js");
// const validation = require("./validation.js")



const mongoHost = mongoose.connect(process.env.URL).then(() => console.log("///////////////////Mongo///////////////////",))
    .catch((e) => console.log(e));

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/cards', async (req, res) => {
    const { title, list_id, description, created_at, updated_at} = req.body;
    if(created_at){
        console.log("created_at is", created_at);
        const busyCreatedAt = await card_schema.findOne({created_at});
        // const listId = await mongoHost.cards.findOne({_id: "615d8ec06e14105660f27a1f"})
        console.log(listId);
        if (busyCreatedAt ==! null) {
            console.log("AT is busy");
        } else {
            console.log(mongoHost);
            card_schema.create({
                title,
                list_id,
                description,
                created_at,
                updated_at
            })
        }
    }
})

app.post("/" || "/home", async (req, res) => {
    const { title, card_positions, position, created_at, updated_at} = req.body;
    if(created_at){
        console.log("created_at is", created_at);
        const busyCreatedAt = await list_schema.findOne({created_at});
        if (busyCreatedAt ==! null) {
            console.log("AT is busy");
        } else {
            console.log(333333333334);
            list_schema.create({
                title,
                card_positions,
                position,
                created_at,
                updated_at
            })
        }
    }
    console.log(22222222222223);
})

// app.get("/users", (req, res) => {
//     console.log("asdf");
//     fs.readFileSync(path.resolve(process.env.URL), "utf8").then((resp) => {
//         res.send(resp)
//     })
// })

app.post("/users", async (req, res) => {
    const { firstName, lastName, country, email, age, subscribed_to_cards, created_at, updated_at } = req.body
    // const firstNameJoi = userValidation.firstName;
    // const lastNameJoi = userValidation.lastName;
    // const countryJoi = userValidation.country;
    // const emailJoi = userValidation.email;
    // const ageJoi = userValidation.age;


    if (email) {
        console.log("email is", email);
        const busyEmail = await users_schema.findOne({ email });
        console.log(44444444, busyEmail);
        if (busyEmail !== null) {
            console.log("email is busy");
        } else {
            console.log(8888888885);
            users_schema.create({
                firstName,
                lastName,
                country,
                email,
                age,
                subscribed_to_cards,
                created_at,
                updated_at
            });
        }
    }
    console.log(1111111111112);

});

app.post('/seq', async (req, res) => {
    const { sequence, updated_at} = req.body;
    user_seq_schema.create({
        sequence,
        updated_at
    })
})



app.listen(process.env.PORT);