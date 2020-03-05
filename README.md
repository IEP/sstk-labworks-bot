# SSTK Labworks Bot

## Preparation

1. Create Telegram Bot via [t.me/BotFather](t.me/BotFather).
2. Create Firebase Project (Web App).
3. Create `.env` file inside `bot` folder.
4. Put the Telegram Bot Token inside the `bot/.env` file.
5. Prepare random secret from OTP Login, put into `bot/.env` file.

`.env`:
```
TOKEN=<Telegram Bot Token>
OTP_SECRET=<OTP Secret>
```

6. Prepare `bot/external/` directory, do all the steps in
   `bot/external/README.md`.
7. Deploy the Firebase project (inside `firebase/` directory).
8. Run `yarn build`.
9. Run `yarn start`.
10. Scan the `qrcode.png` file generated inside `bot/external/` using
    `Google Authenticator`.
11. Open the server in [http://localhost:3000](http://localhost:3000).
12. Login into the dashboard using `Google Authenticator` generated OTP.

For future execution, you only need to do steps 8-12 (step 10 is not needed if
you're not changing the `OTP_Secret`).