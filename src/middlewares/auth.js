const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { roleRights, roles } = require("../config/roles");

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.fk_roleId.toString());
    const allowSelfRight = "allowSelf";
    const allowSelf = requiredRights.includes(allowSelfRight);
    if (allowSelf) userRights.push(allowSelfRight);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    const isSelf = req.params?.userId == user.sub || req.body?.userId == user.sub;
    if (!hasRequiredRights && !(allowSelf && isSelf)) {
      return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
