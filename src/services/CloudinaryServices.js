import axios from "axios";
const cloudName="khctin6n"
const preset="recatImg"

class CloudinaryServices{
    async uploadImage(file){
        try{
            let formData=new FormData();
            formData.append("file",image);
            formData.append("upload_preset",preset);
            let url = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
            return (url.data.secure_url);

        }catch(error){
            console.log(error);
            toast.error("Image upload failed");
            return "";
        }
    }
    async uploadFile(file){
        try{
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "images");

            let res = await axios.post(
            "https://api.cloudinary.com/v1_1/dhyi9ueu8/auto/upload",formData);
            return (res.data.secure_url);


        }catch(error){
            console.log(error);
            toast.error("File upload failed");
            return "";
            
        }
    }
}
export default new CloudinaryServices;