import planner from "../planner.js";

export default class Eintrag {

    constructor(titel, betrag, typ, datum) {
        this._titel = titel;
        this._betrag = betrag;
        this._typ = typ;
        this._datum = datum;
        this._timestamp = Date.now();
        this._html = this._html_generieren();
    }

    /**
     * Getter-Methode für den Titel des Eintrags.
     */
    titel() {
        return this._titel;
    }

    /**
     * Getter-Methode für den Betrag des Eintrags.
     */
    betrag() {
        return this._betrag;
    }

    /**
     * Getter-Methode für den Typ des Eintrags.
     */
    typ() {
        return this._typ;
    }

    /**
     * Getter-Methode für das Datum des Eintrags.
     */
    datum() {
        return this._datum;
    }

    /**
     * Getter-Methode für den Timestamp des Eintrags.
     */
    timestamp() {
        return this._timestamp;
    }

    /**
     * Getter-Methode für das HTML des Eintrags.
     */
    html() {
        return this._html;
    }

    /**
     * Diese private Methode definiert das Click-Event für den Eintrag-Entfernen-Button
     * der Eintragselemente und löst damit das Entfernen eines Eintrags aus dem
     * Haushaltsbuch aus. Sie wird in this._html_generieren() genutzt.
     */
    _eintrag_entfernen_event_hinzufuegen(listenpunkt) {
        listenpunkt.querySelector(".entfernen-button").addEventListener("click", e => {
            let timestamp = e.target.parentElement.getAttribute("data-timestamp");
            planner.eintrag_entfernen(timestamp);
        });
    }

    /**
     * Diese private Methode generiert das HTML eines Eintrags und setzt das Click-Event für den
     * Eintrag-Entfernen-Button mithilfe der Methode this._eintrag_entfernen_event_hinzufuegen().
     */
    _html_generieren() {
        let listenpunkt = document.createElement("li");
        this._typ === "einnahme" ? listenpunkt.setAttribute("class", "einnahme") : listenpunkt.setAttribute("class", "ausgabe");
        listenpunkt.setAttribute("data-timestamp", this._timestamp);

        let datum = document.createElement("span");
        datum.setAttribute("class", "datum");
        datum.textContent = this._datum.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        listenpunkt.insertAdjacentElement("afterbegin", datum);

        let titel = document.createElement("span");
        titel.setAttribute("class", "titel");
        titel.textContent = this._titel;
        datum.insertAdjacentElement("afterend", titel);

        let betrag = document.createElement("span");
        betrag.setAttribute("class", "betrag");
        betrag.textContent = `${(this._betrag / 100).toFixed(2).replace(/\./, ",")} €`;
        titel.insertAdjacentElement("afterend", betrag);

        let button = document.createElement("button");
        button.setAttribute("class", "entfernen-button");
        betrag.insertAdjacentElement("afterend", button);

        let icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-trash");
        button.insertAdjacentElement("afterbegin", icon);

        this._eintrag_entfernen_event_hinzufuegen(listenpunkt);

        return listenpunkt;
    }
    
}