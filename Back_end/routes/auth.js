const express = require("express");
const cors = require("cors");

const user = require("../models/user");

const router = express.Router();
router.use(cors());

router.post("/", async (req, res) => 
{
    const { email, password } = req.body;

    if (!email || !password) 
    {
        return res.status(400).send("Email and password are required");
    }

    try 
    {
        const loginUser = await user.findOne({ email });

        if (!loginUser) 
        {
            return res.status(404).send("User not found");
        }

        if (loginUser.password === password) 
        {
            return res.status(200).send(loginUser.isAdmin);
        } 
        else 
        {
            return res.status(401).send("Invalid password");
        }
    } 
    catch (error) 
    {
        return res.status(500).send("Error: " + error.message);
    }
});

module.exports = router;