# Configurazione Backend Render per thePlanner-1

## Passi per il Deploy

### 1. Configurazione URL Backend
Dopo aver deployato il backend su Render, aggiorna il file `config.js`:

```javascript
// Sostituisci 'https://your-render-app.onrender.com' con il tuo URL effettivo di Render
const CONFIG = {
    RENDER_BACKEND_URL: 'https://your-actual-render-app.onrender.com',
    // ...resto della configurazione
};
```

### 1.1. Deploy del Backend su Render
1. Vai su [render.com](https://render.com) e crea un account
2. Crea un nuovo "Web Service"
3. Connetti il repository del backend (document_processor.py)
4. Configura:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python document_processor.py`
   - **Environment**: Python 3
5. Aggiungi le variabili d'ambiente necessarie
6. Fai il deploy e copia l'URL generato

### 2. URL di Render
Il tuo URL di Render avrà il formato:
- `https://[nome-app].onrender.com`

### 3. Verifica CORS
Assicurati che il backend su Render abbia CORS configurato per accettare richieste da:
- `https://[tuo-sito].netlify.app`
- `https://[tuo-sito].netlify.com`

### 4. Test della Connessione
1. Apri la console del browser (F12)
2. Vai alla pagina admin (`admin.html`)
3. Controlla lo stato del server
4. Verifica che non ci siano errori CORS

### 5. Endpoints Disponibili
Il backend espone questi endpoints:
- `POST /process_document` - Carica e processa documenti
- `GET /get_documents` - Ottieni lista documenti
- `GET /get_document_text/{id}` - Ottieni testo documento
- `DELETE /remove_document/{id}` - Rimuovi documento
- `POST /clear_session` - Pulisci sessione
- `GET /health` - Controllo stato server

### 6. Deploy del Frontend su Netlify
1. Vai su [netlify.com](https://netlify.com) e crea un account
2. Connetti il repository del frontend (thePlanner-1)
3. Configura:
   - **Build command**: (lascia vuoto per siti statici)
   - **Publish directory**: `.` (directory corrente)
4. Il file `netlify.toml` gestirà automaticamente la configurazione
5. Dopo il deploy, l'app sarà disponibile su `https://[nome-app].netlify.app`

### 6.1. Dominio Personalizzato
Se hai un dominio personalizzato (come `www.thebplanner.shop`):
1. Vai nelle impostazioni del sito Netlify
2. Sezione "Domain management" → "Custom domains"
3. Aggiungi il tuo dominio personalizzato
4. Configura i DNS secondo le istruzioni Netlify

### 7. Configurazione Automatica degli Ambienti
Il sistema rileva automaticamente l'ambiente:
- **Sviluppo**: Usa `http://localhost:5000` (backend locale)
- **Produzione**: Usa l'URL di Render configurato

### 8. Troubleshooting
- Se vedi errori CORS, controlla la configurazione CORS del backend
- Se il server non risponde, verifica che sia attivo su Render
- Controlla i log di Render per eventuali errori del backend
- Usa la console del browser (F12) per vedere eventuali errori JavaScript
- Verifica che l'URL di Render sia corretto in `config.js`

### 9. Monitoraggio
- Usa la pagina admin (`/admin.html`) per monitorare lo stato del backend
- Controlla i log di Render per il backend
- Controlla i log di Netlify per il frontend