allowReservation () =>{
	if(this.state === "CLOSED") { 

			this.state = "FERMER";
			document.getElementById("stateStation").style.color = "red";
			document.getElementById("bikeAvai").style.color = "red";
			this.authorization = false;

	} else if(this.state === "OPEN") { 

			this.state = "OUVERT";
			document.getElementById("etatStation").style.color = "";
			this.authorization = true;

			if(this.nbBike === 0) { 
				document.getElementById("bikeAvai").style.color = "red";
				this.authorization = false;
			} else if(this.nbBike > 0) {
				document.getElementById("bikeAvai").style.color = "";
			}
	}
}