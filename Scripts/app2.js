fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/171/modelos')
    .then(response => response.json())
    .then(data => {
        const numCircles = data.modelos.length;
        const radius = 250;  // Set the radius for the circular arrangement
        const centerX = 400;  // Center of the SVG
        const centerY = 300;  // Center of the SVG
        const circleSize = 30;  // Set a constant circle size

        const carData = data.modelos.map((car, i) => {
            const angle = (i / numCircles) * 2 * Math.PI;  // Calculate angle for each circle
            return {
                name: car.nome,
                x: centerX + radius * Math.cos(angle),  // Calculate x position
                y: centerY + radius * Math.sin(angle),  // Calculate y position
                radius: circleSize,  // Set all circles to the same size
                index: i
            };
        });

        createChart(carData);
    })
    .catch(error => console.error("Error fetching data:", error));

function createChart(data) {
    const width = 800;
    const height = 600;

    let currentTransform = [width / 2, height / 2, height];  // Initial state

    const svg = d3.select("#chicken")
        .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g");

    // Create circles for each car
    g.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.radius)  // Use constant radius
        .attr("fill", d => d3.interpolateRainbow(d.index / data.length));

    // Add text labels for each circle
    g.selectAll("text")
        .data(data)
        .join("text")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dy", ".35em")  // Vertically centers the text within the circle
        .attr("text-anchor", "middle")  // Horizontally centers the text
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text(d => d.name);

    // Zoom transition function (continuous animation)
    function transition() {
        const d = data[Math.floor(Math.random() * data.length)];
        const i = d3.interpolateZoom(currentTransform, [d.x, d.y, d.radius * 2 + 1]);

        g.transition()
            .delay(250)
            .duration(i.duration)
            .attrTween("transform", () => t => transform(currentTransform = i(t)))
            .on("end", transition);  // Continue the transition in a loop
    }

    // Function to calculate the transform string for zooming
    function transform([x, y, r]) {
        return `
          translate(${width / 2}, ${height / 2})
          scale(${height / r})
          translate(${-x}, ${-y})
        `;
    }

    return svg.call(transition).node();  // Start the transition immediately
}



    
