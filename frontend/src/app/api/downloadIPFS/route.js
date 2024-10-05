import { downloadIPFS } from "../../../utilities/downloadIPFS"

export async function POST(req) {
    const decryptedCID = await req.json()
    let data;
    try {
        data = await downloadIPFS(decryptedCID);
    } catch (error) {
        return new Response(`error: ${error.message}`, {
          status: 400,
        })
    }
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
  }

