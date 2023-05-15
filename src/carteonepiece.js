
import mapOnePiece from './data/MapOnePieceFinale.json';


function mape(){


  const geojson = mapOnePiece; 

  const parente = document.getElementById('mapcontainer');
  // Obtenez la largeur et la hauteur de l'élément parent
  const width = parente.clientWidth;
  const height = parente.clientHeight;

  const svg = d3.select('#map')
  .attr('width', width-(width*0.05))
  .attr('height', height-(height*0.1))
  .attr('viewBox', `0 0 ${width} ${height}`)
  .attr('preserveAspectRatio', 'xMidYMin meet')
  .style('display', 'flex')
  .style('margin', 'auto')
  .style('padding', `10px ${width * 0.1}  ${height * 0.2}  0px`);



  const scaleFactor = Math.min(width / 480, height / 550); // Ajustez ces valeurs en fonction de la taille originale de la carte

  const projection = d3.geoConicConformal()
    .center([0.48281916217379, -0.7507960123006])
    .scale(7000 * scaleFactor)
    .translate([(width - 720 * scaleFactor) / 2 + 530 * scaleFactor, (height - 680 * scaleFactor) / 2 + 300 * scaleFactor]);


const path = d3.geoPath()
  .projection(projection);

  const deps = svg.append("g")
 .attr('id', 'mapg');

 const minX = d3.min(geojson.features, d => d3.geoBounds(d)[0][0]);
 const minY = d3.min(geojson.features, d => d3.geoBounds(d)[0][1]);
 

  let div = d3.select("body").append("div")
  .attr("class", "map-tooltip")
  .style("opacity", 0); 
  let section4 = d3.select("#sections3");
  
  function getRandomColor(hue) {
    const saturation = Math.random() * 10 + 30; // Entre 60% et 100%
    const lightness = Math.random() * 30 + 40; // Entre 40% et 80%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }


  const specifiedRGB = [89, 131, 168]; // Spécifiez la couleur RGB ici
  const [hue, ,] = rgbToHsl(...specifiedRGB);

  deps.selectAll("path")
  .data(geojson.features)
  .enter()
  .append("path")
  .attr('class', 'region')
 // .attr('fill', () => getRandomColor(hue))
 // a littre darkgrey rg
 .attr('fill',"#5A5E6B")
 .attr('fill-opacity', 0.85)
  .attr('stroke', 'black')
  .attr('stroke-width', 3)
  .attr("d", function (d) {
    const originalPath = path(d);
    return originalPath.replace(/([A-Za-z])([\d\.-]+)/g, function (match, command, value) {
      const scaledValue = command.toUpperCase() === 'H' || command.toUpperCase() === 'V'
        ? parseFloat(value) * scaleFactor
        : parseFloat(value);
      return command + (scaledValue - (command.toUpperCase() === 'M' || command.toUpperCase() === 'L' || command.toUpperCase() === 'H' ? minX * scaleFactor : minY * scaleFactor));
    });
  })
  .on("mouseover", function(event, d) {
    let mouseX = event.pageX;
    let mouseY = event.pageY;

    let section4Rect = section4.node().getBoundingClientRect();
    let tooltipWidth = parseFloat(div.style("width"));
    let tooltipHeight = parseFloat(div.style("height"));

    // Vérifiez si le tooltip dépasse les limites de la section4 et ajustez la position si nécessaire
    if (mouseX + tooltipWidth + 30 > section4Rect.right) {
      mouseX -= tooltipWidth + 60;
    }
    if (mouseY + tooltipHeight - 30 > section4Rect.bottom) {
      mouseY -= tooltipHeight + 60;
    }

    div.transition()
      .duration(200)
      .style("opacity", .9);
    div.html("Île : " + d.properties.island + "<br/>" +"<br/>"+ "Village : " + d.properties.village + "<br/>" +"<br/>"+ "Description : " + d.properties.description + "<br/>" + (d.properties.image ? "<img src='" + d.properties.image + "' />" : ""))
      .style("left", (mouseX + 30) + "px")
      .style("top", (mouseY - 30) + "px");
  })
  .on("mouseout", function(event, d) {
    div.style("opacity", 0);
    div.html("")
      .style("left", "-500px")
      .style("top", "-500px");
  })
  .transition()
  .delay(() => Math.random() * 3000)
  .style('opacity', 1);

    }
      

  


function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; 
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return [h, s, l];
}

      
  

export {mape};