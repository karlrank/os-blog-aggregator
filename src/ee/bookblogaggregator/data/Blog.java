package ee.bookblogaggregator.data;

import java.util.ArrayList;
import java.util.List;

public class Blog {
	long id;
	String title;
	String xmlUrl;
	String htmlUrl;
	float rating;
	List<Tag> tags;
	int popularity;
	
	public Blog() {
		super();
		tags = new ArrayList<Tag> ();
	}
	
	public Blog(long id, int popularity) {
		super();
		this.id = id;
		this.popularity = popularity;
		tags = new ArrayList<Tag> ();
	}

	public Blog(long id, String title, String xmlUrl) {
		super();
		this.id = id;
		this.title = title;
		this.xmlUrl = xmlUrl;
		tags = new ArrayList<Tag> ();
	}
	
	public Blog(long id, String title, String xmlUrl, float rating) {
		super();
		this.id = id;
		this.title = title;
		this.xmlUrl = xmlUrl;
		this.rating = rating;
		tags = new ArrayList<Tag> ();
	}
	
	public Blog(long id, String title, String xmlUrl, List<Tag> tags) {
		super();
		this.id = id;
		this.title = title;
		this.xmlUrl = xmlUrl;
		this.tags = tags;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getXmlUrl() {
		return xmlUrl;
	}

	public void setXmlUrl(String xmlUrl) {
		this.xmlUrl = xmlUrl;
	}

	public String getHtmlUrl() {
		return htmlUrl;
	}

	public void setHtmlUrl(String htmlUrl) {
		this.htmlUrl = htmlUrl;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}
	
	public void addTag(Tag tag) {
		tags.add(tag);
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public int getPopularity() {
		return popularity;
	}

	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}

	@Override
	public String toString() {
		return "Blog [id=" + id + ", title=" + title + ", rating=" + rating
				+ "]";
	}

	

	
	
	
}
