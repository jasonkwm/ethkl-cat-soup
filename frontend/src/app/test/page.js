'use client'

import Button from "react-bootstrap/Button";
import {encryptCID, decryptCID} from "../../utilities/encryption"
import { useGlobalContext } from "../../context/GlobalProvider.jsx";
import { pinJSONToIPFS } from "@/utilities/uploadIPFS";

export default function Test() {
  const {provider } = useGlobalContext();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={(e)=>{
        e.preventDefault();
        fetch('/api/uploadSurvey', {
          method: 'POST',
          contentType:"application/json",
          body: JSON.stringify([{id:1,question:"Do you have access to health insurance?",description:"Yes/No" },{id:2,question:"Have you experienced any difficulty in accessing healthcare services in the past year?",description:"Yes/No" }, {id:3,question:"Have you received a flu shot in the past year?",description:"Yes/No" },{id:4,question:"Do you undergo regular screenings for diseases",description:"(e.g., cancer, heart disease)?" },{id:5,question:"How frequently do you engage in recreational physical activities",description:"(e.g., sports, walking)?" },{id:6,question:"Do you undergo regular screenings for diseases (e.g., cancer, heart disease)?",description:"(e.g., cancer, heart disease)" }]),
      }).then(result=>{
        return result.json()
       
      }).then(result=>console.log(result)).catch((error)=>console.log("ms",error))
    }}>
        <input type="text" id="name" name="name"/>name
        <input type="text" id="age" name="age"/>age
        <button type="submit">submit</button>
      </form>
      <form onSubmit={(e)=>{
        e.preventDefault();
        pinJSONToIPFS(document.getElementById("name1").value)
      .then(result=>{
        return result.json()
       
      }).then(result=>console.log(result)).catch((error)=>console.log("ms",error))
    }}>
        <input type="text" id="name1" name="name"/>name
        <input type="text" id="age1" name="age"/>age
        <button type="submit">submit</button>
      </form>
      <Button onClick={()=>{
        fetch('/api/downloadIPFS', {
          method: 'POST',
          contentType:"application/json",
          body: JSON.stringify({decryptedCID:"QmUoqCpXvMEwoEVHnQqSXZ92wKQr3NFpR5cMBXCZA4WmEt"}),
      }).then(result=>{
        return result.json()
       
      }).then(result=>console.log(result)).catch((error)=>console.log("ms",error))}}>Download</Button>
      <Button onClick={async function(){
         let result = await encryptCID("0xEc01f45b1eA7B8d0D257d1E6DAa3F056b2411894", "mseong")
         let decrypted = await decryptCID("867e4223abba806c115eb4fe7c10f071be4e4928c41e9c42cc85220ceeb6d298",result)
      }}>Encrypt</Button>
    </div>
  );
}
