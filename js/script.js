window.onload = function () {

    //获取所有需要的元素

    /*获取外层容器container*/
    var container = document.getElementById('container');

    /*获取图片列表*/
    var list = document.getElementById('list');

    /*获取圆点*/
    var buttons = document.getElementById('buttons').getElementsByTagName('span');

    /*获取左箭头*/
    var prev = document.getElementById('prev');

    /*获取右箭头*/
    var next = document.getElementById('next');

    /*初始化全局的当前图片index*/
    var index = 1;

    /*定时器*/
    var timer = null;

    /*规定动画是否运动*/
    var animated = false;

    play();
    container.onmouseover = stop;
    container.onmouseout = play;

    multiPpEvent.addMultiPpEvent(next, 'click', function () {
        if (animated) {
            return;
        }
        if (index == 5){
            index = 1;
        }else{
            index += 1;
        }
        Animate(-960);
        showButtons();
    });
    multiPpEvent.addMultiPpEvent(prev, 'click', function () {
        if (animated) {
            return;
        }
        if (index == 1){
            index = 5;
        }else{
            index -= 1;
        }
        Animate(960);
        showButtons();
    });

    for (var i = 0; i < buttons.length; i++){

        multiPpEvent.addMultiPpEvent(buttons[i], 'mouseover', function(){

            if (animated) {
                return;
            }
            /*为了让第一个初始小圆点什么都不做*/
            if (this.className == 'on'){
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -960 * (myIndex - index);
            Animate(offset);
            index = myIndex;
            showButtons();
        });
    }

    function Animate(step) {
        animated = true;

        var newLeft = parseInt(list.style.left) + step;
        var time = 300;     //运动总时间
        var interval = 10;  //运动的间隔时间
        var speed = step / (time / interval);   //每次运动的位移量

        uniformMove();
        function uniformMove() {
            if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(uniformMove, interval);
            } else {
                list.style.left = newLeft + 'px';
                if (newLeft > -960) {
                    list.style.left = -4800 + 'px';
                }
                if (newLeft < -4800) {
                    list.style.left = -960 + 'px';
                }
                animated = false;
            }
        }
    }
    function showButtons() { 
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index-1].className = 'on';
    }
    /*自动播放*/
    function play() {
        timer = setTimeout(function () {
            if (animated) {
                return;
            }
            if (index == 5){
                index = 1;
            }else{
                index += 1;
            }
            Animate(-960);
            showButtons();
            play();
        }, 3000);
    }
    function stop() {
        clearTimeout(timer);
    }

}


