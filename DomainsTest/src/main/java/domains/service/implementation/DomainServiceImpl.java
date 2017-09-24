package domains.service.implementation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import domains.dao.DomainDao;
import domains.dto.DomainDto;
import domains.entity.Domain;
import domains.service.DomainService;

@Service
@Transactional
public class DomainServiceImpl implements DomainService {
	@Autowired
	private DomainDao domainDao;

	public String checkDomain(String url) {
		String client = "olko22";
		String key = "AIzaSyCl1VCFTvXekEqpT5j5MyIt2NoaGxWzXEI";
		String appver = "1.5.2";
		String pver = "3.1";
		String result = new String();
		BufferedReader in = null;
		try {
			url = URLEncoder.encode(url, "UTF-8");
			URL fullURL = new URL("https://sb-ssl.google.com/safebrowsing/api/lookup?client=" + client + "&key=" + key
					+ "&appver=" + appver + "&pver=" + pver + "&url=" + url);
			URLConnection uc = fullURL.openConnection();
			in = new BufferedReader(new InputStreamReader(uc.getInputStream()));
			String inputLine;

			while ((inputLine = in.readLine()) != null) {
				result += inputLine;
			}
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println(e + ". Error in DomainServiceImpl(checkDomain)!");
		} finally {
			try {
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
				System.out.println(e + ". Cannot close Input Stream. DomainServiceImpl(checkDomain)!");
			}
		}
		if (result.equals("")) {
			result = "Safe";
		} else {
			result = "Unsafe";
		}
		return result;
	}

	public void addDomain(String domain) {
		domainDao.save(new Domain(domain));
	}

	public void updateDomain(long id, String domainName) {
		Domain domain = domainDao.findOne(id);
		domain.setDomain(domainName);
		domainDao.save(domain);
	}

	public void updateDomain(String id, String domainName) {
		try {
			updateDomain(Long.valueOf(id), domainName);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e + " in DomainServiceImpl(updateDomain)");
		}
	}

	public void removeDomain(long id) {
		domainDao.delete(id);
	}

	public void removeDomain(String id) {
		try {
			removeDomain(Long.valueOf(id));
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e + " in DomainServiceImpl(removeDomain)");
		}
	}

	public Domain getDomainById(long id) {
		return domainDao.findOne(id);
	}

	public List<Domain> getAllDomains() {
		return domainDao.findAll();
	}

	public List<DomainDto> getAllDtoDomains() {
		List<DomainDto> listDto = new ArrayList<DomainDto>();
		List<Domain> list = getAllDomains();
		for (Domain domain : list) {
			listDto.add(new DomainDto(domain, checkDomain(domain.getDomain())));
		}
		return listDto;
	}
}
