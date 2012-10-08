package ee.bookblogaggregator;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;


public class login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public login() {
        super();
        // TODO Auto-generated constructor stub
    }


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UserService userService = UserServiceFactory.getUserService();

		String thisURL = request.getRequestURI();

		response.setContentType("text/html");
		if (request.getUserPrincipal() != null) {
			response.getWriter().println("<a href=\"" + userService.createLogoutURL("/") + "\">LOG OUT(" + request.getUserPrincipal().getName() + ")</a>");
		} 
		else {
			response.getWriter().println("<a href=\""+ userService.createLoginURL("/")+ "\">LOG IN</a>");
		}
	}

}
