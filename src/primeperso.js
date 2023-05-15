import data from "./data/persoprime.json";

let isDragging = false; // Declare it here as global variable
let activeTooltip = null; // Declare it here as global variable

function primepers(){
    function zero(){

        const pirates = data.filter(d => d.group === "Pirate");

        pirates.forEach(d => {
          d.Age = +d.Age;
          
          if (typeof d.total_amount === 'string') {
            d.total_amount = +d.total_amount.replace(/'/g, "");
        } else if (typeof d.total_amount === 'number') {
            d.total_amount = +d.total_amount;
        }
        });
      
        const width = 800;
        const height = 600;
      
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(pirates, d => d.Age)])
            .range([40, width - 90]);
      
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(pirates, d => d.total_amount)])
            .range([height - 40, 90]);
      
        const radiusScale = d3.scaleSqrt()
            .domain([0, d3.max(pirates, d => d.total_amount)])
            .range([4, 80]);
      
        const svg = d3.select("#bulles");
        const defs = svg.append("defs");
      
        pirates.forEach((d, i) => {
          const pattern = defs.append("pattern")
            .attr("id", `pirate-img-${i}`)
            .attr("width", 1)
            .attr("height", 1)
            .attr("patternContentUnits", "objectBoundingBox");
      
          pattern.append("image")
            .attr("preserveAspectRatio", "xMidYMid slice")
            .attr("xlink:href", d.IMG)
            .attr("width", 1)
            .attr("height", 1);
        });

        const simulation = d3.forceSimulation(pirates)
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.08))
        .force("collide", d3.forceCollide(d => radiusScale(d.total_amount) + 5).strength(1))
        .on("tick", ticked);
      
      
          
        function ticked() {
          circles.attr("cx", d => d.x)
            .attr("cy", d => d.y);
        }
      
        const tooltip = d3.select("body").append("div")
        .attr("id", "tooltipperso")
        .style("position", "absolute")
        .style("background-color", "rgba(190, 165, 120, 0.95)") // couleur de fond modifiée
        .style("padding", "10px")
        .style("border-radius", "5px")
        .style("pointer-events", "none")
        .style("font-size", "20px")
        .style("color", "white") // couleur du texte modifiée
        .style("font-family", "Bebas Neue', sans-serif")
        .style("display", "none")
        .style("height", "auto")
        .style("align-items", "center")
        .style("box-shadow", "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(255, 0, 0, 0.08)"); // ajout d'une ombre
      
        const circles = svg.selectAll("circle")
        .data(pirates)
        .join("circle")
        .attr("cx", d => xScale(d.Age))
        .attr("cy", d => yScale(d.total_amount))
        .attr("r", 0)
        .attr("fill", (d, i) => `url(#pirate-img-${i})`)
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .call(drag(simulation));
      
        circles.on("mouseover", (event, d) => {
          if (!isDragging)  {
        tooltip.html(`
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; font-size:20px;">
          
            <h5 style="color:black; font-size:36px;" z-index:2;> WANTED</h4>
            <img src="${d.IMG}" style="width:auto; height:auto; max-height:160px; border-radius:10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);"> 
            <br>
            <div style="display: flex; flex-direction: column; align-items: left; justify-content: left;">  
              <p> <span style="font-size:21px; color:white;">${d.grant_title} </span></p>
              <br>
              <p>Âge: <span style="color:white;">${d.Age} ans </span></p>
              <br>
              <p>Prime: <span style="font-size:22px; color:rgb(232, 82, 82); font-weight:500;font-style: oblique;">${formatNumber(d.total_amount)}</span> <span style="color:white;">£ Berrys</span></p>
              <br>
              <p>Provenance: <span style="color:white;">${d.origin} Berrys </span></p>
            </div>
          </div>
        `)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 200}px`)
        .style("width", "300px")
            .style("max-height", "480px")
          .style("justify-content", "center")
        .style("display", "block")
        .style("border", "3px solid black")
        .style("border-radius", "15px");
  
            }})
            .on("mouseout", () => {
              if (!isDragging) {
                tooltip.style("display", "none"); // Cache le tooltip
              }
            });
            

            setTimeout(function() {     
           
                
                  circles.transition()
                      .duration(2500)
                      .attr("r", d => radiusScale(d.total_amount)); }, 1000);

}
  zero();

  const screenWidth = window.innerWidth;
  const svgWidth = 800;
  
  const svg = d3.select("svg")
    .style("margin-left", "auto")
    .style("margin-right", "auto")
    .style("display", "block");
}

//fontion qui met des ' à la bonne place dans les nombres
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export { primepers}

function drag(simulation) {
  let isDragging = false;

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    isDragging = true;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    isDragging = false;
  }

  return d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
}