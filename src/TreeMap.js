import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function TreeMap({ data, message, displayFullMap }) {
  const svgRef = useRef();
  const displayMessageRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const displayMessage = displayMessageRef.current;

    // Define dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    // Total sum of coutries step by step  
    const sum = d3.sum(data.children, (d) => d.value);

    // Create a hierarchy from the data
    const root = d3.hierarchy({ children: data.children }).sum((d) => d.value);

    // Create a treemap layout
    const treemap = d3
      .treemap()
      .size([width, height])
      .padding(1)
      .round(true);

    // Generate the treemap nodes
    const nodes = treemap(root).descendants();

    // Clear existing nodes and tooltips
    svg.selectAll("g.node").remove();
    svg.select(".tooltip").remove();

    displayMessage.innerHTML = "";

    // Define color scale
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    // Render treemap nodes
    const cell = svg
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x0 + margin.left},${d.y0 + margin.top})`)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    cell
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("stroke", "black")
      .style("stroke-width", 0.75)
      .style("fill", (_d, i) => colorScale(i));

    cell
      .append("text")
      .attr("x", 5)
      .attr("y", 15)
      .text((d) => d.data.name)
      .style("fill", "white");

    function handleMouseOver(_event, d) {
      const tooltip = svg
        .append("text")
        .attr("class", "tooltip")
        .attr("x", d.x0 + margin.left + 5)
        .attr("y", d.y0 + margin.top + 15)
        .style("fill", "black")
        .style("font-weight", "bold");
    
      tooltip.text(`${d.data.name}:${d.data.value}[${((d.data.value * 100) / sum).toFixed(0) }%]`);
    }

    function handleMouseOut(_event, _d) {
      svg.select(".tooltip").remove();
    }

    // Display message based on the displayFullMap parameter
    if (displayFullMap) {
      displayMessage.innerHTML = "Top five countries worldwide based on stress experienced when hover you will get to know %";
    } else {
      displayMessage.innerHTML = message
    }
  }, [data, displayFullMap]);

  return (
    <div style={{ textAlign: "center" }}>
      <div ref={displayMessageRef} style={{ fontSize: "16px", marginBottom: "10px" }}></div>
      <svg ref={svgRef} width={350} height={250} />
    </div>
  );
}

export { TreeMap };