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
		  			<form action="">
		  				<label for="selection">Select List</label>
						<select id="selection" name="selection">
						</select>
					</form>
		  		</ul>
	  		<nav>
	  		
	  		<ul class="blue">
				<li><a href="/" title="HOME" class="current"><span>HOME</span></a></li>
			    <li><a href="/top" title="TOP"><span>TOP</span></a></li>
			    <li><a href="my-blogs" title="MY BLOGS"><span>MY BLOGS</span></a></li>
			    <li><a href="/about" title="ABOUT"><span>ABOUT</span></a></li>
			</ul>
	  		</nav>
	  		<ul class="login blue">
	  		<%
		    UserService userService = UserServiceFactory.getUserService();
		    User user = userService.getCurrentUser();
		    if (userService.isUserLoggedIn()) {
			%>
	  			<li><a href="${logoutURL}" title="Sign out"><span>SIGN OUT: ${userEmail}</span></a></li>
	  			<%
				    } else {
				%>
				<li><a href="${loginURL}" title="Sign in" class="current"><span>LOG IN</span></a></li>
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
