function assignment6(){
    let filePath="data.csv";
    question0(filePath)
}


let question0=function(filePath){
    //preprocess data
    d3.csv(filePath).then(function(data){

        console.log(data)
        progress(data);
        friends(); //this uses friends.json
        question4();
      
    });
}

let progress=function(data){
    // create plot inside the div #q2_plot
    const margin = {top: 10, right: 30, bottom: 75, left: 50},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    const stats_by_act = Array.from(d3.group(data, d => d.Season))
    console.log(stats_by_act)

    var fixed_dataset = [];

    for (x in stats_by_act){
        const mapToObject = map => Object.fromEntries(map.entries());
        var obj = {}
        obj['Season'] = stats_by_act[x][0]
        var obj2 = mapToObject(stats_by_act[x][1])
        fixed_dataset.push(Object.assign(obj, obj2))
    }

    fixed_dataset.sort((a, b) => {
        let fa = a.Season.toLowerCase(),
            fb = b.Season.toLowerCase();
   
        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });

    console.log()

    
    const svg = d3.select("#q2_plot")
    .append("svg")
        .attr("id", "q2svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("z-index", -1)
    .append("g")
        .attr("transform",`translate(${margin.left},${margin.top})`);
    
    const groups = fixed_dataset.map(d => d.Season)

    console.log(groups)

    const xAxis = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([1])
     
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xAxis))
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)" );

    const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.KD)])
    .range([ height, 0 ]);

    svg.append("g")
    .call(d3.axisLeft(y));

    //fix color
    //fix axis labels
    //fix legends
    //fix title
    //add medals
    //add sizing
    const color = d3.scaleOrdinal()
        .domain(['Unranked', 'Iron', 'Bronze', 'Silver', 'Gold'])
        .range(['black', 'grey', 'brown', 'silver', 'gold'])

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return xAxis(d.Season) })
        .y(function(d) { return y(d.KD) })
        )
    
    svg.append("g")
    .selectAll("points")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xAxis(d.Season);})
    .attr("cy", function(d) { return y(d.KD);})
    .attr("r", 5)
    .style("fill", function(d) { return color(d.Rating)})
    
    svg.append("text")
        .attr("x", 175)
        .attr("y", 5)
        .style('font-size', 19)
        .text("K/D by Season")
    
    svg.append("text")
    .attr("x", 240)
    .attr("y", 280)
    .style('font-size', 12)
    .text("Season")
        
    svg.append("text")
    .attr("x", 80)
    .attr("y", 40)
    .attr("transform", "rotate(90)")
    .style('font-size', 12)
    .text("K/D")
    svg.append("rect")
    .attr("width", 70)
    .attr("height", 85)
    .attr("x", 410)
    .attr("y", 80)
    .style("fill-opacity", 0)
    .style("stroke", "black")
    .style("stroke-width", 2)
    .style("stroke-opacity", 0.5)

    svg.append("text")
    .attr("x", 435)
    .attr("y", 95)
    .style('font-size', 10)
    .text("Unranked")
    svg.append("text")
    .attr("x", 435)
    .attr("y", 110)
    .style('font-size', 10)
    .text("Iron")
    svg.append("text")
    .attr("x", 435)
    .attr("y", 125)
    .style('font-size', 10)
    .text("Bronze")
    svg.append("text")
    .attr("x", 435)
    .attr("y", 140)
    .style('font-size', 10)
    .text("Silver")
    svg.append("text")
    .attr("x", 435)
    .attr("y", 155)
    .style('font-size', 10)
    .text("Gold")

    svg.append("rect")
    .attr("width", 10)
    .attr("height", 4)
    .attr("x", 415)
    .attr("y", 90)
    .style("fill", "black")
    svg.append("rect")
    .attr("width", 10)
    .attr("height", 4)
    .attr("x", 415)
    .attr("y", 105)
    .style("fill", "grey")
    svg.append("rect")
    .attr("width", 10)
    .attr("height", 4)
    .attr("x", 415)
    .attr("y", 120)
    .style("fill", "brown")
    svg.append("rect")
    .attr("width", 10)
    .attr("height", 4)
    .attr("x", 415)
    .attr("y", 135)
    .style("fill", "silver")
    svg.append("rect")
    .attr("width", 10)
    .attr("height", 4)
    .attr("x", 415)
    .attr("y", 150)
    .style("fill", "Gold")
    

}

let friends=function(){

    // set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
width = 600 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;


// append the svg object to the body of the page
var svg = d3.select("#q3_plot")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

fetch("./friends.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

        console.log(data)
        var thickness = d3.scaleLinear()
        .domain([d3.min(data.links.map(function(d) { return d.value; })), d3.max(data.links.map(function(d) { return d.value; }))])
        .range([1, 12])

        const colorScale = d3.scaleLinear()
        .domain([(d3.min(data.nodes.map(function(d) { return d.kd; }))), (d3.max(data.nodes.map(function(d) { return d.kd; })))])
        .range(["Beige", "Red"]);

        var link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", "#aaa")
        .style("stroke-width", (d) => thickness(d.value))


        console.log(colorScale(0.79))
        console.log(d3.max(data.links.map(function(d) { return d.value; })))

        var node = svg
        .append('g')
        .selectAll('circle')
        .data(data.nodes)
        .enter()
        .append('circle')
        .attr('r', (d) => 24 * d.kd)
        .attr('fill', (d) => colorScale(d.kd))
       
        const textElements = svg
        .append('g')
        .selectAll('text')
        .data(data.nodes)
        .enter()
        .append('text')
        .text((node) => node.name)
        .attr('font-size', 10)
        .attr('dx', -10)
        .attr('dy', 3)


        // Let's list the force we wanna apply on the network
        var simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
            .force("link", d3.forceLink()                               // This force provides links between nodes
                    .id(function(d) { return d.id; })                     // This provide  the id of a node
                    .links(data.links)                                    // and this the list of links
            )
            .force("charge", d3.forceManyBody().strength(-1200))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
            .on("end", ticked);




        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; })


            node
                .attr("cx", function (d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        }


        simulation.nodes(data.nodes).on('tick', () => {
            node.attr('cx', (node) => node.x).attr('cy', (node) => node.y)
            textElements.attr('x', (node) => node.x).attr('y', (node) => node.y)
            })
       
        let zoom = d3.zoom()
        .on('zoom', handleZoom);
       
        function handleZoom(e) {
        d3.select('#q3_plot svg g')
            .attr('transform', e.transform);
        }
       
        function initZoom() {
        d3.select('#q3_plot svg')
            .call(zoom);
        }


        initZoom();
         
    })
}

let question4=function(){

    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#q1_plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    var projection = d3.geoMercator()
        .center([4, 47])                // GPS of location to zoom on
        .scale(100)                       // This is like the zoom
        .translate([ width/2, height/2 ])

    var maps;
    var agents;

    d3.json("./maps.json").then(function(data) {
        maps = data.maps;
        agents = data.agents;
    });
    
    // Load external data and boot
    d3.json("./world.json").then( function(data) {
    
        // Draw the map
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .join("path")
                .attr("fill", "#ADD8E6")
                .attr("d", d3.geoPath()
                .projection(projection)
                )
                .style("stroke", "#0373fc") 
        
        const Tooltip = d3.select("#q1_plot")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .attr("z-index", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("padding", "10px")

        const mouseover1 = function(event, d) {
                Tooltip.style("opacity", 1);
                Tooltip
                .html(d.name + "<br>" + "Location: " + d.location)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY) + "px")

              }

        var mouseleave1 = function(event, d) {
            Tooltip.style("opacity", 0)
            }

        const mouseover2 = function(event, d) {
                Tooltip.style("opacity", 1)
                Tooltip
                .html("Agent Name: " + d.name + "<br>")
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY) + "px")
              }
        var mouseleave2 = function(event, d) {
            Tooltip.style("opacity", 0)
            }

                
        svg.selectAll("myCircles")
            .data(maps)
            .enter()
            .append("circle")
                .attr("cx", function(d){ return projection([d.long, d.lat])[0]})
                .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
                .attr("r", 6)
                .attr("class", "circle")
                .style("fill", "#69b3a2")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 3)
                .attr("fill-opacity", .4)
            .on("mouseover", mouseover1)
            .on("mouseleave", mouseleave1)

        svg.selectAll("myCircles")
            .data(agents)
            .enter()
            .append("circle")
                .attr("cx", function(d){ return projection([d.lat, d.long])[0]})
                .attr("cy", function(d){ return projection([d.lat, d.long])[1] })
                .attr("r", 4)
                .attr("class", "circle")
                .style("fill", "#FF7276")
                .attr("stroke", "#FF7276")
                .attr("stroke-width", 3)
                .attr("fill-opacity", .4)
            .on("mouseover", mouseover2)
            .on("mouseleave", mouseleave2)
                
        svg.append("text")
        .attr("x", 100)
        .attr("y", 60)
        .style('font-size', 10)
        .text("Agent")


        svg.append("text")
        .attr("x", 100)
        .attr("y", 75)
        .style('font-size', 10)
        .text("Map")


        svg.append("circle")
        .attr("cx", 80)
        .attr("cy", 55)
        .attr('r', 4)
        .attr("fill-opacity", .4)
        .style("fill", "red")


        svg.append("circle")
        .attr("cx", 80)
        .attr("cy", 70)
        .attr('r', 6)
        .attr("fill-opacity", .4)
        .style("fill", "green")

        svg.append("text")
        .attr("x", 250)
        .attr("y", 60)
        .style('font-size', 20)
        .text("Agents and Maps Distribution")

    })



}