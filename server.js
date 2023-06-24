const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
require("dotenv").config()
const port = process.env.PORT
const bodyParser = require('body-parser')
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const path = require("path")

app.get("/",(req, res)=>{
    res.send("Hello world")
})

app.post("/pay", async (req, res)=>{
    console.log(req.body.token);
    await Stripe.charges.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    })
})

try{
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    })
}catch(err){
    console.log(err.message);
}
