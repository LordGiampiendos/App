var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var router = express.Router();
let utenteModel = require('../models/users');
var cookieParser = require('cookie-parser');
let Token = require('../models/Token');
var cors = require('cors');

router.use(cors({credentials: true, origin: true}));
router.use(cookieParser());
token = new Token();

router.use(express.json());

const config_session={
    name : "8MS", 
    resave : false, 
    saveUninitialized : false, 
    secret : "8bIt_Mot",
    cookie : {
        maxAge : 1000 * 60 * 60 * 2,  
        sameSite : true,
        secure : false
    }};

router.use(session(config_session));

/* La rotta /users è vietata */
router.get('/', function(req, res, next) {
    next(createError(403));
});

/* Registrazione Utente */
router.post('/utenteregistrato', function(req, res) { 
    utenteModel.registrazione(req, function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else if(data === 'Email già utilizzata') {
            res.status(404).json({'error':'Email già utilizzata'});
        }
        else {
            let cookie = req.body.email;
            token.aggiungiSessione(data, req.body.email);
            console.log(token);
            res.status(200).cookie('8MS', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }).end(); 
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});

/* Registrazione2 Utente*/
router.post('/utenteregistrato2', function(req, res) { 
    utenteModel.registrazione2(req, function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else {
            let cookie = req.body.email;
            token.aggiungiSessione(data, req.body.email);
            console.log(token);
            res.status(200).cookie('8MS', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }).end(); 
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});

/* Registrazione3 Utente*/
router.post('/utenteregistrato3', function(req, res) { 
    utenteModel.registrazione3(req, function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else {
            let cookie = req.body.email;
            token.aggiungiSessione(data, req.body.email);
            console.log(token);
            res.status(200).cookie('8MS', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }).end(); 
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});

/* Registrazione4 Utente*/
router.post('/utenteregistrato4', function(req, res) { 
    utenteModel.registrazione4(req, function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else if(data === 'Email già utilizzata') {
            res.status(404).json({'error':'Email già utilizzata'});
        }
        else {
            let cookie = req.body.email;
            token.aggiungiSessione(data, req.body.email);
            console.log(token);
            res.status(200).cookie('8MS', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }).end(); 
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});

/* Registrazione5 Utente*/
router.post('/utenteregistrato5', function(req, res) { 
    utenteModel.registrazione5(req, function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else if(data === 'Email già utilizzata') {
            res.status(404).json({'error':'Email già utilizzata'});
        }
        else {
            let cookie = req.body.email;
            token.aggiungiSessione(data, req.body.email);
            console.log(token);
            res.status(200).cookie('8MS', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }).end(); 
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});

/* Registrazione6 Utente*/
router.post('/utenteregistrato6', function(req, res) { 
    utenteModel.registrazione6(req, function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else if(data === 'Email già utilizzata') {
            res.status(404).json({'error':'Email già utilizzata'});
        }
        else {
            let cookie = req.body.email;
            token.aggiungiSessione(data, req.body.email);
            console.log(token);
            res.status(200).cookie('8MS', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }).end(); 
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});

/* Registrazione7 Utente*/
router.post('/utenteregistrato7', function(req, res) { 
    utenteModel.registrazione7(req, function(data) {
        if(data === 'Compila tutti i campi!') {
            res.status(404).json({'error':'Compila tutti i campi!'});
        }
        else if(data === 'Email già utilizzata') {
            res.status(404).json({'error':'Email già utilizzata'});
        }
        else {
            let cookie = req.body.email;
            token.aggiungiSessione(data, req.body.email);
            console.log(token);
            res.status(200).cookie('8MS', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }).end(); 
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});

/* Login Utente */
router.post('/login', function (req, res) {
    utenteModel.autenticazione(req, function(data){
        if(data === 'Utente non trovato'){
            res.status(404).json({'error':'Utente non trovato'});
        }
        else if( data === 'Password errata !?'){
            res.status(404).json({'error':'Password errata! Riprova...'});
        }
        else{
            let cookie = req.body.email;
            token.aggiungiSessione(data[0].id, req.body.email);
            console.log(token);
            res.status(200).cookie('8MS', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }).send(data);
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});

/* Recupero */
router.post('/recupero', function (req, res) {
    utenteModel.recupero(req, function(data){
        if(data === 'Utente non trovato'){
            res.status(404).json({'error':'Utente non trovato'});
        }
        else{
            let cookie = req.body.email;
            token.aggiungiSessione(data[0].id, req.body.email);
            console.log(token);
            res.status(200).cookie('8MS', cookie, { maxAge: 1000 * 60 * 60 * 2, httpOnly: true }).send(data);
        }
    }).catch((err)=>{
        res.sendStatus(500);})
});

/* Elimina */
router.post('/elimina1', utenteModel.elimina1);
router.post('/elimina2', utenteModel.elimina2);
router.post('/elimina3', utenteModel.elimina3);

module.exports = {
    router: router,
    token: token
};