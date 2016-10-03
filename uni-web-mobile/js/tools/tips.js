/**
 * Created by yilong on 2016/2/20.
 */
/*提示信息*/
function tips(content) {
    $.tips({
        content: content,
        stayTime: 2000,
        type: "success"
    }).on("tips:hide", function () {
        console.log("tips hide");
    });
}