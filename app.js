const chart = echarts.init(document.getElementById("chart"));

const option = {
    backgroundColor: "#0d1117",

    color: [
        "#2196F3", // Physics
        "#FF9800", // Chemistry
        "#B57EDC", // Higher Math
        "#FFFFFF", // Biology
        "#1B5E20", // Bangla
        "#F44336"  // English
    ],

    tooltip: {
        trigger: "axis"
    },

    legend: {
        textStyle: {
            color: "#ffffff"
        }
    },

    grid: {
        left: "5%",
        right: "5%",
        top: "8%",
        bottom: "8%"
    },

    xAxis: {
        type: "category",
        boundaryGap: false,
        data: labels,
        axisLine: {
            lineStyle: {
                color: "#444"
            }
        },
        axisLabel: {
            color: "#aaa"
        }
    },

    yAxis: {
        type: "value",
        min: 0,
        max: 100,
        axisLine: {
            lineStyle: {
                color: "#444"
            }
        },
        splitLine: {
            lineStyle: {
                color: "#222"
            }
        },
        axisLabel: {
            color: "#aaa"
        }
    },

    series: [

        {
            name: "Physics",
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: { width: 3 },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[
                    {offset:0,color:"rgba(33,150,243,0.35)"},
                    {offset:1,color:"rgba(33,150,243,0)"}
                ])
            },
            data: subjects[0].data
        },

        {
            name: "Chemistry",
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: { width: 3 },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[
                    {offset:0,color:"rgba(255,152,0,0.35)"},
                    {offset:1,color:"rgba(255,152,0,0)"}
                ])
            },
            data: subjects[1].data
        },

        {
            name: "Higher Math",
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: { width: 3 },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[
                    {offset:0,color:"rgba(181,126,220,0.35)"},
                    {offset:1,color:"rgba(181,126,220,0)"}
                ])
            },
            data: subjects[2].data
        },

        {
            name: "Biology",
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: { width: 3 },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[
                    {offset:0,color:"rgba(255,255,255,0.35)"},
                    {offset:1,color:"rgba(255,255,255,0)"}
                ])
            },
            data: subjects[3].data
        },

        {
            name: "Bangla",
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: { width: 3 },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[
                    {offset:0,color:"rgba(27,94,32,0.35)"},
                    {offset:1,color:"rgba(27,94,32,0)"}
                ])
            },
            data: subjects[4].data
        },

        {
            name: "English",
            type: "line",
            smooth: true,
            symbol: "none",
            lineStyle: { width: 3 },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0,0,0,1,[
                    {offset:0,color:"rgba(244,67,54,0.35)"},
                    {offset:1,color:"rgba(244,67,54,0)"}
                ])
            },
            data: subjects[5].data
        }

    ]
};

chart.setOption(option);

window.addEventListener("resize", function () {
    chart.resize();
});
