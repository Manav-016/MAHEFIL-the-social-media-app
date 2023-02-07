import bcrypt from 'bcrypt';
import jsw from 'jsonwebtoken';
import User from '../models/User.js'

export const register = async (req, res) => {
    console.log("------17------");
    console.log(req.body);
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        console.log("------17------");
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        console.log("------20------");




        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        })

        const savedUser = await newUser.save();

        res.status(200).json(savedUser);

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}