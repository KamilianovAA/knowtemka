window.onload = function () {
    let recently = document.getElementById("recently");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "get-record-names.php");
    xhr.responseType = "json";
    xhr.send();
    xhr.onload = () => {
        let response = xhr.response;
        let div = document.createElement("div");
        div.setAttribute("class", "column_align_flex");
        for(let i = 0; i < response.length; i++) {
            let d = document.createElement("div");
            let a = document.createElement("a");
            let name = response[i].replace(/\.[^/.]+$/, "").replace(/^.*[\\\/]/, '');
            a.setAttribute("href", "view_record.html?name=" + name);
            a.setAttribute("class", "results");
            a.innerHTML = name;
            d.append(a);
            div.append(d);
        }
        recently.after(div);
    }
}