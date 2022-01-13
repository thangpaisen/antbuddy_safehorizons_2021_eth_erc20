require("dotenv").config();
let cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUND_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
export const uploadCloudinary = (file) => {
    return new Promise((reslove, reject) => {
        cloudinary.uploader.upload(file, {
            use_filename: true,
            unique_filename: false,
            folder: "store"
        }, (error, result: any) => {
            if (!error) {
                reslove({
                    url: result.secure_url,
                    original_filename: result.original_filename
                });
            }
            else {
                reject(error);
            }
        })
    })
}