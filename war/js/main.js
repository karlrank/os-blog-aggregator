
function init() {
	$.get("/login", function(result){
	    $("#login").html(result);
	  });
	
	$.get("/blogs", function(result){
	    console.log(result);
	  });
	
	
}

window.onload = init;