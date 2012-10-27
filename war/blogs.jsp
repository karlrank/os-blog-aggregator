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
<style>
	body{
		font: 62.5% "Arial", sans-serif;
	}
	.lolwut {
		float: right;
	}
	body { font-size: 62.5%; }
        label, input { display:block; }
        input.text { margin-bottom:12px; width:95%; padding: .4em; }
        fieldset { padding:0; border:0; margin-top:25px; }
        h1 { font-size: 1.2em; margin: .6em 0; }
        div#users-contain { width: 350px; margin: 20px 0; }
        div#users-contain table { margin: 1em 0; border-collapse: collapse; width: 100%; }
        div#users-contain table td, div#users-contain table th { border: 1px solid #eee; padding: .6em 10px; text-align: left; }
        .ui-dialog .ui-state-error { padding: .3em; }
        .validateTips { border: 1px solid transparent; padding: 0.3em; }
	</style>
</head>

<body>
	<div id="darken"></div>
	<div id="addListWindow">
		<h3>Bloglist name</h3>
		<input type="text" size="30" id="listName" maxlength="32" value="">
		<br /> <a id="addListButton" href="javascript: void(0)" class="add">ADD
			LIST</a> - <a id="cancelAddListButton" href="javascript: void(0)"
			class="add">CANCEL</a>
	</div>
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
			<!--  
	  			<a href="/">HOME</a> |
				<a href="/top/">TOP</a> |
				<a href="/blogs.jsp">MY BLOGS</a> |
				<a id="tere" href="">ABOUT</a> |
				<span id="login"><a href="/login/">LOG IN</a></span>
				-->
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
			<h2>MY BLOGS</h2>
			<br />
			<div id="accordion">
				<h3>First List<span class="lolwut"><a href="javascript:void(0)">ADD BLOG</a> - <a href="javascript:void(0)">REMOVE LIST</a></span></h3>
				<div><ul><li>Blog 1</li><li>Blog 2</li><li>Blog 3</li></ul></div>
				<h3>Second List<span class="lolwut"><a href="javascript:void(0)">ADD BLOG</a> - <a href="javascript:void(0)">REMOVE LIST</a></span></h3>
				<div><ul><li>Blog 1</li><li>Blog 2</li><li>Blog 3</li></ul></div>
				<h3>Third List<span class="lolwut"><a href="javascript:void(0)">ADD BLOG</a> - <a href="javascript:void(0)">REMOVE LIST</a></span></h3>
				<div><ul><li>Blog 1</li><li>Blog 2</li><li>Blog 3</li></ul></div>
			</div>
			<br /> <a id="addlist" class="add" href="javascript:void(0)">ADD LIST</a>
			<div id="dialog" title="Add bloglist">
				<p class="validateTips"></p>
				<form>
					<fieldset>
						<label for="name">Bloglist name</label>
						<input type="text" name="name" id="name" class="text ui-widget-content ui-corner-all" />
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</body>
</html>
