export default {
    SERVER_SESSION_SECRET: process.env.SERVER_SESSION_SECRET ?? '',
    SERVER_PORT: process.env.SERVER_PORT ?? '',

    TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID ?? '',
    TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET ?? '',
    TWITCH_AUTH_CALLBACK: process.env.TWITCH_AUTH_CALLBACK ?? '',
    TWITCH_AUTH_BOT_CALLBACK: process.env.TWITCH_AUTH_BOT_CALLBACK ?? '',

    // Maybe obsolete
    TWITCH_USERNAME: process.env.TWITCH_USERNAME ?? '',
    TWITCH_OAUTH: process.env.TWITCH_OAUTH ?? '',
    TWITCH_CHANNELS: process.env.TWITCH_CHANNELS ?? '',
    // --------------

    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY ?? '',
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN ?? '',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ?? '',
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET ?? '',
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '',
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID ?? '',
}
