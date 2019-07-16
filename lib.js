module.exports = { 
  // Se define un método local, para leer contenido Web
  leerExcel: function (ARCHIVO, HOJA, callback) {
    const readXlsxFile = require('read-excel-file/node')

    readXlsxFile(ARCHIVO, { sheet: HOJA })
    .then((data) => {
      console.log(data)
      let datos_extraidos = data.slice(1,1747).map((item)=>{
        return { 
          "type": "Feature", 
          "properties": { 
            "estampa": item[0],
            "fecha": item[1],
            "hora": item[2],
            "magnitud": item[4],
            "profundidad": item[3],
            "mapa": item[5],
            "lat": item[6],
            "long": item[7],
          }, 
          "geometry": { 
            "type": "Point", 
            "coordinates": [item[7], item[6]] 
          } 
        }
      })

      let geojson = {
        "type": "FeatureCollection",
        "features": datos_extraidos
      }

      callback(null, geojson)
    })
    .catch((error) => {
      console.log("Se produjo un error al leer el archivo: " + ARCHIVO, error)
      callback(error)
    })
  },

  // Se define un método local, para escribir CSV
  escribirJSON: function (data){
    const fs = require('fs');

    fs.writeFile('sismos_chile.geojson', JSON.stringify(data), 'utf8', function(){
      console.log('Archivo json creado correctamente.')
    })
  }
};