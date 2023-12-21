import {Schema, model, models} from "mongoose";

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: [true,'Email is required'],
        match: [
            /^\S+@\S+\.\S+$/,
            'Please enter a valid e-mail address'
        ]
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        selected: false
    },
    fullname:{
        type: String,
        required: [true, 'Fullname is required'],
        minLength: [3, 'Fullname must be at least 3 characters'],
        maxLength: [50, 'Fullname must be at least 50 characters']
    }
})

const User = models.User || model('User',userSchema)
export default User;