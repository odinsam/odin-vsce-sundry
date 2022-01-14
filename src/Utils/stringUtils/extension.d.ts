declare global {
    interface String {
        replaceAllChars(str: Array<string>, replaceChar: string): string;
        firstCharToUpper(): string;
        firstCharToLower(): string;
        transBigCamel(splitChars: string[]): string;
        transSmallCamel(splitChars: string[]): string;
        transSplitStr(splitChars: string): string;
    }
}

export {};
