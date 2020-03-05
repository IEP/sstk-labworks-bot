const { authenticator } = require('otplib')
const qrcode = require('qrcode')
const { join } = require('path')

const user = 'by @gpratama'
const service = 'SSTK Labworks Bot'

const secret = process.env.OTP_SECRET
const otpauth = authenticator.keyuri(user, service, secret)


const qr_path = join(__dirname, '../external/qrcode.png')

// Write QRCode to File
qrcode.toFile(
  qr_path,
  [{
    data: Buffer.from(otpauth),
    mode: 'byte'
  }]
)

const token = authenticator.generate(secret)

console.log('> QR Code Generated')