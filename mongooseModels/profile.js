const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  friends: {
    type: [String]
  },
  bio: {
    type: String
  },
  watchlater: {
    type: [String]
  },
  lists: {
    title: {
      type: [String]
    }
  },
  trash: {
    type: [String]
  },
  social: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    website: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    }
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
