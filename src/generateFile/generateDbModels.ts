import dbConnectionSetting from '../Models/dbConnectionSetting';
import * as vscode from 'vscode';
import mySqlHelper from '../mysqlUtils/mysqlHelper';

const generateDbModels = (currentUri: string, tbName: string) => {
    const dbSettings = vscode.workspace
        .getConfiguration()
        .get<dbConnectionSetting>('sundry.generateFile.DbConnectionSetting');
    var sqlHelper: mySqlHelper = new mySqlHelper(dbSettings! ?? null);
    const sql = `select TABLE_name from information_schema.tables where table_schema='${dbSettings?.dataBase}' and table_type='BASE TABLE'`;
    // if (sqlHelper.Query(sql).code != 'ok') {
    // }
    var result = sqlHelper.Query(sql);
    console.log(result);
};
export { generateDbModels };
