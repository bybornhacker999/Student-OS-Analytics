const chart = echarts.init(document.getElementById("chart"));

function buildSeries(subjects){

    return subjects.map(subject=>({

        name:subject.name,

        type:"line",

        smooth:true,

        symbol:"none",

        color:subject.color,

        lineStyle:{
            width:3
        },

        areaStyle:{
            color:new echarts.graphic.LinearGradient(
                0,0,0,1,
                [
                    {
                        offset:0,
                        color:subject.color+"66"
                    },
                    {
                        offset:1,
                        color:subject.color+"00"
                    }
                ]
            )
        },

        data:subject.data

    }));

}

function draw(view){

    const current=datasets[view];

    chart.setOption({

        backgroundColor:"#0d1117",

        tooltip:{
            trigger:"axis"
        },

        legend:{
            textStyle:{
                color:"#fff"
            }
        },

        xAxis:{
            type:"category",
            boundaryGap:false,
            data:current.labels,
            axisLabel:{color:"#aaa"},
            axisLine:{lineStyle:{color:"#444"}}
        },

        yAxis:{
            type:"value",
            min:0,
            max:100,
            axisLabel:{color:"#aaa"},
            axisLine:{lineStyle:{color:"#444"}},
            splitLine:{lineStyle:{color:"#222"}}
        },

        grid:{
            left:"5%",
            right:"5%",
            top:"8%",
            bottom:"8%"
        },

        series:buildSeries(current.subjects)

    });

}

draw("day");

const buttons=document.querySelectorAll(".time-selector button");

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        buttons.forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        draw(button.innerText.toLowerCase());

    });

});

window.addEventListener("resize",()=>chart.resize());
