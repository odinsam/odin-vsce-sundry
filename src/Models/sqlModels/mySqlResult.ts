import ISqlResult from './ISqlResult';

export default class mySqlResult implements ISqlResult {
    RowDataPacket: { [key: string]: any }[] | undefined;
    affectedRows: number | undefined;
    OkPacket:
        | {
              fieldCount: number;
              affectedRows: number;
              insertId: any;
              serverStatus: number;
              warningCount: number;
              message: string;
              protocol41: boolean;
              changedRows: number;
          }
        | undefined;
    /**
     *
     */
    constructor({
        RowDataPacket,
        affectedRows,
        OkPacket
    }: {
        RowDataPacket?: { [key: string]: any }[] | undefined;
        affectedRows?: number | undefined;
        OkPacket?:
            | {
                  fieldCount: number;
                  affectedRows: number;
                  insertId: any;
                  serverStatus: number;
                  warningCount: number;
                  message: string;
                  protocol41: boolean;
                  changedRows: number;
              }
            | undefined;
    }) {
        this.RowDataPacket = RowDataPacket;
        this.OkPacket = OkPacket;
        this.affectedRows = affectedRows;
    }
}
