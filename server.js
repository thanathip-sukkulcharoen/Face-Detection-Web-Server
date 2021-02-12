const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'smart-brain'
    }
  });

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            password: 'banana',
            email: 'Sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {res.send(database.users)});
app.post('/signin', (req,res) => { signin.handleSignin(req, res, db, bcrypt)});
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res) => { profile.handleProfileGet(req, res ,db ,bcrypt)});
app.put('/image',(req,res) => {image.handleImage(req,res,db,bcrypt)});
app.post('/imageurl',(req,res) => {image.handleApiCall(req,res)});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});