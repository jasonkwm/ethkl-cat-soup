import { pinImageToIPFS } from "../../../utilities/uploadIPFS"
import { pinJSONToIPFS } from "../../../utilities/uploadIPFS"
import  formidable  from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parser
  },
};

export async function POST(req, res) {
  const form = formidable();
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data' });
      return;
    }

    const { name } = fields;
    const image = files.image; // Uploaded image

    let imageCID;
    let JsonCID;

    try {
      // Assume `pinImageToIPFS` is an asynchronous function that handles the image upload
      imageCID = await pinImageToIPFS(image);
      JsonCID = await pinJSONToIPFS(name);
    } catch (e) {
      return res.status(200).json({ message: 'Image upload failed', error: e.message });
    }

    return res.status(200).json({
      message: 'Success!',
      data: data, // Assuming this is the IPFS response
      
    });
  });
}

