import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function ScatterPlot({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    // Create scales for x and y axes
    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, d3.max(data, (d) => d.age) + 10])

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, (d) => d.stressLevel)]);

    // Add axes
    const xAxis = d3.axisBottom().scale(x);
    const yAxis = d3.axisLeft().scale(y);

    // Clear existing elements
    svg.selectAll("g").remove();

    

    // Create x-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
      .call(xAxis);

    // Create y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    // Create circles for each data point
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.age) + margin.left)
      .attr("cy", (d) => y(d.stressLevel) + margin.top)
      .attr("r", 5)
      .style("fill", "steelblue");
      
  }, [data]);

  return <svg ref={svgRef} width={350} height={200} />;
}

export { ScatterPlot };
