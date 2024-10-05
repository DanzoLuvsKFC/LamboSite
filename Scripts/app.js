// Fetch car data and create the D3 visualization
fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/171/modelos')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const carData = data.modelos;

        const svg = d3.select("svg");
        const margin = { top: 20, right: 30, bottom: 40, left: 150 };
        const width = svg.attr("width") - margin.left - margin.right;
        const height = svg.attr("height") - margin.top - margin.bottom;

        //const g = svg.append("g")
            //.attr("transform", `translate(${margin.left},${margin.top})`);

        const g = svg.append("g")
            .attr("transform", `translate(100, 50)`);

        const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(carData, d => d.codigo)]);

        const y = d3.scaleBand()
            .range([0, height])
            .padding(0.1)
            .domain(carData.map(d => d.nome));

        // Add the x-axis
        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")));

        // Add the y-axis
        g.append("g")
            .call(d3.axisLeft(y));

        // Tooltip setup
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background-color", "white")
            .style("border", "1px solid black")
            .style("padding", "8px")
            .style("display", "none")
            .style("pointer-events", "none");

        // Add bars
        g.selectAll(".bar")
            .data(carData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", d => y(d.nome))
            .attr("width", d => x(d.codigo))
            .attr("height", y.bandwidth())
            .on("mouseover", function(event, d) {
                tooltip.style("display", "block")
                    .html(`<strong>Model:</strong> ${d.nome}<br><strong>Code:</strong> ${d.codigo}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
                d3.select(this).attr("fill", "orange"); // Highlight bar
            })
            .on("mousemove", function(event) {
                tooltip.style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 20) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("display", "none");
                d3.select(this).attr("fill", "steelblue"); // Revert bar color
            });

        // Placeholder for images next to bars
        g.selectAll(".car-image")
            .data(carData)
            .enter().append("image")
            .attr("xlink:href", d => `../Images/${d.nome}.jpeg`) // Replace with actual image URLs
            .attr("x", -50) // Position to the left of the bars
            .attr("y", d => y(d.nome) + (y.bandwidth() / 2) - 20)
            .attr("class", "car-image");

        // Add car names to the bars
        /*g.selectAll(".label")
            .data(carData)
            .enter().append("text")
            .attr("x", d => x(d.codigo) + 5)
            .attr("y", d => y(d.nome) + y.bandwidth() / 2)
            .attr("dy", ".35em")
            .text(d => d.nome);*/
    })
    .catch(error => console.error("Error fetching car data: ", error));
