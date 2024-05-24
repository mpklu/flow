// Select the container
const container = d3.select("#workflow");

// Log container to check if it's selected correctly
console.log("Container:", container);

// Load data using fetch
fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data loaded:", data); // Log the loaded data

    // Create SVG element
    const svg = container
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 400 1200");

    console.log("SVG element created"); // Log after SVG is created

    // Define scales
    const yScale = d3
      .scaleLinear()
      .domain([1, d3.max(data, (d) => d.order)])
      .range([100, 700]);

    console.log("Y Scale defined"); // Log after scale is defined

    // Draw nodes (circles)
    const circles = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", 100)
      .attr("cy", (d) => yScale(d.order))
      .attr("r", 0) // Start with radius 0 for animation
      .attr("fill", "#4CAF50");

    circles.transition().duration(1000).attr("r", 20);

    console.log("Circles drawn"); // Log after circles are drawn

    // Add text labels (step names)
    svg
      .selectAll("text.step")
      .data(data)
      .enter()
      .append("text")
      .attr("x", 100)
      .attr("y", (d) => yScale(d.order))
      .attr("dy", -30)
      .attr("text-anchor", "middle")
      .attr("class", "step")
      .text((d) => d.step);

    console.log("Step labels added"); // Log after step labels are added

    // Add descriptions in rounded rectangle boxes
    const descriptionBoxes = svg
      .selectAll("rect.description-box")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", 150)
      .attr("y", (d) => yScale(d.order) - 20)
      .attr("width", 0) // Start with width 0 for animation
      .attr("height", 40)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("fill", "#f4f4f4")
      .attr("stroke", "#ccc");

    descriptionBoxes.transition().duration(1000).attr("width", 200);

    svg
      .selectAll("text.description")
      .data(data)
      .enter()
      .append("text")
      .attr("x", 160)
      .attr("y", (d) => yScale(d.order))
      .attr("dy", 5)
      .attr("class", "description")
      .text((d) => d.description);

    console.log("Descriptions added"); // Log after descriptions are added

    // Add lines between nodes
    const lines = svg
      .selectAll("line")
      .data(data.slice(1))
      .enter()
      .append("line")
      .attr("x1", 100)
      .attr("y1", (d, i) => yScale(data[i].order))
      .attr("x2", 100)
      .attr("y2", (d) => yScale(d.order))
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

    lines
      .transition()
      .duration(1000)
      .attr("y2", (d) => yScale(d.order));

    console.log("Lines added between nodes"); // Log after lines are added

    // Add hover animations
    circles
      .on("mouseover", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 25)
          .attr("fill", "#FF7043");
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 20)
          .attr("fill", "#4CAF50");
      });

    descriptionBoxes
      .on("mouseover", function () {
        d3.select(this).transition().duration(200).attr("fill", "#e0e0e0");
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration(200).attr("fill", "#f4f4f4");
      });

    console.log("Animations added"); // Log after animations are added
  })
  .catch((error) => {
    console.error("Error loading or processing data:", error); // Log any errors
  });
