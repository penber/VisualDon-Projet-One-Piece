function fonctionne() {

    const margin = { top: 10, right: 30, bottom: 30, left: 60 };

    const duration = 4500; // Durée de l'animation en millisecondes

    function updateDimensions() {
        const width = parseFloat(my_dataviz.style("width")) - margin.left - margin.right;
        const height = parseFloat(my_dataviz.style("height")) - margin.top - margin.bottom;
        return { width, height };
    }
    
    const my_dataviz = d3.select("#stat2");
    const { width, height } = updateDimensions();
    
    const svg = my_dataviz
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append("g")
        .attr("transform",
            `translate(${margin.left},${margin.top})`);

// Utilisez les données de la variable datar
const dataForHistogram = datar.data.map(function (d) {
    return { year: d.Année, chapters: d.Chapitres };
});

(function (data) {
    const x = d3.scaleLinear()
        .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    const histogram = d3.histogram()
        .value(function (d) { return d.year; })
        .domain(x.domain())
        .thresholds(x.ticks(data.length));

    const bins = histogram(data);

    const y = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) { return d3.sum(d, d => d.chapters); })])
        .range([height, 0]);

        svg.append("g")
        .call(d3.axisLeft(y));

        
  setTimeout(maFonction, 3000);

  function maFonction() {

    svg.selectAll("rect")
    .data(bins)
    .join("rect")
    .attr("x", 1)
    .attr("transform", function (d) { return `translate(${x(d.x0)}, ${height})` }) // Modifiez cette ligne
    .attr("width", function (d) { return Math.max(0, x(d.x1) - x(d.x0) - 1) })
    .attr("height", 0) // Ajoutez cette ligne
    .style("fill", "black")
    .transition()
    .duration(duration)
    .attr("transform", function (d) { return `translate(${x(d.x0)}, ${y(d3.sum(d, d => d.chapters))})` })
    .attr("width", function (d) { return Math.max(0, x(d.x1) - x(d.x0) - 1) })
    .attr("height", function (d) { return height - y(d3.sum(d, d => d.chapters)); });

      
  }

   
})(dataForHistogram);

window.addEventListener("resize", () => {
    const {width, height} = updateDimensions();
    my_dataviz.select("svg")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
});
    
}



let datar = {
    "data": [
      {
        "Année": 1997,
        "Chapitres": 8
      },
      {
        "Année": 1998,
        "Chapitres": 11
      },
      {
        "Année": 1999,
        "Chapitres": 22
      },
      {  "Année": 2000,
      "Chapitres": 24
    },
    {
      "Année": 2001,
      "Chapitres": 25
    },
    {
      "Année": 2002,
      "Chapitres": 26
    },
    {
      "Année": 2003,
      "Chapitres": 41
    },
    {
      "Année": 2004,
      "Chapitres": 31
    },
    {
      "Année": 2005,
      "Chapitres": 31
    },
    {
      "Année": 2006,
      "Chapitres": 35
    },
    {
      "Année": 2007,
      "Chapitres": 35
    },
    {
      "Année": 2008,
      "Chapitres": 34
    },
    {
      "Année": 2009,
      "Chapitres": 31
    },
    {
      "Année": 2010,
      "Chapitres": 33
    },
    {
      "Année": 2011,
      "Chapitres": 49
    },
    {
      "Année": 2012,
      "Chapitres": 48
    },
    {
      "Année": 2013,
      "Chapitres": 50
    },
    {
      "Année": 2014,
      "Chapitres": 55
    },
    {
      "Année": 2015,
      "Chapitres": 53
    },
    {
      "Année": 2016,
      "Chapitres": 52
    },
    {
      "Année": 2017,
      "Chapitres": 52
    },
    {
      "Année": 2018,
      "Chapitres": 49
    },
    {
      "Année": 2019,
      "Chapitres": 61
    },
    {
      "Année": 2020,
      "Chapitres": 48
    },
    {
      "Année": 2021,
      "Chapitres": 59
    },
    {
      "Année": 2022,
      "Chapitres": 19
    }]
}
    
  
export {fonctionne};