const express = require('express');
const Transaction = require('../models/transaction');
const router = new express.Router();


router.post('/transaction', async (req, res, next) => {
    const transaction = new Transaction(req.body);

    try {
        await transaction.save();
        res.status(201).send({ transaction });
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get('/transaction', async (req, res, next) => {
    try {
        const transaction = await Transaction.find({});
        res.status(201).send({ transaction });
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get('/transaction/:id', async (req, res, next) => {
    const transactionId = req.params.id;

    try {
        const transaction = await Transaction.findOne({ _id: transactionId });
        res.status(201).send({ transaction });
    } catch(e) {
        res.status(400).send(e);
    }
});

router.patch('/transaction/:id', async (req, res, next) => {
    const transactionId = req.params.id;
    const transactionModified = req.body;

    try {
        await Transaction.updateOne({ _id: transactionId }, { $set: transactionModified });
        const updatedTransaction = await Transaction.find({ _id: transactionId });
        res.status(201).send({ transactionId, updatedTransaction });
    } catch(e) {
        res.status(400).send(e);
    }
});

router.delete('/transaction/:id', async (req, res, next) => {
    const transactionId = req.params.id;

    try {
        const deleteInfos = await Transaction.deleteOne({ _id: transactionId });
        res.status(201).send({ transactionId, deleteInfos });
    } catch(e) {
        res.status(400).send(e);
    }
});

module.exports = router;