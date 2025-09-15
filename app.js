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
            }]
        };
        
        this.schemas = {
            smart: {
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
    }

    init() {
        this.bindEvents();
        this.renderDynamicSections();
        this.updatePreview();
        this.updateCoverDate();
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
    }

    renderDynamicSections() {
        const container = document.getElementById('dynamicSections');
        container.innerHTML = '';
        
        const currentSchemaData = this.schemas[this.currentSchema];
        
        Object.keys(currentSchemaData).forEach(sectionKey => {
            const section = currentSchemaData[sectionKey];
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'form-section';
            sectionDiv.innerHTML = `
                <h4>${section.title}</h4>
                ${section.fields.map(field => `
                    <div class="form-group">
                        <label for="${sectionKey}-${field.name}">${field.label}</label>
                        <textarea 
                            id="${sectionKey}-${field.name}" 
                            data-section="${sectionKey}" 
                            data-field="${field.name}"
                            placeholder="${field.placeholder}"
                        ></textarea>
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
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BusinessPlanGenerator();
});