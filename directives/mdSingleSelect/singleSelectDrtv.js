//component for material design select box
angular.module('retrieve').directive('singleSelect', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/mdSingleSelect/singleSelect.html',
		scope: { 
			options: '=', 
			selected: "=" 
		},
		controllerAs: 'select',
		controller: ['$scope', function($scope){
			/*  PLANS:
			 *	options:
			 *		1. to open only down
			 *		2. to make based on id, so could have multiple per page
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
			
			  function hideMaterialList(parent) {
			    parent.css({
			      'overflow': 'hidden'
			    }).removeClass('isOpen');
			    clearTimeout(closeSelectTimeout);
			    closeSelectTimeout = setTimeout(function() {
			      parent.parent().css({
			        'z-index': 0
			      });
			    }, 200);
			  }

			  //opening animation
			  $(document.body).on('mousedown', '.materialBtn, .select li', function(event) {
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
			      drop.css({
			        top: y,
			        left: x
			      }).addClass("animate");
			    }
			  });

			  $(document.body).on('dragstart', '.materialBtn, .select li', function(e) {
			    e.preventDefault();
			  })
			
			  var selectTimeout;
			  $(document.body).on('click', '.select li', function() {
			    var parent = $(this).parent();
			    parent.children('li').removeAttr('data-selected');
			    $(this).attr('data-selected', 'true');
			    clearTimeout(selectTimeout);
			    if (parent.hasClass('isOpen')) {
			      if (parent.parent().hasClass('required')) {
			        if (parent.children('[data-selected]').attr('data-value')) {
			          parent.parents('.materialSelect').removeClass('error empty');
			        } else {
			          parent.parents('.materialSelect').addClass('error empty');
			        }
			      }
			      hideMaterialList($('.select'));
			    } else {
			      var pos = Math.max(($('li[data-selected]', parent).index() - 2) * 48, 0);
			      parent.addClass('isOpen');
			      parent.parent().css('z-index', '999');
			      if ($(document).width() >= 1008) {
			        var i = 1;
			        selectTimeout = setInterval(function() {
			          i++; 
			          if (i == 2) {
			            parent.css('overflow', 'auto');
			          }
			          if (i >= 4) {
			            clearTimeout(selectTimeout);
			          }
			        }, 100);
			      }
			    }
			  });
			
			  $('.materialInput input').on('change input verify', function() {
			    if ($(this).attr('required') == 'true') {
			      if ($(this).val().trim().length) {
			        $(this).parent().removeClass('error empty');
			      } else {
			        $(this).parent().addClass('error empty');
			        $(this).val('');
			      }
			    } else {
			      if ($(this).val().trim().length) {
			        $(this).parent().removeClass('empty');
			      } else {
			        $(this).parent().addClass('empty');
			      }
			    }
			  });
			
			  $(document.body).on('click', function(e) {
			    var clicked;
			    if ($(e.target).hasClass('materialSelect')) {
			      clicked = $(e.target).find('.select').first();
			    } else if ($(e.target).hasClass('select')) {
			      clicked = $(e.target);
			    } else if ($(e.target).parent().hasClass('select')) {
			      clicked = $(e.target).parent();
			    }
			
			    if ($(e.target).hasClass('materialSelect') || $(e.target).hasClass('select') || $(e.target).parent().hasClass('select')) {
			      hideMaterialList($('.select').not(clicked));
			    } else {
			      if ($('.select').hasClass('isOpen')) {
			        hideMaterialList($('.select'));
			      }
			    }
			  });
			  hideMaterialList($('.select'));
			})

		}
	};
});