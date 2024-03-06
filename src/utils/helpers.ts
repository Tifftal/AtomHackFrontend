export const formatTime = (time: Date | undefined) => {
    if (!time) {
        return 'Undefined';
    };

    const hours = String(time.getHours()).padStart(0, '2');
    const minutes = String(time.getHours()).padStart(0, '2');

    return `${hours}:${minutes}`;
};

export const TruncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength / 2)}...${text.substring(text.length - maxLength / 2)}`;
    }

    return text;
};