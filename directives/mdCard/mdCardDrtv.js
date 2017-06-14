//component for material design card / input form
angular.module('retrieve').directive('rtvCard', ['$location', function($location) {
    return {
        templateUrl: 'directives/mdCard/mdCard.html',
        restrict: 'E',
        transclude: true,
        scope: {
            options: '=',
            current: '='
        },
        controllerAs: 'frm',
        controller: ['$scope', function($scope) {

            /* CURRENT OPTIONS:
            * url         : sets card to be clickable, navigating to this url
            * color       : sets color of icon
            * header      : adds a header, with this as the text
            * icon        : adds an icon to the header
            * description : adds a description into header
            * footer      : enables the footer to be shown (currently only has a default modal cancel btn)
            * cancel      : enables the default cancel modal button
            * padding     : sets padding of card
            * margin      : sets margin of card
            * alert       : sets the card to be the custom smaller size (for alert or smaller dialogs)
            * tabs        : not yet implemented
            * */

            //init setup
            var _this = this;
            _this.options = $scope.options;

            //card clickable
            _this.clickable = (!!_this.options.url);
            _this.url = (!!_this.options.url) ? _this.options.url : '';

            //color
            _this.color = (!!_this.options.color) ? _this.options.color : '';

            //header
            _this.hasHeader = (!!_this.options.header);
            _this.header = (!!_this.options.header) ? _this.options.header : '';

            //header icon
            _this.hasHeaderIcon = (!!_this.options.icon);
            _this.icon = (!!_this.options.icon) ? _this.options.icon : '';

            //description
            _this.hasDescription = (!!_this.options.description);
            _this.description = (!!_this.options.description) ? _this.options.description : '';

            //footer stuff
            _this.hasFooter = (!!_this.options.footer);
            _this.footer = (!!_this.options.footer) ? _this.options.footer : '';

            //cancel button
            _this.hasCancel = (!!_this.options.cancel);
            _this.cancel = (!!_this.options.cancel) ? _this.options.cancel : '';

            //tabs
            /*_this.hasTabs = (!!_this.options.tabs);
            _this.tabs = (!!_this.options.tabs) ? _this.options.tabs : [];
            _this.activeTab = (!!_this.options.activeTab) ? _this.options.activeTab : '';
            _this.tabContent = (!!_this.options.tabContent) ? _this.options.tabContent : '';
            _this.changeTab = function(tab) {
                _this.activeTab = tab;
                _this.options.activeTab = tab;
            };*/

            /*---- styling ----*/
            var padding = (!!_this.options.padding)? 'padding:'+_this.options.padding+';' :'';
            var margin = (!!_this.options.margin)? 'margin:'+_this.options.margin+';' :'';
            var width = (!!_this.options.alert)?
                'min-width:384px;max-width:384px;margin-left:115px;':
                'min-width:480px;max-width:1024px;';
            _this.styling = padding + margin + width;
            _this.footerRowClass = '';
            if (!!_this.options.footer) {
                switch (_this.options.footer) {
                    case 'left': _this.footerRowClass = 'rtvmd-row-left'; break;
                    case 'right': _this.footerRowClass = 'rtvmd-row-right'; break;
                    case 'center': _this.footerRowClass = 'rtvmd-row-center'; break;
                }
            }

            /*---- functions ----*/
            _this.goToUrl = function() {
                if (_this.clickable)
                    window.location.href = _this.url;
            };
        }]
    };
}]);
