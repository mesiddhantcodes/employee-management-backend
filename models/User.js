var mongoose=require('mongoose');
var UserSchema=mongoose.Schema({
    EmployeeName:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:false
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        typr:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:false
    },
    tasks:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Task",
        required:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isCreatedAt:{
        type:Date,
        default:new Date()
    },
    isDisabled:{
        type:Boolean,
        default:false,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    address:{
        type:String,
        required:true
    },
    aadharNumber:{
        type:String,
        // here we store a image by using bucket or using multer(store the file at folder and make a id of name of using) 
        required:true
    },
    panCard:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    projects:{
        type:Array
    }

})