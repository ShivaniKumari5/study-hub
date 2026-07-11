import axios from "axios";
const cloudName="khctin6n"
const preset="recatImg"

class CloudinaryServices{
    async uploadImage(image){
        try{
            let formData=new FormData();
            formData.append("file",image);
            formData.append("upload_preset",preset);
            let url = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
            return (url.data.secure_url);

        }catch(error){
            console.log(error);
        }
    }
}
export default new CloudinaryServices;