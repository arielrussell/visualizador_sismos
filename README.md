# visualizador_sismos

Web resultante del proceso: https://arielrussell.github.io/visualizador_sismos/

Consiste en una Web bootstrap para la visualización geográfica y gráfica de los sismos en chile en base a herramientas leaflet y chartjs en el marco del curso de visaulización de datos geográficos en internet.

Descripción: 

En el repositorio los distintos elementos que permiten la visualización del servicio web generado. Para esto se consume un geoJson que fue creados a partir de una tabla excel que, a su vez, fue creada a partir de datos de una página web (no es un scrapping). 

A partir de este geoJson se creó una visualización geográfica (con leaflet) y un gráfico (con chartjs). 

Descripción de los script:
  - index.js: llama a la función lib.js para procesar excel.
  - lib.js: configura la creación del geoJson.
  - mapa.js: llama al geoJson y configura la visualización del mapa.
  - graph.js: llama al geoJson y configura la visualización del mapa.
