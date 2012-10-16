
var bloglist;
var entries;

function init() {
	
	$.get("/login?origin=blogs", function(result){
	    $("#login").html(result);
	  });
	
	res();
	$(window).resize(res);
	
	$.get("/bloglists", function(result) {
		var bloglists = $.parseJSON(result);
		console.log(bloglists);
		if (bloglists == null) {
			$("#bloglists").html("Log in to manage your bloglists.");
		}
		else if (bloglists.length == 0) {
			$("#bloglists").html("You currently have no bloglists. Start by creating some.");
		}
		else {
			for (var i = 0; i < bloglists.length; i++) {
				$("#bloglists").append(createListRow(i, bloglists[i].name));
				for (var j = 0; j < bloglists[i].blogs.length; j++) {
					$("#bloglists").append(createBlogRow(i, bloglists[i].blogs[j].title));
				}
			}
		}
		
		addClickListeners();
	});
}

window.onload = init;

function createListRow(listNr, listName) {
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.id = listNr;
		td.className = "open";
		tr.appendChild(td);
	var img = document.createElement("img");
		img.alt = "arrow";
		img.src = "img/arrow_right.png";
		td.appendChild(img);
	var td2 = document.createElement("td");
		td2.className = "name";
		td2.innerText = listName;
		tr.appendChild(td2);
	var td3 = document.createElement("td");
		td3.innerHTML = "<a class='add' href=''>ADD BLOG</a> - <a class='add' href=''>REMOVE LIST</a>";
		tr.appendChild(td3);
	return tr;
}


function createBlogRow(listNr, blogName) {
	var tr = document.createElement("tr");
		tr.className = "blog " + listNr;
	var td = document.createElement("td");
		td.className = "open";
		tr.appendChild(td);
	var td2 = document.createElement("td");
		td2.className = "blogname";
		td2.innerText = blogName;
		tr.appendChild(td2);
	var td3 = document.createElement("td");
		td3.innerHTML = '<a class="add" href="">EDIT TAGS</a> - <a class="add" href="">REMOVE BLOG</a>';
		tr.appendChild(td3);
	return tr;
}

function res() {
	$("#main").css("position", "fixed");
	$("#main").css("height", $("body").height() - 185 + "px");
	if ($("body").width() < 1150) {
		$("#right").hide();
	}
	else {
		$("#right").show();
	}
}

function addClickListeners() {
	$(".open").click(function (event) {
		if ($("." + event.currentTarget.id).css("display") == "none") {
			$("." + event.currentTarget.id).show(300);
			event.currentTarget.children[0].src = "img/arrow_down.png";
		}
		else {
			$("." + event.currentTarget.id).hide(300);
			event.currentTarget.children[0].src = "img/arrow_right.png";
		}
		
	});
	$(".name").click(function (event) {
		if ($("." + event.currentTarget.parentNode.children[0].id).css("display") == "none") {
			$("." + event.currentTarget.parentNode.children[0].id).show(300);
			event.currentTarget.parentNode.children[0].children[0].src = "img/arrow_down.png";
		}
		else {
			$("." + event.currentTarget.parentNode.children[0].id).hide(300);
			event.currentTarget.parentNode.children[0].children[0].src = "img/arrow_right.png";
		}
		
	});
}











