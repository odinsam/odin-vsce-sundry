import { stat } from 'fs';
import { opendir } from 'fs/promises';
import { List } from 'linqts';
import * as vscode from 'vscode';
import {
    GetCurrentDirectory,
    GetPath
} from '../generateFile/generateFileUtils';
const changeNamespace = async (uriPath: string) => {
    // uriPath = uriPath.startsWith('file:///')
    //     ? uriPath.replace('file://', '')
    //     : uriPath;
    stat(uriPath, async (err: any, stats: any) => {
        if (!err) {
            // 依据当前选择文件或文件夹，获取当前的文件夹路径 - dirPath
            const currentDirPath = GetCurrentDirectory(stats, uriPath);
            const dirPath = currentDirPath.split('/');
            // 按照路径 获取当前类文件的命名空间
            let nsArray = new List<string>();
            let flag = false;
            for (var i = dirPath.length - 1; i >= 0; i--) {
                const path = GetPath(dirPath, i);
                if (path != '') {
                    const currentPath =
                        path.split('/')[path.split('/').length - 1];
                    nsArray.Insert(0, currentPath);
                    const dir = await opendir(path);
                    //判断 当前目录是否包含 csproj 文件。如果包含，则是项目根路劲生成namespace
                    for await (const dirent of dir) {
                        const regRule = /.csproj$/g;
                        if (regRule.test(dirent.name)) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) break;
                } else {
                    break;
                    console.log(path);
                }
            }
            let ns = nsArray.ToArray().join('.');
            vscode.env.clipboard.writeText(`${ns}`);
            vscode.window.showInformationMessage(
                await vscode.env.clipboard.readText()
            );
        } else {
            console.log(err);
        }
    });
};
export default changeNamespace;
