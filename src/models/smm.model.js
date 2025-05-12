import mongoose from "mongoose"; 

// Create a fresh schema that exactly matches the form fields
const smmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']   
    },
    phone: {
        type: String,
        default: ''
    },
    company: {
        type: String,
        default: ''
    },
    platforms: {
        type: [String],
        default: []
    },
    goals: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        required: [true, 'message is required']
    }
}, { timestamps: true, strict: true }) // Set strict to true to only allow defined fields

// Force model recreation by deleting any existing model
if (mongoose.models.smm) {
    delete mongoose.models.smm;
}

const smmModel = mongoose.model('smm', smmSchema, 'smm');
export default smmModel;