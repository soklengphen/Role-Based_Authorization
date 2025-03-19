const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({message: "Access denied. No token provided"});
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;

            console.log("The decode user is: ", req.user );
            next()

        } catch (error) {
            res.status(401).json({message: "Invalid token"});
        }
    } else {
        return res.status(401).json({message: "Access denied. No token provided"});
    }
}

module.exports = verifyToken;