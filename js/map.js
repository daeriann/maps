//map
var mymap = L.map('mapid').setView([43.604262, 1.443565], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
    }).addTo(mymap);
    

	// Appel ajax
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=8143056d9889c2dc39d43642d996fbd89da39bdb", (reponse)=> {
	listStations = JSON.parse(reponse);

	
	listStations.forEach((reponseInfoStation) =>{
			var currentStation = Object.create(Station);
			var marker =L.marker([reponseInfoStation.position.lat,reponseInfoStation.position.lng]).addTo(mymap)
			.bindPopup(reponseInfoStation.name);
			
			marker.on('mouseover',function() {
				this.openPopup();
			});
			marker.on('mouseout', function() {
				this.closePopup();
			});
			marker.on('click', () =>{
				currentStation.treatmentDataStation(reponseInfoStation);
				currentStation.allowReservation();
				currentStation.insertDataStation();
			});
	});
})