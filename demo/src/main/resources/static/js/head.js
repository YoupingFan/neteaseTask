var username = sessionStorage.getItem("username");
var role = sessionStorage.getItem("role");
var $ = function(id){
    return document.getElementById(id);
};

function initHead() {
    if(username!=null && role!=null) {
        if(role=="buyer") {
            $('headLeft').innerHTML = "欢迎 ["+username+"]";
            $('headRight').innerHTML = "<li><a href='/'>首页</a></li>"
                                       + "<li><a href='/cart'>购物车</a></li>"
                                       + "<li><a href='/account'>财务</a></li>"
                                       + "<li><a id='logout' href='javascript:void(0)'>退出</a></li>";
            $('logout').onclick = function () {
                sessionStorage.removeItem("username");
                sessionStorage.removeItem("role");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("goods");
                sessionStorage.removeItem("records");
                location.href = "/login";
            }

        } else {
            $('headLeft').innerHTML = "欢迎 ["+username+"]";
            $('headRight').innerHTML = "<li><a href='/'>首页</a></li>"
                                       + "<li><a href='/public'>发布</a></li>"
                                       + "<li><a id='logout' href='javascript:void(0)'>退出</a></li>";
            $('logout').onclick = function () {
                sessionStorage.removeItem("username");
                sessionStorage.removeItem("role");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("goods");
                location.href = "/login";
            }
        }
    } else {
        $('headLeft').innerHTML = "请<a href='/login'>[登录]</a>";
        $('headRight').innerHTML = "<li><a href='/'>首页</a></li>";
    }
}
initHead();