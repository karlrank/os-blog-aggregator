
var bloglists;
var inputBlogs;
var entries;
var blogId;
var listId;
var sent = 0;

function init() {
	
	$("#dialogConfirmBlogDelete").dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		buttons: {
            "Delete blog": function() {
            	$.post("/listmanager", { action: "removeBlog", listId: listId, blogId: blogId } , function() {
        			location.reload();
        		});
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        open: function() {
            $("#dialogConfirmBlogDelete").keypress(function(e) {
              if (e.keyCode == $.ui.keyCode.ENTER) {
                $(this).parent().find("button:eq(0)").trigger("click");
                return false;
              }
            });
          },
        close: function() {
        }
	});
	
	$("#dialogConfirmListDelete").dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		buttons: {
            "Delete bloglist": function() {
            	$.post("/listmanager", { action: "removeList", listId: listId } , function() {
        			location.reload();
        		});
        		sessionStorage.activeList = 0;
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        open: function() {
            $("#dialogConfirmListDelete").keypress(function(e) {
              if (e.keyCode == $.ui.keyCode.ENTER) {
                $(this).parent().find("button:eq(0)").trigger("click");
                return false;
              }
            });
          },
        close: function() {
        }
	});
	
	$("#dialogAddMultipleBlogs").dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		buttons: {
            "Add blogs": function() {
            	var blogs = document.getElementById("addMultipleBlogsUL");
            	
            	
            	for ( var i = 0; i < blogs.children.length; i++) {
					if (blogs.children[i].children[0].checked) {
						sent++;
						$.post("/listmanager", { action: "addBlog", listId: listId, blogTitle: inputBlogs[i].title, blogUrl: inputBlogs[i].xmlUrl} , function() {
							sent--;
							if (sent == 0) {
								location.reload();
							}
    	    			});
					}
				}
            	 $( this ).dialog( "close" );
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        open: function() {
            $("#dialogAddMultipleBlogs").keypress(function(e) {
              if (e.keyCode == $.ui.keyCode.ENTER) {
                $(this).parent().find("button:eq(0)").trigger("click");
                return false;
              }
            });
          },
        close: function() {
        	var blogs = document.getElementById("addMultipleBlogsUL");
        	blogs.innerHTML = "";
        }
	});
	
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
	
	$( "#addBlogTabs" ).tabs({heightStyle: "auto"});
	$( "#dialogAddBlog" ).dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        width: 500,
        buttons: {
            "Add list": function() {
            	var active = $("#addBlogTabs").tabs("option", "active");
            	var activeList = $("#accordion").accordion("option", "active");
            	
            	switch(active)
            	{
            	case 0:
            		
            		var url = $("#blogUrl");
            		$(url).parent().parent().prev().html('<img src="img/ajax-loader.gif" alt="loading">');
                    var bValid = true;
                    url.removeClass( "ui-state-error" );
                    
                    bValid = bValid && checkLength( url, "blog url", 2, 200 );
                    bValid = bValid && checkRegexp( url, /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/, "Blog RSS url must be an url." );
            		
                    if ( bValid ) {
                    	sessionStorage.activeList = activeList;
                    	blogUrl = url.val();
                    	
                		var feed = new google.feeds.Feed(blogUrl);
                	    feed.setNumEntries(1);
                	    feed.load(function(result) {
                	    	console.log(result);
                	    	if (!result.error) {
                	    			var blogTitle = result.feed.entries[0].author;
                	    			$.post("/listmanager", { action: "addBlog", listId: listId, blogTitle: blogTitle, blogUrl: blogUrl} , function() {
                	    				location.reload();
                	    			});
                	    	}
                	    	else {
                	    		url.addClass( "ui-state-error" );
                	            updateTips("Error with given RSS url. Check url and try again.", url);
                	    	}
                	    });
                    }
                    
            		break;
            	case 1:
            		sessionStorage.activeList = activeList;
            		var GAPassword = document.getElementById("googleAccountPassword");
            		$(GAPassword).removeClass( "ui-state-error" );
            		$(GAPassword).parent().parent().prev().html('<img src="img/ajax-loader.gif" alt="loading">');
            		var password = encodeURIComponent(GAPassword.value);
            		
            		$.post("/gReaderImport", { password: password} , function(result) {
	    				if (result == 0) {
	    					updateTips("Error retrieving google reader subscriptions. Possibly wrong password.", GAPassword);
	    					$(GAPassword).addClass( "ui-state-error" );
	    				}
	    				else {
	    					updateTips("Subscriptions loaded.", GAPassword);
	    					var bloglist = createBloglistGreader($.parseJSON(result));
	    					
	    					if (bloglist == false) {
	            				updateTips("Error parsing file.", GAPassword);
	            				$(GAPassword).addClass( "ui-state-error" );
	            			}
	            			else {
	            				inputBlogs = bloglist;
	            				for (var i = 0; i < bloglist.length; i++) {
	            					$("#addMultipleBlogsUL").append('<li><input class="blogCheckbox" type="checkbox"> ' + bloglist[i].title + '</li>');
	            					$("#dialogAddMultipleBlogs").dialog("open");
	            				}
	            			}
	    				}
	    			});
            		
            		break;
            	case 2:
            		sessionStorage.activeList = activeList;
            		var opml = document.getElementById("OPML");
            		$(opml).removeClass( "ui-state-error" );
            		$(opml).parent().parent().prev().html('<img src="img/ajax-loader.gif" alt="loading">');
            		var file = opml.files[0];
            		var reader = new FileReader();
            		var jsonOPML;
            		
            		if (file === undefined) {
            			updateTips("Select an input file.", opml);
            			break;
            		}
            		
            		reader.readAsText(file);
            		reader.onload = function () {
            			updateTips("", opml);
            			jsonOPML = $.xml2json(reader.result);
            			var bloglist = createBloglist(jsonOPML);
            			if (bloglist == false) {
            				updateTips("Error parsing file.", opml);
            				$(opml).addClass( "ui-state-error" );
            			}
            			else {
            				inputBlogs = bloglist;
            				for (var i = 0; i < bloglist.length; i++) {
            					$("#addMultipleBlogsUL").append('<li><input class="blogCheckbox" type="checkbox"> ' + bloglist[i].title + '</li>');
            					$("#dialogAddMultipleBlogs").dialog("open");
            				}
            			}
            		};
              	  	break;
            	}

            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        open: function() {
            $("#dialogAddBlog").keypress(function(e) {
              if (e.keyCode == $.ui.keyCode.ENTER) {
                $(this).parent().find("button:eq(0)").trigger("click");
                return false;
              }
            });
          },
        close: function() {
        }
    });
	
	$.get("/bloglists", function(result) {
		bloglists = $.parseJSON(result);
		
		if (bloglists.length == 1 && !isLoggedIn()) {
			$("#accordion").html("Log in to manage your bloglists.");
			$("#addlist").hide();
		}
		else if (bloglists.length == 1 && isLoggedIn()) {
			$("#accordion").html("You currently have no bloglists. Start by creating some.");
		}
		else {
			for (var i = 1; i < bloglists.length; i++) {
				$("#accordion").append(createListRow(i, bloglists[i].name));
				var div = document.createElement("div");
				var ul = document.createElement("ul");
					div.appendChild(ul);
				
				for (var j = 0; j < bloglists[i].blogs.length; j++) {
					var li = document.createElement("li");
					li.innerHTML = bloglists[i].blogs[j].title + ' <span class="blogButtons"><a href="javascript:void(0)">EDIT TAGS</a><a class="removeBlog" id="blog.' + bloglists[i].blogs[j].id + '" href="javascript:void(0)">REMOVE BLOG</a></span>';
					ul.appendChild(li);
				}
					$("#accordion").append(div);
			}
		}
		
		addClickListeners();
	});
	
	$("#addlist").click(function () {
		$( "#dialogAddBloglist" ).dialog( "open" );
	});	
}

window.onload = init;

function updateTips(t, o) {
	var tips = $(o).parent().parent().prev();
    tips.text( t ).addClass( "ui-state-highlight" );
    setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
    }, 500 );
}

function checkLength( o, n, min, max ) {
    if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
                min + " and " + max + ".", o);
        return false;
    } else {
        return true;
    }
}

function checkRegexp( o, regexp, n ) {
    if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips(n, o);
        return false;
    } else {
        return true;
    }
}

function createListRow(listNr, listName) {
	var h3 = document.createElement("h3");
		h3.id = listNr;
	h3.innerHTML = listName + '<span class="bloglistbuttons"><a class="addBlog" href="javascript:void(0)">ADD BLOG</a><a class="removeList" href="javascript:void(0)">REMOVE LIST</a></span>';
	return h3;
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
	$(".blogButtons a").button();
	$( "#accordion" ).accordion({heightStyle: "content", active: parseInt(sessionStorage.activeList)});
	$("#addlist").button();
	$(".bloglistbuttons a").button();
	
	$(".removeList").click(function (eventObject) {
		listId = bloglists[parseInt(eventObject.currentTarget.parentElement.parentElement.id)].id;
		$("#dialogConfirmListDelete").dialog("open");
	});
	
	$(".removeBlog").click(function (eventObject) {
		blogId = eventObject.currentTarget.id.split(".")[1];
		listId = bloglists[parseInt(eventObject.currentTarget.parentElement.parentElement.parentElement.parentElement.previousSibling.id)].id;
		sessionStorage.activeList = $("#accordion").accordion("option", "active");
		$("#dialogConfirmBlogDelete").dialog("open");
	});
	
	$(".addBlog").click(function (eventObject) {
		$("#dialogAddBlog").dialog("open");
		listId = bloglists[parseInt(eventObject.currentTarget.parentElement.parentElement.id)].id;
	});
	
	$("#selectAll").click(function(event) {
		var checked = false;
		if(event.currentTarget.checked) {
			checked = true;
		}
		else {
			checked = false;
		}
		
		$(".blogCheckbox").attr("checked", checked);
	});
}

function Blog(title, xmlUrl) {
	this.title = title;
	this.xmlUrl = xmlUrl;
}

function createBloglist (jsonList) {
	if (jsonList.body.outline === undefined) {
		return false;
	}
	
	if (jsonList.body.outline.length === undefined) {
		var list = jsonList.body.outline.outline;
		var bloglist = new Array();
		for (var i = 0; i < list.length; i++) {
			var blog = new Blog(list[i].title, list[i].xmlUrl);
			bloglist.push(blog);
		}
		return bloglist;
	}
	else {
		var bloglist = new Array();
		
		for (var i = 0; i < jsonList.body.outline.length; i++) {
			if (jsonList.body.outline[i].xmlUrl !== undefined) {
				bloglist.push(new Blog(jsonList.body.outline[i].title, jsonList.body.outline[i].xmlUrl));
			}
			else {
				for (var j = 0; j < jsonList.body.outline[i].outline.length; j++) {
					bloglist.push(new Blog(jsonList.body.outline[i].outline[j].title, jsonList.body.outline[i].outline[j].xmlUrl));
				}
			}
			
		}
		return bloglist;
	}
}

function createBloglistGreader(jsonList) {
	if(jsonList.subscriptions === undefined) {
		return false;
	}
	
	var bloglist = new Array();
	for (var i = 0; i < jsonList.subscriptions.length; i++) { 
		bloglist.push(new Blog(jsonList.subscriptions[i].title, jsonList.subscriptions[i].id.substring(5)));
	}
	return bloglist;
}






