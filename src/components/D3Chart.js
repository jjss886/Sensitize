import * as d3 from "d3";

// eslint-disable-next-line
const testData = [20, 12, 16, 25, 20];
const ageData = "https://udemy-react-d3.firebaseio.com/ages.json";
const tallMen = "https://udemy-react-d3.firebaseio.com/tallest_men.json";

class D3Chart {
  constructor(element, chart) {
    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    let input = chart === "Ages" ? ageData : tallMen,
      heightAttr = input.includes("ages") ? "age" : "height";
    console.log("Test 1 -", input);

    d3.json(input).then(resp => {
      console.log("Test 2 -", resp);

      const rects = svg.selectAll("rect").data(resp);

      rects
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 100)
        .attr("y", 50)
        .attr("width", 50)
        .attr("height", d => d[heightAttr] / 2)
        .attr("fill", (d, i) => (i % 2 === 0 ? "red" : "blue"));
    });
  }
}

export default D3Chart;
