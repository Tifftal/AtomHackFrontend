export const formatTime = (time: Date | undefined) => {
    if (!time) {
        return 'Undefined';
    }

    let hours = String(time.getHours()).padStart(0, '2');
    if (Number(hours) < 10) {
        hours = `0${hours}`
    }
    let minutes = String(time.getHours()).padStart(0, '2');
    if (Number(minutes) < 10) {
        minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`;
};

export const TruncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength / 2)}...${text.substring(text.length - maxLength / 2)}`;
    }

    return text;
};