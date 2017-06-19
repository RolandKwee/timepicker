// timepicker.js    Roland Kwee    19 june 2017

// jquery plugin for Jonas's timepicker
(function ( $ ) {

		/*
		//Works. Replaces the ajax call, is slightly less code, but uses an extra div. 
		$('body').append('<div id="rk_tpk_htmltemplate"></div>');
		$('#rk_tpk_htmltemplate').load('timepicker_container.html', function (responseText, textStatus, jqXHR) {
			return;//debug breakpoint to diagnose problems, otherwise this function may be removed
		});
		*/
		
   	// see: https://stackoverflow.com/questions/1385641/how-to-load-some-html-and-append-to-body-with-jquery
   	//      https://stackoverflow.com/a/4867469/1845672
   	var dir = absDirLoc('timepicker.js');
 		$.ajax({
		    url: dir + "timepicker.html",
 		    dataType: 'html',
		    error: function (jqXHR, textStatus, errorThrown) {	
		    	return;//debug breakpoint to diagnose problems, otherwise this function may be removed	    	
		    },
		    success: function (data) { 
		    	$('body').append(data); 
		    }
		});
		
		// find the directory of the JS script file
		// see: https://stackoverflow.com/questions/13261970/how-to-get-the-absolute-path-of-the-current-javascript-file-name
		//      https://stackoverflow.com/a/37778674/1845672
		function absDirLoc(filename) {
		  var scriptElements = document.getElementsByTagName('script');
		  for (var i = 0; i < scriptElements.length; i++) {
		    var source = scriptElements[i].src;
		    if (source.indexOf(filename) > -1) {
		      var location = source.substring(0, source.indexOf(filename));// + filename;
		      return location;
		    }
		  }
		  return false;
		}
		
        var sel = '#tp1';//make this an input arg	
        var hh = 0;// make this a class data member
        var mm = 0;// make this a class data member
        var mode24 = true;// make this a class data member
        var timestart = new Date();//for delay in focusout event. make class member
                                
	  // attach onclick events for the timepicker widget on input elements of the jquery selector
	  $.fn.timepicker = function() {
	      return this.each(function() {
        		// Do something to each element here.
        		var dummy1 = this;
        		$(this).click(rk_tpk_show);
    		});
	  }
				                
    	  // used in input element onclick
        function rk_tpk_show(self) {
        		sel = self;

        		// position at top of page to measure size without causing a scrollbar to appear
            $('#rk_tpk_container').css({top: 0, left: 0});
	        // copy input value to internal variables and show the timepicker
	        var words = $(sel).val().split(/:/);
	        hh = parseInt(words[0]);
	        mm = parseInt(words[1]);
	        if (hh && mm){
        		rk_tpk_show_hhmm();	        	
	        }else {// hh and/or mm may be NaN if input has invalid time, e.g. placeholder 'hh:mm'
	        	rk_tpk_ondefault();//calls rk_tpk_show_hhmm()
	        }
	        rk_tpk_showhours();

        		var offset = $(self).offset();
            $('#rk_tpk_container').show();
            //compute offset to position 'absolute' the timepicker so that it is optimally visible
        		//alert('picker size: h = ' + $('#rk_tpk_mval').outerHeight() + ', w = ' + $('#rk_tpk_mval').outerWidth());
        		// position timepicker right below the input element
        		var top = offset.top + $(self).outerHeight();
        		var left = offset.left;
        		// position the timepicker not lower than the window bottom 
        		if (top + $('#rk_tpk_container').outerHeight() > $(window).height()){
        			top = $(window).height() - $('#rk_tpk_container').outerHeight();
        		}
        		// position the timepicker horizontally not passed the window right edge
        		if (left + $('#rk_tpk_container').outerWidth() > $(window).width()){
        			left = $(window).width() - $('#rk_tpk_container').outerWidth();
        		}
        		// position at (left, top)
            $('#rk_tpk_container').css({top: top, left: left});
	        return;
        }

        // suppress minute choice buttons
        function rk_tpk_showhours(){
        		$('#rk_tpk_mval').hide();
        		$('#rk_tpk_hval_am').show();
        		if (mode24)	$('#rk_tpk_hval_pm').show();
        }
        // suppress hour choice buttons
        function rk_tpk_showminutes(){
        		$('#rk_tpk_hval_am').hide();
        		$('#rk_tpk_hval_pm').hide();
        		$('#rk_tpk_mval').show();
        }
        // set to current time, or some other default like 00:00
        function rk_tpk_ondefault(){
        		var d = new Date();
        		hh = d.getHours();
        		mm = d.getMinutes();
        		rk_tpk_show_hhmm();
        }
        // on OK, copy selected time to the input element, and close the timepicker
        function rk_tpk_onok() {
        		$(sel).val(lpad2(hh) + ':' + lpad2(mm));
        		$('#rk_tpk_container').hide();
        }
        // convert number to 2-digit string by padding with zero, e.g.: 2 to '02'
        function lpad2(num) {
            var str = '00' + num;
            return str.substr(-2);// error: ('00' + num).substr(-2);
        }
        // show hh mm values in the table header display
        function rk_tpk_show_hhmm() {
        		$('#rk_tpk_hh').text(lpad2(hh));
        		$('#rk_tpk_mm').text(lpad2(mm));        	
        }
        function rk_tpk_changemode() {
        		var mode = $('#rk_tpk_mode').text();
        		if (mode == '24h'){
        			mode = 'AM';
        			mode24 = false;
        			$('#rk_tpk_hval_pm').hide();
        		} else if (mode == 'AM') {
        			mode = 'PM';
        			mode24 = false;
        			$('#rk_tpk_hval_pm').hide();
        		} else {
        			mode = '24h';
        			mode24 = true;
        			if ($('#rk_tpk_hval_am').is(":visible")){
	        				$('#rk_tpk_hval_pm').show();       				 
        			}
        		}
        		$('#rk_tpk_mode').css('font-size', mode == '24h' ? 'small':'large');
        		$('#rk_tpk_mode').text(mode);
        }
        
        $('#rk_tpk_container td').click(function () {
            //$(this).css("background-color", "gray");
            var val = $(this).html();
            var dummy1 = $(this).parent().parent(); 
            var cl = $(this).parent().parent()[0].id; //$(this).attr('class');
            if (cl == 'rk_tpk_hval_am' || cl == 'rk_tpk_hval_pm') {
                hh = parseInt(val);
                rk_tpk_showminutes();
            } else if (cl == 'rk_tpk_mval') {
            	if (val.substring(0, 1) == '+'){
            		mm += parseInt(val);
            	}else{
                	mm = parseInt(val);
               }
            }
            rk_tpk_show_hhmm();
        });
        
        // copy time and close time picker if user clicks outside the time picker
        // BUG: does not work; clicking outside does NOT raises a focusout/blur event, but clicking OK does.
        $('#rk_tpk_container').blur(function () {
        		if (new Date().getTime() - timestart.getTime() > 1000){
        			rk_tpk_onok();
        		}        	        	
        })

}( jQuery ));
