import * as d3 from 'd3';

  function afficherVenteManga() {

    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const my_dataviz = d3.select("#my_dataviz");

    // Créez une fonction pour mettre à jour la largeur et la hauteur en fonction de la taille de la div parente
    function updateDimensions() {
        const width = parseFloat(my_dataviz.style("width")) - margin.left - margin.right;
        const height = parseFloat(my_dataviz.style("height")) - margin.top - margin.bottom;
        return {width, height};
    }

  let {width, height} = updateDimensions();

 

  const svg = my_dataviz
      .append("svg")
      // Utilisez les attributs viewBox et preserveAspectRatio au lieu de width et height
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = datar.ventes;

    data.forEach(function (d) {
        d.date = new Date(+d.annee, 0); // Modification ici
        d.value = +d.nombre;
        delete d.annee; // Supprimer la propriété 'annee'
        delete d.nombre; // Supprimer la propriété 'nombre'
    });


    const x = d3.scaleTime()
        .domain(d3.extent(data, function (d) {
            return d.date;
        }))
        .range([0, width]);
   // 1. Créez un tableau des années distinctes à partir des données
      const uniqueYears = Array.from(new Set(data.map(d => d.date.getFullYear())));

      // 2. Filtrez ce tableau pour n'inclure que les années souhaitées (par exemple, tous les 4 ans)
      const filteredYears = uniqueYears.filter(year => (year - uniqueYears[0]) % 4 === 0);

      // 3. Utilisez la méthode tickValues pour définir les étiquettes à afficher sur l'axe des abscisses
      const xAxis = d3.axisBottom(x)
          .tickValues(filteredYears.map(year => new Date(year, 0, 1))) // Convertissez les années en objets Date pour les utiliser avec l'axe
          .tickFormat(d3.timeFormat("%Y")); // Formatez les étiquettes pour n'afficher que l'année

      svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return +d.value;
        })])
        .range([height, 0]);


    svg.append("g")
        .call(d3.axisLeft(y));

    const lineGenerator = d3.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.value);
        });

    const pathData = lineGenerator(data);

    // ...

// 1. Animer le tracé de la ligne


setTimeout(affichegraph,2200);

function affichegraph(){

    svg.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "black")
.attr("stroke-width", 1.5)
.attr("d", pathData)
.attr("stroke-dasharray", function() {
    const totalLength = this.getTotalLength();
    return `${totalLength} ${totalLength}`;
})
.attr("stroke-dashoffset", function() {
    return this.getTotalLength();
})
.transition()
.duration(2000)
.ease(d3.easeLinear)
.attr("stroke-dashoffset", 0);

// 2. Ajouter des cercles pour chaque point de données
const circles = svg.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", d => x(d.date))
.attr("cy", d => y(d.value))
.attr("r", 0)
.attr("fill", "darkorange");

circles.transition()
.duration(1000)
.delay((d, i) => i * 100)
.attr("r", 4)
.transition()
.duration(300)
.attr("r", 3);
}




        window.addEventListener("resize", () => {
          const {width, height} = updateDimensions();
          my_dataviz.select("svg")
              .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
      });
}


 

let datar = {
  "ventes": [
  {
  "annee": "1997",
  "nombre": "1822218"
  },
  {
  "annee": "1998",
  "nombre": "5310427"
  },
  {
  "annee": "1999",
  "nombre": "5580271"
  },
  {
  "annee": "2000",
  "nombre": "5355206"
  },
  {
  "annee": "2001",
  "nombre": "4813183"
  },
  {
  "annee": "2002",
  "nombre": "4254073"
  },
  {
  "annee": "2003",
  "nombre": "3794620"
  },
  {
  "annee": "2004",
  "nombre": "3581786"
  },
  {
  "annee": "2005",
  "nombre": "3382467"
  },
  {
  "annee": "2006",
  "nombre": "3434777"
  },
  {
  "annee": "2007",
  "nombre": "3444014"
  },
  {
  "annee": "2008",
  "nombre": "4261054"
  },
  {
  "annee": "2009",
  "nombre": "5002885"
  },
  {
  "annee": "2010",
  "nombre": "5307870"
  },
  {
  "annee": "2011",
  "nombre": "4734778"
  },
  {
  "annee": "2012",
  "nombre": "3782159"
  },
  {
  "annee": "2013",
  "nombre": "3799410"
  },
  {
  "annee": "2014",
  "nombre": "4089586"
  },
  {
  "annee": "2015",
  "nombre": "4442492"
  },
  {
  "annee": "2016",
  "nombre": "3747273"
  },
  {
  "annee": "2017",
  "nombre": "2752727"
  },
  {
  "annee": "2018",
  "nombre": "2868164"
  },
  {
  "annee": "2019",
  "nombre": "2988003"
  },
  {
  "annee": "2020",
  "nombre": "2630293"
  },
  {
  "annee": "2021",
  "nombre": "2357214"
  }
  ]
  };

export { afficherVenteManga };
