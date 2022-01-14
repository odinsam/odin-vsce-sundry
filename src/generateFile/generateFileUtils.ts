const GetCurrentDirectory = (stats: any, uriPath: string): string => {
    if (!stats.isDirectory()) {
        uriPath = uriPath.substring(0, uriPath.lastIndexOf('/'));
    }
    return uriPath;
};
const GetPath = function (aryString: string[], index: number) {
    var path = '';
    for (let i = 0; i <= index; i++) {
        path += aryString[i];
        if (i < index) path += '/';
    }
    return path;
};
export { GetCurrentDirectory, GetPath };
