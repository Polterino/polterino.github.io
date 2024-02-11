document.addEventListener('DOMContentLoaded', function() {
//    const folderPath = 'files/';
    const folderPath = 'https://github.com/Polterino/polterino.github.io/blob/8b65901f762ae2eb7173fbb24de65824ea7208a8/files/';

    const fileList = document.getElementById('file-list');
    const backButton = document.getElementById('back-button');

    // Funzione per ottenere la lista dei file
    function getFileList(folderUrl) {
        fetch(folderUrl)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const htmlContent = parser.parseFromString(data, 'text/html');
                const links = htmlContent.querySelectorAll('a');

                // Svuota la lista corrente dei file
                fileList.innerHTML = '';

                // Aggiungi un'icona della freccia indietro sopra la lista dei file
                if (folderUrl !== folderPath) {
                    backButton.style.display = 'block';
                    backButton.onclick = () => {
                        const parentFolder = folderUrl.split('/').slice(0, -2).join('/') + '/';
                        getFileList(parentFolder);
                    };
                } else {
                    backButton.style.display = 'none';
                }

                // Aggiungi i file e le cartelle alla lista
                links.forEach(link => {
                const fileName = link.getAttribute('href');
                // Escludi i link con nomi speciali
                if (!fileName.startsWith('?') && fileName!=="/" && fileName!=="/files/") {
                    const listItem = document.createElement('li');
                    const fileLink = document.createElement('a');
                    no_space = fileName;
                    fileLink.textContent = decodeURIComponent(no_space).replace(/%20/g, ' ');
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
                        fileLink.setAttribute('href', folderUrl + fileName);
                        fileLink.setAttribute('target', '_blank');
                    }
                    else{
                        fileLink.setAttribute('href', '#');
                        fileLink.onclick = () => getFileList(folderUrl + fileName);
                    }
                    fileLink.appendChild(document.createTextNode(' ')); // Aggiungi uno spazio tra l'icona e il nome del file/cartella
                    listItem.appendChild(fileLink);
                    fileList.appendChild(listItem);
                }
                });
            })
            .catch(error => console.error('Errore nel recupero della lista dei file:', error));
    }

    async function list_directory(user, repo, directory) {
        const url = `https://api.github.com/repos/${user}/${repo}/git/trees/main`;
        const list = await fetch(url).then(res => res.json());
        const dir = list.tree.find(node => node.path === directory);
        if (dir) {
            const list = await fetch(dir.url).then(res => res.json());
            return list.tree.map(node => node.path);
        }
    }

    // Richiama la funzione per ottenere la lista dei file iniziale
    //getFileList(folderPath);
    function showFiles(user, repo, directory) 
    {
        list_directory(user, repo, directory)
        .then(fileList => {
            fileList.forEach(item => {
                const isDirectory = item.endsWith('/');
                if (isDirectory) {
                    // Se è una cartella, mostra un'icona di cartella
                    // e gestisci l'evento onclick per visualizzare i suoi contenuti
                    const folderName = item.slice(0, -1);
                    const listItem = document.createElement('li');
                    const folderLink = document.createElement('a');
                    folderLink.textContent = folderName;
                    folderLink.href = '#';
                    folderLink.onclick = () => getFileList(`https://github.com/${user}/${repo}/tree/main/${directory}/${folderName}/`);
                    const folderIcon = document.createElement('img');
                    folderIcon.src = 'img/folder.png'; // Percorso dell'icona della cartella
                    folderIcon.alt = 'Folder';
                    folderLink.appendChild(folderIcon);
                    listItem.appendChild(folderLink);
                    document.getElementById('file-list').appendChild(listItem);
                } else {
                    // Se è un file, mostra un'icona appropriata e gestisci l'apertura del file
                    const fileName = item;
                    const listItem = document.createElement('li');
                    const fileLink = document.createElement('a');
                    fileLink.textContent = fileName;
                    // Aggiungi l'icona del file in base al tipo di file
                    if (fileName.toLowerCase().endsWith('.pdf')) {
                        const pdfIcon = document.createElement('img');
                        pdfIcon.src = 'img/pdf.png'; // Percorso dell'icona PDF
                        pdfIcon.alt = 'PDF';
                        fileLink.appendChild(pdfIcon);
                    }
                    fileLink.href = `https://github.com/${user}/${repo}/blob/main/${directory}/${fileName}`;
                    listItem.appendChild(fileLink);
                    document.getElementById('file-list').appendChild(listItem);
                }
            });
        })
        .catch(error => {
            console.error('Errore nella visualizzazione della lista dei file:', error);
        });
    }
    showFiles('Polterino', 'polterino.github.io', 'files');
});
