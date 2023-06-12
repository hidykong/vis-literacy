import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function TreeMap({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define dimensions and margins
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    // Create a hierarchy from the data
    const root = d3.hierarchy(data).sum((d) => d.value);

    // Create a treemap layout
    const treemap = d3
      .treemap()
      .size([width, height])
      .padding(1)
      .round(true);

    // Generate the treemap nodes
    const nodes = treemap(root).descendants();

    // Create a group for each treemap node
    const cell = svg
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x0 + margin.left},${d.y0 + margin.top})`);

    // Create rectangles for each treemap node
    cell
        .append("rect")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .style("stroke", "black") // Add a black border
        .style("stroke-width", 0.75) // Set the border width
        .each(function(_, i) {
        const cell = d3.select(this);
        const originalColor = d3.schemeCategory10[i % 10]; // Assign different colors based on index
    
    cell
        .style("fill", originalColor) // Set the initial fill color
        .on("mouseover", () => {
        cell.style("fill", "red"); // Change the fill color on mouseover
        })
        .on("mouseout", () => {
        cell.style("fill", originalColor); // Revert to the original fill color on mouseout
        });
        });
        
    // Add text labels to the rectangles
    cell
      .append("text")
      .attr("x", 5)
      .attr("y", 15)
      .text((d) => d.data.name)
      .style("fill", "white");

  }, [data]);

  return (
    <svg ref={svgRef} width={300} height={250} />
  );
}

export {TreeMap};
