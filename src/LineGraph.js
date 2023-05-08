import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function LineGraph({ data }) {
  const graphRef = useRef();

  useEffect(() => {
    // Select the SVG element using a ref
    const svg = d3.select(graphRef.current);

    // Define the dimensions of the SVG element and the margins
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svg.attr('width') - margin.left - margin.right;
    const height = svg.attr('height') - margin.top - margin.bottom;

    // Define the x and y scales
    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .range([height, 0]);

    // Define the line function
    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    // Append the x axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Append the y axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Append the line path
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }, [data]);

  return (
    <svg ref={graphRef} width={350} height={250} />
  );
}

export {LineGraph};
