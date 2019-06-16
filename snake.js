var floorNum = 10; // row, col 갯수
var stateRow = 0; // 현재 row 상태
var stateCol = 0; // 현재 col 상태
var direction = 'right'; // 진행방향
var arr = []; // 공간 저장소
var active = [{
    col: 0,
    row: 0
}]; // 현재 active된 순서
var auto = null; // interval 저장용

var apple = null;

// 초기값 생성
var init = function () {
    arr = [];
    var row = '0'.repeat(floorNum).split(''); // "0"으로 채워진 floorNum개 만큼의 컬럼 row 생성
    // row 삽입
    for (var i = 0; i < floorNum; i++) {
        arr[i] = JSON.parse(JSON.stringify(row)); // row 카피해서 삽입
    }

    if (apple) {
        arr[apple.col][apple.row] = 2;
    }
};

// 이벤트 바인딩
var eventInit = function () {
    // 방향키 이벤트 바인딩
    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 37:
                if (direction !== 'right') {
                    direction = 'left';
                    $('.rudder-key').removeClass('active');
                    $('.rudder-key.left').addClass('active');
                }
                break;
            case 38:
                if (direction !== 'bottom') {
                    direction = 'top';
                    $('.rudder-key').removeClass('active');
                    $('.rudder-key.top').addClass('active');
                }
                break;
            case 39:
                if (direction !== 'left') {
                    direction = 'right';
                    $('.rudder-key').removeClass('active');
                    $('.rudder-key.right').addClass('active');
                }
                break;
            case 40:
                if (direction !== 'top') {
                    direction = 'bottom';
                    $('.rudder-key').removeClass('active');
                    $('.rudder-key.bottom').addClass('active');
                }
                break;
        }
    });
};

// 화면 그리기
var render = function () {
    var result = '';
    console.log('arr', arr);
    arr.forEach(v => {
        result += '<tr>';
        v.forEach(v2 => {
            // console.log("v2", v2);
            switch (v2) {
                case 0:
                case '0':
                    result += '<td></td>';
                    break;
                case 1:
                case '1':
                    result += "<td class='active'></td>";
                    break;
                case 2:
                case '2':
                    result += "<td class='apple'></td>";
                    break;
            }
        });
        result += '</tr>';
    });
    $('table').html(result);
};

var createApple = function () {
    var row = createRandomNumber(0, floorNum - 1);
    var col = createRandomNumber(0, floorNum - 1);

    var check = active.some(function (v, i) {
        return row === v.row && col === v.col;
    });

    if (check) {
        return createApple();
    } else {
        return {
            col,
            row
        };
    }
};

var start = function () {
    init(); // 초기값 바인딩

    eventInit(); // 이벤트 바인딩

    go();

    auto = setInterval(function () {
        goCheck(go);
    }, 200);
};

var go = function (nowHead, nowTail, add) {
    console.log('arr', arr);
    // head push
    active.push({
        col: stateCol,
        row: stateRow
    });

    // tail shift
    if (!add) {
        active.shift();
    }

    init();
    active.forEach(function (v) {
        // console.log("아이템", v.col, v.row);
        arr[v.col][v.row] = 1;
    });
    for (var item in active) {
        arr[active[item].col][active[item].row] = 1;
    }
    if (!apple) {
        apple = createApple();
    }
    render(); // 화면 그리기
};

// 진행 체크(die체크 후 죽지 않았으면 진행 state 반영)
var goCheck = function (callback) {
    var nowHead = active[active.length - 1];
    var nowTail = active[0];
    var add = false;
    var nextTarget;

    switch (direction) {
        case 'left':
            // 벽 충돌(왼쪽)
            if (stateRow === 0) {
                return die();
            }

            nextTarget = arr[stateCol][stateRow - 1];
            if (nextTarget === 1) { // 다음 이동칸이 나 자신이면 죽음
                return die();
            } else if (apple.col === stateCol && apple.row === stateRow - 1) { // 다음 이동칸이 사과일때
                add = true;
                apple = null;
            }

            stateRow = stateRow - 1;
            break;
        case 'right':
            // 벽 충돌(오른쪽)
            if (stateRow === floorNum - 1) {
                return die();
            }

            nextTarget = arr[stateCol][stateRow + 1];
            if (nextTarget === 1) { // 다음 이동칸이 나 자신이면 죽음
                return die();
            } else if (apple.col === stateCol && apple.row === stateRow + 1) { // 다음 이동칸이 사과일때
                add = true;
                apple = null;
            }

            stateRow = stateRow + 1;
            break;
        case 'top':
            // 벽 충돌(상단)
            if (stateCol === 0) {
                return die();
            }
            nextTarget = arr[stateCol - 1][stateRow];
            if (nextTarget === 1) { // 다음 이동칸이 나 자신이면 죽음
                return die();
            } else if (apple.col === stateCol - 1 && apple.row === stateRow) { // 다음 이동칸이 사과일때
                add = true;
                apple = null;
            }

            stateCol = stateCol - 1;
            break;
        case 'bottom':
            // 벽 충돌(하단)
            if (stateCol === floorNum - 1) {
                return die();
            }

            nextTarget = arr[stateCol + 1][stateRow];
            if (nextTarget === 1) { // 다음 이동칸이 나 자신이면 죽음
                return die();
            } else if (apple.col === stateCol + 1 && apple.row === stateRow) { // 다음 이동칸이 사과일때
                add = true;
                apple = null;
            }

            stateCol = stateCol + 1;
            break;
    }

    callback(nowHead, nowTail, add);
};

var die = function () {
    // 죽었을때
    clearInterval(auto);
    alert('Game Over!');
};

// 매개변수로 전달받은 min ~ max범위에서 난수를 생성한다
var createRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

$(document).ready(function () {
    start();
});