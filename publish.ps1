# 作者：yanzhengyu
# 功能：发布项目到文件目录并生成Docker镜像
$publishType=Read-Host "Please select publish method:[1]win7-x64;[2]linux-x64;[3]osx-x64;[4]docker;[A]All"
$runSonar=Read-Host "Open Sonar Scanner:[Y]Yes;[N]No"
#Param([string] $rootPath)
$rootPath = Split-Path $script:MyInvocation.MyCommand.Path

Write-Host "Root path used is $rootPath" -ForegroundColor Yellow

$projectPaths =
@{Path= "$rootPath\Src\NalongPay.Service.Http";Prj= "NalongPay.Service.Http.csproj";Name="webapi"}
$projectPaths | foreach {
    $projectPath = $_.Path
    $projectFile = $_.Prj
    $name=$_.Name
    # 输出目录
    $outPath = $rootPath+"\publish\"+$name
    # 代码目录
    $projectPathAndFile = "$projectPath\$projectFile"
    $slnPath =  "$rootPath\NalongPay.Service.sln"
    $buildresultmldata =[XML](Get-Content $rootPath"\common.props" -Encoding UTF8)
    #应用版本
    $version=$buildresultmldata.Project.PropertyGroup.Version
    Write-Host  "appversion： $version  projectPathAndFile： $projectPathAndFile projectPath：$projectPath" -ForegroundColor Yellow
    Write-Host "Deleting old publish files in $outPath" -ForegroundColor Yellow
    remove-item -path $outPath -Force -Recurse -ErrorAction SilentlyContinue
    Write-Host "Publishing $projectPath to $outPath" -ForegroundColor Yellow
    #恢复项目
    & dotnet restore $projectPathAndFile
    if("Y".CompareTo($runSonar.ToUpper()) -eq 0){
        #sonar扫描
        & dotnet sonarscanner begin /k:"NalongPay.Service" /v:"$version" /d:sonar.host.url="http://192.168.5.129:9000" /d:sonar.login="0700c9583c61d0d0ef20edbaca429953261e11ce"
        & dotnet build $slnPath
        & dotnet sonarscanner end /d:sonar.login="0700c9583c61d0d0ef20edbaca429953261e11ce"
    }
    #1.发布win版本
    if(("1".CompareTo($publishType) -eq 0) -Or ("A".CompareTo($publishType) -eq 0)){
        & dotnet publish $projectPath -o ($outPath+"\win7-x64") -r win7-x64 -c release
    }
    #2.发布linux
    if(("2".CompareTo($publishType) -eq 0) -Or ("A".CompareTo($publishType) -eq 0)){
        & dotnet publish $projectPath -o ($outPath+"\linux-x64") -r linux-x64 -c release
    }
    #3.发布osx
    if(("3".CompareTo($publishType) -eq 0) -Or ("A".CompareTo($publishType) -eq 0)){
        & dotnet publish $projectPath -o ($outPath+"\osx-x64") -r osx-x64 -c release
    }
    #4.打包docker image
    if(("4".CompareTo($publishType) -eq 0) -Or ("A".CompareTo($publishType) -eq 0)){
        & dotnet publish $projectPath -o ($outPath+"\linux-x64") -r linux-x64 -c release
        $dockerId=("NalongPay.Service").toLower()
        $dockerBuildTarget=  $dockerId+":"+$version
        docker build $rootPath -t docker.aecg.com.cn/dotnet/nalong/$dockerBuildTarget
        Write-Host $buildOutput -ForegroundColor Green
        #获取镜像Id
        $SuccessfullyBegin= $buildOutput.indexof("Successfully built")
        $SuccessfullyEnd= $buildOutput.indexof("Successfully tagged")
        $imageId= $buildOutput.Substring( $SuccessfullyBegin+"Successfully built".Length,$SuccessfullyEnd-$SuccessfullyBegin-"Successfully built".Length) -replace " ",""
        Write-Host "docker buildId: $imageId   " -ForegroundColor Green
        docker push docker.aecg.com.cn/dotnet/nalong/$dockerBuildTarget
    }
}