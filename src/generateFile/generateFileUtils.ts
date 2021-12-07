const GetCurrentDirectory = (stats: any, uriPath: string): string => {
    if (!stats.isDirectory()) {
        uriPath = uriPath.substr(0, uriPath.lastIndexOf('/') + 1);
    }
    return uriPath;
};
const GetPath = function (aryString: string[], index: number) {
    var path = '';
    for (var i = 0; i <= index; i++) {
        path += aryString[i];
        if (i < index) path += '/';
    }
    return path;
};
export { GetCurrentDirectory, GetPath };
