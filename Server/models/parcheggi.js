var createError = require('http-errors');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

module.exports = {
    inserisciParcheggiAdmin:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            if(req.body.nome_parcheggio === '' || req.body.luogo === '' || req.body.orario_apertura === '' || req.body.orario_chiusura === '') {
                next('Compila tutti i campi!');
            }
            else {
            await withTransaction(db, async() => {
             results = await db.query('SELECT * FROM `parcheggi`\
            WHERE nome_parcheggio = ?', req.body.nome_parcheggio)
                .catch(err => {
                    results = 0;
                    throw err;
                });
    
                console.log(results);
    
            if(typeof results[0] === "undefined") {
             results = await db.query('INSERT INTO `parcheggi` \
            (nome_parcheggio, luogo, orario_apertura, orario_chiusura) VALUES ?', [
                        [
                            [
                                req.body.nome_parcheggio,
                                req.body.luogo,
                                req.body.orario_apertura,
                                req.body.orario_chiusura
                            ]
                        ]
                    ])
                    .catch(err => {
                        throw err;
                    });
    
                    console.log(results);
            }
            else {
            let nome_parcheggio = results[0].nome_parcheggio;
             results = await db.query('UPDATE `parcheggi`\
            SET `luogo` = ?, `orario_apertura` = ?, `orario_chiusura` = ?\
            WHERE nome_parcheggio = ?', 
                [
                    req.body.luogo,
                    req.body.orario_apertura,
                    req.body.orario_chiusura,
                    nome_parcheggio
                ])
                .catch(err => {
                    throw err;
                });
    
                console.log(results);
            }
            res.end();
        })       
        }
        } catch (err) {
            console.log(err);
            next('Compila tutti i campi!');
        }    
    },
    
    aggiornaParcheggiAdmin:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
             results = await db.query('SELECT * FROM `parcheggi`')
                .catch(err => {
                    results = 0;
                    throw err;
                });
    
                console.log(results);
                res.send(results);
        })       
        } catch (err) {
            console.log(err);
            next(createError(500));
        }    
    },
    
    elimina:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                results = await db.query('DELETE FROM `parcheggi`\
                WHERE id = ?', req.body.id) 
                .catch(err => {
                    results = 0;
                    throw err;
                });
    
                res.end();
                   
            })
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }
}