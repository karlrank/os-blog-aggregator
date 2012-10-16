package ee.bookblogaggregator;

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
        // TODO Auto-generated constructor stub
    }
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UserService userService = UserServiceFactory.getUserService();
		
		if (request.getParameter("action").equals("add")) {
			String listName = request.getParameter("listName");
			
			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager.getConnection("jdbc:google:rdbms://blogaggregator/blogaggregator");
				
				String statement = "insert into bloglist (listName) values ('" + listName + "');";
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.execute();
				statement = "call addBloglistToUser('" + userService.getCurrentUser().getEmail() + "','" + listName + "');";
				stmt = c.prepareStatement(statement);
				stmt.execute();
				c.close();
				
				
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
