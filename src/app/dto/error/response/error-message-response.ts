export interface MessageResponseInterface {
    messageHeader: string;
    message: string;
}

export class MessageResponse implements MessageResponseInterface {
    messageHeader: string;
    message: string;

    constructor(message: string = '', messageHeader: string = '') {
        this.messageHeader = messageHeader;
        this.message = message;
    }

    getMessage(): string {
        return this.message;
    }

    setMessage(value: string): void {
        this.message = value;
    }

    clearMessage(): void {
        this.message = '';
    }
}