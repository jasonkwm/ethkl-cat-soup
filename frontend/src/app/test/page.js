'use client'
import {uploadSurvey} from "../../utilities/uploadSurvey.js"


export default function Test() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={(e)=>{
        e.preventDefault();
        uploadSurvey("name", "file")

      }}>
        <input type="text" id="name" name="name"/>name
        <input type="file" id="file" name="image"/>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
