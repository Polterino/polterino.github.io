// ==UserScript==
// @name         Bookmark stem moodle (unipd) courses
// @namespace    http://tampermonkey.net/
// @version      2024-10-01
// @description  This script let's you bookmark courses to find them faster
// @author       Polterino
// @match        https://stem.elearning.unipd.it/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("Stem moodle extension - Developed by Polterino")
    var courseList = [];
    var userInput = "";

    function addIcon(inputDiv, saveIcon)
    {
        const iconContainer = document.createElement('div'); // Crea un nuovo div per le icone
        iconContainer.style.position = 'absolute';
        iconContainer.style.top = '10px';
        iconContainer.style.right = '10px';
        iconContainer.style.display = 'flex'; // Usa flexbox per allineare le icone
        iconContainer.style.gap = '5px'; // Spazio tra le due icone
        iconContainer.style.cursor = 'pointer';
        iconContainer.style.backgroundColor = 'white';
        iconContainer.style.borderRadius = '50px';
        iconContainer.style.padding = '5px';
        iconContainer.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
/*
        if (saveIcon === true) // se voglio che sia l'icona per salvare il corso
        {
            iconContainer.innerHTML = '<i class="fa fa-star"></i>';
            iconContainer.onclick = function() {
                iconContainer.style.transform = 'scale(1.2)'; // Ingrossa l'icona

                // Ripristina la dimensione originale dopo 200ms
                setTimeout(() => {
                    iconContainer.style.transform = 'scale(1)'; // Ripristina la dimensione
                    iconContainer.style.pointerEvents = 'none';
                }, 200);

                setCourseCookie(inputDiv.getAttribute('data-courseid'), 'true', 365); // Imposta il cookie
            };
        }
        else // altrimenti l'icona serve per rimuovere il corso
        {
            iconContainer.innerHTML = '<i class="fa fa-close"></i>';
            iconContainer.onclick = function() {
                iconContainer.style.transform = 'scale(1.2)'; // Ingrossa l'icona
                // Ripristina la dimensione originale dopo 200ms
                setTimeout(() => {
                    iconContainer.style.transform = 'scale(1)'; // Ripristina la dimensione
                    iconContainer.style.pointerEvents = 'none';
                }, 200);
                deleteCourseCookie(inputDiv.getAttribute('data-courseid'));
            };
        }
*/
        const mainIcon = document.createElement('i');
        mainIcon.className = saveIcon ? 'fa fa-star' : 'fa fa-close';

        mainIcon.onclick = function() {
            mainIcon.style.transform = 'scale(1.2)'; // Effetto di ingrandimento
            setTimeout(() => {
                mainIcon.style.transform = 'scale(1)'; // Ripristina la dimensione
                mainIcon.style.pointerEvents = 'none'; // Disabilita il click dopo l'animazione
            }, 200);

            if (saveIcon === true) {
                setCourseCookie(inputDiv.getAttribute('data-courseid'), 'true', 365); // Imposta il cookie
            } else {
                deleteCourseCookie(inputDiv.getAttribute('data-courseid')); // Rimuove il cookie
            }
        };
        iconContainer.appendChild(mainIcon);

        const extraIcon = document.createElement('i');
        extraIcon.className = 'fa fa-image'; // Cambia l'icona secondo le tue preferenze
        extraIcon.style.marginLeft = '5px'; // Spazio tra le icone

        extraIcon.onclick = function() {
            extraIcon.style.transform = 'scale(1.2)'; // Effetto di ingrandimento
            setTimeout(() => {
                extraIcon.style.transform = 'scale(1)'; // Ripristina la dimensione
            }, 200);
            // Azione della seconda icona
            userInput = prompt("Inserisci il link dell'immagine (lascia vuoto se vuoi rimuoverla)");
            if (userInput !== null) { setCourseCookie(inputDiv.getAttribute('data-courseid')+"-image", userInput, 365); }
        };
        // Aggiungi la seconda icona al contenitore
        iconContainer.appendChild(extraIcon);

        // Aggiungi l'icona al div principale
        inputDiv.style.position = 'relative'; // Necessario per il posizionamento assoluto dell'icona
        inputDiv.appendChild(iconContainer);
        return inputDiv
    }

    function setDivImage(div, url)
    {
        const courseImageInside = div.querySelector('.courseimageinside');

        if (courseImageInside) {
            courseImageInside.style.backgroundImage = `url("${url}")`;
        } else {
            console.log('Errore nel cambiare lo sfondo del corso '+ div.getAttribute('data-courseid'));
        }
    }

    function setCourseCookie(cname, cvalue, exdays)
    {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); // Scadenza del cookie
        const expires = "expires=" + d.toUTCString(); // Imposta la scadenza
        document.cookie = cname + "=" + cvalue + ";" + expires + '; path=/';
        if (cname.endsWith("image")) { console.log('Immagine correttamente salvata'); }
        else { console.log('Corso correttamente salvato'); }
    }

    function getCourseCookies()
    {
        // Ottieni tutti i cookie
        const allCookies = document.cookie.split(';');
        const trueCookies = [];

        // Itera attraverso tutti i cookie
        allCookies.forEach(cookie => {
            // Rimuovi eventuali spazi iniziali e dividi il cookie in nome e valore
            const [name, value] = cookie.trim().split('=');

            if (value === 'true' || value.startsWith("http")) {
                trueCookies.push(name);
            }
        });

        return trueCookies; // Restituisci l'array dei cookie con valore "true"
    }

    function getCookieValue(cookieName)
    {
        // Ottieni tutti i cookie
        const allCookies = document.cookie.split(';');

        // Cerca il cookie specifico
        for (let cookie of allCookies)
        {
            const equalIndex = cookie.indexOf('=');

            // Se il segno '=' esiste, separa il nome e il valore
            if (equalIndex !== -1) {
                const name = cookie.substring(0, equalIndex).trim()
                const value = cookie.substring(equalIndex + 1).trim()

                if (name === cookieName && name.endsWith("image")) { return value; }

            } else {
                console.log('Nessun segno "=" trovato nel cookie.');
            }

            const [name, value] = cookie.trim().split('=');
            if (name === cookieName) {
                return value; // Decodifica il valore e restituiscilo
            }
        }
        return null; // Restituisce null se non trovato
    }

    function deleteCourseCookie(courseID)
    {
        document.cookie = `${courseID}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
        console.log("Corso correttamente eliminato");
    }

    // Cerco il div che contiene tutti i corsi come div figli
    const rowDiv = document.querySelector('.courses.theme-list-courses.frontpage-course-list-enrolled .row');

    if (rowDiv)
    {
        const divList = rowDiv.querySelectorAll('div');

        // Salvo solo i div validi, ovvero quelli con un course id
        divList.forEach((div) => {
            if(div.getAttribute('data-courseid'))
            {
                courseList.push(div);
            }
        });
    }
    else { console.log("Div con la lista di corsi non trovato."); }

    // Cerco i corsi che sono stati salvati
    var clonedDivList = [];
    var bookMarkedDiv = false;
    const courseCookies = getCourseCookies();
    courseList.forEach((div) => {
        const courseId = div.getAttribute('data-courseid');
        bookMarkedDiv = false;

        const foundCookie = courseCookies.includes(courseId);
        const foundCookieImage = courseCookies.includes(courseId+"-image");
        // Se il courseId corrisponde a quello cercato
        if (foundCookie)
        {
            if (getCookieValue(courseId) === "true")
            {
                clonedDivList.push(addIcon(div.cloneNode(true), false));
                bookMarkedDiv = true;
            }
        }
        if (foundCookieImage)
        {
            const url = getCookieValue(courseId+"-image");
            setDivImage(div, url);
            if(bookMarkedDiv) {
                setDivImage(clonedDivList[clonedDivList.length-1], url);
            }
        }

        // aggiungo le icone per salvare i corsi
        div = addIcon(div, true);
    });

    // Creo un nuovo div dove inserire i corsi selezionati
    const mainDiv = document.querySelector('.box.py-3.d-flex.justify-content-center');

    if (mainDiv)
    {
        const newDiv = document.createElement('div');
        newDiv.id = "frontpage-course-list";

        const titolo = document.createElement('h2');
        titolo.textContent = "Corsi salvati";

        const secondDiv = document.createElement('div');
        secondDiv.className = 'courses theme-list-courses frontpage-course-list-enrolled';

        const newRowDiv = document.createElement('div');
        newRowDiv.classList.add('row');

        // inserisco ogni corso che devo clonare
        clonedDivList.forEach((div) => {
            newRowDiv.appendChild(div);
        });

        newDiv.style.backgroundColor = "#f4f4f4";
        newDiv.style.marginTop = "10px";

        newDiv.appendChild(titolo);
        newDiv.appendChild(secondDiv);
        secondDiv.appendChild(newRowDiv);

        // Inserisci il nuovo div subito dopo il div esistente
        mainDiv.insertAdjacentElement('afterend', newDiv);
    }
    else { console.log("Main non trovato."); }
})();