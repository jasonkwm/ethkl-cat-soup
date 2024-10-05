export function downloadIPFS(decrypted) {
	console.log("DECRYPED: ", decrypted)
  const ipfsUrl = process.env.NEXT_PUBLIC_IPFS_Gateway + decrypted;
  fetch(ipfsUrl)
    .then((response) => {
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result;
    })

    .catch((error) => {
      console.error("Error downloading file:" + error);
    });
}
