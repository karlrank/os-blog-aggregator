
var bloglist;
var test;

function generatePostHtml(imgSrc, postTitle, postUrl, sourceUrl, sourceName, postText) {
	var div = document.createElement("div");
	div.className = "blogpost";
	var img = document.createElement("img");
	img.src = imgSrc;
	img.alt = "Blog post image";
	img.className = "blogpost_image";
	div.appendChild(img);

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


function init() {
	
	$.get("/login", function(result){
	    $("#login").html(result);
	  });
	
	$.get("/blogs", function(result){
    bloglist = jQuery.parseJSON(result);
    
    var feed = new google.feeds.Feed(bloglist[0]);

    feed.load(function(result) {
    	if (!result.error) {
    		var container = document.getElementById("left");

    		for ( var i = 0; i < result.feed.entries.length; i++) {

    			var entry = result.feed.entries[i];
    			test = result.feed.entries;
    			
    			container.appendChild(generatePostHtml($(entry.content).find('img').eq(0).attr('src'), entry.title, entry.link, "sourceUrl", entry.author, entry.content));
    		}
    	}
    });
    
    
    
  });
}

window.onload = init;