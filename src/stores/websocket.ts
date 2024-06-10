// webSocketStore.ts
import { wsocket } from '@/configs/wsocket';
import { defineStore } from 'pinia';
import { useMainStore } from './mainstore';

type IRoute = 'game' | 'overview' | 'balance' | 'trivia' | 'farming';
type IAction = 'createSession' | 'addQuestionToSession' | 'addOptionToQuestion' | 'answerQuestion' | 'getActiveSession' | 'createEra' | 'activeEra' | 'harvestEra';

export const useWebSocketStore = defineStore({
    id: 'webSocket',
    state: () => ({
        socketInstance: null as ReturnType<typeof wsocket> | null,
        isConnected: false,
        reconnectAttempts: 0,
    }),

    actions: {
        async initializeWebSocket() {
            if (this.isConnected) {
                return Promise.resolve(this.socketInstance);
            }
            return new Promise<void>((resolve, reject) => {
                this.connectWebSocket('', resolve, reject);
            });
        },
        connectWebSocket(path?: string, resolve?: Function, reject?: Function) {
            if (this.socketInstance && this.socketInstance.isConnected()) {
                console.log('Already connected');
                if (resolve) resolve(this.socketInstance);
                return;
            }

            if (!this.socketInstance) {
                this.socketInstance = wsocket();
            }

            this.socketInstance.connect(path, () => {
                this.isConnected = this.socketInstance!.isConnected();
                this.reconnectAttempts = 0;
                this.setOnMessageHandler();
                if (resolve) resolve();
            });

            this.socketInstance.socket!.onclose = (event) => {
                this.isConnected = false;
                if (event.code !== 1000) {
                    this.reconnectWebSocket(resolve, reject);
                } else if (reject) {
                    reject(new Error('WebSocket closed with code ' + event.code));
                }
            };

            this.socketInstance.socket!.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.reconnectWebSocket(resolve, reject);
            };
        },
        reconnectWebSocket(resolve?: Function, reject?: Function) {
            if (this.reconnectAttempts < 5) {
                console.log(`Attempting to reconnect (attempt ${this.reconnectAttempts + 1})...`);
                setTimeout(() => {
                    this.reconnectAttempts++;
                    this.connectWebSocket('', resolve, reject);
                }, 3000);
            } else {
                console.error('Maximum reconnection attempts reached. Stopping reconnection.');
                if (reject) reject(new Error('Maximum reconnection attempts reached'));
            }
        },
        closeWebSocket() {
            if (this.socketInstance) {
                this.socketInstance.removeOnmessage(); // Remove the onmessage event handler
                this.socketInstance.close();
                this.socketInstance = null;
                this.isConnected = false;
            }
        },
        async sendMessage(route: IRoute, data?: any, action?: IAction, callback?: (response?: any) => void) {
            await this.initializeWebSocket();
            if (this.socketInstance && this.isConnected) {
                this.socketInstance.sendMessage(route, data, action, callback);
            } else {
                console.error('WebSocket connection not initialized or not connected.');
            }
        },
        handleIncomingMessage(message: any) {
            // Handle incoming messages here
            const _store = useMainStore()
            const data = message?.startsWith('{') ? JSON.parse(message) : message
            if (data?.farming_info) {
                _store.setFarmingEra(data.farming_info)
            }
            if (data?.overview) {
                _store.setAccountOverview(data.overview);
            }
            if (data?.trivia_session) {
                _store.setTriviaSession(data.trivia_session);
            }
        },
        setOnMessageHandler() {
            this.socketInstance!.setOnmessage((event: MessageEvent) => {
                this.handleIncomingMessage(event.data);
            });
        },
    },
});