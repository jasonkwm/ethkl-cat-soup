'use client'



export default function Test() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={(e)=>{
        e.preventDefault();
        fetch('/api/uploadSurvey', {
          method: 'POST',
          contentType:"application/json",
          body: JSON.stringify({name:document.getElementById("name").value, age:document.getElementById("age").value}),
      }).then(result=>{
        return result.json()
       
      }).then(result=>console.log(result)).catch((error)=>console.log("ms",error))
    }}>
        <input type="text" id="name" name="name"/>name
        <input type="text" id="age" name="age"/>age
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
