export function future_year(past, future) {
    if (future) return new Date(past).getFullYear() <= new Date(future).getFullYear();
    return true;
}

export function future_date(past, future) {
    if (future) return new Date(past) <= new Date(future);
    return true;
}

export function word_limit(text, limit) {
    return text.split(" ").length <= limit;
}
