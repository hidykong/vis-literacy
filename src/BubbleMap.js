import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function BubbleMap({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    // Create a pack layout
    const pack = d3
      .pack()
      .size([width, height])
      .padding(1);

    // Generate the hierarchy from the data
    const root = d3.hierarchy(data).sum((d) => d.value);

    // Assign positions to the hierarchy nodes
    pack(root);

    // Clear existing elements
    svg.selectAll("g").remove();

    // Create a group for each node in the hierarchy
    const nodes = svg
      .selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x + margin.left},${d.y + margin.top})`);

    // Create circles for each node
    nodes
      .append("circle")
      .attr("r", (d) => d.r)
      .style("fill", (d, i) => d3.schemeCategory10[i % 10]) 
      .style("stroke", "black") 
      .style("stroke-width", 1); 

    // Add text labels to the circles
    nodes
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .text((d) => d.data.name)
      .style("fill", "white");

  }, [data]);

  return (
    <svg ref={svgRef} width={300} height={250} />
  );
}

export {BubbleMap};
