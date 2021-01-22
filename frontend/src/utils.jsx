export const TimeDeltaString = (delta) => {
    var days = Math.round(delta / (1000 * 60 * 60 * 24));
    if (days) return `${days}d`;

    var hours = Math.round(delta / (1000 * 60 * 60));
    if (hours) return `${hours}h`;

    var minutes = Math.round(delta / (1000 * 60));
    if (minutes) return `${minutes}m`;

    var seconds = Math.round(delta / 1000);
    if (seconds) return `${seconds}s`;

    return `0ms`;
};

export const TimeSince = (date) => {
    const delta = new Date() - new Date(date);
    return TimeDeltaString(delta);
};

export const TimeUntil = (date) => {
    const delta = new Date(date) - new Date();
    return TimeDeltaString(delta);
};
