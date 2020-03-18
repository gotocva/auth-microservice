

const Joi = require('@hapi/joi');

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required(),
})

const registerValidate = (req,res,next) => {
    const check = schema.validate(req.body);
    if (check.error != null) {
        res.status(400).json({"status":false,"message":"validation failed","body":check.error});
    } else {
        next();
    }
};

const loginSchema = Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required(),
})

const loginValidate = (req,res,next) => {
    const check = loginSchema.validate(req.body);
    if (check.error != null) {
        res.status(400).json({"status":false,"message":"validation failed","body":check.error});
    } else {
        next();
    }
};

module.exports = { registerValidate,loginValidate };
