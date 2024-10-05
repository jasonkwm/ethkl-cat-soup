import { useSurveyorContext } from "@/context/SurveyorProvider";
import Image from "next/image.js";

// who
export default function Requests() {
  const { requestList } = useSurveyorContext();

  const shortenPublicKey = (publicKey: string): string => {
    return `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}`;
  };

  const handleAccept = (publicKey: string) => {
    console.log(`Accepted request from: ${publicKey}`);
    // Add your logic here
  };

  const handleDecline = (publicKey: string) => {
    console.log(`Declined request from: ${publicKey}`);
    // Add your logic here
  };

  return (
    <div className="m-auto w-[92%] p-6 bg-white rounded-lg shadow-lg mt-4">
      <p className="font-semibold text-gray-800">Survey user requests</p>
      <ul className="space-y-4" style={{paddingLeft: "0px"}}>
        {requestList.map((request: any, index: any) => (
          <li key={index} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex">
			    <Image src="/key.png" width={500} height={500} alt="key" style={{ width: "25px", height: "25px", marginRight: "10px" }}></Image>
                <p className="text-gray-500">
                  {shortenPublicKey(request.publicKey)}
                </p>
			  </div>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <button
                  onClick={() => handleAccept(request.publicKey)}
                  className="px-2 py-2 bg-custom-dark-brown rounded-md hover:bg-custom-light-brown transition"
                >
                  <Image src="/checked.png" width={500} height={500} alt="key" style={{ width: "25px", height: "25px" }}></Image>
                </button>
                <button
                  onClick={() => handleDecline(request.publicKey)}
                  className="px-2 py-2 bg-custom-dark-brown rounded-md hover:bg-custom-light-brown transition"
                >
                  <Image src="/cross-button.png" width={500} height={500} alt="key" style={{ width: "25px", height: "25px" }}></Image>
                </button>
              </div>
            </div>
			<p className="text-sm text-gray-500">Requested Survey: {request.surveyName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
