export const getChatName = (user, sender, recipient) => {
    if ([user, sender, recipient].some((item) => !item)) return;

    if (user.id === sender.id) return recipient.name + ' ' + recipient.surname;

    return sender.name + ' ' + sender.surname;
};

export const getCookieValue = (name) =>
    document.cookie
        .split('; ')
        .find((row) => row.startsWith(name + '='))
        ?.split('=')[1];
