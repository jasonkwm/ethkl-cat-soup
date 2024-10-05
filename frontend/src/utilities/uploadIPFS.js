export async function pinJSONToIPFS(data) {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_IPFS_API}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pinataOptions: { cidVersion: 1 }, pinataContent: data }),
  };
  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", options);
    const resParsed = await res.json();
    return resParsed;
  } catch (error) {
    console.log("pinJSONToIPFS error:", error.message);
    return error.message;
  }
}
