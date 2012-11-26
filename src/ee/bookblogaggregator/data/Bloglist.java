package ee.bookblogaggregator.data;

import java.util.ArrayList;
import java.util.List;

public class Bloglist {
	
	String name;
	List<Blog> blogs;
	long id;

	public Bloglist() {
		name = "";
		blogs = new ArrayList<Blog> ();
	}
	
	public Bloglist(long id, String name) {
		this.id = id;
		this.name = name;
		blogs = new ArrayList<Blog> ();
	}
	
	public Bloglist(long id, String name, List<Blog> blogs) {
		this.id = id;
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
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}

