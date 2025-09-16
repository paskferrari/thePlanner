class AdminControl {
    constructor() {
        this.init();
    }
    
    init() {
        this.loadConfiguration();
        this.checkServerStatus();
        this.updateStatusIndicators();
        
        // Event listeners
        document.getElementById('aiProvider').addEventListener('change', () => {
            this.updateStatusIndicators();
        });
    }
    
    loadConfiguration() {
        // Carica configurazione salvata
        const config = JSON.parse(localStorage.getItem('adminConfig') || '{}');
        
        // AI Provider settings
        document.getElementById('aiProvider').value = config.aiProvider || 'openai';
        document.getElementById('temperature').value = config.temperature || 0.7;
        document.getElementById('maxTokens').value = config.maxTokens || 1000;
        document.getElementById('systemPrompt').value = config.systemPrompt || '';
        
        // API Keys
        document.getElementById('openaiKey').value = config.openaiKey || '';
        document.getElementById('perplexityKey').value = config.perplexityKey || '';
        
        // Advanced settings
        document.getElementById('autoSave').value = config.autoSave || 'true';
        document.getElementById('sessionTimeout').value = config.sessionTimeout || 30;
        document.getElementById('debugMode').value = config.debugMode || 'false';
    }
    
    saveConfiguration() {
        const config = {
            aiProvider: document.getElementById('aiProvider').value,
            temperature: parseFloat(document.getElementById('temperature').value),
            maxTokens: parseInt(document.getElementById('maxTokens').value),
            systemPrompt: document.getElementById('systemPrompt').value,
            openaiKey: document.getElementById('openaiKey').value,
            perplexityKey: document.getElementById('perplexityKey').value,
            autoSave: document.getElementById('autoSave').value === 'true',
            sessionTimeout: parseInt(document.getElementById('sessionTimeout').value),
            debugMode: document.getElementById('debugMode').value === 'true'
        };
        
        localStorage.setItem('adminConfig', JSON.stringify(config));
        
        // Salva anche nel localStorage principale per compatibilità
        localStorage.setItem('aiProvider', config.aiProvider);
        localStorage.setItem('openaiApiKey', config.openaiKey);
        localStorage.setItem('perplexityApiKey', config.perplexityKey);
        
        alert('✅ Configurazione salvata con successo!');
        this.updateStatusIndicators();
    }
    
    updateStatusIndicators() {
        const openaiKey = document.getElementById('openaiKey').value;
        const perplexityKey = document.getElementById('perplexityKey').value;
        const currentProvider = document.getElementById('aiProvider').value;
        
        // OpenAI status
        const openaiStatus = document.getElementById('openaiStatus');
        openaiStatus.className = `status-indicator ${openaiKey ? 'status-active' : 'status-inactive'}`;
        
        // Perplexity status
        const perplexityStatus = document.getElementById('perplexityStatus');
        perplexityStatus.className = `status-indicator ${perplexityKey ? 'status-active' : 'status-inactive'}`;
    }
    
    async checkServerStatus() {
        const statusElement = document.getElementById('serverStatus');
        const statusText = document.getElementById('serverStatusText');
        
        try {
            const response = await fetch(`${CONFIG.getBackendUrl()}/health`);
            if (response.ok) {
                statusElement.className = 'status-indicator status-active';
                statusText.textContent = 'Server di trascrizione attivo';
            } else {
                throw new Error('Server non risponde');
            }
        } catch (error) {
            statusElement.className = 'status-indicator status-inactive';
            statusText.textContent = 'Server di trascrizione non attivo';
        }
    }
    
    async testApiKeys() {
        const provider = document.getElementById('aiProvider').value;
        const openaiKey = document.getElementById('openaiKey').value;
        const perplexityKey = document.getElementById('perplexityKey').value;
        
        if (provider === 'openai' && !openaiKey) {
            alert('❌ Inserisci prima la API Key di OpenAI');
            return;
        }
        
        if (provider === 'perplexity' && !perplexityKey) {
            alert('❌ Inserisci prima la API Key di Perplexity');
            return;
        }
        
        try {
            let testResult;
            
            if (provider === 'openai') {
                testResult = await this.testOpenAIKey(openaiKey);
            } else {
                testResult = await this.testPerplexityKey(perplexityKey);
            }
            
            if (testResult.success) {
                alert(`✅ API Key ${provider.toUpperCase()} valida!`);
            } else {
                alert(`❌ API Key ${provider.toUpperCase()} non valida: ${testResult.error}`);
            }
        } catch (error) {
            alert(`❌ Errore nel test della API Key: ${error.message}`);
        }
    }
    
    async testOpenAIKey(apiKey) {
        try {
            const response = await fetch('https://api.openai.com/v1/models', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            
            if (response.ok) {
                return { success: true };
            } else {
                const error = await response.json();
                return { success: false, error: error.error?.message || 'Chiave non valida' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    async testPerplexityKey(apiKey) {
        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.1-sonar-small-128k-online',
                    messages: [{ role: 'user', content: 'test' }],
                    max_tokens: 1
                })
            });
            
            if (response.ok || response.status === 400) {
                // 400 è accettabile per un test con payload minimo
                return { success: true };
            } else {
                const error = await response.json();
                return { success: false, error: error.error?.message || 'Chiave non valida' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    async clearAllDocuments() {
        if (!confirm('⚠️ Sei sicuro di voler cancellare tutti i documenti trascritti?')) {
            return;
        }
        
        try {
            const response = await fetch(`${CONFIG.getBackendUrl()}/clear_session`, {
                method: 'POST'
            });
            
            if (response.ok) {
                alert('✅ Tutti i documenti sono stati cancellati');
            } else {
                throw new Error('Errore nella cancellazione');
            }
        } catch (error) {
            alert(`❌ Errore: ${error.message}`);
        }
    }
    
    async startTranscriptionServer() {
        try {
            // Questo comando dovrebbe essere eseguito dall'utente manualmente
            alert('📋 Per avviare il server di trascrizione, esegui questo comando nel terminale:\n\npython document_processor.py');
            
            // Verifica dopo 3 secondi
            setTimeout(() => {
                this.checkServerStatus();
            }, 3000);
        } catch (error) {
            alert(`❌ Errore: ${error.message}`);
        }
    }
    
    async stopTranscriptionServer() {
        alert('📋 Per fermare il server di trascrizione, premi Ctrl+C nel terminale dove è in esecuzione.');
    }
    
    resetAllSettings() {
        if (!confirm('⚠️ Sei sicuro di voler resettare tutte le impostazioni?')) {
            return;
        }
        
        localStorage.removeItem('adminConfig');
        localStorage.removeItem('aiProvider');
        localStorage.removeItem('openaiApiKey');
        localStorage.removeItem('perplexityApiKey');
        
        // Reset form
        document.getElementById('aiProvider').value = 'openai';
        document.getElementById('temperature').value = 0.7;
        document.getElementById('maxTokens').value = 1000;
        document.getElementById('systemPrompt').value = '';
        document.getElementById('openaiKey').value = '';
        document.getElementById('perplexityKey').value = '';
        document.getElementById('autoSave').value = 'true';
        document.getElementById('sessionTimeout').value = 30;
        document.getElementById('debugMode').value = 'false';
        
        this.updateStatusIndicators();
        alert('✅ Impostazioni resettate!');
    }
    
    exportConfiguration() {
        const config = JSON.parse(localStorage.getItem('adminConfig') || '{}');
        
        // Rimuovi le API keys per sicurezza
        const exportConfig = { ...config };
        delete exportConfig.openaiKey;
        delete exportConfig.perplexityKey;
        
        const dataStr = JSON.stringify(exportConfig, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'planner-config.json';
        link.click();
    }
    
    importConfiguration() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const config = JSON.parse(e.target.result);
                    
                    // Merge con configurazione esistente
                    const currentConfig = JSON.parse(localStorage.getItem('adminConfig') || '{}');
                    const mergedConfig = { ...currentConfig, ...config };
                    
                    localStorage.setItem('adminConfig', JSON.stringify(mergedConfig));
                    this.loadConfiguration();
                    this.updateStatusIndicators();
                    
                    alert('✅ Configurazione importata con successo!');
                } catch (error) {
                    alert('❌ Errore nel file di configurazione');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }
}

// Funzioni globali per gli event handlers
function toggleKeyVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        button.textContent = '🙈';
    } else {
        input.type = 'password';
        button.textContent = '👁️';
    }
}

function saveConfiguration() {
    adminControl.saveConfiguration();
}

function testApiKeys() {
    adminControl.testApiKeys();
}

function checkServerStatus() {
    adminControl.checkServerStatus();
}

function clearAllDocuments() {
    adminControl.clearAllDocuments();
}

function startTranscriptionServer() {
    adminControl.startTranscriptionServer();
}

function stopTranscriptionServer() {
    adminControl.stopTranscriptionServer();
}

function resetAllSettings() {
    adminControl.resetAllSettings();
}

function exportConfiguration() {
    adminControl.exportConfiguration();
}

function importConfiguration() {
    adminControl.importConfiguration();
}

// Inizializza l'admin control
const adminControl = new AdminControl();

// Auto-save ogni 30 secondi se abilitato
setInterval(() => {
    const config = JSON.parse(localStorage.getItem('adminConfig') || '{}');
    if (config.autoSave !== false) {
        adminControl.saveConfiguration();
    }
}, 30000);