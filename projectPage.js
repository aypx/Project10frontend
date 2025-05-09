async function getProject() {
    const selectedId = localStorage.getItem("selectedId");

    const response = await fetch(`http://localhost:3001/projects/${selectedId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const projectData = await response.json();
    console.log("projectData:", projectData);


    document.getElementById("project-title").innerText = projectData.title;
    const file = base64ToFile(projectData.image, 'image');
    document.getElementById("project-image").src = URL.createObjectURL(file);
    document.getElementById("project-blurb").innerText = projectData.blurb;

    localStorage.removeItem("selectedId");
}

function base64ToFile(base64String, filename) {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1]; 
    const bstr = atob(arr[1]);               
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
}

getProject();