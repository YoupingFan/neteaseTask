var username = sessionStorage.getItem("username");
var role = sessionStorage.getItem("role");

function initHead() {
    if(username!=null && role!=null) {
        if(role=="buyer") {
            document.getElementById('headLeft').innerHTML = "欢迎 ["+username+"]";
            document.getElementById('headRight').innerHTML = "<li><a href='/'>首页</a></li>"
                                                             + "<li><a href='/'>购物车</a></li>"
                                                             + "<li><a href='/'>财务</a></li>"
                                                             + "<li><a href='/'>退出</a></li>";
        } else {
            document.getElementById('headLeft').innerHTML = "欢迎 ["+username+"]";
            document.getElementById('headRight').innerHTML = "<li><a href='/'>首页</a></li>"
                                                              + "<li><a href='/'>发布</a></li>"
                                                              + "<li><a href='/'>退出</a></li>";
        }
    } else {
        document.getElementById('headLeft').innerHTML = "请<a href='/login'>[登录]</a>";
        document.getElementById('headRight').innerHTML = "<li><a href='/'>首页</a></li>";
    }
}
initHead();