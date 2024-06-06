'use strict'

export interface GameState {
    message: string;
    gameStarted: boolean | null;
    timeLeft: number; // in seconds
    score: number;
    targetMinSize: number; // Minimum size in pixels
    targetMaxSize: number; // Maximum size in pixels
    targetColor?: string;
    targetIcon: string
    targets: Record<string | number, Target>;
    targetSpeeds: number[];
    boosterProbability: number;
    slowBoosterProbability: number;
    penaltyProbability: number;
    boosterMaxSize: number;
    slowDuration: number; // in milliseconds
    lastClickTime: number;
    clickTimes: number[];
    sceneCanvas: {
        width: number;
        height: number;
    },
    spownInterval: number,
    updateInterval: number,
    fallInterval: number,
    numOfDots: number,
    speedMultiplier: number
}

export interface Target {
    size: number;
    color?: string;
    position: {
        x: number,
        y: number
    };
    speed: number;
    isBooster: boolean;
    isSlowBooster: boolean;
    isPenalty: boolean;
    isDefault?: boolean
    icon: string,
    value: number
}