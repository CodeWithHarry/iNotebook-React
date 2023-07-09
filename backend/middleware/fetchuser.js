var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';
const User=require('../Models/User')
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        //need to the id of this corresponding token is exits in our User model ,so let's check for that 
        const exitinguser=await User.findById(data.id);
        if(!exitinguser){
            return res.status(401).send(error:" Access Denied!.Login or Sign Up then try!")
        }
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;
