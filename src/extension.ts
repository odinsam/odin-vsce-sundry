import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'sundry.transCamel.transBigCamel',
            async () => {
                let str = await vscode.env.clipboard.readText();
                var ary = vscode.workspace
                    .getConfiguration()
                    .get<Array<string>>('sundry.transCamel');
                ary?.map((s) => {
                    str = str.replace(s, ' ');
                });
                const aryStr = str.split(' ');
                let buildStr = '';
                if (aryStr.length > 0) {
                    for (let index = 0; index < aryStr.length; index++) {
                        const element = aryStr[index];
                        const charletter =
                            element.substr(0, 1).toUpperCase() +
                            element.substr(1);
                        buildStr += charletter;
                    }
                }
                vscode.env.clipboard.writeText(`${buildStr}`);
                vscode.window.showInformationMessage(
                    await vscode.env.clipboard.readText()
                );
            }
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'sundry.transCamel.transSmallCamel',
            async () => {
                let str = await vscode.env.clipboard.readText();
                var ary = vscode.workspace
                    .getConfiguration()
                    .get<Array<string>>('sundry.transCamel');
                ary?.map((s) => {
                    str = str.replace(s, ' ');
                });
                const aryStr = str.split(' ');
                let buildStr = '';
                if (aryStr.length > 0) {
                    for (let index = 0; index < aryStr.length; index++) {
                        const element = aryStr[index];
                        let charletter = '';
                        if (index === 0) {
                            charletter =
                                element.substr(0, 1).toLowerCase() +
                                element.substr(1);
                        } else {
                            charletter =
                                element.substr(0, 1).toUpperCase() +
                                element.substr(1);
                        }
                        buildStr += charletter;
                    }
                }
                vscode.env.clipboard.writeText(`${buildStr}`);
                vscode.window.showInformationMessage(
                    await vscode.env.clipboard.readText()
                );
            }
        )
    );
}

// this method is called when your extension is deactivated
export function deactivate() {}
