// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 550;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3 
        .select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

var chartGroup = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                .classed("chart", true);

var chosenXAxis = "poverty";

function xScale(stateData, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(stateData, d => d[chosenXAxis]),
            d3.max(stateData, d => d[chosenXAxis])
        ])
        .range([0, width]);
    
    return xLinearScale;
};

var chosenYAxis = "healthcare";

function yScale(stateData, chosenYAxis) {
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(stateData, d => d[chosenYAxis]),
            d3.max(stateData, d => d[chosenYAxis])
        ])
        .range([height, 0]);
    return yLinearScale;
};

function renderXAxes(newXScale, XAxis) {
    var bottomAxis = d3.axisBottom(newXScale)
    XAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return XAxis;
}

function renderYAxes(newYScale, YAxis) {
    var leftAxis = d3.axisLeft(newYScale)
    YAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return YAxis;
};

function renderxCircles(circlesGroup, newXScale, chosenXAxis) {
    // console.log(circlesGroup)
    circlesGroup.transition()
                .duration(1000)
                .attr("cx", d => newXScale(d[chosenXAxis]))
    return circlesGroup;
};
function renderyCircles(circlesGroup, newYScale, chosenYAxis) {
    // console.log(circlesGroup)
    circlesGroup.transition()
                .duration(1000)
                .attr("cy", d => newYScale(d[chosenYAxis]));
    
    return circlesGroup;
};
function renderxText(textGroup, newXScale, chosenXAxis) {
    // console.log(textGroup)
    textGroup.transition()
                .duration(1000)
                .attr("x", d => newXScale(d[chosenXAxis]))
    return textGroup;
};
function renderyText(textGroup, newYScale, chosenYAxis) {
    // console.log(textGroup)
    textGroup.transition()
                .duration(1000)
                .attr("y", d => newYScale(d[chosenYAxis]));
    return textGroup;
};

// function xtoolTip(toolTip, chosenXAxis) {
//     if (chosenXAxis === "poverty") {
//         var xlabel = `Poverty: ${d[chosenXAxis]}`
//     } else if (chosenXAxis === "age") {
//         var xlabel = `Average Age: ${d[chosenXAxis]}`
//     } else if (chosenXAxis === "income") {
//         var xlabel = `Median Income: ${d[chosenXAxis]}`
//     }

//     return console.log(xlabel)
// };
// function ytoolTip(toolTip, chosenYAxis) {
    
//     if (chosenYAxis === "healthcare") {
//         var ylabel = `Healthcare: ${d[chosenYAxis]} <br>`
//     } else if (chosenYAxis === "smokes") {
//         var ylabel = `Smokes: ${d[chosenYAxis]} <br>`
//     } else if (chosenYAxis === "obesity") {
//         var ylabel = `Obesity: ${d[chosenYAxis]} <br>`   
// } toolTip.html(ylabel)
// return ylabel
// };


function updatetooltip( chosenXAxis, circlesGroup){
    .on("click", function(){
    var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {
                chosenXAxis = value;
    if (chosenXAxis === "poverty") {
        var xlabel = "Poverty: "
    } else if (chosenXAxis === "age") {
        var xlabel = "Average Age: "
    } else if (chosenXAxis === "income") {
        var xlabel = "Median Income: "
    }
    console.log(xlabel)}
    //     if (chosenYAxis === "healthcare") {
    //     var ylabel = `Healthcare: `
    // } else if (chosenYAxis === "smokes") {
    //     var ylabel = `Smokes: `
    // } else if (chosenYAxis === "obesity") {
    //     var ylabel = `Obesity: `   }
    // console.log(d => d[chosenXAxis])
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        // .html(function(d) { return console.log(d[chosenXAxis])})
            // return (`${d.state} <hr> ${xlabel} ${d[chosenXAxis]}`)})
            // d.state + xlabel + d[chosenXAxis]})
    // circlesGroup.call(toolTip);
    // circlesGroup.on("mouseover", function(data) {
    // console.log(d.state)
    // })
    // // onmouseout event
    // .on("mouseout", function(data, index) {
    // toolTip.hide(data);
    // });  
    return circlesGroup 

}
// function FinalToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
    // console.log(chosenXAxis)
    // console.log(circlesGroup)
    // console.log(chosenYAxis)
    // if (chosenXAxis === "poverty") {
    //     var xlabel = `Poverty: ${d[chosenXAxis]}`
    // } else if (chosenXAxis === "age") {
    //     var xlabel = `Average Age: ${d[chosenXAxis]}`
    // } else if (chosenXAxis === "income") {
    //     var xlabel = `Median Income: ${d[chosenXAxis]}`
    // }
    // var toolTip = d3.tip()
    // .attr("class", "d3-tip")
    // .offset([80, -60])
    // .html(function(d) {
    // return (`${d.state} <hr> ${xlable}`)} )
    // circlesGroup.call(toolTip);
    // circlesGroup.on("mouseover", function(data) {
    // toolTip.show(data);
    // })
    // // onmouseout event
    // .on("mouseout", function(data, index) {
    // toolTip.hide(data);
    // });  
    // return circlesGroup 
// }
d3.csv("assets/data/data.csv").then(function(stateData) {
    // if (err) throw err;
    // console.log(stateData)
    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
        data.income = +data.income;
        data.healthcare = +data.healthcare;
        data.smokes = +data.smokes;
        data.obesity = +data.obesity;
    });

    var yLinearScale = yScale(stateData, chosenYAxis);
    var xLinearScale = xScale(stateData, chosenXAxis);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var XAxis = chartGroup.append("g")
                .classed("x-axis", true)
                .attr("transform", `translate(0, ${height})`)
                .call(bottomAxis)
    var YAxis = chartGroup.append("g")
                .classed("y-axis", true)
                .call(leftAxis)
    var circlesGroup = updatetooltip(chosenXAxis, circlesGroup);
    
    var circlesGroup = chartGroup.selectAll("circle")
                        .data(stateData)
                        .enter()
                        .append("circle")
                        .attr("cx", d => xLinearScale(d[chosenXAxis]))
                        .attr("cy", d => yLinearScale(d[chosenYAxis]))
                        .attr("r", 15)
                        .attr("fill", "blue")
                        .attr("opacity", ".5")
                        .classed("circle", true);

    var xlabelsGroup = chartGroup.append("g")
                        .attr("transform", `translate(${width / 2}, ${height + 20})`);
    var ylabelsGroup = chartGroup.append("g")
                        .classed("axis-text", true)
                        .attr("transform", "rotate(-90)")
  
    var povertyLabel = xlabelsGroup.append("text")
                        .attr("x", 0)
                        .attr("y", 20)
                        .attr("value", "poverty")
                        .classed("active", true)
                        .text("Poverty");
    var ageLabel = xlabelsGroup.append("text")
                        .attr("x", 0)
                        .attr("y", 40)
                        .attr("value", "age")
                        .classed("inactive", true)
                        .text("Age");
    var incomeLabel = xlabelsGroup.append("text")
                        .attr("x", 0)
                        .attr("y", 60)
                        .attr("value", "income")
                        .classed("inactive", true)
                        .text("Income");                     

    var healthcareLabel = ylabelsGroup.append("text")
                        .attr("y", 0 - (margin.left / 1.75))
                        .attr("x", 0 - (height / 2))
                        .attr("dy", "1em")
                        .attr("value", "healthcare")
                        .classed("active", true)
                        .text("Healthcare"
                        )

    var smokesLabel = ylabelsGroup.append("text")
                    .attr("y", 0 - (margin.left)/ 1.25)
                    .attr("x", 0 - (height / 2))
                    .attr("dy", "1em")
                    .attr("value", "smokes")
                    .classed("inactive", true)
                    .text("Smokes"
                    )

    var obesityLabel = ylabelsGroup.append("text")
                .attr("y", 0 - (margin.left))
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .attr("value", "obesity")
                .classed("inactive", true)
                .text("Obesity");


    var textGroup = chartGroup.append("g").selectAll("text")
    .data(stateData)
    .enter()
    .append("text")
    .attr("x",d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .text(d => d.abbr)
    .classed("stateText", true)
    


    xlabelsGroup.selectAll("text")
        .on("click", function(){
            var value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {
                chosenXAxis = value;
                xLinearScale = xScale(stateData, chosenXAxis);
                XAxis = renderXAxes(xLinearScale, XAxis);
                circlesGroup =renderxCircles(circlesGroup, xLinearScale, chosenXAxis);
                textGroup = renderxText(textGroup, xLinearScale, chosenXAxis)
                circlesGroup = updatetooltip(circlesGroup, chosenXAxis)

                if (chosenXAxis === "poverty") {
                    povertyLabel
                    .classed("active", true)
                    .classed("inactive", false)
                    ageLabel
                    .classed("active", false)
                    .classed("inactive", true)
                    incomeLabel
                    .classed("active", false)
                    .classed("inactive", true)
                } else if (chosenXAxis === "age") {
                    povertyLabel
                    .classed("active", false)
                    .classed("inactive", true)
                    ageLabel
                    .classed("active", true)
                    .classed("inactive", false)
                    incomeLabel
                    .classed("active", false)
                    .classed("inactive", true)
                } else if (chosenXAxis === "income"){
                    povertyLabel
                    .classed("active", false)
                    .classed("inactive", true)
                    ageLabel
                    .classed("active", false)
                    .classed("inactive", true)
                    incomeLabel
                    .classed("active", true)
                    .classed("inactive", false)
                }
            }
        })
        ylabelsGroup.selectAll("text")
        .on("click", function(){
            var value = d3.select(this).attr("value");
            if (value !== chosenYAxis) {
                chosenYAxis = value;
                yLinearScale = yScale(stateData, chosenYAxis);
                YAxis = renderYAxes(yLinearScale, YAxis);
                circlesGroup =renderyCircles(circlesGroup, yLinearScale, chosenYAxis);
                textGroup = renderyText(textGroup, yLinearScale, chosenYAxis)
                // circlesGroup = FinalToolTip(chosenXAxis, chosenYAxis, circlesGroup)

                if (chosenYAxis === "healthcare") {
                    healthcareLabel
                    .classed("active", true)
                    .classed("inactive", false)
                    smokesLabel
                    .classed("active", false)
                    .classed("inactive", true)
                    obesityLabel
                    .classed("active", false)
                    .classed("inactive", true)
                } else if (chosenYAxis === "smokes") {
                    healthcareLabel
                    .classed("active", false)
                    .classed("inactive", true)
                    smokesLabel
                    .classed("active", true)
                    .classed("inactive", false)
                    obesityLabel
                    .classed("active", false)
                    .classed("inactive", true)
                } else if (chosenYAxis === "obestiy") {
                    healthcareLabel
                    .classed("active", false)
                    .classed("inactive", true)
                    smokesLabel
                    .classed("active", false)
                    .classed("inactive", true)
                    obesityLabel
                    .classed("active", true)
                    .classed("inactive", false)
                }
            }
        })
    })