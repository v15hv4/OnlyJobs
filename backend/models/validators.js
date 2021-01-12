export function in_future(past, future) {
    if (future) return new Date(past) <= new Date(future);
    return true;
}

export function word_limit(text, limit) {
    return text.split(" ").length <= limit;
}
