window.onload = () => {
    let query = window.location.search.substring(1);
    query = decodeURIComponent(query).split('=')[1];
    let url = './records/' + query + '/' + query + '.json';
    fetch(url).then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        let json = data;
        let name = document.getElementById("obj-name");
        name.innerHTML = json.name;
        let gallery = document.getElementById("gallery");
        let imageUrl = './records/' + query + '/images/';
        for(let i = 0; i < json.images.length; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "column");
            let img = document.createElement("img");
            img.setAttribute("src", imageUrl + json.images[i]);
            img.setAttribute("alt", "Pic. " + i);
            img.onclick = () => {myFunction(img);}
            div.append(img);
            gallery.append(div);
        }
        let docList = document.getElementById("doc-list");
        let docUrl = './records/' + query + '/documents/';
        for(let i = 0; i < json.documents.length; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "left_align_flex div-border");
            let a = document.createElement("a");
            a.setAttribute("href", docUrl + json.documents[i]);
            a.setAttribute("target", "_blank");
            a.setAttribute("class", "results");
            a.innerHTML = json.documents[i];
            div.append(a);
            docList.append(div);
        }
        let attrList = document.getElementById("attr-list");
        for(let i = 0; i < json.attributes.length; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "column_align_flex div-border");
            let h4 = document.createElement("h4");
            h4.innerHTML = json.attributes[i].name;
            let p = document.createElement("p");
            p.innerHTML = json.attributes[i].description;
            div.append(h4);
            div.append(p);
            attrList.append(div);
        }
      }).catch(err => {
        // Do something for an error here
        console.log(err);
      });
}

function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
}