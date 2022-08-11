export default class Fehlerbox {

    constructor(fehlertext, formular_fehler) {
        this._fehlertext = fehlertext;
        this._formular_fehler = formular_fehler;
        this._html = this._html_generieren();
    }

    /**
     * Diese private Methode generiert das HTML einer Fehlerbox für das Eingabeformular.
     */
    _html_generieren() {
        let fehlerbox = document.createElement("div");
        fehlerbox.setAttribute("class", "fehlerbox");

        let fehlertext = document.createElement("span");
        fehlertext.textContent = this._fehlertext;
        fehlerbox.insertAdjacentElement("afterbegin", fehlertext);

        let fehlerliste = document.createElement("ul");
        this._formular_fehler.forEach(fehler => {
            let fehlerlistenpunkt = document.createElement("li");
            fehlerlistenpunkt.textContent = fehler;
            fehlerliste.insertAdjacentElement("beforeend", fehlerlistenpunkt);
        });
        fehlerbox.insertAdjacentElement("beforeend", fehlerliste);

        return fehlerbox;
    }

    /**
     * Diese private Methode entfernt bei Instanziierung einer neuen Fehlerbox eine eventuell 
     * bereits bestehende Fehlerbox, damit immer nur eine Fehlerbox angezeigt wird. Genutzt wird 
     * diese Methode in this.anzeigen().
     */
    _entfernen() {
        let bestehende_fehlerbox = document.querySelector(".fehlerbox");
        if (bestehende_fehlerbox !== null) {
            bestehende_fehlerbox.remove();
        }
    }

    /**
     * Diese Methode zeigt die generierte Fehlerbox an der richtigen Stelle im Eingabeformular an und entfernt
     * mit Hilfe von this._entfernen() eine evtuell bereits bestehende Fehlerbox.
     */
    anzeigen() {
        this._entfernen();
        let eingabeformular_container = document.querySelector("#eingabeformular-container");
        if (eingabeformular_container !== null) {
            eingabeformular_container.insertAdjacentElement("afterbegin", this._html);
        }
    }
 
}