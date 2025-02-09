export const containsUnsafeChars = (value: string) => {
    return /<[^>]*>|(script|style|iframe|object|embed|link)/gi.test(value);
};
