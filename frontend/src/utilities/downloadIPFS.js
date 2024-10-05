export async function  downloadIPFS(decrypted) {
	
  const ipfsUrl = process.env.NEXT_PUBLIC_IPFS_Gateway + decrypted;
  
  try {
      let response = await  fetch(ipfsUrl)

      if (!response.ok) {
        console.error("Network response was not ok");
        return null; // Return null or some error value in case of failure
      }
      const result = await response.json();
      
      return result; // This is now returned to the caller
    } catch (error) {
      console.error("Error downloading file: " + error);
      return null; // Return null or an error value if the fetch fails
    }
}
