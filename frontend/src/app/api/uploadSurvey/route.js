import { pinImageToIPFS } from "../../utilities/uploadIPFS"
import { pinJSONToIPFS } from "../../utilities/uploadIPFS"

export async function POST(request) {
    const formData = await request.formData()
    const name = formData.get('name')
    const description = formData.get('description')
    const image = formData.files.image;
    const maxReply = formData.get("maxReply")
    const incentive = formData.get("incentive")
    const owner = formData.get("owner")
    const survey = formData.get("survey");

    try {
        pinImageToIPFS(image);
    }
    catch(e) {
        console.log(e)
    }
    return Response.json({ name, description })
  }

