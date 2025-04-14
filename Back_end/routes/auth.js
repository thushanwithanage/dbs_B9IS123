const express = require("express");
const cors = require("cors");

const user = require("../models/user");

const router = express.Router();
router.use(cors());

const loginvalidator = require("../middlewares/auth");

router.post("/", loginvalidator, async (req, res) => 
{
    const { email, password } = req.body;

    try 
    {
        const loginUser = await user.findOne({ email });

        if (!loginUser) 
        {
            return res.status(404).json({error:"User not found"});
        }

        if (loginUser.password === password) 
        {
            return res.status(200).json({data:loginUser.isAdmin});
        } 
        else 
        {
            return res.status(401).json({error:"Invalid password"});
        }
    } 
    catch (error) 
    {
        return res.status(401).json({error:"Error"});
    }
});

module.exports = router;