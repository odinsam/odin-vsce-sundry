#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM docker.aecg.com.cn/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone
COPY ["publish/webapi/linux-x64", "."]
ENTRYPOINT ["dotnet", "NalongPay.Service.Http.dll"]
CMD ["--help"]
#docker run -d --name=orcas -p 7001:7002 -e ASPNETCORE_URLS=http://0.0.0.0:7002 registry.cn-hangzhou.aliyuncs.com/nalong/aquarium.orcas.service:4.0.1.1 --nacosConfig:ServerAddresses:0=http://192.168.5.130:8848 --nacos:ServerAddresses:0=http://192.168.5.130:8848




