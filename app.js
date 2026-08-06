// ==============================
// Student OS Analytics v2
// Part 1
// ==============================

const chart = echarts.init(document.getElementById("chart"));

const SUBJECTS = [
    "Physics",
    "Chemistry",
    "HigherMath",
    "Biology",
    "Bangla",
    "English"
];

const selectedSubjects = new Set(SUBJECTS);

const subjectButton = document.getElementById("subjectButton");
const subjectMenu = document.getElementById("subjectMenu");
let dropdownArrow = document.getElementById("dropdownArrow");

const subjectColors = {

    Physics:"#2196F3",

    Chemistry:"#FF9800",

    HigherMath:"#B57EDC",

    Biology:"#FFFFFF",

    Bangla:"#1B5E20",

    English:"#F44336"

};

let currentView = "day";


// =====================================
// Dropdown
// =====================================

subjectButton.addEventListener("click",(e)=>{

    e.stopPropagation();

    subjectMenu.classList.toggle("show");

    dropdownArrow.innerHTML = subjectMenu.classList.contains("show")
        ? "▲"
        : "▼";

});

document.addEventListener("click",()=>{

    subjectMenu.classList.remove("show");

    dropdownArrow.innerHTML="▼";

});

subjectMenu.addEventListener("click",(e)=>{

    e.stopPropagation();

});


// =====================================
// Subject Pills
// =====================================

document.querySelectorAll(".subject-pill").forEach(pill=>{

    pill.addEventListener("click",()=>{

        const subject=pill.dataset.subject;

        if(selectedSubjects.has(subject)){

            if(selectedSubjects.size===1){

                return;

            }

            selectedSubjects.delete(subject);

            pill.classList.remove("active");

        }

        else{

            selectedSubjects.add(subject);

            pill.classList.add("active");

        }

        subjectMenu.classList.remove("show");

        dropdownArrow.innerHTML="▼";

       function updateSubjectButton(){

    subjectButton.innerHTML =
        `Subjects ${selectedSubjects.size===SUBJECTS.length ? "" : "(" + selectedSubjects.size + ")"} <span id="dropdownArrow">▼</span>`;

    dropdownArrow = document.getElementById("dropdownArrow");

}

        draw(currentView);

    });

});


function updateSubjectButton(){

    if(selectedSubjects.size===SUBJECTS.length){

        subjectButton.innerHTML=
        `Subjects <span id="dropdownArrow">▼</span>`;

    }

    else{

        subjectButton.innerHTML=
        `Subjects (${selectedSubjects.size}) <span id="dropdownArrow">▼</span>`;

    }

}


// =====================================
// Time Selector
// =====================================

document.querySelectorAll(".time-selector button").forEach(button=>{

    button.addEventListener("click",()=>{

        document
        .querySelectorAll(".time-selector button")
        .forEach(b=>b.classList.remove("active"));

        button.classList.add("active");

        currentView=button.dataset.view;

        draw(currentView);

    });

});


// =====================================
// Helper
// =====================================

function createSeries(labels,values){

    return SUBJECTS

        .filter(subject=>selectedSubjects.has(subject))

        .map(subject=>({

            name:subject==="HigherMath"
                ? "Higher Math"
                : subject,

            type:"line",

            smooth:true,

            symbol:"none",

            color:subjectColors[subject],

            lineStyle:{
                width:3
            },

            areaStyle:{
                color:new echarts.graphic.LinearGradient(

                    0,
                    0,
                    0,
                    1,

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

// =====================================
// Draw Chart
// =====================================

function draw(view){

    let labels=[];

    const values={};

    SUBJECTS.forEach(subject=>{

        values[subject]=[];

    });

    const now=new Date();

    let filtered=[];

    if(view==="day"){

        const today=now.toISOString().split("T")[0];

        filtered=studyHistory.filter(record=>

            record.time.startsWith(today)

        );

    }

    else if(view==="week"){

        const start=new Date(now);

        const day=start.getDay();

        const distance=(day===6)?0:(day+1);

        start.setHours(0,0,0,0);

        start.setDate(start.getDate()-distance);

        filtered=studyHistory.filter(record=>{

            const d=new Date(record.time);

            return d>=start && d<=now;

        });

    }

    else if(view==="month"){

        const start=new Date(now);

        start.setHours(0,0,0,0);

        start.setDate(start.getDate()-29);

        filtered=studyHistory.filter(record=>{

            const d=new Date(record.time);

            return d>=start && d<=now;

        });

    }

    else{

        const start=new Date(

            now.getFullYear(),

            0,

            1

        );

        filtered=studyHistory.filter(record=>{

            const d=new Date(record.time);

            return d>=start && d<=now;

        });

    }


    // ==========================
    // Group Data
    // ==========================

    const grouped={};

    filtered.forEach(record=>{

        const date=new Date(record.time);

        let key;

        if(view==="day"){

            key=record.time.split(" ")[1];

        }

        else if(view==="year"){

            key=date.toLocaleString(

                "default",

                {

                    month:"short"

                }

            );

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

                Number(record[subject]||0)

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


    // ==========================
    // Draw Chart
    // ==========================

    chart.setOption({

        backgroundColor:"transparent",

        animationDuration:600,

        tooltip:{

            trigger:"axis"

        },

        legend:{

            show:false

        },

        grid:{

            left:"5%",

            right:"5%",

            top:"7%",

            bottom:"8%"

        },

        xAxis:{

            type:"category",

            boundaryGap:false,

            data:labels,

            axisLabel:{

                color:"#AAB3C5"

            },

            axisLine:{

                lineStyle:{

                    color:"#313A48"

                }

            }

        },

        yAxis:{

            type:"value",

            min:0,

            max:100,

            axisLabel:{

                color:"#AAB3C5"

            },

            axisLine:{

                lineStyle:{

                    color:"#313A48"

                }

            },

            splitLine:{

                lineStyle:{

                    color:"#202734"

                }

            }

        },

        series:createSeries(

            labels,

            values

        )

    });

}

// =====================================
// Initial Render
// =====================================

updateSubjectButton();

draw(currentView);


// =====================================
// Responsive Chart
// =====================================

window.addEventListener("resize",()=>{

    chart.resize();

});


// =====================================
// Empty State
// =====================================

chart.on("finished",()=>{

    const option=chart.getOption();

    if(!option.series || option.series.length===0){

        chart.setOption({

            graphic:[

                {

                    type:"text",

                    left:"center",

                    top:"middle",

                    style:{

                        text:"No study data available.",

                        fill:"#7A869A",

                        font:"18px Inter"

                    }

                }

            ]

        });

    }

    else{

        chart.setOption({

            graphic:[]

        });

    }

});


// =====================================
// Dropdown Auto Close
// =====================================

document.querySelectorAll(".subject-pill").forEach(pill=>{

    pill.addEventListener("click",()=>{

        subjectMenu.classList.remove("show");

        dropdownArrow.innerHTML="▼";

    });

});


// =====================================
// Keyboard Support
// =====================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        subjectMenu.classList.remove("show");

        dropdownArrow.innerHTML="▼";

    }

});
