export class Logger {
    private logger: Function
    private loggerAsString: string

    constructor() {
        this.logger = alert
        this.loggerAsString = "alert"
    }

    log(content: any): void {
        this.logger(content)
    }

    error(error: any): void {
        this.logger(error)
    }

    logAsString(content: any): string {
        return `${this.loggerAsString}(${content})`
    }
}