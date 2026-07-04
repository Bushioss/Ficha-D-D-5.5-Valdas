// Character Engine - handles all calculations
const Engine = {
    // Calculate ability modifier
    modifier(score) {
        return Math.floor((score - 10) / 2);
    },

    // Format modifier string
    modStr(score) {
        const mod = this.modifier(score);
        return mod >= 0 ? `+${mod}` : `${mod}`;
    },

    // Get proficiency bonus
    proficiencyBonus(totalLevel) {
        return PROFICIENCY_BONUS[Math.min(totalLevel, 20)] || 2;
    },

    // Calculate total level
    totalLevel(classLevels) {
        return Object.values(classLevels).reduce((sum, lvl) => sum + lvl, 0);
    },

    // Calculate HP
    calculateHP(character) {
        let hp = 0;
        const conMod = this.modifier(character.abilities.con);
        const totalLvl = this.totalLevel(character.classLevels);

        // First level: max hit die + CON mod
        const primaryClassKey = character.primaryClass;
        const primaryClass = CLASSES[primaryClassKey];
        if (primaryClass) {
            hp += primaryClass.hitDie + conMod;
        }

        // Subsequent levels
        let levelsProcessed = 1;
        for (const [classKey, level] of Object.entries(character.classLevels)) {
            const cls = CLASSES[classKey];
            if (!cls) continue;
            const start = classKey === primaryClassKey ? 2 : 1;
            for (let i = start; i <= level; i++) {
                if (levelsProcessed >= totalLvl) break;
                hp += Math.floor(cls.hitDie / 2) + 1 + conMod;
                levelsProcessed++;
            }
        }

        // Racial HP bonus (Dwarf)
        const race = RACES[character.race];
        if (race && race.hpBonus) {
            hp += race.hpBonus * totalLvl;
        }

        return Math.max(hp, 1);
    },

    // Calculate AC
    calculateAC(character) {
        const dexMod = this.modifier(character.abilities.dex);

        // Unarmored Defense - Barbarian
        if (character.classLevels.barbaro) {
            const conMod = this.modifier(character.abilities.con);
            return 10 + dexMod + conMod;
        }

        // Unarmored Defense - Monk
        if (character.classLevels.monge) {
            const wisMod = this.modifier(character.abilities.wis);
            return 10 + dexMod + wisMod;
        }

        // Half-Construct bonus
        const race = RACES[character.race];
        if (race && character.race === 'half_construct') {
            return 10 + dexMod + 1; // +1 natural armor
        }

        // Default (no armor)
        return 10 + dexMod;
    },

    // Calculate speed
    calculateSpeed(character) {
        const race = RACES[character.race];
        let speed = race ? race.speed : 9;

        // Barbarian fast movement (level 5+)
        if (character.classLevels.barbaro && character.classLevels.barbaro >= 5) {
            speed += 3;
        }

        // Monk unarmored movement
        if (character.classLevels.monge) {
            const monkLvl = character.classLevels.monge;
            if (monkLvl >= 2) speed += 3;
            if (monkLvl >= 6) speed += 1.5;
            if (monkLvl >= 10) speed += 1.5;
            if (monkLvl >= 14) speed += 1.5;
            if (monkLvl >= 18) speed += 1.5;
        }

        return speed;
    },

    // Calculate initiative
    calculateInitiative(character) {
        return this.modifier(character.abilities.dex);
    },

    // Calculate saving throws
    calculateSavingThrows(character) {
        const saves = {};
        const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        const profBonus = this.proficiencyBonus(this.totalLevel(character.classLevels));

        // Get saving throw proficiencies from primary class
        const primaryClass = CLASSES[character.primaryClass];
        const profSaves = primaryClass ? primaryClass.savingThrows : [];

        abilities.forEach(ab => {
            const mod = this.modifier(character.abilities[ab]);
            const prof = profSaves.includes(ab);
            saves[ab] = {
                mod: mod + (prof ? profBonus : 0),
                proficient: prof
            };
        });

        return saves;
    },

    // Check multiclass prerequisites
    canMulticlass(character, targetClassKey) {
        const prereqs = CLASSES[targetClassKey]?.multiclassPrereq;
        if (!prereqs) return false;

        // Check if already at max level 20
        if (this.totalLevel(character.classLevels) >= 20) return false;

        // Check current class prereqs (must meet prereqs for current class too)
        const currentPrereqs = CLASSES[character.primaryClass]?.multiclassPrereq;
        if (currentPrereqs && !this._meetsPrereqs(character.abilities, currentPrereqs)) {
            return false;
        }

        return this._meetsPrereqs(character.abilities, prereqs);
    },

    _meetsPrereqs(abilities, prereqs) {
        if (prereqs._or) {
            // OR logic: need to meet at least one
            const keys = Object.keys(prereqs).filter(k => k !== '_or');
            return keys.some(key => abilities[key] >= prereqs[key]);
        }
        // AND logic: need to meet all
        return Object.entries(prereqs).every(([key, val]) => {
            if (key === '_or') return true;
            return abilities[key] >= val;
        });
    },

    // Get features at current level for a class
    getFeaturesAtLevel(classKey, level) {
        const cls = CLASSES[classKey];
        if (!cls || !cls.features[level]) return [];
        return cls.features[level].filter(f => f !== "---");
    },

    // Get all features up to current level
    getAllFeatures(character) {
        const features = [];

        for (const [classKey, level] of Object.entries(character.classLevels)) {
            const cls = CLASSES[classKey];
            if (!cls) continue;
            for (let i = 1; i <= level; i++) {
                const levelFeats = cls.features[i];
                if (!levelFeats) continue;
                levelFeats.forEach(f => {
                    if (f !== "---") {
                        features.push({
                            name: f,
                            class: cls.name,
                            level: i,
                            source: cls.source
                        });
                    }
                });
            }

            // Add subclass features
            if (character.subclasses && character.subclasses[classKey]) {
                const subKey = character.subclasses[classKey];
                const sub = cls.subclasses[subKey];
                if (sub && sub.features) {
                    for (const [subLvl, feats] of Object.entries(sub.features)) {
                        if (parseInt(subLvl) <= level) {
                            feats.forEach(f => {
                                features.push({
                                    name: f,
                                    class: `${cls.name} (${sub.name})`,
                                    level: parseInt(subLvl),
                                    source: sub.source || cls.source
                                });
                            });
                        }
                    }
                }
            }
        }

        return features;
    },

    // Get hit dice summary
    getHitDice(character) {
        const dice = {};
        for (const [classKey, level] of Object.entries(character.classLevels)) {
            const cls = CLASSES[classKey];
            if (!cls) continue;
            const dieStr = `d${cls.hitDie}`;
            dice[dieStr] = (dice[dieStr] || 0) + level;
        }
        return Object.entries(dice).map(([die, count]) => `${count}${die}`).join(" + ");
    },

    // Point buy cost
    pointBuyCost(score) {
        if (score <= 8) return 0;
        if (score <= 13) return score - 8;
        if (score === 14) return 7;
        if (score === 15) return 9;
        return 99; // invalid
    },

    // Standard array
    standardArray: [15, 14, 13, 12, 10, 8],

    // Calculate spell save DC
    spellSaveDC(character, classKey) {
        const cls = CLASSES[classKey];
        if (!cls || !cls.spellAbility) return null;
        const abilMod = this.modifier(character.abilities[cls.spellAbility]);
        const prof = this.proficiencyBonus(this.totalLevel(character.classLevels));
        return 8 + abilMod + prof;
    },

    // Calculate spell attack bonus
    spellAttackBonus(character, classKey) {
        const cls = CLASSES[classKey];
        if (!cls || !cls.spellAbility) return null;
        const abilMod = this.modifier(character.abilities[cls.spellAbility]);
        const prof = this.proficiencyBonus(this.totalLevel(character.classLevels));
        return abilMod + prof;
    }
};
