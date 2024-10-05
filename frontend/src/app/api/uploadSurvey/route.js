import { pinImageToIPFS } from "../../utilities/uploadIPFS"
import { pinJSONToIPFS } from "../../utilities/uploadIPFS"
import { formidable } from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's default body parser
  },
};

export default async function POST(req, res) {
  const form = new formidable.IncomingForm();
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data' });
      return;
    }

    const { name } = fields;
    const image = files.image; // Uploaded image

    let data;

    try {
      // Assume `pinImageToIPFS` is an asynchronous function that handles the image upload
      data = await pinImageToIPFS(image);
    } catch (e) {
      return res.status(200).json({ message: 'Image upload failed', error: e.message });
    }

    return res.status(200).json({
      message: 'Success!',
      data: data, // Assuming this is the IPFS response
      name,
      description,
      maxReply,
      incentive,
      owner,
      survey,
    });
  });
}
export async function POST(request, response) {
    const formData = await request.formData()
    const name = formData.get('name')
    const description = formData.get('description')
    const image = formData.files.image;
    const maxReply = formData.get("maxReply")
    const incentive = formData.get("incentive")
    const owner = formData.get("owner")
    const survey = formData.get("survey");

    try {
        data = await pinImageToIPFS(image);
    }
    catch(e) {
        return new Response('Success!', {
            status: 200,
            
          })
    }
    return Response.json(data)
  }

