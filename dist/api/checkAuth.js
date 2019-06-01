'use strict';

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(null);
  }
  return res.send({ user: 'no user' });
}
module.exports = ensureAuthenticated;
//# sourceMappingURL=checkAuth.js.map