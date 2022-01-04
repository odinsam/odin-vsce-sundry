import dbConnectionSetting from '../Models/dbConnectionSetting';
import * as vscode from 'vscode';
import mySqlHelper from '../Utils/mysqlUtils/mysqlHelper';
import { List } from 'linqts';
import '../Utils/stringUtils/stringExtension';
import prefixSuffixString from '../Models/prefixSuffixString';
import addDbModelByTemplate from './addDbModelByTemplate';
const generateDbModels = (currentUri: string) => {
    const dbSettings = vscode.workspace
        .getConfiguration()
        .get<dbConnectionSetting>('sundry.generateFile.DbConnectionSetting');
    var sqlHelper: mySqlHelper = new mySqlHelper(dbSettings! ?? null);
    const sql = `select TABLE_name from information_schema.tables where table_schema='${dbSettings?.dataBase}' and table_type='BASE TABLE'`;
    // if (sqlHelper.Query(sql).code != 'ok') {
    // }
    sqlHelper.Query(sql, [], function (err: any, results: any, fields: any) {
        if (err) {
            console.log('[SQL ERROR] - ', err.message);
        }
        let lstResult = new List<string>();
        for (let index = 0; index < results.length; index++) {
            const element = results[index]['TABLE_NAME'];
            lstResult.Add(element);
        }
        // 弹出选择对话框，选择对应需要添加的文件类型
        vscode.window
            .showQuickPick(lstResult.ToArray(), {
                //用于使选择器接受多个选择，如果为true，则结果为拾取数组。可选
                canPickMany: true,
                //设置为true可在焦点移动到编辑器的另一部分或另一窗口时保持选择器打开。此设置在iPad上被忽略，并且始终为false。可选
                ignoreFocusOut: true,
                //筛选拾取时包含描述的标志。可选
                matchOnDescription: true,
                //筛选拾取时包含详细信息的标志。可选
                matchOnDetail: true,
                //在输入框中显示为占位符的可选字符串，用于DbMod指导用户选择内容。可选
                placeHolder: '温馨提示，请选择',
                //表示快速拾取标题的可选字符串。可选
                title: '请选择你要添加的文件'
            })
            .then(function (msg) {
                let result: { [key: string]: string } = {};
                let tables: List<string> = new List<string>();
                let classNames: List<string> = new List<string>();
                if (msg!.length > 0) {
                    var prefixSuffix = vscode.workspace
                        .getConfiguration()
                        .get<prefixSuffixString>(
                            'sundry.generateFile.dbModel.prefixSuffixString'
                        );

                    const prefixs = new List<string>(prefixSuffix?.prefix);
                    const suffixs = new List<string>(prefixSuffix?.suffix);
                    const modelPrefix = prefixSuffix?.addPrefix;
                    const modelSuffix = prefixSuffix?.addSuffix;
                    //前缀 后缀处理
                    msg?.map((m, index) => {
                        tables.Add(m);
                        if (prefixSuffix?.isKeepPrefix == false) {
                            prefixSuffix?.prefix.map((x) => {
                                if (m.startsWith(x))
                                    msg[index] = m.replace(x, '');
                            });
                        }
                        if (prefixSuffix?.isKeepSuffix == false) {
                            prefixSuffix?.suffix.map((x) => {
                                if (m.startsWith(x))
                                    msg[index] = m.replace(x, '');
                            });
                        }
                    });
                    // 驼峰命名处理
                    msg?.map((m, index) => {
                        let result = m
                            .replaceAllChars(
                                vscode.workspace
                                    .getConfiguration()
                                    .get<Array<string>>(
                                        'sundry.generateFile.dbModel.splitChars'
                                    )!,
                                ' '
                            )
                            .split(' ');
                        result.map((item, iindex) => {
                            result[iindex] = item.firstCharToUpper();
                        });

                        msg[index] = result.join('');
                        if (modelPrefix) {
                            msg[index] = modelPrefix + msg[index];
                        }
                        if (modelSuffix) {
                            msg[index] = msg[index] + modelSuffix;
                        }
                        classNames.Add(msg[index]);
                    });
                    // 生成dictionary数据
                    msg?.map((m, index) => {
                        result[tables.ElementAt(index)] =
                            classNames.ElementAt(index);
                    });
                    // 生成文件路径
                    let uriPath = currentUri.toString().startsWith('file://')
                        ? currentUri.toString().replace('file://', '')
                        : currentUri.toString();
                    // 生成 dbmodel 文件
                    addDbModelByTemplate(result, uriPath);
                }
            });
    });
};
export { generateDbModels };
