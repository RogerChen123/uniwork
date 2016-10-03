/**
 * Created by yilong on 2016/2/20.
 */
var myScroll,
    pullDownEl, pullDownOffset, firstId,debug;

function pullDownAction() {
    setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        var action = "queryMessages";
        $.ajax(
            {
                type: 'post',
                url: url,
                dataType: "json",
                async: false,
                data: {
                    action: action,
                    uid: uid,
                    sessionToken: sessionToken,
                    lastId: lastId,
                    num: num


                },
                success: function (data) {
                    console.log(data);
                    num = data.length;
                    var lastNum = data[num - 1];
                    var firstNum = data[num - 30];
                    firstId = firstNum.id;
                    lastId = lastNum.id;
                    console.log(lastId);
                    console.log(firstId);


                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i]);
                        var id = data[i].id;
                        var createDate = data[i].createDate;
                        var imgURL = data[i].imgURL;
                        var linkURL = data[i].linkURL;
                        var title = data[i].title;
                        var source = data[i].source;
                        var type = data[i].type;
                        var detail = data[i].detail;

                        //图文信息
                        if (type == "media" && source == "receive") {
                            var str = "<ul id=item" + id + " class='ui-list systemMedia'>" +
                                " <li> " +
                                "<div class='time-center'>" + createDate + "</div> </li>" +
                                " <li> <div class='ui-list-info'>" +
                                " <div class='message-box'>" +
                                "<div class='p5'>" +
                                "<div class='message_content'> <div class='content-box p10'> " +
                                "<h2>" + title + "</h2> " +
                                "<div class='time-left '>" + createDate + "</div>" +
                                "<div class='pic'>" +
                                "<a href='" + linkURL + "'>" + "<img src='" + imgURL + "' height='100%' width='100%' alt='pic'>" +
                                "</a></div>" +
                                " <p>" + detail + "</p>" +
                                " <ul class='ui-list ui-list-link '>" +
                                "<li data-herf='#'>" +
                                "<div class='ui-list-info'>" +
                                "<h4 class='ui-nowrap'>" +
                                "<a class='box' href='" + linkURL + "'>阅读全文</a>" +
                                "</h4> </div> </li> </ul> </div> </div> </div> </div> </div> </li> </ul>";
                            $("#thelist").prepend(str);

                        }
                        if (type == "text" && source == "submit") {

                            var str = "<ul id=item" + id + " class='ui-list submitText'>" +
                                " <li> " +
                                "<div class='time-center'>" + createDate + "</div> </li>" +
                                "<li><div class='ui-list-info pl40'>" +
                                "<div class='message_content1'>" +
                                "<div class='messageleft'>" + detail + "</div>" +
                                "</div>" +
                                "</div><div class='ui-avatar'><span class='user_head'></span> </div> </li> </ul>";

                            $("#thelist").prepend(str);


                        }
                        if (type == "text" && source == "receive") {

                            var str = "<ul id=item" + id + " class='ui-list systemText'>" +
                                " <li> " +
                                "<div class='time-center'>" + createDate + "</div> " +
                                "</li>" +
                                " <li>" +
                                " <div class='ui-avatar'>" +
                                " <span class='system_head'></span>" +
                                " </div>" +
                                " <div class='ui-list-info pr40'>" +
                                " <div class='message_content'>" +
                                " <div  class='message'>" + detail + "</div> " +
                                "</div> </div> </li> </ul>";
                            $("#thelist").prepend(str);


                        }


                    }


                },
                error: function (xhr, type) {
                    var error = "数据不能加载！"
                    tips(error);
                }
            }
        );
        var str1 = "#item" + firstId;
        console.log(firstId);
        myScroll.scrollToElement("#item" + firstId, 100);
        myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}
function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        checkDOMChanges: true,
        useTransition: true,
        topOffset: pullDownOffset,
        fixedScrollbar: true,
        vScroll: true,
        vScrollbar: true,

        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                this.minScrollY = -pullDownOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                if (lastId == "1") {
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = '没有更多消息了！';
                    pullDownAction();
                    return false;
                }
                pullDownAction();	// Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function () {
        document.getElementById('wrapper').style.left = '0';
    }, 800);
}

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(loaded, 20);
}, false);
function queryMsg() {
    var action = "queryMessages";

    $.ajax(
        {
            type: 'post',
            url: url,
            dataType: "json",
            async: false,
            data: {
                action: action,
                uid: uid,
                sessionToken: sessionToken,
                lastId: lastId,
                num: num,


            },
            success: function (data) {
                console.log(data);
                num = data.length;
                /*if (num == 0) {
                    var tipsheight = $("#wrapper").height();
                    console.log(tipsheight);
                    var nullmessage = "<li style='background:#fff;" + "height:" + tipsheight + "px;width: 100%; line-height:" + tipsheight + "px; text-align: center;'>暂无消息！</li>"

                    $("#thelist").html(nullmessage);

                    $("#sendBtn").click(function () {

                        var action = "sendMessage";
                        var sendContent = $("#sendContent").val();
                        $.ajax(
                            {
                                type: 'post',
                                url: url,
                                dataType: "json",
                                async: false,
                                data: {
                                    action: action,
                                    detail: sendContent,
                                    uid: uid,
                                    sessionToken: sessionToken,

                                },
                                success: function (data) {
                                    console.log(data);
                                    var res = data.res;
                                    if (res == "success") {
                                        var mydate = new Date();
                                        var vYear = mydate.getFullYear();
                                        var vMon = mydate.getMonth() + 1;
                                        var vDay = mydate.getDate();
                                        var h = mydate.getHours();
                                        var m = mydate.getMinutes();
                                        var se = mydate.getSeconds();
                                        var s = vYear + "-" + (vMon < 10 ? "0" + vMon : vMon) + "-" + (vDay < 10 ? "0" + vDay : vDay) + " " + (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (se < 10 ? "0" + se : se);

                                        var str = "<ul class='ui-list submitText'>" +
                                            " <li> " +
                                            "<div class='time-center'>" + s + "</div> </li>" +
                                            "<li><div class='ui-list-info pl40'>" +
                                            "<div class='message_content1'>" +
                                            "<div class='messageleft'>" + sendContent + "</div>" +
                                            "</div>" +
                                            "</div><div class='ui-avatar'><span class='user_head'></span> </div> </li> </ul>";


                                        $("#sendContent").val("");
                                        $("#thelist").html(str);


                                    } else {

                                        tips("发送消息失败！")

                                    }


                                },
                                error: function (xhr, type) {
                                    var error = "数据不能加载！";
                                    tips(error);
                                }
                            }
                        );

                    });
                } else {*/
                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i]);
                        var id = data[i].id;
                        var createDate = data[i].createDate;
                        var imgURL = data[i].imgURL;
                        var linkURL = data[i].linkURL;
                        var title = data[i].title;
                        var source = data[i].source;
                        var type = data[i].type;
                        var detail = data[i].detail;
                        //图文信息
                        if (type == "media" && source == "receive") {
                            var str = "<ul id=item" + id + " class='ui-list systemMedia'>" +
                                " <li> " +
                                "<div class='time-center'>" + createDate + "</div> </li>" +
                                " <li> <div class='ui-list-info'>" +
                                " <div class='message-box'>" +
                                "<div class='p5'>" +
                                "<div class='message_content'> <div class='content-box p10'> " +
                                "<h2>" + title + "</h2> " +
                                "<div class='time-left '>" + createDate + "</div>" +
                                "<div class='pic'>" +
                                "<a href='" + linkURL + "'>" + "<img src='" + imgURL + "' height='100%' width='100%' alt='pic'>" +
                                "</a></div>" +
                                " <p>" + detail + "</p>" +
                                " <ul class='ui-list ui-list-link '>" +
                                "<li data-herf='#'>" +
                                "<div class='ui-list-info'>" +
                                "<h4 class='ui-nowrap'>" +
                                "<a class='box' href='" + linkURL + "'>阅读全文</a>" +
                                "</h4> </div> </li> </ul> </div> </div> </div> </div> </div> </li> </ul>";
                            $("#thelist").prepend(str);

                        }
                        if (type == "text" && source == "submit") {

                            var str = "<ul id=item" + id + " class='ui-list submitText'>" +
                                " <li> " +
                                "<div class='time-center'>" + createDate + "</div> </li>" +
                                "<li><div class='ui-list-info pl40'>" +
                                "<div class='message_content1'>" +
                                "<div class='messageleft'>" + detail + "</div>" +
                                "</div>" +
                                "</div><div class='ui-avatar'><span class='user_head'></span> </div> </li> </ul>";

                            $("#thelist").prepend(str);


                        }
                        if (type == "text" && source == "receive") {

                            var str = "<ul id=item" + id + " class='ui-list systemText'>" +
                                " <li> " +
                                "<div class='time-center'>" + createDate + "</div> " +
                                "</li>" +
                                " <li>" +
                                " <div class='ui-avatar'>" +
                                " <span class='system_head'></span>" +
                                " </div>" +
                                " <div class='ui-list-info pr40'>" +
                                " <div class='message_content'>" +
                                " <div  class='message'>" + detail + "</div> " +
                                "</div> </div> </li> </ul>";
                            $("#thelist").prepend(str);

                        }

                    }
             /*   }*/


            },
            error: function (xhr, type) {
                var error = "数据不能加载！";
                tips(error);
            }

        }
    );

}
queryMsg();


$("#sendBtn").click(function () {

    var action = "sendMessage";
    var sendContent = $("#sendContent").val();
    $.ajax(
        {
            type: 'post',
            url: url,
            dataType: "json",
            async: false,
            data: {
                action: action,
                detail: sendContent,
                uid: uid,
                sessionToken: sessionToken,

            },
            success: function (data) {
                console.log(data);
                var res = data.res;
                if (res == "success") {
                    var mydate = new Date();
                    var vYear = mydate.getFullYear();
                    var vMon = mydate.getMonth() + 1;
                    var vDay = mydate.getDate();
                    var h = mydate.getHours();
                    var m = mydate.getMinutes();
                    var se = mydate.getSeconds();
                    var s = vYear + "-" + (vMon < 10 ? "0" + vMon : vMon) + "-" + (vDay < 10 ? "0" + vDay : vDay) + " " + (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (se < 10 ? "0" + se : se);

                    var str = "<ul class='ui-list submitText'>" +
                        " <li> " +
                        "<div class='time-center'>" + s + "</div> </li>" +
                        "<li><div class='ui-list-info pl40'>" +
                        "<div class='message_content1'>" +
                        "<div class='messageleft'>" + sendContent + "</div>" +
                        "</div>" +
                        "</div><div class='ui-avatar'><span class='user_head'></span> </div> </li> </ul>";


                    $("#sendContent").val("");
                    $("#thelist").append(str);
                    var resultContentH = $("#scroller").height();
                    console.log(resultContentH);
                    /* $('#wrapper').animate({scrollTop: resultContentH}, 800);*/
                    myScroll.scrollTo(0, -(resultContentH), 200)
                    myScroll.refresh();

                } else {

                    tips("发送消息失败！")

                }


            },
            error: function (xhr, type) {
                var error = "数据不能加载！";
                tips(error);
            }
        }
    );

});

