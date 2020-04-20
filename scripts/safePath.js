function selectStart(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement("div");
  controlUI.style.backgroundColor = "#3ACCE1";
  controlUI.style.borderRadius = "10px";
  controlUI.style.marginBottom = "8px";
  controlUI.style.marginTop = "8px";
  controlUI.style.textAlign = "center";
  controlUI.style.padding = "8px";
  controlUI.style.minHeight = "35px";
  controlUI.style.maxHeight = "35px";
  controlUI.style.display = "block";
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement("div");
  controlText.style.color = "#ffffff";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "20px";
  controlText.style.lineHeight = "35px";
  controlText.innerHTML = "SELECCIONAR INICIO";
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener("click", function () {
    console.log("Boton start");
  });
}

function selectFinish(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement("div");
  controlUI.style.backgroundColor = "#2A2E43";
  controlUI.style.borderRadius = "10px";
  controlUI.style.marginBottom = "8px";
  controlUI.style.marginTop = "8px";
  controlUI.style.textAlign = "center";
  controlUI.style.padding = "8px";
  controlUI.style.minHeight = "35px";
  controlUI.style.maxHeight = "35px";
  controlUI.style.width = "80vw";
  controlUI.style.display = "block";
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement("div");
  controlText.style.color = "#ffffff";
  controlText.style.fontFamily = "Roboto,Arial,sans-serif";
  controlText.style.fontSize = "20px";
  controlText.style.lineHeight = "35px";
  controlText.innerHTML = "SELECCIONAR DESTINO";
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener("click", function () {
    console.log("Boton finish");
  });
}

function initMap(window) {
  var map;
  if (window == "smap") {
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 17,
      center: { lat: 20.6210035, lng: -103.351878 },

      fullscreenControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
    });

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var selectStartDiv = document.createElement("div");

    var selectStartButton = new selectStart(selectStartDiv, map);
    var selectFinishButton = new selectFinish(selectStartDiv, map);

    selectStartDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
      selectStartDiv
    );
  } else if (window == "cmap") {
    //MAPA DE LA COMUNIDAD
    map = new google.maps.Map(document.getElementById("map2"), {
      zoom: 17,
      center: { lat: 20.6210035, lng: -103.351878 },

      fullscreenControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
      },
    });
    setMarkers(map);
  }
}

var msplit;
var lugares = [];
function getMarkers() {
  let nmap = "cmap";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var tempt = this.responseText;
      msplit = tempt.split("||");
      if (msplit[0] == "0") {
        ons.notification.alert("No se han podido descargar los marcadores!", {
          title: "Tuvimos un problema!",
        });
      } else if (msplit[0] != "") {
        lugares = [];
        lugares = [msplit.length - 1];

        for (let i = 0; i < msplit.length - 1; i++) {
          var splitData = msplit[i].split("|");
          lugares[i] = splitData;
        }
        console.log(lugares); //id/0|url/1|desc/2|lat/3|long/4|date/5
        //
        initMap(nmap);
      } else {
        ons.notification.alert("No se han podido descargar los marcadores!", {
          title: "Tuvimos un problema!",
        });
      }
    }
  };

  xhttp.open("GET", "http://localhost/RespiraSeguro/getMarkerts.php", true);

  xhttp.send();
}

function setMarkers(map) {
  var image = "https://i.imgur.com/NXvSZ3e.png";

  var infowindow, contentString, marker, lugar;

  for (var i = 0; i < lugares.length; i++) {
    lugar = lugares[i];

    marker = new google.maps.Marker({
      position: new google.maps.LatLng(lugar[3], lugar[4]),
      map: map,
      icon: image,
      title: lugar[0],
      animation: google.maps.Animation.DROP,
    });

    var contentString =
      "<h1>Reporte #: " +
      "<b>" + lugar[0] + "</b>" +
      "</h1>" +
      "<h2>" + "Descripción: " + "</h2>" +
      "<h3>" + lugar[2] + "</h3>" +
      "<img src=" + lugar[1] + "alt=" + lugar[2] + "></img>" +
      "<h3>Fecha: " +lugar[5] +"</h3>" +
      "<br>";
    var infowindow = new google.maps.InfoWindow();

    bindInfoW(marker, contentString, infowindow, map);
  }
}

function bindInfoW(marker, contentString, infowindow, map) {
  google.maps.event.addListener(marker, "click", function () {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}
