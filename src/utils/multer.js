import cloudinary from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
//  storage  setup
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});
const storage = multer.diskStorage({});

const uplod = multer({
  storage,
  limits: { fieldSize: 200000000 },
});

//miiddleware to handle multerstorage

const uploadimage = (req, res, next) => {
    uplod.array("image", 5)(req, res, async (error) => {
      if (error) return next(error);
  
      if (req.files && req.files.length > 0) {
        try {
          const imageUrls = [];
  
          for (const file of req.files) {
            const result = await cloudinary.v2.uploader.upload(file.path);
            imageUrls.push(result.secure_url);
          }
  
          req.cloudinaryImageUrls = imageUrls;
        } catch (error) {
          return next(error);
        }
      }
      next();
    });
  };

export default uploadimage;
