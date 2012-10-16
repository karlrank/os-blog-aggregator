package ee.bookblogaggregator;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.rdbms.AppEngineDriver;

import com.google.gson.*;

public class BlogsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static Gson gson;

	public BlogsServlet() {
		super();
		gson = new Gson();
		// TODO Auto-generated constructor stub
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		UserService userService = UserServiceFactory.getUserService();

		response.setContentType("text/html");
		if (userService.isUserLoggedIn()) {

			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager
						.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");

				String statement = "select title,htmlUrl,xmlUrl from blog where id IN (select BLOG_ID from blog_bloglist where BLOGLIST_ID IN (select id from bloglist where listName=(select listName from bloglist where id=(select selectedList from user where email='" + request.getUserPrincipal().getName() + "')) and id IN (select BLOGLIST_ID from user_bloglist where USER_ID IN (select id from user where email='" + request.getUserPrincipal().getName() + "'))));";
				PreparedStatement stmt = c.prepareStatement(statement);
				ResultSet rs = stmt.executeQuery();
				if (!rs.next()) {
					statement = "select id, title, htmlUrl, xmlUrl, count(distinct id) as Popularity from blog where id in (select id from blog_bloglist) group by title ORDER BY Popularity DESC LIMIT 0, 3;";
					stmt = c.prepareStatement(statement);
					rs = stmt.executeQuery();
					
					List<String> output = new ArrayList<String>();
					while (rs.next()) {
						output.add(rs.getString("xmlUrl"));
					}
					response.getWriter().println(gson.toJson(output.toArray()));
				}
				else {
					
					List<String> output = new ArrayList<String>();
					output.add(rs.getString("xmlUrl"));
					while (rs.next()) {
						output.add(rs.getString("xmlUrl"));
					}
					response.getWriter().println(gson.toJson(output.toArray()));
				}
				c.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} else {
			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager
						.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");

				String statement = "select id, title, htmlUrl, xmlUrl, count(distinct id) as Popularity from blog where id in (select id from blog_bloglist) group by title ORDER BY Popularity DESC LIMIT 0, 3;";
				PreparedStatement stmt = c.prepareStatement(statement);
				ResultSet rs = stmt.executeQuery();

				List<String> output = new ArrayList<String>();
				while (rs.next()) {
					output.add(rs.getString("xmlUrl"));
				}
				response.getWriter().println(gson.toJson(output.toArray()));
				c.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
