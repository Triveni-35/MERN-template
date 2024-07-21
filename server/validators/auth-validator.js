const {z} = require("zod")
//create object schema
const signupSchema = z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be atleast 3 charcaters"})
    .max(255,{message:"Name cannot be more than 255 letters"}),
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email must be atleast 3 charcaters"})
    .max(255,{message:"email cannot be more than 255 letters"}),
    password:z
    .string({required_error:"Password is required"})
    .min(6,{message:"Password must be atleast 6 charcaters"})
    .max(255,{message:"Pasword cannot be more than 255 letters"}),
})
module.exports = signupSchema