/**
 * Created by yilong on 2016/2/20.
 */

//通用参数
//组织者名
var initiatorName = $.urlParam('initiatorName');
//组织名
var groupName = $.urlParam('groupName');
//日期
var createDate = $.urlParam('createDate');
//内容详情
var detail = $.urlParam('detail');
//标题
var title = $.urlParam('title');
/*********************投票********************************/
//投票中的匿名与非匿名参数
var anonymous = $.urlParam('anonymous');
//投票中的限制选择项
var selectedLimit = $.urlParam('selectedLimit');
//投票中的选项数组
var optionNames = $.urlParam('optionNames');
//描述数组
var examples = $.urlParam('examples');



$("#initiatorName").text(initiatorName);
$("#groupName").text(groupName);
$("#createDate").text(createDate);
$("#detail").text(detail);
$("#title").text(title);
$("#anonymous").text(anonymous);
$("#selectedLimit").text("最多可选" + selectedLimit + "个");



