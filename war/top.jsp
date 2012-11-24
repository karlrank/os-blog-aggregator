<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="com.google.appengine.api.users.User"%>
<%@ page import="com.google.appengine.api.users.UserService"%>
<%@ page import="com.google.appengine.api.users.UserServiceFactory"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="utf-8">
<meta name="description" content="Book themed blog aggreator">
<link rel="stylesheet" href="style/style.css">
<link rel="stylesheet" href="style/menu.css">
<link rel="stylesheet" 	href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
<script type="text/javascript" src="js/lib/jquery-1.8.2.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="js/lib/jquery-ui-1.9.1.custom.js"></script>
<script type="text/javascript" src="js/top.js"></script>
<script type="text/javascript">
    	google.load("feeds", "1");
    	var suggestions = new Array();
    	var blog;
    	<c:forEach var="suggestedBlog" items="${suggested}">
    		blog = new Object();
    		blog.id = "${suggestedBlog.id}";
    		blog.title = "${suggestedBlog.title}";
    		blog.xmlUrl = "${suggestedBlog.xmlUrl}";
    		blog.rating = "${suggestedBlog.rating}";
	    	suggestions.push(blog);
    	</c:forEach>
    	
    	var popular = new Array();
    	<c:forEach var="popularBlog" items="${popular}">
			blog = new Object();
			blog.id = "${popularBlog.id}";
			blog.title = "${popularBlog.title}";
			blog.xmlUrl = "${popularBlog.xmlUrl}";
	    	popular.push(blog);
		</c:forEach>
    	
</script>
    
<title>Book Blog Aggreator</title>
</head>

<body class="blogs">
	<header>
		<img id="logo" alt="Logo" src="img/logo.png" />

		<nav>

			<ul class="blue">
				<li><a href="/" title="HOME"><span>HOME</span></a></li>
				<li><a href="/top" title="TOP" class="current"><span>TOP</span></a></li>
				<li><a href="my-blogs" title="MY BLOGS" ><span>MY BLOGS</span></a></li>
				<li><a href="/about" title="ABOUT"><span>ABOUT</span></a></li>
			</ul>
		</nav>
		<ul class="login blue">
			<%
				UserService userService = UserServiceFactory.getUserService();
				User user = userService.getCurrentUser();
				if (userService.isUserLoggedIn()) {
				
			%>
			<li><a
				href="${logoutURL}"
				title="Sign out"><span>SIGN OUT: ${userEmail}</span></a></li>
			<%
				} else {
			%>
			<li><a
				href="${loginURL}"
				title="Sign in" class="current"><span>LOG IN</span></a></li>
			<%
				}
			%>
		</ul>
	</header>

	<div id="main">
		<div id="blogsContainer">
			<div id="tabs">
				<ul>
			        <li><a href="#tabs-1">Popular blogs</a></li>
			        <li><a href="#tabs-2">Blogs suggested to you</a></li>
			    </ul>
			    <div id="tabs-1">
			    	<h1>TOP BLOGS</h1>
			    	<ol id = tabs-1-ol></ol>
			    </div>
			    <div id="tabs-2">
			    	<ol id = tabs-2-ol></ol>
			    </div>
		    </div>
		</div>
	</div>
	
	<div id="dialogError" title="Error">
		<p class="validateTips" id="validateTipsError"></p>
	</div>
	
</body>
</html>



















