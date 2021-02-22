var token = sessionStorage.getItem("token");
var username = sessionStorage.getItem("username");
var role = sessionStorage.getItem("role");

function initContent(result) {
    var plist = "";
    for(i=0;i<result.length;i++) {
        plist += "<li id='"+result[i].id+"'>"
        	     +"<a href='show?id="+result[i].id+"' class='link'>"
        	     +"<div class='img'><img src='"+result[i].image+"' alt='"+result[i].title+"'></div>"
        	     +"<h3>"+result[i].title+"</h3>"
        	     +"<div class='price'><span class='v-unit'>¥</span><span class='v-value'>"+result[i].price+"</span>"
        	     +"<span class='v-unit' style='float:right'>销量："+result[i].sell_num+"</span></div>"
        	     +"</a></li>";
    }
    document.getElementById('plist').innerHTML = plist;
}
function initPage() {
    ajax({
    	url:'/api/goods',
    	type:"GET",
    	success:function(result){
    	    initContent(result);
    	}
    });
}
function initBuyerPage() {
    ajax({
    	url:'/api/goods',
    	type:"GET",
    	success:function(result){
            initContent(result);
    	    document.getElementById('content').innerHTML += "<li class='z-sel' >"
                	                                              +"<a id='filter' href='javascript:void(0)'>"
                	                                              +"已购内容</a></li>";
    	    ajax({
    	        url:'/api/records',
    	        type:'GET',
    	        headers: {
                    "Authentication" : token
                },
    	        success:function(records) {
    	            var idSet = new Set();
    	            for(i=0;i<records.length;i++) {
    	                idSet.add(records[i].goods_id);
    	            }
    	            for(i=0;i<result.length;i++) {
    	                if(idSet.has(result[i].id)) {
    	                    var div = document.createElement("div");
    	                    div.className= "label";
    	                    div.innerHTML = "已购买";
    	                    document.getElementById(result[i].id).firstChild.firstChild.appendChild(div);
    	                }
    	            }
    	            document.getElementById('filter').onclick = function (){
    	                for(i=0;i<result.length;i++) {
    	                    if(!idSet.has(result[i].id)) {
    	                        document.getElementById(result[i].id).remove();
                        	}
                        }
                    }
    	        },
    	        error:function(data) {
    	            if(data.code==401) {
    	                location.href="/login";
    	            }
    	        }
    	    });
    	}
    });


}

function initSellerPage() {
    ajax({
    	url:'/api/goods',
    	type:"GET",
    	success:function(result){
            initContent(result);
    	    document.getElementById('content').innerHTML += "<li class='z-sel' >"
    	                                              +"<a id='filter' href='javascript:void(0)'>"
    	                                              +"未售内容</a></li>"
    	    document.getElementById('filter').onclick = function (){
    	        for(i=0;i<result.length;i++) {
    	            if(result[i].sell_num>0) {
    	                document.getElementById(result[i].id).remove();
    	            }
                }
            }

    	}
    });
}

if(token!=null && username!=null && role!=null) {
    if(role=="buyer") {
        initBuyerPage();
    } else {
        initSellerPage();
    }
} else{
    initPage();
}
