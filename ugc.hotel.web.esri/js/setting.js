//var domain = "http://192.168.1.123:5000";
var domain = "http://localhost:5000";
//评论类型数获取
var getCommTypeNum = "/ugc.hotel/rest/v100/hotel/get/type_score/statics";
var getViewpoint = "/ugc.hotel/rest/v100/hotel/get/viewpoint";
var getAdjective = "/ugc.hotel/rest/v100/hotel/get/adjective";
var getComments = "/ugc.hotel/rest/v100/hotel/get/comments";
var getWeiboCome = "/ugc.hotel/rest/v100/weibo/get/nearby_timeline/statics";
var getArroudFacility = "/ugc.hotel/rest/v100/map/get/aroundfacilities";
var getMaxDistance = "/ugc.hotel/rest/v100/map/get/maxdistance";
var getBedpraise = "/ugc.hotel/rest/v100/map/get/hotelbedinfo";
var getWeiboTrace = "/ugc.hotel/rest/v100/weibo/get/user_trace";
var getroomnum = "/ugc.hotel/rest/v100/map/get/hotelroomnum";
var getBaseinfoUrl = "/ugc.hotel/rest/v100/hotel/get/baseinfo";
var getHotelTrace = "/ugc.hotel/rest/v100/hotel/get/user_trace";
var getViewpointTuniu = "/ugc.hotel/rest/v100/hotel/get/tuniu/viewpoint";
var checkUserUrl = "/ugc.hotel/rest/v100/hotel/get/check_user";
var getFlowToHtml = "/ugc.hotel/rest/v100/hotel/get/html/customer_to";


var serverDomain = "http://localhost:6080";
var gpUrl = '/arcgis/rest/services/GP/HexagonAnalze/GPServer/HexagonAnalyze';
var hotelUrl = "/arcgis/rest/services/NJ_Hotel/FeatureServer/1";
var sightspotUrl = "/arcgis/rest/services/NJ_Hotel/FeatureServer/0";
var kernelDensityGPUrl = '/arcgis/rest/services/GP/kernelDensityAnalysis/GPServer/kernelDensityAnalysis';
var customerFlowUrl = "/arcgis/rest/services/Customer_Flow/FeatureServer/0";
var serviceAreaGPUrl = '/arcgis/rest/services/GP/serviceArea/GPServer/serviceArea';

//(推荐)pms酒店房间获取
var getRoominfo = "/ugc.hotel/rest/v100/room/get/room_info";
var userLogin = "/ugc.hotel/rest/v100/user/login";

//（质检）依据楼层号获取酒店楼层各房间的评论状态，
var getRemarkstates = "/ugc.hotel/rest/v100/quality/floorstate";
var getRoomRemark = "/ugc.hotel/rest/v100/quality/getroomremark";
var getRemarkByPoints = "/ugc.hotel/rest/v100/quality/getRemarkByPoints";
