import { tgUser } from "@/stores/mainstore";

type IRoute = 'game' | 'overview' | 'balance' | 'trivia' | 'farming';
type IAction = 'createSession' | 'addQuestionToSession' | 'addOptionToQuestion' | 'answerQuestion' | 'getActiveSession' | 'createEra' | 'activeEra' | 'harvestEra';

class WebSocketClient {
    socket: WebSocket | null = null;
    reconnectInterval: ReturnType<typeof setInterval> | null = null;
    reconnectAttempts = 0;

    _onmessageSet: boolean = false;

    public get onmessageSet(): boolean {
        return this._onmessageSet;
    }

    public setOnmessage(handler: (event: MessageEvent) => void): void {
        if (this.socket) this.socket.onmessage = handler;
        this._onmessageSet = true;
    }

    public removeOnmessage(): void {
        if (this.socket) this.socket.onmessage = null;
        this._onmessageSet = false;
    }

    constructor(public host: string) { }

    connect(path?: string, callback?: Function): WebSocket | null {
        const xtelegramid = tgUser()?.id

        if (!xtelegramid) {
            return this.socket;
        }

        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            return this.socket;
        }

        const url = `${this.host}?x-t-id=${xtelegramid}&path=${path ?? ''}`;

        this!.socket = new WebSocket(url);

        this.socket.onopen = () => {
            clearInterval(this.reconnectInterval as ReturnType<typeof setInterval>);
            this.reconnectAttempts = 0;
            if (callback) callback();
        };

        this.socket.onclose = (event) => {
            if (event.code !== 1000) {
                this.reconnect();
            }
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.reconnect();
        };

        return this.socket;
    }

    reconnect(): void {
        if (this.reconnectAttempts < 5) {
            console.log(`Attempting to reconnect (attempt ${this.reconnectAttempts + 1})...`);
            this.reconnectInterval = setInterval(() => this.connect(), 3000); // Reconnect every 3 seconds
            this.reconnectAttempts++;
        } else {
            console.error('Maximum reconnection attempts reached. Stopping reconnection.');
        }
    }

    public sendMessage(route: IRoute, data?: any, action?: IAction, callback?: (response?: any) => void): void {
        const content = {
            params: {
                route,
                "x-t-id": `${tgUser()?.id}`,
                action,
                data
            },
            data,
        }

        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            this.connect('', () => {
                if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                    this.socket.send(JSON.stringify(content));
                    callback?.();
                } else {
                    console.error('WebSocket connection not open.');
                    callback?.(new Error('Connection not open'));
                }
            });
        } else {
            this.socket.send(JSON.stringify(content));
        }
    }

    public close(): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.close();
        } else {
            console.error('WebSocket connection not open.');
        }
    }

    public isConnected(): boolean {
        return !!this.socket && this.socket.readyState === WebSocket.OPEN;
    }
}

// ws://statugram.com/ws
const isLive = false
const _host = isLive ? 'wss://www.statugram.com/ws' : 'ws://192.168.1.119:7878';
const wsocket = (host: string = _host) => new WebSocketClient(host);

export { wsocket };