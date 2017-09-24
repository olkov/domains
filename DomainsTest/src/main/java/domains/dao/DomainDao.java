package domains.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import domains.entity.Domain;

@Repository
public interface DomainDao extends JpaRepository<Domain, Long>{
	@Query("select d from Domain d where d.domain like :domainName")
	public List<Domain> findDomainsByDomainName(String domainName);
}
