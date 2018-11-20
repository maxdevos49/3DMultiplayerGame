/**
 * middleware for doing role-based permissions
 * @param {string[]} allowed
 * @param {string} redirect
 */
let permit = (allowed, redirect='/') => {

  const isAllowed = role => allowed.indexOf(role) > -1;
    
    return (req, res, next) => {
      if (res.user && isAllowed(res.user.role))
        next();
      else {
        res.redirect(redirect); // user is forbidden
      }
    }
  }

module.exports = permit;