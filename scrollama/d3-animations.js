// Set the dimensions and margins of the graph
const margin = { top: 50, right: 25, bottom: 45, left: 50 };
const width = 700 - margin.left - margin.right;
const height = 420 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
const svg = d3.select("#avicii_viz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  svg.selectAll("*").remove(); 

  const root = d3.hierarchy(data[0])
    .sum((d) => d.magnitude)
    .sort((a, b) => b.value - a.value);

  // Create a treemap layout
  const treemapLayout = d3.treemap()
    .size([width, height])
    .paddingOuter(10)
    .paddingTop(30)
    .paddingInner(3)
    .round(true);

  // Compute treemap layout
  treemapLayout(root);

  // Create groups for each node
  const cell = svg.selectAll("g")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  // Draw rectangles for each node
  cell.append("rect")
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => d.depth === 0 ? "steelblue" : d.depth === 1 ? "lightblue" : "lightgreen")
    .attr("stroke", "black");

  // Add text labels
  cell.append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text((d) => d.data.title);

  // Add labels for magnitudes
  cell.filter((d) => d.depth === 2)
    .append("text")
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", 60)
    .attr("text-anchor", "middle")
    .text((d) => d.data.magnitude);

    function updateTreemap(index) {
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
      svg.selectAll("*").remove(); 
      const newData = d3.hierarchy(data[0])
        .sum((d) => d.magnitude)
        .sort((a, b) => b.value - a.value);
    
      // Calculate the maximum allowed depth based on the index
      const maxDepth = (index >= 3) ? 2 : index;
    
      const filteredData = newData.descendants().filter((d) => d.depth <= maxDepth);
    
      const treemapLayout = d3.treemap()
        .size([width, height])
        .paddingOuter(10)
        .paddingTop(30)
        .paddingInner(3)
        .round(true);
    
      treemapLayout(newData);
    
      // Create groups for each node
      const cell = svg.selectAll("g")
        .data(filteredData, (d) => d.data.title);
    
      // Exit old elements
      cell.exit().remove();
    
      // Enter new elements
      const enterCell = cell.enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);
    
    
      // Draw rectangles for each node
      enterCell.append("rect")
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("fill", (d) => {
          if (d.depth === 0)
          {
            return "steelblue";
          } 
          else if(d.depth === 1)
          {
            if(index === 3 && d.data.title === "Mammals") 
            {
              return "lightyellow";
            }
            else if(index === 4 && d.data.title === "Reptiles") 
            {
              return "lightyellow";
            }
            else if(index === 5 && d.data.title === "Birds") 
            {
              return "lightyellow";
            }
            else
            {
              return "lightblue";
            }
          }
          else 
          {
            return "lightgreen";
          }
        })
        .attr("stroke", "black");

      // Add text labels
      enterCell.append("text")
        .attr("x", (d) => (d.x1 - d.x0) / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text((d) => d.data.title);

      // Add labels for magnitudes
      enterCell.filter((d) => d.depth === 2)
        .append("text")
        .attr("x", (d) => (d.x1 - d.x0) / 2)
        .attr("y", 60)
        .attr("text-anchor", "middle")
        .text((d) => d.data.magnitude);
    }
    