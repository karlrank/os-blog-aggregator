package ee.bookblogaggregator.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import ee.bookblogaggregator.suggestion.Main;

public class UserManagerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(ListManagerServlet.class.getName());

	
    public UserManagerServlet() {
        super();
    }
    
    private void addUserToDatabase(String email) {
    	Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
			
			String statement = "insert ignore into user (email, selectedList) values ( ?, ? );";
			PreparedStatement stmt = c.prepareStatement(statement);
			stmt.setString(1, email);
			stmt.setInt(2, 0);
			stmt.executeUpdate();
			c.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		
		if (userService.isUserLoggedIn()) {
			addUserToDatabase(user.getEmail());
			request.setAttribute("logoutURL", userService.createLogoutURL(request.getRequestURI()));
			request.setAttribute("userEmail", user.getEmail());
			Main.updateSuggestions(user.getEmail());
		}
		else {
			request.setAttribute("loginURL", userService.createLoginURL(request.getRequestURI()));
		}
		
		if (request.getRequestURI().equals("/")) {
			request.getRequestDispatcher("index.jsp").forward(request, response);
		}
		else if (request.getRequestURI().equals("/my-blogs")) {
			request.getRequestDispatcher("blogs.jsp").forward(request, response);
		}
		else if (request.getRequestURI().equals("/top")) {
			request.getRequestDispatcher("/topservlet").forward(request, response);
		}
		else if (request.getRequestURI().equals("/about")) {
			request.getRequestDispatcher("about.jsp").forward(request, response);
		}
		
	}
}


















