// Set the dimensions and margins of the graph
const margin = { top: 20, right: 25, bottom: 45, left: 50 };
const width = 700 - margin.left - margin.right;
const height = 480 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
const svg = d3.select("#avicii_viz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

//Color scale for the species
const colorScale = d3.scaleOrdinal()
  .domain(data.map(d => d.Species))
  .range(['#1f77b4', '#ff7f0e', '#2ca02c']); 

//Dimensions for each set
const dimensionsSets = [
  ["Sepal_Length", "Sepal_Width", "Petal_Length", "Petal_Width"],
  ["Sepal_Length", "Sepal_Width" ],
  ["Sepal_Length", "Sepal_Width", "Petal_Length"],
  ["Sepal_Length", "Sepal_Width", "Petal_Length", "Petal_Width"]
];

//Create scales for all dimensions
const yScales = {};
dimensionsSets[0].forEach(dimension => {
  yScales[dimension] = d3.scaleLinear()
    .domain(d3.extent(data, d => +d[dimension]))
    .range([height, 30]);
});

// Build the X scale
const xScale = d3.scalePoint()
  .range([0, width])
  .padding(1)
  .domain(dimensionsSets[0]);

// Initialize the plot with y-axes
dimensionsSets[0].forEach(dimension => {
  const axis = d3.axisRight().scale(yScales[dimension]);
  svg.append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${xScale(dimension)},0)`)
    .call(axis);
  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", xScale(dimension))
    .attr("y", -5)
    .style("text-anchor", "middle")
    .text(dimension);
});

// Function to update the dimensions and lines on button click
function updateParallelSet(setIndex) {
  // Clear the existing lines
  svg.selectAll(".line").remove();

  // Draw lines for the selected dimensionsSet
  const selectedDimensions = dimensionsSets[setIndex];

  const line = d3.line()
    .x(d => xScale(d.dimension))
    .y(d => yScales[d.dimension](d.value));

  data.forEach(d => {
    const pathData = selectedDimensions.map(dim => ({ dimension: dim, value: d[dim] }));
    svg.append("path")
      .datum(pathData)
      .attr("class", "line")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", colorScale(d.Species))
      .style("opacity", 1);
  });
}

// Function to change the dimensions on button click
function updateDimensionsSet(setIndex) {
  updateParallelSet(setIndex);
}
