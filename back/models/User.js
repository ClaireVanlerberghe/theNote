const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, `Une adresse mail est obligatoire`],
        validate: [isEmail, 'Ajouter une adresse mail valide']
    },
    password: {
        type: String,
        required: [true, `Un mot de passe est obligatoire`],
        minlength: [6, `Minimum 6 caractères`]
    }
})

const saltRounds = 10;

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(saltRounds)
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email: email})
    if(user) {
        const authenticatedUser = await bcrypt.compare(password, user.password)
        if(authenticatedUser) {
            return user
        }
        throw Error(`mot de passe incorrect`)
    }
    throw Error (`utilisateur non trouvé`)
}


const User = mongoose.model('users', userSchema)

module.exports = User