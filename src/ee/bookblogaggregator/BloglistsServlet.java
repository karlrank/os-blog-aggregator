package ee.bookblogaggregator;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;

public class BloglistsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static Gson gson;
	
    public BloglistsServlet() {
        super();
        gson = new Gson();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		UserService userService = UserServiceFactory.getUserService();
		
		if (userService.isUserLoggedIn()) {

			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager.getConnection("jdbc:google:rdbms://blogaggregator/blogaggregator");
				
				

				String statement = "select listName from bloglist where id IN (select BLOGLIST_ID from user_bloglist where USER_ID IN (select id from user where email='" + userService.getCurrentUser().getEmail() + "')); ";
				PreparedStatement stmt = c.prepareStatement(statement);
				ResultSet rs = stmt.executeQuery();
				
					List<Bloglist> output = new ArrayList<Bloglist>();
					
					while (rs.next()) {
						Bloglist bl = new Bloglist(rs.getString("listName"));
						String statement2 = "select title,htmlUrl,xmlUrl from blog where id IN (select BLOG_ID from blog_bloglist where BLOGLIST_ID IN (select id from bloglist where listName='" + rs.getString("listName") + "'));";
						PreparedStatement stmt2 = c.prepareStatement(statement2);
						ResultSet rs2 = stmt2.executeQuery();
						while (rs2.next()) {
							bl.addBlog(new Blog(rs2.getString(1), rs2.getString(3), rs2.getString(2)));
						}
						output.add(bl);
					}
					response.getWriter().println(gson.toJson(output.toArray()));
					
				c.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
	}

}
}