var express = require('express');
var router = express.Router();
let notificheModel = require('../models/notifiche');

/* La rotta /notifiche è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

/* Notifiche */
router.get('/aggiornaNotificheAdmin', notificheModel.aggiornaNotificheAdmin);

module.exports = router;