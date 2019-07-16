// Datos principales
var datos = d3.json('./sismos_chile.geojson');

// Atributos de Carga
const MAP_ZOOM = 8
const MAP_CENTER = [-31.651055,-71.71826]

// Instancia
var mapa = L.map('myMap').setView(MAP_CENTER, MAP_ZOOM)

// Crear capa de sectores y Copyright del Mapa
var mapabase = 

// L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	subdomains: 'abcd',
// 	// minZoom: 1,
// 	// maxZoom: 16,
// 	ext: 'jpg'

// L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// 	subdomains: 'abcd',
// 	ext: 'png'

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

//PONER ESTE
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribución de &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd'
});

mapabase.addTo(mapa)

// Funciones de visualización
function ventana(feature, layer) {
  if (feature.properties) {
    let: texto = `<div class="card bg-light mb-2" style="max-width: 20rem;">
    <div class="card-header">Fecha: ${feature.properties.fecha} ${feature.properties.hora} [UTC]</div>
    <div class="card-body">
      <h6 class="card-title">Magnitud: ${feature.properties.magnitud} Ms</h6>
      <p class="card-text"></p>
      <span><b>Profundidad</b>: ${feature.properties.profundidad} km</span><br/>
      <span><b>Latitud</b>: ${feature.properties.lat}°</span><br/>
      <span><b>Longitud</b>: ${feature.properties.long}°</span></p>
      <img src="${feature.properties.mapa}" width="200"><br/>
      <p align="center"><a href="${feature.properties.mapa}" target="_blank">Click aquí para ampliar</a></p>
    </div>`
    return layer.bindPopup(texto);
  }
};

function circulo(geoJsonPoint, latlng) {
  return L.circleMarker(latlng)
};

function estilo(geoJsonPoint) {
  let radio = (geoJsonPoint.properties.magnitud**3.5)/50;
  let color = 
    (geoJsonPoint.properties.profundidad < 25) ? '#d7191c' : (
      (geoJsonPoint.properties.profundidad < 50) ? '#fdae61' : ( 
        (geoJsonPoint.properties.profundidad < 100) ? '#ffffbf' : ( 
          (geoJsonPoint.properties.profundidad < 200) ? '#abd9e9' : ( 
            '#2c7bb6')
        )
      )
    );
    return { 
    radius: radio,
    fillColor: color,
    color: "#ffffff",
    weight: 0.5,
    opacity: 0.3,
    fillOpacity: 0.3
  };
};

var mapping = datos.then((geojson) => {
    L.geoJSON(geojson, {
      onEachFeature: ventana,
      pointToLayer: circulo,
      style: estilo
  }).addTo(mapa)
  });