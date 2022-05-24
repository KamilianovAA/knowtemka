const imageInput = document.getElementById("picture");
const imgPreview = document.getElementById("img-preview");

imageInput.addEventListener("change", function() {
    getImgData();
});


function getImgData() {
    const files = imageInput.files;
    imgPreview.innerHTML = "";
    if (files) {
        imgPreview.style.display = "flex";
        imgPreview.style.flexWrap = "wrap";
        imgPreview.style.alignItems = "center";
        for(let i = 0; i < files.length; i++) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files[i]);
            fileReader.addEventListener("load", function () {
                imgPreview.innerHTML += '<img src="' + this.result + '" />';
            });
        }
    }
}