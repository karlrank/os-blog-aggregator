package ee.bookblogaggregator.suggestion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;

import org.mortbay.log.Log;

import com.google.appengine.api.rdbms.AppEngineDriver;

import ee.bookblogaggregator.data.*;
import ee.bookblogaggregator.servlet.TagManagerServlet;

public class Functions {
	
	
	
	public static List<Tag> getTags(String email) {
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");

			String statement = 	"select ta.id, ta.name, count(*) as sum " +
								"from blog_bloglist tb, blog t, tag ta, blog_tag tt " +
								"where tb.blog_id = t.id and t.id=tt.blog_id and ta.id=tt.tag_id and tb.bloglist_id in " +
								"(select id from bloglist where email= ? ) group by " +
								"ta.name order by sum desc;";
			PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, email);
			
			ResultSet rs = stmt.executeQuery();
			
			List<Tag> userBlogTags = new ArrayList<Tag>();
			while (rs.next()) {
				userBlogTags.add(new Tag(rs.getLong(1), rs.getString(2), rs.getFloat(3)));
			}
			
			float userTagsRating = 0;
			
			for (Iterator<Tag> iterator = userBlogTags.iterator(); iterator.hasNext();) {
				Tag tag = (Tag) iterator.next();
				userTagsRating += tag.getRating();	
			}
			
			userTagsRating = (float) Math.sqrt(userTagsRating);
				
			statement = "select id, name from tag where id in (select tag_id from user_tag where user_email= ?);";
			stmt = c.prepareStatement(statement);
				stmt.setString(1, email);
			
			rs = stmt.executeQuery();
			
			List<Tag> userTags = new ArrayList<Tag>();
			while (rs.next()) {
				userTags.add(new Tag(rs.getLong(1), rs.getString(2), userTagsRating));
			}
			
			for (Iterator<Tag> iterator = userTags.iterator(); iterator.hasNext();) {
				Tag tag = (Tag) iterator.next();
				
				for (Iterator<Tag> iteratorj = userBlogTags.iterator(); iteratorj.hasNext();) {
					Tag tagj = (Tag) iteratorj.next();
					
					if (tag.getId() == tagj.getId()) {
						tag.addRating(tagj.getRating());
						iteratorj.remove();
						break;
					}

				}
			}
			
			userTags.addAll(userBlogTags);
			
			float maxrating = 0;
			for (Iterator<Tag> iterator = userTags.iterator(); iterator.hasNext();) {
				Tag tag = (Tag) iterator.next();
				if(tag.getRating() > maxrating) {
					maxrating = tag.getRating();
				}
			}
			
			maxrating = 1 / maxrating;
			
			for (Iterator<Tag> iterator = userTags.iterator(); iterator.hasNext();) {
				Tag tag = (Tag) iterator.next();
				tag.setRating(tag.getRating() * maxrating);
			}

				c.close();
				return userTags;

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return new ArrayList<Tag>();
	}
	
	
	
	public static List<Blog> getBlogs(String email) {
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");

			String statement = 	"select blog_id,title, count(*) as popularity " +
					"from blog_bloglist, blog where blog_id = id " +
					"and blog_id not in (select BLOG_ID from blog_bloglist where " +
					"BLOGLIST_ID IN (select id from bloglist where " +
					"email= ? ))" +
					"group by blog_id " +
					"order by popularity desc";
			PreparedStatement stmt = c.prepareStatement(statement);
				stmt.setString(1, email);
			ResultSet rs = stmt.executeQuery();

				List<Blog> blogs = new ArrayList<Blog>();
				while (rs.next()) {
					Blog blog = new Blog(rs.getLong(1), rs.getInt(3));
					
					statement = "select * from blog_tag where blog_id = ? ;";
					stmt = c.prepareStatement(statement);
						stmt.setLong(1, blog.getId());
					ResultSet rsi = stmt.executeQuery();
					while (rsi.next()) {
						blog.addTag(new Tag(rsi.getLong(2)));
					}
					blogs.add(blog);
				}
				c.close();
				return blogs;

		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return new ArrayList<Blog>();
	}
	
	public static void insertBlogRatings(List<Blog> blogs, String email) {
		removeBlogRatings(email);
		final Logger log = Logger.getLogger(TagManagerServlet.class.getName());
		
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");

			String statement = 	"insert into user_blog (USER_EMAIL, BLOG_ID, RATING) values ( ?, ?, ? );";
			PreparedStatement stmt = c.prepareStatement(statement);
			
			for (Blog blog: blogs) {
				stmt.setString(1, email);
				stmt.setLong(2, blog.getId());
				stmt.setFloat(3, (Float.isNaN(blog.getRating())) ? 0 : blog.getRating());
				stmt.addBatch();
				log.info(stmt + "");
			}
			stmt.executeBatch();
			c.close();

		} catch (SQLException e) {
			log.warning(e.toString());
			e.printStackTrace();
		}
	}
	
	private static void removeBlogRatings(String email) {
		Connection c = null;
		try {
			DriverManager.registerDriver(new AppEngineDriver());
			c = DriverManager.getConnection("jdbc:google:rdbms://os-blog-aggregator:osblogaggregator2/blogaggregator");

			String statement = 	"delete from user_blog where USER_EMAIL = ?";
			PreparedStatement stmt = c.prepareStatement(statement);
			stmt.setString(1, email);
			
			stmt.execute();
			stmt.close();				
			c.close();

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}





















