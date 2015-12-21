var people = [];
var rightOrLeft = 0;
var SCROLL_SPEED = 10; //seconds

$(document).ready(function(){
    getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data){
            people = data.people;
            createStudent(data);
            $("#list").on('click', "button", personSelect);
            $(".glyphicon-chevron-left").on('click', personLeft);
            $(".glyphicon-chevron-right").on('click', personRight);
        }
    });
}

var timer = setInterval(personRight, SCROLL_SPEED*1000);

function createStudent(data) {
    for (var i = 1; i < data.people.length + 1; i++){
        $("#list").append("<button class='index-point' data-id='" + i + "'></button>");
    }
    $("#list").children().filter("button").first().addClass("active");
    $(".center").append("<span>" + data.people[0].name + "</span>").fadeIn();
    $(".person-city").append("<p>" + data.people[0].location + "</p>").fadeIn();
    $(".person-spirit").append("<p>" + data.people[0].animal + "</p>").fadeIn();
    $(".spirit").css("background-image", "url(" + data.people[0].image + ")");
}

function personSelect() {
    $(this).parent().children().filter("button").removeClass("active");
    $(this).addClass("active");

    var personNumber = ($(this).data('id')) - 1;

    updatePerson(personNumber);
}

function updatePerson(number) {
    $(".center").children().last().text(people[number].name).hide().fadeIn();
    $(".person-city").children().last().text(people[number].location).hide().fadeIn();
    $(".person-spirit").children().last().text(people[number].animal).hide().fadeIn();
    $(".spirit").css("background-image", "url(" + people[number].image + ")");
}

function personRight() {
    var person = $("#list").children("button.active").data("id") + 1;
    if (person == 22) { person = 1; }
    updatePerson(person-1);
    $("#list").children().filter("button").removeClass("active");
    $("button").eq(person-1).addClass("active");
    clearInterval(timer);
    timer = setInterval(personRight, SCROLL_SPEED*1000);
}

function personLeft() {
    var person = $("#list").children("button.active").data("id") - 2;
    if (person == -1) { person = 20; }
    updatePerson(person);
    $("#list").children().filter("button").removeClass("active");
    $("button").eq(person).addClass("active");
    clearInterval(timer);
    timer = setInterval(personRight, SCROLL_SPEED*1000);
}