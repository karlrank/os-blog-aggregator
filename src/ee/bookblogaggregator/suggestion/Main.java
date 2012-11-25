package ee.bookblogaggregator.suggestion;

import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;

import ee.bookblogaggregator.data.*;
import ee.bookblogaggregator.servlet.TagManagerServlet;

public class Main {
	public static void updateSuggestions (String email) {
		final Logger log = Logger.getLogger(TagManagerServlet.class.getName());
		
		List<Tag> tags = Functions.getTags(email);
		List<Blog> blogs = Functions.getBlogs(email);
		
		for (Iterator<Blog> iterator = blogs.iterator(); iterator.hasNext();) {
			Blog blog = (Blog) iterator.next();
			blog.setRating(0);
			for (Iterator<Tag> iterator2 = tags.iterator(); iterator2.hasNext();) {
				Tag tag = (Tag) iterator2.next();
				for (Iterator<Tag> iterator3 = blog.getTags().iterator(); iterator3.hasNext();) {
					Tag tag2 = (Tag) iterator3.next();
					if (tag.getId() == tag2.getId()) {
						blog.setRating(blog.getRating() + tag.getRating());
					}
				}
			}
			if (blog.getTags().size() != 0) {
				blog.setRating((blog.getRating() / blog.getTags().size()) * blog.getPopularity());	
			}	
		}
		
		Functions.insertBlogRatings(blogs, email);
		
		for (Iterator<Blog> iterator = blogs.iterator(); iterator.hasNext();) {
			Blog blog = (Blog) iterator.next();
		}
		
		
	}
	
	
}
