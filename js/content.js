let totalTasks = 0;
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var createListItem = function(inputText, inputTime) {
    /*creating task element*/
    let li = $("<li>");
    $(li).attr("class", "todo-item");
    /*creating checkbox for task*/
    let checkBox = $("<input>").attr("class", "list-checkbox");
    $(checkBox).attr("type", "checkbox");
    checkBoxClick(checkBox);
    $(li).append(checkBox);
    /*creating the text for task*/
    let liText = $("<div>").attr("class", "list-text");
    $(liText).text(inputText);
    $(li).append(liText);
    /*creating timestamp for task*/
    let liTime = $("<div>").attr("class", "list-time");
    $(liTime).text(inputTime);
    $(li).append(liTime);
    /*creating x btn*/
    let removeBtn = $("<div>").append($("<a>").text("X"));
    $(removeBtn).attr("class", "remove-item-btn");
    removeBtnClick(removeBtn);
    /*appending x button to task*/
    $(li).append(removeBtn);
    totalTasks++;
    setTaskTotal();
    return li;
}
var adjustTime = function(t) {
    if (t != "") {
        t = t.replace(":", "");
        t = parseInt(t);
        if (t < 60) {
            if (t < 10) {
                t = "12:" + "0" + t + "am";
                return t;
            } else {
                t = "12:" + t + "am";
                return t;
            }
        } else if (t < 1200) {
            if (t.toString().length === 4) {
                t = t.toString();
                t = t.substr(0, 2) + ":" + t.substr(2, 4) + "am";
                return t;
            } else {
                t = t.toString();
                t = t.substr(0, 1) + ":" + t.substr(1, 2) + "am";
                return t;
            }
        } else if (t >= 1300) {
            t = t - 1200;
            if (t.toString().length === 4) {
                t = t.toString();
                t = t.substr(0, 2) + ":" + t.substr(2, 4) + "pm";
                return t;
            } else {
                t = t.toString();
                t = t.substr(0, 1) + ":" + t.substr(1, 2) + "pm";
                return t;
            }
        } else {
            t = t.toString();
            t = t.substr(0, 2) + ":" + t.substr(2, 4) + "pm";
            return t;
        }
    } else {
        return "";
    }
}

function setTaskTotal() {
    $(".todo-count").text(totalTasks + " Tasks");
}

function checkBoxClick(e) {
    $(e).click(function() {
        let checked = $(e).is(":checked");
        if (checked === true) {
            $(e).parent().find(".list-text").css("text-decoration", "line-through");
        } else {
            $(e).parent().find(".list-text").css("text-decoration", "none");
        }
    })
}

function removeBtnClick(e) {
    $(e).click(function() {
        totalTasks--;
        setTaskTotal();
        $(e).parent().remove();
    })
}

function showAddItemForm() {
    $("#show-add-btn").css("display", "none");
    $("#minus-item-btn").css("display", "block");
    $("#add-item-btn").css("display", "block");
    $("#task-text-input").css("display", "block");
    $("#task-time-input").css("display", "block");
}

function hideAddItemForm() {
    $("#show-add-btn").css("display", "block");
    $("#minus-item-btn").css("display", "none");
    $("#add-item-btn").css("display", "none");
    $("#task-text-input").css("display", "none");
    $("#task-time-input").css("display", "none");
}

function addItemFormListeners() {
    $("#add-item-btn").click(function() {
        let txt = $("#task-text-input").val();
        let time = $("#task-time-input").val();
        console.log(time);
        createListItem(txt, adjustTime(time)).insertAfter(".todo-header");
    })
    $("#minus-item-btn").click(function() {
        //resetting form text
        $("#task-text-input").val("");
        $("#task-time-input").val("");
        hideAddItemForm();
    })
}

function showAddBtnClick() {
    $("#show-add-btn").click(function() {
        showAddItemForm();
    });
}

function setTimeLabel() {
    let c = new Date();
    let n = c.getDate()
    let d = c.getDay();
    d = days[d];
    let m = c.getMonth();
    m = months[m];
    let y = c.getFullYear();
    $(".day-wrapper").text(d);
    $(".month-wrapper").text(m +" "+ n+"th"+", "+y);
}
$(document).ready(function() {
    showAddBtnClick();
    setTimeLabel();
    addItemFormListeners();
});