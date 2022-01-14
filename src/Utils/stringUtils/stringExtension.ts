import { List } from 'linqts';
import {
    strTransBigCamel,
    strTransSmallCamel,
    strTransSplit
} from '../stringUtil';

String.prototype.replaceAllChars = function (
    str: Array<string>,
    replaceChar: string
): string {
    let val = String(this).toString();
    for (let index = 0; index < str.length; index++) {
        const element = str[index];
        val = val.replaceAll(element, replaceChar);
    }
    return val;
};

String.prototype.firstCharToUpper = function (): string {
    var val = String(this).toString();
    return val.substring(0, 1).toUpperCase() + val.substring(1);
};

String.prototype.firstCharToLower = function (): string {
    var val = String(this).toString();
    return val.substring(0, 1).toLowerCase() + val.substring(1);
};

String.prototype.transBigCamel = function (splitChars: string[]): string {
    var str = String(this).toString();
    return strTransBigCamel(str, splitChars);
};

String.prototype.transSmallCamel = function (splitChars: string[]): string {
    var str = String(this).toString();
    return strTransSmallCamel(str, splitChars);
};

String.prototype.transSplitStr = function (splitChar: string): string {
    var str = String(this).toString();
    return strTransSplit(str, splitChar);
};

export {};
