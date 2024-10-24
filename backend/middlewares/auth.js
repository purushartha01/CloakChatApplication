const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN, REFRESH_TOKEN, jwt_options_access, jwt_options_refresh } = require('./../config/config.js');
const { getUserById } = require('../services/userServices.js');

module.exports = async (req, res, next) => {
    try {
        const token = (req.headers.authorization).split(" ")[1];
        console.log("ACCESS TOKEN: ", token);
        const isVerifiedUser = jwt.verify(token, ACCESS_TOKEN, { algorithms: "HS256" });
        if (isVerifiedUser) {
            req.currUserId = isVerifiedUser.id;
            next();
        }
    }
    catch (err) {
        console.log("1st try's caught Error: ", err.message, "\nLocation: ", err.stack)
        try {
            if (err.name === "TokenExpiredError") {
                const refreshTok = req?.cookies?.jwt;
                console.log("REFRESH TOKEN: ", refreshTok);
                //TODO:Handle refresh token invalid or not present scenario
                if (refreshTok) {
                    const decoded = jwt.verify(refreshTok, REFRESH_TOKEN, { algorithms: "HS256" });
                    // console.log(decoded);
                    const foundUser = await getUserById(decoded.id);
                    console.log(foundUser);
                    if (foundUser) {

                        const accessToken = jwt.sign({ id: foundUser.id, email: foundUser.email }, ACCESS_TOKEN, jwt_options_access);

                        const refreshToken = jwt.sign({ id: foundUser.id, email: foundUser.email }, REFRESH_TOKEN, jwt_options_refresh);

                        res.cookie('jwt', refreshToken, {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'None',
                            maxAge: 24 * 60 * 60 * 1000
                        })

                        req.currUserId = foundUser.id;
                        next();
                    }
                    else {
                        throw new Error("User not found");
                        // res.status(500).send({ status: "failed", message: err })
                    }
                } else {
                    throw new Error("Refresh Token not found in cookie!");
                    // res.status(500).send({ status: "failed", message: "Refresh Token not found in cookie!" })
                }
            }
        }
        catch (err) {
            res.status(401)
            console.log(err);
            next(err)
        }

    }
}