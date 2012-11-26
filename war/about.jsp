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
<link rel="stylesheet" 	href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
<script type="text/javascript" src="js/lib/jquery-1.8.2.js"></script>
<script src="js/lib/jquery-ui-1.9.1.custom.js"></script>

<title>Book Blog Aggreator</title>
</head>

<body class="blogs">
	<header>
		<img id="logo" alt="Logo" src="img/logo.png" />

		<nav>

			<ul class="blue">
				<li><a href="/" title="HOME"><span>HOME</span></a></li>
				<li><a href="/top" title="TOP"><span>TOP</span></a></li>
				<li><a href="my-blogs" title="MY BLOGS" ><span>MY BLOGS</span></a></li>
				<li><a href="/about" title="ABOUT" class="current"><span>ABOUT</span></a></li>
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
			<h1>About book blog aggregator</h1>
			<p>The book blog aggregator is an open source blog 					aggregator, intended for blogs about books</p>
			<p>It was created by a team constisting of Karl, Marko, Arvi 			and Gustav. We created it within the course of Software 				Project of the University of Tartu in 2012.  </p>
			<p>Whole idea of the project came from Toivo Ellakvere. </p>
		</div>
	</div>
	
	<div id="dialogError" title="Error">
		<p class="validateTips" id="validateTipsError"></p>
	</div>
	
</body>
</html>



















