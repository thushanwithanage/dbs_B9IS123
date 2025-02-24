const express = require("express");
const cors = require("cors");

const user = require("../models/user");

const router = express.Router();
router.use(cors());

router.get("/", async (req, res) => 
{
    try 
    {
        let users = await user.find({}, { uname: 1, isAdmin: 1, email: 1, _id: 0 });

        if (users.length === 0) 
        {
            return res.status(200).send("No users found.");
        }

        return res.status(200).send(users);
    } 
    catch (e) 
    {
        return res.status(500).send("Error: " + e.message);
    }
});

router.post("/", async (req, res) => 
{
    const { uname, email, password } = req.body;
    if (!uname || !email || !password) 
    {
        return res.status(400).send("Fields are required");
    }

    try 
    {
        const newUser = new user({
            uname,
            email,
            password,
            isAdmin: false 
        });

        await newUser.save();

        return res.status(201).send("User created successfully");
    } 
    catch (e) 
    {
        return res.status(500).send("Error: " + e.message);
    }
});

router.put("/:id", async (req, res) => 
{
    const { uname } = req.body;

    const { id } = req.params;

    if (!uname === undefined) 
    {
        return res.status(400).send("Username not found");
    }

    try 
    {
        const updatedUser = await user.findByIdAndUpdate(
            id,
            {
                $set: 
                {
                    uname: uname
                }
            },
            { new: true }
        );

        if (!updatedUser) 
        {
            return res.status(404).send("User not found");
        }

        return res.status(200).send("User updated successfully");
    } 
    catch (e) 
    {
        return res.status(500).send("Error: " + e.message);
    }
});

router.delete("/:id", async (req, res) => 
{
    const { id } = req.params;

    try 
    {
        const deletedUser = await user.findByIdAndDelete(id);

        if (!deletedUser) 
        {
            return res.status(404).send("User not found");
        }

        return res.status(200).send("User deleted successfully");
    } 
    catch (e) 
    {
        return res.status(500).send("Error: " + error.message);
    }
});

module.exports = router;