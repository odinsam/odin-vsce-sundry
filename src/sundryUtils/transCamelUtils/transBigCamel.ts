import * as vscode from 'vscode';

const transBigCamel = async () => {
    let str = await vscode.env.clipboard.readText();
    var ary = vscode.workspace
        .getConfiguration()
        .get<Array<string>>('sundry.transCamel');
    const buildStr = str.transBigCamel(ary!);
    vscode.env.clipboard.writeText(`${buildStr}`);
    vscode.window.showInformationMessage(await vscode.env.clipboard.readText());
};
export default transBigCamel;
