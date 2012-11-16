package ee.bookblogaggregator.data;

import java.util.ArrayList;
import java.util.List;

public class Blog {
	long id;
	String title;
	String xmlUrl;
	String htmlUrl;
	List<Tag> tags;
	
	public Blog() {
		super();
		tags = new ArrayList<Tag> ();
	}

	public Blog(long id, String title, String xmlUrl) {
		super();
		this.id = id;
		this.title = title;
		this.xmlUrl = xmlUrl;
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
}
