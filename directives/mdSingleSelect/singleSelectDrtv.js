//component for material design select box
angular.module('retrieve').directive('singleSelect', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/mdSingleSelect/singleSelect.html',
		scope: { 
			options: '=', 
			selected: "=",
			currentid: "=" 
		},
		controllerAs: 'select',
		controller: ['$scope', function($scope){
			/*  PLANS:
			 *	options:
			 *		1. to open only down
			 *		done to make based on id, so could have multiple per page
			 *		3. minimize the amount of jquery
			*/
			var _this = this;
			_this.options = $scope.options;
			_this.currentlySelected = [];

			//updates the currently selected choices
			function refreshOptions() {
				_this.currentlySelected = [];
				for (var i=0; i < _this.options.length; i++) {
					if (_this.options[i].value) {
						_this.currentlySelected.push(_this.options[i].name);
					}
				}
				$scope.selected = (_this.currentlySelected.length)? _this.currentlySelected[0] :'';

			} 

			//update value clicked and refresh selected
			refreshOptions();
			_this.updateOptions = function(option) {
				option.value = !option.value;
				refreshOptions();
			};

		}],
		link: function(scope, elem, attrs, ctrl) {

			//overall function initially called
			$(function() {
				var closeSelectTimeout;
			
				//hides the list
				function hideMaterialList(parent) {
					parent.css({'overflow': 'hidden'}).removeClass('isOpen');
					clearTimeout(closeSelectTimeout);
					closeSelectTimeout = setTimeout(function() {
						parent.parent().css({'z-index': 0});
					}, 200);
				}

			  	//opening animation
			  	$('.select'+scope.currentid+' li').click(function(event) {
			  		console.info("called opening animation " + scope.currentid);
			  	  	if (parseFloat($(this).css('opacity')) > 0 && $(document).width() >= 1008) {
			  	    	var maxWidthHeight = Math.max($(this).width(), $(this).height());
			  	    	if ($(this).find("b.drop").length == 0 || $(this).find("b.drop").css('opacity') != 1) {
			  	      		drop = $('<b class="drop" style="width:' + maxWidthHeight + 'px;height:' + maxWidthHeight + 'px;"></b>').prependTo(this);
			  	    	} else {
			  	      		$(this).find("b.drop").each(function() {
			  	        	if ($(this).css('opacity') == 1) {
			  	          		drop = $(this).removeClass("animate");
			  	          			return;
			  	        		}
			  	      		})
			  	    	}
			  	    	x = event.pageX - drop.width() / 2 - $(this).offset().left;
			  	    	y = event.pageY - drop.height() / 2 - $(this).offset().top;
			  	    	drop.css({top: y,left: x}).addClass("animate");
			  	  	}
			  	});
	
			  	$(document.body).on('dragstart', '.select'+scope.currentid+' li', function(e) {
			  	  	e.preventDefault();
			  	})
			
			  	//select a choice exit
			  	var selectTimeout;
			  	$(document.body).on('click', '.select'+scope.currentid+' li', function() {
			  	  	var parent = $(this).parent();
			  	  	parent.children('li').removeAttr('data-selected');
			  	  	$(this).attr('data-selected', 'true');
			  	  	clearTimeout(selectTimeout);
			  	  	if (parent.hasClass('isOpen')) {
			  	  	  	hideMaterialList($('.select'+scope.currentid));
			  	  	} else {
			  	  	  	var pos = Math.max(($('li[data-selected]', parent).index() - 2) * 48, 0);
			  	  	  	parent.addClass('isOpen');
			  	  	  	parent.parent().css('z-index', '999');
			  	  	  	if ($(document).width() >= 1008) {
			  	  	    	var i = 1;
			  	  	    	selectTimeout = setInterval(function() { i++; 
			  	  	      		if (i == 2) { parent.css('overflow', 'auto'); }
			  	  	      		if (i >= 4) { clearTimeout(selectTimeout); }
			  	  	    	}, 100);
			  	  	  	}
			  	  	}
			  	});
			
			  	//click on body exit
			  	$(document.body).on('click', function(e) {
			  	  	var clicked;
			  	  	if ($(e.target).hasClass('materialSingleSelect')) {
			  	  	  	clicked = $(e.target).find('.select'+scope.currentid).first();
			  	  	} else if ($(e.target).hasClass('select'+scope.currentid)) {
			  	  	  	clicked = $(e.target);
			  	  	} else if ($(e.target).parent().hasClass('select'+scope.currentid)) {
			  	  	  	clicked = $(e.target).parent();
			  	  	}
					
			  	  	if ($(e.target).hasClass('materialSingleSelect') || 
			  	  		$(e.target).hasClass('select'+scope.currentid) || 
			  	  		$(e.target).parent().hasClass('select'+scope.currentid)) {
			  	  	  	hideMaterialList($('.select'+scope.currentid).not(clicked));
			  	  	} else {
			  	  	  	if ($('.select').hasClass('isOpen')) {
			  	  	    	hideMaterialList($('.select'+scope.currentid));
			  	  	  	}
			  	  	}
			  	});
			  	hideMaterialList($('.select'+scope.currentid));
			})

		}
	};
});