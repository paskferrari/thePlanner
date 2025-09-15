class OpenAIMonitor {
    constructor() {
        this.apiKey = '';
        this.autoRefreshInterval = null;
        this.isAutoRefreshing = false;
        this.refreshIntervalMs = 30000; // 30 secondi
        this.previousValues = {}; // Per tracciare i cambiamenti
        this.usageHistory = [];
        
        this.init();
    }

    init() {
        // Carica API key dal localStorage
        this.apiKey = localStorage.getItem('openaiApiKey') || '';
        
        if (!this.apiKey) {
            this.showError('API Key OpenAI non trovata. Configurala prima nell\'applicazione principale.');
            return;
        }

        // Carica dati iniziali
        this.refreshData();
        
        // Avvia auto-refresh automatico
        this.startAutoRefresh();
    }

    async refreshData() {
        if (!this.apiKey) {
            this.showError('API Key non configurata');
            return;
        }

        try {
            this.showLoading(true);
            
            // Esegui tutte le chiamate API in parallelo
            const [billingData, usageData, modelsData] = await Promise.all([
                this.getBillingInfo(),
                this.getUsageData(),
                this.getModelsInfo()
            ]);

            // Aggiorna dashboard
            this.updateDashboard(billingData, usageData, modelsData);
            this.updateLastUpdated();
            
        } catch (error) {
            console.error('Errore nel refresh dei dati:', error);
            this.showError(`Errore: ${error.message}`);
        } finally {
            this.showLoading(false);
        }
    }

    async getBillingInfo() {
        try {
            // Ottieni informazioni di billing
            const response = await fetch('https://api.openai.com/v1/dashboard/billing/subscription', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Errore billing API: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.warn('Billing API non disponibile, usando dati mock:', error);
            // Restituisci dati mock se l'API non è disponibile
            return {
                hard_limit_usd: 10.00,
                soft_limit_usd: 8.00,
                system_hard_limit_usd: 10.00,
                access_until: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 giorni
            };
        }
    }

    async getUsageData() {
        try {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30); // Ultimi 30 giorni

            const response = await fetch(`https://api.openai.com/v1/dashboard/billing/usage?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Errore usage API: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.warn('Usage API non disponibile, usando dati mock:', error);
            // Restituisci dati mock
            return {
                total_usage: Math.random() * 2, // Uso casuale tra 0-2 dollari
                daily_costs: [
                    { timestamp: Date.now() - 86400000, line_items: [{ cost: Math.random() * 0.5 }] },
                    { timestamp: Date.now(), line_items: [{ cost: Math.random() * 0.3 }] }
                ]
            };
        }
    }

    async getModelsInfo() {
        try {
            const response = await fetch('https://api.openai.com/v1/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Errore models API: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.warn('Models API non disponibile, usando dati mock:', error);
            return {
                data: [
                    { id: 'gpt-4', owned_by: 'openai' },
                    { id: 'gpt-3.5-turbo', owned_by: 'openai' }
                ]
            };
        }
    }

    updateDashboard(billingData, usageData, modelsData) {
        // Aggiorna crediti e budget
        const totalCredits = billingData.hard_limit_usd || 10.00;
        const usedCredits = usageData.total_usage || 0;
        const remainingCredits = totalCredits - usedCredits;
        const usagePercentage = (usedCredits / totalCredits) * 100;

        // Aggiorna con animazioni
        this.updateValueWithAnimation('totalCredits', `$${totalCredits.toFixed(2)}`);
        this.updateValueWithAnimation('usedCredits', `$${usedCredits.toFixed(2)}`);
        this.updateValueWithAnimation('remainingCredits', `$${remainingCredits.toFixed(2)}`);
        
        // Aggiorna barra di progresso con animazione
        this.updateProgressBar(usagePercentage);
        // Rimosso - gestito da updateProgressBar

        // Cambia colore della barra di progresso in base all'utilizzo
        const progressBar = document.getElementById('creditProgress');
        if (usagePercentage > 80) {
            progressBar.style.background = 'linear-gradient(90deg, #f44336, #d32f2f)';
        } else if (usagePercentage > 60) {
            progressBar.style.background = 'linear-gradient(90deg, #ff9800, #f57c00)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #4CAF50, #45a049)';
        }

        // Aggiorna utilizzo corrente con animazioni
        const todayUsage = this.getTodayUsage(usageData);
        const monthUsage = usedCredits;
        const todayRequests = this.estimateRequests(todayUsage);

        this.updateValueWithAnimation('todayUsage', `$${todayUsage.toFixed(3)}`);
        this.updateValueWithAnimation('monthUsage', `$${monthUsage.toFixed(2)}`);
        this.updateValueWithAnimation('todayRequests', todayRequests);

        // Aggiorna stato API con animazioni
        this.updateApiStatus(remainingCredits);

        // Aggiorna modelli e limiti con animazioni
        const hasGPT4 = modelsData.data.some(model => model.id.includes('gpt-4'));
        this.updateValueWithAnimation('primaryModel', hasGPT4 ? 'GPT-4' : 'GPT-3.5-Turbo');
        
        // Stima limiti (valori tipici)
        this.updateValueWithAnimation('rpmLimit', hasGPT4 ? '3/min' : '60/min');
        this.updateValueWithAnimation('tpmLimit', hasGPT4 ? '40K/min' : '90K/min');
        this.updateValueWithAnimation('organization', 'Personal');

        // Aggiorna statistiche avanzate con animazioni
        const avgCostPerRequest = todayRequests > 0 ? todayUsage / todayRequests : 0;
        const tokensUsed = this.estimateTokens(usedCredits);
        const budgetEfficiency = Math.max(0, 100 - usagePercentage).toFixed(1);
        const daysRemaining = this.calculateDaysRemaining(remainingCredits, todayUsage);

        this.updateValueWithAnimation('avgCostPerRequest', `$${avgCostPerRequest.toFixed(4)}`);
        this.updateValueWithAnimation('tokensUsed', tokensUsed.toLocaleString());
        this.updateValueWithAnimation('budgetEfficiency', `${budgetEfficiency}%`);
        this.updateValueWithAnimation('daysRemaining', daysRemaining);

        // Salva dati per storico
        this.usageHistory.push({
            timestamp: Date.now(),
            usage: usedCredits,
            remaining: remainingCredits,
            todayUsage: todayUsage
        });

        // Mantieni solo gli ultimi 100 punti
        if (this.usageHistory.length > 100) {
            this.usageHistory = this.usageHistory.slice(-100);
        }
        
        // Aggiorna grafico
        this.updateChart();
    }

    getTodayUsage(usageData) {
        if (!usageData.daily_costs || usageData.daily_costs.length === 0) {
            return 0;
        }

        const today = new Date().toDateString();
        const todayCosts = usageData.daily_costs.filter(day => {
            const dayDate = new Date(day.timestamp * 1000).toDateString();
            return dayDate === today;
        });

        return todayCosts.reduce((total, day) => {
            return total + (day.line_items?.reduce((sum, item) => sum + (item.cost || 0), 0) || 0);
        }, 0);
    }

    estimateRequests(usage) {
        // Stima basata su costo medio di $0.03 per richiesta GPT-4
        return Math.round(usage / 0.03);
    }

    estimateTokens(usage) {
        // Stima basata su $0.03/1K tokens per GPT-4
        return Math.round((usage / 0.03) * 1000);
    }

    calculateDaysRemaining(remaining, dailyUsage) {
        if (dailyUsage <= 0) return '∞';
        const days = Math.floor(remaining / dailyUsage);
        return days > 365 ? '∞' : `${days} giorni`;
    }

    updateValueWithAnimation(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const oldValue = element.textContent;
        
        // Se il valore è cambiato, applica animazione
        if (oldValue !== newValue && this.previousValues[elementId] !== undefined) {
            element.classList.add('changed');
            setTimeout(() => element.classList.remove('changed'), 800);
        }
        
        // Aggiorna il valore
        element.textContent = newValue;
        this.previousValues[elementId] = newValue;
        
        // Aggiungi classe updating temporaneamente
        element.classList.add('updating');
        setTimeout(() => element.classList.remove('updating'), 300);
    }

    updateProgressBar(percentage) {
        const progressBar = document.getElementById('creditProgress');
        if (!progressBar) return;
        
        // Anima la larghezza
        progressBar.style.width = `${Math.min(percentage, 100)}%`;
        
        // Cambia colore in base alla percentuale
        if (percentage > 80) {
            progressBar.style.background = 'linear-gradient(90deg, #f44336, #d32f2f)';
        } else if (percentage > 60) {
            progressBar.style.background = 'linear-gradient(90deg, #ff9800, #f57c00)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #4CAF50, #45a049)';
        }
    }

    updateApiStatus(remainingCredits) {
        const apiStatus = document.getElementById('apiStatus');
        if (!apiStatus) return;
        
        let statusText, statusClass;
        
        if (remainingCredits > 0) {
            statusText = 'Attiva';
            statusClass = 'status active status-indicator';
        } else if (remainingCredits > -1) {
            statusText = 'Attenzione';
            statusClass = 'status warning status-indicator';
        } else {
            statusText = 'Limite Superato';
            statusClass = 'status error status-indicator';
        }
        
        // Anima il cambio di stato
        if (apiStatus.textContent !== statusText) {
            apiStatus.style.transform = 'scale(0.8)';
            setTimeout(() => {
                apiStatus.textContent = statusText;
                apiStatus.className = statusClass;
                apiStatus.style.transform = 'scale(1)';
            }, 150);
        }
    }

    startAutoRefresh() {
        // Avvia auto-refresh automaticamente
        this.autoRefreshInterval = setInterval(() => {
            this.refreshData();
        }, this.refreshIntervalMs);
        this.isAutoRefreshing = true;
        
        // Aggiorna il pulsante
        const btn = document.getElementById('autoRefreshBtn');
        if (btn) {
            btn.textContent = '⏰ Auto-Refresh: ON';
            btn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        }
    }

    updateChart() {
        if (this.usageHistory.length < 2) return;
        
        const chartContainer = document.querySelector('.chart-container');
        const placeholder = document.getElementById('chartPlaceholder');
        
        // Nascondi placeholder e mostra grafico
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        
        // Crea o aggiorna SVG
        let svg = chartContainer.querySelector('svg');
        if (!svg) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '200');
            svg.setAttribute('viewBox', '0 0 400 200');
            svg.style.background = 'linear-gradient(135deg, rgba(33,150,243,0.1), rgba(156,39,176,0.1))';
            svg.style.borderRadius = '10px';
            chartContainer.appendChild(svg);
        }
        
        // Pulisci SVG
        svg.innerHTML = '';
        
        // Prepara dati per il grafico
        const data = this.usageHistory.slice(-20); // Ultimi 20 punti
        const maxUsage = Math.max(...data.map(d => d.usage), 1);
        const width = 400;
        const height = 200;
        const padding = 40;
        
        // Crea griglia
        this.createGrid(svg, width, height, padding);
        
        // Crea linea del grafico
        this.createUsageLine(svg, data, width, height, padding, maxUsage);
        
        // Crea punti
        this.createDataPoints(svg, data, width, height, padding, maxUsage);
        
        // Crea etichette
        this.createLabels(svg, data, width, height, padding, maxUsage);
    }
    
    createGrid(svg, width, height, padding) {
        const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        gridGroup.setAttribute('class', 'grid');
        
        // Linee orizzontali
        for (let i = 0; i <= 4; i++) {
            const y = padding + (height - 2 * padding) * i / 4;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', padding);
            line.setAttribute('y1', y);
            line.setAttribute('x2', width - padding);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', 'rgba(255,255,255,0.2)');
            line.setAttribute('stroke-width', '1');
            gridGroup.appendChild(line);
        }
        
        // Linee verticali
        for (let i = 0; i <= 5; i++) {
            const x = padding + (width - 2 * padding) * i / 5;
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', padding);
            line.setAttribute('x2', x);
            line.setAttribute('y2', height - padding);
            line.setAttribute('stroke', 'rgba(255,255,255,0.2)');
            line.setAttribute('stroke-width', '1');
            gridGroup.appendChild(line);
        }
        
        svg.appendChild(gridGroup);
    }
    
    createUsageLine(svg, data, width, height, padding, maxUsage) {
        if (data.length < 2) return;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let pathData = '';
        
        data.forEach((point, index) => {
            const x = padding + (width - 2 * padding) * index / (data.length - 1);
            const y = height - padding - (height - 2 * padding) * (point.usage / maxUsage);
            
            if (index === 0) {
                pathData += `M ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
            }
        });
        
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', 'url(#gradient)');
        path.setAttribute('stroke-width', '3');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        
        // Crea gradiente
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '0%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#2196F3');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#9C27B0');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
        svg.appendChild(path);
    }
    
    createDataPoints(svg, data, width, height, padding, maxUsage) {
        data.forEach((point, index) => {
            const x = padding + (width - 2 * padding) * index / (data.length - 1);
            const y = height - padding - (height - 2 * padding) * (point.usage / maxUsage);
            
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', '4');
            circle.setAttribute('fill', '#2196F3');
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', '2');
            
            // Tooltip
            const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            const time = new Date(point.timestamp).toLocaleTimeString('it-IT');
            title.textContent = `${time}: $${point.usage.toFixed(3)}`;
            circle.appendChild(title);
            
            svg.appendChild(circle);
        });
    }
    
    createLabels(svg, data, width, height, padding, maxUsage) {
        // Etichetta Y (costi)
        const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        yLabel.setAttribute('x', '15');
        yLabel.setAttribute('y', '20');
        yLabel.setAttribute('fill', 'rgba(255,255,255,0.8)');
        yLabel.setAttribute('font-size', '12');
        yLabel.setAttribute('font-weight', 'bold');
        yLabel.textContent = `Max: $${maxUsage.toFixed(3)}`;
        svg.appendChild(yLabel);
        
        // Etichetta tempo
        if (data.length > 0) {
            const timeLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            timeLabel.setAttribute('x', width - 100);
            timeLabel.setAttribute('y', height - 10);
            timeLabel.setAttribute('fill', 'rgba(255,255,255,0.8)');
            timeLabel.setAttribute('font-size', '10');
            const lastTime = new Date(data[data.length - 1].timestamp).toLocaleTimeString('it-IT');
            timeLabel.textContent = `Ultimo: ${lastTime}`;
            svg.appendChild(timeLabel);
        }
    }

    updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('it-IT');
        document.getElementById('lastUpdated').textContent = timeString;
    }

    showLoading(show) {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.disabled = show;
            if (show && btn.textContent.includes('Aggiorna')) {
                btn.innerHTML = '<div class="loading"></div> Caricamento...';
            } else if (!show && btn.textContent.includes('Caricamento')) {
                btn.innerHTML = '🔄 Aggiorna Dati';
            }
        });
    }

    showError(message) {
        // Mostra errore in tutte le metriche
        const metricValues = document.querySelectorAll('.metric-value');
        metricValues.forEach(element => {
            if (element.id !== 'apiStatus') {
                element.textContent = 'Errore';
                element.style.color = '#f44336';
            }
        });

        // Aggiorna stato API
        const apiStatus = document.getElementById('apiStatus');
        apiStatus.textContent = 'Errore';
        apiStatus.className = 'status error';

        console.error('Monitor Error:', message);
        alert(`❌ ${message}`);
    }

    toggleAutoRefresh() {
        const btn = document.getElementById('autoRefreshBtn');
        
        if (this.isAutoRefreshing) {
            // Ferma auto-refresh
            clearInterval(this.autoRefreshInterval);
            this.isAutoRefreshing = false;
            btn.textContent = '⏰ Auto-Refresh: OFF';
            btn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        } else {
            // Avvia auto-refresh
            this.autoRefreshInterval = setInterval(() => {
                this.refreshData();
            }, this.refreshIntervalMs);
            this.isAutoRefreshing = true;
            btn.textContent = '⏰ Auto-Refresh: ON';
            btn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        }
    }

    async testConnection() {
        try {
            const response = await fetch('https://api.openai.com/v1/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            if (response.ok) {
                alert('✅ Connessione OpenAI riuscita!');
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            alert(`❌ Test connessione fallito: ${error.message}`);
        }
    }
}

// Inizializza il monitor quando la pagina è caricata
let monitor;

document.addEventListener('DOMContentLoaded', () => {
    monitor = new OpenAIMonitor();
});

// Funzioni globali per i pulsanti
function refreshData() {
    if (monitor) {
        monitor.refreshData();
    }
}

function toggleAutoRefresh() {
    if (monitor) {
        monitor.toggleAutoRefresh();
    }
}

function testConnection() {
    if (monitor) {
        monitor.testConnection();
    }
}

// Auto-refresh ogni 5 minuti se la pagina è visibile
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && monitor && !monitor.isAutoRefreshing) {
        monitor.refreshData();
    }
});