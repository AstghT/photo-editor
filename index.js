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

var img;
var subMenuesArr = [
  "crop-menu",
  "filter-menu",
  "adjustment-menu",
  "text-menu",
  "sticker-menu",
  "brush-menu",
  "focus-menu",
  "frame-menu"
];

var zoomPercentText = document.getElementById("zoom-percent");
var mirror = 1;
var flip = 1;

zoomPercentText.innerHTML = "100%";
function readURL() {
  img = document.getElementById("img");
  var input = document.getElementById("myfile");
  var editIcon = document.getElementById("editIcon");
  var closeIcon = document.getElementById("closeIcon");
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      img.src = e.target.result;
      editIcon.className += " " + "show-icon";
      closeIcon.className += " " + "show-icon";
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function removeImage() {
  img.src = "";
  editIcon.className = "image-edit-icon";
  closeIcon.className = "image-close-icon";
  $(".file-upload-wrapper").attr("data-text", "Select your file!");
}

document.querySelector("#myfile").addEventListener("change", function() {
  readURL();
});

var modal = document.getElementById("modal");

var btn = document.getElementById("editIcon");

var closeButton = document.getElementsByClassName("close")[0];
var initialImageWidth;

btn.onclick = function() {
  modal.style.display = "block";
  var modalImg = document.getElementById("modalImg");
  modalImg.src = img.src;
  initialImageWidth = document.getElementById("modalImg").clientWidth;
};

closeButton.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function zoomin() {
  var myImg = document.getElementById("modalImg");
  var currWidth = myImg.clientWidth;
  if (currWidth == 2500) return false;
  else {
    myImg.style.width = currWidth + 100 + "px";
  }
  var currentZoom = Math.round((100 * (currWidth + 100)) / initialImageWidth);
  zoomPercentText.innerHTML = currentZoom + "%";
}

function zoomout() {
  var myImg = document.getElementById("modalImg");
  var currWidth = myImg.clientWidth;
  if (currWidth == 100) return false;
  else {
    myImg.style.width = currWidth - 100 + "px";
  }
  var currentZoom = Math.round((100 * (currWidth - 100)) / initialImageWidth);
  zoomPercentText.innerHTML = currentZoom + "%";
}

function closeAllSubmenues(excepttion) {
  for (var i = 0; i < subMenuesArr.length; i++) {
    if (subMenuesArr[i] !== excepttion) {
      document.getElementById(subMenuesArr[i]).style.display = "none";
      $("#modalImg").cropper("destroy");
    }
  }
}

function openSubMenu(subMenu) {
  document.getElementById(subMenu).style.display = "block";
  closeAllSubmenues(subMenu);
}

function editImage() {
  var gs = $("#gs").val(); // grayscale
  var blur = $("#blur").val(); // blur
  var br = $("#br").val(); // brightness
  var ct = $("#ct").val(); // contrast
  var huer = $("#huer").val(); //hue-rotate
  var opacity = $("#opacity").val(); //opacity
  var invert = $("#invert").val(); //invert
  var saturate = $("#saturate").val(); //saturate
  var sepia = $("#sepia").val(); //sepia
  var borderSize = $("#frameSize").val(); // frame width
  var borderColor = $("#color1").val(); // frame color

  $("#modalImg").css(
    "filter",
    "grayscale(" +
      gs +
      "%) blur(" +
      blur +
      "px) brightness(" +
      br +
      "%) contrast(" +
      ct +
      "%) hue-rotate(" +
      huer +
      "deg) opacity(" +
      opacity +
      "%) invert(" +
      invert +
      "%) saturate(" +
      saturate +
      "%) sepia(" +
      sepia +
      "%)"
  );

  $("#modalImg").css(
    "-webkit-filter",
    "grayscale(" +
      gs +
      "%) blur(" +
      blur +
      "px) brightness(" +
      br +
      "%) contrast(" +
      ct +
      "%) hue-rotate(" +
      huer +
      "deg) opacity(" +
      opacity +
      "%) invert(" +
      invert +
      "%) saturate(" +
      saturate +
      "%) sepia(" +
      sepia +
      "%)"
  );
  $("#modalImg").css("border", borderSize + "px solid " + borderColor);
}

function editText() {
  var textColor = $("#color2").val();
  var textSize = $("#fontSize").val();
  var textPositionX = $("#positionX").val();
  var textPositionY = $("#positionY").val();
  var rotate = $("#rotate").val();

  $("#text-1").css("fontSize", textSize + "px");
  $("#text-1").css("color", textColor);
  $("#text-1").css("left", textPositionX + "%");
  $("#text-1").css("top", textPositionY + "%");
  $("#text-1").css("transform", "rotate(" + rotate + "deg)");
}

function editSticker() {
  var sticker = $(this).attr("src");
  var stickerContainer = document.getElementById("stickerContainer");
  var stickerPositionX = $("#stickerPositionX").val();
  var stickerPositionY = $("#stickerPositionY").val();

  if (sticker) {
    stickerContainer.src = sticker;
  }
  $("#stickerContainer").css("top", stickerPositionY + "%");
  $("#stickerContainer").css("left", stickerPositionX + "%");
}

$("input[type=range]")
  .change(editImage)
  .mousemove(editImage);
$("#color1").change(editImage);
$("#imageEditor").on("reset", function() {
  setTimeout(function() {
    $("#modalImg").removeAttr("style");
    $("#myCanvas").css("display", "none");
    $("#text-1").css("display", "none");
    $("#text").val("");
    $("#gs").val(0);
    $("#blur").val(0);
    $("#br").val(100);
    $("#ct").val(100);
    $("#huer").val(0);
    $("#opacity").val(100);
    $("#invert").val(0);
    $("#saturate").val(100);
    $("#sepia").val(0);
    $("#frameSize").val(0);
    document.getElementById("stickerContainer").src = "";
    $("#modalImg").cropper("destroy");
  }, 0);
  editImage();
});
$("#color1").colorPicker();
$("#color2").colorPicker();
$("#color3").colorPicker();
function addText() {
  document.getElementById("text-1").innerHTML = $("#text").val();
}

var strokeSize, strokeColor;

function canvasEnableHandler() {
  var img = document.getElementById("modalImg");
  var cnvs = document.getElementById("myCanvas");

  cnvs.style.display = "block";
  cnvs.style.position = "absolute";
  cnvs.style.left = img.offsetLeft + "px";
  cnvs.style.top = img.offsetTop + "px";
  cnvs.style.width = img.width + "px";
  cnvs.style.height = img.height + "px";
}

function strokeStyle() {
  strokeSize = $("#strokeSize").val();
  strokeColor = $("#color3").val();
}

$("#brush-menu").click(canvasEnableHandler);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.lineJoin = "round";
ctx.lineCap = "round";

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
  ctx.lineWidth = strokeSize;
  ctx.strokeStyle = strokeColor;
  if (!isDrawing) return;
  console.log(e);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

var angel = 0;

function rotateImage(event) {
  if (event.data.param === "right") {
    angel += 90;
  } else {
    angel -= 90;
  }

  $("#modalImg").css("transform", "rotate(" + angel + "deg)");
}

function mirrorImg() {
  $("#modalImg").cropper("destroy");
  if (mirror == 1) {
    document.getElementById("modalImg").style.transform = "scaleX(-1)";
    mirror = -1;
  } else {
    document.getElementById("modalImg").style.transform = "scaleX(1)";
    mirror = 1;
  }
}

function flipImg() {
  $("#modalImg").cropper("destroy");
  if (flip == 1) {
    document.getElementById("modalImg").style.transform = "scaleY(-1)";
    flip = -1;
  } else {
    document.getElementById("modalImg").style.transform = "scaleY(1)";
    flip = 1;
  }
}

var $image = $("#modalImg");

var cropper = $image.data("cropper");
function onCropTabOpen() {
  $image.cropper({
    aspectRatio: 1 / 1,
    crop: function(event) {
      console.log(event);
      $("#modalImg").cropper("getCroppedCanvas", { maxWidth: 350 });
    }
  });
}

$().cropper("crop");

function cropRatio(ratio1, ratio2) {
  var ratio = ratio1 / ratio2;
  onCropTabOpen();

  $("#modalImg").cropper("setAspectRatio", ratio);
}

$("#text").change(addText);
$("#fontSize").change(editText);
$("#color2").change(editText);
$("#positionX").change(editText);
$("#positionY").change(editText);
$("#rotate").change(editText);
$("#stickers img").click(editSticker);
$("#stickerPositionX").click(editSticker);
$("#stickerPositionY").click(editSticker);
$("#strokeSize").change(strokeStyle);
$("#color3").change(strokeStyle);
$("#rotate-left").click({ param: "left" }, rotateImage);
$("#rotate-right").click({ param: "right" }, rotateImage);
$("#crop").click(onCropTabOpen);

var requestParams = {
  method: "PUT",
  mode: "cors",
  cache: "default"
};

function save() {
  fetch("http://185.185.71.239:8000/docs/api/photos/1", requestParams).then(
    function(response) {
      console.log(response);
    }
  );
}
