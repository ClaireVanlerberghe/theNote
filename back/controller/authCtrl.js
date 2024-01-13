require("dotenv").config({ path: "config.env"})
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const errHandler = (err) => {
    console.log(err.message, err.code)

    if(err.code === 11000) {
        err.email = "Email existe déjà"
    }
    if(err.message == "mot de passe incorrect") {
        err.password = "Le mot de passe utilisé est incorrect"
    }

    if(err.message == 'Utilisateur non trouvé') {
        err.email = "Adresse mail non trouvée"
    }
    if(err.message.includes("user validation failed")) {
        // console.log(err);
        // console.log(err.errors.properties);
        console.log(Object.values(err.errors));

        // Destructuring properties
        Object.values(err.errors).forEach(({properties}) => {
            console.log(properties)
            errors[properties.path] = properties.message
        })
    }

    return err

}
const secretKeyToken = process.env.secretKeyToken
const maxAge = 1 * 24 * 60 * 60
const generateToken = (id) => {
    return jwt.sign(
        {id},
        secretKeyToken,
        {
            expiresIn: maxAge
        }
    )
}

const get_signup = (req, res) => {
    res.render('')
}

const get_login = (req, res) => {
    res.render('login')
}

/**
 * Create User
 * @method post
 */

const post_signup = async (req, res) => {
    const {email, password} = req.body;
    console.log(req.body);
    try {
        const createUser = await User.create({email, password})
        const token = generateToken(createUser._id)
        res.cookie('cda', token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: maxAge * 1000
        })
        res.status(201).json({user: createUser._id})
    } catch (e) {
        const errors = errHandler(e)
        res.status(400).json({errors})
    }
}

const post_login = async(req, res) => {
    const {email, password} = req.body;
    console.log("REQBODY", req.body);
   try {
    const user = await User.login(email, password)
    console.log("USER", user);
    const token = generateToken(user._id)
    res.cookie('cda', token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: maxAge * 1000
    })
    res.status(200).json(user)
   } catch (e) {
    const errors = errHandler(e)
    res.status(400).json({errors})
   }
}

const get_logout = (req, res) => {
    res.cookie('cda', '', {
        maxAge: 1,

    })
    res.redirect('/')
}

module.exports = {
    get_signup,
    get_login,
    post_signup,
    post_login,
    get_logout
}