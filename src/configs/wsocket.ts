'use strict';

import { initialState } from "@/stores/mainstore";

type IRoute = 'game' | 'overview'

interface ISendMessage {
    (route: IRoute, data?: any): void
}

const host = 'ws://192.168.1.119:8080'

const wsocket = (path?: string) => {
    let socket: WebSocket | null = null;
    let reconnectInterval: ReturnType<typeof setInterval>;
    let reconnectAttempts = 0;

    const xtelegramid = initialState.user.id

    const connect = () => {

        if (!xtelegramid) {
            console.log({ xtelegramid })
            return null
        }

        if (socket && socket.readyState === WebSocket.OPEN) {
            return socket
        }

        socket = new WebSocket(`${host}?x-t-id=${xtelegramid}&path=${path ?? ''}`);

        socket.onopen = () => {
            console.log('WebSocket connection established.');
            clearInterval(reconnectInterval);
            reconnectAttempts = 0;
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed.');
            if (event.code !== 1000) {
                // Reconnect only if not a deliberate close (code 1000)
                reconnect();
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            reconnect();
        };

        socket.onmessage = (event) => {
            console.log('Message from server:', event.data);
        };

        return socket
    };

    const reconnect = () => {
        if (reconnectAttempts < 5) {
            console.log(`Attempting to reconnect (attempt ${reconnectAttempts + 1})...`);
            reconnectInterval = setInterval(connect, 3000); // Reconnect every 3 seconds
            reconnectAttempts++;
        } else {
            console.error('Maximum reconnection attempts reached. Stopping reconnection.');
        }
    };

    const instance = connect(); // Initial connection attempt

    const sendMessage: ISendMessage = (route, data) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const content = {
                params: {
                    route,
                    "x-t-id": `${xtelegramid}`
                },
                data
            }
            socket.send(JSON.stringify(content));
        } else {
            console.error('WebSocket connection not open.');
        }
    }

    return {
        send: sendMessage,
        close: () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            } else {
                console.error('WebSocket connection not open.');
            }
        },
        isConnected: () => socket && socket.readyState === WebSocket.OPEN,
        connect,
        instance
    };
};

export { wsocket };
