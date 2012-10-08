package ee.bookblogaggregator;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.*;
import com.google.appengine.api.rdbms.AppEngineDriver;

import java.sql.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class Os_blog_aggregatorServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {


		PrintWriter out = resp.getWriter();
		
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://blogaggregator/blogaggregator");
			
			String statement = "CREATE TABLE Persons (P_Id int,LastName varchar(255))";
			PreparedStatement stmt = c.prepareStatement(statement);
			out.println(" WASSAAAA" + stmt.executeUpdate());
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
}
