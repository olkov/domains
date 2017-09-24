var flag = false;
$(window).on("load", function() {
	$("tbody").on("click", function() {
		$(".add-domain-field .domain-name").val("");
		$(".add-domain-button").removeClass("fa-minus", 2000);
		$(".add-domain-field").hide();
		flag = false;
	});
	
	$('[data-toggle="popover"]').popover();
	
	var addDomainObjLoad = $(".add-domain-field .domain-name");
	addDomainObjLoad.focus(function() {
		if(addDomainObjLoad.val() != "") {
			if(/[a-zA-Z]/.test(addDomainObjLoad.val())) {
				if(addDomainObjLoad.val().includes(" ")){
					addDomainObjLoad.attr("data-content", "Domain cannot contains a gaps!");
					addDomainObjLoad.popover("show");
					addDomainObjLoad.addClass("error-input");
				} else {
					if(addDomainObjLoad.val().includes(".")){
						addDomainObjLoad.removeClass("error-input");
					} else {
						addDomainObjLoad.attr("data-content", "Domain should contains at least one dot!");
						addDomainObjLoad.popover("show");
						addDomainObjLoad.addClass("error-input");
					}
				}
			} else {
				addDomainObjLoad.attr("data-content", "Domain should contains at least one letter!");
				addDomainObjLoad.popover("show");
				addDomainObjLoad.addClass("error-input");
			}
		} else {
			addDomainObjLoad.removeClass("error-input");
		}
	});
	
	addDomainObjLoad.blur(function() {
		addDomainObjLoad.popover("hide");
	});
	
	var upadateDomainObjLoad = $("#updateDomainForm input[name='domainName']");
	upadateDomainObjLoad.focus(function() {
		if(upadateDomainObjLoad.val() != "") {
			if(/[a-zA-Z]/.test(upadateDomainObjLoad.val())) {
				if(upadateDomainObjLoad.val().includes(" ")){
					upadateDomainObjLoad.attr("data-content", "Domain cannot contains a gaps!");
					upadateDomainObjLoad.popover("show");
					upadateDomainObjLoad.addClass("error-input");
				} else {
					if(upadateDomainObjLoad.val().includes(".")){
						upadateDomainObjLoad.removeClass("error-input");
					} else {
						upadateDomainObjLoad.attr("data-content", "Domain should contains at least one dot!");
						upadateDomainObjLoad.popover("show");
						upadateDomainObjLoad.addClass("error-input");
					}
				}
			} else {
				upadateDomainObjLoad.attr("data-content", "Domain should contains at least one letter!");
				upadateDomainObjLoad.popover("show");
				upadateDomainObjLoad.addClass("error-input");
			}
		} else {
			upadateDomainObjLoad.removeClass("error-input");
		}
	});
	
	upadateDomainObjLoad.blur(function() {
		upadateDomainObjLoad.popover("hide");
	});
});

function openLink(url) {
	if(url.match("^http://") || url.match("^https://")) {
		openInNewTab(url);
	} else {
		openInNewTab("http://" + url);
	}
}

function openInNewTab(url) {
	var win = window.open(url, '_blank');
	win.focus();
}

function show_hide() {
	if(!flag) {
		$(".add-domain-button").addClass("fa-minus", 2000);
		$(".add-domain-field").css('display', 'inline-block')
		flag = true;
		$(".domain-name").focus();
	} else {
		$(".add-domain-field .domain-name").val("");
		$(".add-domain-button").removeClass("fa-minus", 2000);
		$(".add-domain-field").hide();
		flag = false;
	}
}

function reloadDomains() {
	$.get("/DomainsTest/domains", function(data){
		$("tbody").html($(data).find("tbody>"));
	});
}

function submit(str) {
	if(str == 'add') {
		var addDomainObj = $(".add-domain-field .domain-name");
		if(/[a-zA-Z]/.test(addDomainObj.val())) {
			if(addDomainObj.val().includes(" ")){
				addDomainObj.attr("data-content", "Domain cannot contains a gaps!");
				addDomainObj.popover("show");
				addDomainObj.addClass("error-input");
				addDomainObj.focus();
			} else {	
				if(addDomainObj.val().includes(".")){
					$.ajax({
						type: "POST",
						url: "/DomainsTest/domains/add",
						data:
							{
								domainName: addDomainObj.val(),
							},
						success: function() {
							reloadDomains();
							$(".domain-name").val("");
							show_hide();
							// $(".domain-name").focus();
					       }
					});
				} else {
					addDomainObj.attr("data-content", "Domain should contains at least one dot!");
					addDomainObj.popover("show");
					addDomainObj.addClass("error-input");
					addDomainObj.focus();
				}
			}
		} else {
			addDomainObj.attr("data-content", "Domain should contains at least one letter!");
			addDomainObj.popover("show");
			addDomainObj.addClass("error-input");
			addDomainObj.focus();
		}
		setTimeout(function() {
			if($("tbody").children().length != 0) {
				$("#popover").popover("hide");
				$(".listIsEmpty").remove();
			}
		}, 400);
	} else {
		var updateDomainObj = $("#updateDomainForm input[name='domainName']");
		if(/[a-zA-Z]/.test(updateDomainObj.val())) {
			if(updateDomainObj.val().includes(" ")){
				updateDomainObj.attr("data-content", "Domain cannot contains a gaps!");
				updateDomainObj.popover("show");
				updateDomainObj.addClass("error-input");
				updateDomainObj.focus();
			} else {	
				if(updateDomainObj.val().includes(".")){
					$.ajax({
						type: "POST",
						url: "/DomainsTest/domains/update",
						data:
							{
								id: $("#updateDomainForm input[name='id']").val(),
								domainName: updateDomainObj.val(),
							},
						success: function() {
							reloadDomains();
							$("#modalWindowOfUpdate").modal('hide');
				        }
					});
				} else {
					updateDomainObj.attr("data-content", "Domain should contains at least one dot!");
					updateDomainObj.popover("show");
					updateDomainObj.addClass("error-input");
					updateDomainObj.focus();
				}
			}
		} else {
			updateDomainObj.attr("data-content", "Domain should contains at least one dot!");
			updateDomainObj.popover("show");
			updateDomainObj.addClass("error-input");
			updateDomainObj.focus();
		}
	}
}

function updateDomains(id, domainName) {
	$("#updateDomainForm input[name='id']").val(id);
	$("#updateDomainForm input[name='domainName']").val(domainName);
	$("#modalWindowOfUpdate").modal('show');
	setTimeout(function(){$("#updateDomainForm input[name='domainName']").focus();}, 500);
	
}

function deleteDomain(id) {
	$.ajax({
		type: "POST",
		url: "/DomainsTest/domains/delete",
		data:
			{
				id: id,
			},
		success: function() {
			reloadDomains();
			setTimeout(function() {
				if($("tbody").children().length == 0) {
					$("#popover").popover("show");
					$("table").after("<div class=\"p-3 mb-2 bg-dark text-white listIsEmpty\">List of domains is empty!</div>");
				}
			}, 300);
        }
	});
}
