'use strict'

export interface TileSessionData {
    start_timestamp: number;
    end_timestamp: number | null;
    score: number;
    invalidTaps: number;
    gameState: 'idle' | 'playing' | 'paused' | 'failed' | 'finished' | 'ended';
    musicSource: string;
    videoBackground: string;
    adsLoadingResult: Record<string, any>;
    myScore: number;
    eachState: boolean[];
    myTiles: Array<{
        index: number;
        appearPos: number;
        width: number;
        height: number;
        color: string;
        live: boolean;
        x: number;
        y: number;
        points: number;
        aspectRatio: number;
        shadow: string;
        class: string;
    }>;
    pointsToEarn: number;
    audioDuration: number;
    audioProgress: number;
    mathSigns: string[];
    bgCanvas: { width: number; height: number };
    showFailedGameModal: boolean;
    timeLestBeforeContinue: number;
    invalidTapCount: number;
    isContinueAccested: boolean;
    countdownInterval?: number;
    countdownTimeout?: number;
}

