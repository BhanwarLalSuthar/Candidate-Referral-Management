const express = require("express")
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const candidateRoutes = require('./routes/candidate.routes')
const errorHandler = require('./middleware/error.middleware')
const { upload } = require("./middleware/multer.middleware")
const { default: cloudinaryUpload } = require("./utils/cloudinaryUpload")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes)
app.use('/candidates', candidateRoutes)

app.use(errorHandler)

app.post("/upload",upload.single("file"),async(req,res)=>{
   
    const cloudinaryResponce = await cloudinaryUpload(req.file.path)

    if(!cloudinaryResponce.url){
        res.status(401).json({"message":"Error occurs while uploading the file"}
            
        )
        return
    }
    res.status(201).json({"message":cloudinaryResponce.url,success:true})

})

module.exports = app