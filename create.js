window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      window.location.href = "login.html";
    }
});

async function addProject() {
    const titleInput = document.getElementById("title-input").value;
    const blurbInput = document.getElementById("blurb-input").value;
    const imageInput = await convertImage(document.getElementById("image-input"));

    const projectArray = ({
        id: "",
        title: titleInput,
        image: imageInput,
        blurb: blurbInput,
    });
    
    console.log(projectArray);
    await fetch('https://project10backend-production.up.railway.app/projects', {
        method: "POST",
        body: JSON.stringify({
            projectData: projectArray
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function convertImage(input) {
    const file = input.files[0];
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
}