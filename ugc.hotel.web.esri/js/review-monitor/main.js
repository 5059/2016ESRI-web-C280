(function () {

    var user = JSON.parse(sessionStorage.user);

    var location = JSON.parse(sessionStorage.location);

    //初始化页面
    (function () {
        // navbar菜单账号名
        if (user["user_name"] != null)
            document.getElementById("user_name").innerHTML = location["hotel_name"] + document.getElementById("user_name").innerHTML;
    })();

    window.reviewMonitor = function(ota) {
        // initial 页脚和页面评论
        var commentsData = requestComments(location['hotel_name'], 1, ota);
        // 如果成功返回数据
        if (commentsData != null) {
            document.getElementById("page_list").innerHTML = generateFooterHtml(location['hotel_name'], 1, commentsData["pageNum"], ota);
            document.getElementById("comment_list").innerHTML = generateCommentsHtml(commentsData["comments_info"]);
        }
    };

    /**
    * 请求酒店的评论
    * @param hotelName  String   酒店名
    * @param text       String   待查询文本
    * @param page       Int      页下标
    * @param ota        String   OTA名称
    */
    function requestComments(hotelName, page, ota) {
        var commentsData = null;
        var paramStr = "?hotel_name=" + hotelName  + "&page=" + page + "&ota=" + ota;
        $.ajax({
            type: "get",
            async: false,
            url: domain + getComments + paramStr,
            dataType: "json",
            timeout: 5000,
            success: function (result) {
                commentsData = result;
            },
            error: function (errorMsg) {
                console.log(errorMsg);
                alert("你输入的值有误,请输入完整参数或者重试");
            }
        });
        return commentsData;
    }

    /**
    * 根据页数生成切页列表
    * @param hoteName  String     酒店名
    * @param text      Stirng     查询文本
    * @param origin    int        起始页数
    * @param pageNum   int        总页数
    */
    function generateFooterHtml(hotelName, origin, pageNum, ota) {
        var pagination = "";
        for (var i = origin; i <= pageNum; i++) {
            if (i < origin + 10) {
                // 对前10页做处理
                if (i == origin) {
                    pagination += '<li class="previous"><a href="javascript:void(0);" class="fui-arrow-left"></a></li>';
                }
                pagination += "<li><a href='javascript:void(0);' onclick=\"pageIndexClick('" + hotelName + "','"+ ota + "',this)\">" + i + '</a></li>';
                if (i == pageNum) {
                    pagination += '<li class="next"><a href="javascript:void(0);" class="fui-arrow-right"></a></li>';
                }
            } else {
                for (var j = origin + 10; j <= pageNum; j += 10) {
                    if (j == origin + 10) {
                        // 开始li标签，放置一个三角形按钮
                        pagination += '<li class="pagination-dropdown dropup"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"><i class="fui-triangle-up"></i></a><ul class="dropdown-menu">';
                    }
                    if (j + 10 > pageNum) {
                        pagination += '<li><a href="javascript:void(0);">' + j + '–' + pageNum + '</a></li>';
                        // 关闭li标签
                        pagination += '</ul></li><li class="next"><a href="javascript:void(0);" class="fui-arrow-right"></a></li>';
                    } else {
                        pagination += '<li><a href="javascript:void(0);">' + j + '–' + (j + 10 - 1) + '</a></li>';
                    }
                }
                break;
            }
        }
        return pagination;
    }

    /**
    * 点击切页时执行
    * @param   hotelName    Stirng     酒店名
    */
    window.pageIndexClick = function (hotelName, ota, e) {
        console.log(e);
        var commentsData = requestComments(hotelName, e.text, ota);
        // 如果成功返回数据
        if (commentsData != null) {
            document.getElementById("comment_list").innerHTML = generateCommentsHtml(commentsData["comments_info"]);
        }
        $('html, body').animate({
            scrollTop: $("html").offset().top
        }, 500);
    }

    /**
    * 生成评论列
    * @param   comments    list     评论内容
    */
    function generateCommentsHtml(comments) {
        var commentsHtml = "";
        for (var i = 0; i < comments.length; i++) {
            commentsHtml += '<li class="list-group-item">' + comments[i][2] + '</li>';
        }
        return commentsHtml;
    }

})();