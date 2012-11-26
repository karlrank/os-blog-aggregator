package ee.bookblogaggregator.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;


public class TagManagerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private static final Logger log = Logger.getLogger(TagManagerServlet.class.getName());

    public TagManagerServlet() {
        super();
    }
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		UserService userService = UserServiceFactory.getUserService();
		if (userService.isUserLoggedIn()) {	
		
			String action = request.getParameter("action");
			String tagId = request.getParameter("tagId");
			String tagName = request.getParameter("tagName");
			
			if (action == null || tagName == null || tagId == null) {
				response.getWriter().print(0);
				return;
			}
			
			if (tagId.equals("-1") && (action.equals("addTagToBlog") || action.equals("addTagToUser"))) {
				tagId = createTag(tagName);
				response.getWriter().print(tagId);
				if (tagId.equals("")) {
					response.getWriter().print(0);
					return;
				}
			}
			else if (tagId.equals("-1")){
				response.getWriter().print(0);
				return;
			}
			
			if (action.equals("addTagToBlog")) {
				String blogId = request.getParameter("blogId");
				if (blogId != null) {
					addTagToBlog(tagId, blogId);
				}
				else {
					response.getWriter().print(0);
				}	
			}
			
			else if (action.equals("removeTagFromBlog")) {
				String blogId = request.getParameter("blogId");
				if (blogId != null) {
					removeTagFromBlog(tagId, blogId);
				}
				else {
					response.getWriter().print(0);
				}
			}
			
			else if (action.equals("addTagToUser")) {
				addTagToUser(tagId, userService.getCurrentUser().getEmail());
			}
			
			else if (action.equals("removeTagFromUser")) {
				removeTagFromUser(tagId, userService.getCurrentUser().getEmail());
			}
		}
		else {
			response.getWriter().print(0);
		}
	}
	
	private String createTag(String tagName) {
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
			
			String statement = "insert into tag (name) values ( ? );";
			PreparedStatement stmt = c.prepareStatement(statement, Statement.RETURN_GENERATED_KEYS);
			stmt.setString(1, tagName);
			stmt.executeUpdate();
			
			ResultSet rs = stmt.getGeneratedKeys();
			if (rs.next()){
			    return "" + rs.getInt(1);
			}
			
			c.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return "";
	}
	
	private void addTagToBlog(String tagId, String blogId) {
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
			
			String statement = "insert into blog_tag values ( ? , ? );";
			PreparedStatement stmt = c.prepareStatement(statement);
			stmt.setString(1, blogId);
			stmt.setString(2, tagId);
			stmt.executeUpdate();
			c.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	private void removeTagFromBlog(String tagId, String blogId) {
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
			
			String statement = "delete from blog_tag where BLOG_ID = ? and TAG_ID = ?;";
			PreparedStatement stmt = c.prepareStatement(statement);
			stmt.setString(1, blogId);
			stmt.setString(2, tagId);
			stmt.executeUpdate();
			c.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	private void addTagToUser(String tagId, String email) {
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
			
			String statement = "insert into user_tag values ( ? , ? );";
			PreparedStatement stmt = c.prepareStatement(statement);
			stmt.setString(1, email);
			stmt.setString(2, tagId);
			stmt.executeUpdate();
			c.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	private void removeTagFromUser(String tagId, String email) {
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
			
			String statement = "delete from user_tag where USER_EMAIL = ? and TAG_ID = ?;";
			PreparedStatement stmt = c.prepareStatement(statement);
			stmt.setString(1, email);
			stmt.setString(2, tagId);
			stmt.executeUpdate();
			c.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}































