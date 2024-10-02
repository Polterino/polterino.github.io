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

    function addIcon(inputDiv, saveIcon)
    {
        const iconContainer = document.createElement('div'); // Crea un nuovo div per l'icona

        // Imposta lo stile dell'icona
        iconContainer.style.position = 'absolute';
        iconContainer.style.top = '10px';
        iconContainer.style.right = '10px';
        iconContainer.style.cursor = 'pointer';
        iconContainer.style.backgroundColor = 'white';
        iconContainer.style.borderRadius = '50%';
        iconContainer.style.padding = '5px';
        iconContainer.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
        if (saveIcon === true)
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
        else
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

        // Aggiungi l'icona al div principale
        inputDiv.style.position = 'relative'; // Necessario per il posizionamento assoluto dell'icona
        inputDiv.appendChild(iconContainer);
        return inputDiv
    }

    function setCourseCookie(cname, cvalue, exdays)
    {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); // Scadenza del cookie
        const expires = "expires=" + d.toUTCString(); // Imposta la scadenza
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; // Crea il cookie
        console.log('Corso correttamente salvato');
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

            if (value === 'true') {
                trueCookies.push(name);
            }
        });

        return trueCookies; // Restituisci l'array dei cookie con valore "true"
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
    const courseCookies = getCourseCookies();
    courseList.forEach((div) => {
        const courseId = div.getAttribute('data-courseid');

        // Se il courseId corrisponde a quello cercato
        if (courseCookies.includes(courseId)) {
            clonedDivList.push(addIcon(div.cloneNode(true), false));
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
        newDiv.style.padding = "10px";
        newDiv.style.marginTop = "10px";

        newDiv.appendChild(titolo);
        newDiv.appendChild(secondDiv);
        secondDiv.appendChild(newRowDiv);

        // Inserisci il nuovo div subito dopo il div esistente
        mainDiv.insertAdjacentElement('afterend', newDiv);
    }
    else { console.log("Main non trovato."); }
})();