export function in_future(past, future) {
    if (future) return new Date(past) <= new Date(future);
    return true;
}
