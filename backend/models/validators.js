export function future_year(past, future) {
    if (future) return new Date(past).getFullYear() <= new Date(future).getFullYear();
    return true;
}

export function future_date(past, future) {
    if (future) return new Date(past) <= new Date(future);
    return true;
}

export function word_limit(input, limit) {
    return input.split(" ").length <= limit;
}

export function phone_number(input) {
    const len = input.replace(/[^\d]/g, "").length;
    return len > 7 && len < 13;
}

export function valid_name(input) {
    const pattern = /^[a-zA-Z '.]*$/;
    return pattern.test(input);
}

export function valid_email(input) {
    const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return pattern.test(input);
}
