package domains.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Domains")
public class Domain {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String domain;

	public Domain() {
	}

	public Domain(String domain) {
		this.domain = domain;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	@Override
	public String toString() {
		return "Domain [" + id + ", " + domain + "]";
	}
}
