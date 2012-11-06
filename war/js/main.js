
var bloglists;
var entries;

function init() {
	
	$.get("/bloglists", function(result){
		bloglists = $.parseJSON(result);
		var selectedList = 0;
		
		if (bloglists !== null) {
			for (var i = 0; i < bloglists.length; i++) {
				if (i == selectedList) {
					$("#selection").append('<option selected="selected" value="' + i + '">' + bloglists[i].name + '</option>');
				}
				else {
					$("#selection").append('<option value="' + i + '">' + bloglists[i].name + '</option>');
				}
			}
			
			
			$(".list").click(function (event) {
				displayBlogs(bloglists, event.currentTarget.id.split(".")[1]);
				$(".list").removeClass("current");
				$(event.currentTarget).addClass("current");
			});
			
			$("#selection").change(function(event) {
				listId = event;
				displayBlogs(bloglists, $("#selection option:selected").val());
			});
	    
			
			displayBlogs(bloglists, selectedList);
		}
		
  });
}

window.onload = init;


function displayBlogs (bloglists, selectedList) {
	
	var numToLoad = 7;
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
	a1.href = postUrl + "?utm_source=osblogaggregator";
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
    	var imgsrc = undefined;
    	try {
    		imgsrc = $(entry.content).find('img').eq(0).attr('src');
    	  }
    	catch(err) {}
    	
    	container.appendChild(generatePostHtml(imgsrc, entry.title, entry.link, "sourceUrl", entry.author, entry.content + entry.publishedDate));    	  
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
    $(".blogpost table").hide();
    $(".blogpost img:nth-child(1)").hide();
    $(".blogpost_image").css("max-width", "150px")
}












