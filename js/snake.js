$(function () {
    var board = $("#snakehouse");
    var snake = $(".snake");
    var timer = 0;
    var delay = 500;

    // timer = setInterval(game,delay);
    // console.log(snake);


    // function game() {
    //     console.log('call game');
    //     snake.animate({right:"20px"},delay);
    // }
    // game();

})



$("#start").click(function () {
    $(".snake").animate({right:"20px"},1000);
});


