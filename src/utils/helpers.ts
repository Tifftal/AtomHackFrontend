export const TruncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength / 2)}...${text.substring(text.length - maxLength / 2)}`;
    }

    return text;
};