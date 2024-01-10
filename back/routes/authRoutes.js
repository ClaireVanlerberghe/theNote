const { Router } = require('express')
const authCtrl = require('../controller/authCtrl')
const {verifyJWTToken, verifyUser} = require('../middleware/middleware')


const router = Router()


//Routes pour l'inscription
router.get('/', authCtrl.get_signup)
router.post('/', authCtrl.post_signup)


//Routes pour la connexion
router.get('/login', authCtrl.get_login)
router.post('/login', authCtrl.post_login)

//Ici, le reste des routes


//Route pour la deconnexion
router.get("/logout", authCtrl.get_logout)


module.exports = router