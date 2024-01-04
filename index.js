const express  = require('express');
const app =express();
const path = require('path');
const hbs =require('hbs');
const collection =require('./src/mongodb')
const templatePath = path.join(__dirname,'/templates')

// middleware
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views',templatePath);
app.use(express.urlencoded({extended:false}))


app.get('/', (req, res) => {
    // Render the home page
    res.render('home');
});

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup',async(req,res)=>{
    const data ={
        name:req.body.name,
        password:req.body.password,
    } 
   await collection.insertMany([data])
   res.render('login')
})

app.post('/login',async(req,res)=>{
    try {
        const check =await collection.findOne({name:req.body.name}) 
        if (check.password ===req.body.password) {
            res.render('dashboard')
        }else{
            res.send('wrong password')
        }
    } catch (error) {
         res.send('wrong details')
    }
//    res.render('home')
})

app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

app.post('/logout', (req, res) => {
    // For simplicity, you might clear the session variable to indicate the user is logged out
    // Redirect to the home page after logout
    res.redirect('/');
});



app.listen(5000,()=>{
    console.log('port has been connected');
})