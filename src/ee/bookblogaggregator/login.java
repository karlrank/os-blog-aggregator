package ee.bookblogaggregator;

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
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;


public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(login.class.getName());

    public login() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UserService userService = UserServiceFactory.getUserService();
		
		String thisURL = "";
		
		if (request.getParameter("origin").equals("blogs")) {
			thisURL = "/blogs.htm";
		}
		else {
			thisURL = "/";
		}

		response.setContentType("text/html");
		if (request.getUserPrincipal() != null) {
			
			Connection c = null;
			try {
				DriverManager.registerDriver(new AppEngineDriver());
				c = DriverManager.getConnection("jdbc:google:rdbms://blogaggregator/blogaggregator");
				
				String statement = "insert ignore into user (email, selectedList) value('" + request.getUserPrincipal().getName() + "', 0);";
				PreparedStatement stmt = c.prepareStatement(statement);
				stmt.execute();
				c.close();
				
				
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
			
			response.getWriter().println("<a href=\"" + userService.createLogoutURL(thisURL) + "\">LOG OUT(" + request.getUserPrincipal().getName() + ")</a>");
		} 
		else {
			response.getWriter().println("<a href=\""+ userService.createLoginURL(thisURL)+ "\">LOG IN</a>");
		}
	}

}
