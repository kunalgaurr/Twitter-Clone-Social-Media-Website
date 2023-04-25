const crypto = require('crypto');

function generateRestPasswordToken() {
  const token = crypto.randomBytes(20).toString('hex');
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 15);
  this.resetPasswordToken = token;
  this.resetPasswordExpires = expires;
}

module.exports = generateRestPasswordToken;
