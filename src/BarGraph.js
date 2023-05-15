import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class BarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      highlightYear: '',
    };

    this.showBarGraph = this.showBarGraph.bind(this);
  }

  componentDidMount() {
    this.showBarGraph();
  }

  componentWillMount() {
    const { data, highlightYear } = this.props;
    this.setState({ data, highlightYear });
  }

  componentDidUpdate() {
    this.showBarGraph();
  }

  showBarGraph() {
    const { data } = this.state;
    const { highlightYear } = this.state;

    const svg = d3.select(this.refs.svg);

    // Define dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

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

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    // Add bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.year) + margin.left)
      .attr('y', (d) => y(d.value) + margin.top)
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.value))
      .style('fill', (d) => (d.year >= highlightYear ? 'red' : 'steelblue'));
  }

  render() {
    return (
      <svg ref="svg" width={350} height={250}>
        <g ref="xAxis" />
        <g ref="yAxis" />
      </svg>
    );
  }
}

BarGraph.propTypes = {
  steps: PropTypes.object,
};

BarGraph.defaultProps = {
  steps: undefined,
};

export { BarGraph };
