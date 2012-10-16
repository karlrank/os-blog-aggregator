package ee.bookblogaggregator;

import java.util.ArrayList;
import java.util.List;

public class Bloglist {
	
	String name;
	List<Blog> blogs;
	
	Bloglist() {
		name = "";
		blogs = new ArrayList<Blog> ();
	}
	
	public Bloglist(String name) {
		this.name = name;
		blogs = new ArrayList<Blog> ();
	}
	
	public Bloglist(String name, List<Blog> blogs) {
		this.name = name;
		this.blogs = blogs;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Blog> getBlogs() {
		return blogs;
	}

	public void setBlogs(List<Blog> blogs) {
		this.blogs = blogs;
	}
	
	public void addBlog(Blog blog) {
		blogs.add(blog);
	}
}

