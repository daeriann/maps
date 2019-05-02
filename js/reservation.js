var Counter = {
    minutes : 20, 
    seconds : 00,
    minutesElt : null, 
    secondsElt : null, 
    nameStation : null, 
    countDown : null, 
    countDownEnd : null,
    cancellationReservation : false, 

    launchReservation : function() {
        
        sessionStorage.setItem("minutes", this.minutes);
        sessionStorage.setItem("seconds", this.seconds);
        sessionStorage.setItem("nameStation", reponseInfoStation.name);

        
        this.nameStation = sessionStorage.getItem("nameStation");

        
        document.getElementById("infoStation").style.display = "none"; 
        document.getElementById("containerCanvas").style.display = "none"; 
        document.getElementById("sectionLeasing").style.display = "block"; 

       
        document.getElementById("messageConfirmationLeasing").style.display = "block";
        
        setTimeout(function() {
            document.getElementById("messageConfirmationLeasing").style.display = "none";
        }, 3000);

        
        document.getElementById("messageLeasing").querySelector("strong").innerHTML = this.nameStation;

        
        this.countDown = setInterval("Counter.initCounter()", 1000);
    },

    
    initCounter : function() {
        if(this.minutes < 10) {

            this.minutesElt = "0" + this.minutes;
        } else {
            
            this.minutesElt = this.minutes;
        }
        
        if(this.seconds < 10) {

            this.secondsElt = "0" + this.seconds;
        } else {
            
            this.secondsElt = this.seconds;
        }

        
        document.getElementById("countdown").innerHTML = this.minutesElt + " : " + this.secondsElt;

        
        this.counterStart();
    },

    
    counterStart : function() {
        if((this.minutes >= 0) && (this.seconds > 0)) {

            
            this.seconds--;
            
            sessionStorage.setItem("seconds", this.seconds);

        } else if((this.minutes > 0) && (this.seconds <= 0)) { 

            
            this.seconds = 59;
            
            this.minutes--;

            
            sessionStorage.setItem("minutes", this.minutes);
            sessionStorage.setItem("seconds", this.seconds);

        } else if((this.minutes == 0) && (this.secondes == 0)) { 

            
            document.getElementById("messageEndLeasing").style.display = "block";

            
            document.getElementById("messageLeasing").style.display = "none";

            
            this.countDownEnd = setTimeout("Counter.reservationEnd()", 4000);
        }
    },

    
    reservationEnd : function() {
        
        clearInterval(this.countDown);

        
        this.minutes = 20;
        this.seconds = 00;
        this.minutesElt = null;
        this.secondsElt = null;

        
        sessionStorage.clear();

        
        clearTimeout(this.countDownEnd);

        
        document.getElementById("sectionLeasing").style.display = "none";
        document.getElementById("messageEndLeasing").style.display = "none";
        document.getElementById("messageLeasing").style.display = "block";
    },

    
    cancelReservation : function() {

        
        document.getElementById("cancellationReservation").style.display = "block";
        
        setTimeout(function() {
            document.getElementById("cancellationReservation").style.display = "none";
        }, 3000);

        
        this.reservationEnd();
    },

    
    verificationSessionStorage : function() {
        if (sessionStorage.getItem("minutes")) { 

            this.minutes = sessionStorage.getItem("minutes");
            this.secondes = sessionStorage.getItem("seconds");
            this.nameStation = sessionStorage.getItem("nameStation");

            
            this.countDown = setInterval("countDown.initcountDown()", 1000);

            
            document.getElementById("messageLeasing").querySelector("strong").innerHTML = this.nameStation;
            document.getElementById("sectionLocation").style.display = "block";
        } else { 

            document.getElementById("sectionLeasing").style.display = "none";
        }
    },

    
    resetReservation : function() {
        if(this.nameStation != reponseInfoStation.name) {

            this.cancellationReservation = window.confirm("Cette nouvelle reservation annulera la reservation sur la station : " + this.nameStation +
            "\net enregistrera une nouvelle reservation sur la station " + reponseInfoStation.name);
        } else { 

            this.cancellationReservation = window.confirm("Cette nouvelle reservation remplacera la reservation deja existante sur la station : \n" + this.nameStation);
        }

        if (this.cancellationReservation) { 

            sessionStorage.clear();

            
            clearInterval(this.countDown);

            
            this.minutes = 20;
            this.seconds = 00;
            this.minutesElt = null;
            this.secondsElt = null;

            
            this.launchReservation();
        }
    }
}


Counter.verificationSessionStorage();


document.getElementById("buttonValidate").addEventListener("click", function() {
    localStorage.setItem("signature", Signature.canvas.toDataURL());
    Signature.clearCanvas(); 

    if(sessionStorage.getItem("minutes")) { 

        Counter.resetReservation();
    } else { 

        Counter.launchReservation();
    }
});


document.getElementById("cancellation").addEventListener("click", function() {

    Counter.cancelReservation();
});