$(document).ready(function(){
	function zoom_font(obj){
		var theElement = $(".text_size").css("font-size");
		var textSize = parseFloat(theElement, 10);
		var unitOfMeasurement = theElement.slice(-2);
		

			if ( (obj).name == "largerTextLink" && textSize < 15){
				textSize += 2;
			}
			
			if ( (obj).name == "smallerTextLink" && textSize > 11){
				textSize -=2;
			};
	
		$('.text_size').css("font-size",  textSize + unitOfMeasurement);
		}
		
	$('.font_size_controls a').click(function() {
	    zoom_font(this);
		return false;
		
	});
	
	$('.font_size_controls_fisso a').click(function() {
	    zoom_font(this);
		return false;
		
	});
});