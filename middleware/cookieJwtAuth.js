const jwt = require("jsonwebtoken")

const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY)
        req.user = user
        next()
    } catch (err) {
        res.clearCookie("token");
        res.send({status:"Not logged in."})
    }
}

module.exports = cookieJwtAuth