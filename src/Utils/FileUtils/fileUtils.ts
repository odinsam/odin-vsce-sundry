import { stat } from 'fs';
import { appendFile, readFile, opendir } from 'fs/promises';
import { List } from 'linqts';
import {
    GetCurrentDirectory,
    GetPath
} from '../../generateFile/generateFileUtils';

export default class FileUtils {
    GetFullPath = async (uriPath: string) => {
        stat(uriPath, async (err: any, stats: any) => {
            const dirPath = GetCurrentDirectory(stats, uriPath).split('/');
            // 按照路径 获取当前类文件的命名空间
            let nsArray = new List<string>();
            let flag = false;
            for (var i = dirPath.length - 1; i >= 0; i--) {
                const path = GetPath(dirPath, i);
                if (path != '') {
                    nsArray.Insert(
                        0,
                        path.split('/')[path.split('/').length - 1]
                    );
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
            return nsArray.ToArray().join('.');
        });
    };
}
