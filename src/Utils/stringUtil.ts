import { List } from 'linqts';
import * as vscode from 'vscode';

const strTransBigCamel = (str: string, splitChars: string[]) => {
    splitChars?.map((s) => {
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
    return buildStr;
};
const strTransSmallCamel = (str: string, splitChars: string[]) => {
    splitChars?.map((s) => {
        str = str.replaceAll(s, ' ');
    });
    const aryStr = str.split(' ');
    let buildStr = '';
    if (aryStr.length > 0) {
        for (let index = 0; index < aryStr.length; index++) {
            const element = aryStr[index];
            let charletter = '';
            if (index === 0) {
                charletter =
                    element.substr(0, 1).toLowerCase() + element.substr(1);
            } else {
                charletter =
                    element.substr(0, 1).toUpperCase() + element.substr(1);
            }
            buildStr += charletter;
        }
    }
    return buildStr;
};
const strTransSplit = (str: string, splitChars: string) => {
    const reg = /[A-Za-z][a-z]+/g;
    const arrayStr = str.match(reg);
    let builder = new List<string>();
    var splitChar = vscode.workspace
        .getConfiguration()
        .get<string>('sundry.transSplitStr.firstChar');
    for (let index = 0; index < arrayStr!.length; index++) {
        const element = arrayStr![index];
        if (splitChar == 'upper') {
            builder.Add(element.firstCharToUpper());
        } else {
            builder.Add(element.firstCharToLower());
        }
    }
    return builder.ToArray().join(splitChars);
};
export { strTransBigCamel, strTransSmallCamel, strTransSplit };
