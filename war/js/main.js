
var bloglist;
var entries;

function generatePostHtml(imgSrc, postTitle, postUrl, sourceUrl, sourceName, postText) {
	var div = document.createElement("div");
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
	var a2 = document.createElement("a");
	a2.href = sourceUrl;
	var span = document.createElement("span");
	span.className = "blogpost_source";
	span.innerHTML = sourceName;
	h2.appendChild(a1);
	$(h2).append(" - ");
	a2.appendChild(span);
	h2.appendChild(a2);
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
    
//    $(".blogpost").children("p").find("img:first").hide();
//    $(".blogpost").children("img:first").hide();
}


function init() {
	
	$.get("/login", function(result){
	    $("#login").html(result);
	  });
	
	$.get("/blogs", function(result){
    bloglist = jQuery.parseJSON(result);
    entries = new Array();
    
    for ( var i = 0; i < bloglist.length; i++) {
	    var feed = new google.feeds.Feed(bloglist[i]);
	    feed.setNumEntries(4);
	    feed.load(function(result) {
	    	if (!result.error) {
	    			entries = entries.concat(result.feed.entries);
	    			if (i == bloglist.length) {
	    				displayResults(entries);
	    			}
	    	}
	    });
	}
  });
}

window.onload = init;