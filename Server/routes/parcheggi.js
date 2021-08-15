var createError = require('http-errors');
var express = require('express');
var router = express.Router();
let parcheggiModel = require('../models/parcheggi')

router.use(express.json());

/* La rotta /parcheggi è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

/* Parcheggi */
router.post('/inserisciParcheggiAdmin', function(req, res) { 
    parcheggiModel.inserisciParcheggiAdmin(req, res, function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else {
            res.send(data);
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});
router.post('/elimina', parcheggiModel.elimina);
router.post('/aggiornaParcheggiAdmin', parcheggiModel.aggiornaParcheggiAdmin);

module.exports = router;