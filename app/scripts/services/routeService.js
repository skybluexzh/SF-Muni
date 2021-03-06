'use strict';

/**
 * @ngdoc service
 * @name SFM.routeService
 * @description
 * # routeService
 * Factory in the SFM.
 */
angular.module('SFM')
.factory('routeService',['mapService', function(mapService) {
	function renderRoute(svg, routeData) {
		var projection = mapService.projection;
		
		var routeLineFunction = d3.svg.line()
									.x(function(d) { return projection([d.$.lon,d.$.lat])[0]; })
									.y(function(d) { return projection([d.$.lon,d.$.lat])[1]; })
									.interpolate('linear');

		var tag = routeData.$.tag;

		return $.each(routeData.path,function(key,path){
					svg.append('path')
						.attr("d", routeLineFunction(path.point))
						.attr("class", "route" )
						.attr("data-tag", tag)
						.attr("stroke", '#' + routeData.$.color)
						.attr("stroke-width", 2)
						.style("stroke-opacity", 0.5)
						.attr("fill", "none")
						.append("svg:title")
						.text(function(d) { 
							return routeData.$.title;
						});

					return svg;
		});
	}

	return {
		renderRoute: renderRoute
	};
}]);