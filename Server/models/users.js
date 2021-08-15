var createError = require('http-errors');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const mailer = require('nodemailer');
const crypto = require('crypto');

var smtpTransport = mailer.createTransport({
    service: "email",
    auth: {
        user: "8bitCarSharing@email.it",
        pass: "email_password"
    }
});

module.exports = {
    registrazione:async function(req, next) {
        const db = await makeDb(config);
        let results = {};
        let type = 'Cliente';
        let nonpresenza = 'No';
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
            results = await db.query('INSERT INTO `utente` \
            (nome, genere, id_regione, id_provincia, id_comune, data_nascita, tipo, presenza_pagamento, presenza_patente) \
            SELECT ? AS nome, ? AS genere, \
            `regioni`.id AS id_regione, `province`.id AS id_provincia, `comuni`.id AS id_comune, \
            ? AS data_nascita, ? AS tipo, ? AS presenza_pagamento, ? AS presenza_patente FROM `regioni`, `province`, `comuni` \
            WHERE `regioni`.nome=? AND `province`.nome=? AND `comuni`.nome=?', [
                        req.body.nome,
                        req.body.genere == 'male' ? 'M' : 'F',
                        req.body.dataN,
                        type,
                        nonpresenza,
                        nonpresenza,
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
                next(id_utente);
            }
            else {
                next('Email già utilizzata');
            }
            }    
            });
        } catch (err) {
            console.log(err);
            next('Compila tutti i campi!');
        }
    },
    
    registrazione2:async function(req, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let presenza = 'Sì';
        try {
            await withTransaction(db, async() => {
                if(req.body.numero_carta === '' || req.body.nominativo_p === '' || req.body.data_scadenza === '' || req.body.codice_sicurezza === '') {
                    next('Compila tutti i campi!');
                }
                else {  
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
    
                    console.log(results);
            
            let id_utente = results[0].id_utente;
             results = await db.query('SELECT * FROM `pagamenti`\
            WHERE id_utente = ?', id_utente)
                .catch(err => {
                    results = 0;
                    throw err;
                });
    
                console.log(results);
    
            if(typeof results[0] === "undefined") {
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
            }
            else {
             results = await db.query('UPDATE `pagamenti`\
            SET `numero_carta` = ?, `nominativo_p` = ?, `data_scadenza` = ?, `codice_sicurezza` = ?\
            WHERE id_utente = ?', 
                [
                    req.body.numero_carta,
                    req.body.nominativo_p,
                    req.body.data_scadenza,
                    req.body.codice_sicurezza,
                    id_utente
                ])
                .catch(err => {
                    throw err;
                });
    
                console.log(results);
            }
            results = await db.query('UPDATE `utente`\
            SET `presenza_pagamento` = ?\
            WHERE id = ?', 
                [
                    presenza,
                    id_utente
                ])
                .catch(err => {
                    throw err;
                });
    
                console.log(results);
                next(id_utente);
            }
        })       
        } catch (err) {
            console.log(err);
            next(createError(500));
        }    
    },
    
    registrazione3:async function(req, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let presenza = 'Sì';
        try {
            await withTransaction(db, async() => {
                if(req.body.identificativo === '' || req.body.nazionalità_patente === '' || req.body.data_rilascio === '' || req.body.data_scadenza2 === '' || req.body.nominativo_pat === '') {
                    next('Compila tutti i campi!');
                }
                else {  
                 results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
            
            let id_utente = results[0].id_utente;
             results = await db.query('SELECT * FROM `patenti`\
            WHERE id_utente = ?', id_utente)
                .catch(err => {
                    results = 0;
                    throw err;
                });
    
                console.log(results);
    
            if(typeof results[0] === "undefined") {
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
            }
            else {
                results = await db.query('UPDATE `patenti`\
               SET `identificativo` = ?, `nazionalità_patente` = ?, `data_rilascio` = ?, `data_scadenza` = ?, `nominativo_pat` = ?\
               WHERE id_utente = ?', 
                    [
                        req.body.identificativo,
                        req.body.nazionalità_patente,
                        req.body.data_rilascio,
                        req.body.data_scadenza2,
                        req.body.nominativo_pat,
                        id_utente
                    ])
                    .catch(err => {
                        throw err;
                    });
       
                    console.log(results);
                }   
                results = await db.query('UPDATE `utente`\
                SET `presenza_patente` = ?\
                WHERE id = ?', 
                    [
                        presenza,
                        id_utente
                    ])
                    .catch(err => {
                        throw err;
                    });
        
                    console.log(results);
                    next(id_utente);
                } 
            })      
        } catch (err) {
            console.log(err);
            next(createError(500));
        }    
    },
    
    registrazione4:async function(req, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let type = 'Cliente';
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
                        type,
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
                next(id_utente);
            }
            else {
                next('Email già utilizzata');
            }
            }    
            });
        } catch (err) {
            console.log(err);
            next('Compila tutti i campi!');
        }
    },
    
    registrazione41:async function(req, res, next) {
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
    
    registrazione5:async function(req, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let type = 'Cliente';
        let presenza = 'Sì';
        let nonpresenza = 'No';
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
                        type,
                        presenza,
                        nonpresenza,
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
                next(id_utente);
            }
            else {
                next('Email già utilizzata');
            } 
            }   
            });
        } catch (err) {
            console.log(err);
            next('Compila tutti i campi!');
        }
    },
    
    registrazione6:async function(req, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let type = 'Cliente';
        let presenza = 'Sì';
        let nonpresenza = 'No';
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
                        type,
                        nonpresenza,
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
                next(id_utente);
            }
            else {
                next('Email già utilizzata');
            } 
            }   
            });
        } catch (err) {
            console.log(err);
            next('Compila tutti i campi!');
        }
    },
    
    registrazione7:async function(req, next) {
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                if(req.body.nome === '' || req.body.genere === '' || req.body.dataN === '' || req.body.regione === '' || req.body.provincia === '' || req.body.citta === '' || req.body.email === '' || req.body.emailv === '' || req.body.password === '' || req.body.indirizzo === '' || req.body.N === '' || req.body.CAP === '' || req.body.localita === '' || req.body.telefono === '') {
                    next('Compila tutti i campi!');
                }
                else {  
                // inserimento utente
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.emailv)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                if (results == 0) {
                    next('Utente non trovato');
                } else {
                    results = await db.query('SELECT * FROM `autenticazione`\
                    WHERE email = ?', req.body.email)
                        .catch(err => {
                            results = 0;
                            throw err;
                        });
                    if (results == 0 || req.body.emailv === results[0].email) {
                           
                    let id_utente = results[0].id_utente;
                    results = await db.query('SELECT sha2(?,512) AS encpwd', [req.body.password])
                    .catch(err => {
                        throw err;
                    });
                    let encpwd = results[0].encpwd;
                    console.log('Password cifrata');
                    console.log(results);
                    results = await db.query(' UPDATE `autenticazione`\
                    SET `email` = ?, `password` = ? \
                    WHERE id_utente = ?', 
                    [
                        req.body.email,
                        encpwd,
                        id_utente
                    ]).catch(err => {
                        throw err;
                    });
                    results = await db.query('SELECT `id`\
                    FROM `regioni`\
                    WHERE `nome` = ?', [
                        req.body.regione
                    ]).catch(err => {
                        throw err;
                    });
                    let regione = results[0].id; 
                    results = await db.query('SELECT `id`\
                    FROM `province`\
                    WHERE `nome` = ?', [
                        req.body.provincia
                    ]).catch(err => {
                        throw err;
                    });
                    let provincia = results[0].id;
                    results = await db.query('SELECT `id`\
                    FROM `comuni`\
                    WHERE `nome` = ?', [
                        req.body.citta
                    ]).catch(err => {
                        throw err;
                    });
                    let citta = results[0].id; 
                    results = await db.query(' UPDATE `utente`\
                    SET `nome` = ?, `genere` = ?, `id_regione` = ?, `id_provincia` = ?, `id_comune` = ?, `data_nascita` = ?\
                    WHERE id = ?', 
                    [
                        req.body.nome,
                        req.body.genere == 'male' ? 'M' : 'F',
                        regione,
                        provincia,
                        citta,
                        req.body.dataN,
                        id_utente
                    ]).catch(err => {
                        throw err;
                    });
                    results = await db.query(' UPDATE `indirizzo`\
                    SET `via` = ?, `numero` = ?, `cap` = ?, `localita` = ?, `telefono` = ?\
                    WHERE id_utente = ?', 
                    [
                        req.body.indirizzo,
                        req.body.N,
                        req.body.CAP,
                        req.body.localita,
                        req.body.telefono,
                        id_utente
                    ]).catch(err => {
                        throw err;
                    });
                    next(id_utente);
                }
                else {
                    next('Email già utilizzata');
                }
                }
                }
            });        
        } catch (err) {
            console.log(err);
            next('Compila tutti i campi!');
        }
    },
    
    // middleware di autenticazione
    autenticazione:async function(req, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                // inserimento utente
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                if (results == 0) {
                    next('Utente non trovato');
                } 
                else {
                    let pwdhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
                    pwdhash.update(req.body.password); // cifriamo la password
                    let encpwd = pwdhash.digest('hex'); // otteniamo la stringa esadecimale
    
                    if (encpwd.slice(0, 20) != results[0].password) {
                        // password non coincidenti
                        next('Password errata !?');
                    } 
                    else {
                        console.log('Utente autenticato');
                        console.log(results);
                        // recupero dello user id
                        let id_utente = results[0].id_utente;
                        results1 = await db.query('SELECT * FROM `pagamenti`\
                        WHERE id_utente = ?', id_utente)
                            .catch(err => {
                                results = 0;
                                throw err;
                            });
                        results2 = await db.query('SELECT * FROM `patenti`\
                        WHERE id_utente = ?', id_utente)
                            .catch(err => {
                                results = 0;
                                throw err;
                            });
                        if(typeof results1[0] === "undefined" && typeof results2[0] === "undefined") {
                                results = await db.query('SELECT `utente`.id, `utente`.nome, `utente`.genere,\
                                DATE_FORMAT(`utente`.data_nascita,"%d/%m/%Y") AS data_nascita, `indirizzo`.via, `indirizzo`.numero,\
                                `indirizzo`.localita, `indirizzo`.cap,`indirizzo`.telefono, `comuni`.nome AS comune, `regioni`.nome AS regione, `province`.nome AS provincia, `utente`.tipo\
                                FROM `utente`, `indirizzo`, `regioni`, `province`, `comuni`\
                                WHERE `utente`.id = ? AND `indirizzo`.id_utente = ?  AND `utente`.id_regione = `regioni`.id AND `utente`.id_provincia = `province`.id AND `utente`.id_comune = `comuni`.id', [
                                    id_utente,
                                    id_utente
                                ])
                                .catch(err => {
                                    throw err;
                                });
        
                            console.log('Dati utente:');
                            console.log(results);
                            next(results);
                            }
                            else if(typeof results1[0] === "undefined" && typeof results2[0] !== "undefined") {
                                results = await db.query('SELECT `utente`.id, `utente`.nome, `utente`.genere,\
                                DATE_FORMAT(`utente`.data_nascita,"%d/%m/%Y") AS data_nascita, `indirizzo`.via, `indirizzo`.numero,\
                                `indirizzo`.localita, `indirizzo`.cap,`indirizzo`.telefono, `comuni`.nome AS comune, `regioni`.nome AS regione, `province`.nome AS provincia,\
                                `patenti`.identificativo, `patenti`.nazionalità_patente, DATE_FORMAT(`patenti`.data_rilascio, "%d/%m/%Y") AS data_rilascio, DATE_FORMAT(`patenti`.data_scadenza, "%d/%m/%Y") AS data_scadenza2, `patenti`.nominativo_pat, `utente`.tipo\
                                FROM `utente`, `indirizzo`, `regioni`, `province`, `comuni`, `patenti`\
                                WHERE `utente`.id = ? AND `indirizzo`.id_utente = ? AND `patenti`.id_utente = ? AND `utente`.id_regione = `regioni`.id AND `utente`.id_provincia = `province`.id AND `utente`.id_comune = `comuni`.id', [
                                    id_utente,
                                    id_utente,
                                    id_utente
                                ])
                                .catch(err => {
                                    throw err;
                                });
        
                            console.log('Dati utente:');
                            console.log(results);
                            next(results);
                            }
                            else if(typeof results2[0] === "undefined" && typeof results1[0] !== "undefined") {
                                results = await db.query('SELECT `utente`.id, `utente`.nome, `utente`.genere,\
                                DATE_FORMAT(`utente`.data_nascita,"%d/%m/%Y") AS data_nascita, `indirizzo`.via, `indirizzo`.numero,\
                                `indirizzo`.localita, `indirizzo`.cap,`indirizzo`.telefono, `comuni`.nome AS comune, `regioni`.nome AS regione, `province`.nome AS provincia,\
                                `pagamenti`.numero_carta, `pagamenti`.nominativo_p, DATE_FORMAT(`pagamenti`.data_scadenza, "%d/%m/%Y") AS data_scadenza, `pagamenti`.codice_sicurezza, `utente`.tipo\
                                FROM `utente`, `indirizzo`, `regioni`, `province`, `comuni`, `pagamenti`\
                                WHERE `utente`.id = ? AND `indirizzo`.id_utente = ? AND `pagamenti`.id_utente = ? AND `utente`.id_regione = `regioni`.id AND `utente`.id_provincia = `province`.id AND `utente`.id_comune = `comuni`.id', [
                                    id_utente,
                                    id_utente,
                                    id_utente
                                ])
                                .catch(err => {
                                    throw err;
                                });
        
                            console.log('Dati utente:');
                            console.log(results);
                            next(results);
                            }   
                            else {    
                            // recupero informazioni anagrafiche
                            results = await db.query('SELECT `utente`.id, `utente`.nome, `utente`.genere,\
                                DATE_FORMAT(`utente`.data_nascita,"%d/%m/%Y") AS data_nascita, `indirizzo`.via, `indirizzo`.numero,\
                                `indirizzo`.localita, `indirizzo`.cap,`indirizzo`.telefono, `comuni`.nome AS comune, `regioni`.nome AS regione, `province`.nome AS provincia,\
                                `pagamenti`.numero_carta, `pagamenti`.nominativo_p, DATE_FORMAT(`pagamenti`.data_scadenza, "%d/%m/%Y") AS data_scadenza, `pagamenti`.codice_sicurezza,\
                                `patenti`.identificativo, `patenti`.nazionalità_patente, DATE_FORMAT(`patenti`.data_rilascio, "%d/%m/%Y") AS data_rilascio, DATE_FORMAT(`patenti`.data_scadenza, "%d/%m/%Y") AS data_scadenza2, `patenti`.nominativo_pat, `utente`.tipo\
                                FROM `utente`, `indirizzo`, `regioni`, `province`, `comuni`, `patenti`, `pagamenti` \
                                WHERE `utente`.id = ? AND `indirizzo`.id_utente = ? AND `patenti`.id_utente = ? AND `pagamenti`.id_utente = ? AND `utente`.id_regione = `regioni`.id AND `utente`.id_provincia = `province`.id AND `utente`.id_comune = `comuni`.id', [
                                    id_utente,
                                    id_utente,
                                    id_utente,
                                    id_utente
                                ])
                                .catch(err => {
                                    throw err;
                                });
        
                            console.log('Dati utente:');
                            console.log(results);
                            next(results);
                            }    
                    }
                }    
            });    
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    },
    
    recupero:async function(req, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                // inserimento utente
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                if (results == 0) {
                    next('Utente non trovato');
                } 
                else {
                    let id_utente = results[0].id_utente;
                    let password = '12345678aA'
                    let pwdhash = crypto.createHash('sha512'); // istanziamo l'algoritmo di hashing
                    pwdhash.update(password); // cifriamo la password
                    let encpwd = pwdhash.digest('hex'); // otteniamo la stringa esadecimale
                    results = await db.query(' UPDATE `autenticazione`\
                    SET `password` = ? \
                    WHERE id_utente = ?', 
                        [
                            encpwd,
                            id_utente
                        ]).catch(err => {
                            throw err;
                        });
                    console.log('Password utente:');
                    console.log(results);
                    var mail = {
                        from: "8bitCarSharing@email.it",
                        to: emailR,
                        subject: "Ritardo",
                        text: "Nuova password casuale generata per il tuo account dal recupero: " + {password}
                    }
                    smtpTransport.sendMail(mail, function(error, response){
                        if(error){
                            console.log(error);
                        }else{
                            console.log("Message sent: " + response.message);
                        }
                        smtpTransport.close();
                    });
                    next(id_utente);
                }    
            });    
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    },
    
    elimina1:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                // inserimento utente
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                if (results == 0) {
                    next('Utente non trovato');
                }
                else {
                    let id_utente = results[0].id_utente;
                    results = await db.query('DELETE FROM `pagamenti`\
                    WHERE id_utente = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                    results = await db.query('DELETE FROM `patenti`\
                    WHERE id_utente = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                    results = await db.query('DELETE FROM `prenotazioni`\
                    WHERE id_utente = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                    results = await db.query('DELETE FROM `notifiche`\
                    WHERE id_utente = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });    
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
    
    elimina2:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let nonpresenza = 'No';
        try {
            await withTransaction(db, async() => {
                // inserimento utente
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                let id_utente = results[0].id_utente;       
                if (results == 0) {
                    next('Utente non trovato');
                }
                else {
                    let id_utente = results[0].id_utente;
                    results = await db.query('DELETE FROM `pagamenti`\
                    WHERE id_utente = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                }
                results = await db.query('UPDATE `utente`\
                SET `presenza_pagamento` = ?\
                WHERE id = ?', 
                    [
                        nonpresenza,
                        id_utente
                    ])
                    .catch(err => {
                        throw err;
                    });
        
                    console.log(results);
                    res.end();
            })
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    },
    
    elimina3:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        let nonpresenza = 'No';
        try {
            await withTransaction(db, async() => {
                // inserimento utente
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                let id_utente = results[0].id_utente;    
                if (results == 0) {
                    next('Utente non trovato');
                }
                else {
                    let id_utente = results[0].id_utente;
                    results = await db.query('DELETE FROM `patenti`\
                    WHERE id_utente = ?', id_utente) 
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                }
                results = await db.query('UPDATE `utente`\
                SET `presenza_patente` = ?\
                WHERE id = ?', 
                    [
                        nonpresenza,
                        id_utente
                    ])
                    .catch(err => {
                        throw err;
                    });
        
                    console.log(results);
                    res.end();
            })
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }
}