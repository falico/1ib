var PIB = PIB || {};

PIB.createMap = function(element, center) {
	var map = {};

	var init = function() {
		if (center === undefined) {
			throw {
				name: "init-error",
				message: "missing map center"
			};
		}

		var mapOptions = {
			center: new google.maps.LatLng(center.lat, center.lng),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		google.maps.visualRefresh = true;
		map = new google.maps.Map(element, mapOptions);
	};

	var addCell = function(cell, note) {
		var addMarker = function(){
			var getMarkerTitle = function() {
				return "[" + cell.color + "] " + cell.leader;
			}

			var location = new google.maps.LatLng(cell.lat, cell.lng);

			var marker = new google.maps.Marker({
				position: location,
				map: map,
				title: getMarkerTitle()
			});

			return marker;
		}

		var addNote = function(marker, note) {
			var buildNote = function() {
				var note = 

				/*'<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';*/

				'<div class="cellNote">'+
				'<ul>' +
					'<li><span class="cellProperty">Líder: </span><span class="cell_value">'+cell.leader+'</span></li>'+
					'<li><span class="cellProperty">Cor: </span><span class="cell_value">'+cell.color+'</span></li>'+
					'<li><span class="cellProperty">Endereço: </span><span class="cell_value">'+cell.address+'</span></li>'+
					'<li><span class="cellProperty">Reuniões: </span><span class="cell_value">'+cell.meeting+'</span></li>'+
					'</ul></div>';

				return note;
			}

			var placeNote = function(note) {
				var infoWindow = new google.maps.InfoWindow({
					content: note
				});

				google.maps.event.addListener(marker, 'click', function() {
					infoWindow.open(map, marker);
				});
			}

			note = note || buildNote();
			placeNote(note);
		}

		var marker = addMarker();
		addNote(marker, note);
	}

	init();

	return {
		addCell : addCell
	};
};
