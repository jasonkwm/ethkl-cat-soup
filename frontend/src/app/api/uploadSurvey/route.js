import { pinJSONToIPFS } from "../../../utilities/uploadIPFS"

export async function POST(req) {
    const res = await req.json()
    let jsonCID
    try {
        jsonCID = await pinJSONToIPFS(res);
    } catch (error) {
        return new Response(`error: ${error.message}`, {
          status: 400,
        })
    }
    return new Response(JSON.stringify(jsonCID), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
  }

