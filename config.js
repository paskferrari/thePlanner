/**
 * Configurazione per thePlanner-1
 * Gestisce gli URL del backend per diversi ambienti
 */

// Configurazione degli ambienti
const CONFIG = {
    // URL del backend - cambia questo quando fai il deploy
    BACKEND_URL: 'http://localhost:5000', // Per sviluppo locale
    RENDER_BACKEND_URL: 'https://thetranscriber4theblanner.onrender.com', // Per produzione su Render
    
    // Altre configurazioni
    APP_NAME: 'thePlanner-1',
    VERSION: '1.0.0',
    
    // Configurazione per il rilevamento automatico dell'ambiente
    getBackendUrl() {
        // Controlla se siamo in produzione (Netlify o dominio personalizzato)
        const isProduction = window.location.hostname.includes('netlify.app') || 
                           window.location.hostname.includes('netlify.com') ||
                           window.location.hostname.includes('thebplanner.shop') ||
                           (window.location.protocol === 'https:' && 
                            !window.location.hostname.includes('localhost'));
        
        if (isProduction) {
            // In produzione, usa l'URL di Render
            return this.RENDER_BACKEND_URL;
        }
        
        // In sviluppo, usa localhost
        return this.BACKEND_URL;
    },
    
    // Funzione per verificare se siamo in produzione
    isProduction() {
        return this.getBackendUrl() === this.RENDER_BACKEND_URL;
    },
    
    // Funzione per logging condizionale
    log(message, ...args) {
        if (!this.isProduction()) {
            console.log(`[${this.APP_NAME}]`, message, ...args);
        }
    }
};

// Esporta la configurazione per l'uso negli altri file
window.CONFIG = CONFIG;