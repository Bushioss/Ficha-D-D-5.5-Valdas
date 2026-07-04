// All races from PHB 2024 and Valda's Spire of Secrets
const RACES = {
    // ===== PHB 2024 Races =====
    humano: {
        name: "Humano",
        source: "PHB 2024",
        size: "Medio",
        speed: 9, // in meters (30ft)
        languages: ["Comum", "1 idioma adicional"],
        traits: [
            { name: "Versátil", desc: "Você ganha 1 talento de Origem à sua escolha." },
            { name: "Engenhosidade", desc: "Quando você ou um aliado a até 9m falha em um teste de d20, você pode usar sua reação para adicionar seu bônus de proficiência à rolagem. Usos: bônus de proficiência por descanso longo." },
            { name: "Determinação", desc: "Você ganha Inspiração Heroica ao terminar um descanso longo." }
        ],
        abilityBonus: { choice: 3, amount: 1 }, // +1 to 3 different
        desc: "Os humanos são os mais adaptáveis e ambiciosos entre as raças comuns."
    },
    elfo: {
        name: "Elfo",
        source: "PHB 2024",
        size: "Medio",
        speed: 9,
        languages: ["Comum", "Élfico"],
        traits: [
            { name: "Visão no Escuro", desc: "Você pode ver na escuridão até 18m como se fosse luz fraca." },
            { name: "Linhagem Feérica", desc: "Você tem vantagem em testes de resistência contra ser Enfeitiçado e magia não pode colocá-lo para dormir." },
            { name: "Sentidos Aguçados", desc: "Você tem proficiência em Percepção." },
            { name: "Transe", desc: "Você não precisa dormir. Em vez disso, medita por 4 horas e obtém o benefício de um descanso longo." }
        ],
        abilityBonus: { choice: 3, amount: 1 },
        desc: "Elfos possuem graça sobrenatural e longevidade extraordinária."
    },
    anao: {
        name: "Anão",
        source: "PHB 2024",
        size: "Medio",
        speed: 9,
        languages: ["Comum", "Anão"],
        traits: [
            { name: "Visão no Escuro", desc: "Você pode ver na escuridão até 18m como se fosse luz fraca." },
            { name: "Resiliência Anã", desc: "Você tem resistência a dano de veneno e vantagem em testes de resistência contra ser Envenenado." },
            { name: "Tenacidade Anã", desc: "Seus pontos de vida máximos aumentam em 1 por nível." },
            { name: "Especialização em Pedra", desc: "Sempre que fizer um teste de Inteligência (História) relacionado a trabalho em pedra, você é considerado proficiente e adiciona o dobro do bônus de proficiência." }
        ],
        abilityBonus: { choice: 3, amount: 1 },
        hpBonus: 1, // per level
        desc: "Anões são robustos e resistentes, exímios artesãos e mineradores."
    },
    halfling: {
        name: "Halfling",
        source: "PHB 2024",
        size: "Pequeno",
        speed: 9,
        languages: ["Comum", "Halfling"],
        traits: [
            { name: "Sortudo", desc: "Quando rolar 1 no d20 de um teste de ataque, teste de habilidade ou teste de resistência, você pode rolar novamente e deve usar o novo resultado." },
            { name: "Corajoso", desc: "Você tem vantagem em testes de resistência contra ser Amedrontado." },
            { name: "Naturalmente Furtivo", desc: "Você pode se mover através do espaço de qualquer criatura de tamanho Médio ou maior." }
        ],
        abilityBonus: { choice: 3, amount: 1 },
        desc: "Halflings são pequenos, ágeis e possuem sorte sobrenatural."
    },
    gnomo: {
        name: "Gnomo",
        source: "PHB 2024",
        size: "Pequeno",
        speed: 9,
        languages: ["Comum", "Gnômico"],
        traits: [
            { name: "Visão no Escuro", desc: "Você pode ver na escuridão até 18m como se fosse luz fraca." },
            { name: "Esperteza Gnômica", desc: "Você tem vantagem em testes de resistência de Inteligência, Sabedoria e Carisma contra magia." },
            { name: "Prestidigitação Gnômica", desc: "Você conhece o truque Prestidigitação. Inteligência é seu atributo de conjuração para ele." }
        ],
        abilityBonus: { choice: 3, amount: 1 },
        desc: "Gnomos são inventivos, curiosos e possuem uma conexão inata com a magia."
    },
    meio_orc: {
        name: "Orc",
        source: "PHB 2024",
        size: "Medio",
        speed: 9,
        languages: ["Comum", "Orc"],
        traits: [
            { name: "Visão no Escuro", desc: "Você pode ver na escuridão até 18m como se fosse luz fraca." },
            { name: "Resistência Implacável", desc: "Quando reduzido a 0 PV mas não morto, você cai para 1 PV em vez disso. Uso: 1 por descanso longo." },
            { name: "Ímpeto Adrenaline", desc: "Você pode usar uma ação bônus para se mover até seu deslocamento em direção a um inimigo que possa ver." }
        ],
        abilityBonus: { choice: 3, amount: 1 },
        desc: "Orcs são guerreiros ferozes com força e resiliência extraordinárias."
    },
    tiefling: {
        name: "Tiefling",
        source: "PHB 2024",
        size: "Medio",
        speed: 9,
        languages: ["Comum", "Infernal"],
        traits: [
            { name: "Visão no Escuro", desc: "Você pode ver na escuridão até 18m como se fosse luz fraca." },
            { name: "Resistência Infernal", desc: "Você tem resistência a dano de fogo." },
            { name: "Legado Infernal (Abissal)", desc: "Você conhece o truque Taumaturgia. No 3° nível, pode conjurar Repreensão Infernal (2° círculo) 1/descanso longo. No 5° nível, Escuridão 1/descanso longo. Carisma é seu atributo de conjuração." }
        ],
        abilityBonus: { choice: 3, amount: 1 },
        desc: "Tieflings carregam o legado de sangue infernal em suas veias."
    },
    draconato: {
        name: "Draconato",
        source: "PHB 2024",
        size: "Medio",
        speed: 9,
        languages: ["Comum", "Dracônico"],
        traits: [
            { name: "Ancestral Dracônico", desc: "Escolha um tipo de dragão. Você ganha resistência ao tipo de dano associado." },
            { name: "Sopro de Dragão", desc: "Ação: exalar energia destrutiva. Criaturas em uma área de 4,5m fazem TR de Destreza (CD = 8 + mod. Constituição + proficiência). Dano: 1d10 (aumenta nos níveis 5, 11, 17). Usos: bônus de proficiência por descanso longo." }
        ],
        abilityBonus: { choice: 3, amount: 1 },
        draconicAncestry: ["Ácido", "Frio", "Fogo", "Elétrico", "Veneno"],
        desc: "Draconatos são humanoides orgulhosos com ancestralidade dracônica."
    },
    goliath: {
        name: "Goliath",
        source: "PHB 2024",
        size: "Medio",
        speed: 10.5, // 35ft
        languages: ["Comum", "Gigante"],
        traits: [
            { name: "Compleição Grande", desc: "Você conta como uma categoria de tamanho acima para capacidade de carga e carregar/empurrar/puxar." },
            { name: "Resiliência do Gigante", desc: "Você pode usar reação para reduzir dano recebido em 1d12 + mod. Constituição. Usos: bônus de proficiência por descanso longo." },
            { name: "Legado do Gigante", desc: "Escolha um poder ligado a gigantes: Fúria das Nuvens (Rajada), Fúria do Fogo (dano adicional), Fúria da Pedra (empurrar), Fúria da Tempestade (teleporte), Fúria do Gelo (aura fria)." }
        ],
        abilityBonus: { choice: 3, amount: 1 },
        desc: "Goliaths são humanoides maciços ligados aos gigantes, competitivos por natureza."
    },
    aasimar: {
        name: "Aasimar",
        source: "PHB 2024",
        size: "Medio",
        speed: 9,
        languages: ["Comum", "Celestial"],
        traits: [
            { name: "Visão no Escuro", desc: "Você pode ver na escuridão até 18m como se fosse luz fraca." },
            { name: "Resistência Celestial", desc: "Você tem resistência a dano necrótico e radiante." },
            { name: "Mãos Curandeiras", desc: "Ação: toque uma criatura para curar PV igual ao seu nível. Uso: 1 por descanso longo." },
            { name: "Revelação Celestial", desc: "No 3° nível, ação bônus para manifestar um aspecto celestial (Alma Radiante, Olhos Assombrosos, ou Asas Celestiais) por 1 minuto. Dano radiante adicional igual ao seu bônus de proficiência. Uso: 1 por descanso longo." }
        ],
        abilityBonus: { choice: 3, amount: 1 },
        desc: "Aasimars são tocados por poder celestial e carregam uma luz interior."
    },

    // ===== Valda's Spire of Secrets Races =====
    mousefolk: {
        name: "Mousefolk (Povo-Rato)",
        source: "Valda's",
        size: "Pequeno",
        speed: 7.5, // 25ft
        languages: ["Comum", "Mousefolk"],
        traits: [
            { name: "Sentidos Aguçados", desc: "Você tem proficiência em Percepção." },
            { name: "Evasão Ágil", desc: "Você pode se mover através do espaço de criaturas hostis de tamanho Médio ou maior." },
            { name: "Roedor", desc: "Você tem um deslocamento de escalar de 6m." },
            { name: "Furtividade Natural", desc: "Você pode tentar se esconder quando obscurecido por uma criatura de tamanho maior." }
        ],
        abilityBonus: { dex: 2, choice: 1, amount: 1 },
        desc: "Povo-Rato são criaturas pequenas, ágeis e engenhosas que vivem em comunidades apertadas."
    },
    geppettin: {
        name: "Geppettin (Boneco Vivo)",
        source: "Valda's",
        size: "Pequeno",
        speed: 7.5, // 25ft
        languages: ["Comum", "1 idioma adicional"],
        traits: [
            { name: "Construto Vivo", desc: "Você é um Construto. Não precisa comer, beber ou respirar. Imune a doenças. Não precisa dormir, mas deve ficar inativo 6 horas." },
            { name: "Corpo Artificial", desc: "Você é vulnerável a dano de fogo. Você não pode ser curado por magias de cura normais (apenas Remendar pode curá-lo)." },
            { name: "Aparência Inocente", desc: "Você pode se fingir de boneco inanimado. Criaturas devem fazer teste de Investigação contra seu Engano para perceber." },
            { name: "Leveza", desc: "Você pesa apenas 10-15 kg. Tem vantagem em testes de Furtividade para se mover silenciosamente." }
        ],
        abilityBonus: { cha: 2, choice: 1, amount: 1 },
        desc: "Geppettins são bonecos trazidos à vida por magia, com personalidades vibrantes."
    },
    spiritfolk: {
        name: "Spiritfolk (Povo Espiritual)",
        source: "Valda's",
        size: "Medio",
        speed: 9,
        languages: ["Comum", "Silvestre"],
        traits: [
            { name: "Conexão Espiritual", desc: "Você pode lançar Detectar Mal e Bem sem gastar espaço, 1/descanso longo." },
            { name: "Resistência Feérica", desc: "Você tem vantagem em testes de resistência contra ser Enfeitiçado." },
            { name: "Forma Etérea", desc: "Você pode, como ação bônus, ficar parcialmente incorporal até o início do próximo turno. Pode se mover através de criaturas/objetos (recebe 1d10 de força se terminar dentro). Uso: 1/descanso curto." },
            { name: "Idiomas Espirituais", desc: "Você pode se comunicar com bestas e plantas de forma rudimentar." }
        ],
        abilityBonus: { wis: 2, choice: 1, amount: 1 },
        desc: "Povo Espiritual são seres etéreos conectados ao plano dos espíritos."
    },
    half_construct: {
        name: "Meio-Construto",
        source: "Valda's",
        size: "Medio",
        speed: 9,
        languages: ["Comum", "1 idioma adicional"],
        traits: [
            { name: "Corpo Reforçado", desc: "+1 de CA quando não estiver usando armadura pesada." },
            { name: "Constituição Mecânica", desc: "Vantagem em testes de resistência contra veneno e resistência a dano de veneno." },
            { name: "Necessidades Reduzidas", desc: "Você só precisa de metade da comida e água normais. Não precisa respirar." },
            { name: "Membros Integrados", desc: "Você pode integrar uma ferramenta de artesão ao seu corpo. Sempre conta como tendo a ferramenta em mãos." }
        ],
        abilityBonus: { con: 2, choice: 1, amount: 1 },
        desc: "Meio-Construtos são seres parcialmente orgânicos e mecânicos, frutos de experimentação arcana."
    },
    mandrake: {
        name: "Mandrake (Mandragora)",
        source: "Valda's",
        size: "Pequeno",
        speed: 7.5,
        languages: ["Comum", "Silvestre"],
        traits: [
            { name: "Planta", desc: "Seu tipo de criatura é Planta. Você pode realizar fotossíntese: 1 hora sob sol direto conta como uma refeição." },
            { name: "Grito de Mandragora", desc: "Ação: grito que obriga criaturas em 3m a fazer TR de Constituição (CD = 8 + mod. Con + prof) ou ficar atordoada até o fim do próximo turno. Uso: 1/descanso longo." },
            { name: "Regeneração Verde", desc: "No início de cada turno, se estiver sob luz solar e tiver ao menos 1 PV, recupera 1 PV." },
            { name: "Mover Terra", desc: "Você pode usar ação bônus para se enterrar (deslocamento de escavar 1,5m) em terra solta." }
        ],
        abilityBonus: { con: 2, choice: 1, amount: 1 },
        desc: "Mandrakes são plantas humanoides sensíveis, conhecidas por seus gritos ensurdecedores."
    }
};

// Size effects on speed and other mechanics
const SIZE_MODIFIERS = {
    "Pequeno": { carryMultiplier: 0.75, grapplerDisadv: true },
    "Medio": { carryMultiplier: 1, grapplerDisadv: false },
    "Grande": { carryMultiplier: 2, grapplerDisadv: false }
};
