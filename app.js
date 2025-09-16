// ThePlanner - Business Plan Generator
// Main JavaScript Application

class BusinessPlanGenerator {
    constructor() {
        this.currentSchema = 'smart';
        this.data = {
            companyName: '',
            companyLogo: null,
            sections: {},
            financialData: [{
                year: 1,
                revenue: 0,
                cogs: 0,
                opex: 0
            }],
            photos: []
        };
        
        this.schemas = {
            smart: {
                'base-info': {
                    title: 'Informazioni Base',
                    fields: [
                        { name: 'problemDescription', label: 'Descrizione del Problema', type: 'textarea', placeholder: 'Quale problema risolve il tuo prodotto/servizio?' },
                        { name: 'solutionDescription', label: 'Descrizione della Soluzione', type: 'textarea', placeholder: 'Come il tuo prodotto/servizio risolve il problema?' }
                    ]
                },
                'executive-summary': {
                    title: 'Executive Summary',
                    fields: [
                        { name: 'project-synthesis', label: 'Sintesi Progetto', type: 'textarea', placeholder: 'Descrivi brevemente il progetto e i suoi obiettivi principali...' },
                        { name: 'main-objectives', label: 'Obiettivi Principali', type: 'textarea', placeholder: 'Elenca i principali obiettivi del business plan...' }
                    ]
                },
                'company-description': {
                    title: 'Descrizione Azienda',
                    fields: [
                        { name: 'business-activity', label: 'Attività', type: 'textarea', placeholder: 'Descrivi l\'attività principale dell\'azienda...' },
                        { name: 'products-services', label: 'Prodotti/Servizi', type: 'textarea', placeholder: 'Elenca e descrivi i prodotti o servizi offerti...' },
                        { name: 'company-values', label: 'Valori Aziendali', type: 'textarea', placeholder: 'Descrivi i valori e la filosofia aziendale...' }
                    ]
                },
                'target-market': {
                    title: 'Mercato di Riferimento',
                    fields: [
                        { name: 'target-audience', label: 'Target di Riferimento', type: 'textarea', placeholder: 'Descrivi il target di clientela...' },
                        { name: 'market-trends', label: 'Trend di Mercato', type: 'textarea', placeholder: 'Analizza i principali trend del settore...' },
                        { name: 'competitors', label: 'Concorrenti', type: 'textarea', placeholder: 'Identifica e analizza i principali concorrenti...' }
                    ]
                },
                'operational-strategy': {
                    title: 'Strategia Operativa',
                    fields: [
                        { name: 'positioning', label: 'Posizionamento', type: 'textarea', placeholder: 'Descrivi il posizionamento strategico...' },
                        { name: 'channels', label: 'Canali di Distribuzione', type: 'textarea', placeholder: 'Elenca i canali di vendita e distribuzione...' },
                        { name: 'competitive-advantages', label: 'Vantaggi Competitivi', type: 'textarea', placeholder: 'Descrivi i principali vantaggi competitivi...' }
                    ]
                },
                'financial-aspects': {
                    title: 'Aspetti Economico-Finanziari',
                    fields: [
                        { name: 'revenue-estimates', label: 'Stime Ricavi', type: 'textarea', placeholder: 'Fornisci stime sui ricavi attesi...' },
                        { name: 'cost-estimates', label: 'Stime Costi', type: 'textarea', placeholder: 'Stima i principali costi operativi...' },
                        { name: 'break-even', label: 'Punto di Pareggio', type: 'textarea', placeholder: 'Analizza il punto di pareggio...' },
                        { name: 'funding-needs', label: 'Fabbisogno Finanziario', type: 'textarea', placeholder: 'Descrivi il fabbisogno di capitale...' }
                    ]
                }
            },
            analitico: {
                'base-info': {
                    title: 'Informazioni Base',
                    fields: [
                        { name: 'problemDescription', label: 'Descrizione del Problema', type: 'textarea', placeholder: 'Quale problema risolve il tuo prodotto/servizio?' },
                        { name: 'solutionDescription', label: 'Descrizione della Soluzione', type: 'textarea', placeholder: 'Come il tuo prodotto/servizio risolve il problema?' }
                    ]
                },
                'executive-summary': {
                    title: 'Executive Summary',
                    fields: [
                        { name: 'vision', label: 'Vision', type: 'textarea', placeholder: 'Descrivi la vision aziendale...' },
                        { name: 'mission', label: 'Mission', type: 'textarea', placeholder: 'Definisci la mission aziendale...' },
                        { name: 'objectives', label: 'Obiettivi', type: 'textarea', placeholder: 'Elenca gli obiettivi strategici...' },
                        { name: 'market-synthesis', label: 'Sintesi Mercato', type: 'textarea', placeholder: 'Riassumi l\'analisi di mercato...' },
                        { name: 'funding-summary', label: 'Fabbisogno Finanziario', type: 'textarea', placeholder: 'Riassumi il fabbisogno di capitale...' }
                    ]
                },
                'company-profile': {
                    title: 'Profilo Aziendale',
                    fields: [
                        { name: 'company-history', label: 'Storia Aziendale', type: 'textarea', placeholder: 'Racconta la storia dell\'azienda...' },
                        { name: 'organizational-structure', label: 'Struttura Organizzativa', type: 'textarea', placeholder: 'Descrivi la struttura organizzativa...' },
                        { name: 'organizational-chart', label: 'Organigramma', type: 'textarea', placeholder: 'Presenta l\'organigramma aziendale...' },
                        { name: 'core-business', label: 'Core Business', type: 'textarea', placeholder: 'Definisci il core business...' },
                        { name: 'swot-analysis', label: 'Analisi SWOT', type: 'textarea', placeholder: 'Conduci un\'analisi SWOT completa...' }
                    ]
                },
                'market-analysis': {
                    title: 'Analisi di Mercato',
                    fields: [
                        { name: 'market-sizing', label: 'Dimensionamento Mercato', type: 'textarea', placeholder: 'Analizza le dimensioni del mercato...' },
                        { name: 'market-segmentation', label: 'Segmentazione', type: 'textarea', placeholder: 'Segmenta il mercato di riferimento...' },
                        { name: 'competition-analysis', label: 'Analisi Concorrenza', type: 'textarea', placeholder: 'Analizza approfonditamente la concorrenza...' },
                        { name: 'opportunities-threats', label: 'Opportunità e Minacce', type: 'textarea', placeholder: 'Identifica opportunità e minacce del mercato...' }
                    ]
                },
                'strategy-operations': {
                    title: 'Strategia & Piano Operativo',
                    fields: [
                        { name: 'business-model', label: 'Modello di Business', type: 'textarea', placeholder: 'Descrivi il modello di business...' },
                        { name: 'marketing-strategy', label: 'Strategia Marketing', type: 'textarea', placeholder: 'Definisci la strategia di marketing...' },
                        { name: 'distribution-channels', label: 'Canali Distributivi', type: 'textarea', placeholder: 'Descrivi i canali distributivi...' },
                        { name: 'innovation-plan', label: 'Piano Innovazione', type: 'textarea', placeholder: 'Presenta il piano di innovazione...' },
                        { name: 'investment-plan', label: 'Piano Investimenti', type: 'textarea', placeholder: 'Definisci il piano degli investimenti...' }
                    ]
                },
                'financial-plan': {
                    title: 'Piano Economico-Finanziario',
                    fields: [
                        { name: 'income-statement', label: 'Conto Economico Prospettico', type: 'textarea', placeholder: 'Presenta il conto economico prospettico...' },
                        { name: 'balance-sheet', label: 'Stato Patrimoniale', type: 'textarea', placeholder: 'Elabora lo stato patrimoniale...' },
                        { name: 'cash-flow', label: 'Flussi di Cassa', type: 'textarea', placeholder: 'Analizza i flussi di cassa...' },
                        { name: 'financial-indicators', label: 'Indicatori Finanziari', type: 'textarea', placeholder: 'Calcola gli indicatori finanziari chiave...' },
                        { name: 'funding-sources', label: 'Fonti di Finanziamento', type: 'textarea', placeholder: 'Identifica le fonti di finanziamento...' }
                    ]
                }
            }
        };
        
        this.init();
        this.initMacroSections();
        this.initAIFeatures();
    }

    init() {
        this.bindEvents();
        this.renderDynamicSections();
        this.updatePreview();
        this.updateCoverDate();
        this.initPhotoGallery();
        this.initMiniChat();
    }

    initMacroSections() {
        // Add click listeners to section headers for collapse/expand
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const macroSection = header.closest('.macro-section');
                macroSection.classList.toggle('collapsed');
                
                // Update toggle icon
                const toggle = header.querySelector('.section-toggle');
                if (macroSection.classList.contains('collapsed')) {
                    toggle.textContent = '▶';
                } else {
                    toggle.textContent = '▼';
                }
            });
        });

        // Initialize all sections as expanded by default
        const macroSections = document.querySelectorAll('.macro-section');
        macroSections.forEach(section => {
            const toggle = section.querySelector('.section-toggle');
            if (toggle) {
                toggle.textContent = '▼';
            }
        });
    }

    initAIFeatures() {
        this.uploadedDocuments = [];
        // Carica API keys dal localStorage
        this.openaiApiKey = localStorage.getItem('openaiApiKey') || '';
        this.perplexityApiKey = localStorage.getItem('perplexityApiKey') || '';
        this.aiProvider = localStorage.getItem('aiProvider') || 'openai'; // GPT come default
        
        // AI toggle functionality
        const aiCheckbox = document.getElementById('aiEnabled');
        const aiConfig = document.getElementById('aiConfig');
        
        if (aiCheckbox && aiConfig) {
            aiCheckbox.addEventListener('change', () => {
                aiConfig.style.display = aiCheckbox.checked ? 'block' : 'none';
                this.toggleAIButtons(aiCheckbox.checked);
            });
        }
        
        // AI Provider selector
        const aiProviderSelect = document.getElementById('aiProvider');
        if (aiProviderSelect) {
            aiProviderSelect.value = this.aiProvider; // Imposta valore salvato
            aiProviderSelect.addEventListener('change', (e) => {
                this.aiProvider = e.target.value;
                localStorage.setItem('aiProvider', e.target.value); // Salva automaticamente
            });
        }
        
        // Le API key vengono gestite solo dal pannello admin
        
        // Document upload
        const documentUpload = document.getElementById('documentUpload');
        const uploadArea = document.getElementById('uploadArea');
        
        if (documentUpload && uploadArea) {
            // File input change event
            documentUpload.addEventListener('change', (e) => {
                this.handleDocumentUpload(e.target.files);
                // Reset input value to allow selecting the same files again
                e.target.value = '';
            });
            
            // Drag and drop events
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                this.handleDocumentUpload(e.dataTransfer.files);
            });
            
            // Click to upload - only on placeholder area
            const uploadPlaceholder = uploadArea.querySelector('.upload-placeholder');
            if (uploadPlaceholder) {
                uploadPlaceholder.addEventListener('click', () => {
                    documentUpload.click();
                });
            }
        }
        
        // AI generate buttons
        const aiButtons = document.querySelectorAll('.ai-generate-btn');
        aiButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const fieldId = e.target.getAttribute('data-field');
                this.generateAIContent(fieldId);
            });
        });
        
        // Initially hide AI buttons
        this.toggleAIButtons(false);
    }

    toggleAIButtons(show) {
        const aiButtons = document.querySelectorAll('.ai-generate-btn');
        aiButtons.forEach(button => {
            button.style.display = show ? 'inline-block' : 'none';
        });
    }
    
    // toggleProviderConfig rimossa - le API key sono gestite solo dal pannello admin

    async handleDocumentUpload(files) {
        const filesList = document.getElementById('filesList');
        const filesHeader = document.querySelector('.files-header');
        if (!filesList) return;
        
        for (let file of files) {
            let status = 'processing';
            let statusText = 'Elaborazione...';
            
            // Mostra immediatamente il file in elaborazione
            const tempDocId = 'temp_' + Date.now() + Math.random();
            this.displayUploadedFile(file, status, statusText, tempDocId);
            
            try {
                // Invia il file al server Python per la trascrizione
                const result = await this.processDocumentLocally(file);
                
                if (result.success) {
                    // Aggiorna lo stato del file
                    status = 'success';
                    statusText = `Trascritto (${result.document.word_count} parole)`;
                    
                    // Aggiunge il documento alla lista locale
                    this.uploadedDocuments.push({
                        id: result.document.id,
                        name: file.name,
                        content: '', // Il contenuto è sul server
                        type: file.type || 'unknown',
                        size: file.size,
                        status: status,
                        server_id: result.document.id,
                        word_count: result.document.word_count,
                        char_count: result.document.char_count
                    });
                    
                    // Aggiorna la visualizzazione
                    this.updateUploadedFileDisplay(tempDocId, result.document.id, status, statusText);
                } else {
                    throw new Error(result.error || 'Errore sconosciuto');
                }
                
            } catch (error) {
                console.error(`Errore nel processing di ${file.name}:`, error);
                status = 'error';
                statusText = 'Errore nella trascrizione';
                this.updateUploadedFileDisplay(tempDocId, null, status, statusText);
            }
        }
        
        // Show files header if there are files
        if (this.uploadedDocuments.length > 0 && filesHeader) {
            filesHeader.style.display = 'block';
        }
    }
    
    displayUploadedFile(file, status, statusText, docId) {
        const filesList = document.getElementById('filesList');
        if (!filesList) return;
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.dataset.fileId = docId;
        
        const fileIcon = this.getFileIcon(file.name);
        const fileSize = this.formatFileSize(file.size);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon">${fileIcon}</div>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${fileSize} • ${statusText}</div>
                </div>
            </div>
            ${docId ? `<button class="file-remove" onclick="businessPlan.removeDocument('${docId}')" title="Rimuovi documento">🗑️</button>` : ''}
        `;
        
        // Add status styling
        if (status === 'error') {
            fileItem.style.borderColor = 'var(--danger-color)';
            fileItem.style.backgroundColor = 'rgba(220, 53, 69, 0.05)';
        } else if (status === 'warning') {
            fileItem.style.borderColor = '#ffc107';
            fileItem.style.backgroundColor = 'rgba(255, 193, 7, 0.05)';
        } else if (status === 'processing') {
            fileItem.style.borderColor = '#007bff';
            fileItem.style.backgroundColor = 'rgba(0, 123, 255, 0.05)';
            fileItem.style.opacity = '0.7';
        }
        
        filesList.appendChild(fileItem);
    }
    
    async processDocumentLocally(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch(`${CONFIG.getBackendUrl()}/process_document`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Errore nella comunicazione con il server:', error);
            throw error;
        }
    }
    
    updateUploadedFileDisplay(tempId, newId, status, statusText) {
        const fileItem = document.querySelector(`[data-file-id="${tempId}"]`);
        if (!fileItem) return;
        
        // Aggiorna l'ID se necessario
        if (newId) {
            fileItem.dataset.fileId = newId;
        }
        
        // Aggiorna il testo dello status
        const fileSizeElement = fileItem.querySelector('.file-size');
        if (fileSizeElement) {
            const sizeText = fileSizeElement.textContent.split(' • ')[0];
            fileSizeElement.textContent = `${sizeText} • ${statusText}`;
        }
        
        // Aggiorna gli stili
        fileItem.style.opacity = '1';
        if (status === 'error') {
            fileItem.style.borderColor = 'var(--danger-color)';
            fileItem.style.backgroundColor = 'rgba(220, 53, 69, 0.05)';
        } else if (status === 'success') {
            fileItem.style.borderColor = '#28a745';
            fileItem.style.backgroundColor = 'rgba(40, 167, 69, 0.05)';
        }
        
        // Aggiunge il pulsante di rimozione se il processing è riuscito
        if (status === 'success' && newId && !fileItem.querySelector('.file-remove')) {
            const removeButton = document.createElement('button');
            removeButton.className = 'file-remove';
            removeButton.onclick = () => this.removeDocument(newId);
            removeButton.title = 'Rimuovi documento';
            removeButton.textContent = '🗑️';
            fileItem.appendChild(removeButton);
        }
    }
    
    getFileIcon(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        const icons = {
            'pdf': '📄',
            'doc': '📝',
            'docx': '📝',
            'txt': '📄',
            'xlsx': '📊',
            'pptx': '📊'
        };
        return icons[extension] || '📄';
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    async removeDocument(docId) {
        try {
            // Rimuove dal server se è un documento trascritto
            const doc = this.uploadedDocuments.find(d => d.id === docId);
            if (doc && doc.server_id) {
                await fetch(`${CONFIG.getBackendUrl()}/remove_document/${doc.server_id}`, {
                    method: 'DELETE'
                });
            }
        } catch (error) {
            console.error('Errore nella rimozione dal server:', error);
        }
        
        // Remove from uploaded documents array
        this.uploadedDocuments = this.uploadedDocuments.filter(doc => doc.id !== docId);
        
        // Remove from DOM
        const fileItem = document.querySelector(`[data-file-id="${docId}"]`);
        if (fileItem) {
            fileItem.remove();
        }
        
        // Hide header if no files left
        const filesHeader = document.querySelector('.files-header');
        if (this.uploadedDocuments.length === 0 && filesHeader) {
            filesHeader.style.display = 'none';
        }
    }

    readTextFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    async readPDFFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const typedArray = new Uint8Array(e.target.result);
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;
                    let fullText = '';
                    
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        fullText += pageText + '\n';
                    }
                    
                    resolve(fullText.trim());
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    async generateAIContent(fieldId, retryCount = 0) {
        // Verifica che sia stata inserita l'API key per il provider selezionato
        if (this.aiProvider === 'openai' && !this.openaiApiKey) {
            alert('Inserisci prima la tua API Key OpenAI nelle impostazioni AI');
            return;
        }
        
        if (this.aiProvider === 'perplexity' && !this.perplexityApiKey) {
            alert('Inserisci prima la tua API Key Perplexity nelle impostazioni AI');
            return;
        }
        
        const button = document.querySelector(`[data-field="${fieldId}"]`);
        const field = document.getElementById(fieldId);
        
        if (!field) return;
        
        // Show loading state
        if (button) {
            button.disabled = true;
            button.classList.add('loading');
            
            // Aggiorna il testo del pulsante per mostrare lo stato
            if (retryCount > 0) {
                button.innerHTML = `⏳ Tentativo ${retryCount + 1}/3`;
            } else {
                button.innerHTML = '⏳ Generando...';
            }
        }
        
        try {
            const prompt = await this.createPromptForField(fieldId);
            const response = await this.callOpenAI(prompt);
            
            // Set the generated content
            field.value = response;
            
            // Trigger update
            field.dispatchEvent(new Event('input'));
            
            // Mostra messaggio di successo
            if (button) {
                button.innerHTML = '✅';
                setTimeout(() => {
                    button.innerHTML = '🤖';
                }, 2000);
            }
            
        } catch (error) {
            console.error('Errore nella generazione AI:', error);
            
            // Retry automatico per errore 429 (max 3 tentativi)
            if (error.message.includes('429') && retryCount < 2) {
                const waitTime = (retryCount + 1) * 5000; // 5s, 10s
                
                if (button) {
                    button.innerHTML = `⏳ Attendo ${waitTime/1000}s...`;
                }
                
                setTimeout(() => {
                    this.generateAIContent(fieldId, retryCount + 1);
                }, waitTime);
                
                return; // Non eseguire il finally
            }
            
            let errorMessage = 'Errore nella generazione del contenuto';
            
            // Gestisci diversi tipi di errore
            if (error.message.includes('429')) {
                if (this.aiProvider === 'openai') {
                    errorMessage = 'Budget OpenAI esaurito o limite richieste superato.\n\n💡 Suggerimento: Passa a Perplexity nelle impostazioni AI per continuare a usare l\'assistente!';
                    
                    // Mostra suggerimento per passare a Perplexity
                    if (confirm(errorMessage + '\n\nVuoi passare automaticamente a Perplexity?')) {
                        this.aiProvider = 'perplexity';
                        localStorage.setItem('aiProvider', 'perplexity');
                        
                        const aiProviderSelect = document.getElementById('aiProvider');
                        if (aiProviderSelect) {
                            aiProviderSelect.value = 'perplexity';
                        }
                        
                        if (this.perplexityApiKey) {
                            alert('✅ Passato a Perplexity! Puoi riprovare la generazione.');
                        } else {
                            alert('✅ Passato a Perplexity! ⚠️ Inserisci la tua API Key Perplexity nelle impostazioni AI prima di riprovare.');
                        }
                        return;
                    }
                } else {
                    errorMessage = 'Limite API Perplexity raggiunto. Attendi qualche minuto prima di riprovare.';
                }
            } else if (error.message.includes('401')) {
                errorMessage = 'API Key non valida. Verifica la tua chiave OpenAI.';
            } else if (error.message.includes('403')) {
                errorMessage = 'Accesso negato. Verifica i permessi della tua API Key.';
            } else if (error.message.includes('500')) {
                errorMessage = 'Errore del server OpenAI. Riprova tra qualche minuto.';
            } else {
                errorMessage = `Errore: ${error.message}`;
            }
            
            alert(errorMessage);
        } finally {
            // Remove loading state
            if (button) {
                button.disabled = false;
                button.classList.remove('loading');
                if (!button.innerHTML.includes('✅')) {
                    button.innerHTML = '🤖';
                }
            }
        }
    }

    async createPromptForField(fieldId) {
        // Recupera i documenti trascritti dal server locale
        let documentContext = '';
        try {
            const response = await fetch(`${CONFIG.getBackendUrl()}/get_documents`);
            if (response.ok) {
                const result = await response.json();
                if (result.success && result.documents.length > 0) {
                    // Recupera il testo completo di ogni documento
                    const documentsWithText = [];
                    for (const doc of result.documents) {
                        try {
                            const textResponse = await fetch(`${CONFIG.getBackendUrl()}/get_document_text/${doc.id}`);
                            if (textResponse.ok) {
                                const textResult = await textResponse.json();
                                if (textResult.success) {
                                    documentsWithText.push({
                                        filename: doc.filename,
                                        text: textResult.document.text
                                    });
                                }
                            }
                        } catch (textError) {
                            console.warn(`Errore nel recupero testo per ${doc.filename}:`, textError);
                        }
                    }
                    
                    if (documentsWithText.length > 0) {
                        documentContext = `\n\nInformazioni aziendali disponibili:\n${documentsWithText.map(doc => `Documento: ${doc.filename}\n${doc.text}`).join('\n\n')}`;
                    }
                }
            }
        } catch (error) {
            console.warn('Errore nel recupero documenti dal server locale:', error);
        }
        
        const prompts = {
            // Campi del form base
            companyName: `Estrai SOLO il nome dell'azienda dalle informazioni fornite. Rispondi con il nome esatto senza descrizioni aggiuntive.${documentContext}`,
            problemDescription: `Descrivi chiaramente il problema che questa azienda/prodotto risolve. Spiega perché questo problema è importante e chi ne è affetto. Usa un tono professionale e circa 100-120 parole.${documentContext}`,
            solutionDescription: `Descrivi la soluzione offerta da questa azienda/prodotto. Spiega come risolve il problema identificato e quali sono i benefici principali. Usa circa 100-120 parole con un tono professionale.${documentContext}`,
            targetMarket: `Identifica e descrivi il mercato target di questa azienda. Specifica chi sono i clienti ideali, le loro caratteristiche demografiche e comportamentali. Usa circa 80-100 parole.${documentContext}`,
            competitorAnalysis: `Fornisci un'analisi dei principali competitor in questo settore. Identifica 2-3 competitor principali e spiega brevemente come questa azienda si differenzia. Usa circa 80-100 parole.${documentContext}`,
            
            // Schema SMART - Executive Summary
            'project-synthesis': `Scrivi una sintesi professionale del progetto aziendale in 150-200 parole. Evidenzia gli obiettivi principali, il valore unico e l'impatto atteso sul mercato.${documentContext}`,
            'main-objectives': `Elenca e descrivi i principali obiettivi strategici del business plan in 100-150 parole. Focalizzati su obiettivi SMART (specifici, misurabili, raggiungibili).${documentContext}`,
            
            // Schema SMART - Company Description
            'business-activity': `Descrivi dettagliatamente l'attività principale dell'azienda in 120-150 parole. Includi il core business, i processi chiave e il valore aggiunto.${documentContext}`,
            'products-services': `Elenca e descrivi i prodotti o servizi offerti dall'azienda in 150-200 parole. Evidenzia le caratteristiche distintive e i benefici per i clienti.${documentContext}`,
            'company-values': `Descrivi i valori aziendali e la filosofia dell'azienda in 100-120 parole. Includi mission, vision e principi guida.${documentContext}`,
            
            // Schema SMART - Target Market
            'target-audience': `Descrivi dettagliatamente il target di clientela in 120-150 parole. Includi caratteristiche demografiche, comportamentali e bisogni specifici.${documentContext}`,
            'market-trends': `Analizza i principali trend del settore in 150-180 parole. Identifica opportunità di crescita e cambiamenti del mercato.${documentContext}`,
            'competitors': `Identifica e analizza i principali concorrenti in 120-150 parole. Descrivi il loro posizionamento e i vantaggi competitivi dell'azienda.${documentContext}`,
            
            // Schema SMART - Operational Strategy
            'positioning': `Descrivi il posizionamento strategico dell'azienda nel mercato in 100-130 parole. Evidenzia la proposta di valore unica.${documentContext}`,
            'channels': `Elenca e descrivi i canali di vendita e distribuzione in 120-150 parole. Includi strategie online e offline.${documentContext}`,
            'competitive-advantages': `Descrivi i principali vantaggi competitivi in 100-130 parole. Focalizzati su elementi distintivi e difficilmente replicabili.${documentContext}`,
            
            // Schema SMART - Financial Aspects
            'revenue-estimates': `Fornisci stime dettagliate sui ricavi attesi in 150-180 parole. Includi fonti di ricavo e proiezioni temporali.${documentContext}`,
            'cost-estimates': `Stima i principali costi operativi in 120-150 parole. Categorizza i costi fissi e variabili.${documentContext}`,
            'break-even': `Analizza il punto di pareggio in 100-130 parole. Includi tempistiche e condizioni necessarie.${documentContext}`,
            'funding-needs': `Descrivi il fabbisogno di capitale in 120-150 parole. Specifica utilizzo dei fondi e fonti di finanziamento.${documentContext}`,
            
            // Schema ANALITICO - Executive Summary
            'vision': `Descrivi la vision aziendale in 80-100 parole. Focalizzati sulla direzione futura e l'impatto desiderato sul mercato.${documentContext}`,
            'mission': `Definisci la mission aziendale in 80-100 parole. Spiega lo scopo dell'azienda e come crea valore.${documentContext}`,
            'objectives': `Elenca gli obiettivi strategici in 120-150 parole. Includi obiettivi a breve, medio e lungo termine.${documentContext}`,
            'market-synthesis': `Riassumi l'analisi di mercato in 150-180 parole. Includi dimensioni, trend e opportunità principali.${documentContext}`,
            'funding-summary': `Riassumi il fabbisogno di capitale in 100-130 parole. Includi importi, utilizzo e fonti di finanziamento.${documentContext}`,
            
            // Schema ANALITICO - Company Profile
            'company-history': `Racconta la storia dell'azienda in 150-200 parole. Includi fondazione, tappe principali e evoluzione.${documentContext}`,
            'organizational-structure': `Descrivi la struttura organizzativa in 120-150 parole. Includi dipartimenti, ruoli chiave e reporting.${documentContext}`,
            'organizational-chart': `Presenta l'organigramma aziendale in 100-130 parole. Descrivi la gerarchia e le responsabilità principali.${documentContext}`,
            'core-business': `Definisci il core business in 120-150 parole. Focalizzati sulle attività principali che generano valore.${documentContext}`,
            'swot-analysis': `Conduci un'analisi SWOT completa in 200-250 parole. Bilancia punti di forza, debolezze, opportunità e minacce.${documentContext}`,
            
            // Schema ANALITICO - Market Analysis
            'market-sizing': `Analizza le dimensioni del mercato in 150-180 parole. Includi TAM, SAM, SOM e proiezioni di crescita.${documentContext}`,
            'market-segmentation': `Segmenta il mercato di riferimento in 120-150 parole. Identifica i segmenti più attrattivi e accessibili.${documentContext}`,
            'competition-analysis': `Analizza approfonditamente la concorrenza in 180-220 parole. Includi competitor diretti, indiretti e analisi comparativa.${documentContext}`,
            'opportunities-threats': `Identifica opportunità e minacce del mercato in 150-180 parole. Focalizzati su fattori esterni che impattano il business.${documentContext}`,
            
            // Schema ANALITICO - Strategy & Operations
            'business-model': `Descrivi il modello di business in 150-200 parole. Includi proposta di valore, segmenti clienti e flussi di ricavo.${documentContext}`,
            'marketing-strategy': `Definisci la strategia di marketing in 150-180 parole. Includi posizionamento, mix marketing e canali promozionali.${documentContext}`,
            'distribution-channels': `Descrivi i canali distributivi in 120-150 parole. Includi canali diretti, indiretti e strategie omnichannel.${documentContext}`,
            'innovation-plan': `Presenta il piano di innovazione in 120-150 parole. Includi R&D, sviluppo prodotti e innovazione di processo.${documentContext}`,
            'investment-plan': `Definisci il piano degli investimenti in 150-180 parole. Includi CAPEX, tempistiche e ROI atteso.${documentContext}`,
            
            // Schema ANALITICO - Financial Plan
            'income-statement': `Presenta il conto economico prospettico in 180-220 parole. Includi ricavi, costi e marginalità per 3-5 anni.${documentContext}`,
            'balance-sheet': `Elabora lo stato patrimoniale in 150-180 parole. Includi attività, passività e patrimonio netto prospettici.${documentContext}`,
            'cash-flow': `Analizza i flussi di cassa in 150-180 parole. Includi flussi operativi, di investimento e di finanziamento.${documentContext}`,
            'financial-indicators': `Calcola gli indicatori finanziari chiave in 120-150 parole. Includi ROI, ROE, margini e indici di liquidità.${documentContext}`,
            'funding-sources': `Identifica le fonti di finanziamento in 120-150 parole. Includi equity, debito e finanziamenti agevolati.${documentContext}`
        };
        
        return prompts[fieldId] || `Genera contenuto professionale per il campo ${fieldId} di un business plan.${documentContext}`;
    }

    async callOpenAI(prompt) {
        if (this.aiProvider === 'openai') {
            return await this.callOpenAIAPI(prompt);
        } else if (this.aiProvider === 'perplexity') {
            return await this.callPerplexityAPI(prompt);
        } else {
            throw new Error('Provider AI non supportato');
        }
    }
    
    async callOpenAIAPI(prompt) {
        // Debug: verifica API key
        if (!this.openaiApiKey || this.openaiApiKey.trim() === '') {
            throw new Error('API Key OpenAI non configurata. Inserisci la tua API Key nelle impostazioni AI.');
        }
        
        if (!this.openaiApiKey.startsWith('sk-')) {
            throw new Error('API Key OpenAI non valida. Le chiavi OpenAI iniziano con "sk-".');
        }
        
        console.log('🔑 Usando API Key OpenAI:', this.openaiApiKey.substring(0, 10) + '...');
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.openaiApiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'Sei un esperto consulente di business che aiuta a creare business plan professionali. Rispondi sempre in italiano con un tono professionale ma accessibile.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 300,
                temperature: 0.7
            })
        });
        
        return await this.handleAPIResponse(response, 'OpenAI');
    }
    
    async callPerplexityAPI(prompt) {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.perplexityApiKey}`
            },
            body: JSON.stringify({
                model: 'sonar-pro',
                messages: [
                    {
                        role: 'system',
                        content: 'Sei un esperto consulente di business che aiuta a creare business plan professionali. Rispondi sempre in italiano con un tono professionale ma accessibile.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 300,
                temperature: 0.7
            })
        });
        
        return await this.handleAPIResponse(response, 'Perplexity');
    }
    
    async handleAPIResponse(response, providerName) {
        if (!response.ok) {
            let errorMessage = `Errore API ${providerName}: ${response.status}`;
            
            // Gestisci codici di errore specifici
            switch (response.status) {
                case 400:
                    if (providerName === 'Perplexity') {
                        errorMessage = '400 - Richiesta non valida. Verifica che la tua API Key Perplexity sia corretta e che il modello sia supportato';
                    } else {
                        errorMessage = `400 - Richiesta non valida per ${providerName}`;
                    }
                    break;
                case 401:
                    errorMessage = `401 - API Key ${providerName} non valida o mancante`;
                    break;
                case 403:
                    errorMessage = `403 - Accesso negato. Verifica i permessi della tua API Key ${providerName}`;
                    break;
                case 429:
                    if (providerName === 'OpenAI') {
                        errorMessage = '429 - Budget OpenAI esaurito o limite richieste superato. Prova con Perplexity!';
                    } else {
                        errorMessage = '429 - Limite di richieste Perplexity superato. Attendi prima di riprovare';
                    }
                    break;
                case 500:
                    errorMessage = `500 - Errore interno del server ${providerName}`;
                    break;
                case 503:
                    errorMessage = `503 - Servizio ${providerName} temporaneamente non disponibile`;
                    break;
                default:
                    errorMessage = `${response.status} - Errore sconosciuto ${providerName}`;
            }
            
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error(`Risposta API ${providerName} non valida`);
        }
        
        return data.choices[0].message.content.trim();
    }
    
    async testOpenAIKey() {
        if (!this.openaiApiKey || this.openaiApiKey.trim() === '') {
            alert('❌ Inserisci prima la tua API Key OpenAI');
            return;
        }
        
        if (!this.openaiApiKey.startsWith('sk-')) {
            alert('❌ API Key non valida. Le chiavi OpenAI iniziano con "sk-"');
            return;
        }
        
        try {
            const response = await fetch('https://api.openai.com/v1/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.openaiApiKey}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                const hasGPT4 = data.data.some(model => model.id.includes('gpt-4'));
                
                if (hasGPT4) {
                    alert('✅ API Key OpenAI valida! Hai accesso a GPT-4.');
                } else {
                    alert('⚠️ API Key valida ma senza accesso a GPT-4. Verifica il tuo piano OpenAI.');
                }
            } else {
                const errorData = await response.json();
                let errorMsg = 'Errore sconosciuto';
                
                switch (response.status) {
                    case 401:
                        errorMsg = 'API Key non valida o scaduta';
                        break;
                    case 403:
                        errorMsg = 'Accesso negato. Verifica i permessi della tua API Key';
                        break;
                    case 429:
                        errorMsg = 'Limite di richieste superato o budget esaurito';
                        break;
                    default:
                        errorMsg = errorData.error?.message || 'Errore di connessione';
                }
                
                alert(`❌ Test fallito: ${errorMsg}`);
            }
        } catch (error) {
            alert(`❌ Errore di connessione: ${error.message}`);
        }
    }
    
    openCreditMonitor() {
        // Verifica che l'API key sia configurata
        if (!this.openaiApiKey) {
            alert('❌ Configura prima la tua API key OpenAI');
            return;
        }
        
        // Apri il monitor in una nuova finestra
        const monitorWindow = window.open(
            'monitor.html',
            'creditMonitor',
            'width=1200,height=800,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
        );
        
        if (monitorWindow) {
            // Aggiungi un messaggio di conferma
            this.showFeedback('📊 Monitor crediti aperto in una nuova finestra', 'success');
        } else {
            alert('❌ Impossibile aprire il monitor. Controlla le impostazioni del browser per i popup.');
        }
    }

    bindEvents() {
        // Schema toggle
        document.querySelectorAll('input[name="schema"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentSchema = e.target.value;
                this.renderDynamicSections();
                this.updatePreview();
            });
        });

        // Company info
        document.getElementById('companyName').addEventListener('input', (e) => {
            this.data.companyName = e.target.value;
            this.updatePreview();
        });

        document.getElementById('companyLogo').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.data.companyLogo = e.target.result;
                    this.updatePreview();
                };
                reader.readAsDataURL(file);
            }
        });

        // Base info fields
        document.getElementById('problemDescription').addEventListener('input', (e) => {
            if (!this.data.sections['base-info']) {
                this.data.sections['base-info'] = {};
            }
            this.data.sections['base-info']['problemDescription'] = e.target.value;
            this.updatePreview();
        });

        document.getElementById('solutionDescription').addEventListener('input', (e) => {
            if (!this.data.sections['base-info']) {
                this.data.sections['base-info'] = {};
            }
            this.data.sections['base-info']['solutionDescription'] = e.target.value;
            this.updatePreview();
        });

        // Financial calculations
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('revenue') || 
                e.target.classList.contains('cogs') || 
                e.target.classList.contains('opex')) {
                this.updateFinancialCalculations();
                this.updatePreview();
            }
        });

        // Add year button
        document.getElementById('addYearBtn').addEventListener('click', () => {
            this.addFinancialYear();
        });

        // Header buttons
        document.getElementById('saveBtn').addEventListener('click', () => this.saveData());
        document.getElementById('loadBtn').addEventListener('click', () => this.loadData());
        document.getElementById('printBtn').addEventListener('click', () => this.printDocument());
        document.getElementById('testBtn').addEventListener('click', () => this.runTests());

        // File input for loading
        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileLoad(e.target.files[0]);
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('testModal').style.display = 'none';
        });

        // Photo gallery events
        document.getElementById('photo-upload').addEventListener('change', (e) => {
            this.handlePhotoUpload(e);
        });
        
        document.getElementById('clear-photos').addEventListener('click', () => {
            this.clearAllPhotos();
        });
        
        document.getElementById('optimize-layout').addEventListener('click', () => {
            this.optimizePhotoLayout();
        });
    }

    renderDynamicSections() {
        const container = document.getElementById('dynamicSections');
        container.innerHTML = '';
        
        const currentSchemaData = this.schemas[this.currentSchema];
        
        Object.keys(currentSchemaData).forEach(sectionKey => {
            // Skip base-info section as it's already rendered in the static HTML
            if (sectionKey === 'base-info') return;
            const section = currentSchemaData[sectionKey];
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'form-section';
            sectionDiv.innerHTML = `
                <h4>${section.title}</h4>
                ${section.fields.map(field => `
                    <div class="form-group">
                        <label for="${sectionKey}-${field.name}">${field.label}</label>
                        <div class="input-with-ai">
                            <textarea 
                                id="${sectionKey}-${field.name}" 
                                data-section="${sectionKey}" 
                                data-field="${field.name}"
                                placeholder="${field.placeholder}"
                            ></textarea>
                            <div class="ai-buttons-group">
                                <button type="button" class="ai-generate-btn" data-field="${field.name}" title="Genera con AI">🤖</button>
                                <button type="button" class="ai-chat-btn" data-field="${sectionKey}-${field.name}" title="Chat personalizzata">💬</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            `;
            container.appendChild(sectionDiv);
        });

        // Bind events for dynamic fields
        container.querySelectorAll('textarea').forEach(textarea => {
            textarea.addEventListener('input', (e) => {
                const section = e.target.dataset.section;
                const field = e.target.dataset.field;
                
                if (!this.data.sections[section]) {
                    this.data.sections[section] = {};
                }
                this.data.sections[section][field] = e.target.value;
                this.updatePreview();
            });
        });
        
        // Bind events for AI buttons in dynamic sections
        container.querySelectorAll('.ai-generate-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const fieldName = e.target.dataset.field;
                this.generateAIContent(fieldName);
            });
        });

        // Restore data if exists
        this.restoreFormData();
    }

    restoreFormData() {
        Object.keys(this.data.sections).forEach(sectionKey => {
            Object.keys(this.data.sections[sectionKey]).forEach(fieldKey => {
                const element = document.getElementById(`${sectionKey}-${fieldKey}`);
                if (element) {
                    element.value = this.data.sections[sectionKey][fieldKey];
                }
            });
        });
        
        // Restore base info fields specifically
        if (this.data.sections['base-info']) {
            const problemDesc = document.getElementById('problemDescription');
            const solutionDesc = document.getElementById('solutionDescription');
            
            if (problemDesc && this.data.sections['base-info']['problemDescription']) {
                problemDesc.value = this.data.sections['base-info']['problemDescription'];
            }
            
            if (solutionDesc && this.data.sections['base-info']['solutionDescription']) {
                solutionDesc.value = this.data.sections['base-info']['solutionDescription'];
            }
        }
    }

    addFinancialYear() {
        const yearCount = this.data.financialData.length + 1;
        const newYear = {
            year: yearCount,
            revenue: 0,
            cogs: 0,
            opex: 0
        };
        
        this.data.financialData.push(newYear);
        
        const container = document.getElementById('financialYears');
        const yearDiv = document.createElement('div');
        yearDiv.className = 'year-data';
        yearDiv.dataset.year = yearCount;
        yearDiv.innerHTML = `
            <h5>Anno ${yearCount}</h5>
            <div class="form-group">
                <label>Ricavi (€)</label>
                <input type="number" class="revenue" data-year="${yearCount}" placeholder="0">
            </div>
            <div class="form-group">
                <label>COGS (€)</label>
                <input type="number" class="cogs" data-year="${yearCount}" placeholder="0">
            </div>
            <div class="form-group">
                <label>OPEX (€)</label>
                <input type="number" class="opex" data-year="${yearCount}" placeholder="0">
            </div>
            <div class="kpi-display">
                <div class="kpi-item">
                    <span>Margine Lordo:</span>
                    <span class="gross-margin" data-year="${yearCount}">0€</span>
                </div>
                <div class="kpi-item">
                    <span>EBITDA:</span>
                    <span class="ebitda" data-year="${yearCount}">0€</span>
                </div>
            </div>
        `;
        
        container.appendChild(yearDiv);
    }

    updateFinancialCalculations() {
        document.querySelectorAll('.year-data').forEach(yearDiv => {
            const year = yearDiv.dataset.year;
            const revenue = parseFloat(yearDiv.querySelector('.revenue').value) || 0;
            const cogs = parseFloat(yearDiv.querySelector('.cogs').value) || 0;
            const opex = parseFloat(yearDiv.querySelector('.opex').value) || 0;
            
            const grossMargin = revenue - cogs;
            const ebitda = grossMargin - opex;
            
            yearDiv.querySelector('.gross-margin').textContent = this.formatCurrency(grossMargin);
            yearDiv.querySelector('.ebitda').textContent = this.formatCurrency(ebitda);
            
            // Update data
            const yearData = this.data.financialData.find(y => y.year == year);
            if (yearData) {
                yearData.revenue = revenue;
                yearData.cogs = cogs;
                yearData.opex = opex;
            }
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    }

    updatePreview() {
        this.updateCoverPage();
        this.updateContentPages();
    }

    updateCoverPage() {
        // Update company name
        const companyNameElement = document.querySelector('.company-name-preview');
        companyNameElement.textContent = this.data.companyName || 'Nome Azienda';
        
        // Update logo
        const logoElement = document.querySelector('.company-logo-preview');
        if (this.data.companyLogo) {
            logoElement.innerHTML = `<img src="${this.data.companyLogo}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;">`;
        } else {
            logoElement.innerHTML = '<img src="logoAreaFinanza.png" alt="Logo Area Finanza" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;">';
        }
    }

    updateCoverDate() {
        const dateElement = document.querySelector('.cover-date');
        const now = new Date();
        dateElement.textContent = now.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    updateContentPages() {
        const container = document.getElementById('contentPages');
        container.innerHTML = '';
        
        const currentSchemaData = this.schemas[this.currentSchema];
        
        Object.keys(currentSchemaData).forEach(sectionKey => {
            const section = currentSchemaData[sectionKey];
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'content-section';
            
            let sectionContent = `<h2 class="section-title">${section.title}</h2><div class="section-content">`;
            
            section.fields.forEach(field => {
                const fieldData = this.data.sections[sectionKey] && this.data.sections[sectionKey][field.name];
                if (fieldData) {
                    sectionContent += `
                        <h3>${field.label}</h3>
                        <div class="field-content">${this.nl2br(this.escapeHtml(fieldData))}</div>
                    `;

                }
            });
            
            sectionContent += '</div>';
            sectionDiv.innerHTML = sectionContent;
            container.appendChild(sectionDiv);
        });
        
        // Add financial table if data exists
        if (this.data.financialData.length > 0) {
            this.addFinancialTable(container);
        }
        
        // Add photos if exists
        if (this.data.photos.length > 0) {
            this.addPhotosToContent(container);
        }
    }

    addFinancialTable(container) {
        const tableSection = document.createElement('div');
        tableSection.className = 'content-section';
        
        let tableHTML = `
            <h2 class="section-title">Analisi Finanziaria</h2>
            <div class="section-content">
                <table class="financial-table">
                    <thead>
                        <tr>
                            <th>Anno</th>
                            <th>Ricavi (€)</th>
                            <th>COGS (€)</th>
                            <th>OPEX (€)</th>
                            <th>Margine Lordo (€)</th>
                            <th>EBITDA (€)</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        this.data.financialData.forEach(yearData => {
            const grossMargin = yearData.revenue - yearData.cogs;
            const ebitda = grossMargin - yearData.opex;
            
            tableHTML += `
                <tr>
                    <td>Anno ${yearData.year}</td>
                    <td>${this.formatCurrency(yearData.revenue)}</td>
                    <td>${this.formatCurrency(yearData.cogs)}</td>
                    <td>${this.formatCurrency(yearData.opex)}</td>
                    <td>${this.formatCurrency(grossMargin)}</td>
                    <td>${this.formatCurrency(ebitda)}</td>
                </tr>
            `;
        });
        
        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;
        
        tableSection.innerHTML = tableHTML;
        container.appendChild(tableSection);
    }

    nl2br(text) {
        return text.replace(/\n/g, '<br>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    splitLines(text) {
        return text.split('\n').filter(line => line.trim() !== '');
    }

    saveData() {
        const dataToSave = {
            ...this.data,
            schema: this.currentSchema,
            timestamp: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(dataToSave, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `business-plan-${this.data.companyName || 'untitled'}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Business Plan salvato con successo!');
    }

    loadData() {
        document.getElementById('fileInput').click();
    }

    handleFileLoad(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const loadedData = JSON.parse(e.target.result);
                
                this.data = {
                    companyName: loadedData.companyName || '',
                    companyLogo: loadedData.companyLogo || null,
                    sections: loadedData.sections || {},
                    financialData: loadedData.financialData || [{ year: 1, revenue: 0, cogs: 0, opex: 0 }]
                };
                
                if (loadedData.schema) {
                    this.currentSchema = loadedData.schema;
                    document.querySelector(`input[value="${this.currentSchema}"]`).checked = true;
                }
                
                // Update form fields
                document.getElementById('companyName').value = this.data.companyName;
                
                // Rebuild financial years
                const financialContainer = document.getElementById('financialYears');
                financialContainer.innerHTML = '';
                
                this.data.financialData.forEach((yearData, index) => {
                    if (index === 0) {
                        // Update first year
                        const firstYear = financialContainer.querySelector('.year-data');
                        if (firstYear) {
                            firstYear.querySelector('.revenue').value = yearData.revenue;
                            firstYear.querySelector('.cogs').value = yearData.cogs;
                            firstYear.querySelector('.opex').value = yearData.opex;
                        }
                    } else {
                        // Add additional years
                        this.addFinancialYear();
                        const newYear = financialContainer.lastElementChild;
                        newYear.querySelector('.revenue').value = yearData.revenue;
                        newYear.querySelector('.cogs').value = yearData.cogs;
                        newYear.querySelector('.opex').value = yearData.opex;
                    }
                });
                
                this.renderDynamicSections();
                this.updateFinancialCalculations();
                this.updatePreview();
                
                alert('Business Plan caricato con successo!');
                
            } catch (error) {
                alert('Errore nel caricamento del file: ' + error.message);
            }
        };
        reader.readAsText(file);
    }

    printDocument() {
        // Hide sidebar and show only preview for printing
        const sidebar = document.querySelector('.sidebar');
        const originalDisplay = sidebar.style.display;
        sidebar.style.display = 'none';
        
        // Add page numbers for print
        this.addPageNumbers();
        
        window.print();
        
        // Restore sidebar
        sidebar.style.display = originalDisplay;
        
        // Remove page numbers after print
        setTimeout(() => {
            this.removePageNumbers();
        }, 1000);
    }

    addPageNumbers() {
        const style = document.createElement('style');
        style.id = 'print-page-numbers';
        style.textContent = `
            @media print {
                @page {
                    @bottom-right {
                        content: "Pagina " counter(page) " di " counter(pages);
                        font-size: 10pt;
                        color: #6c757d;
                    }
                }
            }
        `;
        document.head.appendChild(style);
    }

    removePageNumbers() {
        const style = document.getElementById('print-page-numbers');
        if (style) {
            style.remove();
        }
    }

    runTests() {
        const tests = [
            this.testNl2br(),
            this.testEscapeHtml(),
            this.testSplitLines(),
            this.testFinancialCalculations(),
            this.testDataPersistence()
        ];
        
        const results = tests.map(test => {
            try {
                const result = test();
                return {
                    name: test.name,
                    passed: result.passed,
                    message: result.message
                };
            } catch (error) {
                return {
                    name: test.name,
                    passed: false,
                    message: `Errore: ${error.message}`
                };
            }
        });
        
        this.displayTestResults(results);
    }

    testNl2br() {
        const input = "Linea 1\nLinea 2\nLinea 3";
        const expected = "Linea 1<br>Linea 2<br>Linea 3";
        const result = this.nl2br(input);
        
        return {
            passed: result === expected,
            message: result === expected ? 'nl2br funziona correttamente' : `Atteso: ${expected}, Ottenuto: ${result}`
        };
    }

    testEscapeHtml() {
        const input = "<script>alert('test')</script>";
        const expected = "&lt;script&gt;alert('test')&lt;/script&gt;";
        const result = this.escapeHtml(input);
        
        return {
            passed: result === expected,
            message: result === expected ? 'escapeHtml funziona correttamente' : `Atteso: ${expected}, Ottenuto: ${result}`
        };
    }

    testSplitLines() {
        const input = "Linea 1\n\nLinea 2\n   \nLinea 3";
        const expected = ["Linea 1", "Linea 2", "Linea 3"];
        const result = this.splitLines(input);
        
        return {
            passed: JSON.stringify(result) === JSON.stringify(expected),
            message: JSON.stringify(result) === JSON.stringify(expected) ? 'splitLines funziona correttamente' : `Atteso: ${JSON.stringify(expected)}, Ottenuto: ${JSON.stringify(result)}`
        };
    }

    testFinancialCalculations() {
        const testData = { revenue: 100000, cogs: 40000, opex: 30000 };
        const expectedGrossMargin = 60000;
        const expectedEbitda = 30000;
        
        const grossMargin = testData.revenue - testData.cogs;
        const ebitda = grossMargin - testData.opex;
        
        return {
            passed: grossMargin === expectedGrossMargin && ebitda === expectedEbitda,
            message: (grossMargin === expectedGrossMargin && ebitda === expectedEbitda) ? 
                'Calcoli finanziari corretti' : 
                `Margine Lordo: atteso ${expectedGrossMargin}, ottenuto ${grossMargin}; EBITDA: atteso ${expectedEbitda}, ottenuto ${ebitda}`
        };
    }

    testDataPersistence() {
        const testData = {
            companyName: 'Test Company',
            sections: {
                'test-section': {
                    'test-field': 'Test Value'
                }
            }
        };
        
        const jsonString = JSON.stringify(testData);
        const parsedData = JSON.parse(jsonString);
        
        return {
            passed: parsedData.companyName === testData.companyName && 
                   parsedData.sections['test-section']['test-field'] === testData.sections['test-section']['test-field'],
            message: 'Persistenza dati JSON funziona correttamente'
        };
    }

    displayTestResults(results) {
        const modal = document.getElementById('testModal');
        const resultsContainer = document.getElementById('testResults');
        
        const passedTests = results.filter(r => r.passed).length;
        const totalTests = results.length;
        
        let html = `
            <div class="test-summary">
                <h4>Risultati Test: ${passedTests}/${totalTests} superati</h4>
            </div>
            <div class="test-details">
        `;
        
        results.forEach(result => {
            html += `
                <div class="test-result ${result.passed ? 'passed' : 'failed'}">
                    <span class="test-name">${result.name}</span>
                    <span class="test-status">${result.passed ? '✓' : '✗'}</span>
                    <div class="test-message">${result.message}</div>
                </div>
            `;
        });
        
        html += '</div>';
        
        resultsContainer.innerHTML = html;
        modal.style.display = 'block';
        
        // Add test result styles
        if (!document.getElementById('test-styles')) {
            const style = document.createElement('style');
            style.id = 'test-styles';
            style.textContent = `
                .test-summary {
                    background: var(--light-gray);
                    padding: 1rem;
                    border-radius: var(--border-radius);
                    margin-bottom: 1rem;
                }
                .test-result {
                    display: flex;
                    align-items: center;
                    padding: 0.75rem;
                    margin-bottom: 0.5rem;
                    border-radius: var(--border-radius);
                    border-left: 4px solid;
                }
                .test-result.passed {
                    background: #d4edda;
                    border-left-color: #28a745;
                }
                .test-result.failed {
                    background: #f8d7da;
                    border-left-color: #dc3545;
                }
                .test-name {
                    flex: 1;
                    font-weight: 500;
                }
                .test-status {
                    font-size: 1.2rem;
                    margin-left: 1rem;
                }
                .test-message {
                    width: 100%;
                    margin-top: 0.5rem;
                    font-size: 0.9rem;
                    color: var(--dark-gray);
                }
            `;
            document.head.appendChild(style);
        }
    }

    initPhotoGallery() {
        // Initialize photo gallery container
        const photoContainer = document.getElementById('photo-gallery');
        if (photoContainer) {
            this.renderPhotoGallery();
        }
    }

    handlePhotoUpload(event) {
        const files = Array.from(event.target.files);
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const photo = {
                        id: Date.now() + Math.random(),
                        name: file.name,
                        data: e.target.result,
                        size: file.size,
                        type: file.type,
                        caption: '',
                        position: 'center'
                    };
                    
                    this.data.photos.push(photo);
                    this.renderPhotoGallery();
                    this.updatePreview();
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Clear input
        event.target.value = '';
    }

    renderPhotoGallery() {
        const container = document.getElementById('photo-gallery');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.photos.forEach((photo, index) => {
            const photoDiv = document.createElement('div');
            photoDiv.className = 'photo-item';
            photoDiv.draggable = true;
            photoDiv.dataset.index = index;
            photoDiv.innerHTML = `
                <div class="photo-preview">
                    <img src="${photo.data}" alt="${photo.name}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 4px;">
                </div>
                <div class="photo-controls">
                    <input type="text" placeholder="Didascalia..." value="${photo.caption}" 
                           onchange="businessPlan.updatePhotoCaption(${index}, this.value)">
                    <select onchange="businessPlan.updatePhotoPosition(${index}, this.value)">
                        <option value="left" ${photo.position === 'left' ? 'selected' : ''}>Sinistra</option>
                        <option value="center" ${photo.position === 'center' ? 'selected' : ''}>Centro</option>
                        <option value="right" ${photo.position === 'right' ? 'selected' : ''}>Destra</option>
                    </select>
                    <button onclick="businessPlan.removePhoto(${index})" class="btn-danger">Rimuovi</button>
                </div>
            `;
            
            // Add drag and drop event listeners
            this.addDragListeners(photoDiv);
            container.appendChild(photoDiv);
        });
    }

    updatePhotoCaption(index, caption) {
        if (this.data.photos[index]) {
            this.data.photos[index].caption = caption;
            this.updatePreview();
        }
    }

    updatePhotoPosition(index, position) {
        if (this.data.photos[index]) {
            this.data.photos[index].position = position;
            this.updatePreview();
        }
    }

    removePhoto(index) {
        this.data.photos.splice(index, 1);
        this.renderPhotoGallery();
        this.updatePreview();
    }

    clearAllPhotos() {
        this.data.photos = [];
        this.renderPhotoGallery();
        this.updatePreview();
    }

    optimizePhotoLayout() {
        // Auto-optimize photo positions for better layout
        this.data.photos.forEach((photo, index) => {
            if (index % 3 === 0) photo.position = 'left';
            else if (index % 3 === 1) photo.position = 'center';
            else photo.position = 'right';
        });
        
        this.renderPhotoGallery();
        this.updatePreview();
    }

    addDragListeners(photoItem) {
        let draggedElement = null;
        let placeholder = null;
        
        photoItem.addEventListener('dragstart', (e) => {
            draggedElement = photoItem;
            photoItem.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', photoItem.outerHTML);
        });
        
        photoItem.addEventListener('dragend', (e) => {
            photoItem.classList.remove('dragging');
            if (placeholder && placeholder.parentNode) {
                placeholder.parentNode.removeChild(placeholder);
            }
            draggedElement = null;
            placeholder = null;
        });
        
        photoItem.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            if (draggedElement && draggedElement !== photoItem) {
                photoItem.classList.add('drag-over');
                
                // Create placeholder if it doesn't exist
                if (!placeholder) {
                    placeholder = document.createElement('div');
                    placeholder.className = 'drag-placeholder';
                    placeholder.innerHTML = 'Rilascia qui';
                }
                
                // Position placeholder
                const rect = photoItem.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                
                if (e.clientY < midY) {
                    photoItem.parentNode.insertBefore(placeholder, photoItem);
                } else {
                    photoItem.parentNode.insertBefore(placeholder, photoItem.nextSibling);
                }
            }
        });
        
        photoItem.addEventListener('dragleave', (e) => {
            photoItem.classList.remove('drag-over');
        });
        
        photoItem.addEventListener('drop', (e) => {
            e.preventDefault();
            photoItem.classList.remove('drag-over');
            
            if (draggedElement && draggedElement !== photoItem) {
                const draggedIndex = parseInt(draggedElement.dataset.index);
                const targetIndex = parseInt(photoItem.dataset.index);
                
                // Reorder photos array
                this.reorderPhotos(draggedIndex, targetIndex);
            }
        });
    }
    
    reorderPhotos(fromIndex, toIndex) {
        // Remove the dragged photo from its original position
        const draggedPhoto = this.data.photos.splice(fromIndex, 1)[0];
        
        // Insert it at the new position
        this.data.photos.splice(toIndex, 0, draggedPhoto);
        
        // Re-render gallery and update preview
        this.renderPhotoGallery();
        this.updatePreview();
    }

    addPhotosToContent(container) {
        if (this.data.photos.length === 0) return;
        
        const photoSection = document.createElement('div');
        photoSection.className = 'content-section photo-section';
        
        let photosHTML = `
            <h2 class="section-title">Galleria Immagini</h2>
            <div class="section-content">
                <div class="photo-grid">
        `;
        
        this.data.photos.forEach(photo => {
            photosHTML += `
                <div class="photo-container photo-${photo.position}">
                    <img src="${photo.data}" alt="${photo.name}" class="business-photo">
                    ${photo.caption ? `<p class="photo-caption">${this.escapeHtml(photo.caption)}</p>` : ''}
                </div>
            `;
        });
        
        photosHTML += `
                </div>
            </div>
        `;
        
        photoSection.innerHTML = photosHTML;
        container.appendChild(photoSection);
        
        // Add photo styles if not exists
        if (!document.getElementById('photo-styles')) {
            const style = document.createElement('style');
            style.id = 'photo-styles';
            style.textContent = `
                .photo-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1rem;
                    margin: 1rem 0;
                }
                .photo-container {
                    text-align: center;
                }
                .photo-container.photo-left {
                    text-align: left;
                }
                .photo-container.photo-right {
                    text-align: right;
                }
                .business-photo {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                .photo-caption {
                    margin-top: 0.5rem;
                    font-style: italic;
                    color: var(--dark-gray);
                    font-size: 0.9rem;
                }
                .photo-item {
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    padding: 1rem;
                    margin-bottom: 1rem;
                }
                .photo-controls {
                    margin-top: 0.5rem;
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }
                .photo-controls input {
                    flex: 1;
                    padding: 0.25rem;
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                }
                .photo-controls select {
                    padding: 0.25rem;
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                }
                .btn-danger {
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .btn-danger:hover {
                    background: #c82333;
                }
            `;  
            document.head.appendChild(style);
        }
    }

    initMiniChat() {
        const chatButtons = document.querySelectorAll('.ai-chat-btn');
        const chatOverlay = document.getElementById('miniChatOverlay');
        const chatClose = document.getElementById('miniChatClose');
        const chatCancel = document.getElementById('chatCancelBtn');
        const chatGenerate = document.getElementById('chatGenerateBtn');
        const chatTitle = document.getElementById('miniChatTitle');
        const chatFieldLabel = document.getElementById('chatFieldLabel');
        const chatFieldDescription = document.getElementById('chatFieldDescription');
        const chatPromptTextarea = document.getElementById('chatPromptTextarea');
        const chatSuggestionTags = document.getElementById('chatSuggestionTags');
        
        let currentFieldId = null;
        
        // Definizione dei suggerimenti per ogni campo
        const fieldSuggestions = {
            'companyName': ['Formale e professionale', 'Creativo e memorabile', 'Settore specifico'],
            'problemDescription': ['Dettagliato e specifico', 'Con dati statistici', 'Focalizzato sul target'],
            'solutionDescription': ['Innovativo', 'Tecnicamente dettagliato', 'Benefici chiari'],
            'targetMarket': ['Demografico specifico', 'Analisi comportamentale', 'Segmentazione avanzata'],
            'competitorAnalysis': ['Analisi SWOT', 'Posizionamento competitivo', 'Differenziazione'],
            // Schema SMART - Descrizione Azienda
            'company-description-business-activity': ['Dettagliato e professionale', 'Focus sui processi', 'Valore aggiunto'],
            'company-description-products-services': ['Caratteristiche distintive', 'Benefici per clienti', 'Portfolio completo'],
            'company-description-company-values': ['Mission e vision', 'Principi guida', 'Cultura aziendale'],
            // Schema SMART - Mercato Target
            'target-market-target-audience': ['Demografia dettagliata', 'Comportamenti specifici', 'Bisogni identificati'],
            'target-market-market-trends': ['Trend emergenti', 'Opportunità di crescita', 'Analisi settoriale'],
            'target-market-competitors': ['Analisi competitiva', 'Vantaggi distintivi', 'Posizionamento unico'],
            // Schema SMART - Strategia Operativa
            'operational-strategy-positioning': ['Proposta di valore', 'Differenziazione', 'Strategia competitiva'],
            'operational-strategy-marketing-strategy': ['Canali di marketing', 'Strategia comunicazione', 'Brand positioning'],
            'operational-strategy-sales-strategy': ['Processo vendita', 'Canali distribuzione', 'Strategia pricing'],
            // Schema ANALITICO - Profilo Aziendale
            'company-profile-company-history': ['Tappe fondamentali', 'Evoluzione storica', 'Momenti chiave'],
            'company-profile-organizational-structure': ['Struttura gerarchica', 'Dipartimenti chiave', 'Reporting lines'],
            'company-profile-organizational-chart': ['Ruoli principali', 'Responsabilità', 'Gerarchia organizzativa'],
            'company-profile-core-business': ['Attività principali', 'Generazione valore', 'Focus strategico'],
            'company-profile-swot-analysis': ['Punti di forza', 'Debolezze', 'Opportunità e minacce'],
            // Schema ANALITICO - Analisi Mercato
            'market-analysis-market-sizing': ['TAM SAM SOM', 'Proiezioni crescita', 'Dimensioni mercato'],
            'market-analysis-market-segmentation': ['Segmenti attrattivi', 'Criteri segmentazione', 'Target accessibili'],
            'market-analysis-competition-analysis': ['Competitor diretti', 'Analisi comparativa', 'Competitive advantage'],
            // Schema ANALITICO - Strategia Operazioni
            'strategy-operations-vision': ['Visione futura', 'Obiettivi long-term', 'Aspirazioni aziendali'],
            'strategy-operations-mission': ['Scopo aziendale', 'Ragion d\'essere', 'Impatto desiderato'],
            'strategy-operations-objectives': ['Obiettivi SMART', 'KPI misurabili', 'Traguardi specifici'],
            // Schema ANALITICO - Piano Finanziario
            'financial-plan-revenue-model': ['Modello ricavi', 'Flussi entrate', 'Pricing strategy'],
            'financial-plan-cost-structure': ['Struttura costi', 'Costi fissi variabili', 'Ottimizzazione spese'],
            'financial-plan-financial-indicators': ['KPI finanziari', 'Metriche performance', 'Indicatori chiave']
        };
        
        // Descrizioni dei campi
        const fieldDescriptions = {
            'companyName': 'Nome dell\'azienda che rappresenta il brand e i valori',
            'problemDescription': 'Descrizione dettagliata del problema che l\'azienda risolve',
            'solutionDescription': 'Spiegazione della soluzione offerta dall\'azienda',
            'targetMarket': 'Definizione del mercato di riferimento e dei clienti target',
            'competitorAnalysis': 'Analisi della concorrenza e del posizionamento competitivo',
            // Schema SMART - Descrizione Azienda
            'company-description-business-activity': 'Descrizione dell\'attività principale e dei processi chiave dell\'azienda',
            'company-description-products-services': 'Elenco e descrizione dei prodotti o servizi offerti dall\'azienda',
            'company-description-company-values': 'Valori aziendali, mission, vision e filosofia dell\'azienda',
            // Schema SMART - Mercato Target
            'target-market-target-audience': 'Definizione dettagliata del target di clientela e delle sue caratteristiche',
            'target-market-market-trends': 'Analisi dei principali trend del settore e opportunità di mercato',
            'target-market-competitors': 'Identificazione e analisi dei principali concorrenti del settore',
            // Schema SMART - Strategia Operativa
            'operational-strategy-positioning': 'Posizionamento strategico dell\'azienda nel mercato di riferimento',
            'operational-strategy-marketing-strategy': 'Strategia di marketing e comunicazione dell\'azienda',
            'operational-strategy-sales-strategy': 'Strategia di vendita e distribuzione dei prodotti/servizi',
            // Schema ANALITICO - Profilo Aziendale
            'company-profile-company-history': 'Storia dell\'azienda, fondazione e principali tappe evolutive',
            'company-profile-organizational-structure': 'Struttura organizzativa, dipartimenti e ruoli chiave',
            'company-profile-organizational-chart': 'Organigramma aziendale con gerarchia e responsabilità',
            'company-profile-core-business': 'Core business e attività principali che generano valore',
            'company-profile-swot-analysis': 'Analisi SWOT completa: punti di forza, debolezze, opportunità e minacce',
            // Schema ANALITICO - Analisi Mercato
            'market-analysis-market-sizing': 'Dimensionamento del mercato: TAM, SAM, SOM e proiezioni',
            'market-analysis-market-segmentation': 'Segmentazione del mercato e identificazione target accessibili',
            'market-analysis-competition-analysis': 'Analisi approfondita della concorrenza e posizionamento competitivo',
            // Schema ANALITICO - Strategia Operazioni
            'strategy-operations-vision': 'Visione aziendale e obiettivi di lungo termine',
            'strategy-operations-mission': 'Mission aziendale e scopo dell\'organizzazione',
            'strategy-operations-objectives': 'Obiettivi strategici specifici e misurabili',
            // Schema ANALITICO - Piano Finanziario
            'financial-plan-revenue-model': 'Modello di ricavi e fonti di entrata dell\'azienda',
            'financial-plan-cost-structure': 'Struttura dei costi e analisi delle spese aziendali',
            'financial-plan-financial-indicators': 'Indicatori finanziari chiave e metriche di performance'
        };
        
        // Event listeners per aprire la chat (usando event delegation per i pulsanti dinamici)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('ai-chat-btn')) {
                e.preventDefault();
                currentFieldId = e.target.getAttribute('data-field');
                openMiniChat(currentFieldId);
            }
        });
        
        // Event listeners per chiudere la chat
        [chatClose, chatCancel].forEach(element => {
            element.addEventListener('click', closeMiniChat);
        });
        
        // Chiudi cliccando sull'overlay
        chatOverlay.addEventListener('click', (e) => {
            if (e.target === chatOverlay) {
                closeMiniChat();
            }
        });
        
        // Event listener per generare contenuto
        chatGenerate.addEventListener('click', async () => {
            if (!currentFieldId) return;
            
            const customPrompt = chatPromptTextarea.value.trim();
            if (!customPrompt) {
                alert('Per favore, inserisci una richiesta personalizzata.');
                return;
            }
            
            closeMiniChat();
            await this.generateCustomAIContent(currentFieldId, customPrompt);
        });
        
        // Gestione dei tag suggerimenti
        chatSuggestionTags.addEventListener('click', (e) => {
            if (e.target.classList.contains('chat-suggestion-tag')) {
                const suggestion = e.target.textContent;
                const currentText = chatPromptTextarea.value;
                const newText = currentText ? `${currentText}. ${suggestion}` : suggestion;
                chatPromptTextarea.value = newText;
                chatPromptTextarea.focus();
            }
        });
        
        function openMiniChat(fieldId) {
            currentFieldId = fieldId;
            
            // Aggiorna il titolo e le informazioni del campo
            const fieldName = fieldDescriptions[fieldId] ? fieldId.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : fieldId;
            chatTitle.textContent = `Personalizza: ${fieldName}`;
            chatFieldLabel.textContent = fieldName;
            chatFieldDescription.textContent = fieldDescriptions[fieldId] || 'Campo del business plan';
            
            // Pulisci e popola i suggerimenti
            chatSuggestionTags.innerHTML = '';
            const suggestions = fieldSuggestions[fieldId] || [];
            suggestions.forEach(suggestion => {
                const tag = document.createElement('span');
                tag.className = 'chat-suggestion-tag';
                tag.textContent = suggestion;
                chatSuggestionTags.appendChild(tag);
            });
            
            // Pulisci la textarea
            chatPromptTextarea.value = '';
            
            // Mostra la chat
            chatOverlay.style.display = 'flex';
            setTimeout(() => {
                chatOverlay.classList.add('active');
                chatPromptTextarea.focus();
            }, 10);
        }
        
        function closeMiniChat() {
            chatOverlay.classList.remove('active');
            setTimeout(() => {
                chatOverlay.style.display = 'none';
                currentFieldId = null;
            }, 300);
        }
    }
    
    async generateCustomAIContent(fieldId, customPrompt) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        const button = document.querySelector(`[data-field="${fieldId}"]`);
        if (button) {
            button.disabled = true;
            button.classList.add('loading');
            button.textContent = 'Generando...';
        }
        
        try {
            // Crea un prompt personalizzato combinando il prompt base con quello dell'utente
            const basePrompt = this.createPromptForField(fieldId);
            const enhancedPrompt = `${basePrompt}\n\nRichiesta specifica dell'utente: ${customPrompt}\n\nPer favore, genera il contenuto tenendo conto sia delle linee guida generali che della richiesta specifica dell'utente.`;
            
            const response = await this.callSelectedAI(enhancedPrompt);
            
            if (response && response.trim()) {
                field.value = response.trim();
                
                // Salva automaticamente
                this.saveData();
                
                // Aggiorna l'anteprima se necessario
                if (this.currentSchema) {
                    this.updatePreview();
                }
                
                // Mostra feedback positivo
                this.showFeedback('Contenuto generato con successo!', 'success');
            } else {
                throw new Error('Risposta vuota dall\'AI');
            }
        } catch (error) {
            console.error('Errore nella generazione AI personalizzata:', error);
            this.showFeedback('Errore nella generazione del contenuto. Riprova.', 'error');
        } finally {
            if (button) {
                button.disabled = false;
                button.classList.remove('loading');
                button.innerHTML = '<i class="fas fa-comments"></i>';
            }
        }
    }
    
    async callSelectedAI(prompt) {
        const provider = document.getElementById('aiProvider').value;
        
        switch (provider) {
            case 'openai':
                return await this.callOpenAI(prompt);
            case 'openai-api':
                return await this.callOpenAIAPI(prompt);
            case 'perplexity':
                return await this.callPerplexityAPI(prompt);
            default:
                throw new Error('Provider AI non selezionato');
        }
    }
    
    showFeedback(message, type = 'info') {
        // Rimuovi feedback esistenti
        const existingFeedback = document.querySelector('.feedback-message');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Crea nuovo feedback
        const feedback = document.createElement('div');
        feedback.className = `feedback-message feedback-${type}`;
        feedback.textContent = message;
        
        // Aggiungi al DOM
        document.body.appendChild(feedback);
        
        // Rimuovi dopo 3 secondi
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
let businessPlan;
document.addEventListener('DOMContentLoaded', () => {
    businessPlan = new BusinessPlanGenerator();
});