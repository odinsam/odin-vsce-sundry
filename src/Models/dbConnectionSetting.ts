export default class dbConnectionSetting {
    dbType: string = '';
    host: string = '';
    port: number = 0;
    userName: string = '';
    pwd: string = '';
    dataBase: string = '';
    /**
     *
     */
    constructor(
        dbType: string,
        host: string,
        port: number,
        userName: string,
        pwd: string,
        dataBase: string
    ) {
        this.dbType = dbType;
        this.host = host;
        this.port = port;
        this.userName = userName;
        this.pwd = pwd;
        this.dataBase = dataBase;
    }
}
