import * as d3 from "d3";

const data = [20, 12, 16, 25, 20];
const ageData = "https://udemy-react-d3.firebaseio.com/ages.json";
const tallMen = "https://udemy-react-d3.firebaseio.com/tallest_men.json";

class D3Chart {
  constructor(element) {
    console.log("1 --", d3.select(element));

    const svg = d3
      .select(element)
      .append("svg")
      .attr("width", 500)
      .attr("height", 500);

    d3.json(tallMen).then(resp => {
      console.log("GO GO GO -", resp);

      const rects = svg.selectAll("rect").data(resp);

      rects
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 100)
        .attr("y", 50)
        .attr("width", 50)
        .attr("height", d => d.height / 2)
        .attr("fill", (d, i) => (i % 2 === 0 ? "red" : "blue"));
    });
  }
}

export default D3Chart;
