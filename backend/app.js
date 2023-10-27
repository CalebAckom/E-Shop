const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv/config');

// New Relic
require('newrelic');

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// CORS
app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;
const port = process.env.PORT;

// Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const usersRoutes = require('./routes/users');

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/users`, usersRoutes);

let env = process.env.ENVIRONMENT;

if (env === "local") {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Database Connection is ready')
    }).catch((err) => {
        console.log(err);
    })
}
else {
    mongoose.connect(process.env.PROD_MONGODB_URI).then(() => {
        console.log('Database Connection is ready')
    }).catch((err) => {
        console.log(err);
    })
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
