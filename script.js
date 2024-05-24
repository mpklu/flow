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
      .attr("width", "200")
      .attr("height", "500");
    //   .attr("viewBox", "0 0 400 1200");

    console.log("SVG element created"); // Log after SVG is created

    // Draw shapes based on type
    data.forEach((d) => {
      if (d.type === "start" || d.type === "end") {
        svg
          .append("ellipse")
          .attr("cx", d.cx)
          .attr("cy", d.cy)
          .attr("rx", 40)
          .attr("ry", 20)
          .attr("fill", "#4CAF50");
      } else if (d.type === "process") {
        svg
          .append("rect")
          .attr("x", d.cx - 40)
          .attr("y", d.cy - 20)
          .attr("width", 80)
          .attr("height", 40)
          .attr("fill", "#4CAF50");
      } else if (d.type === "decision") {
        svg
          .append("polygon")
          .attr(
            "points",
            `${d.cx},${d.cy - 30} ${d.cx + 30},${d.cy} ${d.cx},${d.cy + 30} ${
              d.cx - 30
            },${d.cy}`
          )
          .attr("fill", "#4CAF50");
      }

      svg
        .append("text")
        .attr("x", d.cx)
        .attr("y", d.cy + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .text(d.label);
    });
  })
  .catch((error) => {
    console.error("Error loading or processing data:", error); // Log any errors
  });
