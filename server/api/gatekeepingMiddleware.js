const { models: { User } } = require('../db')

const requireToken = async (req, res, next) =>{
  try{
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    req.user = user;
    next();
  } catch(e){
    next(e);
  }
}

const requireAdmin = (req, res, next) =>{
  if (!req.user.isAdmin){ return res.status(403).send('CATastrophy! Adminstrator scatus required!'); }
  else{ next(); }
}

const userIsUser = (req, res, next) =>{
  if (parseInt(req.user.id) !== parseInt(req.params.id) && !req.user.isAdmin){ return res.status(403).send('CATastrophy! Wrong litter!');}
  else{ next(); }
}

module.exports = {
  requireToken,
  requireAdmin,
  userIsUser
}
