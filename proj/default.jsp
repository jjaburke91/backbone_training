<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<jsp:include page="backbone/viewTemplates.jsp" />


<div class="container" style="margin: 1.5em 0;">
    <div id="top-level-nav">

    </div>
<%--    <div >
        <div class="col-md-6" style="font-size: 130%;border: 2px solid grey; text-align: center; cursor: pointer;">
            Latest News
        </div>
        <div class="col-md-6" style="font-size: 130%; border: 2px solid grey; text-align: center; cursor: pointer;">
            Top Stories
        </div>
    </div>--%>

</div>

<div id="listing-container" class="container"></div>


<script src="${publication.url}/template/widgets/scripGenericListing/view/backbone/demo.js" type="text/javascript"> </script>


