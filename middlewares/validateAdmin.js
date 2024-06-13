function authenticateUser(req, res, next) {
  console.log('Request Body:', req.body);
  const user = req.body;

  if (!user || !user.role) {
    return res.status(401).send('Unauthorized');
  }

  req.user = user;
  next();
}

function isAdmin(req, res, next) {
  console.log('User:', req.user);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Access Denied');
  }
}


  
export { authenticateUser, isAdmin };