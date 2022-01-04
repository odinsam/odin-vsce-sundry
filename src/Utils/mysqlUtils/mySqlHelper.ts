import { error } from 'console';
import dbConnectionSetting from '../../Models/dbConnectionSetting';
import resultModel from '../../Models/resultModel';
import connPool from './connPool';
var mysql = require('mysql2');

export default class mySqlHelper {
    dbSettings: dbConnectionSetting | null = null;
    connPool: any;
    pool: any;
    /**
     *
     */
    constructor(dbSettings: dbConnectionSetting, conn?: any) {
        this.dbSettings = dbSettings;
        this.pool = connPool(dbSettings);
    }

    Query = (sql: string, options: any, callback: any) => {
        this.pool.getConnection(function (err: any, conn: any) {
            if (err) {
                callback(err, null, null);
            } else {
                conn.query(
                    sql,
                    options,
                    function (err: any, results: any, fields: any) {
                        //事件驱动回调
                        callback(err, results, fields);
                    }
                );
                //释放连接，需要注意的是连接释放需要在此处释放，而不是在查询回调里面释放
                conn.release();
            }
        });
    };
}
