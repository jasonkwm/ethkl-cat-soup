export function downloadIPFS(decrypted) {
  const ipfsUrl = process.env.IPFS_Gateway + decrypted;
  fetch(ipfsUrl)
    .then((response) => {
      if (!response.ok) {
        setError("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result;
    })

    .catch((error) => {
      setError("Error downloading file:" + error);
    });
}
