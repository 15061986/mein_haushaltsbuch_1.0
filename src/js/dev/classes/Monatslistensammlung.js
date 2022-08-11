import Monatsliste from "./Monatsliste.js";

export default class Monatslistensammlung {

    constructor() {
        this._monatslisten = [];
        this._html = this._html_generieren();
    }

    /**
     * Diese private Methode prüft anhand von Monat und Jahr des Eintrags, ob für den 
     * hinzuzufügenden Eintrag bereits eine passende Monatsliste in der Monatslistensammlung
     * enthalten ist. Wenn ja, wird der Eintrag zur entsprechenden Monatsliste hinzugefügt. Wenn nein,
     * wird mit Hilfe von this._monatsliste_hinzufuegen() eine neue Monatsliste instaziiert, der Eintrag 
     * wird zur Monatsliste hinzugefügt und die Monatsliste wird zur Monatslistensammlung hinzugefügt. 
     */
    _eintrag_hinzufuegen(eintrag) {
        let eintragsmonat = eintrag.datum().toLocaleString("de-DE", {month: "numeric"});
        let eintragsjahr = eintrag.datum().toLocaleString("de-DE", {year: "numeric"});
        let monatsliste_vorhanden = false;
        this._monatslisten.forEach(monatsliste => {
            if (eintragsmonat === monatsliste.monat() && eintragsjahr === monatsliste.jahr()) {
                monatsliste.eintrag_hinzufuegen(eintrag);
                monatsliste_vorhanden = true;
            }
        });
        if (!monatsliste_vorhanden) {
            this._monatsliste_hinzufuegen(eintragsjahr, eintragsmonat, eintrag);
        }
    }

    /**
     * Diese private Methode instaziiert anhand von Jahr und Monat eine neue Monatsliste
     * und fügt den übergebenen Eintrag zur Monatsliste hinzu. Anschließend wird
     * die Monatsliste zur Monatslistensammlung (this._monatslisten) hinzugefügt.
     */
    _monatsliste_hinzufuegen(jahr, monat, eintrag) {
        let neue_monatsliste = new Monatsliste(jahr, monat);
        neue_monatsliste.eintrag_hinzufuegen(eintrag);
        this._monatslisten.push(neue_monatsliste);
    }

    /**
     * Diese private Methode sortiert die Monatslistensammlung (this._monatslisten) absteigend nach dem 
     * Jahr der Monatslisten und innerhalb des Jahres absteigend nach dem Monat der Monatslisten.
     */
    _monatslisten_sortieren() {
        this._monatslisten.sort((monatsliste_a, monatsliste_b) => {
            if (monatsliste_a.jahr() < monatsliste_b.jahr()) {
                return 1;
            } else if (monatsliste_a.jahr() > monatsliste_b.jahr()) {
                return -1;
            } else {
                if (monatsliste_a.monat() < monatsliste_b.monat()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });
    }

    /**
     * Diese private Methode generiert das HTML der Monatslistensammlung.
     */
    _html_generieren() {
        let monatslisten = document.createElement("section");
        monatslisten.setAttribute("id", "monatslisten");

        this._monatslisten.forEach(monatsliste => {
            monatslisten.insertAdjacentElement("beforeend", monatsliste.html());
        });

        return monatslisten;
    }

    /**
     * Diese Methode aktualisiert die Monatslistensammlung anhand der sich im Haushaltsbuch
     * befindenden Einträge und zeigt die neue generierte Monatslistensammlung an.
     */
    aktualisieren(eintraege) {
        this._monatslisten = [];
        eintraege.forEach(eintrag => this._eintrag_hinzufuegen(eintrag));
        this._monatslisten_sortieren();
        this._html = this._html_generieren();
        this.anzeigen();
    }

    /**
     * Diese private Methode entfernt eine bereits bestehende Monatslistensammlung, wenn vorhanden.
     */
    _entfernen() {
        let monatslistensammlung = document.querySelector("#monatslisten");
        if (monatslistensammlung !== null) {
            monatslistensammlung.remove();
        }
    }

    /**
     * Diese Methode zeigt die generierte Monatslistensammlung an der richtigen Stelle in der UI an.
     */
    anzeigen() {
        let eingabeformular_container = document.querySelector("#eingabeformular-container");
        if (eingabeformular_container !== null) {
            this._entfernen();
            eingabeformular_container.insertAdjacentElement("afterend", this._html);
        }
    }

    
}