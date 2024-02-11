// Percorso della cartella dei file
const folderPath = 'files/';

function getFileList() {
    fetch(folderPath)
        .then(response => response.text())
        .then(data => {
            // Analizza il contenuto della cartella
            const parser = new DOMParser();
            const htmlContent = parser.parseFromString(data, 'text/html');
            const links = htmlContent.querySelectorAll('a');

            // Aggiungi i file e le cartelle alla lista
            const fileList = document.getElementById('file-list');
            links.forEach(link => {
                const fileName = link.getAttribute('href');
                // Escludi i link con nomi speciali
                if (!fileName.startsWith('?') && fileName!=="/") {
                    const listItem = document.createElement('li');
                    const fileLink = document.createElement('a');
                    fileLink.textContent = decodeURIComponent(fileName).replace(/%20/g, ' ');
                    // Se il link è un file PDF, mostra l'icona PDF
                    if (fileName.toLowerCase().endsWith('.pdf')) {
                        const pdfIcon = document.createElement('img');
                        pdfIcon.src = 'img/pdf.png'; // Percorso dell'icona PDF
                        pdfIcon.alt = 'PDF';
                        pdfIcon.classList.add('file-icon'); // Aggiungi classe per lo stile
                        listItem.appendChild(pdfIcon);
                    } else if (fileName.endsWith('/')) {
                        // Se il link è una cartella, aggiungi un'icona di cartella
                        const folderIcon = document.createElement('img');
                        folderIcon.src = 'img/folder.png'; // Percorso dell'icona della cartella
                        folderIcon.alt = 'Folder';
                        folderIcon.classList.add('file-icon'); // Aggiungi classe per lo stile
                        listItem.appendChild(folderIcon);
                    }
                    if (!fileName.endsWith('/')) {
                        // Se il link è un file, imposta l'attributo href per il download diretto
                        fileLink.setAttribute('href', folderPath + fileName);
                        fileLink.setAttribute('target', '_blank');
                    }
                    fileLink.appendChild(document.createTextNode(' ')); // Aggiungi uno spazio tra l'icona e il nome del file/cartella
                    listItem.appendChild(fileLink);
                    fileList.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Errore nel recupero della lista dei file:', error));
}

// Funzione per visualizzare i contenuti di una cartella quando si fa clic su di essa
function showFolderContents(folderUrl) {
    // Svuota la lista corrente dei file
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';

    // Ottieni i contenuti della cartella specificata
    fetch(folderUrl)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlContent = parser.parseFromString(data, 'text/html');
            const links = htmlContent.querySelectorAll('a');

            // Aggiungi i file e le cartelle alla lista
            links.forEach(link => {
                const fileName = link.getAttribute('href');
                const listItem = document.createElement('li');
                const fileLink = document.createElement('a');
                fileLink.textContent = fileName;
                if (fileName.endsWith('/')) {
                    // Se il link è una cartella, aggiungi un evento onclick per visualizzare i suoi contenuti
                    fileLink.setAttribute('href', '#');
                    fileLink.onclick = () => showFolderContents(folderUrl + fileName);
                } else {
                    // Se il link è un file, imposta l'attributo href per il download diretto
                    fileLink.setAttribute('href', folderUrl + fileName);
                }
                listItem.appendChild(fileLink);
                fileList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Errore nel recupero della lista dei file della cartella:', error));
}

// Richiama la funzione per ottenere la lista dei file iniziale
getFileList();
