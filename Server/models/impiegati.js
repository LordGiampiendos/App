var createError = require('http-errors');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

module.exports = {
    registrazione: async function registrazione(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let presenza = 'Sì';
        try {
            await withTransaction(db, async() => {
                if(req.body.nome === '' || req.body.genere === '' || req.body.dataN === '' || req.body.regione === '' || req.body.provincia === '' || req.body.citta === '' || req.body.email === '' || req.body.password === '' || req.body.indirizzo === '' || req.body.N === '' || req.body.CAP === '' || req.body.localita === '' || req.body.telefono === '') {
                    next('Compila tutti i campi!');
                }
                else {  
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
        
                if (results == 0) {
                // inserimento utente
                results = await db.query('INSERT INTO `utente` \
            (nome, genere, id_regione, id_provincia, id_comune, data_nascita, tipo, presenza_pagamento, presenza_patente) \
            SELECT ? AS nome, ? AS genere, \
            `regioni`.id AS id_regione, `province`.id AS id_provincia, `comuni`.id AS id_comune, \
            ? AS data_nascita, ? AS tipo, ? AS presenza_pagamento, ? AS presenza_patente FROM `regioni`, `province`, `comuni` \
            WHERE `regioni`.nome=? AND `province`.nome=? AND `comuni`.nome=?', [
                        req.body.nome,
                        req.body.genere == 'male' ? 'M' : 'F',
                        req.body.dataN,
                        req.body.tipo,
                        presenza,
                        presenza,
                        req.body.regione,
                        req.body.provincia,
                        req.body.citta
                    ])
                    .catch(err => {
                        throw err;
                    });
    
                console.log('Inserimento tabella utente');
                console.log(results);
    
                // recupero dello user id
                let id_utente = results.insertId;
    
                // inserimento indirizzo
                results = await db.query('INSERT INTO `indirizzo` \
            (id_utente, via, numero, cap, localita, telefono) VALUES ?', [
                        [
                            [
                                id_utente,
                                req.body.indirizzo,
                                req.body.N,
                                req.body.CAP,
                                req.body.localita,
                                req.body.telefono
                            ]
                        ]
                    ])
                    .catch(err => {
                        throw err;
                    });
    
                console.log('Inserimento tabella indirizzo');
                console.log(results);
    
                // generazione della password cifrata con SHA512
                results = await db.query('SELECT sha2(?,512) AS encpwd', [req.body.password])
                    .catch(err => {
                        throw err;
                    });
    
                let encpwd = results[0].encpwd;
                console.log('Password cifrata');
                console.log(results);
    
                results = await db.query('INSERT INTO `pagamenti` \
            (id_utente, numero_carta, nominativo_p, data_scadenza, codice_sicurezza) VALUES ?', [
                        [
                            [
                                id_utente,
                                req.body.numero_carta,
                                req.body.nominativo_p,
                                req.body.data_scadenza,
                                req.body.codice_sicurezza
                            ]
                        ]
                    ])
                    .catch(err => {
                        throw err;
                    });
    
                    console.log(results);
    
                results = await db.query('INSERT INTO `patenti` \
            (id_utente, identificativo, nazionalità_patente, data_rilascio, data_scadenza, nominativo_pat) VALUES ?', [
                        [
                            [
                                id_utente,
                                req.body.identificativo,
                                req.body.nazionalità_patente,
                                req.body.data_rilascio,
                                req.body.data_scadenza2,
                                req.body.nominativo_pat
                            ]
                        ]
                    ])
                    .catch(err => {
                        throw err;
                    });
    
                    console.log(results);
    
                results = await db.query('INSERT INTO `autenticazione` \
            (id_utente, email, password) VALUES ?', [
                    [
                        [
                            id_utente,
                            req.body.email,
                            encpwd
                        ]
                    ]
                ])
                .catch(err => {
                    throw err;
                });   
    
                console.log(results);
                console.log(`Utente ${req.body.email} inserito!`);
                res.end();
            }
            else {
                next('Email già utilizzata');
            }
            }    
            });
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
                // inserimento utente
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE id = ?', req.body.id)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                if (results == 0) {
                    next('Utente non trovato');
                }
                else {
                    let id_utente = results[0].id_utente;
                    results = await db.query('SELECT * FROM `pagamenti`\
                    WHERE id_utente = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                    if(typeof results[0] !== "undefined") {
                        results = await db.query('DELETE FROM `pagamenti`\
                        WHERE id_utente = ?', id_utente) 
                        .catch(err => {
                            results = 0;
                            throw err;
                        });
                    }
                    results = await db.query('SELECT * FROM `patenti`\
                    WHERE id_utente = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                    if(typeof results[0] !== "undefined") {
                        results = await db.query('DELETE FROM `patenti`\
                        WHERE id_utente = ?', id_utente) 
                        .catch(err => {
                            results = 0;
                            throw err;
                        });
                    }
                    results = await db.query('DELETE FROM `autenticazione`\
                    WHERE id_utente = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                    results = await db.query('DELETE FROM `indirizzo`\
                    WHERE id_utente = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                    results = await db.query('DELETE FROM `utente`\
                    WHERE id = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
    
                    res.end();
                }
            })
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    },   
    
    aggiornaImpiegatiAdmin:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let autista = "Autista";
        let addetto = "Addetto alla consegna";
        try {
            await withTransaction(db, async() => {
            results = await db.query('SELECT DISTINCT `autenticazione`.email, `autenticazione`.password, `utente`.id, `utente`.nome, `utente`.genere,\
            DATE_FORMAT(`utente`.data_nascita,"%d/%m/%Y") AS data_nascita, `indirizzo`.via, `indirizzo`.numero,\
            `indirizzo`.localita, `indirizzo`.cap,`indirizzo`.telefono, `comuni`.nome AS comune, `regioni`.nome AS regione, `province`.nome AS provincia,\
            `pagamenti`.numero_carta, `pagamenti`.nominativo_p, DATE_FORMAT(`pagamenti`.data_scadenza, "%d/%m/%Y") AS data_scadenza, `pagamenti`.codice_sicurezza,\
            `patenti`.identificativo, `patenti`.nazionalità_patente, DATE_FORMAT(`patenti`.data_rilascio, "%d/%m/%Y") AS data_rilascio, DATE_FORMAT(`patenti`.data_scadenza, "%d/%m/%Y") AS data_scadenza2, `patenti`.nominativo_pat, `utente`.tipo\
            FROM `autenticazione`, `utente`, `indirizzo`, `regioni`, `province`, `comuni`, `patenti`, `pagamenti` \
            WHERE (`utente`.tipo = ? OR `utente`.tipo = ?) AND `utente`.id = `autenticazione`.id_utente AND `utente`.id = `pagamenti`.id_utente AND `utente`.id = `patenti`.id_utente AND `utente`.id = `indirizzo`.id_utente AND `utente`.id_regione = `regioni`.id AND `utente`.id_provincia = `province`.id AND `utente`.id_comune = `comuni`.id', [
                autista,
                addetto
            ])
            .catch(err => {
                throw err;
            });
    
            console.log('Dati utente:');
            console.log(results);
            res.send(results);
        })       
        } catch (err) {
            console.log(err);
            next(createError(500));
        }    
    },
    
    aggiornaAutisti:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let autista = "Autista";
        try {
            await withTransaction(db, async() => {
            results = await db.query('SELECT DISTINCT `autenticazione`.email, `autenticazione`.password, `utente`.id, `utente`.nome, `utente`.genere,\
            DATE_FORMAT(`utente`.data_nascita,"%d/%m/%Y") AS data_nascita, `indirizzo`.via, `indirizzo`.numero,\
            `indirizzo`.localita, `indirizzo`.cap,`indirizzo`.telefono, `comuni`.nome AS comune, `regioni`.nome AS regione, `province`.nome AS provincia,\
            `pagamenti`.numero_carta, `pagamenti`.nominativo_p, DATE_FORMAT(`pagamenti`.data_scadenza, "%d/%m/%Y") AS data_scadenza, `pagamenti`.codice_sicurezza,\
            `patenti`.identificativo, `patenti`.nazionalità_patente, DATE_FORMAT(`patenti`.data_rilascio, "%d/%m/%Y") AS data_rilascio, DATE_FORMAT(`patenti`.data_scadenza, "%d/%m/%Y") AS data_scadenza2, `patenti`.nominativo_pat, `utente`.tipo\
            FROM `autenticazione`, `utente`, `indirizzo`, `regioni`, `province`, `comuni`, `patenti`, `pagamenti` \
            WHERE `utente`.tipo = ? AND `utente`.id = `autenticazione`.id_utente AND `utente`.id = `pagamenti`.id_utente AND `utente`.id = `patenti`.id_utente AND `utente`.id = `indirizzo`.id_utente AND `utente`.id_regione = `regioni`.id AND `utente`.id_provincia = `province`.id AND `utente`.id_comune = `comuni`.id', autista)
            .catch(err => {
                throw err;
            });
    
            console.log('Dati utente:');
            console.log(results);
            res.send(results);
        })       
        } catch (err) {
            console.log(err);
            next(createError(500));
        }    
    },
    
    aggiornaAddetti:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let addetto = "Addetto alla consegna";
        try {
            await withTransaction(db, async() => {
            results = await db.query('SELECT DISTINCT `autenticazione`.email, `autenticazione`.password, `utente`.id, `utente`.nome, `utente`.genere,\
            DATE_FORMAT(`utente`.data_nascita,"%d/%m/%Y") AS data_nascita, `indirizzo`.via, `indirizzo`.numero,\
            `indirizzo`.localita, `indirizzo`.cap,`indirizzo`.telefono, `comuni`.nome AS comune, `regioni`.nome AS regione, `province`.nome AS provincia,\
            `pagamenti`.numero_carta, `pagamenti`.nominativo_p, DATE_FORMAT(`pagamenti`.data_scadenza, "%d/%m/%Y") AS data_scadenza, `pagamenti`.codice_sicurezza,\
            `patenti`.identificativo, `patenti`.nazionalità_patente, DATE_FORMAT(`patenti`.data_rilascio, "%d/%m/%Y") AS data_rilascio, DATE_FORMAT(`patenti`.data_scadenza, "%d/%m/%Y") AS data_scadenza2, `patenti`.nominativo_pat, `utente`.tipo\
            FROM `autenticazione`, `utente`, `indirizzo`, `regioni`, `province`, `comuni`, `patenti`, `pagamenti` \
            WHERE `utente`.tipo = ? AND `utente`.id = `autenticazione`.id_utente AND `utente`.id = `pagamenti`.id_utente AND `utente`.id = `patenti`.id_utente AND `utente`.id = `indirizzo`.id_utente AND `utente`.id_regione = `regioni`.id AND `utente`.id_provincia = `province`.id AND `utente`.id_comune = `comuni`.id', addetto)
            .catch(err => {
                throw err;
            });
    
            console.log('Dati utente:');
            console.log(results);
            res.send(results);
        })       
        } catch (err) {
            console.log(err);
            next(createError(500));
        }    
    }
}