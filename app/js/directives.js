var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('validPrice',function(){
	return{
		require: "ngModel",
		link: function(scope, elm, attrs, ctrl){
			
			var regex=/^-?\d{1,4}(\.\d{1,2})?$/;
			ctrl.$parsers.unshift(function(viewValue){
				var floatValue = parseFloat(viewValue);
				if(floatValue != 0 && floatValue >= -1000 && floatValue <=1000 && regex.test(viewValue)){
					ctrl.$setValidity('validPrice',true);
				}else{
				    ctrl.$setValidity('validPrice',false);
                }
				return viewValue;
			});
		}
	};
});

appDirectives.directive('validComment',function(){
	return{
		require: "ngModel",
		link: function(scope, elm, attrs, ctrl){
			var regex=/^[a-zA-Z0-9\D]*$/;
			ctrl.$parsers.unshift(function(viewValue){
				var inputString = viewValue;
				if( inputString.length < 512 && regex.test(inputString)){
					ctrl.$setValidity('validComment',true);
				}
                else{
				    ctrl.$setValidity('validComment',false);
                }
				return viewValue;
			});
		}
	};
});