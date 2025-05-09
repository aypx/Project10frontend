async function createPage() {
    const response = await fetch(`https://project10backend-production.up.railway.app/projects`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const projects = await response.json();
    const galleryContainer = document.getElementById("gallery-container");

    for (let i=0; i < projects.length; i++) {
        const container = document.createElement("div");
        container.id = `project-card${i+1}`;
        container.classList.add("project-card");

        const title = document.createElement("h1");
        title.textContent = projects[i].title;
    
        const file = base64ToFile(projects[i].image, `image${i}`);
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file); 
    
        container.appendChild(title);
        container.appendChild(image);

        const pageLink = document.createElement("a");
        pageLink.href = `./project.html`;
        pageLink.addEventListener("click", () => {
            localStorage.setItem("selectedId", projects[i].id);
            console.log(localStorage.getItem(projects[i].id));
        });

        pageLink.appendChild(container);
        galleryContainer.appendChild(pageLink);
    }
    
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

createPage();