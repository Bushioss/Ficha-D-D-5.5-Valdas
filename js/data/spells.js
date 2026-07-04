// Spell slot calculation for multiclass
const SPELL_UTILS = {
    // Calculate effective caster level for multiclass
    getMulticlassCasterLevel(classLevels) {
        let casterLevel = 0;
        for (const [classKey, level] of Object.entries(classLevels)) {
            const cls = CLASSES[classKey];
            if (!cls) continue;
            switch (cls.spellcaster) {
                case "full": casterLevel += level; break;
                case "half": casterLevel += Math.floor(level / 2); break;
                case "third": casterLevel += Math.floor(level / 3); break;
                // pact and warmage don't contribute to multiclass spell slots
            }
        }
        return casterLevel;
    },

    // Get spell slots for a given caster level
    getSpellSlots(classLevels) {
        const classes = Object.keys(classLevels);

        // Single class - use class-specific table
        if (classes.length === 1) {
            const classKey = classes[0];
            const cls = CLASSES[classKey];
            const level = classLevels[classKey];

            if (cls.spellcaster === "pact") {
                const pact = PACT_SLOTS[level];
                return { type: "pact", slots: pact.slots, slotLevel: pact.level };
            }
            if (cls.spellcaster === "warmage") {
                return { type: "warmage", slots: [] };
            }
            if (!cls.spellcaster) return { type: "none", slots: [] };

            let effectiveLevel = level;
            if (cls.spellcaster === "half") effectiveLevel = Math.max(1, Math.floor(level / 2));
            if (cls.spellcaster === "third") effectiveLevel = Math.max(1, Math.floor(level / 3));

            return { type: "standard", slots: FULL_CASTER_SLOTS[effectiveLevel] || [0,0,0,0,0,0,0,0,0] };
        }

        // Multiclass
        const casterLevel = this.getMulticlassCasterLevel(classLevels);
        const result = { type: "multiclass", slots: FULL_CASTER_SLOTS[casterLevel] || [0,0,0,0,0,0,0,0,0] };

        // Add pact slots separately if warlock is present
        if (classLevels.bruxo) {
            const pact = PACT_SLOTS[classLevels.bruxo];
            result.pactSlots = pact.slots;
            result.pactSlotLevel = pact.level;
        }

        return result;
    }
};
