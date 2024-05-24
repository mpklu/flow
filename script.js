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

    // Dimensions and margins
    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    // Create SVG element
    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    console.log("SVG element created"); // Log after SVG is created

    // Compute positions
    const stepHeight = (height - margin.top - margin.bottom) / data.length;
    const centerX = (width - margin.left - margin.right) / 2;

    // Box dimensions
    const boxWidth = 200;
    const boxHeight = stepHeight / 2;

    // Draw shapes based on type
    data.forEach((d, i) => {
      const stepGroup = svg
        .append("g")
        .attr("class", "step-group")
        .attr(
          "transform",
          `translate(${centerX},${i * stepHeight + stepHeight / 2})`
        );

      stepGroup
        .append("rect")
        .attr("x", -boxWidth / 2)
        .attr("y", -boxHeight / 2)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "#4CAF50");

      stepGroup
        .append("text")
        .attr("x", 0)
        .attr("y", -boxHeight / 4)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .text(d.step);

      stepGroup
        .append("text")
        .attr("x", 0)
        .attr("y", boxHeight / 4)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("fill", "#333")
        .attr("font-size", "12px")
        .text(d.description);
    });

    // Draw arrows
    data.forEach((d, i) => {
      if (i < data.length - 1) {
        svg
          .append("line")
          .attr("x1", centerX)
          .attr("y1", i * stepHeight + stepHeight / 2 + boxHeight / 2)
          .attr("x2", centerX)
          .attr("y2", (i + 1) * stepHeight + stepHeight / 2 - boxHeight / 2)
          .attr("stroke", "#4CAF50")
          .attr("stroke-width", 2)
          .attr("marker-end", "url(#arrow)");
      }
    });

    // Define arrow marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#4CAF50");

    // Draw the loop arrow
    // Draw the loop arrow
    const loopArrow = svg
      .append("path")
      .attr(
        "d",
        `M ${centerX + boxWidth / 2} ${6 * stepHeight + stepHeight / 2}
            L ${centerX + boxWidth / 2 + 150} ${6 * stepHeight + stepHeight / 2}
            L ${centerX + boxWidth / 2 + 150} ${stepHeight / 2}
            L ${centerX + boxWidth / 2} ${stepHeight / 2}`
      )
      .attr("fill", "none")
      .attr("stroke", "#4CAF50")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // Add text for loop arrow
    svg
      .append("text")
      .attr("x", centerX + 150)
      .attr("y", -stepHeight / 2 - boxHeight / 2 - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "#4CAF50")
      .text("Repeat Loop");
  })
  .catch((error) => {
    console.error("Error loading or processing data:", error); // Log any errors
  });
