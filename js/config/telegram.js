export const tg = window.Telegram.WebApp;

tg.ready();

tg.expand();

export const telegramUser =
tg.initDataUnsafe?.user || null;