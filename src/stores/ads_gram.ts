'use strict'

export interface IShowPromiseResult {
    done: boolean; // true if user watch till the end, otherwise false
    description: string; // event description
    state: 'load' | 'render' | 'playing' | 'destroy'; // banner state
    error: boolean; // true if event was emitted due to error, otherwise false
}


const adsGramController = (window as any).Adsgram?.init?.({ blockId: "66" });
// , debug: true
export { adsGramController }