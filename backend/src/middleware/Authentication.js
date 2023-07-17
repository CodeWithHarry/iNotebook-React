const jwt = require('jsonwebtoken')

const JWT_SECRETKEY = "notebook"


const auth = async (req, res, next) => {
    try {
        let token = req.headers['x-api-key']
        if(!token) return res.status(401).send({ status: false, message: "You are not authorised , token is not available" })

        jwt.verify(token, JWT_SECRETKEY, async (err, decode) => {

            if (err) return res.status(401).send({ status: false, message: "You are not authorised , token is not valid or not available" })

            if (decode) {
                req.decode = decode // making global
                console.log(decode)
                next()
            }
        })

    } catch (error) {
        res.status(500).send({ stauts: false, message: error.message })
    }
}

module.exports.auth = auth