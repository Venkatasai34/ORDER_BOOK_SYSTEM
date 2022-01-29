const {signout, signup, signin, isSignedIn,emailValidator,passwordValidaor} = require('../controllers/auth');
const {check, validationResult} = require('express-validator');
var express = require('express');
var router = express.Router();




router.post("/signup",[

    check("name","name should be atleast 3 char").isLength({min:3}),
    check("email","email is requried").isEmail(),



],emailValidator,passwordValidaor, signup);


router.get('/signout', signout);

router.post("/signin",[

    check("email","email is requried").isEmail(),
    check("password","at least isLength 3").isLength({min:3}),



], signin);

router.get('/testroute',isSignedIn,(req,res) => {
    res.send("this is protected");
});

module.exports = router;
