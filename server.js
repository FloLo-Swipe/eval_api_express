require('dotenv').config();

const express = require('express');

const server = express();

server.use(express.json())

// import routers 
const userRouter = require('./app/routes/userRouter');
const productRouter = require('./app/routes/productRouter');
const commentRouter = require('./app/routes/commentRouter');
const orderRouter = require('./app/routes/orderRouter');
const promoRouter = require('./app/routes/promoRouter');
const paymentRouter = require('./app/routes/paymentRouter');

server.use('/', userRouter);
server.use('/', productRouter);
server.use('/', commentRouter);
server.use('/', orderRouter);
server.use('/', promoRouter);
server.use('/', paymentRouter);

const expressSwagger = require('express-swagger-generator') (server);

let options = {
    swaggerDefinition : {
        info : {
            description : "An blog api",
            title: "blog",
            version: '1.0.0'

        },
        host: `http://localhost:${process.env.PORT}`,
        basePath : '/',
        produces : [
            "application/json"
        ],
        schemes: ['http', 'https'],
    },
    basedir: __dirname,
    files: ['./app/**/*.js']
}

expressSwagger(options)

  // Démarre le serveur à l'adresse 127.0.0.1 sur le port 3000
  // Affiche un message dès que le serveur commence à écouter les requêtes
  server.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})