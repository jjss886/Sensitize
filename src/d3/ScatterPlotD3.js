import * as d3 from "d3";

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 70 };
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

class ScatterPlotD3 {
  constructor(element, data) {
    const vis = this;
    vis.data = data;

    vis.g = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.x = d3.scaleLinear().range([0, WIDTH]);
    vis.y = d3.scaleLinear().range([HEIGHT, 0]);

    vis.update();
  }

  update() {
    const vis = this;

    vis.x.domain([0, d3.max(vis.data, d => Number(d.age))]);
    vis.y.domain([0, d3.max(vis.data, d => Number(d.height))]);

    // JOIN
    const circles = vis.g.selectAll("circle").data(vis.data, d => d.name);

    // EXIT
    circles.exit().remove();

    // UPDATE
    circles.attr("cx", d => vis.x(d.age)).attr("cy", d => vis.y(d.height));

    // ENTER
    circles
      .enter()
      .append("circle")
      .attr("cx", d => vis.x(d.age))
      .attr("cy", d => vis.y(d.height))
      .attr("r", 5)
      .attr("fill", "rgba(0,152,195,0.8)");
  }
}

export default ScatterPlotD3;
