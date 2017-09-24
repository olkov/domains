package domains.dto;

import domains.entity.Domain;

public class DomainDto {
	private long id;
	private String domain;
	private String status;

	public DomainDto() {

	}
	
	public DomainDto(Domain domain, String status) {
		this.id = domain.getId();
		this.domain = domain.getDomain();
		this.status = status;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "DomainDto [" + id + ", " + domain + ", " + status + "]";
	}

}
