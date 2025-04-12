module.exports = function loginvalidator(req, res, next)
{
    if(!req.body.email)
    {
        //return res.status(400).send("Please enter email");
        return res.status(400).json({error:"Please enter email"});
    }

    if(!req.body.password)
    {
        //return res.status(400).send("Please enter password");
        return res.status(400).json({error:"Please enter password"});
    }

    return next();
};