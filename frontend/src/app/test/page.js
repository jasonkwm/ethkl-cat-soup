

export default function Test() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={(e)=>{
        e.preventDefault();
        ocument.getElementById('uploadBtn').addEventListener('click', function() {
          const fileInput = document.getElementById('fileInput');
          const file = fileInput.files[0];
          const username = document.getElementById('username').value;
      
          if (file) {
              const formData = new FormData();
              formData.append('file', file);
              formData.append('username', username);
      
              fetch('/api/upload', {
                  method: 'POST',
                  body: formData,
              })
              .then(response => response.json())
              .then(data => {
                  console.log('Success:', data);
              })
              .catch(error => {
                  console.error('Error:', error);
              });
          } else {
              console.error('No file selected');
          }
      });

      }}>
        <input type="text" id="name" name="image">text</input>
        <input type="file" id="file" name="image"/>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
