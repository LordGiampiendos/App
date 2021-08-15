var createError = require('http-errors');
const { config } = require('../db/config');
const { makeDb, withTransaction } = require('../db/dbmiddleware');

module.exports = {
    aggiornaNotificheAdmin:async function(req, res, next) {
        // istanziamo il middleware
        const db = await makeDb(config);
        let results = {};
        try {
            await withTransaction(db, async() => {
             results = await db.query('SELECT * FROM `notifiche`')
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
    }
}