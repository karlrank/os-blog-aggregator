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
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import ee.bookblogaggregator.data.Blog;

public class TopServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(ListManagerServlet.class.getName());

	
    public TopServlet() {
        super();
    }
    
    private List<Blog> getRecommendedBlogs(String email) {
    	Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");
			
			String statement = 	"select id, title, xmlUrl, rating from user_blog, blog "+
								"where blog.id = user_blog.BLOG_ID and USER_EMAIL = ? and RATING > 0 "+
								"ORDER BY RATING DESC;";
			
			PreparedStatement stmt = c.prepareStatement(statement);
			stmt.setString(1, email);
			
			ResultSet rs = stmt.executeQuery();
			List<Blog> recommended = new ArrayList<Blog>();
			while (rs.next()) {
				recommended.add(new Blog(rs.getLong(1), rs.getString(2), rs.getString(3), rs.getFloat(4)));
			}
			
			c.close();
			return recommended;
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return new ArrayList<Blog>();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		
		if (userService.isUserLoggedIn()) {
			List<Blog> recommended = getRecommendedBlogs(user.getEmail());
			List<Blog> popular = BloglistsServlet.getPopular(user.getEmail(), 0, 50).getBlogs();
			request.setAttribute("suggested", recommended);
			request.setAttribute("popular", popular);
			request.getRequestDispatcher("top.jsp").forward(request, response);
		}
		else {
			List<Blog> popular = BloglistsServlet.getPopular("", 0, 20).getBlogs();
			request.setAttribute("suggested", new ArrayList<String>());
			request.setAttribute("popular", popular);
			request.getRequestDispatcher("top.jsp").forward(request, response);
		}
		
		
	}
}


















