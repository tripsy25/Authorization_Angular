const express = require('express');

const jwt = require('jsonwebtoken');

const { MongoClient } = require("mongodb");

const router = express.Router();

const User = require('../models/user');

const mongoose = require('mongoose');

// const password = encodeURIComponent("W9W8sgDi3H!8F@w")
const db = "mongodb+srv://tripsy251:tripti123@cluster0.bcfwwgn.mongodb.net/?retryWrites=true&w=majority"
 
mongoose.connect(db, err => {
    if(err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to Mongodb')
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized Access')
    } 
    let token = req.headers.authorization.split(' ')[1];

    if(token === 'null'){
        return res.status(401).send('Unauthorized Access')
    }
    let payload = jwt.verify(token, 'secretKey');

    if(!payload){
        return res.status(401).send('Unauthorized Access');
    }

    req.userId = payload.subject
    next()


}
router.get('/',(req, res)=>{
    res.send('From API route');
})

router.post('/register', (req, res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) =>{
        if(error){
            console.log(error)
        } else {
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send(JSON.stringify({'token':token}))
        }
    })
})

router.post('/login', (req, res)=>{
    let userData = req.body

    User.findOne({email: userData.email}, (error, user)=>{
        if(error){
            console.log(error)
        } else{
            if(!user){
                res.status(401).send('Invalid email')
            } else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid password')
                } else{
                    let payload = { subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send(JSON.stringify({'token':token}))
                }
            }
        }
    })
})

router.get('/events',(req,res) =>{
    let events = [
        {
            "id":"1",
            "name":"Tripti",
            "description":"She is an outstanding girl",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "id":"2",
            "name":"Ashu",
            "description":"He is an outstanding boy",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "id":"3",
            "name":"Neha",
            "description":"She is a good girl",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "id":"4",
            "name":"Ravi",
            "description":"He is a good boy",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "id":"5",
            "name":"Jitu",
            "description":"He is a boy",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "id":"6",
            "name":"Trisha",
            "description":"She is a girl",
            "date":"2012-04-23T18:25:43.511Z"
        }

    ]
    res.json(events)
})

router.get('/special',verifyToken,(req,res) =>{
    let events = [
        {
            "id":"1",
            "name":"Tripti",
            "description":"She is an outstanding girl",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "id":"2",
            "name":"Ashu",
            "description":"He is an outstanding boy",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "id":"3",
            "name":"Neha",
            "description":"She is a good girl",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "id":"4",
            "name":"Ravi",
            "description":"He is a good boy",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "id":"5",
            "name":"Jitu",
            "description":"He is a boy",
            "date":"2012-04-23T18:25:43.511Z"
        },
        {
            "id":"6",
            "name":"Trisha",
            "description":"She is a girl",
            "date":"2012-04-23T18:25:43.511Z"
        }

    ]
    res.json(events)
})


module.exports = router;