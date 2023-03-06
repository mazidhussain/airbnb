const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bycrypt = require('bcryptjs');
const User = require('./models/User.js');
const Place = require('./models/Place.js'); 
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
const fs = require('fs');
const multer = require('multer');
mongoose.set("strictQuery", false);
app.use(express.json());
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));
const bycryptSalt = bycrypt.genSaltSync(10);
const jwtSecret = 'MazidHussainAnsari';

app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:5173'
}));
mongoose.connect(process.env.MONGO_URL);
app.get('/test',(req,res)=>{
    res.json('test ok');
});

// for registration
app.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        const userDoc = await User.create({
            name,
            email,
            password:bycrypt.hashSync(password,bycryptSalt),
        });
        res.json(userDoc);
    }catch(e){
         res.status(422).json(e);
    }
});

// for login
app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if(userDoc){
        const passOk = bycrypt.compareSync(password,userDoc.password);
        if(passOk){
            jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
                if(err){
                    throw err;
                }
                res.cookie('token',token).json(userDoc);
            });
        }else{
            res.status(422).json('pass not ok');
        }
    }else{
        res.json('not found');
    }
});

// for token fetch
app.get('/profile',(req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        });
    }else{
        res.json(null);
    }
});

// for logout
app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
});

// for upload by link
app.post('/upload-by-link',async (req,res)=>{
    const {link} = req.body;
    const newName = 'photo'+Date.now()+'.jpg';
    await imageDownloader.image({
        url:link,
        dest: __dirname + '/uploads/'+newName
    });
    res.json(newName);
}); 

// for upload from system
const photoMiddleware = multer({dest:'uploads'});
app.post('/upload',photoMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
    for(let i=0;i<req.files.length ;i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split('.');
        const newPath = path + '.'+parts[parts.length-1];
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }
    res.json(uploadedFiles);
});

// for new place add form data
app.post('/places',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        const {title,address,addedPhotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuests} = req.body;
        if(err) throw err;
        const placeDoc = await Place.create({
            owner:userData.id,
            title,address,photos:addedPhotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuests
        });
        res.json(placeDoc);
    });
});

// for fectch data
app.get('/user-places',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        if(err) throw err;
        const {id} = userData;
        res.json(await Place.find({owner:id}));
    });

});

app.get('/places/:id',async (req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
});

app.put('/places',async(req,res)=>{
    const {token} = req.cookies;
    const {
        id,title,address,addedPhotos,
        description,perks,extraInfo,
        checkIn,checkOut,maxGuests
    } = req.body;
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
        const placeDoc = await Place.findById(id);
        if(err) throw err;
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({title,address,photos:addedPhotos,
                description,perks,extraInfo,
                checkIn,checkOut,maxGuests});
            await placeDoc.save();
            res.json('updated successfully');
        }
    });
});

app.listen(4000);