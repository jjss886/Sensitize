import * as d3 from "d3";

const tallMen = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
const tallLadies = "https://udemy-react-d3.firebaseio.com/tallest_women.json";
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
  constructor(element) {
    const vis = this;

    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("text-anchor", "middle")
      .text("The world's tallest men");

    vis.svg
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Height in CM")
      .attr("transform", `rotate(-90)`);

    vis.xAxisGroup = vis.svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append("g");

    Promise.all([d3.json(tallMen), d3.json(tallLadies)]).then(dataSets => {
      const [men, ladies] = dataSets;
      let flag = true;

      vis.data = men;
      vis.update();

      d3.interval(() => {
        vis.data = flag ? men : ladies;
        vis.update();
        flag = !flag;
      }, 1000);
    });
  }

  update() {
    const vis = this;
    const y = d3
      .scaleLinear()
      .domain([
        d3.min(vis.data, x => x.height) * 0.95,
        d3.max(vis.data, x => x.height)
      ])
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(vis.data.map(x => x.name))
      .range([0, WIDTH])
      .padding(0.4);

    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup
      .transition()
      .duration(500)
      .call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup
      .transition()
      .duration(500)
      .call(yAxisCall);

    // DATA JOIN
    const rects = vis.svg.selectAll("rect").data(vis.data);

    // EXIT
    rects
      .exit()
      .transition()
      .duration(500)
      .attr("height", 0)
      .attr("y", HEIGHT)
      .attr("fill", "green")
      .remove();

    // UPDATE
    rects
      .transition()
      .duration(500)
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.height))
      .attr("width", x.bandwidth)
      .attr("height", d => HEIGHT - y(d.height));

    // ENTER
    rects
      .enter()
      .append("rect")
      .attr("x", d => x(d.name))
      .attr("width", x.bandwidth)
      .attr("fill", (d, i) => (i % 2 === 0 ? "red" : "blue"))
      .attr("y", HEIGHT)
      .transition()
      .duration(500)
      .attr("height", d => HEIGHT - y(d.height))
      .attr("y", d => y(d.height));

    console.log("TESTING --", rects);
  }
}

export default D3Chart;
