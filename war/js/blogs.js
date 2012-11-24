
var bloglists;
var inputBlogs;
var bloglistToBeAdded;
var entries;
var blogId;
var listId;
var sent = 0;
var blog;
var tags;
var rawTags;
var userTags;
var noRepeatPress = false;
var editingUserTags = false;

function init() {
	
	$("#dialogCopySharelink").dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		width: 500,
		buttons: {
            "Done": function() {
            	$( this ).dialog( "close" );
            },
        },
        open: function() {
        	$("#sharelink").select();
        },
        close: function() {
        	$("#sharelink").val("");
        }
	});
	
	$("#dialogCopySharelink").keypress(function(e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
        	$("#dialogCopySharelink").parent().find("button:eq(0)").trigger("click");
          return false;
        }
      });
	
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
        open: function() { },
        close: function() {
        }
	});
	
	$("#dialogConfirmBlogDelete").keypress(function(e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
        	$("#dialogConfirmBlogDelete").parent().find("button:eq(0)").trigger("click");
          return false;
        }
      });
	
	$("#dialogError").dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		buttons: {
            "OK": function() {
            	$( this ).dialog( "close" );
            }
        },
        open: function() { },
        close: function() {
        }
	});
	
	$("#dialogError").keypress(function(e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
        	$("#dialogError").parent().find("button:eq(0)").trigger("click");
          return false;
        }
      });
	
	$("#dialogConfirmBloglistAdd").dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		buttons: {
            "Add shared bloglist": function() {
            	blogs = bloglistToBeAdded;
            	$("#validateTipsBloglistAdd").html('<img src="img/ajax-loader.gif" alt="loading">');
            	$.post("/listmanager", { action: "addList", listName: blogs.name }, function (addListResult) {
                	sessionStorage.activeList = bloglists.length - 2;
                	sent = 0;
                	for ( var i = 0; i < blogs.list.length; i++) {
                		sent++;
						$.post("/listmanager", { action: "addBlog", listId: addListResult, blogId: blogs.list[i]} , function() {
							sent--;
							if (sent == 0) {
								location = "/my-blogs";
							}
    	    			});
					}
                });
            	
            	
            	
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        open: function() { },
        close: function() {
        }
	});
	
	$("#dialogConfirmBloglistAdd").keypress(function(e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
        	$("#dialogConfirmBloglistAdd").parent().find("button:eq(0)").trigger("click");
          return false;
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
        open: function() {},
        close: function() {
        }
	});
	$("#dialogConfirmListDelete").keypress(function(e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
        	$("#dialogConfirmListDelete").parent().find("button:eq(0)").trigger("click");
          return false;
        }
      });
	
	$("#dialogEditTags").dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		buttons: {
            "Done": function() {
                $( this ).dialog( "close" );
            }
        },
        open: function() {            
            $(".tagRemove").button();
          },
        close: function() {
        	$("#tags").val("");
        	var blogs = document.getElementById("addMultipleBlogsUL");
        	blogs.innerHTML = "";
        }
	});
	$("#tags").keypress(function(e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
      	  $("#addTagButton").trigger("click");
          return false;
        }
      });
	
	$("#dialogAddMultipleBlogs").dialog({
		autoOpen: false,
		modal: true,
		resizable: false,
		buttons: {
            "Add blogs": function() {
            	var blogs = document.getElementById("addMultipleBlogsUL");
            	
            	sent = 0;
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
        open: function() {},
        close: function() {
        	var blogs = document.getElementById("addMultipleBlogsUL");
        	blogs.innerHTML = "";
        }
	});
	$("#dialogAddMultipleBlogs").keypress(function(e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
        	$("#dialogAddMultipleBlogs").parent().find("button:eq(0)").trigger("click");
          return false;
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
                    	sessionStorage.activeList = bloglists.length - 2;
                    	location.reload();
                    });
                }
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        open: function() {},
        close: function() {
        	var name = $("#name");
            name.removeClass( "ui-state-error" );
            document.getElementById("name").value = "";
            var tips = $(".validateTips");
            tips.text("");
        }
    });
	$("#dialogAddBloglist").keypress(function(e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
        	$("#dialogAddBloglist").parent().find("button:eq(0)").trigger("click");
          return false;
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
	            				}
	            				$("#dialogAddMultipleBlogs").dialog("open");
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
        open: function() {},
        close: function() {
        }
    });
	$("#dialogAddBlog").keypress(function(e) {
        if (e.keyCode == $.ui.keyCode.ENTER) {
        	$("#dialogAddBlog").parent().find("button:eq(0)").trigger("click");
          return false;
        }
      });
	
	manageSharing();
	
	$.getJSON("/tags", {action:"getAllTags"}, function(result) {
		tags = result;
		rawTags = [];
		
		for (var i = 0;i < tags.length;i++) {
			rawTags.push(tags[i].name.toLowerCase());
		}
		$( "#tags" ).autocomplete({
            source: rawTags
        });
	});
	
	$.getJSON("/tags", {action:"getUsersTags"}, function(result) {
		userTags = result;
	});
	
	$.get("/bloglists", function(result) {
		bloglists = $.parseJSON(result);
		
		if (bloglists.length == 2 && !isLoggedIn()) {
			$("#accordion").html("Log in to manage your bloglists.");
			$("#addlist").hide();
			$("#editIntrests").hide();
		}
		else if (bloglists.length == 2 && isLoggedIn()) {
			$("#accordion").html("You currently have no bloglists. Start by creating some.");
		}
		else {
			for (var i = 2; i < bloglists.length; i++) {
				$("#accordion").append(createListRow(i, bloglists[i].name));
				var div = document.createElement("div");
				var ul = document.createElement("ul");
					div.appendChild(ul);
				
				for (var j = 0; j < bloglists[i].blogs.length; j++) {
					var li = document.createElement("li");
					li.innerHTML = bloglists[i].blogs[j].title + ' <span class="blogButtons"><a class="editTags" href="javascript:void(0)">EDIT TAGS</a><a class="removeBlog" id="blog.' + bloglists[i].blogs[j].id + '.' + i + '.' + j + '" href="javascript:void(0)">REMOVE BLOG</a></span>';
					ul.appendChild(li);
				}
					$("#accordion").append(div);
			}
		}
		
		addClickListeners();
	});
	$(".add").button();
	$("#addlist").click(function () {
		$( "#dialogAddBloglist" ).dialog( "open" );
	});
	
	$("#editIntrests").click(function (eventObject) {
		$("#editTagsUL").html("");
		for (var i = 0;i < userTags.length;i++) {
			$("#editTagsUL").append('<li>' + decodeURIComponent(userTags[i].name) + ' <span id="tagRemove.' + i + '" class="tagRemove">REMOVE</span></li>');
		}
		editingUserTags = true;
		addTagRemoveListener();
		$("#dialogEditTags").dialog("option", "title", "Editing your intrests.");
		$("#dialogEditTags").dialog("open");
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
	h3.innerHTML = listName + '<span class="bloglistbuttons"><a class="shareList" href="javascript:void(0)">SHARE LIST</a><a class="addBlog" href="javascript:void(0)">ADD BLOG</a><a class="removeList" href="javascript:void(0)">REMOVE LIST</a></span>';
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

function addTagToBlog(tag, blogId) {
	var out = "";
	for (var i = 1;i < bloglists.length; i++) {
		for (var j = 0;j < bloglists[i].blogs.length; j++) {
			if(bloglists[i].blogs[j].id == blogId) {
				out = out + i + "." + j + "." + bloglists[i].blogs[j].tags.length;
				bloglists[i].blogs[j].tags.push(tag);
				return out;
			}
		}
	}
}

function addTagToUser(tag) {
	userTags.push(tag);
	return (userTags.length - 1);
}

function addTagRemoveListener() {
	$(".tagRemove").unbind("click");
	if(editingUserTags) {
		$(".tagRemove").click(function(eventObject) {
			var tagId = userTags[eventObject.currentTarget.id.split(".")[1]].id;
			var tagName = userTags[eventObject.currentTarget.id.split(".")[1]].name;
			$.post("/tagmanager", {action: "removeTagFromUser", tagId: tagId, tagName: tagName});
			$(eventObject.currentTarget.parentElement).css("display", "none");
			userTags.splice(eventObject.currentTarget.id.split(".")[1], 1);
			
			$("#editTagsUL").html("");
			for (var i = 0;i < userTags.length;i++) {
				$("#editTagsUL").append('<li>' + userTags[i].name + ' <span id="tagRemove.' + i + '" class="tagRemove">REMOVE</span></li>');
			}
			
			addTagRemoveListener();
			$(".tagRemove").button();		
		});
	}
	else {
		$(".tagRemove").click(function(eventObject) {
			rawBloglistId = eventObject.currentTarget.id.split(".")[1];
			rawBlogId = eventObject.currentTarget.id.split(".")[2];
			rawTagId = eventObject.currentTarget.id.split(".")[3];
			$.post("/tagmanager", {action: "removeTagFromBlog", tagId: bloglists[rawBloglistId].blogs[rawBlogId].tags[rawTagId].id, tagName: bloglists[rawBloglistId].blogs[rawBlogId].tags[rawTagId].name, blogId: bloglists[rawBloglistId].blogs[rawBlogId].id});
			$(eventObject.currentTarget.parentElement).css("display", "none");
			bloglists[rawBloglistId].blogs[rawBlogId].tags.splice(rawTagId, 1);

			blog = bloglists[rawBloglistId].blogs[rawBlogId];
			$("#editTagsUL").html("");
			for (var i = 0;i < blog.tags.length;i++) {
				$("#editTagsUL").append('<li>' + blog.tags[i].name + ' <span id="tagRemove.' + rawBloglistId + '.' + rawBlogId + '.' + i +'" class="tagRemove">REMOVE</span></li>');
			}
			addTagRemoveListener();
			$(".tagRemove").button();		
		});
	}
}

function blogHasTag(blogId, tagName) {
	for (var i = 1;i < bloglists.length; i++) {
		for (var j = 0;j < bloglists[i].blogs.length; j++) {
			if(bloglists[i].blogs[j].id == blogId) {
				for (var k = 1;k < bloglists[i].blogs[j].tags.length; k++) {
					if(bloglists[i].blogs[j].tags[k].name.toLowerCase() == tagName) {
						return true;
					}
				}
				return false;
			}
		}
	}
	
	return false;
}

function userHasTag(tagName) {
	for (var i = 0;i < userTags.length; i++) {
		if(userTags[i].name.toLowerCase() == tagName) {
			return true;
		}
	}
	return false;
}

function addClickListeners() {
	$(".blogButtons a").button();
	$(".tags a").button();
	$( "#accordion" ).accordion({heightStyle: "content", active: parseInt(sessionStorage.activeList)});
	$(".bloglistbuttons a").button();
	
	$("#addTagButton").click(function(eventObject) {
		tagName = $("#tags").attr("value");
		if (tagName == "") {
			return;
		}
		else {
			tagName = encodeURIComponent(tagName.toLowerCase());
		}
		tagRawId = $.inArray(tagName, rawTags);
		if (tagRawId != -1) {
			tagId = tags[tagRawId].id;
		}
		else {
			tagId = -1;
		}
		if (blogHasTag(blogId, tagName) && !editingUserTags) {
			return;
		}
		if (userHasTag(tagName) && editingUserTags) {
			return;
		}
		$("#editTagsInfo").html('<img src="img/ajax-loader.gif" alt="loading">');
		$("#addTagButton").button({disabled : true});
		if (editingUserTags) {
			$.post("/tagmanager", {action: "addTagToUser", tagId: tagId, tagName: tagName}, function (result) {
				if (result != "") {
					tags.push($.parseJSON('{"id":' + result + ',"name":"' + tagName + '"}'));
					$("#editTagsUL").append('<li>' + decodeURIComponent(tagName) + ' <span id="tagRemove.' + addTagToUser(tags[tags.length - 1]) +'" class="tagRemove">REMOVE</span></li>');
					$(".tagRemove").button();
					addTagRemoveListener();
				}
				else {
					$("#editTagsUL").append('<li>' + decodeURIComponent(tagName) + ' <span id="tagRemove.' + addTagToUser(tags[tagRawId]) +'" class="tagRemove">REMOVE</span></li>');
					$(".tagRemove").button();
					addTagRemoveListener();
				}
				$("#editTagsInfo").html('');
				$("#addTagButton").button({disabled : false});
			});
		}
		else {
			$.post("/tagmanager", {action: "addTagToBlog", tagId: tagId, tagName: tagName, blogId: blogId}, function (result) {
				if (result != "") {
					tags.push($.parseJSON('{"id":' + result + ',"name":"' + tagName + '"}'));
					$("#editTagsUL").append('<li>' + decodeURIComponent(tagName) + ' <span id="tagRemove.' + addTagToBlog(tags[tags.length - 1], blogId) +'" class="tagRemove">REMOVE</span></li>');
					$(".tagRemove").button();
					addTagRemoveListener();
				}
				else {
					$("#editTagsUL").append('<li>' + decodeURIComponent(tagName) + ' <span id="tagRemove.' + addTagToBlog(tags[tagRawId], blogId) +'" class="tagRemove">REMOVE</span></li>');
					$(".tagRemove").button();
					addTagRemoveListener();
				}
				$("#editTagsInfo").html('');
				$("#addTagButton").button({disabled : false});
			});
		}
		
	});
	
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
	
	$(".editTags").click(function (eventObject) {
		editingUserTags = false;
		id = eventObject.currentTarget.parentElement.children[1].id;
		blogId = id.split(".")[1];
		bloglistId = id.split(".")[2];
		blogNativeId = id.split(".")[3];
		blog = bloglists[bloglistId].blogs[id.split(".")[3]];
		$("#editTagsUL").html("");
		for (var i = 0;i < blog.tags.length;i++) {
			$("#editTagsUL").append('<li>' + decodeURIComponent(blog.tags[i].name) + ' <span id="tagRemove.' + bloglistId + '.' + blogNativeId + '.' + i +'" class="tagRemove">REMOVE</span></li>');
		}
		addTagRemoveListener();
		$("#dialogEditTags").dialog("option", "title", "Editing " + blog.title + "-s tags.");
		$("#dialogEditTags").dialog("open");
	});
	
	$(".addBlog").click(function (eventObject) {
		$("#dialogAddBlog").dialog("open");
		listId = bloglists[parseInt(eventObject.currentTarget.parentElement.parentElement.id)].id;
	});
	
	$(".shareList").click(function (eventObject) {
//		$("#dialogAddBlog").dialog("open");
		list = bloglists[parseInt(eventObject.currentTarget.parentElement.parentElement.id)];
		
		if (list.blogs.length > 0) {
			var blogIds = new Array();
			for (var i = 0;i < list.blogs.length;i++) {
				blogIds.push(list.blogs[i].id);
			}
			var info = {};
			info.name = list.name;
			info.list = blogIds;
			var siteURL = "http://osblogaggregator.appspot.com/my-blogs?ids=";
			var shareURL = siteURL + encodeURIComponent(JSON.stringify(info));
			$("#sharelink").val(shareURL);
			$("#dialogCopySharelink").dialog("open");
		}
		else {
			$("#validateTipsError").html("Cannot share empty bloglist.");
			$("#validateTipsError").addClass( "ui-state-highlight" );
			setTimeout(function() {
				$("#validateTipsError").removeClass( "ui-state-highlight", 1500 );
		    }, 500 );
			$("#dialogError").dialog("open");
		}
		
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

function manageSharing() {
	var prmstr = window.location.search.substr(1);
	var prmarr = prmstr.split ("&");
	var params = {};

	for ( var i = 0; i < prmarr.length; i++) {
	    var tmparr = prmarr[i].split("=");
	    params[tmparr[0]] = tmparr[1];
	}
	
	if ((params.ids != undefined) && isLoggedIn()) {
		var blogs;
		try {
			blogs = $.parseJSON(decodeURIComponent(params.ids)); }
		catch(err) {
			blogs = undefined;}
		
		if (blogs !== undefined) {
			bloglistToBeAdded = blogs;
			$("#dialogConfirmBloglistAdd").dialog("open");
			$("#validateTipsBloglistAdd").html("Are you sure you want to add the shared bloglist: " + blogs.name + " ?");
		}
		else {
			$(".ui-dialog-buttonpane button:contains('Add shared bloglist')").button("disable");
			$("#dialogConfirmBloglistAdd").dialog("open");
			$("#validateTipsBloglistAdd").html("URL malformed please check the sharing link.");
			$("#validateTipsBloglistAdd").addClass( "ui-state-highlight" );
			setTimeout(function() {
				$("#validateTipsBloglistAdd").removeClass( "ui-state-highlight", 1500 );
		    }, 500 );
		}
			
	}
	else if ((params.action != undefined) && params.action == "addBlog" && isLoggedIn()) {
		//ava dialoog, küsi bloglisti nime kuhu addida. Addi!!
	}
	else if ((params.ids != undefined) && !isLoggedIn()){
		$("#accordion").html("Log in to accept the shared bloglist.");
	}
	else if ((params.action != undefined) && params.action == "addBlog" && !isLoggedIn()){
		$("#accordion").html("Log in to add the blog.");
	}
}

