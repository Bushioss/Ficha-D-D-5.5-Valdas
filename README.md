# Ficha D&D 5.5e + Valda's Spire of Secrets

Sistema completo de criação e gerenciamento de fichas de personagem para **Dungeons & Dragons 5ª Edição (2024)** combinado com o suplemento **Valda's Spire of Secrets**.

## Funcionalidades

### Criação de Personagem em 5 Etapas

1. **Escolha de Espécie** — 15 raças disponíveis com traços raciais automáticos
2. **Escolha de Classe** — 22 classes com subclasses e progressão completa até nível 20
3. **Definição de Atributos** — Compra de Pontos (27 pts), Conjunto Padrão ou Manual
4. **Detalhes** — Nome, alinhamento, antecedente, personalidade
5. **Ficha Completa** — Visualização com todos os cálculos automáticos

### Cálculos Automáticos

| Mecânica | Descrição |
|----------|-----------|
| **Modificadores** | Calculados para todos os 6 atributos |
| **Pontos de Vida** | Baseado em Dado de Vida + CON mod por nível. Inclui bônus racial (Anão: +1/nível) |
| **Classe de Armadura** | Inclui Defesa sem Armadura (Bárbaro: 10+DES+CON, Monge: 10+DES+SAB) |
| **Deslocamento** | Baseado no tamanho da raça + bônus de classe (Bárbaro nv5+, Monge nv2+) |
| **Bônus de Proficiência** | Calculado pelo nível total do personagem |
| **Iniciativa** | Modificador de Destreza |
| **Testes de Resistência** | Com marcação de proficiência da classe |
| **Espaços de Magia** | Calculados para conjuradores, incluindo multiclasse |
| **CD de Magia** | 8 + proficiência + modificador do atributo de conjuração |

### Sistema de Multiclasse Completo

- **Validação de pré-requisitos** automática (FOR 13, DES 13, etc. com operadores AND/OR)
- **Cálculo de espaços de magia multiclasse** (conjuradores completos, meio, terço)
- **Espaços de Pacto do Bruxo** separados do pool multiclasse
- **Nível máximo 20** com suporte a qualquer combinação de classes
- **Dados de Vida mistos** (ex: 5d10 + 3d8)

### Level-Up (Subida de Nível)

- Escolha subir em qualquer classe que atenda os pré-requisitos
- **Escolha de subclasse** automática quando atingir o nível correto
- **Aumento de Atributo (ASI)** — +2 pontos para distribuir (máx 20)
- **Novas características** adicionadas automaticamente

### Persistência

- Salva automaticamente no **localStorage** do navegador
- Exportação em **JSON** para backup/compartilhamento
- Botão "Nova Ficha" para recomeçar

---

## Conteúdo Incluído

### Espécies (15 total)

#### Livro do Jogador 2024 (10)
| Espécie | Tamanho | Velocidade | Destaque |
|---------|---------|------------|----------|
| Humano | Médio | 9m | Versátil, Engenhosidade, Inspiração |
| Elfo | Médio | 9m | Transe, Sentidos Aguçados, Linhagem Feérica |
| Anão | Médio | 9m | Tenacidade (+1 PV/nível), Resiliência, Pedra |
| Halfling | Pequeno | 9m | Sortudo, Corajoso, Naturalmente Furtivo |
| Gnomo | Pequeno | 9m | Esperteza Gnômica, Prestidigitação |
| Orc | Médio | 9m | Resistência Implacável, Ímpeto |
| Tiefling | Médio | 9m | Resistência Infernal (fogo), Legado Infernal |
| Draconato | Médio | 9m | Sopro de Dragão, Ancestral Dracônico |
| Goliath | Médio | 10.5m | Compleição Grande, Resiliência do Gigante |
| Aasimar | Médio | 9m | Resistência Celestial, Mãos Curandeiras |

#### Valda's Spire of Secrets (5)
| Espécie | Tamanho | Velocidade | Destaque |
|---------|---------|------------|----------|
| Mousefolk (Povo-Rato) | Pequeno | 7.5m | Roedor (escalar), Furtividade Natural |
| Geppettin (Boneco Vivo) | Pequeno | 7.5m | Construto Vivo, Aparência Inocente |
| Spiritfolk (Povo Espiritual) | Médio | 9m | Forma Etérea, Conexão Espiritual |
| Meio-Construto | Médio | 9m | Corpo Reforçado (+1 CA), Membros Integrados |
| Mandrake (Mandragora) | Pequeno | 7.5m | Grito de Mandragora, Regeneração Verde |

### Classes (22 total) com 142 Subclasses

#### Livro do Jogador 2024 (12 classes, 96 subclasses)

| Classe | DV | Atributo | Conjurador | Subclasses |
|--------|----|----------|------------|------------|
| Bárbaro | d12 | FOR | Não | 10 (4 PHB + 6 Valda) |
| Bardo | d8 | CHA | Completo | 10 (4 PHB + 6 Valda) |
| Bruxo | d8 | CHA | Pacto | 10 (4 PHB + 6 Valda) |
| Clérigo | d8 | SAB | Completo | 10 (4 PHB + 6 Valda) |
| Druida | d8 | SAB | Completo | 10 (4 PHB + 6 Valda) |
| Feiticeiro | d6 | CHA | Completo | 10 (4 PHB + 6 Valda) |
| Guerreiro | d10 | FOR | Não* | 10 (4 PHB + 6 Valda) |
| Ladino | d8 | DES | Não* | 10 (4 PHB + 6 Valda) |
| Mago | d6 | INT | Completo | 10 (4 PHB + 6 Valda) |
| Monge | d8 | DES | Não | 10 (4 PHB + 6 Valda) |
| Paladino | d10 | FOR | Meio | 10 (4 PHB + 6 Valda) |
| Patrulheiro | d10 | DES | Meio | 10 (4 PHB + 6 Valda) |

*Cavaleiro Arcano (Guerreiro) e Trapaceiro Arcano (Ladino) possuem conjuração limitada via subclasse.

#### Valda's Spire of Secrets (10 classes, 46 subclasses)

| Classe | DV | Atributo | Conjurador | Subclasses |
|--------|----|----------|------------|------------|
| Artífice | d8 | INT | Meio | 4 (Alquimista, Armeiro, Artilheiro, Forjador) |
| Craftsman (Artesão) | d10 | INT | Não | 4 (Thundersmith, Maestro, Mecânico, Bombalquimista) |
| Investigador | d8 | INT | Não | 4 (Antiquário, Detetive, Médium, Espião) |
| Necromante | d6 | INT | Completo | 4 (Ceifador, Pragas, Mortos-Vivos, Costureiro) |
| Mago de Guerra | d6 | INT | Especial* | 4 (Bispo, Cavaleiro, Torre, Lança) |
| Bruxa | d6 | INT | Completo | 4 (Branca, Negra, Verde, Chá) |
| Sentinela (Warden) | d10 | CON | Não | 3 (Ira de Sangue, Vigia Cinza, Guardião Verde) |
| Mártir | d10 | CON | Não | 3 (Flagelo, Cordeiro, Penitente) |
| Capitão | d10 | CHA | Não | 3 (Comandante, Corsário, Nobre) |

*O Mago de Guerra foca em truques de combate aprimorados em vez de espaços de magia tradicionais.

---

## Regras de Multiclasse Implementadas

```
Pré-requisitos para Multiclasse:
┌────────────┬──────────────────────────┐
│ Classe     │ Requisito                │
├────────────┼──────────────────────────┤
│ Bárbaro    │ FOR 13                   │
│ Bardo      │ CHA 13                   │
│ Bruxo      │ CHA 13                   │
│ Clérigo    │ SAB 13                   │
│ Druida     │ SAB 13                   │
│ Feiticeiro │ CHA 13                   │
│ Guerreiro  │ FOR 13 OU DES 13         │
│ Ladino     │ DES 13                   │
│ Mago       │ INT 13                   │
│ Monge      │ DES 13 E SAB 13          │
│ Paladino   │ FOR 13 E CHA 13          │
│ Patrulheiro│ DES 13 E SAB 13          │
│ Artífice   │ INT 13                   │
│ Craftsman  │ INT 13                   │
│ Investigador│INT 13                   │
│ Necromante │ INT 13                   │
│ Mago Guerra│ INT 13                   │
│ Bruxa      │ INT 13                   │
│ Sentinela  │ CON 13                   │
│ Mártir     │ CON 13                   │
│ Capitão    │ CHA 13                   │
└────────────┴──────────────────────────┘
```

### Cálculo de Espaços de Magia Multiclasse

- **Conjurador Completo** (Bardo, Clérigo, Druida, Feiticeiro, Mago, Necromante, Bruxa): nível completo
- **Meio Conjurador** (Paladino, Patrulheiro, Artífice): metade do nível (arredondado para baixo)
- **Terço Conjurador** (subclasses como Cavaleiro Arcano): um terço do nível
- **Pacto (Bruxo)**: espaços separados, não soma no cálculo multiclasse
- **Mago de Guerra**: não contribui para espaços multiclasse

---

## Tecnologia

- **HTML5 + CSS3 + JavaScript vanilla** — Zero dependências
- **Responsivo** — Funciona em desktop, tablet e celular
- **Tema escuro** com cores inspiradas em D&D
- **localStorage** para persistência automática
- **Exportação JSON** para backup/compartilhamento

## Como Usar

1. Clone o repositório:
```bash
git clone https://github.com/Bushioss/Ficha-D-D-5.5-Valdas.git
```

2. Abra `index.html` no navegador (ou use um servidor local):
```bash
# Opção 1: Abrir diretamente
open index.html

# Opção 2: Servidor local (Python)
python3 -m http.server 8000

# Opção 3: Servidor local (Node)
npx serve .
```

3. Siga as 5 etapas para criar seu personagem!

## Estrutura do Projeto

```
Ficha-D-D-5.5-Valdas/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos (tema escuro responsivo)
├── js/
│   ├── data/
│   │   ├── races.js        # Dados de todas as 15 espécies
│   │   ├── classes.js      # Dados de todas as 22 classes + 142 subclasses
│   │   └── spells.js       # Cálculo de espaços de magia multiclasse
│   ├── engine.js           # Motor de cálculos (PV, CA, velocidade, etc.)
│   ├── ui.js               # Renderização da interface
│   └── app.js              # Controlador principal e estado
└── README.md               # Esta documentação
```

## Fontes

- **Livro do Jogador 2024** (Player's Handbook 2024) — Wizards of the Coast
- **Valda's Spire of Secrets** — Mage Hand Press

## Licença

Este projeto é para uso pessoal e educacional. Dungeons & Dragons é marca registrada da Wizards of the Coast. Valda's Spire of Secrets é publicado pela Mage Hand Press.
