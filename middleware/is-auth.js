module.exports = (req, res, next) => {
  if (!req.session.backOffice || req.session.backOffice.roles != "admin") {
    return res.redirect("/backoffice");
  }
  next();
};

// module.exports = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/");
// };
