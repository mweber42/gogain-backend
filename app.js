require('dotenv').config();
const { connectDb } = require('./src/services/mongoose');
const userRoutes = require('./src/routes/user');
const serviceRoutes = require('./src/routes/service');
const centerRoutes = require('./src/routes/center');
const clientRoutes = require('./src/routes/client');
const transactionRoutes = require('./src/routes/transaction');
const costsRoutes = require('./src/routes/costs');

const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

connectDb().catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(serviceRoutes);
app.use(centerRoutes);
app.use(clientRoutes);
app.use(transactionRoutes);
app.use(costsRoutes)

app.listen(port, () => {
    console.log(`Serveur lancé: http://localhost:${port}`);
});