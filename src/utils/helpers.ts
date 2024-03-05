export const formatTime = (time: Date | undefined) => {
    if (!time) {
        return 'Undefined';
    };

    const hours = String(time.getHours()).padStart(0, '2');
    const minutes = String(time.getHours()).padStart(0, '2');

    return `${hours}:${minutes}`;
}