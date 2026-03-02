const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

/* ===========================
   MESSAGE SCHEMA
=========================== */
const MessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["ai", "user"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/* ===========================
   WEBSITE SCHEMA
=========================== */
const websiteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Website",
    },

    code: {
      type: String,
      required: true,
    },

    conversation: [MessageSchema],

    deployed: {
      type: Boolean,
      default: false,
    },

    deployurl: {
      type: String,
    },

    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

/* ===========================
   AUTO GENERATE SLUG
=========================== */
websiteSchema.pre("save", async function () {
  if (!this.slug) {
    this.slug = nanoid(8);
  }
});

/* ===========================
   MODEL EXPORT
=========================== */
const websiteModel = mongoose.model("websites", websiteSchema);

module.exports = websiteModel;