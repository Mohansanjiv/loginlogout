const mongoose =require('mongoose');
const dotenv =require('dotenv');


dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('mongodb connected');
}).catch(()=>{
    console.log('failed to connect');
})

const LoginSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

const collection = new mongoose.model('Login',LoginSchema);
module.exports=collection