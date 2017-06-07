//component for material design select box
angular.module('retrieve').directive('selectBox', function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/selectBox/selectBox.html',
		controllerAs: 'select',
		controller: ['$scope', function($scope){
			/*  PLANS:
			 *	options:
			 *		1. to open only down
			 *		2. to have a submit button
			 *		3. multiselect vs single select
			 *		4. search input
			 *	maybe try to minimize the amount of jquery?
			*/
			var _this = this;

			//define some test case stuff 
			//(later will be passed through scope)
			_this.options = [
				{name:'Example 1', value:false},
				{name:'Example 2', value:false},
				{name:'Example 3', value:false},
			];

			//updates the currently selected choices
			function refreshOptions() {
				_this.currentlySelected = [];
				angular.forEach(_this.options, function(option){
					if (option.value) {
						_this.currentlySelected.push(option.name);
					}
				});
			} 

			//update value clicked and refresh selected
			refreshOptions();
			_this.updateOptions = function(option) {
				option.value = !option.value;
				refreshOptions();

			};

			//clear selections
			_this.clearSelections = function() {
				angular.forEach(_this.options, function(option){
					option.value = false;
				});
				refreshOptions();
			};

		}],
		link: function(scope, elem, attrs) {

			$(function(){

			    var closeSelectTimeout;

			    //hides list
			    function hideMaterialList(parent){
			        parent.css({'overflow': 'hidden'}).removeClass('isOpen');
			        clearTimeout(closeSelectTimeout);
			        closeSelectTimeout = setTimeout(function(){
			            parent.parent().css({'z-index': 0 });
			        }, 200);
			    }

			    //opening animation
			    $(document.body).on('mousedown', '.materialBtn, .select li', function(event){
			        if(parseFloat($(this).css('opacity')) > 0 && $(document).width() >= 1008){
			            var maxWidthHeight = Math.max($(this).width(), $(this).height());
			            if ($(this).find("b.drop").length == 0 || $(this).find("b.drop").css('opacity') != 1) {
			                // .drop opacity is 1 when it's hidden...css animations
			                drop = $('<b class="drop" style="width:'+ maxWidthHeight +'px;height:'+ maxWidthHeight +'px;"></b>').prependTo(this);
			            }
			            else {
			                $(this).find("b.drop").each(function(){
			                    if($(this).css('opacity') == 1){
			                        drop = $(this).removeClass("animate");
			                        return;
			                    }
			                })
			            }
			            
			            x = event.pageX - drop.width()/2 - $(this).offset().left;
			            y = event.pageY - drop.height()/2 - $(this).offset().top;

			            drop.css({top: y, left: x}).addClass("animate");
			        }
			    });

			    $(document.body).on('dragstart', '.materialBtn, .select li', function(e){
			        e.preventDefault();
			    })

			    //selecting an actual choice
			    var selectTimeout;
			    $(document.body).on('click', '.select li', function() {
			        var parent = $(this).parent();

			        if ($(this).attr('data-selected') == 'true') {
			            $(this).removeAttr('data-selected');

			        } else {
			            if ($(this).attr('data-value') != 'default') {
			                $(this).attr('data-selected', 'true');
			            }
			        }

			        clearTimeout(selectTimeout);
			        if (parent.hasClass('isOpen'))
			        {
			            if(parent.parent().hasClass('required')){
			                if(parent.children('[data-selected]').attr('data-value')){
			                    parent.parents('.materialSelect').removeClass('error empty');
			                }
			                else{
			                    parent.parents('.materialSelect').addClass('error empty');
			                }
			            }
			        }
			        else {
			            var pos = Math.max(($('li[data-selected]', parent).index() - 2) * 48, 0);
			            parent.addClass('isOpen');
			            parent.parent().css('z-index', '999');
			            if($(document).width() >= 1008){
			                var i = 1;
			                selectTimeout = setInterval(function(){
			                    i++;
			                    parent.scrollTo(pos, 50);
			                    if(i == 2){
			                        parent.css('overflow', 'auto');
			                    }
			                    if(i >= 4){
			                        clearTimeout(selectTimeout);
			                    }
			                }, 100);
			            }
			            else{
			                parent.css('overflow', 'auto').scrollTo(pos, 0);
			            }
			        }
			    });

			    // verification (is this used?)
			    $('.materialInput input').on('change input verify', function(){
			        if ($(this).attr('required') == 'true'){
			            if($(this).val().trim().length){
			                $(this).parent().removeClass('error empty');
			            }
			            else{
			                $(this).parent().addClass('error empty');
			                $(this).val('');
			            }
			        }
			        else{
			            if($(this).val().trim().length){
			                $(this).parent().removeClass('empty');
			            }
			            else{
			                $(this).parent().addClass('empty');
			            }
			        }
			    });

			    //on blur
			    $(document.body).on('click', function(e) {
			        var clicked;
			        if ($(e.target).hasClass('materialSelect')) {
			            clicked = $(e.target).find('.select').first();
			        }
			        else if ($(e.target).hasClass('select')) {
			            clicked = $(e.target);
			        }
			        else if ($(e.target).parent().hasClass('select')) {
			            clicked = $(e.target).parent();
			        }

			        if (!clicked) {
			        	//...heres where the empty case is handled
			        }

			        if ($(e.target).hasClass('materialSelect') || 
			            $(e.target).hasClass('select') || 
			            $(e.target).parent().hasClass('select')) {
			            hideMaterialList($('.select').not(clicked));
			        }
			        else {
			            if($('.select').hasClass('isOpen')){
			                hideMaterialList($('.select'));
			            }
			        }
			    });

			    hideMaterialList($('.select'));
			})
		}
	};
});