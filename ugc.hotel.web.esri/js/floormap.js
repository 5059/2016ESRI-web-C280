require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/support/LabelClass",
  "esri/symbols/TextSymbol",
  "esri/layers/GraphicsLayer",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/Graphic",
  "esri/symbols/SimpleFillSymbol",
  "dojo/dom",
  "dojo/on",
  "dojo/domReady!"
], function (Map, MapView, FeatureLayer, LabelClass,TextSymbol, GraphicsLayer, QueryTask, Query, Graphic, SimpleFillSymbol, dom, on) {
    var user = JSON.parse(sessionStorage.user);

    var location = JSON.parse(sessionStorage.location);

    var mapindex = 0;
    var map = new Map();
    var view = new MapView({container: "floormap",map: map,extent: { xmin: 200,ymin: -2400,xmax: 5000,ymax: -900,spatialReference: 102100}});
    //当前的楼层号
    var floornum;
    //当前加载的 地图url
    var mapurl;
    //显示要素的图层
    var resultsLyr = new GraphicsLayer({maxScale:1000,minScale : 3000000});
    //加载时的查询任务
    var queryTask,query;
    //加载的房间评论状态的填充颜色
    var grayfillSymbol = new SimpleFillSymbol({ color: [215, 215, 220], outline: { color: [255, 255, 200, 0.9], width: 1 } });
    var greenfillSymbol = new SimpleFillSymbol({ color: [26,188,156], outline: { color: [255, 255, 255], width: 1 } });
    var yellowfillSymbol = new SimpleFillSymbol({ color: [255,216,0], outline: { color: [255, 255, 255], width: 1 } });
    var redfillSymbol = new SimpleFillSymbol({ color: [255, 0, 0], outline: { color: [255, 255, 255], width: 1 } });
    var statestime = " ";
    //点击时的查询任务
    var roomQueryTask, roomQuery,roomidQuery;
    var statesLabelClass;

    (function(){
        // navbar菜单账号名
        if (user["user_name"] != null)
            document.getElementById("user_name").innerHTML = location["hotel_name"] + document.getElementById("user_name").innerHTML;
    })();

    refreshmap();

    function upmap() {
        if (mapindex < 8) {
            mapindex += 1;
            refreshmap();
        } else { };
    };

    function downmap() {
        if (mapindex >0) {
            mapindex -= 1;
            refreshmap();
        } else { };
    };

    //重置地图 事件
    function refreshmap() {
        floornum = mapindex + 4;
        mapurl = "http://localhost:6080/arcgis/rest/services/MyFloorMaps/MapServer/" + mapindex;
        queryTask = new QueryTask({ url: mapurl });
        query = new Query({ returnGeometry: true, outFields: ["*"], where: "1=1" });
        map.removeAll();
        $("#loadinger").show();
        featureLayer0 = new FeatureLayer({ url: "http://localhost:6080/arcgis/rest/services/MyFloorMaps/MapServer/9" });
        map.add(featureLayer0);
        featureLayer = new FeatureLayer({ url: mapurl, maxScale: 1000, minScale: 3000000 });
        statesLabelClass = new LabelClass({
            labelExpressionInfo: { value: "{roomnum}" },
            symbol: new TextSymbol({
                color: "black",
                haloSize: 1,
                haloColor: "white"
            })
        });
        featureLayer.labelsVisible = true;
        featureLayer.labelingInfo = [statesLabelClass];
        map.add(featureLayer);
        dom.byId("floornum").innerText = floornum + "F";
        //获取到楼层各房间状态
        var paramStr = "?floornum=" + floornum + "&time=" + statestime;
        $.ajax({
            type: "get",
            async: false, // 异步
            url: domain + getRemarkstates + paramStr,
            dataType: "json",
            timeout: 5000,
            success: function (result) {
                if (result.length > 0) {
                    //添加列表
                    $("#roomlist").empty();
                    for (var r = 0; r < result.length; r++) {
                        var roomTypeBtnClass;
                        if (result[r][1][0].length > 0) {
                            roomTypeBtnClass = "button-danger";
                        } else if (result[r][1][1].length > 0) {
                            roomTypeBtnClass = "button-warning";
                        } else if (result[r][1][2].length > 0) {
                            roomTypeBtnClass = "button-default";
                        } else {
                            roomTypeBtnClass = "button-require";
                        }
                        var listdiv = document.createElement("div");
                        listdiv.className = 'right-list-div';

                        var roomnumA = document.createElement("a");
                        roomnumA.className = 'list-roomnum';
                        roomnumA.innerText = result[r][2][0] + "号房";

                        var buttonLabelA = document.createElement("a");
                        buttonLabelA.className = roomTypeBtnClass;
                        var roomTypeName = "";
                        switch (result[r][2][2]) {
                            case 1: roomTypeName = "普通单人"; break;
                            case 2: roomTypeName = "普通双人"; break;
                            case 3: roomTypeName = "豪华单人"; break;
                            case 4: roomTypeName = "豪华双人"; break;
                            case 5: roomTypeName = "贵宾套房"; break;
                            case 6: roomTypeName = "总统套房"; break;
                            default: alert(result[r][2][2]); break;
                        }
                        buttonLabelA.innerText = roomTypeName;
                        listdiv.appendChild( roomnumA );
                        listdiv.appendChild ( buttonLabelA);
                        $("#roomlist").append(listdiv);
                    }

                    //设置房间颜色
                    queryTask.execute(query)
                        .then(function (response) {
                            $("#loadinger").hide();
                            //console.log(response.features);
                            //console.log(result);
                            for (var i = 0; i < response.features.length; i++) {
                                var fillSymbol = new SimpleFillSymbol();
                                var roomid = response.features[i].attributes.roomid;
                                //循环 属性数据库结果集，判断要素颜色
                                for (var j = 0; j < result.length; j++) {
                                    if (result[j][0] == roomid) {
                                        if (result[j][1][0].length > 0) {
                                            fillSymbol = redfillSymbol;
                                        } else if (result[j][1][1].length > 0) {
                                            fillSymbol = yellowfillSymbol;
                                        } else if (result[j][1][2].length > 0) {
                                            fillSymbol = greenfillSymbol;
                                        } else {
                                            fillSymbol = grayfillSymbol;
                                        }
                                    }
                                   
                                }
                                var polygon = response.features[i].geometry;
                                var attributes = response.features[i].attributes;
                                var polygonGraphic = new Graphic({
                                    attributes: attributes,
                                    geometry: polygon,
                                    symbol: fillSymbol
                                });
                                view.graphics.add(polygonGraphic);
                            }
                        })
                        .otherwise(function (err) {
                            console.error("Promise rejected: ", err.message)
                        });
                    //添加 option
                    $("#selectPoint").empty();
                    for (var i= 0; i< result.length; i++) {
                        if (result[i][1][0].length != 0) {
                            for (var j = 0; j < result[i][1][0].length; j++) {
                                point = result[i][1][0][j];
                                if ($("#selectPoint option[value='" + point + "']").length == 0) {
                                    $("#selectPoint").append("<option value='" + point + "'>" + point);
                                }
                            }
                        }
                    }//endfor


                }
            },
            error: function (errorMsg) {
                console.log(errorMsg);
            }
        });
    };

    on(dom.byId("upmap"), "click", upmap);
    on(dom.byId("downmap"), "click", downmap);
    on(dom.byId("refreshmap"), "click", refreshmap);
    
    view.then(function () {
        on(view, "click", executeRoomQueryTask);
    });
    //点击地图后的查询任务
    function executeRoomQueryTask(event) {
        roomQueryTask = new QueryTask({ url: mapurl });
        roomQuery = new Query({ returnGeometry: false, outFields: ["*"] });
        roomQuery.geometry = event.mapPoint;
        roomQueryTask.execute(roomQuery)
            .then(function (response) {
                if (response.features != []) {
                    roomNum = response.features[0].attributes['roomnum'];
                    roomidQuery = response.features[0].attributes['roomid'];
                    var paramStr = "?roomid="+roomidQuery;
                    $.ajax({
                        type: "get",
                        async: false, // 异步
                        url: domain + getRoomRemark + paramStr,
                        dataType: "json",
                        timeout: 5000,
                        success: function (result) {
                            dom.byId("remarktitle").innerText = roomNum + "号房";
                            $("#remarkList").empty()
                            for (var i = 0; i < result.length; i++) {
                                var txt = document.createElement("li");
                                txt.innerHTML = result[i];
                                $("#remarkList").append(txt);
                            }
                            $('#myModal').modal('show');
                        },
                        error: function (errorMsg) {
                            console.log(errorMsg);
                        }
                    });
                }

            })
            .otherwise(function (err) {
                console.error("Promise rejected: ", err.message)
            })
    }

    //依据实体选择 获取remark
    on(dom.byId("queryPointBtn"), "click", getPointRemark);
    //搜索 点击 事件
    function getPointRemark() {
        var list = $("#selectPoint").val();
        var paramStr = "?points=" + list + "&floornum=" + floornum;
        console.log(paramStr);
        $.ajax({
            type: "get",
            async: false, // 异步
            url: domain + getRemarkByPoints + paramStr,
            dataType: "json",
            timeout: 5000,
            success: function (result) {
                console.log(result);

                dom.byId("remarktitle").innerText = list;
                $("#remarkList").empty()
                for (var i = 0; i < result.length; i++) {
                    var txt = document.createElement("li");
                    txt.innerHTML = result[i][0] +"<br>"+result[i][1];
                    $("#remarkList").append(txt);
                }
                $('#myModal').modal('show');

            },
            error: function (errorMsg) {
                console.log(errorMsg);
            }
        });
    }

});