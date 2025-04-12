const express = require("express");
const cors = require("cors");

const pet = require("../models/pet");

const router = express.Router();
router.use(cors());

router.get("/", async (req, res) => 
{
    try 
    {
        let pets = await pet.find();

        if (pets.length === 0) 
        {
            return res.status(200).send("No pets found.");
        }

        return res.status(200).send(pets);
    } 
    catch (e) 
    {
        return res.status(500).send("Error: " + e.message);
    }
});


router.get("/types", async (req, res) => {
    try 
    {
        let petTypes = await pet.distinct("pettype");
        return res.status(200).json(petTypes);
    } 
    catch (e) 
    {
        return res.status(500).send("Error: " + e.message);
    }
});

router.get("/:id", async (req, res) => 
{
    try 
    {
        const petId = req.params.id;

        const selectedPet = await pet.findById(petId);

        if (!selectedPet) 
        {
            return res.status(404).send("Pet not found.");
        }

        return res.status(200).send(selectedPet);
    } 
    catch (e) 
    {
        return res.status(500).send("Error: " + e.message);
    }
});

router.post("/", async (req, res) => 
{
    const { petname, petdescription, pettype } = req.body;
    if (!petname || !petdescription || !pettype) 
    {
        return res.status(400).send("Fields are required");
    }

    try 
    {
        const newPet = new pet({
            petname,
            petdescription,
            pettype 
        });

        await newPet.save();

        return res.status(201).send(newPet);
    } 
    catch (e) 
    {
        return res.status(500).send("Error: " + e.message);
    }
});

router.put("/:id", async (req, res) => 
{
    const { petname, petdescription, pettype } = req.body;

    const { id } = req.params;

    if (!petname === undefined) 
    {
        return res.status(400).send("Pet name not found");
    }

    try 
    {
        const updatedPet = await pet.findByIdAndUpdate(
            id,
            {
                $set: 
                {
                    petname: petname,
                    petdescription: petdescription,
                    pettype: pettype
                }
            },
            { new: true }
        );

        if (!updatedPet) 
        {
            return res.status(404).send("Pet not found");
        }

        return res.status(200).send("Pet updated successfully");
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
        const deletedPet = await pet.findByIdAndDelete(id);

        if (!deletedPet) 
        {
            return res.status(404).send("Pet not found");
        }

        return res.status(200).send("Pet deleted successfully");
    } 
    catch (e) 
    {
        return res.status(500).send("Error: " + e.message);
    }
});

router.get("/types/count", async (req, res) => 
{
    try 
    {
        const petTypeCount = await pet.aggregate([
            { $group: { _id: "$pettype", count: { $sum: 1 } } },
            { $project: { _id: 0, pettype: "$_id", count: 1 } }
        ]);

        if (!petTypeCount || petTypeCount.length === 0) 
        {
            return res.status(404).send("Pet types not found");
        }

        return res.status(200).json(petTypeCount);
    } 
    catch (e) 
    {
        return res.status(500).send("Error: " + e.message);
    }
});

module.exports = router;