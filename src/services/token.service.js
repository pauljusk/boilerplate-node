const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config/config");

/**
 * Generate token
 * @param {ObjectId} userId
 * @returns {string}
 */
const generateToken = (userId, roleId) => {
  const secret = config.jwt.secret;
  const expirationDays = config.jwt.expirationDays;

  const tokenExpires = moment().add(expirationDays, "days");
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: tokenExpires.unix(),
    roleId,
  };
  return jwt.sign(payload, secret);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  return jwt.verify(token);
};

module.exports = {
  generateToken,
  verifyToken,
};
