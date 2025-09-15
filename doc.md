# 📚 ThePlanner - Documentazione Tecnica Completa

## 📋 Indice

1. [Architettura del Sistema](#architettura-del-sistema)
2. [Componenti Frontend](#componenti-frontend)
3. [Backend e API](#backend-e-api)
4. [Integrazione AI](#integrazione-ai)
5. [Sistema di Gestione Documenti](#sistema-di-gestione-documenti)
6. [Database e Persistenza](#database-e-persistenza)
7. [Sicurezza e Autenticazione](#sicurezza-e-autenticazione)
8. [Performance e Ottimizzazioni](#performance-e-ottimizzazioni)
9. [Testing e Debug](#testing-e-debug)
10. [Deployment e DevOps](#deployment-e-devops)
11. [API Reference](#api-reference)
12. [Troubleshooting Avanzato](#troubleshooting-avanzato)

---

## 🏗️ Architettura del Sistema

### Overview Architetturale

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Client-Side)                   │
├─────────────────────────────────────────────────────────────┤
│  index.html  │  admin.html  │  monitor.html                │
│  app.js      │  admin.js    │  monitor.js                  │
│  style.css   │              │  monitor.css                 │
└─────────────────┬───────────────────────────┬───────────────┘
                  │                           │
                  ▼                           ▼
┌─────────────────────────────────┐ ┌─────────────────────────┐
│        AI PROVIDERS             │ │    BACKEND SERVICES     │
│  ┌─────────────┐ ┌─────────────┐│ │ ┌─────────────────────┐ │
│  │   OpenAI    │ │ Perplexity  ││ │ │  document_processor │ │
│  │   GPT-4     │ │     AI      ││ │ │    (Flask Server)   │ │
│  └─────────────┘ └─────────────┘│ │ └─────────────────────┘ │
└─────────────────────────────────┘ └─────────────────────────┘
                  │                           │
                  ▼                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATA LAYER                               │
│  LocalStorage  │  temp_documents/  │  transcribed_docs.json │
└─────────────────────────────────────────────────────────────┘
```

### Principi Architetturali

1. **Separation of Concerns**: Frontend, Backend e AI sono separati
2. **Modular Design**: Ogni componente ha responsabilità specifiche
3. **Fault Tolerance**: Sistema di fallback per AI e gestione errori
4. **Scalability**: Architettura pronta per scaling orizzontale
5. **Security First**: API keys gestite solo lato client

---

## 🎨 Componenti Frontend

### 1. Pagina Principale (index.html)

#### Struttura DOM
```html
<div class="app-container">
  <header class="app-header">
    <!-- Logo, titolo, controlli -->
  </header>
  <div class="main-content">
    <aside class="sidebar">
      <!-- Configurazioni, AI, documenti -->
    </aside>
    <main class="content-area">
      <!-- Sezioni business plan -->
    </main>
  </div>
</div>
```

#### Componenti Chiave

**Header Controls**
- `saveBtn`: Salvataggio progetti
- `loadBtn`: Caricamento progetti
- `printBtn`: Export PDF/Stampa
- `testBtn`: Test funzionalità
- `adminLink`: Accesso pannello admin

**Sidebar Components**
- Schema Toggle (Smart/Analitico)
- AI Configuration
- Document Upload Area
- Financial Data Input

**Content Area**
- Dynamic Section Rendering
- AI-Generated Content Display
- Form Validation
- Real-time Preview

### 2. Classe BusinessPlanGenerator (app.js)

#### Struttura Principale
```javascript
class BusinessPlanGenerator {
  constructor() {
    this.currentSchema = 'smart';
    this.data = {
      companyName: '',
      companyLogo: null,
      sections: {},
      financialData: [],
      photos: []
    };
    this.schemas = { /* definizioni schema */ };
    this.aiProvider = 'openai'; // Default
  }
}
```

#### Metodi Principali

**Inizializzazione**
- `init()`: Setup iniziale applicazione
- `initAIFeatures()`: Configurazione AI
- `loadSavedData()`: Caricamento dati salvati

**Gestione Schema**
- `switchSchema(schemaType)`: Cambio modalità
- `renderSections()`: Rendering dinamico sezioni
- `validateSection(sectionId)`: Validazione input

**AI Integration**
- `generateAIContent(sectionId, prompt)`: Generazione contenuti
- `handleAIError(error)`: Gestione errori AI
- `switchAIProvider()`: Fallback automatico

**Data Management**
- `saveProject()`: Salvataggio progetti
- `loadProject()`: Caricamento progetti
- `exportToPDF()`: Export documenti

### 3. Sistema CSS (style.css)

#### Variabili CSS
```css
:root {
  --primary-blue: #143964;
  --primary-gold: #cdae50;
  --white: #ffffff;
  --light-gray: #f8f9fa;
  --shadow: 0 2px 10px rgba(20, 57, 100, 0.1);
  --border-radius: 8px;
  --transition: all 0.3s ease;
}
```

#### Layout System
- **CSS Grid**: Layout principale responsive
- **Flexbox**: Componenti interni
- **Custom Properties**: Theming consistente
- **Media Queries**: Responsive design

#### Componenti Stilizzati
- Form Controls
- Buttons e Interactions
- Cards e Containers
- Loading States
- Error States

---

## 🔧 Backend e API

### 1. Document Processor (document_processor.py)

#### Architettura Flask
```python
app = Flask(__name__)
CORS(app)  # Cross-Origin Resource Sharing

class DocumentProcessor:
    def __init__(self):
        self.transcripts = self.load_transcripts()
    
    def extract_text_from_pdf(self, file_path):
        # PyPDF2 implementation
    
    def extract_text_from_docx(self, file_path):
        # python-docx implementation
    
    def extract_text_from_txt(self, file_path):
        # Plain text processing
```

#### Endpoints API

**POST /upload**
- **Scopo**: Upload e trascrizione documenti
- **Input**: Multipart form data
- **Output**: JSON con testo estratto
- **Formati**: PDF, DOCX, TXT

```python
@app.route('/upload', methods=['POST'])
def upload_document():
    # Validazione file
    # Estrazione testo
    # Salvataggio trascrizione
    # Ritorno risultato
```

**GET /documents**
- **Scopo**: Lista documenti trascritti
- **Output**: JSON array documenti

**DELETE /documents/<doc_id>**
- **Scopo**: Eliminazione documento
- **Input**: Document ID
- **Output**: Status response

**GET /health**
- **Scopo**: Health check server
- **Output**: Status server

#### Gestione File

**Directory Structure**
```
temp_documents/
├── session_<uuid>/
│   ├── uploaded_file_1.pdf
│   ├── uploaded_file_2.docx
│   └── ...
└── transcribed_documents.json
```

**File Processing Pipeline**
1. **Upload**: Ricezione file multipart
2. **Validation**: Controllo tipo e dimensione
3. **Storage**: Salvataggio temporaneo
4. **Extraction**: Estrazione testo specifico per formato
5. **Cleanup**: Rimozione file temporanei
6. **Persistence**: Salvataggio trascrizione JSON

---

## 🤖 Integrazione AI

### 1. Sistema Multi-Provider

#### Provider Configuration
```javascript
const AI_PROVIDERS = {
  openai: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4',
    headers: {
      'Authorization': 'Bearer ${apiKey}',
      'Content-Type': 'application/json'
    }
  },
  perplexity: {
    endpoint: 'https://api.perplexity.ai/chat/completions',
    model: 'llama-3.1-sonar-small-128k-online',
    headers: {
      'Authorization': 'Bearer ${apiKey}',
      'Content-Type': 'application/json'
    }
  }
};
```

#### Request Flow
```javascript
async function generateAIContent(sectionId, prompt) {
  try {
    // 1. Preparazione prompt
    const enhancedPrompt = buildContextualPrompt(sectionId, prompt);
    
    // 2. Tentativo provider primario (OpenAI)
    const response = await callAIProvider('openai', enhancedPrompt);
    
    return response;
  } catch (error) {
    if (error.status === 429) {
      // 3. Fallback automatico a Perplexity
      return await callAIProvider('perplexity', enhancedPrompt);
    }
    throw error;
  }
}
```

### 2. Prompt Engineering

#### Template System
```javascript
const PROMPT_TEMPLATES = {
  'executive-summary': {
    system: "Sei un consulente esperto in business plan...",
    context: "Analizza le seguenti informazioni aziendali...",
    instruction: "Genera un executive summary professionale..."
  },
  'market-analysis': {
    system: "Sei un analista di mercato esperto...",
    context: "Considera il settore e il target...",
    instruction: "Fornisci un'analisi di mercato dettagliata..."
  }
};
```

#### Context Building
- **Company Data**: Informazioni aziendali inserite
- **Document Context**: Testo da documenti trascritti
- **Section Context**: Dati da altre sezioni compilate
- **Schema Context**: Modalità Smart vs Analitico

### 3. Error Handling e Retry Logic

#### Strategia di Retry
```javascript
class AIRetryHandler {
  constructor() {
    this.maxRetries = 3;
    this.backoffMultiplier = 2;
    this.baseDelay = 1000;
  }
  
  async executeWithRetry(operation) {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === this.maxRetries) throw error;
        
        const delay = this.baseDelay * Math.pow(this.backoffMultiplier, attempt - 1);
        await this.sleep(delay);
      }
    }
  }
}
```

#### Error Classification
- **429 Rate Limit**: Fallback automatico provider
- **401 Unauthorized**: Errore API key
- **500 Server Error**: Retry con backoff
- **Network Error**: Retry con timeout incrementale

---

## 📄 Sistema di Gestione Documenti

### 1. Upload Pipeline

#### Frontend Processing
```javascript
class DocumentUploader {
  constructor() {
    this.allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
  }
  
  async uploadDocument(file) {
    // 1. Validazione client-side
    this.validateFile(file);
    
    // 2. Preparazione FormData
    const formData = new FormData();
    formData.append('document', file);
    
    // 3. Upload con progress tracking
    const response = await this.uploadWithProgress(formData);
    
    // 4. Aggiornamento UI
    this.updateDocumentList(response.data);
  }
}
```

#### Backend Processing
```python
class DocumentProcessor:
    def process_document(self, file):
        # 1. Validazione server-side
        self.validate_file(file)
        
        # 2. Generazione ID univoco
        doc_id = str(uuid.uuid4())
        
        # 3. Salvataggio temporaneo
        temp_path = self.save_temp_file(file, doc_id)
        
        # 4. Estrazione testo
        extracted_text = self.extract_text(temp_path, file.content_type)
        
        # 5. Cleanup e persistenza
        self.cleanup_temp_file(temp_path)
        self.save_transcript(doc_id, extracted_text, file.filename)
        
        return {
            'id': doc_id,
            'filename': file.filename,
            'text': extracted_text,
            'timestamp': datetime.now().isoformat()
        }
```

### 2. Text Extraction Engines

#### PDF Processing (PyPDF2)
```python
def extract_text_from_pdf(self, file_path):
    text = ""
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                text += page.extract_text() + "\n"
                
        return self.clean_text(text)
    except Exception as e:
        raise DocumentProcessingError(f"Errore PDF: {str(e)}")
```

#### DOCX Processing (python-docx)
```python
def extract_text_from_docx(self, file_path):
    try:
        doc = docx.Document(file_path)
        text = ""
        
        # Estrazione paragrafi
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
            
        # Estrazione tabelle
        for table in doc.tables:
            for row in table.rows:
                for cell in row.cells:
                    text += cell.text + " "
                text += "\n"
                
        return self.clean_text(text)
    except Exception as e:
        raise DocumentProcessingError(f"Errore DOCX: {str(e)}")
```

#### Text Cleaning
```python
def clean_text(self, text):
    # Rimozione caratteri di controllo
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x84\x86-\x9f]', '', text)
    
    # Normalizzazione spazi
    text = re.sub(r'\s+', ' ', text)
    
    # Rimozione righe vuote multiple
    text = re.sub(r'\n\s*\n', '\n\n', text)
    
    return text.strip()
```

---

## 💾 Database e Persistenza

### 1. LocalStorage Management

#### Data Structure
```javascript
const STORAGE_SCHEMA = {
  // Configurazioni admin
  adminConfig: {
    aiProvider: 'openai',
    temperature: 0.7,
    maxTokens: 1000,
    openaiKey: 'encrypted_key',
    perplexityKey: 'encrypted_key'
  },
  
  // Progetti salvati
  savedProjects: {
    'project_uuid': {
      name: 'Nome Progetto',
      timestamp: '2024-01-01T00:00:00Z',
      data: { /* business plan data */ }
    }
  },
  
  // Sessione corrente
  currentSession: {
    schema: 'smart',
    data: { /* current form data */ },
    lastSaved: '2024-01-01T00:00:00Z'
  }
};
```

#### Storage Manager
```javascript
class StorageManager {
  constructor() {
    this.prefix = 'theplanner_';
  }
  
  save(key, data) {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(this.prefix + key, serialized);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  }
  
  load(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Load error:', error);
      return defaultValue;
    }
  }
  
  clear(key) {
    localStorage.removeItem(this.prefix + key);
  }
  
  getStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
      if (key.startsWith(this.prefix)) {
        total += localStorage[key].length;
      }
    }
    return total;
  }
}
```

### 2. Document Database (JSON)

#### Schema Structure
```json
{
  "session_id": "uuid-v4",
  "created_at": "2024-01-01T00:00:00Z",
  "documents": [
    {
      "id": "doc-uuid",
      "filename": "business_plan.pdf",
      "original_size": 1024000,
      "extracted_text": "Testo estratto...",
      "upload_timestamp": "2024-01-01T00:00:00Z",
      "processing_time_ms": 1500,
      "metadata": {
        "pages": 10,
        "word_count": 2500,
        "language": "it"
      }
    }
  ]
}
```

#### Database Operations
```python
class DocumentDatabase:
    def __init__(self, db_file='transcribed_documents.json'):
        self.db_file = db_file
        self.data = self.load_database()
    
    def add_document(self, doc_data):
        self.data['documents'].append(doc_data)
        self.save_database()
    
    def get_document(self, doc_id):
        return next((doc for doc in self.data['documents'] if doc['id'] == doc_id), None)
    
    def delete_document(self, doc_id):
        self.data['documents'] = [doc for doc in self.data['documents'] if doc['id'] != doc_id]
        self.save_database()
    
    def cleanup_old_documents(self, max_age_days=7):
        cutoff_date = datetime.now() - timedelta(days=max_age_days)
        self.data['documents'] = [
            doc for doc in self.data['documents']
            if datetime.fromisoformat(doc['upload_timestamp']) > cutoff_date
        ]
        self.save_database()
```

---

## 🔒 Sicurezza e Autenticazione

### 1. API Key Management

#### Client-Side Security
```javascript
class SecureKeyManager {
  constructor() {
    this.keyPrefix = 'secure_';
  }
  
  // Semplice offuscamento (non crittografia reale)
  obfuscateKey(key) {
    return btoa(key.split('').reverse().join(''));
  }
  
  deobfuscateKey(obfuscatedKey) {
    return atob(obfuscatedKey).split('').reverse().join('');
  }
  
  storeKey(provider, key) {
    const obfuscated = this.obfuscateKey(key);
    localStorage.setItem(this.keyPrefix + provider, obfuscated);
  }
  
  getKey(provider) {
    const obfuscated = localStorage.getItem(this.keyPrefix + provider);
    return obfuscated ? this.deobfuscateKey(obfuscated) : null;
  }
}
```

#### Request Security
```javascript
class SecureAPIClient {
  constructor() {
    this.timeout = 30000; // 30 secondi
  }
  
  async makeSecureRequest(url, options) {
    // Aggiunta headers sicurezza
    const secureOptions = {
      ...options,
      headers: {
        ...options.headers,
        'X-Requested-With': 'XMLHttpRequest',
        'Cache-Control': 'no-cache'
      },
      // Timeout per prevenire hanging requests
      signal: AbortSignal.timeout(this.timeout)
    };
    
    try {
      const response = await fetch(url, secureOptions);
      
      // Validazione response
      if (!response.ok) {
        throw new APIError(response.status, response.statusText);
      }
      
      return await response.json();
    } catch (error) {
      // Log sicuro (senza esporre API keys)
      console.error('API Request failed:', {
        url: url.replace(/key=[^&]+/g, 'key=***'),
        status: error.status,
        message: error.message
      });
      throw error;
    }
  }
}
```

### 2. Input Validation e Sanitization

#### Frontend Validation
```javascript
class InputValidator {
  static validateBusinessPlanData(data) {
    const errors = [];
    
    // Validazione campi obbligatori
    if (!data.companyName || data.companyName.trim().length < 2) {
      errors.push('Nome azienda deve essere almeno 2 caratteri');
    }
    
    // Sanitizzazione HTML
    for (let key in data.sections) {
      data.sections[key] = this.sanitizeHTML(data.sections[key]);
    }
    
    // Validazione dati finanziari
    if (data.financialData) {
      data.financialData.forEach((year, index) => {
        if (year.revenue < 0) {
          errors.push(`Anno ${index + 1}: Ricavi non possono essere negativi`);
        }
      });
    }
    
    return { isValid: errors.length === 0, errors, sanitizedData: data };
  }
  
  static sanitizeHTML(input) {
    if (typeof input !== 'string') return input;
    
    // Rimozione tag HTML pericolosi
    return input
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }
}
```

#### Backend Validation
```python
class RequestValidator:
    @staticmethod
    def validate_file_upload(file):
        # Validazione tipo file
        allowed_types = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
        if file.content_type not in allowed_types:
            raise ValidationError(f"Tipo file non supportato: {file.content_type}")
        
        # Validazione dimensione
        max_size = 10 * 1024 * 1024  # 10MB
        if len(file.read()) > max_size:
            raise ValidationError("File troppo grande (max 10MB)")
        
        file.seek(0)  # Reset file pointer
        
        # Validazione nome file
        if not re.match(r'^[\w\-. ]+$', file.filename):
            raise ValidationError("Nome file contiene caratteri non validi")
    
    @staticmethod
    def sanitize_filename(filename):
        # Rimozione caratteri pericolosi
        safe_filename = re.sub(r'[^\w\-_. ]', '', filename)
        return safe_filename[:100]  # Limite lunghezza
```

---

## ⚡ Performance e Ottimizzazioni

### 1. Frontend Optimizations

#### Lazy Loading
```javascript
class LazyLoader {
  constructor() {
    this.loadedSections = new Set();
  }
  
  async loadSection(sectionId) {
    if (this.loadedSections.has(sectionId)) {
      return; // Già caricato
    }
    
    // Caricamento dinamico contenuto
    const sectionData = await this.fetchSectionData(sectionId);
    this.renderSection(sectionId, sectionData);
    this.loadedSections.add(sectionId);
  }
  
  // Intersection Observer per caricamento automatico
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.dataset.sectionId;
          this.loadSection(sectionId);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-section-id]').forEach(el => {
      observer.observe(el);
    });
  }
}
```

#### Debouncing e Throttling
```javascript
class PerformanceUtils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Utilizzo per auto-save
const debouncedSave = PerformanceUtils.debounce(
  () => businessPlan.saveProject(),
  2000
);

// Event listener ottimizzato
document.addEventListener('input', debouncedSave);
```

#### Memory Management
```javascript
class MemoryManager {
  constructor() {
    this.cache = new Map();
    this.maxCacheSize = 50;
  }
  
  set(key, value) {
    // LRU Cache implementation
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
  
  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }
  
  clear() {
    this.cache.clear();
  }
}
```

### 2. Backend Optimizations

#### Async Processing
```python
import asyncio
from concurrent.futures import ThreadPoolExecutor

class AsyncDocumentProcessor:
    def __init__(self):
        self.executor = ThreadPoolExecutor(max_workers=4)
    
    async def process_multiple_documents(self, files):
        loop = asyncio.get_event_loop()
        
        # Elaborazione parallela
        tasks = [
            loop.run_in_executor(
                self.executor,
                self.process_single_document,
                file
            )
            for file in files
        ]
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        return results
    
    def process_single_document(self, file):
        # Elaborazione CPU-intensive in thread separato
        return self.extract_text(file)
```

#### Caching Strategy
```python
from functools import lru_cache
import hashlib

class CachedProcessor:
    def __init__(self):
        self.file_cache = {}
    
    def get_file_hash(self, file_content):
        return hashlib.md5(file_content).hexdigest()
    
    @lru_cache(maxsize=100)
    def extract_text_cached(self, file_hash, file_type):
        # Cache basato su hash del file
        if file_hash in self.file_cache:
            return self.file_cache[file_hash]
        
        # Elaborazione solo se non in cache
        result = self.extract_text(file_type)
        self.file_cache[file_hash] = result
        return result
```

---

## 🧪 Testing e Debug

### 1. Frontend Testing

#### Unit Tests
```javascript
// Test utilities
class TestUtils {
  static createMockBusinessPlan() {
    return {
      companyName: 'Test Company',
      sections: {
        'executive-summary': 'Test summary'
      },
      financialData: [{
        year: 1,
        revenue: 100000,
        cogs: 30000,
        opex: 20000
      }]
    };
  }
  
  static mockAIResponse(content) {
    return {
      choices: [{
        message: {
          content: content
        }
      }]
    };
  }
}

// Test cases
describe('BusinessPlanGenerator', () => {
  let generator;
  
  beforeEach(() => {
    generator = new BusinessPlanGenerator();
    // Mock localStorage
    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn()
    };
  });
  
  test('should initialize with default schema', () => {
    expect(generator.currentSchema).toBe('smart');
  });
  
  test('should save project data', () => {
    const testData = TestUtils.createMockBusinessPlan();
    generator.data = testData;
    
    generator.saveProject();
    
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  
  test('should handle AI errors gracefully', async () => {
    // Mock fetch to return error
    global.fetch = jest.fn().mockRejectedValue(new Error('API Error'));
    
    const result = await generator.generateAIContent('test-section', 'test prompt');
    
    expect(result).toBeNull();
  });
});
```

#### Integration Tests
```javascript
describe('AI Integration', () => {
  test('should fallback to Perplexity on OpenAI 429', async () => {
    // Mock OpenAI 429 response
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: () => Promise.resolve({ error: 'Rate limit exceeded' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(TestUtils.mockAIResponse('Fallback response'))
      });
    
    const generator = new BusinessPlanGenerator();
    const result = await generator.generateAIContent('test-section', 'test prompt');
    
    expect(result).toBe('Fallback response');
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
```

### 2. Backend Testing

#### Unit Tests (pytest)
```python
import pytest
from unittest.mock import Mock, patch
from document_processor import DocumentProcessor

class TestDocumentProcessor:
    def setup_method(self):
        self.processor = DocumentProcessor()
    
    def test_extract_text_from_pdf(self):
        # Mock PyPDF2
        with patch('PyPDF2.PdfReader') as mock_reader:
            mock_page = Mock()
            mock_page.extract_text.return_value = "Test content"
            mock_reader.return_value.pages = [mock_page]
            
            result = self.processor.extract_text_from_pdf("test.pdf")
            
            assert "Test content" in result
    
    def test_file_validation(self):
        # Test file troppo grande
        large_file = Mock()
        large_file.content_length = 20 * 1024 * 1024  # 20MB
        
        with pytest.raises(ValidationError):
            self.processor.validate_file(large_file)
    
    @patch('requests.post')
    def test_api_endpoint(self, mock_post):
        # Test endpoint upload
        mock_response = Mock()
        mock_response.json.return_value = {'status': 'success'}
        mock_post.return_value = mock_response
        
        with self.app.test_client() as client:
            response = client.post('/upload', 
                                 data={'document': (io.BytesIO(b'test'), 'test.txt')})
            
            assert response.status_code == 200
```

### 3. Debug Tools

#### Frontend Debug Console
```javascript
class DebugConsole {
  constructor() {
    this.enabled = localStorage.getItem('debug_mode') === 'true';
    this.logs = [];
  }
  
  log(level, message, data = null) {
    if (!this.enabled) return;
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      stack: new Error().stack
    };
    
    this.logs.push(logEntry);
    console[level](message, data);
    
    // Invia a servizio di logging se configurato
    this.sendToLoggingService(logEntry);
  }
  
  exportLogs() {
    const blob = new Blob([JSON.stringify(this.logs, null, 2)], 
                         { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug_logs_${Date.now()}.json`;
    a.click();
  }
}

// Utilizzo globale
window.debugConsole = new DebugConsole();
```

#### Performance Monitor
```javascript
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
  }
  
  startTimer(name) {
    this.metrics.set(name, performance.now());
  }
  
  endTimer(name) {
    const startTime = this.metrics.get(name);
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`${name}: ${duration.toFixed(2)}ms`);
      return duration;
    }
  }
  
  measureFunction(fn, name) {
    return (...args) => {
      this.startTimer(name);
      const result = fn.apply(this, args);
      this.endTimer(name);
      return result;
    };
  }
  
  getMemoryUsage() {
    if (performance.memory) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      };
    }
    return null;
  }
}
```

---

## 🚀 Deployment e DevOps

### 1. Containerization (Docker)

#### Dockerfile
```dockerfile
# Multi-stage build
FROM python:3.9-slim as backend

WORKDIR /app

# Installazione dipendenze sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Installazione dipendenze Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia codice backend
COPY document_processor.py .
COPY temp_documents/ ./temp_documents/

# Frontend stage
FROM nginx:alpine as frontend

# Copia file statici
COPY index.html /usr/share/nginx/html/
COPY *.js /usr/share/nginx/html/
COPY *.css /usr/share/nginx/html/
COPY *.html /usr/share/nginx/html/
COPY *.png /usr/share/nginx/html/
COPY *.svg /usr/share/nginx/html/

# Configurazione Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
```

#### Docker Compose
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      target: frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - theplanner-network

  backend:
    build:
      context: .
      target: backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - FLASK_APP=document_processor.py
    volumes:
      - ./temp_documents:/app/temp_documents
      - ./transcribed_documents.json:/app/transcribed_documents.json
    networks:
      - theplanner-network
    command: python document_processor.py

networks:
  theplanner-network:
    driver: bridge

volumes:
  documents_data:
```

### 2. CI/CD Pipeline (GitHub Actions)

#### Workflow Configuration
```yaml
name: Deploy ThePlanner

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v3
      with:
        python-version: '3.9'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
        pip install pytest pytest-cov
    
    - name: Run tests
      run: |
        pytest tests/ --cov=. --cov-report=xml
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml

  deploy-netlify:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

  deploy-heroku:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: "theplanner-app"
        heroku_email: "your-email@example.com"
```

### 3. Environment Configuration

#### Production Settings
```python
# config.py
import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER') or 'temp_documents'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    
class DevelopmentConfig(Config):
    DEBUG = True
    FLASK_ENV = 'development'
    
class ProductionConfig(Config):
    DEBUG = False
    FLASK_ENV = 'production'
    # Configurazioni sicurezza produzione
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    PERMANENT_SESSION_LIFETIME = timedelta(hours=1)
    
class TestingConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
```

#### Environment Variables
```bash
# .env.example
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
UPLOAD_FOLDER=/app/temp_documents
MAX_WORKERS=4
CACHE_TIMEOUT=3600
LOG_LEVEL=INFO

# Per deployment
NETLIFY_AUTH_TOKEN=your-netlify-token
NETLIFY_SITE_ID=your-site-id
HEROKU_API_KEY=your-heroku-key
```

---

## 📡 API Reference

### 1. Document Processing API

#### POST /upload
**Descrizione**: Upload e trascrizione documento

**Request**:
```http
POST /upload HTTP/1.1
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="document"; filename="business_plan.pdf"
Content-Type: application/pdf

[binary data]
--boundary--
```

**Response Success (200)**:
```json
{
  "status": "success",
  "data": {
    "id": "doc-uuid-here",
    "filename": "business_plan.pdf",
    "text": "Testo estratto dal documento...",
    "metadata": {
      "pages": 10,
      "word_count": 2500,
      "processing_time_ms": 1500
    },
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

**Response Error (400)**:
```json
{
  "status": "error",
  "message": "Tipo file non supportato",
  "code": "INVALID_FILE_TYPE"
}
```

#### GET /documents
**Descrizione**: Lista documenti trascritti

**Response (200)**:
```json
{
  "status": "success",
  "data": {
    "session_id": "session-uuid",
    "documents": [
      {
        "id": "doc-uuid-1",
        "filename": "document1.pdf",
        "upload_timestamp": "2024-01-01T12:00:00Z",
        "word_count": 1500
      }
    ],
    "total_count": 1
  }
}
```

#### DELETE /documents/{doc_id}
**Descrizione**: Elimina documento

**Response (200)**:
```json
{
  "status": "success",
  "message": "Documento eliminato con successo"
}
```

### 2. AI Provider APIs

#### OpenAI Integration
```javascript
const openaiRequest = {
  method: 'POST',
  url: 'https://api.openai.com/v1/chat/completions',
  headers: {
    'Authorization': 'Bearer sk-...',
    'Content-Type': 'application/json'
  },
  body: {
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Sei un consulente esperto in business plan...'
      },
      {
        role: 'user',
        content: 'Genera un executive summary per...'
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  }
};
```

#### Perplexity Integration
```javascript
const perplexityRequest = {
  method: 'POST',
  url: 'https://api.perplexity.ai/chat/completions',
  headers: {
    'Authorization': 'Bearer pplx-...',
    'Content-Type': 'application/json'
  },
  body: {
    model: 'llama-3.1-sonar-small-128k-online',
    messages: [
      {
        role: 'system',
        content: 'Sei un consulente esperto in business plan...'
      },
      {
        role: 'user',
        content: 'Genera un executive summary per...'
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  }
};
```

---

## 🔧 Troubleshooting Avanzato

### 1. Problemi Comuni e Soluzioni

#### Errori AI

**Problema**: Errore 429 (Rate Limit)
```
Error: 429 - Budget OpenAI esaurito o limite richieste superato
```

**Diagnosi**:
1. Verifica crediti OpenAI nel monitor
2. Controlla rate limits API
3. Verifica configurazione API key

**Soluzioni**:
1. Attendi reset rate limit
2. Aggiungi crediti account OpenAI
3. Sistema passa automaticamente a Perplexity
4. Configura API key Perplexity come backup

**Problema**: Errore 401 (Unauthorized)
```
Error: 401 - Invalid API key
```

**Diagnosi**:
1. API key non configurata
2. API key non valida
3. API key scaduta

**Soluzioni**:
1. Configura API key nel pannello Admin
2. Verifica validità API key
3. Rigenera API key se necessario

#### Errori Document Processing

**Problema**: Server Python non risponde
```
Fetch error: Failed to fetch
```

**Diagnosi**:
1. Server document_processor.py non avviato
2. Porta 5000 occupata
3. Errore CORS

**Soluzioni**:
```bash
# Verifica processo
ps aux | grep python

# Verifica porta
netstat -tulpn | grep :5000

# Riavvia server
python document_processor.py

# Cambia porta se necessario
FLASK_RUN_PORT=5001 python document_processor.py
```

**Problema**: Errore estrazione PDF
```
PyPDF2.errors.PdfReadError: EOF marker not found
```

**Diagnosi**:
1. File PDF corrotto
2. PDF protetto da password
3. PDF con encoding non standard

**Soluzioni**:
1. Verifica integrità file PDF
2. Rimuovi protezione password
3. Converti PDF in formato standard

### 2. Debug Tools

#### Console Debug Commands
```javascript
// Abilita debug mode
localStorage.setItem('debug_mode', 'true');
location.reload();

// Verifica stato applicazione
console.log('Current data:', businessPlan.data);
console.log('AI Provider:', businessPlan.aiProvider);
console.log('Storage usage:', businessPlan.storage.getStorageUsage());

// Test AI connection
businessPlan.testAIConnection('openai').then(result => {
  console.log('OpenAI test:', result);
});

// Esporta logs
window.debugConsole.exportLogs();

// Reset completo
localStorage.clear();
location.reload();
```

#### Network Debugging
```javascript
// Monitor richieste AI
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('Fetch request:', args[0]);
  return originalFetch.apply(this, args)
    .then(response => {
      console.log('Fetch response:', response.status, response.statusText);
      return response;
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
};
```

### 3. Performance Diagnostics

#### Memory Leaks Detection
```javascript
class MemoryLeakDetector {
  constructor() {
    this.baseline = null;
    this.samples = [];
  }
  
  takeBaseline() {
    if (performance.memory) {
      this.baseline = performance.memory.usedJSHeapSize;
      console.log('Memory baseline:', this.baseline);
    }
  }
  
  checkMemoryGrowth() {
    if (performance.memory && this.baseline) {
      const current = performance.memory.usedJSHeapSize;
      const growth = current - this.baseline;
      
      this.samples.push({
        timestamp: Date.now(),
        memory: current,
        growth: growth
      });
      
      console.log(`Memory growth: ${(growth / 1024 / 1024).toFixed(2)}MB`);
      
      // Alert se crescita eccessiva
      if (growth > 50 * 1024 * 1024) { // 50MB
        console.warn('Possible memory leak detected!');
      }
    }
  }
  
  generateReport() {
    return {
      baseline: this.baseline,
      samples: this.samples,
      averageGrowth: this.samples.reduce((sum, s) => sum + s.growth, 0) / this.samples.length
    };
  }
}

// Utilizzo
const memoryDetector = new MemoryLeakDetector();
memoryDetector.takeBaseline();
setInterval(() => memoryDetector.checkMemoryGrowth(), 30000);
```

#### Performance Profiling
```javascript
class PerformanceProfiler {
  constructor() {
    this.profiles = new Map();
  }
  
  startProfile(name) {
    this.profiles.set(name, {
      start: performance.now(),
      marks: []
    });
  }
  
  mark(profileName, markName) {
    const profile = this.profiles.get(profileName);
    if (profile) {
      profile.marks.push({
        name: markName,
        time: performance.now() - profile.start
      });
    }
  }
  
  endProfile(name) {
    const profile = this.profiles.get(name);
    if (profile) {
      const totalTime = performance.now() - profile.start;
      console.log(`Profile ${name}:`, {
        totalTime: totalTime.toFixed(2) + 'ms',
        marks: profile.marks
      });
      this.profiles.delete(name);
      return totalTime;
    }
  }
}

// Utilizzo per profilare generazione AI
const profiler = new PerformanceProfiler();
profiler.startProfile('ai-generation');
// ... chiamata AI ...
profiler.mark('ai-generation', 'request-sent');
// ... risposta ricevuta ...
profiler.mark('ai-generation', 'response-received');
// ... rendering completato ...
profiler.endProfile('ai-generation');
```

---

## 📈 Metriche e Monitoring

### 1. Application Metrics

```javascript
class ApplicationMetrics {
  constructor() {
    this.metrics = {
      pageViews: 0,
      aiRequests: 0,
      documentsProcessed: 0,
      errorsCount: 0,
      averageResponseTime: 0,
      userSessions: 0
    };
    
    this.startTime = Date.now();
    this.responseTimes = [];
  }
  
  incrementMetric(name, value = 1) {
    if (this.metrics.hasOwnProperty(name)) {
      this.metrics[name] += value;
    }
  }
  
  recordResponseTime(time) {
    this.responseTimes.push(time);
    this.metrics.averageResponseTime = 
      this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length;
  }
  
  getUptime() {
    return Date.now() - this.startTime;
  }
  
  generateReport() {
    return {
      ...this.metrics,
      uptime: this.getUptime(),
      timestamp: new Date().toISOString()
    };
  }
}

// Utilizzo globale
window.appMetrics = new ApplicationMetrics();
```

### 2. Error Tracking

```javascript
class ErrorTracker {
  constructor() {
    this.errors = [];
    this.setupGlobalErrorHandling();
  }
  
  setupGlobalErrorHandling() {
    window.addEventListener('error', (event) => {
      this.logError({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack
      });
    });
  }
  
  logError(errorInfo) {
    const errorEntry = {
      ...errorInfo,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    this.errors.push(errorEntry);
    
    // Invia a servizio di monitoring se configurato
    this.sendToMonitoring(errorEntry);
  }
  
  getErrorReport() {
    return {
      totalErrors: this.errors.length,
      recentErrors: this.errors.slice(-10),
      errorsByType: this.groupErrorsByType()
    };
  }
}
```

---

## 🔄 Estensioni e Personalizzazioni

### 1. Plugin System

```javascript
class PluginManager {
  constructor() {
    this.plugins = new Map();
    this.hooks = new Map();
  }
  
  registerPlugin(name, plugin) {
    this.plugins.set(name, plugin);
    if (plugin.hooks) {
      plugin.hooks.forEach(hook => {
        if (!this.hooks.has(hook.name)) {
          this.hooks.set(hook.name, []);
        }
        this.hooks.get(hook.name).push(hook.callback);
      });
    }
  }
  
  executeHook(hookName, data) {
    const callbacks = this.hooks.get(hookName) || [];
    return callbacks.reduce((result, callback) => {
      return callback(result);
    }, data);
  }
}
```

### 2. Custom AI Providers

```javascript
class CustomAIProvider {
  constructor(config) {
    this.name = config.name;
    this.endpoint = config.endpoint;
    this.headers = config.headers;
    this.requestTransformer = config.requestTransformer;
    this.responseTransformer = config.responseTransformer;
  }
  
  async generateContent(prompt) {
    const request = this.requestTransformer(prompt);
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(request)
    });
    
    const data = await response.json();
    return this.responseTransformer(data);
  }
}
```

---

## 📊 Analytics e Reporting

### 1. Usage Analytics

```javascript
class UsageAnalytics {
  constructor() {
    this.events = [];
    this.sessionStart = Date.now();
  }
  
  trackEvent(category, action, label, value) {
    this.events.push({
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
      sessionTime: Date.now() - this.sessionStart
    });
  }
  
  generateUsageReport() {
    return {
      totalEvents: this.events.length,
      sessionDuration: Date.now() - this.sessionStart,
      topActions: this.getTopActions(),
      userFlow: this.getUserFlow()
    };
  }
}
```

---

## 🔐 Security Best Practices

### 1. Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.openai.com https://api.perplexity.ai;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
">
```

### 2. Input Sanitization

```javascript
class SecurityUtils {
  static sanitizeInput(input) {
    return input
      .replace(/[<>"'&]/g, (match) => {
        const entities = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return entities[match];
      });
  }
  
  static validateAPIKey(key) {
    const patterns = {
      openai: /^sk-[a-zA-Z0-9]{48}$/,
      perplexity: /^pplx-[a-zA-Z0-9]{32}$/
    };
    
    for (let [provider, pattern] of Object.entries(patterns)) {
      if (pattern.test(key)) {
        return { valid: true, provider };
      }
    }
    
    return { valid: false, provider: null };
  }
}
```

---

## 🌐 Internazionalizzazione (i18n)

### 1. Language System

```javascript
class I18nManager {
  constructor() {
    this.currentLanguage = 'it';
    this.translations = new Map();
    this.loadTranslations();
  }
  
  loadTranslations() {
    this.translations.set('it', {
      'app.title': 'ThePlanner',
      'section.executive-summary': 'Executive Summary',
      'button.generate': 'Genera con AI',
      'error.ai-failed': 'Errore nella generazione AI'
    });
    
    this.translations.set('en', {
      'app.title': 'ThePlanner',
      'section.executive-summary': 'Executive Summary',
      'button.generate': 'Generate with AI',
      'error.ai-failed': 'AI generation failed'
    });
  }
  
  t(key, params = {}) {
    const translation = this.translations.get(this.currentLanguage)?.get(key) || key;
    return this.interpolate(translation, params);
  }
  
  interpolate(text, params) {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] || match;
    });
  }
}
```

---

## 📱 Mobile Optimization

### 1. Responsive Design

```css
/* Mobile-first approach */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
  
  .sidebar {
    order: 2;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .content-area {
    order: 1;
    padding: 1rem;
  }
  
  .section-card {
    margin-bottom: 1rem;
  }
  
  .ai-controls {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  }
}

/* Touch-friendly buttons */
@media (pointer: coarse) {
  button {
    min-height: 44px;
    min-width: 44px;
  }
  
  .form-control {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}
```

### 2. Touch Interactions

```javascript
class TouchHandler {
  constructor() {
    this.setupTouchEvents();
  }
  
  setupTouchEvents() {
    // Swipe gestures for section navigation
    let startX, startY;
    
    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
      if (!startX || !startY) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = startY - endY;
      
      // Horizontal swipe
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.navigateNext();
        } else {
          this.navigatePrevious();
        }
      }
    });
  }
}
```

---

## 🔧 Maintenance e Updates

### 1. Version Management

```javascript
class VersionManager {
  constructor() {
    this.currentVersion = '1.0.0';
    this.checkForUpdates();
  }
  
  async checkForUpdates() {
    try {
      const response = await fetch('/api/version');
      const { version, updateAvailable } = await response.json();
      
      if (updateAvailable) {
        this.showUpdateNotification(version);
      }
    } catch (error) {
      console.error('Update check failed:', error);
    }
  }
  
  showUpdateNotification(newVersion) {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
      <p>Nuova versione disponibile: ${newVersion}</p>
      <button onclick="location.reload()">Aggiorna</button>
      <button onclick="this.parentElement.remove()">Ignora</button>
    `;
    document.body.appendChild(notification);
  }
}
```

### 2. Data Migration

```javascript
class DataMigrator {
  constructor() {
    this.migrations = [
      { version: '1.1.0', migrate: this.migrateToV1_1_0 },
      { version: '1.2.0', migrate: this.migrateToV1_2_0 }
    ];
  }
  
  async runMigrations() {
    const currentVersion = localStorage.getItem('app_version') || '1.0.0';
    
    for (let migration of this.migrations) {
      if (this.isVersionNewer(migration.version, currentVersion)) {
        await migration.migrate();
        localStorage.setItem('app_version', migration.version);
      }
    }
  }
  
  migrateToV1_1_0() {
    // Migrazione dati per versione 1.1.0
    const oldData = localStorage.getItem('business_plan_data');
    if (oldData) {
      const parsed = JSON.parse(oldData);
      // Trasformazioni necessarie
      localStorage.setItem('theplanner_current_session', JSON.stringify(parsed));
    }
  }
}
```

---

## 📋 Conclusioni

Questa documentazione tecnica fornisce una panoramica completa di tutti gli aspetti del sistema ThePlanner, dall'architettura di base alle funzionalità avanzate. Il sistema è progettato per essere:

- **Modulare**: Ogni componente ha responsabilità specifiche
- **Scalabile**: Architettura pronta per crescita
- **Sicuro**: Best practices di sicurezza implementate
- **Performante**: Ottimizzazioni per velocità e efficienza
- **Manutenibile**: Codice ben strutturato e documentato
- **Estensibile**: Sistema di plugin per personalizzazioni

### Prossimi Sviluppi

1. **Integrazione Database**: Migrazione da localStorage a database persistente
2. **Autenticazione Utenti**: Sistema di login e gestione utenti
3. **Collaborazione**: Funzionalità di condivisione e editing collaborativo
4. **API Pubbliche**: Esposizione API per integrazioni esterne
5. **Mobile App**: Sviluppo app nativa per iOS/Android
6. **AI Avanzata**: Integrazione modelli AI specializzati per business planning

### Supporto e Contributi

Per supporto tecnico, bug reports o contributi al progetto:

- **Issues**: Utilizza il sistema di issue tracking del repository
- **Pull Requests**: Contributi benvenuti seguendo le linee guida
- **Documentazione**: Mantieni aggiornata questa documentazione
- **Testing**: Aggiungi test per nuove funzionalità

---

*Documentazione aggiornata al: 2024*  
*Versione: 1.0.0*  
*Autore: ThePlanner Development Team*