const chart = echarts.init(document.getElementById("chart"));

const series = subjects.map(subject => ({
    name: subject.name,
    type: "line",
    smooth: true,
    symbol: "none",

    lineStyle: {
        width: 3,
        color: subject.color
    },

    areaStyle: {
        color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
                {
                    offset: 0,
                    color: subject.color + "66"
                },
                {
                    offset: 1,
                    color: subject.color + "00"
                }
            ]
        )
    },

    data: subject.data
}));

const option = {

    backgroundColor: "#0d1117",

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

    series
};

chart.setOption(option);
