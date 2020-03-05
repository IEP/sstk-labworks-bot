import { authenticator } from 'otplib'
import * as qrcode from 'qrcode'
import * as fs from 'fs-extra'

const secret = 'test' // Will put into .env

const token = authenticator.generate(secret)
const user = 'SSTK'
const service = 'SSTK-labworks-bot'

// Generate URI
const otpauth = authenticator.keyuri(user, service, secret)

// Convert the URI into 
qrcode.toDataURL(otpauth, (err, imageUrl) => {
  try {
    const base64data = imageUrl.replace(/^data:image\/png;base64,/, '')
    fs.writeFileSync('qr.png', base64data, 'base64')
  } catch (err) {
    console.log(err)
  }
})

console.log(token)