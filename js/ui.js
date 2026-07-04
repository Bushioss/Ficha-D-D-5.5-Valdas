// UI Rendering Module
const UI = {
    // Render race selection (Step 1)
    renderRaceSelection(selectedRace) {
        const phbRaces = Object.entries(RACES).filter(([_, r]) => r.source === "PHB 2024");
        const valdaRaces = Object.entries(RACES).filter(([_, r]) => r.source === "Valda's");

        return `
        <div class="step-container">
            <h2 class="step-title">Escolha sua Espécie</h2>
            <h3 style="color:var(--text-muted);margin-bottom:0.5rem;">Livro do Jogador 2024</h3>
            <div class="cards-grid">
                ${phbRaces.map(([key, race]) => this._raceCard(key, race, selectedRace)).join('')}
            </div>
            <h3 style="color:var(--text-muted);margin:1.5rem 0 0.5rem;">Valda's Spire of Secrets</h3>
            <div class="cards-grid">
                ${valdaRaces.map(([key, race]) => this._raceCard(key, race, selectedRace)).join('')}
            </div>
            <div class="btn-group">
                <button class="btn btn-primary" onclick="App.nextStep()" ${!selectedRace ? 'disabled' : ''}>Próximo &rarr;</button>
            </div>
        </div>`;
    },

    _raceCard(key, race, selectedRace) {
        return `
        <div class="card ${selectedRace === key ? 'selected' : ''}" onclick="App.selectRace('${key}')">
            <span class="source">${race.source}</span>
            <h3>${race.name}</h3>
            <p>${race.desc}</p>
            <ul class="traits">
                <li>Tamanho: ${race.size} | Velocidade: ${race.speed}m</li>
                ${race.traits.slice(0, 3).map(t => `<li><strong>${t.name}</strong></li>`).join('')}
                ${race.traits.length > 3 ? `<li>...e mais ${race.traits.length - 3} traço(s)</li>` : ''}
            </ul>
        </div>`;
    },

    // Render class selection (Step 2)
    renderClassSelection(selectedClass, selectedSubclass) {
        const phbClasses = Object.entries(CLASSES).filter(([_, c]) => c.source === "PHB 2024");
        const valdaClasses = Object.entries(CLASSES).filter(([_, c]) => c.source === "Valda's");

        let subclassHTML = '';
        if (selectedClass) {
            const cls = CLASSES[selectedClass];
            if (cls && cls.subclassLevel <= 1) {
                subclassHTML = this._renderSubclassSelection(selectedClass, selectedSubclass);
            }
        }

        return `
        <div class="step-container">
            <h2 class="step-title">Escolha sua Classe</h2>
            <h3 style="color:var(--text-muted);margin-bottom:0.5rem;">Livro do Jogador 2024</h3>
            <div class="cards-grid">
                ${phbClasses.map(([key, cls]) => this._classCard(key, cls, selectedClass)).join('')}
            </div>
            <h3 style="color:var(--text-muted);margin:1.5rem 0 0.5rem;">Valda's Spire of Secrets</h3>
            <div class="cards-grid">
                ${valdaClasses.map(([key, cls]) => this._classCard(key, cls, selectedClass)).join('')}
            </div>
            ${subclassHTML}
            <div class="btn-group">
                <button class="btn btn-secondary" onclick="App.prevStep()">&larr; Anterior</button>
                <button class="btn btn-primary" onclick="App.nextStep()" ${!selectedClass ? 'disabled' : ''}>Próximo &rarr;</button>
            </div>
        </div>`;
    },

    _classCard(key, cls, selectedClass) {
        const spellInfo = cls.spellcaster ? `| Conjurador: ${cls.spellcaster}` : '';
        return `
        <div class="card ${selectedClass === key ? 'selected' : ''}" onclick="App.selectClass('${key}')">
            <span class="source">${cls.source}</span>
            <h3>${cls.name}</h3>
            <p>${cls.desc}</p>
            <ul class="traits">
                <li>DV: d${cls.hitDie} ${spellInfo}</li>
                <li>Subclasse nível ${cls.subclassLevel} (${Object.keys(cls.subclasses).length} opções)</li>
            </ul>
        </div>`;
    },

    _renderSubclassSelection(classKey, selectedSubclass) {
        const cls = CLASSES[classKey];
        if (!cls) return '';
        return `
        <div style="margin-top:1.5rem;">
            <h3 style="color:var(--gold);">Escolha sua Subclasse (nível ${cls.subclassLevel})</h3>
            <div class="subclass-grid">
                ${Object.entries(cls.subclasses).map(([key, sub]) => `
                    <div class="subclass-card ${selectedSubclass === key ? 'selected' : ''}" onclick="App.selectSubclass('${key}')">
                        <h4>${sub.name}</h4>
                        ${sub.source ? `<span class="source">${sub.source}</span>` : ''}
                        <p>${sub.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>`;
    },

    // Render attributes (Step 3)
    renderAttributes(character, method) {
        const abilities = [
            { key: 'str', name: 'Força' },
            { key: 'dex', name: 'Destreza' },
            { key: 'con', name: 'Constituição' },
            { key: 'int', name: 'Inteligência' },
            { key: 'wis', name: 'Sabedoria' },
            { key: 'cha', name: 'Carisma' }
        ];

        let pointsUsed = 0;
        if (method === 'pointbuy') {
            abilities.forEach(ab => {
                pointsUsed += Engine.pointBuyCost(character.abilities[ab.key]);
            });
        }

        return `
        <div class="step-container">
            <h2 class="step-title">Definir Atributos</h2>
            <div class="attributes-section">
                <div class="method-selector">
                    <button class="method-btn ${method === 'pointbuy' ? 'active' : ''}" onclick="App.setMethod('pointbuy')">Compra de Pontos (27)</button>
                    <button class="method-btn ${method === 'standard' ? 'active' : ''}" onclick="App.setMethod('standard')">Conjunto Padrão</button>
                    <button class="method-btn ${method === 'manual' ? 'active' : ''}" onclick="App.setMethod('manual')">Manual</button>
                </div>
                ${method === 'pointbuy' ? `<div class="points-remaining">Pontos restantes: <strong>${27 - pointsUsed}</strong>/27</div>` : ''}
                ${method === 'standard' ? `<div class="points-remaining">Distribua: 15, 14, 13, 12, 10, 8</div>` : ''}
                <div class="attributes-grid">
                    ${abilities.map(ab => this._attrBox(ab, character, method)).join('')}
                </div>
                ${this._renderRacialBonusInfo(character)}
            </div>
            <div class="btn-group">
                <button class="btn btn-secondary" onclick="App.prevStep()">&larr; Anterior</button>
                <button class="btn btn-primary" onclick="App.nextStep()">Próximo &rarr;</button>
            </div>
        </div>`;
    },

    _attrBox(ab, character, method) {
        const val = character.abilities[ab.key];
        const mod = Engine.modStr(val);
        const inputHTML = method === 'standard'
            ? `<select onchange="App.setAttribute('${ab.key}', parseInt(this.value))">
                <option value="${val}">${val}</option>
                ${Engine.standardArray.map(v => `<option value="${v}" ${v === val ? 'selected' : ''}>${v}</option>`).join('')}
               </select>`
            : `<input type="number" min="3" max="20" value="${val}" onchange="App.setAttribute('${ab.key}', parseInt(this.value))">`;

        return `
        <div class="attr-box">
            <label>${ab.name}</label>
            ${inputHTML}
            <div class="modifier">${mod}</div>
        </div>`;
    },

    _renderRacialBonusInfo(character) {
        const race = RACES[character.race];
        if (!race) return '';
        const bonus = race.abilityBonus;
        let info = '';
        if (bonus.choice) {
            info = `Bônus racial: +${bonus.amount} em ${bonus.choice} atributo(s) à sua escolha`;
        }
        // Fixed bonuses
        const fixed = [];
        if (bonus.str) fixed.push(`FOR +${bonus.str}`);
        if (bonus.dex) fixed.push(`DES +${bonus.dex}`);
        if (bonus.con) fixed.push(`CON +${bonus.con}`);
        if (bonus.int) fixed.push(`INT +${bonus.int}`);
        if (bonus.wis) fixed.push(`SAB +${bonus.wis}`);
        if (bonus.cha) fixed.push(`CHA +${bonus.cha}`);
        if (fixed.length) info = `Bônus racial fixo: ${fixed.join(', ')}. ` + info;

        return info ? `<div class="points-remaining" style="background:var(--bg);">${info}</div>` : '';
    },

    // Render details (Step 4)
    renderDetails(character) {
        return `
        <div class="step-container">
            <h2 class="step-title">Detalhes do Personagem</h2>
            <div class="details-form">
                <div class="form-group">
                    <label>Nome do Personagem</label>
                    <input type="text" value="${character.name || ''}" onchange="App.setDetail('name', this.value)">
                </div>
                <div class="form-group">
                    <label>Alinhamento</label>
                    <select onchange="App.setDetail('alignment', this.value)">
                        <option value="">Escolha...</option>
                        ${['Leal e Bom','Neutro e Bom','Caótico e Bom','Leal e Neutro','Neutro','Caótico e Neutro','Leal e Mau','Neutro e Mau','Caótico e Mau']
                            .map(a => `<option value="${a}" ${character.alignment === a ? 'selected' : ''}>${a}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Antecedente</label>
                    <input type="text" value="${character.background || ''}" onchange="App.setDetail('background', this.value)" placeholder="Ex: Nobre, Artesão, Criminoso...">
                </div>
                <div class="form-group">
                    <label>Nível de Experiência (XP)</label>
                    <input type="number" min="0" value="${character.xp || 0}" onchange="App.setDetail('xp', parseInt(this.value))">
                </div>
                <div class="form-group full-width">
                    <label>Personalidade</label>
                    <textarea onchange="App.setDetail('personality', this.value)">${character.personality || ''}</textarea>
                </div>
                <div class="form-group full-width">
                    <label>Ideais / Vínculos / Fraquezas</label>
                    <textarea onchange="App.setDetail('ideals', this.value)">${character.ideals || ''}</textarea>
                </div>
            </div>
            <div class="btn-group">
                <button class="btn btn-secondary" onclick="App.prevStep()">&larr; Anterior</button>
                <button class="btn btn-primary" onclick="App.nextStep()">Finalizar Ficha &rarr;</button>
            </div>
        </div>`;
    },

    // Render full character sheet (Step 5)
    renderSheet(character) {
        const totalLvl = Engine.totalLevel(character.classLevels);
        const prof = Engine.proficiencyBonus(totalLvl);
        const hp = Engine.calculateHP(character);
        const ac = Engine.calculateAC(character);
        const speed = Engine.calculateSpeed(character);
        const initiative = Engine.calculateInitiative(character);
        const saves = Engine.calculateSavingThrows(character);
        const features = Engine.getAllFeatures(character);
        const hitDice = Engine.getHitDice(character);
        const race = RACES[character.race];
        const spellInfo = SPELL_UTILS.getSpellSlots(character.classLevels);

        const classDesc = Object.entries(character.classLevels)
            .map(([k, v]) => `${CLASSES[k]?.name || k} ${v}`)
            .join(' / ');

        const abilities = [
            { key: 'str', name: 'FOR' },
            { key: 'dex', name: 'DES' },
            { key: 'con', name: 'CON' },
            { key: 'int', name: 'INT' },
            { key: 'wis', name: 'SAB' },
            { key: 'cha', name: 'CHA' }
        ];

        return `
        <div class="step-container">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                <h2 class="step-title" style="border:none;margin:0;padding:0;">${character.name || 'Personagem'}</h2>
                <div>
                    <button class="btn btn-gold" onclick="App.levelUp()">Subir de Nível</button>
                    <button class="btn btn-secondary" onclick="App.exportJSON()">Exportar JSON</button>
                    <button class="btn btn-secondary" onclick="App.newCharacter()">Nova Ficha</button>
                </div>
            </div>
            <div style="color:var(--text-muted);margin-bottom:1rem;">
                ${race?.name || ''} | ${classDesc} | Nível Total: ${totalLvl}
                ${character.alignment ? ` | ${character.alignment}` : ''}
                ${character.background ? ` | ${character.background}` : ''}
            </div>

            <div class="sheet">
                <div class="sheet-sidebar">
                    <!-- Attributes -->
                    <div class="stat-block">
                        <h4>Atributos</h4>
                        ${abilities.map(ab => `
                            <div class="mini-attr">
                                <div class="name">${ab.name}</div>
                                <div class="score">${character.abilities[ab.key]}</div>
                                <div class="mod">${Engine.modStr(character.abilities[ab.key])}</div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Saving Throws -->
                    <div class="stat-block">
                        <h4>Testes de Resistência</h4>
                        ${abilities.map(ab => `
                            <div class="stat-row">
                                <span class="label">${saves[ab.key].proficient ? '◆' : '○'} ${ab.name}</span>
                                <span class="val">${saves[ab.key].mod >= 0 ? '+' : ''}${saves[ab.key].mod}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="sheet-main">
                    <!-- Combat Stats -->
                    <div class="stat-block">
                        <h4>Combate</h4>
                        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem;text-align:center;">
                            <div><div style="font-size:2rem;color:var(--gold);">${hp}</div><div style="font-size:0.8rem;color:var(--text-muted);">Pontos de Vida</div></div>
                            <div><div style="font-size:2rem;color:var(--gold);">${ac}</div><div style="font-size:0.8rem;color:var(--text-muted);">Classe de Armadura</div></div>
                            <div><div style="font-size:2rem;color:var(--gold);">${speed}m</div><div style="font-size:0.8rem;color:var(--text-muted);">Deslocamento</div></div>
                            <div><div style="font-size:2rem;color:var(--gold);">${initiative >= 0 ? '+' : ''}${initiative}</div><div style="font-size:0.8rem;color:var(--text-muted);">Iniciativa</div></div>
                            <div><div style="font-size:2rem;color:var(--gold);">+${prof}</div><div style="font-size:0.8rem;color:var(--text-muted);">Proficiência</div></div>
                            <div><div style="font-size:1.2rem;color:var(--gold);">${hitDice}</div><div style="font-size:0.8rem;color:var(--text-muted);">Dados de Vida</div></div>
                        </div>
                    </div>

                    <!-- Spell Slots -->
                    ${this._renderSpellSlots(spellInfo, character)}

                    <!-- Racial Traits -->
                    <div class="stat-block">
                        <h4>Traços Raciais (${race?.name || ''})</h4>
                        <ul class="features-list">
                            ${(race?.traits || []).map(t => `
                                <li>
                                    <div class="feat-name">${t.name}</div>
                                    <div class="feat-desc">${t.desc}</div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- Class Features -->
                    <div class="stat-block">
                        <h4>Características de Classe</h4>
                        <ul class="features-list">
                            ${features.map(f => `
                                <li>
                                    <div class="feat-name">${f.name} <span style="font-size:0.7rem;color:var(--text-muted);">(${f.class} Nv.${f.level})</span></div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <!-- Proficiencies -->
                    <div class="stat-block">
                        <h4>Proficiências</h4>
                        ${this._renderProficiencies(character)}
                    </div>
                </div>
            </div>

            <div class="btn-group">
                <button class="btn btn-secondary" onclick="App.prevStep()">&larr; Editar</button>
            </div>
        </div>`;
    },

    _renderSpellSlots(spellInfo, character) {
        if (spellInfo.type === 'none' || spellInfo.type === 'warmage') {
            if (spellInfo.type === 'warmage') {
                return `<div class="stat-block"><h4>Magia</h4><p style="color:var(--text-muted);font-size:0.85rem;">Mago de Guerra: foco em truques de combate. Sem espaços de magia tradicionais.</p></div>`;
            }
            return '';
        }

        let html = '<div class="stat-block"><h4>Espaços de Magia</h4>';

        if (spellInfo.type === 'pact') {
            html += `<div class="stat-row"><span class="label">Espaços de Pacto</span><span class="val">${spellInfo.slots} espaços de ${spellInfo.slotLevel}° círculo</span></div>`;
        } else {
            const slots = spellInfo.slots;
            for (let i = 0; i < 9; i++) {
                if (slots[i] > 0) {
                    html += `<div class="stat-row"><span class="label">${i + 1}° Círculo</span><span class="val">${slots[i]} espaço(s)</span></div>`;
                }
            }
            if (spellInfo.pactSlots) {
                html += `<div class="stat-row"><span class="label">Pacto (Bruxo)</span><span class="val">${spellInfo.pactSlots} espaços de ${spellInfo.pactSlotLevel}°</span></div>`;
            }
        }

        // Spell save DC and attack bonus for each spellcasting class
        for (const [classKey, level] of Object.entries(character.classLevels)) {
            const cls = CLASSES[classKey];
            if (cls && cls.spellAbility) {
                const dc = Engine.spellSaveDC(character, classKey);
                const atk = Engine.spellAttackBonus(character, classKey);
                html += `<div class="stat-row"><span class="label">CD de Magia (${cls.name})</span><span class="val">${dc} | Ataque: +${atk}</span></div>`;
            }
        }

        html += '</div>';
        return html;
    },

    _renderProficiencies(character) {
        const primaryClass = CLASSES[character.primaryClass];
        if (!primaryClass) return '';
        let html = '';
        if (primaryClass.armorProf.length) {
            html += `<div class="stat-row"><span class="label">Armaduras</span><span class="val">${primaryClass.armorProf.join(', ')}</span></div>`;
        }
        if (primaryClass.weaponProf.length) {
            html += `<div class="stat-row"><span class="label">Armas</span><span class="val">${primaryClass.weaponProf.join(', ')}</span></div>`;
        }
        const race = RACES[character.race];
        if (race && race.languages) {
            html += `<div class="stat-row"><span class="label">Idiomas</span><span class="val">${race.languages.join(', ')}</span></div>`;
        }
        return html;
    },

    // Render level up panel
    renderLevelUp(character) {
        const totalLvl = Engine.totalLevel(character.classLevels);
        if (totalLvl >= 20) {
            return `<div class="level-up-panel"><h3>Nível Máximo Atingido (20)</h3></div>`;
        }

        // Current classes
        const currentClasses = Object.keys(character.classLevels);

        // Available classes for multiclass
        const allClasses = Object.entries(CLASSES);

        let html = `
        <div class="level-up-panel">
            <h3>Subir de Nível (Atual: ${totalLvl} &rarr; ${totalLvl + 1})</h3>
            <p style="color:var(--text-muted);margin-bottom:1rem;">Escolha em qual classe subir:</p>
            <div class="multiclass-options">`;

        allClasses.forEach(([key, cls]) => {
            const isCurrentClass = currentClasses.includes(key);
            const canMulti = isCurrentClass || Engine.canMulticlass(character, key);
            const currentLvl = character.classLevels[key] || 0;
            const prereqs = cls.multiclassPrereq;
            let prereqStr = '';
            if (!isCurrentClass && prereqs) {
                const parts = [];
                Object.entries(prereqs).forEach(([k, v]) => {
                    if (k === '_or') return;
                    const names = { str: 'FOR', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CHA' };
                    parts.push(`${names[k] || k} ${v}`);
                });
                prereqStr = parts.join(prereqs._or ? ' ou ' : ' e ');
            }

            html += `
            <div class="multiclass-opt ${canMulti ? '' : 'disabled'}" onclick="${canMulti ? `App.confirmLevelUp('${key}')` : ''}">
                <strong>${cls.name}</strong> ${isCurrentClass ? `(Nv.${currentLvl} &rarr; ${currentLvl + 1})` : '(Novo!)'}
                ${!isCurrentClass ? `<div class="prereq">Req: ${prereqStr}</div>` : ''}
                ${!canMulti ? '<div class="prereq" style="color:var(--accent);">Pré-requisitos não atendidos</div>' : ''}
            </div>`;
        });

        html += `</div>
            <div class="btn-group">
                <button class="btn btn-secondary" onclick="App.cancelLevelUp()">Cancelar</button>
            </div>
        </div>`;

        return html;
    },

    // Render subclass choice when reaching subclass level
    renderSubclassChoice(character, classKey) {
        const cls = CLASSES[classKey];
        if (!cls) return '';

        return `
        <div class="level-up-panel">
            <h3>Escolha de Subclasse - ${cls.name}</h3>
            <p style="color:var(--text-muted);margin-bottom:1rem;">Você atingiu o nível ${cls.subclassLevel}! Escolha sua subclasse:</p>
            <div class="subclass-grid">
                ${Object.entries(cls.subclasses).map(([key, sub]) => `
                    <div class="subclass-card" onclick="App.confirmSubclass('${classKey}', '${key}')">
                        <h4>${sub.name}</h4>
                        ${sub.source ? `<span class="source">${sub.source}</span>` : ''}
                        <p>${sub.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>`;
    },

    // Render ASI choice
    renderASI(character, callback) {
        const abilities = [
            { key: 'str', name: 'Força' },
            { key: 'dex', name: 'Destreza' },
            { key: 'con', name: 'Constituição' },
            { key: 'int', name: 'Inteligência' },
            { key: 'wis', name: 'Sabedoria' },
            { key: 'cha', name: 'Carisma' }
        ];

        return `
        <div class="level-up-panel">
            <h3>Aumento de Atributo</h3>
            <p style="color:var(--text-muted);margin-bottom:1rem;">Distribua 2 pontos entre seus atributos (máximo 20):</p>
            <div class="attributes-grid">
                ${abilities.map(ab => `
                    <div class="attr-box">
                        <label>${ab.name}</label>
                        <div class="value">${character.abilities[ab.key]}</div>
                        <button class="btn btn-secondary" style="padding:0.2rem 0.5rem;font-size:0.8rem;margin-top:0.25rem;"
                            onclick="App.applyASI('${ab.key}')"
                            ${character.abilities[ab.key] >= 20 ? 'disabled' : ''}>+1</button>
                    </div>
                `).join('')}
            </div>
            <div class="points-remaining">Pontos restantes: <span id="asi-remaining">2</span></div>
        </div>`;
    }
};
