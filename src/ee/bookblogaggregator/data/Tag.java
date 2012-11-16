package ee.bookblogaggregator.data;

public class Tag {
	Long id;
	String name;
	
	
	public Tag() {
		super();
	}
	
	public Tag(String name) {
		super();
		this.name = name;
	}

	public Tag(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
