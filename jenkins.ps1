$rootPath = Split-Path $script:MyInvocation.MyCommand.Path
$projectPaths =
@{Path= $rootPath+"/Src/NalongPay.Service.Http";Prj= "NalongPay.Service.Http.csproj";Name="webapi"}
$projectPaths | ForEach-Object {
    $projectPath = $_.Path
    $projectFile = $_.Prj
    $name=$_.Name
    # 输出目录
    $outPath = $rootPath+"/publish/"+$name
    # 代码目录
    $projectPathAndFile = $projectPath+"/"+$projectFile
    $buildresultmldata =[XML](Get-Content "$rootPath/common.props" -Encoding UTF8)
    #应用版本
    $version=$buildresultmldata.Project.PropertyGroup.Version
    #恢复项目
    dotnet restore $projectPathAndFile
    dotnet publish $projectPath -o ($outPath+"/linux-x64") -r linux-x64 -c release
    $dockerId=("NalongPay.Service").toLower()
    $dockerBuildTarget=  $dockerId+":"+$version
    docker build $rootPath -t docker.aecg.com.cn/dotnet/nalong/$dockerBuildTarget
    docker push docker.aecg.com.cn/dotnet/nalong/$dockerBuildTarget
}