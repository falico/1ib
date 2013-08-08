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

		var getMeeting = function(meeting) {
			var formatted = '<ul class="meetingDays">';

			if (meeting !== undefined) {
				for (var i = 0; i < meeting.length; i++) {
					formatted += '<li>'+meeting[i].day + ': ' + meeting[i].time+'</li>';
				}
			}

			formatted += '</ul>';

			return formatted;
		}

		var addNote = function(marker, note) {
			var buildNote = function() {
				var color = cell.color || "";
				var leader = cell.leader || "";
				var address = cell.address || "";
				var meeting = cell.meeting;

				var note = 
					'<div class="info">' +
					'<div class="cellcolor '+color+'"></div>'+
					'<div style="display: table-cell;">'+
					'<ul>' +
					'<li><b>Líder:</b> '+leader+'</li>'+
					'<li><b>Endereço:</b> '+address+'</li>'+
					'<li><b>Reuniões:</b> '+getMeeting(meeting)+'</li>'+
					'</ul></div></div>';
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
