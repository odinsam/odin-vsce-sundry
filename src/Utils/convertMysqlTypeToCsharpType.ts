import { match } from 'assert';

const convertMysqlTypeToCsharpType = function (mysqlType: string): {
    key: string;
    length: number | null;
} {
    const typenameReg = /[a-zA-Z]+/g;
    const typeLengthReg = /[0-9]+(,[0-9]+)?/g;
    const typeName = typenameReg.exec(mysqlType)![0];
    var exResult = typeLengthReg.exec(mysqlType);
    const typeLength = exResult == null ? null : Number.parseInt(exResult[0]);
    const mt = typeName.toUpperCase();
    return {
        key: changeMysqlTypeToCsharpType(mt),
        length: typeLength
    };
};

const changeMysqlTypeToCsharpType = function (mysqlType: string): string {
    switch (mysqlType) {
        case 'TINYINT':
            return 'sbyte';
        case 'SMALLINT':
            return 'short';
        case 'MEDIUMINT':
            return 'int';
        case 'INT':
            return 'int';
        case 'INTEGER':
            return 'int';
        case 'BIGINT':
            return 'long';
        case 'FLOAT':
            return 'float';
        case 'DOUBLE':
            return 'double';
        case 'DECIMAL':
            return 'float';

        case 'CHAR':
            return 'string';
        case 'VARCHAR':
            return 'string';
        case 'TINYBLOB':
            return 'string';
        case 'TINYTEXT':
            return 'string';
        case 'BLOB':
            return 'string';
        case 'TEXT':
            return 'string';
        case 'MEDIUMBLOB':
            return 'string';
        case 'MEDIUMTEXT':
            return 'string';
        case 'LONGBLOB':
            return 'string';
        case 'LONGTEXT':
            return 'string';

        case 'DATE':
            return 'string';
        case 'TIME':
            return 'string';
        case 'YEAR':
            return 'string';
        case 'DATETIME':
            return 'string';
        case 'TIMESTAMP':
            return 'long';

        default:
            return 'string';
    }
};

export { convertMysqlTypeToCsharpType, changeMysqlTypeToCsharpType };
