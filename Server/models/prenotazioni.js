var createError = require('http-errors');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');
const mailer = require('nodemailer');

var smtpTransport = mailer.createTransport({
    service: "email",
    auth: {
        user: "8bitCarSharing@email.it",
        pass: "email_password"
    }
});

timer = new Array();

function GetHourDiff(pStartHour, pEndHour) {
    var res = "";
    var aTmp="";
    //Trasformo l'orario di inizio in minuti
    aTmp=pStartHour.split(":");
    var nStartMin = (Number(aTmp[0]) * 60) + Number(aTmp[1]);
    //Trasformo l'orario di fine in minuti
    aTmp=pEndHour.split(":");
    var nEndMin = (Number(aTmp[0]) * 60) + Number(aTmp[1]);
    //Calcolo la differenza
    var nDiff = 0;
    if (nStartMin > nEndMin) {
        nDiff = nStartMin - nEndMin;
    } else {
        nDiff = nEndMin - nStartMin;
    }
    //Formatto la stringa di uscita
    var nDiffMin = 0;
    var nDiffHour  = 0;
    if (nDiff > 59) {
        nDiffMin = nDiff % 60;
        nDiffHour = (nDiff - nDiffMin) / 60;
    } else {
        nDiffMin = nDiff;
    }
    if (nDiffHour < 10) res += "0";
    res += nDiffHour;
    res += ":";
    if (nDiffMin < 10) res += "0";
    res += nDiffMin;
    return res;
}

function pagamento(data_noleggio_finale, data_noleggio_iniziale, orario_noleggio_iniziale, orario_noleggio_finale) {
    let data1 = new Date(data_noleggio_iniziale);
    let data2 = new Date(data_noleggio_finale);
    let differenza = Math.abs((parseInt((data2 - data1) / (1000 * 3600))));
    let differenza2 = GetHourDiff(orario_noleggio_iniziale, orario_noleggio_finale);
    let differenza3 = parseInt(differenza2.slice(0, 2));
    let somma = differenza + differenza3;
    return somma;
}

module.exports = {
    myFunction:async function(id_utente, emailR, next) {
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
            let notifica = 'Sei in ritardo con la consegna!';
            results = await db.query('INSERT INTO `notifiche` \
            (id_utente, notifica) VALUES ?', [
                [
                    [
                        id_utente,
                        notifica
                    ]
                ]
            ])
                .catch(err => {
                    results = 0;
                    throw err;
                });
    
                console.log(results);
                var mail = {
                    from: "8bitCarSharing@email.it",
                    to: emailR,
                    subject: "Ritardo",
                    text: "Sei in ritardo con la consegna!"
                }
    
                var mail2 = {
                    from: "8bitCarSharing@email.it",
                    to: "adiministrato@admin.it",
                    subject: "Ritardo",
                    text: "L'utente " + id_utente + "è in ritardo con la consegna!"
                }
                
                smtpTransport.sendMail(mail, function(error, response){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Message sent: " + response.message);
                    }
                    smtpTransport.close();
                });
    
                smtpTransport.sendMail(mail2, function(error, response){
                    if(error){
                        console.log(error);
                    }else{
                        console.log("Message sent: " + response.message);
                    }
                    smtpTransport.close();
                });
        })       
        } catch (err) {
            console.log(err);
            next(createError(500));
        }    
    },
    
    insPrenotazioni:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
    
                    console.log(results);
            
            let id_utente = results[0].id_utente;
            let Null = "No";
            if(req.body.costo_prenotazione === 0 || (!req.body.id_autista && !req.body.id_addetto) || req.body.destinazione === '' || req.body.luogo_rilascio_ritiro === '' || req.body.presenza_autista === '') {
                next('Compila tutti i campi!');
            }
            else { 
             results = await db.query('INSERT INTO `prenotazioni` \
            (id_utente, data_noleggio_iniziale, orario_noleggio_iniziale, data_noleggio_finale, orario_noleggio_finale, luogo_rilascio_ritiro, modello, presenza_autista, id_autista, id_addetto, destinazione, numero_carta, rilasciato, consegnato, restituito, costo_prenotazione) VALUES ?', [
                        [
                            [
                                id_utente,
                                req.body.data_noleggio_iniziale,
                                req.body.orario_noleggio_iniziale,
                                req.body.data_noleggio_finale,
                                req.body.orario_noleggio_finale,
                                req.body.luogo_rilascio_ritiro,
                                req.body.modello,
                                req.body.presenza_autista,
                                req.body.id_autista,
                                req.body.id_addetto,
                                req.body.destinazione,
                                req.body.numero_carta,
                                Null,
                                Null,
                                Null, 
                                req.body.costo_prenotazione
                            ]
                        ]
                    ])
                    .catch(err => {
                        throw err;
                    });
                    
                    console.log(results);
                    res.end();
            }            
        })       
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    },
    
    ritPrenotazioni:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
    
                    console.log(results);
            if(req.body.data_noleggio_finale === '' || req.body.orario_noleggio_finale === '' || req.body.destinazione === '' || req.body.costo_prenotazione === '' || req.body.restituito === '') {
                next('Compila tutti i campi!');
            }
            else {
            let id_utente = results[0].id_utente;
             results = await db.query('SELECT * FROM `prenotazioni`\
            WHERE id_utente = ?', id_utente)
                .catch(err => {
                    results = 0;
                    throw err;
                });
    
                console.log(results);
            let data_noleggio_iniziale = results[0].data_noleggio_iniziale;
            let orario_noleggio_iniziale = results[0].orario_noleggio_iniziale
            if(typeof results[0] === "undefined") {
                next('La prenotazione non esiste');
            }
            else {
             results = await db.query('UPDATE `prenotazioni`\
            SET `data_noleggio_finale` = ?, `orario_noleggio_finale` = ?, `destinazione` = ?, `restituito` = ?, `costo_prenotazione` = ?\
            WHERE id_utente = ? AND id = ?', 
                [
                    req.body.data_noleggio_finale,
                    req.body.orario_noleggio_finale,
                    req.body.destinazione,
                    req.body.restituito,
                    req.body.costo_prenotazione,
                    id_utente,
                    req.body.id
                ])
                .catch(err => {
                    throw err;
                });
    
                console.log(results);
                if (timer[req.body.id]) {
                    clearTimeout(timer[req.body.id]);
                }  
                timer[req.body.id] = setTimeout(() => myFunction(id_utente), pagamento(req.body.data_noleggio_finale, data_noleggio_iniziale, orario_noleggio_iniziale, req.body.orario_noleggio_finale) * 3600000); 
                res.end();
            }
            }
        })       
        } catch (err) {
            console.log(err);
            next(createError(500));
        }    
    },
    
    aggiornaPrenotazioni:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE email = ?', req.body.email)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
    
                    console.log(results);
            
            let id_utente = results[0].id_utente;
             results = await db.query('SELECT * FROM `prenotazioni`\
            WHERE id_utente = ?', id_utente)
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
    
    aggiornaPrenotazioniAdmin:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
             results = await db.query('SELECT * FROM `prenotazioni`')
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
    
    aggiornaPrenotazioniAutista:async function(req, res, next) {
       // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
             results = await db.query('SELECT * FROM `prenotazioni`\
            WHERE id_autista = ?', req.body.id_autista)
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
    
    aggiornaPrenotazioniAddettoAllaConsegna:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
             results = await db.query('SELECT * FROM `prenotazioni`\
            WHERE id_addetto = ?', req.body.id_addetto)
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
    
    rilascia:async function(req, res, next) {
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
                    results = await db.query('SELECT * FROM `prenotazioni`\
                    WHERE id_utente = ?', id_utente)
                        .catch(err => {
                            results = 0;
                            throw err;
                    });
                    let data_noleggio_finale = results[0].data_noleggio_finale;
                    let data_noleggio_iniziale = results[0].data_noleggio_iniziale;
                    let orario_noleggio_iniziale = results[0].orario_noleggio_iniziale
                    let orario_noleggio_finale = results[0].orario_noleggio_finale;
                    let Null = "Sì";
                    results = await db.query('UPDATE `prenotazioni`\
                    SET `rilasciato` = ?\
                    WHERE id_utente = ? AND id = ?', 
                    [
                        Null,
                        id_utente,
                        req.body.id
                    ])
                    .catch(err => {
                        throw err;
                    });
    
                    console.log(results);
                    if (timer[req.body.id]) {
                        clearTimeout(timer[req.body.id]);
                    }  
                    timer[req.body.id] = setTimeout(() => myFunction(id_utente), pagamento(data_noleggio_finale, data_noleggio_iniziale, orario_noleggio_iniziale, orario_noleggio_finale) * 3600000);    
                }
                res.end();
            })
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    },
    
    rilasciaA:async function(req, res, next) {
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
                    results = await db.query('SELECT * FROM `prenotazioni`\
                    WHERE id_utente = ?', id_utente)
                        .catch(err => {
                            results = 0;
                            throw err;
                    });
                    let data_noleggio_finale = results[0].data_noleggio_finale;
                    let data_noleggio_iniziale = results[0].data_noleggio_iniziale;
                    let orario_noleggio_iniziale = results[0].orario_noleggio_iniziale
                    let orario_noleggio_finale = results[0].orario_noleggio_finale;
                    let Null = "Sì";
                    results = await db.query('UPDATE `prenotazioni`\
                    SET `consegnato` = ?\
                    WHERE id_utente = ? AND id = ?', 
                    [
                        Null,
                        id_utente,
                        req.body.id
                    ])
                    .catch(err => {
                        throw err;
                    });
    
                    console.log(results);
                    if (timer[req.body.id]) {
                        clearTimeout(timer[req.body.id]);
                    }  
                    timer[req.body.id] = setTimeout(() => myFunction(id_utente), pagamento(data_noleggio_finale, data_noleggio_iniziale, orario_noleggio_iniziale, orario_noleggio_finale) * 3600000);    
                }
                res.end();
            })
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    },
    
    rilasciaL:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
                let Null = "Sì";
                results = await db.query('SELECT * FROM `autenticazione`\
                WHERE id_utente = ?', req.body.id)
                    .catch(err => {
                        results = 0;
                        throw err;
                    });
                let email = results[0].email;
                results = await db.query('SELECT * FROM `prenotazioni`\
                WHERE id = ?', req.body.id);
                let id_utente = results[0].id_utente;
                let data_noleggio_finale = results[0].data_noleggio_finale;
                let data_noleggio_iniziale = results[0].data_noleggio_iniziale;
                let orario_noleggio_iniziale = results[0].orario_noleggio_iniziale
                let orario_noleggio_finale = results[0].orario_noleggio_finale;
                results = await db.query('UPDATE `prenotazioni`\
                SET `rilasciato` = ?\
                WHERE id = ?', 
                [
                    Null,
                    req.body.id
                ])
                .catch(err => {
                    throw err;
                });
    
                console.log(results);
                if (timer[req.body.id]) {
                    clearTimeout(timer[req.body.id]);
                }  
                timer[req.body.id] = setTimeout(() => myFunction(id_utente, email), pagamento(data_noleggio_finale, data_noleggio_iniziale, orario_noleggio_iniziale, orario_noleggio_finale) * 3600000);    
                res.end();
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
                    let Null = "Sì";
                    results = await db.query('UPDATE `prenotazioni`\
                    SET `restituito` = ?\
                    WHERE id_utente = ? AND id = ?', 
                    [
                        Null,
                        id_utente,
                        req.body.id
                    ])
                    .catch(err => {
                        throw err;
                    });
    
                    console.log(results);
                    if (timer[req.body.id]) {
                        clearTimeout(timer[req.body.id]);
                    }  
                }
                res.end();
            })
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
                let Null = "Sì";
                results = await db.query('UPDATE `prenotazioni`\
                SET `restituito` = ?\
                WHERE id = ?', 
                [
                    Null,
                    req.body.id
                ])
                .catch(err => {
                    throw err;
                });
    
                console.log(results);
                if (timer[req.body.id]) {
                    clearTimeout(timer[req.body.id]);
                }  
                res.end();    
            })
        } catch (err) {
            console.log(err);
            next(createError(500));
        }
    }
}