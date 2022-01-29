const mongoose = require('mongoose');


const stock = new mongoose.Schema({

    name:{type:String},

},

    { timestamps: true },
    );
module.exports = stock;