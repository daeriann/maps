// Recuperation list velo
 function ajaxGet (url, callback) {
    req = new XMLHttpRequest(); // Cretion d'une requete HTTP
    req.open("GET", url); // Requete HTTP GET asynchrone
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            // Appelle de "callback" en lui passant la reponse de la requete
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function() {
        console.error("Erreur rÃ©seau avec l'URL " + url);
    });
    req.send(null); // Envoi de la requete
}