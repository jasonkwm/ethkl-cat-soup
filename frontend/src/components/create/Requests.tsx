import { useSurveyorContext } from "@/context/SurveyorProvider";

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
    <div className="m-auto max-w-[92%] p-6 bg-white rounded-lg shadow-lg mt-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Survey User Requests</h1>
      <ul className="space-y-4">
        {requestList.map((request: any, index: any) => (
          <li key={index} className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="text-md font-semibold text-gray-700">
                  Public Key: {shortenPublicKey(request.publicKey)}
                </p>
                <p className="text-sm text-gray-500">Requested Survey: {request.surveyName}</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-4">
                <button
                  onClick={() => handleAccept(request.publicKey)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(request.publicKey)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Decline
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
