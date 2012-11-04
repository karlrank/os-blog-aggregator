
var bloglists;
var entries;
var blogId;
var listId;

function init() {
	res();
	$(window).resize(res);
	$(".blogButtons a").button()
	$( "#accordion" ).accordion({heightStyle: "content"});
	$("#addlist").button();
	$(".bloglistbuttons a").button();
	$( "#addBlogTabs" ).tabs({heightStyle: "auto"});

	$( "#dialogAddBloglist" ).dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        buttons: {
            "Add list": function() {
            	var name = $("#name");
                var bValid = true;
                name.removeClass( "ui-state-error" );

                bValid = bValid && checkLength( name, "bloglist name", 2, 32 );
                bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_ ])+$/i, "Bloglist name may consist of a-z, 0-9, underscores, begin with a letter." );

                if ( bValid ) {
                    $.post("/listmanager", { action: "addList", listName: document.getElementById("name").value }, function () {
                    	location.reload();
                    });
                    $( this ).dialog( "close" );
                }
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        open: function() {
            $("#dialogAddBloglist").keypress(function(e) {
              if (e.keyCode == $.ui.keyCode.ENTER) {
                $(this).parent().find("button:eq(0)").trigger("click");
                return false;
              }
            });
          },
        close: function() {
        	var name = $("#name");
            name.removeClass( "ui-state-error" );
            document.getElementById("name").value = "";
            var tips = $(".validateTips");
            tips.text("");
        }
    });
	
	$( "#dialogAddBlog" ).dialog({
        autoOpen: true,
        modal: true,
        resizable: false,
        width: 500,
        buttons: {
            "Add list": function() {
            	var name = $("#name");
                var bValid = true;
                name.removeClass( "ui-state-error" );

                bValid = bValid && checkLength( name, "bloglist name", 2, 32 );
                bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_ ])+$/i, "Bloglist name may consist of a-z, 0-9, underscores, begin with a letter." );

                if ( bValid ) {
                    $.post("/listmanager", { action: "addList", listName: document.getElementById("name").value }, function () {
                    	location.reload();
                    });
                    $( this ).dialog( "close" );
                }
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        open: function() {
            $("#dialogAddBloglist").keypress(function(e) {
              if (e.keyCode == $.ui.keyCode.ENTER) {
                $(this).parent().find("button:eq(0)").trigger("click");
                return false;
              }
            });
          },
        close: function() {
        	var name = $("#name");
            name.removeClass( "ui-state-error" );
            document.getElementById("name").value = "";
            var tips = $(".validateTips");
            tips.text("");
        }
    });
	
	$.get("/bloglists", function(result) {
		bloglists = $.parseJSON(result);
		
//		if (bloglists.length == 1 && !isLoggedIn()) {
//			$("#bloglists").html("Log in to manage your bloglists.");
//			$("#addlist").hide();
//		}
//		else if (bloglists.length == 1 && isLoggedIn()) {
//			$("#bloglists").html("You currently have no bloglists. Start by creating some.");
//		}
//		else {
//			for (var i = 1; i < bloglists.length; i++) {
//				$("#bloglists").append(createListRow(i, bloglists[i].name));
//				for (var j = 0; j < bloglists[i].blogs.length; j++) {
//					$("#bloglists").append(createBlogRow(i, bloglists[i].blogs[j].title, bloglists[i].blogs[j].id));
//				}
//			}
//		}
//		
		addClickListeners();
	});
	
	$("#addlist").click(function () {
//		$("#darken").show();
//		$("#darken").animate({opacity: "0.6"});
//		$("#addListWindow").show(200);
		$( "#dialogAddBloglist" ).dialog( "open" );
	});
	
	$("#cancelAddListButton").click(function () {
		$("#darken").animate({opacity: "0"}, function() {$("#darken").hide();});
		
		$("#addListWindow").hide(300);
	});	
	$("#addListButton").click(function (eventObject) {
		listName = eventObject.currentTarget.parentNode.children[1].value;
		$.post("/listmanager", { action: "addList", listName: listName } );
		
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

function updateTips( t ) {
	var tips = $(".validateTips");
    tips.text( t ).addClass( "ui-state-highlight" );
    setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
}

function checkLength( o, n, min, max ) {
    if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
        return false;
    } else {
        return true;
    }
}

function checkRegexp( o, regexp, n ) {
    if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
    } else {
        return true;
    }
}

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

function isLoggedIn() {
	if($(".login li a").attr("title") === "Sign out") {
		return true;
	}
	else if ($(".login li a").attr("title") === "Sign in") {
		return false;
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
		$.post("/listmanager", { action: "removeList", listId: id } , function() {
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
	$("#addBlogWindow").show(200);
		listId = bloglists[parseInt(eventObject.currentTarget.parentElement.parentElement.id)].id;
	});
}












