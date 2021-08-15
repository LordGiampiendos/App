const mysql = require('mysql');
const util = require('util');

exports.makeDb = async function(config) {

    let pool = mysql.createPool(config);
    console.log('Pool creato dalla configurazione');

    let getConnection = () => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) {
                    return reject(err);
                }
                resolve(connection);
            });
        });
    };

    const connection = await getConnection();
    console.log('connessione creata: ');
    console.log(connection);

    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        connRelease() {
            return util.promisify(connection.release)
                .call(connection);
        },
        beginTransaction() {
            return util.promisify(connection.beginTransaction)
                .call(connection);
        },
        commit() {
            return util.promisify(connection.commit)
                .call(connection);
        },
        rollback() {
            return util.promisify(connection.rollback)
                .call(connection);
        },
        end() {
            return pool.end.call(pool);
        }
    };
}

exports.withTransaction = async function(db, callback) {
    try {
        await db.beginTransaction();
        await callback();
        await db.commit();
    } catch (err) {
        await db.rollback();
        throw err;
    } finally {
        db.end();
    }
}