package ee.bookblogaggregator;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class AuthTestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public AuthTestServlet() {
        super();
    }

	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		UserService userService = UserServiceFactory.getUserService();

		String thisURL = req.getRequestURI();

		resp.setContentType("text/html");
		if (req.getUserPrincipal() != null) {
			resp.getWriter().println("<p>Hello, " + req.getUserPrincipal().getName() + "!  You can <a href=\"" + userService.createLogoutURL(thisURL) + "\">sign out</a>.</p>");
		} 
		else {
			resp.getWriter().println("<p>Please <a href=\""+ userService.createLoginURL(thisURL)+ "\">sign 2 in</a>.</p>");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
