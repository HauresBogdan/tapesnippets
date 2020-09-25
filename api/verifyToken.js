const jwt = require('jsonwebtoken');

function verifyToken (req,res,next)
{
    const token = req.header('authToken');
    if(!token) return res.status(401).send("please log-in");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        //chech to who belongs that token(because we know we asign it to his _id) (whois is a variable. we can give anything)
        req.whois = verified;
        next();
    } catch (error) {
        res.status(400).send("bad token");
    }
    
};

module.exports = verifyToken;