// Parse the "password" then return the token made by that password
// or a custom token
export default (req, res) => {
  res.send({
    valid: true,
    token: 'XXXX'
  })
}