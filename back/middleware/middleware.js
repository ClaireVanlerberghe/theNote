require("dotenv").config({ path: "config.env"})

const User = require('../models/User')
const jwt = require('jsonwebtoken')
const secretKeyToken = process.env.secretKeyToken
const verifyJWTToken = (req, res, next) => {
    const token = req.cookies.cda
    console.log(req.cookies)
    console.log(token);

    if(token) {
        jwt.verify(token, secretKeyToken, (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                console.log('failed');
                res.redirect('/login')
            } else {
                console.log(decodedToken);
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}
const verifyUser = (req, res, next) => {

    // grab the token from the cookie 
    const token = req.cookies.cda;
 
    // we want to check if the token exists
    if (token) {
        // verify the token againt our secret
        jwt.verify(token, secretKeyToken, async (err, decodedToken) =>{
            if(err) {
                console.log(err.message);
                // we give it a null value as there is an error and we we do not have to show anything in the view
             
                res.locals.user = null; 
                next() // just move to the next handler as we do not want to inject anything in the view
                
            } else {
                console.log(decodedToken); 
                
                // there is a user logged in and we want their info
                // on the decodedToken we have a payload which contain {id} (check authCtrl generateToken func)
                // we have the id on the decodedToken
                // now find the the user in the db and inject it in the view.. we want to use the User model
                let user = await User.findById(decodedToken.id);
        
                // to inject the user in the view, we need to use locals
                // we create a property called user, available in the views so we can access email
                res.locals.user = user;
                next() // cfire a handler and go to next step
            }
        })
    } else {
        res.locals.user = null
        next()
    }

}

module.exports = {
    verifyJWTToken,
    verifyUser
}