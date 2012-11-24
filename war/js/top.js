
var counter = 0;
var counter2 = 0;

function init() {
	$( "#tabs" ).tabs();
	
	if (isLoggedIn()) {
		for ( var i = 0; i < suggestions.length; i++) {
		    var feed = new google.feeds.Feed(suggestions[i].xmlUrl);
		    feed.setNumEntries(0);
		    counter ++;
		    feed.load(function(result) {
		    	if (!result.error) {
		    		addLink(suggestions, result.feed.feedUrl, result.feed.link, result.feed.description);
		    		counter--;
		    		if (counter == 0) {displayResultsSuggested();}
		    	}
		    });
		}
	}
	else {
		$("#tabs-2").html("Log in to see suggestions.");
	}
	
	
	for ( var i = 0; i < popular.length; i++) {
	    var feed = new google.feeds.Feed(popular[i].xmlUrl);
	    feed.setNumEntries(0);
	    counter2 ++;
	    feed.load(function(result) {
	    	if (!result.error) {
	    		addLink(popular, result.feed.feedUrl, result.feed.link, result.feed.description);
	    		counter2--;
	    		if (counter2 == 0) {displayResultsPopular();}
	    	}
	    });
	}
	
}

window.onload = init;

function addLink(list, xmlUrl, link, descr) {
	for ( var i = 0; i < list.length; i++) {
		if (list[i].xmlUrl == xmlUrl) {
			list[i].htmlUrl = link;
			list[i].description = descr;
			break;
		}
	}
}

function displayResultsSuggested() {
	for ( var i = 0; i < suggestions.length; i++) {
		$("#tabs-2-ol").append('<li><a title="' + suggestions[i].description + '" target="_blank" href="' + suggestions[i].htmlUrl + '">' + suggestions[i].title + '</a> <a id="popular.' + i + '" class="addBlogSuggested">ADD</a></li>');
	}
	$("#tabs-2").tooltip();
	$(".addBlogSuggested").button();
	$(".addBlogSuggested").click(function(eventObject) {
		var blog = suggestions[eventObject.currentTarget.id.split(".")[1]];
		window.location = "/my-blogs?action=addBlog&blogId=" + blog.id;
	});
}

function displayResultsPopular() {
	for ( var i = 0; i < popular.length; i++) {
		$("#tabs-1-ol").append('<li><a title="' + popular[i].description + '" target="_blank" href="' + popular[i].htmlUrl + '">' + popular[i].title + '</a> <a id="popular.' + i + '" class="addBlogPopular">ADD</a></li>');
	}
	$("#tabs-1").tooltip();
	$(".addBlogPopular").button();
	$(".addBlogPopular").click(function(eventObject) {
		var blog = popular[eventObject.currentTarget.id.split(".")[1]];
		window.location = "/my-blogs?action=addBlog&blogId=" + blog.id;
	});
}

function isLoggedIn() {
	if($(".login li a").attr("title") === "Sign out") {
		return true;
	}
	else if ($(".login li a").attr("title") === "Sign in") {
		return false;
	}
}

