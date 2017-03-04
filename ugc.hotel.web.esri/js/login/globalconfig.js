(function() {
    window.entrypage_signin_btn_click = function () {
        var userName = $("#account").val();
        var password = $("#password").val();
        if (userName == null || userName == "" || password == null || password == "") {
            alert("账号密码不能为空");
        } else {
            $.ajax({
                url: domain + checkUserUrl + "?user_name=" + userName + "&password=" + password,
                type: 'get',
                async: true,
                success: function (json) {
                    var datajson;

                    if (typeof (json) == "object") {
                        //为对象
                        datajson = json;
                    }
                    else {
                        //将字符串转换为对象
                        datajson = JSON.parse(json);
                    }
                    if (datajson.status != 0) {
                        sessionStorage.user = JSON.stringify(datajson.data[0]['user']);
                        sessionStorage.baseinfo = JSON.stringify(datajson.data[0]['baseinfo']);
                        sessionStorage.location = JSON.stringify(datajson.data[0]['location']); 
                        window.location.href = "../html/index.html";
                        // window.navigate("../../html/index.html");
                        console.log(window.location.href);
                    } else {
                        $("#confirm-dialog_info").html("登录失败");
                        window.location.href = "#confirm-dialog";
                    }
                },
                error: function (errorMsg) {
                    $("#confirm-dialog_info").html(errorMsg);
                    window.location.href = "#confirm-dialog";
                }
            });
        }
    }

    /**
    * 请求location表信息
    * @param locationId  String   locationID
    */
    function requestLocation(locationId) {
        var locationData = null;
        var paramStr = "?location_id=" + locationId;
        $.ajax({
            type: "get",
            async: false,
            url: domain + getLocation + paramStr,
            dataType: "json",
            timeout: 5000,
            success: function (result) {
                locationData = result;
            },
            error: function (errorMsg) {
                console.log(errorMsg);
                alert("你输入的值有误,请输入完整参数或者重试");
            }
        });
        return locationData;
    }

})();








