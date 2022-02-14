import * as vscode from 'vscode';
import 'ts-replace-all';
import transBigCamel from './sundryUtils/transCamelUtils/transBigCamel';
import transSmallCamel from './sundryUtils/transCamelUtils/transSmallCamel';
import addFileByTemplate from './generateFile/addFileByTemplate';
import { generateDbModels } from './generateFile/generateDbModels';
import changeNamespace from './sundryUtils/changeNamespace';
import transSplitStr from './sundryUtils/transSplitStr';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'sundry.transCamel.transSplitStr',
            async () => {
                await transSplitStr();
            }
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'sundry.changeNamespace',
            async (uri) => {
                await changeNamespace(uri.path);
            }
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'sundry.transCamel.transBigCamel',
            async () => {
                await transBigCamel();
            }
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'sundry.transCamel.transSmallCamel',
            async () => {
                await transSmallCamel();
            }
        )
    );

    /**
     *
     */
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'sundry.generateFile.addFileByTemplate',
            async (uri) => {
                // 弹出选择对话框，选择对应需要添加的文件类型
                vscode.window
                    .showQuickPick(
                        [
                            'Controller',
                            'IApiService',
                            'ApiService',
                            'IAppService',
                            'AppService',
                            'DbModel'
                        ],
                        {
                            //用于使选择器接受多个选择，如果为true，则结果为拾取数组。可选
                            canPickMany: false,
                            //设置为true可在焦点移动到编辑器的另一部分或另一窗口时保持选择器打开。此设置在iPad上被忽略，并且始终为false。可选
                            ignoreFocusOut: true,
                            //筛选拾取时包含描述的标志。可选
                            matchOnDescription: true,
                            //筛选拾取时包含详细信息的标志。可选
                            matchOnDetail: true,
                            //在输入框中显示为占位符的可选字符串，用于指导用户选择内容。可选
                            placeHolder: '温馨提示，请选择',
                            //表示快速拾取标题的可选字符串。可选
                            title: '请选择你要添加的文件'
                        }
                    )
                    .then(function (msg) {
                        if (!msg) {
                            return;
                        } else {
                            if (msg != 'DbModel') {
                                const currentUri = uri.path.toString();
                                // 添加文件类型
                                const addFileType = msg;
                                vscode.window
                                    .showInputBox({
                                        // 这个对象中所有参数都是可选参数
                                        password: false, // 输入内容是否是密码
                                        ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
                                        placeHolder:
                                            '请输入对应的 Controller/Interface/class 名称' // 在输入框内的提示信息
                                    })
                                    .then(function (msg) {
                                        if (msg == undefined || msg == null) {
                                            return;
                                        } else {
                                            // 添加文件名称
                                            const addFileName: string = msg!;
                                            let uriPath = currentUri
                                                .toString()
                                                .startsWith('file://')
                                                ? currentUri
                                                      .toString()
                                                      .replace('file://', '')
                                                : currentUri.toString();
                                            // 生成 文件
                                            addFileByTemplate(
                                                addFileType,
                                                addFileName,
                                                uriPath
                                            );
                                        }
                                    });
                            } else {
                                generateDbModels(uri.path.toString());
                            }
                        }
                    });
            }
        )
    );
}

export function deactivate() {}
