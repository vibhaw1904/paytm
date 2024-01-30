const jwt=require('jsonwebtoken');
// const secretKey=require('../config');

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const secretKey=process.env.JWT_SECRET
    console.log(secretKey)
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      res.status(401).json({
        message: 'Unauthorized',
      })
      return
    }
  
    const token = authHeader.split(' ')[1]
    console.log(secretKey)
    console.log(token)
    // if (!secretKey) {
    //     return res.status(500).json({ message: 'JWT secret key is not defined' });
    // }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
  }
  module.exports={protect};




