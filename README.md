# Sundry

![](https://img.shields.io/badge/version-1.0.0-brightgreen.svg) ![](https://img.shields.io/github/issues/odinsam/Sundry) ![](https://img.shields.io/github/forks/odinsam/Sundry) ![](https://img.shields.io/github/stars/odinsam/Sundry) ![](https://img.shields.io/badge/platform-typeScript-brightgreen.svg) ![](https://img.shields.io/github/license/odinsam/Sundry) [![](https://img.shields.io/badge/Blog-odinsam.com-blue.svg)](https://odinsam.com)

**简介:**

### v2 新增模板文件功能 - 使用模板文件，自动生成文件，使用说明：

1. 在电脑中新建 template 文件夹，在文件夹内新建 Controller IApiService ApiService IAppService AppService 文件夹

2. 在上一步创建的文件夹中 创建对应文件 ControllerTemplate.cs IApiServiceTemplate.cs ApiServiceTemplate.cs IAppServiceTemplate.cs AppServiceTemplate.cs

3. 具体文件的内容可以自定义，插件保留 $namespace$ 和 $className$ 两个占位符,具体文件内容样例如下:

```csharp
namespace $namespace$
{
    public interface $className$ : INalongApiService
    {
        $username$
    }
}
```

4. 插件 配置如下：

```json
{
    "sundry.generateFile.TemplateFiles": "/xxx/xxx/TemplateFiles",
    "sundry.generateFile.TemplatePlaceHold": ["$username$"],
    "sundry.generateFile.TemplatePlaceHoldValue": ["odinsam"]
}
```

### v1 驼峰大小写转换

配置中默认以 空格 - ， 作为分隔符。可以配置

复制需要转换的句子或者词组，右键 选择菜单 驼峰大小写转换 或者 快捷键

大驼峰 cmd(ctrl)+t cmd(ctrl)+b

小驼峰 cmd(ctrl)+t cmd(ctrl)+s

配置如下:

```json
{
    "sundry.transCamel": [" ", "-", ",", "."]
}
```
