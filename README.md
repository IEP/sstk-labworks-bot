# SSTK Labworks Bot

## Preparation

1. Create Telegram Bot via [t.me/BotFather](t.me/BotFather).
2. Create Firebase Project (Web App).
3. Create `.env` file inside `bot` folder.
4. Put the Telegram Bot Token inside the `.env` file.
5. Prepare random secret from OTP Login, put into `.env` file.

`.env`:
```
TOKEN=<Telegram Bot Token>
OTP_SECRET=<OTP Secret>
```

6. Prepare `bot/external` directory, do all the steps in `bot/external/README.md`.
7. Run `yarn build`.
8. Run `yarn start`.