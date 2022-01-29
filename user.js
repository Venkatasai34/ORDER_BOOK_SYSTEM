const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
    
    req.profile.encry_password = undefined;
    req.salt = undefined;
    req.createdAt = undefined;
    req.updatedAt = undefined;
    return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err,users) => {
        if(err || !users)
        { 
            return res.status(400).json({
                error:"No users in DB"
            });
        }
        res.json(users);
    })
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false },
      (err, user) => {
        if (err) {
          return res.status(400).json({
            error: "You are not authorized to update this user"
          });
        }
        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user);
      }
    );
  };

  exports.userPurchaseList = (req,res) => {
      order.find({user:req.profile._id})
      .populate("user" ,"_id emial")
      .exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "No orders as far now"
          });
        }
        res.json(order);
      });

  }
  

