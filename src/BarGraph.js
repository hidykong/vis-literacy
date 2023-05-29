import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function BarGraph({ data, highlightYear, highlightXAxis, highlightYAxis, fullGraph }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    // Create scales
    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map((d) => d.year));

    const y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(data, (d) => d.value)]);

    // Add axes
    const xAxis = d3.axisBottom().scale(x);
    const yAxis = d3.axisLeft().scale(y);

    // Clear existing axis elements
    svg.selectAll("g.axis").remove();

    // Render x-axis and highlight if highlightXAxis parameter is provided
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(xAxis);

    if (highlightXAxis && !highlightYAxis) {
      svg.selectAll('.x-axis-highlight').remove(); // Clear any existing x-axis highlight

      // Add rectangular highlight on x-axis
      svg
        .append('rect')
        .attr('class', 'x-axis-highlight')
        .attr('x', margin.left)
        .attr('y', height + margin.top - 1)
        .attr('width', width)
        .attr('height', 20)
        .style('fill', 'yellow');
    }

    

    // Render y-axis and highlight if highlightYAxis parameter is provided
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    if (highlightYAxis && !fullGraph) {
      svg.selectAll('.y-axis-highlight').remove(); // Clear any existing y-axis highlight

      // Add rectangular highlight on y-axis
      svg
        .append('rect')
        .attr('class', 'y-axis-highlight')
        .attr('x', margin.left-30)
        .attr('y', margin.top)
        .attr('width', 30)
        .attr('height', height)
        .style('fill', 'yellow');
    }

    // Add bars
    if ( highlightYear || fullGraph) {
      svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.year) + margin.left)
        .attr("y", (d) => y(d.value) + margin.top)
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d.value))
        .style("fill", (d) =>
          d.year >= highlightYear ? "red" : "steelblue"
        )
        .on("mouseover", (event, d) => {
          d3.select(event.target).style("fill", "red");
        })
        .on("mouseout", (event, d) => {
          d3.select(event.target).style("fill", (d) =>
            d.year >= highlightYear ? "red" : "steelblue"
          );
        });
    }
  }, [data, highlightYear, highlightXAxis, highlightYAxis]);

  return <svg ref={svgRef} width={350} height={250} />;
}

export { BarGraph };
