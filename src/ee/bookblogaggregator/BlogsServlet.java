package ee.bookblogaggregator;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UserService userService = UserServiceFactory.getUserService();

		String thisURL = request.getRequestURI();

		response.setContentType("text/html");
		if (request.getUserPrincipal() != null) {
			
			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager.getConnection("jdbc:google:rdbms://blogaggregator/blogaggregator");
				
				String statement = "select title,htmlUrl,xmlUrl from blog where id IN (select BLOG_ID from blog_bloglist where BLOGLIST_ID IN (select id from bloglist where listName=(select listName from bloglist where id=(select selectedList from user where email='karlrank@gmail.com')) and id IN (select BLOGLIST_ID from user_bloglist where USER_ID IN (select id from user where email='karlrank@gmail.com'))));";
				PreparedStatement stmt = c.prepareStatement(statement);
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()){
					response.getWriter().println(rs.getString("xmlUrl"));
				}
				
				
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
			//response.getWriter().println("<a href=\"" + userService.createLogoutURL("/") + "\">LOG OUT(" + request.getUserPrincipal().getName() + ")</a>");
		} 
		else {
			//some default blogs
			response.getWriter().println("Default Blog 1");
			response.getWriter().println("Default Blog 2");
			response.getWriter().println("Default Blog 3");
		}
	}

}
