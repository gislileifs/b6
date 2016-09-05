<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page session="true"%>
<!-- 
<div xmlns:c="http://java.sun.com/jsp/jstl/core">
 -->
        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">B6</a>
        
            </div>
            
            
            <ul class="nav navbar-top-links navbar-right">
           	    <c:if test="${pageContext.request.userPrincipal.name != null}">
            	<li style="padding-left: 20px">
		${pageContext.request.userPrincipal.name}
            	</li>
				</c:if>
               
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="javascript:formSubmit()"><i class="fa fa-sign-out fa-fw"></i> 
                        Logout ${pageContext.request.userPrincipal.name}
                        </a>
                        	<form action="logout" method="post" id="logoutForm">
		<input type="hidden" name="${_csrf.parameterName}"
			value="${_csrf.token}" />
	</form>
	<script>
		function formSubmit() {
			document.getElementById("logoutForm").submit();
		}
	</script>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <li class="sidebar-search">
                            <div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Search..."/>
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                            </div>
                            <!-- /input-group -->
                        </li>
                        <li>
                            <a href="dashboard"><i class="fa fa-dashboard fa-fw"></i> Fors��a</a>
                        </li>
                        <li>
                            <a href="angularView"><i class="fa fa-bar-chart-o fa-fw"></i> Uppskriftir</a>
                            
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <a href="winelog"><i class="fa fa-table fa-fw"></i> V�nger�ardagb�kin</a>
                        </li>

                        <li>
                            <a href="todo"><i class="fa fa-wrench fa-fw"></i>To Do</a>
                            
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <a href="ang"><i class="fa fa-wrench fa-fw"></i>Angular</a>
                            
                            <!-- /.nav-second-level -->
                        </li>
                      
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
            
        </nav>
<!-- 
</div>
 -->