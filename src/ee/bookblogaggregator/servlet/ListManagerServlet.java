package ee.bookblogaggregator.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;


public class ListManagerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(ListManagerServlet.class.getName());

    public ListManagerServlet() {
        super();
    }
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UserService userService = UserServiceFactory.getUserService();
		
		if (request.getParameter("action").equals("addList")) {
			String listName = request.getParameter("listName");
			
			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
				
				String statement = "insert into bloglist(listName,email) values ( ?, ? );";
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, listName);
				stmt.setString(2, userService.getCurrentUser().getEmail());
				stmt.execute();				
				
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		else if (request.getParameter("action").equals("removeList")) {
			long id = Long.parseLong(request.getParameter("listId"));
			
			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
				
				String statement = "DELETE FROM bloglist WHERE id= ? ;";
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setLong(1, id);
				stmt.execute();				
				c.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		else if (request.getParameter("action").equals("removeBlog")) {
			long blogId = Long.parseLong(request.getParameter("blogId"));
			long listId = Long.parseLong(request.getParameter("listId"));
			
			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
				
				String statement = "DELETE FROM blog_bloglist WHERE BLOG_ID = ? AND BLOGLIST_ID = ? ;";
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setLong(1, blogId);
				stmt.setLong(2, listId);
				stmt.execute();				
			c.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		else if (request.getParameter("action").equals("addBlog")) { //will be implemented, half done
			String blogUrl = request.getParameter("blogUrl");
			long listId = Long.parseLong(request.getParameter("listId"));
			String blogTitle = request.getParameter("blogTitle");
			
			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
				
				String statement = "SELECT id FROM blog WHERE xmlUrl = ? ;";
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, blogUrl);
				ResultSet rs = stmt.executeQuery();

				if(rs.next()) {
					long blogId = rs.getLong(1);
					statement = "INSERT into blog_bloglist values ( ? ,? )";
					stmt = c.prepareStatement(statement);
					stmt.setLong(1, blogId);
					stmt.setLong(2, listId);
					stmt.execute();
				}
				else {
					statement = "INSERT into blog (title, xmlUrl) values ( ? ,? )";
					PreparedStatement preparedStatement = c.prepareStatement(statement);
					preparedStatement.setString(1, blogTitle);
					preparedStatement.setString(2, blogUrl);
					preparedStatement.execute();
					statement = "SELECT id FROM blog WHERE xmlUrl = ?;";
					PreparedStatement statement2 = c.prepareStatement(statement);
					statement2.setString(1, blogUrl);
					rs = statement2.executeQuery();
					rs.next();
					
					statement = "INSERT into blog_bloglist values ( ? ,? )";
					statement2 = c.prepareStatement(statement);
					statement2.setLong(1, rs.getLong(1));
					statement2.setLong(2, listId);
					statement2.execute();
				}
				c.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
