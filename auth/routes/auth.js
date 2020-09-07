const router = require('express').Router();
//import User model
const User = require("../model/User");



router.post('/register', async (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;