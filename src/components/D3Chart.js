import * as d3 from "d3";

// eslint-disable-next-line
const testData = [20, 12, 16, 25, 20];
const ageData = "https://udemy-react-d3.firebaseio.com/ages.json";
const tallMen = "https://udemy-react-d3.firebaseio.com/tallest_men.json";
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 50, RIGHT: 10 };
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
  constructor(element, chart) {
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    let input = chart === "Ages" ? ageData : tallMen,
      heightAttr = input.includes("ages") ? "age" : "height";

    d3.json(input).then(resp => {
      const y = d3
        .scaleLinear()
        .domain([
          d3.min(resp, x => x.height) * 0.95,
          d3.max(resp, x => x.height)
        ])
        .range([HEIGHT, 0]);

      const x = d3
        .scaleBand()
        .domain(resp.map(x => x.name))
        .range([0, WIDTH])
        .padding(0.4);

      const xAxisCall = d3.axisBottom(x);
      svg
        .append("g")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxisCall);

      const yAxisCall = d3.axisLeft(y);
      svg.append("g").call(yAxisCall);

      const rects = svg.selectAll("rect").data(resp);

      rects
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 100)
        .attr("y", d => y(d[heightAttr]))
        .attr("width", x.bandwidth)
        .attr("height", d => HEIGHT - y(d[heightAttr]))
        .attr("fill", (d, i) => (i % 2 === 0 ? "red" : "blue"));
    });
  }
}

export default D3Chart;
