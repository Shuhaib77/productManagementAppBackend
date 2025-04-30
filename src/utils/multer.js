import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

// Cloudinary setup
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

// Create a temp directory for file uploads if it doesn't exist
const tempDir = path.join(process.cwd(), "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Multer storage configuration - store files temporarily
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 20000000 }, // 20MB limit
  fileFilter,
});

// Middleware to handle image upload to Cloudinary
const uploadImage = (req, res, next) => {
  // Use array for multiple images with field name 'images'
  upload.array("images", 10)(req, res, async (error) => {
    if (error) {
      console.error("Multer error:", error);
      return res.status(400).json({
        message: "Error uploading images",
        error: error.message,
      });
    }

    try {
      // Check if files were uploaded
      if (req.files && req.files.length > 0) {
        console.log(`${req.files.length} files received`);
        // Array to store all image URLs
        const imageUrls = [];
        // Upload each file to Cloudinary
        for (const file of req.files) {
          console.log("Processing file:", file.path);
          // Upload to Cloudinary
          const result = await cloudinary.v2.uploader.upload(file.path);
          console.log("Cloudinary result:", result.secure_url);
          // Add URL to our array
          imageUrls.push(result.secure_url);
          // Clean up the temp file
          try {
            fs.unlinkSync(file.path);
          } catch (err) {
            console.error("Error cleaning up file:", err);
          }
        }
        // Store all URLs in the request
        req.cloudinaryImageUrls = imageUrls;
        console.log("All images uploaded:", imageUrls);
      } else {
        console.log("No files uploaded");
        req.cloudinaryImageUrls = [];
      }
      next();
    } catch (error) {
      console.error("Cloudinary error:", error);
      if (req.files) {
        req.files.forEach((file) => {
          if (fs.existsSync(file.path)) {
            try {
              fs.unlinkSync(file.path);
            } catch (err) {
              console.error("Error cleaning up file:", err);
            }
          }
        });
      }

      return res.status(500).json({
        message: "Error processing images",
        error: error.message,
      });
    }
  });
};

export default uploadImage;
