import * as vscode from 'vscode';
import { strTransSmallCamel } from '../../Utils/stringUtil';

const transSmallCamel = async () => {
    let str = await vscode.env.clipboard.readText();
    var ary = vscode.workspace
        .getConfiguration()
        .get<Array<string>>('sundry.transCamel');
    const buildStr = str.transSmallCamel(ary!);
    vscode.env.clipboard.writeText(`${buildStr}`);
    vscode.window.showInformationMessage(await vscode.env.clipboard.readText());
};
export default transSmallCamel;
