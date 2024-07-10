import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const getBrowserLocale = (): string => navigator.language || 'en-US';
export const formatNumber = (value: number, locale: string = getBrowserLocale(), options: Intl.NumberFormatOptions = {notation:'compact'}): string => new Intl.NumberFormat(locale, options).format(value);
export const promise = (seconds: number = 3000) => new Promise((resolved) => setTimeout(resolved, seconds))


export const expireTime = (timestamp: number) => dayjs(timestamp).toNow()

export const calculateRemainingTime = (endDate: number = 0) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = (end.getTime() - now.getTime());
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return {
        hours: hours > 0 ? hours : null,
        minutes: minutes > 0 ? minutes : null,
        seconds: seconds > 0 ? seconds : null,
    };
};


export const getActualCountdown = (timestamp: number = 0) => {
    const { hours, minutes, seconds } = calculateRemainingTime(timestamp);
    let formattedTime = '';
    if (hours !== null) {
        formattedTime += `${hours}h `;
    }
    if (minutes !== null) {
        formattedTime += `${minutes}m `;
    }
    if (seconds !== null) {
        formattedTime += `${seconds}s`;
    }
    return formattedTime.trim();
}

export
    function generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}


export
    function isMatchingCode(str: string) {
    const pattern = /^C-[A-Z0-9]{8}-TS-\d{13}$/;
    return pattern.test(str)
}