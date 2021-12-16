export default class resultModel {
    code: string;
    data: any | null | undefined;
    error: any | null | undefined;
    message: string | undefined;
    timer: string | undefined;
    /**
     *
     */
    constructor({
        code = 'ok',
        data = null,
        error = null,
        message = ''
    }: {
        code?: string;
        data?: any | null | undefined;
        error?: any | null | undefined;
        message?: string | undefined;
    }) {
        this.code = code;
        this.data = data;
        this.error = error;
        this.message = message;
        this.timer = Date.now().toString();
    }
}
