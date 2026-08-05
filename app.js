const chart = echarts.init(document.getElementById("chart"));

const SUBJECTS = [
    "Physics",
    "Chemistry",
    "HigherMath",
    "Biology",
    "Bangla",
    "English"
];

function buildSeries(labels, values){

    return SUBJECTS.map(subject=>({

        name:subject==="HigherMath" ? "Higher Math" : subject,

        type:"line",

        smooth:true,

        symbol:"none",

        color:subjectColors[subject],

        lineStyle:{
            width:3
        },

        areaStyle:{
            color:new echarts.graphic.LinearGradient(
                0,0,0,1,
                [
                    {
                        offset:0,
                        color:subjectColors[subject]+"66"
                    },
                    {
                        offset:1,
                        color:subjectColors[subject]+"00"
                    }
                ]
            )
        },

        data:values[subject]

    }));

}

function draw(view){

    let labels=[];
    let values={};

    SUBJECTS.forEach(s=>values[s]=[]);

    if(view==="day"){

        const today = new Date().toISOString().split("T")[0];

        const todayData=studyHistory.filter(r=>r.time.startsWith(today));

        todayData.forEach(record=>{

            labels.push(record.time.split(" ")[1]);

            SUBJECTS.forEach(subject=>{

                values[subject].push(record[subject]);

            });

        });

    }

   else{

    const now = new Date();

    let filtered = [];

    if(view==="week"){

        const start = new Date(now);

        const day = start.getDay();

        const distance = (day===6)?0:(day+1);

        start.setDate(start.getDate()-distance);

        filtered = studyHistory.filter(record=>{

            const d = new Date(record.time);

            return d>=start && d<=now;

        });

    }

    else if(view==="month"){

        const start = new Date(now);

        start.setDate(start.getDate()-29);

        filtered = studyHistory.filter(record=>{

            const d=new Date(record.time);

            return d>=start && d<=now;

        });

    }

    else{

        const start = new Date(now.getFullYear(),0,1);

        filtered = studyHistory.filter(record=>{

            const d=new Date(record.time);

            return d>=start && d<=now;

        });

    }

    const grouped={};

    filtered.forEach(record=>{

        const d=new Date(record.time);

        let key;

        if(view==="year"){

            key=d.toLocaleString("default",{month:"short"});

        }

        else{

            key=record.time.substring(5,10);

        }

        if(!grouped[key]){

            grouped[key]={};

            SUBJECTS.forEach(subject=>{

                grouped[key][subject]=0;

            });

        }

        SUBJECTS.forEach(subject=>{

            grouped[key][subject]=Math.max(

                grouped[key][subject],

                record[subject]

            );

        });

    });

    labels=Object.keys(grouped);

    labels.forEach(label=>{

        SUBJECTS.forEach(subject=>{

            values[subject].push(

                grouped[label][subject]

            );

        });

    });

}
    

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

        grid:{
            left:"5%",
            right:"5%",
            top:"8%",
            bottom:"8%"
        },

        xAxis:{
            type:"category",
            boundaryGap:false,
            data:labels,
            axisLabel:{
                color:"#aaa"
            },
            axisLine:{
                lineStyle:{
                    color:"#444"
                }
            }
        },

        yAxis:{
            type:"value",
            min:0,
            max:100,
            axisLabel:{
                color:"#aaa"
            },
            axisLine:{
                lineStyle:{
                    color:"#444"
                }
            },
            splitLine:{
                lineStyle:{
                    color:"#222"
                }
            }
        },

        series:buildSeries(labels,values)

    });

}

draw("day");

const buttons=document.querySelectorAll(".time-selector button");

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        buttons.forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        draw(button.textContent.trim().toLowerCase());

    });

});

window.addEventListener("resize",()=>chart.resize());

const subjectButton = document.getElementById("subjectButton");
const subjectMenu = document.getElementById("subjectMenu");

subjectButton.addEventListener("click", (e) => {

    e.stopPropagation();

    subjectMenu.classList.toggle("show");

});

document.addEventListener("click", () => {

    subjectMenu.classList.remove("show");

});

subjectMenu.addEventListener("click", (e) => {

    e.stopPropagation();

});
