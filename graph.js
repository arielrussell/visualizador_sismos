var ctx = document.getElementById("myChart").getContext('2d');

$.getJSON("sismos_chile.geojson", function (json) {
}).done(function(info){
    date = info.features.map(function (campo) {
        return campo.properties.fecha;
    });
    mag = info.features.map(function (campo) {
        return (campo.properties.magnitud**3.5)/50;
    });
    prof = info.features.map(function (campo) {
        return campo.properties.profundidad;
    });
    lat = info.features.map(function (campo) {
        return campo.properties.lat;
    });
    long = info.features.map(function (campo) {
        return campo.properties.long;
    });
    col_exterior = info.features.map(function (campo) {
        var color_ext = 
        (campo.properties.profundidad < 25) ? '#d7191c' : (
          (campo.properties.profundidad < 50) ? '#fdae61' : ( 
            (campo.properties.profundidad < 100) ? '#ffffbf' : ( 
              (campo.properties.profundidad < 200) ? '#abd9e9' : ( 
                '#2c7bb6')
            )
          )
        )
        return color_ext;
    });

    col_interior = info.features.map(function (campo) {
        var r =
        (campo.properties.profundidad < 25) ? '215' : (
            (campo.properties.profundidad < 50) ? '253' : ( 
              (campo.properties.profundidad < 100) ? '255' : ( 
                (campo.properties.profundidad < 200) ? '171' : ( 
                  '44')
              )
            )
          )
        var g = 
        (campo.properties.profundidad < 25) ? '25' : (
            (campo.properties.profundidad < 50) ? '174' : ( 
              (campo.properties.profundidad < 100) ? '255' : ( 
                (campo.properties.profundidad < 200) ? '217' : ( 
                  '123')
              )
            )
          )
        var b = 
        (campo.properties.profundidad < 25) ? '28' : (
            (campo.properties.profundidad < 50) ? '97' : ( 
              (campo.properties.profundidad < 100) ? '191' : ( 
                (campo.properties.profundidad < 200) ? '233' : ( 
                  '182')
              )
            )
          )

        return 'rgba(' + r + ',' + g + ',' + b + ',' + 0.3 + ')';
    });    

//     for(var i = 0, largo = date.length, datos = []; i < largo; i++) datos.push({
//         x: Date.parse(date[i]), y: lat[i], r: mag[i]
//     }); 
    for(var i = 0, largo = date.length, datos = []; i < largo; i++) datos.push({
        x: long[i], y: prof[i], r: mag[i]
    }); 

    var myChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                data: datos
            }]
        },
        options: {
            legend: false,
//             scales: {
//                 xAxes: [{
//                     type: 'time',
//                     time: {
//                         parser: 'YYYY-MM-DD',
//                         unit: 'year',
//                         displayFormats: {
//                            day: 'ddd'
//                         },
//                     }
//                 }]
//             },
            elements: {
                point: {
                    backgroundColor: col_interior,
                    borderColor: col_exterior,
                }
            },
            chartArea: {
                backgroundColor: 'rgba(251, 85, 85, 0.4)'
            }
        }

    });
});
