
var bloglists;
var entries;

function init() {
	
	$.get("/bloglists", function(result){
		bloglists = $.parseJSON(result);
		var selectedList = 0;
		
		if (bloglists !== null) {
			for (var i = 0; i < bloglists.length; i++) {
				if (i == selectedList) {
					$(".listSelect").append('<li><a id="listitem.' + i + '" href="javascript:void(0)" title="Select list" class="list current"><span>' + bloglists[i].name + '</span></a></li>');
				}
				else {
					$(".listSelect").append('<li><a id="listitem.' + i + '" href="javascript:void(0)" title="Select list" class="list"><span>' + bloglists[i].name + '</span></a></li>');
				}
			}
			
			
			$(".list").click(function (event) {
				displayBlogs(bloglists, event.currentTarget.id.split(".")[1]);
				$(".list").removeClass("current");
				$(event.currentTarget).addClass("current");
			});
	    
			
			displayBlogs(bloglists, selectedList);
		}
		
  });
	
	res();
	$(window).resize(res);
}

window.onload = init;


function displayBlogs (bloglists, selectedList) {
	
	var numToLoad = 4;
	var bloglist = new Array();
	for (var i = 0; i < bloglists[selectedList].blogs.length; i++) {
		bloglist.push(bloglists[selectedList].blogs[i].xmlUrl);
		
	}
    entries = new Array();
    
    for ( var i = 0; i < bloglist.length; i++) {
	    var feed = new google.feeds.Feed(bloglist[i]);
	    feed.setNumEntries(numToLoad);
	    feed.load(function(result) {
	    	if (!result.error) {
	    			entries = entries.concat(result.feed.entries);
	    			if (entries.length == bloglist.length * numToLoad) {
	    				displayResults(entries);
	    			}
	    	}
	    });
	}
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

function generatePostHtml(imgSrc, postTitle, postUrl, sourceUrl, sourceName, postText) {
	var div = document.createElement("div");
	var a = document.createElement("a");
	a.href = "javascript:void(0)";
	a.className = "more";
	a.innerHTML = "MORE";
	div.appendChild(a);
	a = document.createElement("a");
	a.href = "javascript:void(0)";
	a.className = "less";
	a.innerHTML = "LESS";
	div.appendChild(a);
	div.className = "blogpost";
	var img = document.createElement("img");
	
	if( imgSrc != undefined) {
		img.src = imgSrc;
		img.alt = "Blog post image";
		img.className = "blogpost_image";
		div.appendChild(img);
	}
	
	var h2 = document.createElement("h2");
	var a1 = document.createElement("a");
	a1.href = postUrl;
	a1.innerHTML = postTitle;
	var span = document.createElement("span");
	span.className = "blogpost_source";
	span.innerHTML = sourceName;
	h2.appendChild(a1);
	$(h2).append(" - ");
	h2.appendChild(span);
	div.appendChild(h2);	

	$(div).append(postText);
	
	return div;
}

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function slidePostDown(element) {
	var height = $(tere).css("height", "auto").height();
	$(tere).css("height", "90px");
	$(tere).animate({height: height + 'px'}, 1000);
}

function sortfunction(a, b) {
	var ad = new Date(a.publishedDate);
	var bd = new Date(b.publishedDate);
	
	if (ad > bd) {
		return -1;
	}
	else if(ad < bd) {
		return 1;
	}
	else {
		return 0;
	}
}

function displayResults(entries) {
	entries.sort(sortfunction);
	
	
    var container = document.getElementById("postContainer");
    $(container).html("");
    for ( var i = 0; i < entries.length; i++) {
    	var entry = entries[i];
    	container.appendChild(generatePostHtml($(entry.content).find('img').eq(0).attr('src'), entry.title, entry.link, "sourceUrl", entry.author, entry.content + entry.publishedDate));    	  
    }
    container.appendChild(document.createElement("br"));
    
    $(".more").click(function(event) {
		  var targetPost = event.currentTarget.parentNode;
		  
		  if ($(targetPost).height() == 120) {
			  var height = $(targetPost).css("height", "auto").height();
				$(targetPost).css("height", "120px");
				$(targetPost).animate({height: height + 'px'}, 500);
				event.currentTarget.innerHTML = "LESS";
				$(targetPost).children(".less").show(500);
		  }
		  else {
			$(targetPost).animate({height: '120px'}, 500);
			$(targetPost).children(".less").hide(500);
			event.currentTarget.innerHTML = "MORE";
		  }
		});
    
    $(".less").click(function(event) {
		  var targetPost = event.currentTarget.parentNode;
		  $(targetPost).children(".more").html("MORE");
			$(targetPost).animate({height: '120px'}, 500);
			$(event.currentTarget).hide();
		});
//    $(".blogpost div").hide();
    $(".blogpost table").hide();
    $(".blogpost img:nth-child(1)").hide();
}












