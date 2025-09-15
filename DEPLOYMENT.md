# 🚀 Guida al Deployment Online - ThePlanner

## 📋 Panoramica

Questa guida fornisce istruzioni dettagliate per rendere ThePlanner fruibile online utilizzando diverse piattaforme di hosting gratuite e a pagamento.

---

## 🌐 Opzioni di Deployment

### 1. 🆓 **Netlify** (Raccomandato per Frontend)

**Vantaggi:**
- Hosting gratuito per siti statici
- Deploy automatico da Git
- HTTPS gratuito
- CDN globale
- Funzioni serverless (per backend)

#### Setup Netlify

1. **Preparazione Repository**
   ```bash
   # Crea repository Git se non esiste
   git init
   git add .
   git commit -m "Initial commit"
   
   # Push su GitHub
   git remote add origin https://github.com/tuousername/theplanner.git
   git push -u origin main
   ```

2. **Deploy su Netlify**
   - Vai su [netlify.com](https://netlify.com)
   - Clicca "New site from Git"
   - Connetti il tuo repository GitHub
   - Configura build settings:
     - **Build command**: `# Lascia vuoto per siti statici`
     - **Publish directory**: `./`
   - Clicca "Deploy site"

3. **Configurazione Custom Domain (Opzionale)**
   ```
   Site settings > Domain management > Add custom domain
   ```

4. **Netlify Functions per Backend**
   
   Crea cartella `netlify/functions/`:
   ```javascript
   // netlify/functions/upload.js
   const multipart = require('lambda-multipart-parser');
   
   exports.handler = async (event, context) => {
     if (event.httpMethod !== 'POST') {
       return { statusCode: 405, body: 'Method Not Allowed' };
     }
   
     try {
       const { files } = await multipart.parse(event);
       // Logica di processing documenti
       
       return {
         statusCode: 200,
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ success: true, data: processedData })
       };
     } catch (error) {
       return {
         statusCode: 500,
         body: JSON.stringify({ error: error.message })
       };
     }
   };
   ```

---

### 2. 📄 **GitHub Pages**

**Vantaggi:**
- Completamente gratuito
- Integrazione diretta con GitHub
- Facile da configurare

**Limitazioni:**
- Solo siti statici (no backend Python)
- Dominio github.io (custom domain disponibile)

#### Setup GitHub Pages

1. **Preparazione Repository**
   ```bash
   # Assicurati che tutti i file siano nel root
   ls -la
   # Dovresti vedere: index.html, app.js, style.css, etc.
   ```

2. **Configurazione GitHub Pages**
   - Vai al tuo repository su GitHub
   - Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: `main` / `master`
   - Folder: `/ (root)`
   - Salva

3. **Modifica per GitHub Pages**
   
   Aggiorna `app.js` per backend alternativo:
   ```javascript
   // Sostituisci l'endpoint del backend
   const BACKEND_URL = 'https://your-backend-service.herokuapp.com';
   
   // O usa un servizio di processing documenti online
   async function uploadDocument(file) {
     // Implementa con servizio esterno come:
     // - Cloudinary per file processing
     // - Firebase Functions
     // - Vercel API Routes
   }
   ```

4. **URL del sito**
   ```
   https://tuousername.github.io/theplanner
   ```

---

### 3. ⚡ **Vercel**

**Vantaggi:**
- Deploy istantaneo
- Serverless functions
- Ottimizzazioni automatiche
- Analytics integrati

#### Setup Vercel

1. **Installazione Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Configurazione Progetto**
   
   Crea `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "*.html",
         "use": "@vercel/static"
       },
       {
         "src": "api/*.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/api/$1"
       },
       {
         "src": "/(.*)",
         "dest": "/$1"
       }
     ]
   }
   ```

3. **Backend API Routes**
   
   Crea cartella `api/` e sposta `document_processor.py`:
   ```python
   # api/upload.py
   from flask import Flask, request, jsonify
   import os
   
   app = Flask(__name__)
   
   def handler(request):
       if request.method == 'POST':
           # Logica upload documento
           return jsonify({'status': 'success'})
       
       return jsonify({'error': 'Method not allowed'}), 405
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

---

### 4. 🐳 **Heroku** (Full-Stack)

**Vantaggi:**
- Supporto completo Python + Frontend
- Database PostgreSQL gratuito
- Add-ons disponibili

#### Setup Heroku

1. **Preparazione Files**
   
   Crea `Procfile`:
   ```
   web: python document_processor.py
   ```
   
   Crea `runtime.txt`:
   ```
   python-3.9.18
   ```
   
   Aggiorna `requirements.txt`:
   ```
   Flask==2.3.3
   Flask-CORS==4.0.0
   PyPDF2==3.0.1
   python-docx==0.8.11
   gunicorn==21.2.0
   ```

2. **Modifica Backend per Heroku**
   ```python
   # document_processor.py
   import os
   from flask import Flask
   
   app = Flask(__name__)
   
   # ... resto del codice ...
   
   if __name__ == '__main__':
       port = int(os.environ.get('PORT', 5000))
       app.run(host='0.0.0.0', port=port, debug=False)
   ```

3. **Deploy su Heroku**
   ```bash
   # Installa Heroku CLI
   # https://devcenter.heroku.com/articles/heroku-cli
   
   heroku login
   heroku create theplanner-app
   
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   
   heroku open
   ```

4. **Configurazione Frontend**
   
   Aggiorna `app.js`:
   ```javascript
   const BACKEND_URL = 'https://theplanner-app.herokuapp.com';
   ```

---

### 5. 🔥 **Firebase Hosting + Functions**

**Vantaggi:**
- Hosting veloce con CDN
- Functions serverless
- Database Firestore
- Autenticazione integrata

#### Setup Firebase

1. **Installazione Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Inizializzazione Progetto**
   ```bash
   firebase init
   # Seleziona: Hosting, Functions
   # Public directory: ./
   # Single-page app: No
   ```

3. **Firebase Functions**
   ```javascript
   // functions/index.js
   const functions = require('firebase-functions');
   const admin = require('firebase-admin');
   
   admin.initializeApp();
   
   exports.uploadDocument = functions.https.onRequest((req, res) => {
     res.set('Access-Control-Allow-Origin', '*');
     
     if (req.method === 'POST') {
       // Logica processing documenti
       res.json({ success: true });
     } else {
       res.status(405).send('Method Not Allowed');
     }
   });
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```

---

## 🔧 Configurazioni Specifiche

### Backend Alternatives per Hosting Statici

Se usi GitHub Pages o hosting solo frontend, considera queste alternative:

#### 1. **Cloudinary per Document Processing**
```javascript
// Sostituisci upload locale con Cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret'
});

async function uploadToCloudinary(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
    format: 'txt' // Estrai testo
  });
  return result;
}
```

#### 2. **Supabase per Database e Storage**
```javascript
// Sostituisci localStorage con Supabase
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
);

// Salva business plan
async function saveBusinessPlan(data) {
  const { data: result, error } = await supabase
    .from('business_plans')
    .insert([data]);
  
  return result;
}
```

#### 3. **Zapier/Make.com per Automazioni**
- Crea webhook per processing documenti
- Integra con Google Drive/Dropbox
- Automatizza invio email business plan

---

## 🔒 Configurazioni di Sicurezza

### Environment Variables

**Per Netlify:**
```
Site settings > Environment variables
OPENAI_API_KEY=sk-...
PERPLEXITY_API_KEY=pplx-...
```

**Per Vercel:**
```bash
vercel env add OPENAI_API_KEY
vercel env add PERPLEXITY_API_KEY
```

**Per Heroku:**
```bash
heroku config:set OPENAI_API_KEY=sk-...
heroku config:set PERPLEXITY_API_KEY=pplx-...
```

### CORS Configuration

```javascript
// Per tutti i backend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://your-domain.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
```

---

## 📊 Monitoring e Analytics

### Google Analytics
```html
<!-- Aggiungi in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking con Sentry
```javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

---

## 🚀 Raccomandazioni per Deployment

### 🥇 **Opzione Migliore: Netlify + Netlify Functions**

**Perché:**
- Setup semplice e veloce
- Supporto completo frontend + backend
- Gratuito per progetti piccoli
- Ottima performance
- Deploy automatico da Git

**Setup Completo:**
1. Frontend su Netlify
2. Backend con Netlify Functions
3. Database con Supabase (gratuito)
4. File storage con Cloudinary

### 🥈 **Alternativa: Vercel**

**Per progetti con più traffico:**
- Migliori performance
- Analytics integrati
- Serverless functions ottimizzate

### 🥉 **Per Principianti: GitHub Pages + Servizi Esterni**

**Setup più semplice:**
- Frontend su GitHub Pages
- Backend con servizi no-code (Zapier, Airtable)
- Storage con Google Drive API

---

## 📝 Checklist Pre-Deploy

- [ ] ✅ Repository Git configurato
- [ ] ✅ File README.md e doc.md aggiornati
- [ ] ✅ API keys configurate come environment variables
- [ ] ✅ CORS configurato correttamente
- [ ] ✅ Error handling implementato
- [ ] ✅ Loading states per UI
- [ ] ✅ Responsive design testato
- [ ] ✅ Performance ottimizzate
- [ ] ✅ SEO meta tags aggiunti
- [ ] ✅ Analytics configurati
- [ ] ✅ Backup strategy definita

---

## 🆘 Troubleshooting Deployment

### Errori Comuni

**1. CORS Errors**
```
Access to fetch at 'api-url' from origin 'frontend-url' has been blocked by CORS policy
```
**Soluzione:** Configura CORS nel backend per permettere il dominio frontend

**2. API Keys Non Funzionanti**
```
401 Unauthorized
```
**Soluzione:** Verifica che le environment variables siano configurate correttamente

**3. File Upload Fallisce**
```
413 Payload Too Large
```
**Soluzione:** Aumenta limite file size nel server config

**4. Build Fallisce**
```
Module not found
```
**Soluzione:** Verifica che tutte le dipendenze siano in requirements.txt/package.json

### Debug Tools

```javascript
// Aggiungi per debug in produzione
if (window.location.hostname !== 'localhost') {
  console.log = () => {}; // Disabilita logs in produzione
} else {
  // Debug mode per sviluppo
  window.DEBUG = true;
}
```

---

## 📞 Supporto

Per problemi di deployment:

1. **Controlla i logs** della piattaforma di hosting
2. **Verifica la documentazione** specifica della piattaforma
3. **Testa localmente** prima del deploy
4. **Usa staging environment** per test

---

*Guida aggiornata al: 2024*  
*Per supporto: Consulta la documentazione della piattaforma scelta*