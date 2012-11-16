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
import ee.bookblogaggregator.data.Tag;


public class TagsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static final Logger log = Logger.getLogger(TagsServlet.class.getName());
	private static Gson gson;

    public TagsServlet() {
        super();
        gson = new Gson();
    }
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UserService userService = UserServiceFactory.getUserService();
		
		String action = request.getParameter("action");
		
		if (action == null) {
			response.getWriter().print(0);
			return;
		}
		
		if (action.equals("getAllTags")) {
			response.getWriter().print(gson.toJson(getTags().toArray()));
		}
		
		else if (action.equals("getUsersTags")) {
			if (userService.isUserLoggedIn()) {
				String email = userService.getCurrentUser().getEmail();
				response.getWriter().print(gson.toJson(getUsersTags(email).toArray()));
			}
			else {
				response.getWriter().print(0);
			}
		}
		
		else if (action.equals("getBlogsTags")) {
			String blogId = request.getParameter("blogId");
			
			if(blogId != null) {
				response.getWriter().print(gson.toJson(getBlogsTags(blogId).toArray()));
			}
			else {
				response.getWriter().print(0);
			}
			
		}
		
	}
	
	private List<Tag> getTags() {
    	Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");

			String statement = "select * from tag;";
			PreparedStatement stmt = c.prepareStatement(statement);
			ResultSet rs = stmt.executeQuery();
				List<Tag> tags = new ArrayList<Tag>();
				
				while (rs.next()) {
					tags.add(new Tag(rs.getLong(1), rs.getString(2)));
				}
				c.close();
				return(tags);

		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return (new ArrayList<Tag>());
    }
    
    private List<Tag> getUsersTags(String email) {
    	Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");

			String statement = "select id, name from tag where id in (select tag_id from user_tag where user_email= ?);";
			PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, email);
			ResultSet rs = stmt.executeQuery();
				List<Tag> tags = new ArrayList<Tag>();
				
				while (rs.next()) {
					tags.add(new Tag(rs.getLong(1), rs.getString(2)));
				}
				c.close();
				return(tags);

		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return (new ArrayList<Tag>());
    }
    
    public static List<Tag> getBlogsTags(String blogId) {
    	Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager
					.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");

			String statement = "select id, name from tag where id IN (select TAG_ID from blog_tag where BLOG_ID IN (select id from blog where id = ? ));";
			PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, blogId);
			ResultSet rs = stmt.executeQuery();
				List<Tag> tags = new ArrayList<Tag>();
				
				while (rs.next()) {
					tags.add(new Tag(rs.getLong(1), rs.getString(2)));
				}
				c.close();
				return(tags);

		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return (new ArrayList<Tag>());
    }

}
