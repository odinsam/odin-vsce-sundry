import * as vscode from 'vscode';

const transBigCamel = async () => {
    let str = await vscode.env.clipboard.readText();
    var ary = vscode.workspace
        .getConfiguration()
        .get<Array<string>>('sundry.transCamel');
    ary?.map((s) => {
        str = str.replaceAll(s, ' ');
    });
    const aryStr = str.split(' ');
    let buildStr = '';
    if (aryStr.length > 0) {
        for (let index = 0; index < aryStr.length; index++) {
            const element = aryStr[index];
            const charletter =
                element.substr(0, 1).toUpperCase() + element.substr(1);
            buildStr += charletter;
        }
    }
    vscode.env.clipboard.writeText(`${buildStr}`);
    vscode.window.showInformationMessage(await vscode.env.clipboard.readText());
};
export default transBigCamel;
