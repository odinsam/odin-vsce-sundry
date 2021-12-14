import { error } from 'console';
import dbConnectionSetting from '../Models/dbConnectionSetting';
import resultModel from '../Models/resultModel';
var mysql = require('mysql2');

export default class mySqlHelper {
    dbSettings: dbConnectionSetting | null = null;
    conn: any;
    /**
     *
     */
    constructor(dbSettings: dbConnectionSetting, conn?: any) {
        this.dbSettings = dbSettings;
        this.conn = mysql.createConnection({
            host: this.dbSettings!.host,
            user: this.dbSettings!.port,
            password: this.dbSettings!.pwd,
            port: this.dbSettings!.port,
            database: this.dbSettings!.dataBase,
            insecureAuth: true
        });
    }

    Query = (sql: string, sqlParams?: any[]): resultModel => {
        this.conn.connect((err: any) => {
            if (!err) throw err;
        });
        var result = this.conn.query(
            sql,
            sqlParams,
            function (err: any, result: any) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return new resultModel({
                        code: 'err-db-select',
                        message: '数据库查询失败',
                        error: err
                    });
                }
                return new resultModel({
                    data: result
                });
            }
        );
        this.conn.end();
        return result;
    };

    Insert = (sql: string, sqlParams?: any[]): resultModel => {
        this.conn.connect((err: any) => {
            if (!err) throw err;
        });
        var result = this.conn.query(
            sql,
            sqlParams,
            function (err: any, result: any) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return new resultModel({
                        code: 'err-db-insert',
                        message: '数据库插入失败',
                        error: err
                    });
                }
                return new resultModel({
                    data: result.OkPacket
                });
            }
        );
        this.conn.end();
        return result;
    };

    Update = (sql: string, sqlParams?: any[]): resultModel => {
        this.conn.connect((err: any) => {
            if (!err) throw err;
        });
        var result = this.conn.query(
            sql,
            sqlParams,
            function (err: any, result: any) {
                if (err) {
                    console.log('[UPDATE ERROR] - ', err.message);
                    return new resultModel({
                        code: 'err-db-update',
                        message: '数据库更新失败',
                        error: err
                    });
                }
                return new resultModel({
                    data: result.affectedRows
                });
            }
        );
        this.conn.end();
        return result;
    };

    Delete = (sql: string, sqlParams?: any[]): resultModel => {
        this.conn.connect((err: any) => {
            if (!err) throw err;
        });
        var result = this.conn.query(
            sql,
            sqlParams,
            function (err: any, result: any) {
                if (err) {
                    console.log('[DELETE ERROR] - ', err.message);
                    return new resultModel({
                        code: 'err-db-delete',
                        message: '数据库删除失败',
                        error: err
                    });
                }
                return new resultModel({
                    data: result.affectedRows
                });
            }
        );
        this.conn.end();
        return result;
    };
}
