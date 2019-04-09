// Appel ajax
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=8143056d9889c2dc39d43642d996fbd89da39bdb", function(reponse) {
    listStations = JSON.parse(reponse);

    
    listStations.forEach(function(station) {
        L.marker([station.position.lat,station.position.lng]).addTo(mymap)
        .bindPopup(station.name)
        L.marker('click'),function(){
        Station.treatmentDataStation(reponse);
        Station.insertDataStation();
    }
    });
    })

//objet station
var Station = {
    
    name : null, 
    address : null, 
    state : null, 
    nbBike : null,
    nbstand : null, 
    placeData : document.getElementById("listInfo").querySelectorAll("span"),

    treatmentDataStation : function(dataStation) {
        // Nom
        this.name = dataStation.name;
        // Adresse
        this.address = dataStation.address;
        // Etat
        this.state = dataStation.status;
        // Nombre de velo
        this.nbBike = dataStation.available_bike;
        // Nombre de stand
        this.nbStand = dataStation.available_bike_stands;
    },

    // ajouter dans la page
    insertDataStation : function() {

        document.getElementById("nameStationn").innerHTML = this.name;
        document.getElementById("addressStation").innerHTML = this.address;
        document.getElementById("stateStation").innerHTML = this.state;
        document.getElementById("bikeAvai").innerHTML = this.nbBike;
        document.getElementById("standAvai").innerHTML = this.nbStand;
    },
};
