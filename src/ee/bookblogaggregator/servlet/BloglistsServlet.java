package ee.bookblogaggregator.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;

import ee.bookblogaggregator.data.Blog;
import ee.bookblogaggregator.data.Bloglist;
import ee.bookblogaggregator.servlet.TagsServlet;

public class BloglistsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(ListManagerServlet.class.getName());
	
	private static Gson gson;
	
    public BloglistsServlet() {
        super();
        gson = new Gson();
    }
    
    private Bloglist getPopular() {
    	Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");

			String statement = "select blog_id,title,xmlUrl, count(*) as popularity from blog_bloglist, blog where blog_id = id group by blog_id order by popularity desc LIMIT 0, 5;";
			PreparedStatement stmt = c.prepareStatement(statement);
			ResultSet rs = stmt.executeQuery();

				Bloglist bl = new Bloglist(-1, "Popular");
				while (rs.next()) {
					bl.addBlog(new Blog(rs.getLong(1), rs.getString(2), rs.getString(3), TagsServlet.getBlogsTags(rs.getString(1))));
				}
				c.close();
				return(bl);

		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return (new Bloglist());
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		UserService userService = UserServiceFactory.getUserService();
		
		if (userService.isUserLoggedIn()) {

			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
				
				

				String statement = "select id, listName from bloglist where email = ?;";
				
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, userService.getCurrentUser().getEmail());
				ResultSet rs = stmt.executeQuery();
				
					List<Bloglist> output = new ArrayList<Bloglist>();
					output.add(getPopular());
					while (rs.next()) {
						Bloglist bl = new Bloglist(rs.getLong("id"), rs.getString("listName"));
						String statement2 = "select id, title, xmlUrl from blog where id IN (select BLOG_ID from blog_bloglist where BLOGLIST_ID IN (select id from bloglist where email = ? and id = ?));";
						PreparedStatement stmt2 = c.prepareStatement(statement2);
						stmt2.setString(1,  userService.getCurrentUser().getEmail());
						stmt2.setInt(2,  rs.getInt(1));
						ResultSet rs2 = stmt2.executeQuery();
						while (rs2.next()) {
							bl.addBlog(new Blog(rs2.getLong(1), rs2.getString(2), rs2.getString(3), TagsServlet.getBlogsTags(rs.getString(1))));
						}
						output.add(bl);
					}
					response.getWriter().println(gson.toJson(output.toArray()));
					
				c.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} else {
			Bloglist[] output = new Bloglist[1];
			output[0] = getPopular();
			response.getWriter().println(gson.toJson(output));
		}

}
}
