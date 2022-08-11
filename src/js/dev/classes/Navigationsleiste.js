export default class Navigationsleiste {

    constructor() {
        this._html = this._html_generieren();
    }

    /**
     * Diese private Methode generiert das HTML der Navigationsleiste.
     */
    _html_generieren() {
        let navigationsleiste = document.createElement("nav");
        navigationsleiste.setAttribute("id", "navigationsleiste");

        let anker = document.createElement("a");
        anker.setAttribute("href", "#");

        let span = document.createElement("span");
        span.setAttribute("id", "markenname");
        span.textContent = "MEIN HAUSHALTSBUCH";
        anker.insertAdjacentElement("afterbegin", span);

        navigationsleiste.insertAdjacentElement("afterbegin", anker);

        return navigationsleiste;
    }

    /**
     * Diese Methode zeigt die generierte Navigationsleiste an der richtigen Stelle in der UI an.
     */
    anzeigen() {
        let body = document.querySelector("body");
        if (body !== null) {
            body.insertAdjacentElement("afterbegin", this._html);
        }
    }

    
}