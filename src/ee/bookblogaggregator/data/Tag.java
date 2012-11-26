package ee.bookblogaggregator.data;

public class Tag {
	Long id;
	String name;
	Float rating;
	
	
	public Tag() {
		super();
	}
	
	public Tag(long id) {
		super();
		this.id = id;
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
	
	public Tag(Long id, String name, Float rating) {
		super();
		this.id = id;
		this.name = name;
		this.rating = rating;
	}
	
	@Override
	public String toString() {
		return "Tag [id=" + id + ", name=" + name + ", rating=" + rating + "]";
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

	public Float getRating() {
		return rating;
	}

	public void setRating(Float rating) {
		this.rating = rating;
	}
	
	public void addRating(Float rating) {
		this.rating += rating;
	}
	
}
