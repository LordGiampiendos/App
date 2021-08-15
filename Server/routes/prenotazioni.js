var createError = require('http-errors');
var express = require('express');
var router = express.Router();
let prenotazioniModel = require('../models/prenotazioni');

/* La rotta /prenotazioni è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

/* Prenotazioni */
router.post('/insPrenotazioni', function(req, res) { 
    prenotazioniModel.insPrenotazioni(req, res ,function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else {
            res.send(data);
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});
router.post('/aggiornaPrenotazioni', prenotazioniModel.aggiornaPrenotazioni);
router.post('/aggiornaPrenotazioniAdmin', prenotazioniModel.aggiornaPrenotazioniAdmin);
router.post('/aggiornaPrenotazioniAutista', prenotazioniModel.aggiornaPrenotazioniAutista);
router.post('/aggiornaPrenotazioniAddettoAllaConsegna', prenotazioniModel.aggiornaPrenotazioniAddettoAllaConsegna);
router.post('/rilascia', prenotazioniModel.rilascia);
router.post('/rilasciaA', prenotazioniModel.rilasciaA);
router.post('/rilasciaL', prenotazioniModel.rilasciaL);
router.post('/ritPrenotazioni', function(req, res) { 
    prenotazioniModel.ritPrenotazioni(req, res ,function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else {
            res.send(data);
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});
router.post('/elimina', prenotazioniModel.elimina);
router.post('/elimina1', prenotazioniModel.elimina1);

module.exports = router;