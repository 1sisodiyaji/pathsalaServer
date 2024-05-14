// Importing necessary modules and packages
const express = require("express");
const session = require("express-session"); // Import express-session
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

// Setting up port number
const PORT = process.env.PORT || 3000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ // Use express-session middleware
  secret: process.env.secretKey,
  resave: false,
  saveUninitialized: false,
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req, res, next) => {
  const allowedOrigins = ['https://pathsala.vercel.app', 'http://localhost:3000' , 'http://192.168.56.1:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});

// End of code.
