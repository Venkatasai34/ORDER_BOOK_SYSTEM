const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        reqired: true,
        maxLength:32,
        trim: true,
    },
    lastname:{
        type: String,
        required:false,
        trim: true,
        maxLength:32,
    },
    email:{
        type: String,
        trim:true,
        requried:true,
        unique:true,
    },
    userinfo:{
        type: String,
        trim:true,
    },
    encry_password:{
        type: String,
        requried:true,

    },
    salt:String,
    role:{
        type:Number,
        default:0,

    },
    purchases:{
        type: Array,
        default:[]
    },
},
{
    timestamps:true,
});

userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.getSecuredPassword(password);
})
.get(function(){
    return this._password;

})

userSchema.methods = {
    authenticate: function(plain_password){
        return this.getSecuredPassword(plain_password) === this.encry_password;
    },
    getSecuredPassword: function(plainpassword) {
        if (!plainpassword) return "";
        try {
          return crypto
            .createHmac("sha256", this.salt)
            .update(plainpassword)
            .digest("hex");
        } catch (err) {
          return "";
        }
      }
};

module.exports = mongoose.model("User",userSchema);