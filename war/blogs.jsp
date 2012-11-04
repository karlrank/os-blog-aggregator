<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>

<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8">
<meta name="description" content="Book themed blog aggreator">
<link rel="stylesheet" href="style/style.css">
<link rel="stylesheet" href="style/menu.css">
<!--<link href="style/ui-lightness/jquery-ui-1.9.1.custom.css" rel="stylesheet">-->
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
<script type="text/javascript" src="js/jquery-1.8.2.js"></script>
<script src="js/jquery-ui-1.9.1.custom.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript" src="js/blogs.js"></script>
<script type="text/javascript">
    	google.load("feeds", "1");
    </script>
<title>Book Blog Aggreator</title>
</head>

<body class="blogs">
	<div id="addBlogWindow">
		<h3>Blog Feed URL</h3>
		<input type="text" size="80" id="blogUrlInput" maxlength="200"
			value=""> <br /> <a id="addBlogButton"
			href="javascript: void(0)" class="add">ADD BLOG</a> - <a
			id="cancelAddBlogButton" href="javascript: void(0)" class="add">CANCEL</a>
	</div>
	<header>
		<img id="logo" alt="Logo" src="img/logo.png" />

		<nav>

			<ul class="blue">
				<li><a href="/" title="HOME"><span>HOME</span></a></li>
				<li><a href="/top.htm" title="TOP"><span>TOP</span></a></li>
				<li><a href="blogs.jsp" title="MY BLOGS" class="current"><span>MY
							BLOGS</span></a></li>
				<li><a href="#" title="ABOUT"><span>ABOUT</span></a></li>
			</ul>
		</nav>
		<ul class="login blue">
			<%
		    UserService userService = UserServiceFactory.getUserService();
		    User user = userService.getCurrentUser();
		    if (userService.isUserLoggedIn()) {
			%>
			<li><a
				href="<%= userService.createLogoutURL(request.getRequestURI()) %>"
				title="Sign out"><span>SIGN OUT: <%= userService.getCurrentUser().getEmail() %></span></a></li>
			<%
				    } else {
				%>
			<li><a
				href="<%= userService.createLoginURL(request.getRequestURI()) %>"
				title="Sign in" class="current"><span>LOG IN</span></a></li>
			<%
				    }
				%>
		</ul>
	</header>
	<div id="main">
		<div id="blogsContainer">
			<br />
			<div id="accordion">
				<h3 id="0">First List<span class="bloglistbuttons"><a class="addBlog" href="javascript:void(0)">ADD BLOG</a> - <a href="javascript:void(0)">REMOVE LIST</a></span></h3>
				<div>
					<ul>
						<li>Blog 1 <span class="blogButtons"><a href="javascript:void(0)">EDIT TAGS</a><a href="javascript:void(0)">REMOVE BLOG</a></span></li>
						<li>Blog 2 <span class="blogButtons"><a href="javascript:void(0)">EDIT TAGS</a><a href="javascript:void(0)">REMOVE BLOG</a></span></li>
						<li>Blog 3 <span class="blogButtons"><a href="javascript:void(0)">EDIT TAGS</a><a href="javascript:void(0)">REMOVE BLOG</a></span></li>
					</ul>
				</div>
				<h3 id="1">Second List<span class="bloglistbuttons"><a class="addBlog" href="javascript:void(0)">ADD BLOG</a> - <a href="javascript:void(0)">REMOVE LIST</a></span></h3>
				<div><ul><li>Blog 1</li><li>Blog 2</li><li>Blog 3</li><li>Blog 1</li><li>Blog 2</li><li>Blog 3</li><li>Blog 1</li><li>Blog 2</li><li>Blog 3</li><li>Blog 1</li><li>Blog 2</li><li>Blog 3</li></ul></div>
				<h3 id="2">Third List<span class="bloglistbuttons"><a class="addBlog" href="javascript:void(0)">ADD BLOG</a> - <a href="javascript:void(0)">REMOVE LIST</a></span></h3>
				<div><ul><li>Blog 1</li><li>Blog 2</li><li>Blog 3</li></ul></div>
			</div>
			<br /> <a id="addlist" class="add" href="javascript:void(0)">ADD LIST</a>
			
			<div id="dialogAddBloglist" title="Add bloglist">
				<p class="validateTips"></p>
				<form>
					<fieldset>
						<label for="name">Bloglist name</label>
						<input type="text" name="name" id="name" class="text ui-widget-content ui-corner-all" />
					</fieldset>
				</form>
			</div>
			
			<div id="dialogAddBlog" title="Add blog">
				<div id="addBlogTabs">
			    <ul>
			        <li><a href="#tabs-1">Add by url</a></li>
			        <li><a href="#tabs-2">Direct import from Google Reader</a></li>
			        <li><a href="#tabs-3">OPML import</a></li>
			    </ul>
			    <div id="tabs-1">
			    	<p class="validateTips"></p>
					<form>
						<fieldset>
							<label for="blogName">Blog RSS feed URL</label>
							<input type="text" name="blogName" id="blogName" class="text ui-widget-content ui-corner-all" />
						</fieldset>
					</form>
			    </div>
			    <div id="tabs-2">
			    	<p class="validateTips">
			    		To import directly from google reader google account password is required. The password will not be saved nor used for anything else then this.
			    	</p>
					<form>
						<fieldset>
							<label for="googleAccountPassword">Google account password</label>
							<input type="password" name="googleAccountPassword" id="googleAccountPassword" class="text ui-widget-content ui-corner-all" />
						</fieldset>
					</form>
			    </div>
			    <div id="tabs-3">
			    	<p class="validateTips"></p>
					<form>
						<fieldset>
							<label for="OPML">Upload the file exported from google reader</label>
							<input type="file" name="OPML" id="OPML" class="text ui-widget-content ui-corner-all" />
						</fieldset>
					</form>
			    </div>
			</div>

			</div>
		</div>
	</div>
</body>
</html>
