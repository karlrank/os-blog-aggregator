package ee.bookblogaggregator;

public class Blog {
	String title;
	String xmlUrl;
	String htmlUrl;
	
	public Blog() {
		super();
	}

	public Blog(String title, String xmlUrl, String htmlUrl) {
		super();
		this.title = title;
		this.xmlUrl = xmlUrl;
		this.htmlUrl = htmlUrl;
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
