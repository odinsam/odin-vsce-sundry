export default class prefixSuffixString {
    prefix: Array<string> = [];
    addPrefix: string = '';
    suffix: Array<string> = [];
    addSuffix: string = '';
    isKeepPrefix: boolean = false;
    isKeepSuffix: boolean = false;
    /**
     *
     */
    constructor(
        prefix: Array<string>,
        addPrefix: string,
        suffix: Array<string>,
        addSuffix: string,
        isKeepPrefix: boolean,
        isKeepSuffix: boolean
    ) {
        this.prefix = prefix;
        this.addPrefix = addPrefix;
        this.suffix = suffix;
        this.addSuffix = addSuffix;
        this.isKeepPrefix = isKeepPrefix;
        this.isKeepSuffix = isKeepSuffix;
    }
}
