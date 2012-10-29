package ee.bookblogaggregator.servlet;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import java.net.*;
import java.io.*;

public class TestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(ListManagerServlet.class.getName());
	
    public TestServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		UserService userService = UserServiceFactory.getUserService();
		
//		String userEmail = request.getParameter("email");
		String userEmail = userService.getCurrentUser().getEmail();
		String userPassword = request.getParameter("password");
//		String userEmail = "ceroblogtest@gmail.com";
//		String userPassword = "BlogTest1";
		log.info(userEmail + ", " + userPassword);
		
		URL googleClientLogin = new URL("https://www.google.com/accounts/ClientLogin?service=reader&Email=" + userEmail + "&Passwd=" + userPassword);
		URLConnection googleClientLoginConnection = googleClientLogin.openConnection();
		BufferedReader in = new BufferedReader( new InputStreamReader(googleClientLoginConnection.getInputStream()));
		String inputLine = in.readLine();
		inputLine = in.readLine();
		inputLine = in.readLine();
		
		if (inputLine != null) {
			String auth = inputLine.split("=")[1];
			
			URL googleReaderFetch = new URL("https://www.google.com/reader/api/0/subscription/list?output=json");
			HttpURLConnection googleReaderFetchConnection =  (HttpURLConnection) googleReaderFetch.openConnection();
			googleReaderFetchConnection.setRequestProperty("Authorization", "GoogleLogin auth=" + auth);
			in = new BufferedReader( new InputStreamReader(googleReaderFetchConnection.getInputStream()));
			while ((inputLine = in.readLine()) != null) 
	          response.getWriter().println(inputLine);
			in.close();
		}
		else {
			response.getWriter().println("Problem getting auth token");
		}
		
		
		
	}
}
