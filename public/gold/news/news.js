$(document).ready(function() {
	var flag = true;
	if (flag == true) {
		$(".more").click(function() {
			$(this).parents(".sub-meum-bar").siblings("ul").hide();
			return flag = false;
		})
	}
	if (flag == false) {
		$(".more").click(function() {
			$(this).parents(".sub-meum-bar").siblings("ul").show();
			return flag = true;
		})
	}

});
