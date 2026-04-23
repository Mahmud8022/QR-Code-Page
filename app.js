function saveParcel() {
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;

  let data = { id, name, address };

  localStorage.setItem(id, JSON.stringify(data));

  let canvas = document.getElementById("qr");

  QRCode.toCanvas(canvas, id, {
    width: 250,
    errorCorrectionLevel: 'H'
  }, function () {

    // logo add
    let ctx = canvas.getContext("2d");
    let img = new Image();
    img.src = "logo.png";

    img.onload = function () {
      let size = 60;
      let x = (canvas.width - size) / 2;
      let y = (canvas.height - size) / 2;

      ctx.drawImage(img, x, y, size, size);
    };
  });
}

// scan
function onScanSuccess(text) {
  let data = localStorage.getItem(text);

  if (data) {
    let p = JSON.parse(data);

    document.getElementById("result").innerHTML =
      "ID: " + p.id + "<br>" +
      "Name: " + p.name + "<br>" +
      "Address: " + p.address;
  } else {
    document.getElementById("result").innerHTML = "Not Found";
  }
}

let scanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250
});

scanner.render(onScanSuccess);