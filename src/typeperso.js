function typepersonnage(inputData) {

  const selector = "#stat3";
  const my_dataviz = d3.select("#stat3");

  const margin = { top: 0, right: 30, bottom: 45, left: 60 };

  const features = Object.keys(inputData);
  const data = [inputData];

  function updateDimensions() {
      const width = parseFloat(my_dataviz.style("width")) - margin.left - margin.right;
      const height = parseFloat(my_dataviz.style("height")) * 0.9 - margin.top - margin.bottom;
      return { width, height };
    }
    

  const { width, height } = updateDimensions();

  let svg = d3
  .select(selector)
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right+30} ${height + margin.top-30 + margin.bottom }`)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top+7})`);

  let radialScale = d3.scaleLinear().domain([0, 12]).range([0, d3.min([width, height]) / 2]);
  let ticks = [2, 4, 6, 8, 10, 12];

  svg.selectAll("circle")
    .data(ticks)
    .join("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("r", d => radialScale(d))
    .attr("opacity", 0)
          .transition()
          .duration(1000)
          .delay(800)
          .attr("opacity", 0.5);


  svg.selectAll(".ticklabel")
    .data(ticks)
    .join("text")
    .attr("class", "ticklabel")
    .attr("x", width / 2 + 5)
    .attr("y", d => height / 2 - radialScale(d))
    .text(d => d.toString())
    .attr("opacity", 0)
    .transition()
    .duration(1000)
    .delay(800)
    .attr("opacity", 0.8);


  function angleToCoordinate(angle, value) {

    let x = Math.cos(angle) * radialScale(value);
    let y = Math.sin(angle) * radialScale(value);
    return { "x": width / 2 + x, "y": height / 2 - y };

  }

  let featureData = features.map((f, i) => {
    let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
    return {
      "name": f,
      "angle": angle,
      "line_coord": angleToCoordinate(angle, 12),
      "label_coord": angleToCoordinate(angle, 12.5)
    };
  });


  // draw axis line
  svg.selectAll("line")
  .data(featureData)
  .join("line")
  .attr("x1", width / 2)
  .attr("y1", height / 2)
  .attr("x2", width / 2)
  .attr("y2", height / 2)
  .attr("stroke", "black")
  .attr("stroke-width", "2px")
  .attr("opacity", 0)
  .transition()
  .duration(1500)
  .attr("x2", d => d.line_coord.x)
  .attr("y2", d => d.line_coord.y)
  .transition()
  .delay(200)
  .attr("opacity", 1);;
  
  
  // draw axis label

  svg.selectAll(".axislabel")
  .data(featureData)
  .join("text")
  .attr("class", "axislabel")
  .attr("x", d => d.label_coord.x-25)
  .attr("y", d => d.label_coord.y-10)
  .text(d => d.name)
  .attr("opacity", 0)
  .transition()
  .delay(800)
  .attr("opacity", 1);
 
  
  let line = d3.line()
    .x(d => d.x)
    .y(d => d.y);
  
  function getPathCoordinates(data_point) {
    let coordinates = [];
    for (var i = 0; i < features.length; i++) {
      let ft_name = features[i];
      let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
      coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    return coordinates;
  }
  
  svg.selectAll("path")
  .data(data)
  .join(
      enter => enter.append("path")
          .datum(d => getPathCoordinates(d))
          .attr("d", line)
          .attr("fill", "black")
          .attr("opacity", 0)
          .transition()
          .duration(1000)
          .delay(800)
          .attr("opacity", 0.65)
  );
  }

  export { typepersonnage }
  
  