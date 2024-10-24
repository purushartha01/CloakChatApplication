const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


const { ACCESS_TOKEN, REFRESH_TOKEN, jwt_options_access, jwt_options_refresh } = require('./../config/config.js');
const userServices = require('./../services/userServices.js');

//TODO: Initial setup done, building logic left for stopping multiple logins
const loginPost = async (req, res, next) => {
    try {
        // console.log(req.body)
        const userData = req.body;
        console.log("userData: ", userData);

        if (userData.email === '' || userData.password === '') {
            return res.status(404).send({ status: "Incomplete Fields!" });
        }

        //TODO: check existing user and generate token later
        const userExists = await userServices.getUserByEmail(userData.email);
        const foundUser = userExists[0];
        console.log(foundUser)
        
        
        if (userExists.length>0) {
            const isCorrect = await bcryptjs.compare(userData.password, foundUser.password)
            if (isCorrect) {
                const accessToken = jwt.sign({ id: foundUser.id, email: foundUser.email }, ACCESS_TOKEN, jwt_options_access);

                const refreshToken = jwt.sign({ id: foundUser.id, email: foundUser.email }, REFRESH_TOKEN, jwt_options_refresh);

                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 24 * 60 * 60 * 1000
                })

                const { id, username, email } = foundUser;
                return res.status(200).send({ status: 'OK', accessToken: accessToken, userData: { username, id, email } });
            } else {
                res.status(401);
                throw new Error("Incorrect password");
            }
        } else {
            res.status(404)
            throw new Error("User does not exist");
        }
    } catch (err) {
        //TODO:generate and handle error scenarios
        console.log(err);
        next(err)
    }
}

const regenerateToken = (req, res) => {
    if (req.cookies?.jwt) {
        const refreshToken = req.cookies.jwt;
        const userData = req.body;

        jwt.verify(refreshToken, REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(406).json({ status: 'Unauthorized access' })
            }
            else {
                const accessToken = jwt.sign(userData.email, ACCESS_TOKEN, jwt_options_access);

                return res.status(200).send({ status: 'OK', accessToken: accessToken })
            }
        })
    } else {
        return res.status(406).json({ status: 'Unauthorized access' })
    }
}

//TODO: Initial setup done, activate account service remaining 
const signupPost = async (req, res,next) => {
    try {
        const userData = req.body;

        if (userData.username === '' || userData.email === '' || userData.password === '') {
            return res.status(404).send({ status: "Incomplete Fields!" });
        }

        const userExists = await userServices.getUserByEmail(userData.email);

        console.log("userExists: ", userExists);

        if (userExists.length > 0) {
            res.status(401);
            throw new Error("User already exists.");
            
            // return res.status(409).send({ status: 'User already exists' })
        } else {

            // console.log("Before hashing: ",userData);

            const salt = bcryptjs.genSaltSync(10);
            const hashedPassword = bcryptjs.hashSync(userData.password, salt);

            userData.password = hashedPassword;
            // console.log("After hashing: ",userData);

            const isCreated = userServices.createUser(userData);
            if (isCreated) {
                return res.status(200).send({ status: 'OK', message: 'user created' });
            }
            else {
                throw new Error("User creation failed");
                
                // return res.status(500).send({ status: 'Failed', message: 'user could not be created' });
            }
        }
    } catch (err) {
        console.log(err)
        next(err)
        // return res.status(500).send({ status: err })
    }
}


const getAuth=async(req,res,next)=>{
    console.log(req.body);
    res.end();
}

module.exports = {
    loginPost, regenerateToken, signupPost,getAuth
}