import * as vscode from 'vscode';

const transSplitStr = async () => {
    let str = await vscode.env.clipboard.readText();
    var splitChar = vscode.workspace
        .getConfiguration()
        .get<string>('sundry.transSplitStr.splitChar');
    const buildStr = str.transSplitStr(splitChar!);
    vscode.env.clipboard.writeText(`${buildStr}`);
    vscode.window.showInformationMessage(await vscode.env.clipboard.readText());
};
export default transSplitStr;
