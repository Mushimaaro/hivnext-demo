import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
   const authHeader = req.headers.authorization || req.headers.Authorization;

   if(!authHeader?.startsWith('Bearer ')){
      return res.status(401).json({success:false, message:"Unauthorized, please login."})
   }

   const token = authHeader.split(' ')[1];

   try {
      jwt.verify(token, process.env.JWT_SECRET,
         (err, decoded) => {
            if(err) return res.status(403).json({success:false, message:"Forbidden."});
            req.user = {userInfo: decoded.userInfo, token:token};
            next();
         }
      );

   } catch (error) {
      return res.status(400).json({success:false, message:error.message})
   }
}

export default userAuth;