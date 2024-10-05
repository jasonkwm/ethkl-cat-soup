
import axios from 'axios';

export async function pinImageToIPFS (image) {
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    image.append('pinataOptions', pinataOptions);
    
    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${image._boundary}`,
          'Authorization': `Bearer ${process.env.IPFS_API}`
        }
      });
      console.log(res.data);
      return res.data
      
    } catch (error) {
		return error
    }
}

export async function pinJSONToIPFS (json) {
    try{
      const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", JSON.parse(json), {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `application/json`,
          'Authorization': `Bearer ${process.env.IPFS_API}`
        }
      });

      return res.data
      
    } catch (error) {
		return error
    }
}