var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose')
Foobar = mongoose.model('Foobar');
asyncHandler = require('express-async-handler');

module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/foobars', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all foobars');
        let query = Foobar.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));
};

router.get('/foobars/:id', asyncHandler(async (req, res) => {
    logger.log('info', 'Get foobar %s', req.params.id);
    await Foobar.findById(req.params.id).then(result => {
        res.status(200).json(result);
    })
}));

router.post('/foobars', asyncHandler(async (req, res) => {
    logger.log('info', 'Creating foobar');
    var foobar = new Foobar(req.body);
    await foobar.save()
        .then(result => {
            res.status(201).json(result);
        })
}));

router.put('/foobar', asyncHandler(async (req, res) => {
    logger.log('info', 'Updating foobar');
    await Foobar.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
        .then(result => {
            res.status(200).json(result);
        })
}));

router.delete('/foobars/:id', asyncHandler(async (req, res) => {
    logger.log('info', 'Deleting foobar %s', req.params.id);
    await Foobar.remove({ _id: req.params.id })
        .then(result => {
            res.status(200).json(result);
        })
}));