<%@ page language="java" contentType="text/html; charset=ISO-8859-1"  pageEncoding="ISO-8859-1"%>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>

<!DOCTYPE html>

<html lang="en">
  <head>
  	<meta charset="utf-8">
	<meta name="description" content="Book themed blog aggreator">
	<link rel="stylesheet" href="style/style.css">
	<link rel="stylesheet" href="style/menu.css">
	<script type="text/javascript" src="js/jquery-1.8.2.js"></script>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
	<script type="text/javascript" src="js/main.js"></script>
	<script type="text/javascript">
    	google.load("feeds", "1");
    </script>
	<title>Book Blog Aggreator</title>
  </head>
  <body>
  
	 	
  	<header>
	  		<img id="logo" alt="Logo" src="img/logo.png" />
	  		
		  		<ul class="listSelect blue">
		  			<li><a href="#" title="Select list" id="selectList"><span>SELECT LIST</span></a></li>
		  		</ul>
	  		<nav>
	  		
	  		<ul class="blue">
				<li><a href="/" title="HOME" class="current"><span>HOME</span></a></li>
			    <li><a href="/top.htm" title="TOP"><span>TOP</span></a></li>
			    <li><a href="blogs.jsp" title="MY BLOGS"><span>MY BLOGS</span></a></li>
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
	  			<li><a href="<%= userService.createLogoutURL(request.getRequestURI()) %>" title="Sign out"><span>SIGN OUT: <%= userService.getCurrentUser().getEmail() %></span></a></li>
	  			<%
				    } else {
				%>
				<li><a href="<%= userService.createLoginURL(request.getRequestURI()) %>" title="Sign in" class="current"><span>LOG IN</span></a></li>
				<%
				    }
				%>
	  		</ul>
	  	</header>
	  	<div id="main">
  			<div id="postContainer"></div>
  	</div>
  </body>
</html>
