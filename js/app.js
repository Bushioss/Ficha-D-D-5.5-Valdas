// Main Application Controller
const App = {
    character: {
        name: '',
        race: null,
        primaryClass: null,
        classLevels: {},
        subclasses: {},
        abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        alignment: '',
        background: '',
        personality: '',
        ideals: '',
        xp: 0
    },
    currentStep: 1,
    attrMethod: 'pointbuy',
    levelUpMode: false,
    asiRemaining: 0,
    subclassNeeded: null,

    init() {
        this.loadFromStorage();
        this.setupNav();
        this.render();
    },

    setupNav() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const step = parseInt(e.target.dataset.step);
                if (step <= this.getMaxStep()) {
                    this.currentStep = step;
                    this.render();
                }
            });
        });
    },

    getMaxStep() {
        if (!this.character.race) return 1;
        if (!this.character.primaryClass) return 2;
        return 5;
    },

    // Navigation
    nextStep() {
        if (this.currentStep < 5) {
            this.currentStep++;
            this.render();
            this.saveToStorage();
        }
    },

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.render();
        }
    },

    // Race selection
    selectRace(raceKey) {
        this.character.race = raceKey;
        this.render();
    },

    // Class selection
    selectClass(classKey) {
        this.character.primaryClass = classKey;
        this.character.classLevels = { [classKey]: 1 };
        // Reset subclass
        this.character.subclasses = {};
        this.render();
    },

    // Subclass selection
    selectSubclass(subKey) {
        if (this.character.primaryClass) {
            this.character.subclasses[this.character.primaryClass] = subKey;
            this.render();
        }
    },

    // Attribute methods
    setMethod(method) {
        this.attrMethod = method;
        if (method === 'standard') {
            // Reset to first standard array distribution
            this.character.abilities = { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 };
        } else if (method === 'pointbuy') {
            this.character.abilities = { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 };
        }
        this.render();
    },

    setAttribute(key, value) {
        if (this.attrMethod === 'pointbuy') {
            if (value < 8) value = 8;
            if (value > 15) value = 15;

            // Check total points
            const temp = { ...this.character.abilities, [key]: value };
            let totalCost = 0;
            Object.values(temp).forEach(v => { totalCost += Engine.pointBuyCost(v); });
            if (totalCost > 27) return; // Can't exceed 27 points
        } else if (this.attrMethod === 'standard') {
            // Validate standard array
            if (!Engine.standardArray.includes(value)) return;
        } else {
            if (value < 1) value = 1;
            if (value > 30) value = 30;
        }

        this.character.abilities[key] = value;
        this.render();
    },

    // Details
    setDetail(field, value) {
        this.character[field] = value;
        this.saveToStorage();
    },

    // Level up
    levelUp() {
        this.levelUpMode = true;
        this.render();
    },

    cancelLevelUp() {
        this.levelUpMode = false;
        this.subclassNeeded = null;
        this.render();
    },

    confirmLevelUp(classKey) {
        const isNew = !this.character.classLevels[classKey];

        if (isNew) {
            this.character.classLevels[classKey] = 1;
        } else {
            this.character.classLevels[classKey]++;
        }

        const newLevel = this.character.classLevels[classKey];
        const cls = CLASSES[classKey];

        // Check if subclass is needed
        if (newLevel === cls.subclassLevel && !this.character.subclasses[classKey]) {
            this.subclassNeeded = classKey;
            this.levelUpMode = false;
            this.render();
            return;
        }

        // Check if ASI is gained
        const levelFeatures = cls.features[newLevel] || [];
        if (levelFeatures.some(f => f.includes('Aumento de Atributo'))) {
            this.asiRemaining = 2;
            this.levelUpMode = false;
            this.render();
            return;
        }

        this.levelUpMode = false;
        this.saveToStorage();
        this.render();
    },

    confirmSubclass(classKey, subKey) {
        this.character.subclasses[classKey] = subKey;
        this.subclassNeeded = null;

        // Check if ASI is also gained at this level
        const cls = CLASSES[classKey];
        const level = this.character.classLevels[classKey];
        const levelFeatures = cls.features[level] || [];
        if (levelFeatures.some(f => f.includes('Aumento de Atributo'))) {
            this.asiRemaining = 2;
        }

        this.saveToStorage();
        this.render();
    },

    applyASI(abilityKey) {
        if (this.asiRemaining <= 0) return;
        if (this.character.abilities[abilityKey] >= 20) return;

        this.character.abilities[abilityKey]++;
        this.asiRemaining--;

        if (this.asiRemaining <= 0) {
            this.saveToStorage();
            this.render();
        } else {
            // Update remaining display
            const el = document.getElementById('asi-remaining');
            if (el) el.textContent = this.asiRemaining;
            this.render();
        }
    },

    // Rendering
    render() {
        const main = document.getElementById('main-content');
        if (!main) return;

        // Update nav
        document.querySelectorAll('.nav-btn').forEach(btn => {
            const step = parseInt(btn.dataset.step);
            btn.classList.toggle('active', step === this.currentStep);
            if (step < this.currentStep) btn.classList.add('completed');
        });

        let html = '';

        switch (this.currentStep) {
            case 1:
                html = UI.renderRaceSelection(this.character.race);
                break;
            case 2:
                const needsSub = this.character.primaryClass && CLASSES[this.character.primaryClass]?.subclassLevel <= 1;
                html = UI.renderClassSelection(this.character.primaryClass, this.character.subclasses[this.character.primaryClass]);
                break;
            case 3:
                html = UI.renderAttributes(this.character, this.attrMethod);
                break;
            case 4:
                html = UI.renderDetails(this.character);
                break;
            case 5:
                html = UI.renderSheet(this.character);
                // Append level up panel if active
                if (this.levelUpMode) {
                    html += UI.renderLevelUp(this.character);
                }
                if (this.subclassNeeded) {
                    html += UI.renderSubclassChoice(this.character, this.subclassNeeded);
                }
                if (this.asiRemaining > 0) {
                    html += UI.renderASI(this.character);
                }
                break;
        }

        main.innerHTML = html;
    },

    // Persistence
    saveToStorage() {
        try {
            localStorage.setItem('dnd_character', JSON.stringify(this.character));
            localStorage.setItem('dnd_step', this.currentStep.toString());
            this.showSaveIndicator();
        } catch (e) {
            console.warn('Could not save to localStorage', e);
        }
    },

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('dnd_character');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.character = { ...this.character, ...parsed };
            }
            const step = localStorage.getItem('dnd_step');
            if (step) this.currentStep = parseInt(step);
        } catch (e) {
            console.warn('Could not load from localStorage', e);
        }
    },

    showSaveIndicator() {
        let indicator = document.querySelector('.save-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'save-indicator';
            indicator.textContent = 'Salvo!';
            document.body.appendChild(indicator);
        }
        indicator.classList.add('show');
        setTimeout(() => indicator.classList.remove('show'), 1500);
    },

    // Export
    exportJSON() {
        const data = JSON.stringify(this.character, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.character.name || 'personagem'}_ficha.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    // New character
    newCharacter() {
        if (confirm('Tem certeza? Isso apagará a ficha atual.')) {
            localStorage.removeItem('dnd_character');
            localStorage.removeItem('dnd_step');
            this.character = {
                name: '',
                race: null,
                primaryClass: null,
                classLevels: {},
                subclasses: {},
                abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
                alignment: '',
                background: '',
                personality: '',
                ideals: '',
                xp: 0
            };
            this.currentStep = 1;
            this.levelUpMode = false;
            this.asiRemaining = 0;
            this.subclassNeeded = null;
            this.render();
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
