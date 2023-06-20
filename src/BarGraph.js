import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function BarGraph({ data, highlightYear, highlightXAxis, highlightYAxis, fullGraph }) {
  const svgRef = useRef();
  const displayMessageRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const displayMessage = displayMessageRef.current;

    // Define dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    
    // Create scales
    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map((d) => d.age));

    const y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(data, (d) => d.stressLevel)]);

    // Add axes
    const xAxis = d3.axisBottom().scale(x);
    const yAxis = d3.axisLeft().scale(y);

    // Clear existing axis elements
    svg.selectAll("g.axis").remove();

    displayMessage.innerHTML = "";

    // Render x-axis and highlight if highlightXAxis parameter is provided
    svg
      .append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(xAxis);

    if (highlightXAxis) {
      svg.selectAll('.x-axis-highlight').remove(); // Clear any existing x-axis highlight
      svg.selectAll('.y-axis-highlight').remove(); // Clear any existing y-axis highlight
      svg.selectAll('.bar').remove();
      svg.select(".tooltip").remove();
      svg.selectAll(".axis-info").remove();
     
      svg
        .append('rect')
        .attr('class', 'x-axis-highlight')
        .attr('x', margin.left)
        .attr('y', height + margin.top - 1)
        .attr('width', width)
        .attr('height', 20)
        .style('fill', 'yellow')
        .style('opacity', 0.3);
      
        displayMessage.innerHTML = "X Axis represents the age of the person";
    }

    // Render y-axis and highlight if highlightYAxis parameter is provided
    svg
      .append('g')
      .attr('class', 'axis y-axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    if (highlightYAxis) {
      svg.selectAll('.x-axis-highlight').remove(); // Clear any existing x-axis highlight
      svg.selectAll('.y-axis-highlight').remove(); // Clear any existing y-axis highlight
      svg.selectAll('.bar').remove();
      svg.select(".tooltip").remove();
      svg.selectAll(".axis-info").remove();
      
      // Add rectangular highlight on y-axis
      svg
        .append('rect')
        .attr('class', 'y-axis-highlight')
        .attr('x', margin.left-30)
        .attr('y', margin.top)
        .attr('width', 30)
        .attr('height', height)
        .style('fill', 'yellow')
        .style('opacity', 0.3);

        displayMessage.innerHTML = "Y Axis represents the stress level for a particular age";
    }

    // Add bars
    if (fullGraph) {
      displayMessage.innerHTML = "";
      svg.selectAll('.x-axis-highlight').remove(); // Clear any existing x-axis highlight
      svg.selectAll('.y-axis-highlight').remove(); // Clear any existing y-axis highlight

       // Add x-axis information
      svg
      .append("text")
      .attr("class", "axis-info")
      .attr("x", width / 2 + margin.left)
      .attr("y", height + margin.top + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .text("Age")
      .style("font-size", "12px")
      .style("fill", "black");

      // Add y-axis information
      svg
        .append("text")
        .attr("class", "axis-info")
        .attr("x", -(height / 2) - margin.top)
        .attr("y", margin.left - 20)
        .attr("text-anchor", "middle")
        .text("Stress Level")
        .attr("transform", "rotate(-90)")
        .style("font-size", "12px")
        .style("fill", "black");

      svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.age) + margin.left)
      .attr("y", (d) => y(d.stressLevel) + margin.top)
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.stressLevel))
      .style("fill", "steelblue")
      

      .on("mouseover", (event, d) => {
        d3.select(event.target).style("fill", "red");
        svg
          .append("text")
          .attr("class", "tooltip")
          .attr("x", x(d.age) + x.bandwidth() / 2 + margin.left)
          .attr("y", y(d.stressLevel) + margin.top - 10)
          .attr("text-anchor", "middle")
          .text(`Stress Level: ${d.stressLevel}`)
          .style("font-size", "12px")
          .style("fill", "black");

      
      })
      .on("mouseout", (event, d) => {
        d3.select(event.target).style("fill", "steelblue");
        svg.select(".tooltip").remove();
      }); 
      displayMessage.innerHTML = "Bar graph enables the display of stress levels specific to individual age groups upon hovering";
    }
  }, [data, highlightYear, highlightXAxis, highlightYAxis]);

   return (
    <div style={{ textAlign: "center" }}>
    <div ref={displayMessageRef} style={{ fontSize: "16px", marginBottom: "10px" }}></div>
    <svg ref={svgRef} width={350} height={250} />
  </div>
  );
}

export { BarGraph };
