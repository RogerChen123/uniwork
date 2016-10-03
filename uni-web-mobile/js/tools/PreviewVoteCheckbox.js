if (anonymous == "false") {
    $("#anonymous").text("非匿名");
} else {

    $("#anonymous").text("匿名");

}
 optionNames = eval("(" + optionNames + ")");
for (var i = 0; i < optionNames.length; i++) {
    var str = "<div class='ui-form-item ui-form-item-checkbox'>"
        + " <label class='ui-checkbox' > "
        + "<input id='" + i + "' class='data' type='checkbox' disabled>"
        + " </label>" + " <p>" + optionNames[i] + "</p>" + " </div>";
    $("#list").append(str);

}