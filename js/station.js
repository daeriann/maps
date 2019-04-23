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
        this.nbBike = dataStation.available_bikes;
        // Nombre de stand
        this.nbStand = dataStation.available_bike_stands;
    },

    // ajouter dans la page
    insertDataStation : function() {

        document.getElementById("nameStation").innerHTML = this.name;
        document.getElementById("addressStation").innerHTML = this.address;
        document.getElementById("stateStation").innerHTML = this.state;
        document.getElementById("bikeAvai").innerHTML = this.nbBike;
        document.getElementById("standAvai").innerHTML = this.nbStand;
    },

    allowReservation : function () {
        if(this.state === "CLOSED") { 
    
            this.state = "FERMER";
                document.getElementById("stateStation").style.color = "red";
                document.getElementById("bikeAvai").style.color = "red";
                this.authorization = false;
    
        } else if(this.state === "OPEN") { 
    
            this.state = "OUVERT";
                document.getElementById("stateStation").style.color = "green";
                this.authorization = true;
    
                if(this.nbBike === 0) { 
                    document.getElementById("bikeAvai").style.color = "red";
                    this.authorization = false;
                } else if(this.nbBike > 0) {
                    document.getElementById("bikeAvai").style.color = "green";
                }
        }
    }
}


