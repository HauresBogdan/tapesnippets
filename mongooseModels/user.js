const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    max: [50, "Username to long"],
  },
  email: {
    type: String,
    require: true,
    unique: true,
    min: [6, "Email to lenght at least 6"],
    max: [50, "Email to long"],
  },
  password: {
    type: String,
    require: true,
    min: [8, "Password lenght at least 8"],
    max: [1000, "Password max lenght 1000"],
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  confirmed: {
    type:Boolean,
    default:false
  },
  isPro: { 
    type:Boolean,
    default:false
  },
  isPatron: { 
    type:Boolean,
    default:false
  },
  profile: {
    friends: {
      type: [String],
    },
    bio: {
      type: String,
      default: "No bio added...",
    },
    watchlater: {
      type: [String],
    },
    lists: {
      title: {
        type: [String],
      },
    },
    trash: {
      type: [String],
    },
    youtube: {
      type: String,
    },
    facebook: {
      type: String,
    },
    goodreads: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    }
  }
});
module.exports = mongoose.model("User", UserSchema);
