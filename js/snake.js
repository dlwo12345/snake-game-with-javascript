// 뱀 게임 자바스크립트

// 필요한 것
    // 뱀
    // 사과
    // 게임 판 보드의 너비, 높이
    // 뱀 하나 너비, 높이

    // 점수를 받아오는 곳
    // 방향, 움직임
var snake = document.createElement("td"); // 뱀 블록 요소
var board = document.getElementById("snakehouse"); // 보드판 요소
var start = document.getElementById("start"); // 시작 버튼
var w = snake.width(); // 뱀 블록 하나 당 너비
var h = snake.height(); // 뱀 블록 하나 당 높이
var apple = document.getElementById("apple"); // 사과 요소

var x = board.width/20;
var y = board.height/20;


var score = 0; // score는 숫자값

var max = 0;
var min = 0;



    // 난수 생성 함수


    // snake 블록을 생성
board.createElement("snake");
snake.style.width = 20;
snake.style.height = 20;
snake.style.bgColor = "#5AAFFF";


// 시작 버튼을 누르면 게임이 시작된다. ( 뱀이 오른쪽으로 움직이기 시작한다 )
// start.onclick = function () {
//     snake = prepend("board");
//     board.style.position = 'relative';
//
//     snake.style.right = parseInt(snake.style.right) + 20 + "px";
//     animate = setTimeout(moveRight,200);
// }
// setInterval(start,10);


// 키 입력을 받고 이동방향을 전환한다.


// 뱀이 사과를 먹으면 점수가 올라간다. 동시에 사과의 위치가 새롭게 (랜덤 위치) 뿌려진다.
// 그리고 뱀의 몸에 새로운 뱀 블록이 뒤에 붙는다.




// 뱀이 벽에 부딪히거나 몸에 부딪히면 겜이 끝난다.


// 방향키를 누를 때 뱀이 오른쪽으로 20px씩 이동한다.