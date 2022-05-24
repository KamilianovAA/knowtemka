let json;
let query;

window.onload = () => {
    query = window.location.search.substring(1);
    query = decodeURIComponent(query).split('=')[1];
    let url = './records/' + query + '/' + query + '.json';
    fetch(url).then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        json = data;
        let type = json.type;
        let select = document.getElementById("record-type");
        let options = Array.from(select.options);
        let option = options.find(item => item.text === type);
        option.selected = true;
        let name = document.getElementById("name");
        name.value = json.name;
        let gallery = document.getElementById("gallery");
        let imageUrl = './records/' + query + '/images/';
        for(let i = 0; i < json.images.length; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "column imgs");
            let img = document.createElement("img");
            img.setAttribute("src", imageUrl + json.images[i]);
            img.setAttribute("alt", "Pic. " + i);
            img.onclick = () => {myFunction(img);}
            div.append(img);
            let p = document.createElement('p');
            p.innerHTML = "Удалить";
            p.style.textAlign = "center";
            let input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            div.append(p);
            div.append(input);
            gallery.append(div);
        }
        let docList = document.getElementById("doc-list");
        let docUrl = './records/' + query + '/documents/';
        for(let i = 0; i < json.documents.length; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "left_align_flex div-border docs");
            let div2 = document.createElement("div");
            let label = document.createElement("label");
            label.setAttribute("for", "doc" + i); 
            label.innerHTML = "Удалить";
            let input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", "doc" + i);
            div2.append(label);
            div2.append(input);            
            div.append(div2);
            let a = document.createElement("a");
            a.setAttribute("href", docUrl + json.documents[i]);
            a.setAttribute("target", "_blank");
            a.setAttribute("class", "results");
            a.innerHTML = json.documents[i];
            div.append(a);
            docList.append(div);
        }
        for(let i = 0; i < json.attributes.length; i++) {
            let btn = document.getElementById("attribute_btn");
            let div = document.createElement("div");
            div.setAttribute("class", "attr");
        
            let label = document.createElement("p");
            label.innerText = "Название";
            label.setAttribute("class", "item");
            div.append(label);
        
            let input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("class", "item");
            input.value = json.attributes[i].name;
            div.append(input);
            btn.before(div);
        
            label = document.createElement("p");
            label.innerText = "Описание";
            label.setAttribute("class", "item");
            div.append(label);
        
            input = document.createElement("textarea");
            input.setAttribute("class", "text-box item");
            input.value = json.attributes[i].description;
            div.append(input);

            let delBtn = document.createElement("button");
            delBtn.innerHTML = "Удалить";
            delBtn.onclick = () => deleteAttr(delBtn);
            div.append(delBtn);
            btn.before(div);
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

function addAttributeWithDelete() {
    let btn = document.getElementById("attribute_btn");
    let div = document.createElement("div");
    div.setAttribute("class", "attr");

    let label = document.createElement("p");
    label.innerText = "Название";
    label.setAttribute("class", "item");
    div.append(label);

    let input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("class", "item");
    div.append(input);
    btn.before(div);

    label = document.createElement("p");
    label.innerText = "Описание";
    label.setAttribute("class", "item");
    div.append(label);

    input = document.createElement("textarea");
    input.setAttribute("class", "text-box item");
    div.append(input);

    let delBtn = document.createElement("button");
    delBtn.innerHTML = "Удалить";
    delBtn.onclick = () => deleteAttr(delBtn);
    div.append(delBtn);
    btn.before(div);
}

function deleteAttr(btn) {
    let div = btn.parentElement;
    div.remove();
}

function editRecord() {
    let record = new Object();
    record.type = document.getElementById("record-type").value;
    record.name = document.getElementById("name").value;

    record.images = [];
    let imgDel = [];
    let imgsForDeletion = document.getElementsByClassName("imgs");
    for(let i = 0; i < imgsForDeletion.length; i++) {
        let img = imgsForDeletion[i].firstChild;
        let check = img.nextSibling.nextSibling;
        if(check.checked) {
            imgDel.push(img.src);
        }
        else {
            record.images.push(img.src.replace(/^.*[\\\/]/, ''));
        }
    }

    record.documents = [];
    let docDel = [];
    let docsForDeletion = document.getElementsByClassName("docs");
    for(let i = 0; i < docsForDeletion.length; i++) {
        let div = docsForDeletion[i].firstChild;
        let check = div.firstChild.nextSibling;
        let a = div.nextSibling;
        if(check.checked) {
            docDel.push(a.href);
        }
        else {
            record.documents.push(a.href.replace(/^.*[\\\/]/, ''));
        }
    }

    let imgs = document.getElementById("picture").files;
    for(let i = 0; i < imgs.length; i++) 
        record.images.push(imgs[i].name);
    let docs = document.getElementById("documents").files;
    for(let i = 0; i < docs.length; i++) 
        record.documents.push(docs[i].name);

    record.attributes = [];
    let attrs = document.getElementsByClassName("attr")
    for(let i = 0; i < attrs.length; i++) 
        record.attributes.push( { name: attrs[i].children[1].value, description: attrs[i].children[3].value });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "save-record.php");
    xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
    xhr.send("record=" + JSON.stringify(record));

    let xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "edit-record.php");
    //xhr2.setRequestHeader("Content-type", 'multipart/form-data');
    let formData = new FormData();
    formData.append("directory", record.name);
    formData.append("docs-count", docs.length);
    formData.append("img-del", imgDel);
    formData.append("doc-del", docDel);
    for(let i = 0; i < docs.length; i++) 
        formData.append("doc" + i, docs[i]);
    for(let i = 0; i < imgs.length; i++) 
        formData.append("img" + i, imgs[i]);
    for (var p of formData) {
        console.log(p);
    }
    xhr2.send(formData);

    xhr2.onload = () => {
        if(!xhr2.responseText.includes("Failure")){
            window.location.href = window.location.href.replace("edit_record", "view_record");
        }
    } 
}