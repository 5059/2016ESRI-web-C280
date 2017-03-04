var labelRight = { normal: { label: { position: 'right' } } };

// 情感值图表
var sentiment_option = {
    title: {
        text: '酒店情感',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    grid: {
        x: 20,
        x2: 20,
        y: 60,
        y2: 20
    },
    xAxis: [
        {
            type: 'value',
            position: 'top',
            splitLine: { lineStyle: { type: 'dashed' } },
        }
    ],
    yAxis: [
        {
            type: 'category',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: []
        }
    ],
    series: [
        {
            name: '情感值',
            type: 'bar',
            stack: '总量',
            itemStyle: {
                normal: {
                    color: 'orange',
                    borderRadius: 8,
                    barBorderRadius: 5,
                    label: {
                        show: true,
                        position: 'left',
                        formatter: '{b}'
                    }
                }
            },
            data: [
            ]
        }
    ]
};


var sentiment_comparison_option = {
    title: {
        x: 'center',
        text: '',
    },
    tooltip: {
        show: false,
        trigger: 'item',
    },
    toolbox: {
        show: false
    },
    calculable: false,
    grid: {
        borderWidth: 0,
        x: 30,
        x2: 30,
        y: 50,
        y2: 30
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                interval: 0
            },
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                          '#FBC1D0', '#B5C334', '#FCCE10', '#E87C25', '#27727B'
                        ];
                        return colorList[params.dataIndex];
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}'
                    }
                }
            },
            data: []
        }
    ]
};

function createRandomItemStyle() {
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'
        }
    };
}


var wordCloud_option = {
    title: {
        text: '酒店词云'
    },
    tooltip: {
        show: true
    },
    series: [{
        name: '形容词统计',
        type: 'wordCloud',
        size: ['90%', '80%'],
        textRotation: [0, 45, 90, -45],
        textPadding: 0,
        autoSize: {
            enable: true,
            minSize: 14
        },
        data: []
    }]
};


var reviewPie_option = {
    title: {
        text: '酒店评论',
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    toolbox: {
        show: false
    },
    calculable: true,
    series: [
        {
            name: '半径模式',
            type: 'pie',
            radius: [20, 90],
            roseType: 'radius',
            width: '40%',  
            max: 40,           
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    },
                    labelLine: {
                        show: true
                    }
                }
            },
            data: [
            ]
        }
    ]
};


var mapOption = {
    backgroundColor: '#1b1b1b',
    title: {
        text: '',
        x: 'center',
        textStyle: {
            color: '#fff'
        }
    },
    dataRange: {
        min: 0,
        max: 30,
        calculable: true,
        color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
        textStyle: {
            color: '#fff'
        }
    },
    series: [
	  {
	      name: "Migration",
	      type: 'map',
	      mapType: 'china',

	      itemStyle: {
	          normal: {
	              borderColor: 'rgba(100,149,237,1)',
	              borderWidth: 0.5,
	              areaStyle: {
	                  color: '#1b1b1b'
	              }
	          }
	      },
	      data: [],
	      hoverable: false,
	      clickable: true,
	      roam: true,
	      markLine: {
	          smooth: true,
	          effect: {
	              show: true,
	              scaleSize: 1,
	              period: 30,
	              color: '#fff',
	              shadowBlur: 10
	          },
	          itemStyle: {
	              normal: {
	                  borderWidth: 1,
	                  lineStyle: {
	                      type: 'solid',
	                      shadowBlur: 10
	                  }
	              }
	          },
	          data: []
	      },
	      markPoint: {
	          symbol: 'emptyCircle',
	          symbolSize: function (v) {
	              if (v > 1000) {
	                  return 75 + v / 250;
	              }
	              else if (v <= 1000 & v > 100) {
	                  return 50 + v / 40;
	              }
	              else {
	                  return v / 2;
	              }
	          },
	          effect: {
	              show: true,
	              shadowBlur: 0
	          },
	          itemStyle: {
	              normal: {
	                  label: { show: false }
	              },
	              emphasis: {
	                  label: { position: 'top' }
	              }
	          },
	          data: [
	          ]
	      }
	  }
    ]
};


var traceMapOption = {
    timeline: {
        data: [

        ],
        label: {
            formatter: function (s) {
                return s.slice(0, 4);
            }
        },
        autoPlay: true,
        playInterval: 1000
    },
    options: [

    ]
}

//酒店最远设施分布图表
var hotelfenbu_option = {
    title : {
        text: '最远距离分布'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['距离']
    },
    toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    grid: {
        borderWidth: 0,
        x: 30,
        x2: 30,
        y: 50,
        y2: 30
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['0-300','300-500','500-800','800-1000','1000-1200','1200-1400','1400-1600','1600-1800','1800-2000']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'数量',
            type:'bar',
            data:[58,51,105,72,85,128,181,254,193],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    ]
};


//酒店周边设施最远距离一览

var aroundmaxdistanceoption = {
    title: {
        text: '酒店周边设施最远距离',
        x: 'center',
        y: 0
    },

    tooltip: {
        formatter: '({c})'
    },
    grid: {
        borderWidth: 0,
        x: 40,
        x2: 30,
        y: 10
    },
    xAxis:
    {
        axisLabel : {
            show:false
        },
        type:'category',
        data:[]
    },

    yAxis: [
    ],
    series: [
        {
            name: 'I',
            type: 'scatter',
            xAxisIndex: [0],
            yAxisIndex: [0],
            data: [
            ]
        }

    ]
};


var treandChart_option = {
    tooltip: {
        trigger: 'axis'
    },
    calculable: true,
    grid: {
        borderWidth: 0,
        x: 30,
        x2: 30,
        y: 10
    },
    dataZoom: {
        show: true,
        realtime: true,
        start: 20,
        end: 80
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: function() {
                var list = [];
                for (var i = 1; i <= 30; i++) {
                    list.push('2016-04-' + i);
                }
                return list;
            }()
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
     {
        name: '最低',
        type: 'line',
        smooth: true,
        data: function () {
            var list = [];
            for (var i = 1; i <= 30; i++) {
                list.push(Math.round(Math.random() * 100)/2);
            }
            return list;
        }(),
        itemStyle: {
            normal: {
                color: '#c23531'
            }
        }
      }
    ]
};


//酒店价格监控图标和剩余房间数
praisecontrol_option = {
    title: {

        text: ''

    },
    tooltip: {
        trigger: 'axis'
    },

    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        borderWidth: 0,
        x: 1,
        x2: 30,
        y: 50,
        y2: 30
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value',
    },
    series: [

    ]
};


var genderPie_option = {
    title: {
        text: '客源性别',
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    toolbox: {
        show: false
    },
    calculable: true,
    series: [
        {
            name: '半径模式',
            type: 'pie',
            radius: [20, 90],
            roseType: 'radius',
            width: '40%',
            max: 40,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    },
                    labelLine: {
                        show: true
                    }
                }
            },
            data: []
        }
    ]
};


var relatedChart_option = {
    title: {
        x: 'center',
        text: '',
    },
    tooltip: {
        show: false,
        trigger: 'item',
    },
    toolbox: {
        show: false
    },
    calculable: false,
    grid: {
        borderWidth: 0,
        x: 30,
        x2: 30,
        y: 50,
        y2: 30
    },
    xAxis: [
        {
            type: 'category',
            axisLabel: {
                interval: 0
            },
            data: ["夫子庙", "大屠杀纪念馆", "总统府", "鸡鸣寺", "南京博物馆"]
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                          '#FBC1D0', '#B5C334', '#FCCE10', '#E87C25', '#27727B'
                        ];
                        return colorList[params.dataIndex];
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{b}'
                    }
                }
            },
            data: [51,45,30,25,10]
        }
    ]
};
