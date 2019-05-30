$("form").on("change", ".file-upload", function() {
  $(this)
    .parent(".file-upload-wrapper")
    .attr(
      "data-text",
      $(this)
        .val()
        .replace(/.*(\/|\\)/, "")
    );
});

var img

function readURL() {
  img = document.getElementById("img");
  var input = document.getElementById("myfile");
  var editIcon = document.getElementById("editIcon");
  var closeIcon = document.getElementById("closeIcon");
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      console.log("changed", input);
      img.src = e.target.result;
      editIcon.className += " " + "show-icon";
      closeIcon.className += " " + "show-icon";
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function editImage() {
  console.log("EDIIIIIIIIIIIITTT");
}

function removeImage() {
  img.src = "";
  editIcon.className = "image-edit-icon";
  closeIcon.className = "image-close-icon";
  $(".file-upload-wrapper").attr("data-text", "Select your file!");
  console.log("CLOOOOOSE");
}

document.querySelector("#myfile").addEventListener("change", function() {
  readURL();
});

var modal = document.getElementById("modal");

var btn = document.getElementById("editIcon");

var closeButton = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
  var modalImg = document.getElementById("modalImg");
  modalImg.src = img.src;
}

closeButton.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
