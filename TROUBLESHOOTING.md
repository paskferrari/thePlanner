# 🔧 Guida al Troubleshooting - thePlanner

## 🚨 Errori Comuni e Soluzioni

### 1. Errori CSP (Content Security Policy)

**Sintomo**: Errori tipo "Refused to connect... violates Content Security Policy"

**Causa**: Il browser blocca risorse esterne non autorizzate

**Soluzione**:
- ✅ Verificare che `netlify.toml` includa tutti i domini necessari
- ✅ FontAwesome: `https://ka-f.fontawesome.com` deve essere in `connect-src`, `style-src`, e `font-src`
- ✅ API esterne: Aggiungere domini in `connect-src`

### 2. Errore 500 del Backend

**Sintomo**: "Server error: 500" nelle chiamate API

**Possibili Cause**:
1. **Variabili d'ambiente mancanti** su Render
2. **API Keys non configurate** (OpenAI, Perplexity)
3. **Problemi di dipendenze** Python

**Soluzioni**:

#### 2.1 Verificare Variabili d'Ambiente su Render
1. Vai su [render.com](https://render.com) → Dashboard
2. Seleziona il tuo servizio backend
3. Vai su "Environment" → "Environment Variables"
4. Verifica che siano presenti:
   ```
   OPENAI_API_KEY=sk-...
   PERPLEXITY_API_KEY=pplx-...
   PORT=5000
   ```

#### 2.2 Controllare i Log di Render
1. Dashboard Render → Il tuo servizio
2. Vai su "Logs" per vedere errori specifici
3. Cerca errori Python o dipendenze mancanti

#### 2.3 Verificare Dipendenze
Assicurati che `requirements.txt` contenga:
```
flask
flask-cors
openai
requests
python-dotenv
```

### 3. Problemi di Connessione Frontend-Backend

**Sintomo**: Frontend non si collega al backend

**Verifica**:
1. **Controlla config.js**: L'URL del backend è corretto?
2. **Testa manualmente**: Vai su `https://thetranscriber4theblanner.onrender.com/health`
3. **Verifica CORS**: Il backend deve permettere il tuo dominio

### 4. Problemi di Deploy Netlify

**Sintomo**: Sito non si aggiorna dopo push

**Soluzioni**:
1. **Verifica Build**: Dashboard Netlify → "Deploys" → Controlla log
2. **Cache**: Prova "Clear cache and deploy site"
3. **Variabili d'ambiente**: Verifica in "Site settings" → "Environment variables"

### 5. Errori di Produzione vs Sviluppo

**Sintomo**: Funziona in locale ma non in produzione

**Verifica**:
1. **Environment Detection**: `config.js` rileva correttamente l'ambiente?
2. **HTTPS vs HTTP**: In produzione usa sempre HTTPS
3. **Domini**: Verifica che il dominio sia riconosciuto in `config.js`

## 🔍 Strumenti di Debug

### Console del Browser (F12)
- **Network**: Verifica chiamate API e errori HTTP
- **Console**: Controlla errori JavaScript e CSP
- **Application**: Verifica localStorage e cookies

### Test Manuali
```bash
# Test health del backend
curl https://thetranscriber4theblanner.onrender.com/health

# Test con PowerShell
Invoke-WebRequest -Uri "https://thetranscriber4theblanner.onrender.com/health"
```

### Pagina Admin
- Vai su `/admin.html` per controllare lo stato del server
- Verifica connessione e API keys

## 📞 Checklist Rapida

Quando qualcosa non funziona:

- [ ] Backend Render è attivo? (test `/health`)
- [ ] Variabili d'ambiente configurate su Render?
- [ ] CSP permette tutte le risorse necessarie?
- [ ] Frontend deployato su Netlify?
- [ ] Dominio riconosciuto in `config.js`?
- [ ] Console browser mostra errori specifici?
- [ ] Log di Render mostrano errori?

## 🆘 Contatti di Emergenza

Se i problemi persistono:
1. Controlla i log di Render per errori specifici
2. Verifica la console del browser per dettagli
3. Testa l'endpoint `/health` manualmente
4. Controlla che tutte le API keys siano valide