export interface MessageResponseInterface {
    message: string;
}

export class MessageResponse implements MessageResponseInterface {
    message: string;

    constructor(message: string = '') {
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