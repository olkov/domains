package domains.service;

import java.util.List;

import domains.dto.DomainDto;
import domains.entity.Domain;

public interface DomainService {
	public void addDomain(String domain);

	public void updateDomain(long id, String domain);
	
	public void updateDomain(String id, String domain);

	public void removeDomain(long id);
	
	public void removeDomain(String id);

	public Domain getDomainById(long id);

	public List<Domain> getAllDomains();
	
	public List<DomainDto> getAllDtoDomains();
}
