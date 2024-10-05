export async function uploadSurvey(nameID,imageID) {
    
        const fileInput = document.getElementById(imageID);
        const file = fileInput.files[0];
        const username = document.getElementById(nameID).value;
    
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('username', username);
    
            fetch('/api/uploadSurvey', {
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
    
   
}