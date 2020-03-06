const { authenticator } = require('otplib')
const qrcode = require('qrcode')
const { join } = require('path')

const user = 'by @gpratama'
const service = 'SSTK Labworks Bot'

// Load OTP_SECRET from env file
const secret = process.env.OTP_SECRET
const otpauth = authenticator.keyuri(user, service, secret)

const qr_path = join(__dirname, '../external/qrcode.png')

// Write QRCode to file named "qrcode.png"
qrcode.toFile(
  qr_path,
  [{
    data: Buffer.from(otpauth),
    mode: 'byte'
  }]
)

console.log('> QR Code has been generated. ' + 
  'You can see it inside "external" folder'
)