$(function () {
    var board = $("#snakehouse");
    var snake = $(".snake");
    var timer = 0;
    var delay = 500;

    timer = setInterval(game,delay);
    game();
    function game() {
        snake.animate({right:20},delay);
    }

})