const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comments");

app.use(cors());
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

// middleware
dotenv.config();
app.use(express.json());

// Database connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected Successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};

app.use("/images", express.static(path.join(__dirname, "/images")));
console.log(cors());

app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

//upload img
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image Uploaded Successfully");
});

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log("App listening on port " + process.env.PORT);
});
