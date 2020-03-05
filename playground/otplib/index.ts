import { authenticator } from 'otplib'
import * as qrcode from 'qrcode'

const secret = 'TestSecretLoremIpsumDolorSitAmet' // Will put into .env

const token = authenticator.generate(secret)
const user = 'SSTK'
const service = 'SSTK-labworks-bot'

// Generate URI
const otpauth = authenticator.keyuri(user, service, secret)

// Convert the URI into 
qrcode.toDataURL(otpauth, (err, imageUrl) => {
  try {
    console.log(imageUrl)
  } catch (err) {
    console.log(err)
  }
})

console.log(token)