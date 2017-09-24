<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Domains</title>
		<script type="text/javascript" src=<c:url value="/resources/jquery-3.2.1.js"/>></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
		<script type="text/javascript" src=<c:url value="/resources/bootstrap-4.0.0-beta-dist/js/bootstrap.min.js"/>></script>
		<link rel="stylesheet" href=<c:url value="/resources/bootstrap-4.0.0-beta-dist/css/bootstrap.min.css"></c:url>>
		<link rel="stylesheet" href=<c:url value="/resources/font-awesome-4.7.0/css/font-awesome.min.css"></c:url>>
		<link rel="stylesheet" href=<c:url value="/resources/style.css"></c:url>>
		<link rel="icon" href=<c:url value="/resources/world-wide-web.png"></c:url>>
	</head>
	<body>
		<a href="/DomainsTest" class="btn btn-outline-dark" style="font-size: 33px; margin-top: 20px;">
			<i class="fa fa-home" aria-hidden="true" onclick=""></i>
		</a>
		<h2>List of domains</h2>
		<div class="content">
			<table class="table table-hover table-inverse">
			  <thead>
			    <tr>
			    	<th class="number">#</th>
			    	<th class="status">
			    		Safety
			    	</th>
			    	<th class="domain">
			    		Domain
			  			<i id="popover" class="fa fa-plus add-domain-button" aria-hidden="true" onclick="show_hide()" data-container="body" data-trigger="manual" data-toggle="popover" data-placement="top" data-content="Click here to add domain"></i>
			  			<form class="add-domain-field" action="javascript:submit('add');" method="POST">
				  			<input type="text" data-container="body" data-trigger="manual" data-toggle="popover" data-placement="bottom" name="domainName" class="form-control domain-name" autocomplete="off" placeholder="Input domain" required>
				  			<input type="submit" class="btn btn-light domain-button" value="Add">
			  			</form>
			  		</th> 
			    </tr>
			  </thead>
			  <tbody>
				<c:forEach var="domain" items="${listOfDomains}">
			 		<tr>
						<th class="number">${domain.id}</th>
						<td class="status">
							<c:choose>
								<c:when test="${domain.status == 'Safe'}">
									<i class="fa fa-check-square" aria-hidden="true"></i>
								</c:when>
								<c:otherwise>
							      	<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
							    </c:otherwise>
							</c:choose>
							<span>${domain.status}</span>
						</td>
						<td class="domain">
							<c:choose>
								<c:when test="${domain.status == 'Safe'}">
									<span onclick="openLink('${domain.domain}')">${domain.domain}</span>
								</c:when>
								<c:otherwise>
							      	<span>${domain.domain}</span>
							    </c:otherwise>
							</c:choose>
							<div class="operations">
								<i class="fa fa-pencil" aria-hidden="true" title="Update domain" onclick="updateDomains(${domain.id}, '${domain.domain}')"></i>
								<i class="fa fa-times" aria-hidden="true" title="Delete domain" onclick="deleteDomain(${domain.id})"></i>
							</div>
						</td>
					</tr>
				</c:forEach>
			  </tbody>
			</table>
			<c:if test="${listOfDomains.isEmpty()}">
				<div class="p-3 mb-2 bg-dark text-white listIsEmpty">List of domains is empty!</div>
				<script type="text/javascript"/>
					$("#popover").popover("show");
				</script>
			</c:if>
			<div class="modal fade" id="modalWindowOfUpdate" tabindex="-1" role="dialog" aria-labelledby="modalWindowOfUpdate" aria-hidden="true">
				<div class="modal-dialog" role="document">
			    	<div class="modal-content">
			      		<div class="modal-header">
			        		<h5 class="modal-title" id="exampleModalLabel" style="margin: auto; padding-left: 15px;">Update domain</h5>
			        		<button type="button" class="close" data-dismiss="modal" aria-label="Close" style="cursor: pointer;">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			      		<div class="modal-body">
			      			<form id="updateDomainForm" action="javascript:submit('update');" method="POST">
						    	<label class="control-label">Input domain</label>
						        <input type="text" data-container="body" data-trigger="manual" data-toggle="popover" data-placement="right" autocomplete="off" class="form-control" name="domainName" required>
						        <input type="hidden" name="id">
						    </form>
			      		</div>
			      		<div class="modal-footer">
			        		<div>
				        		<button type="submit" class="btn btn-dark" style="margin-right: 5px;" form="updateDomainForm">Update</button>
				        		<button type="button" class="btn btn-outline-dark" data-dismiss="modal">Close</button>
			     	 		</div>
			     	 	</div>
			    	</div>
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript" src=<c:url value="/resources/domains.js"/>></script>
</html>