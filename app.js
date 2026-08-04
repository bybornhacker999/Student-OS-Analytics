

var chart = echarts.init(document.getElementById('chart'));

var option = {

backgroundColor:'#0d1117',

tooltip:{
    trigger:'axis'
},

grid:{
    left:'5%',
    right:'5%',
    top:'8%',
    bottom:'8%'
},

xAxis:{
    type:'category',
    boundaryGap:false,
    data:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    axisLine:{lineStyle:{color:'#444'}},
    axisLabel:{color:'#aaa'}
},

yAxis:{
    type:'value',
    min:0,
    max:100,
    axisLine:{lineStyle:{color:'#444'}},
    splitLine:{lineStyle:{color:'#222'}},
    axisLabel:{color:'#aaa'}
},

series:[

{
    name:'Physics',
    type:'line',
    smooth:true,
    symbol:'none',

    lineStyle:{
        width:4,
        color:'#4FC3F7'
    },

    areaStyle:{
        color:new echarts.graphic.LinearGradient(0,0,0,1,[
            {
                offset:0,
                color:'rgba(79,195,247,0.25)'
            },
            {
                offset:1,
                color:'rgba(79,195,247,0)'
            }
        ])
    },

    data:[20,28,35,45,60,74,82]
},

{
    name:'Chemistry',
    type:'line',
    smooth:true,
    data:[15,22,30,38,46,61,70]
},

{
    name:'Math',
    type:'line',
    smooth:true,
    data:[25,32,40,53,67,73,90]
}

]

};

chart.setOption(option);
