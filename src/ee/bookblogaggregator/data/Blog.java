package ee.bookblogaggregator.data;

public class Blog {
	long id;
	String title;
	String xmlUrl;
	String htmlUrl;
	
	public Blog() {
		super();
	}

	public Blog(long id, String title, String xmlUrl) {
		super();
		this.id = id;
		this.title = title;
		this.xmlUrl = xmlUrl;
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
	
}
