'use strict'

// Profile Interface
export interface IProfile {
    id: number;
    name: string;
    telegram_id: string;
    created_at: Date;
    updated_at: Date;
    trivia_responses: ITriviaResponse[];
}

// TriviaSession Interface
export interface ITriviaSession {
    id: number;
    session_name: string;
    questions: IQuestion[];
    startTime: Date;
    endTime: Date;
    created_at: Date;
    updated_at: Date;
}

// Question Interface
export interface IQuestion {
    id: number;
    question: string;
    imageUrl: string | null;
    options: IOption[];
    session: ITriviaSession;
    created_at: Date;
    updated_at: Date;
    responses: ITriviaResponse[];
}

// Option Interface
export interface IOption {
    id: number;
    optionText: string;
    isCorrect: boolean;
    score: number;
    question: IQuestion;
    scores: IScore[];
    created_at: Date;
    updated_at: Date;
}

// Score Interface
export interface IScore {
    id: number;
    profile: IProfile;
    question: IOption;
    option: IOption;
    score: number;
    responses: ITriviaResponse[];
    created_at: Date;
    updated_at: Date;
}

// TriviaResponse Interface
export interface ITriviaResponse {
    id: number;
    profile: IProfile;
    question: IQuestion;
    created_at: Date;
    updated_at: Date;
}