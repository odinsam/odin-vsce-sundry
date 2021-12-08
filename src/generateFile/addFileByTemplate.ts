import * as vscode from 'vscode';
import 'ts-replace-all';
import { stat } from 'fs';
import { appendFile, readFile, opendir } from 'fs/promises';
import { List } from 'linqts';
import { GetCurrentDirectory, GetPath } from './generateFileUtils';

const addFileByTemplate = async (
    addFileType: string,
    addFileName: string,
    uriPath: string
) => {
    stat(uriPath, async (err: any, stats: any) => {
        if (!err) {
            try {
                // 依据当前选择文件或文件夹，获取当前的文件夹路径 - dirPath
                const dirPath = GetCurrentDirectory(stats, uriPath).split('/');
                // 依据 dirPath 和用户输入的文件名,生成当前需要添加的类文件的完整路径
                let addClassFileFullPath = uriPath + `/${addFileName}.cs`;
                // 依据 config 配置获取模板文件路径
                const templateFilesPath = vscode.workspace
                    .getConfiguration()
                    .get<string>('sundry.generateFile.TemplateFiles');
                // 依据模板类型选择对应的模板
                const templateFilePath = `${templateFilesPath}/${addFileType}/${addFileType}Template.cs`;

                stat(templateFilePath, async (err: any, stats: any) => {
                    if (!err) {
                        try {
                            if (!stats.isFile()) {
                                //不是文件，找不到文件  弹出错误对话框
                                vscode.window.showErrorMessage(
                                    `找不到 ${addFileType}Template.cs 模板文件,请保证 Odinsam插件 TemplateFiles 配置正确`
                                );
                            } else {
                                // 读取配置文件 获取模板文件美容
                                let templateFileContent = await (
                                    await readFile(templateFilePath)
                                ).toString('ascii');
                                // 按照路径 获取当前类文件的命名空间
                                let nsArray = new List<string>();
                                let flag = false;
                                for (var i = dirPath.length - 1; i >= 0; i--) {
                                    const path = GetPath(dirPath, i);
                                    if (path != '') {
                                        nsArray.Insert(
                                            0,
                                            path.split('/')[
                                                path.split('/').length - 1
                                            ]
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
                                const ns = nsArray.ToArray().join('.');
                                //替换命名空间
                                templateFileContent =
                                    templateFileContent.replaceAll(
                                        '$namespace$',
                                        ns
                                    );
                                templateFileContent =
                                    templateFileContent.replaceAll(
                                        '$className$',
                                        addFileName
                                    );
                                // 获取自定义 占位符号 与 占位对应的值
                                const templatePlaceHold = vscode.workspace
                                    .getConfiguration()
                                    .get<string[]>(
                                        'sundry.generateFile.TemplatePlaceHold'
                                    );
                                const templatePlaceHoldValue = vscode.workspace
                                    .getConfiguration()
                                    .get<string[]>(
                                        'sundry.generateFile.TemplatePlaceHoldValue'
                                    );
                                // 替换所有内容
                                for (
                                    let i = 0;
                                    i < templatePlaceHold!.length;
                                    i++
                                ) {
                                    templateFileContent =
                                        templateFileContent.replaceAll(
                                            templatePlaceHold![i],
                                            templatePlaceHoldValue![i]
                                        );
                                }
                                await appendFile(
                                    addClassFileFullPath,
                                    templateFileContent
                                );
                                vscode.window.showInformationMessage('over');
                            }
                        } catch {}
                    } else {
                        //不是文件，找不到文件  弹出错误对话框
                        vscode.window.showErrorMessage(
                            '找不到 IApiServiceTemplate.cs 模板文件,请保证 Odinsam插件 TemplateFiles 配置正确'
                        );
                    }
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log(err);
        }
    });
};
export default addFileByTemplate;
