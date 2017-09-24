package domains.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import domains.service.DomainService;

@Controller
@RequestMapping(value = "/domains")
public class DomainsController {
	@Autowired
	private DomainService domainService;

	@RequestMapping(value = "")
	public String domains(Model model) {
		model.addAttribute("listOfDomains", domainService.getAllDtoDomains());
		return "domains";
	}

	@ResponseBody
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void addDomain(@RequestParam(value = "domainName") String domainName) {
		domainService.addDomain(domainName);
	}

	@ResponseBody
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public void updateDomain(@RequestParam(value = "id") String id,
			@RequestParam(value = "domainName") String domainName) {
		domainService.updateDomain(id, domainName);
	}

	@ResponseBody
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void deleteDomain(@RequestParam(value = "id") String id) {
		domainService.removeDomain(id);
	}
}
