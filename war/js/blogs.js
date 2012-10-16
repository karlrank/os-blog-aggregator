
var bloglists;
var entries;
var blogId;
var listId;

function init() {
	
	$.get("/login?origin=blogs", function(result){
	    $("#login").html(result);
	  });
	
	res();
	$(window).resize(res);
	
	$.get("/bloglists", function(result) {
		bloglists = $.parseJSON(result);
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
					$("#bloglists").append(createBlogRow(i, bloglists[i].blogs[j].title, bloglists[i].blogs[j].id));
				}
			}
		}
		
		addClickListeners();
	});
	
	$("#addlist").click(function () {
		$("#darken").show();
		$("#darken").animate({opacity: "0.6"});
		$("#addListWindow").show(200);
	});
	
	$("#cancelAddListButton").click(function () {
		$("#darken").animate({opacity: "0"}, function() {$("#darken").hide();});
		
		$("#addListWindow").hide(300);
	});	
	$("#addListButton").click(function (eventObject) {
		listName = eventObject.currentTarget.parentNode.children[1].value;
		$.post("/listmanager", { action: "add", listName: listName } );
		
		$("#darken").animate({opacity: "0"}, function() {$("#darken").hide();});
		$("#addListWindow").hide(200, function() {
			location.reload();
		});
	});
	
	$("#cancelAddBlogButton").click(function () {
		$("#darken").animate({opacity: "0"}, function() {$("#darken").hide();});
		
		$("#addBlogWindow").hide(300);
	});
	$("#addBlogButton").click(function (eventObject) {
		blogUrl = eventObject.currentTarget.parentNode.children[1].value;
		var feed = new google.feeds.Feed(blogUrl);
		console.log(blogUrl);
	    feed.setNumEntries(1);
	    feed.load(function(result) {
	    	console.log(result);
	    	if (!result.error) {
	    			var blogTitle = result.feed.entries[0].author;
	    			$.post("/listmanager", { action: "addBlog", listId: listId, blogTitle: blogTitle, blogUrl: blogUrl} , function() {
	    				location.reload();
	    			});
	    			
	    			$("#darken").animate({opacity: "0"}, function() {$("#darken").hide();});
	    			$("#addListWindow").hide(200, function() {
	    				location.reload();
	    			});
	    	}
	    });
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
		td3.innerHTML = "<a class='add addBlog' href='javascript:void(0)'>ADD BLOG</a> - <a class='add removeList' href='javascript:void(0)'>REMOVE LIST</a>";
		tr.appendChild(td3);
	return tr;
}


function createBlogRow(listNr, blogName, blogId) {
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
		td3.innerHTML = '<a class="add" href="javascript:void(0)">EDIT TAGS</a> - <a id="blog.' + blogId + '" class="add removeBlog" href="javascript:void(0)">REMOVE BLOG</a>';
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
	
	$(".removeList").click(function (eventObject) {
		var id = parseInt(eventObject.currentTarget.parentNode.parentNode.children[0].id);
		
		var id = bloglists[id].id;
		$.post("/listmanager", { action: "remove", listId: id } , function() {
			location.reload();
		});
	});
	
	$(".removeBlog").click(function (eventObject) {
		var blogId = eventObject.currentTarget.id.split(".")[1];
		var listId = bloglists[parseInt(eventObject.currentTarget.parentNode.parentNode.classList[1])].id;
		console.log(blogId, listId);
		
		$.post("/listmanager", { action: "removeBlog", listId: listId, blogId: blogId } , function() {
			location.reload();
		});
	});
	
	$(".addBlog").click(function (eventObject) {
		$("#darken").show();
		$("#darken").animate({opacity: "0.6"});
		$("#addBlogWindow").show(200);
		listId = bloglists[parseInt(eventObject.currentTarget.parentNode.parentNode.children[0].id)].id;
	});
}












