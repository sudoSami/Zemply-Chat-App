const User = require('../Models/user');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username.trim() || !password.trim()) {
            return res.status(400).json({message: 'Username and password are required'});
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({username, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = signup;