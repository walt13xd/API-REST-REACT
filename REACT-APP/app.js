const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use(
    '/graphql',
    graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
     graphiql: true
    })
);

const mongoDB_URL = 'mongodb+srv://user:password@app-3scau.gcp.mongodb.net/dataBaseName?retryWrites=true';

const API_PORT = '8000';

mongoose.connect(mongoDB_URL,{useUnifiedTopology: true,
    useNewUrlParser: true})
.then(() => {
        app.listen(API_PORT);
    }).catch(err =>{
        console.log(err);
    });

