var createError = require('http-errors');
var express = require('express');
var router = express.Router();
let impiegatiModel = require('../models/impiegati');

router.use(express.json());

/* La rotta /impiegati è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

/* Impiegati */
router.post('/impiegatoregistrato', function(req, res) {
    impiegatiModel.registrazione(req, res, function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else if(data === 'Email già utilizzata') {
            res.status(404).json({'error':'Email già utilizzata'});
        }
        else {
            res.send(data);
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});
router.post('/elimina', impiegatiModel.elimina);
router.post('/aggiornaImpiegatiAdmin', impiegatiModel.aggiornaImpiegatiAdmin);
router.post('/aggiornaAutisti', impiegatiModel.aggiornaAutisti);
router.post('/aggiornaAddetti', impiegatiModel.aggiornaAddetti);

module.exports = router;