export default interface ISqlResult {
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
}
