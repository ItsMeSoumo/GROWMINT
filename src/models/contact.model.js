import mongoose from "mongoose"; 

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'name is require']
    },
    email:{
        type:String,
        required: [true, 'email is required']   
    },
    phone: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
})

const contactModel = mongoose.models.contact || mongoose.model('contact', contactSchema, 'contact');
export default contactModel;