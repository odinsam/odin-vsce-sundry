import dbConnectionSetting from '../../Models/dbConnectionSetting';

var mysql = require('mysql');
const connPool = (dbSettings: dbConnectionSetting): any => {
    return mysql.createPool({
        host: dbSettings.host,
        user: dbSettings.userName,
        password: dbSettings.pwd,
        database: dbSettings.dataBase,
        port: dbSettings.port
    });
};
export default connPool;
