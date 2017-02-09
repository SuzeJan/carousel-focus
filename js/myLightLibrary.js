/*加载事件*/
function addLoadEvent(func){
    var oldOnload = window.onload;
    if (typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldOnload();
            func();
        }
    }
}

/* 通过节点来获取类名的元素函数 参数分别为DOM中的搜索起点（父节点）,搜索的类名*/
function getByClass(parentnode, classname) {
    if (parentnode.getElementsByClassName) {
        return parentnode.getElementsByClassName(classname);
    } else {
        var results = Array();
        var elems = parentnode.getElementsByTagName('*');

        for (var i = 0; i < elems.length; i++) {
            if (elems[i].className.indexOf(classname) != -1) {
                results.push(elems[i]);/*push方法将参数添加到调用者的后面*/
            }
        }
        return results;/*返回包含这个classname的一个数组*/
    }
}

//跨浏览器添加事件
var multiPpEvent = {
    //添加句柄
    addMultiPpEvent:function(ele, event, func){
        event = multiPpEvent.getEvent(event);
        if (ele.addEventListener) {
            ele.addEventListener(event, func, false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + event, func);
        } else {
            ele['on' + event] = func;
        }
    },

    //删除句柄
    removeMultiPpEvent:function(ele, event, func){
        event = multiPpEvent.getEvent(event);
        if (ele.removeEventListener) {
            ele.removeEventListener(event, func, false);
        } else if (ele.detachEvent) {
            ele.detachEvent('on' + event, func);
        } else {
            ele['on' + event] = null;
        }
    },

    //跨浏览器的获取事件对象
    getEvent:function(event){
        return event?event:window.event;
    },

    //获取事件的类型
    getEventType:function(event){
        return multiPpEvent.getEvent(event).type;
    },

    //获取事件的目标对象
    getEventElement:function(event){
        return multiPpEvent.getEvent(event).target || multiPpEvent.getEvent(event).srcElement;
    },

    //定义跨浏览器的阻止事件冒泡
    stopEventBubble:function(event){
        if (multiPpEvent.getEvent(event).stopPropagation){
            multiPpEvent.getEvent(event).stopPropagation();
        }else{
            multiPpEvent.getEvent(event).cancelBubble = true;
        }
    },

    //定义跨浏览器的阻止事件的默认行为
    stopEventAction:function(event){
        if (multiPpEvent.getEvent(event).preventDefault){
            multiPpEvent.getEvent(event).preventDefault();
        }else{
            multiPpEvent.getEvent(event).returnValue = false;
        }
    }
};

//获取元素索引值
function index(current, obj) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i] == current) {
            return i;
        }
    }
}
