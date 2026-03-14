# 📁 G.H.O.S.T. v0.2.0 - ARCHITECTURE COMPLÈTE TRINITY MATRIX

```
═══════════════════════════════════════════════════════════════════
 GODLIKE HEURISTIC OPERATOR & STRATEGY TOOLKIT v0.2.0
 TRINITY MATRIX - Full Automation Framework
═══════════════════════════════════════════════════════════════════

📦 STRUCTURE COMPLÈTE
───────────────────────────────────────────────────────────────────

G.H.O.S.T.-bitburner/
│
├── boot.js                          ★ v0.2.0 - MODIFIÉ
│   └── Orchestrateur principal Trinity Matrix
│       ├── STEP 1: Telemetry daemon
│       ├── STEP 2: Spider (auto-root initial)
│       ├── STEP 3: Target Selector (initial run) ★ NEW
│       ├── STEP 4: Deploy Workers (auto-target) ★ MODIFIED
│       ├── STEP 5: BlackBox contract solver
│       ├── STEP 6: Auto-Spider daemon (5min) ★ NEW
│       └── STEP 7: Server Manager daemon (2min) ★ NEW
│
├── manifest.json                    v0.2.0 - À mettre à jour
├── deploy-ghost.js                  v0.1.1
├── README.md                        À mettre à jour
└── CHANGELOG.md                     À mettre à jour

───────────────────────────────────────────────────────────────────
📂 /core/ - LOGIQUE CENTRALE
───────────────────────────────────────────────────────────────────

├── spider.js                        v0.1.0
│   └── Auto-root BFS network scan + NUKE
│       ├── Détecte port openers disponibles
│       ├── Ouvre ports (BruteSSH, FTPCrack, etc.)
│       └── NUKE si ports suffisants
│
├── deploy-workers.js                ★ v0.2.0 - MODIFIÉ
│   └── Déploiement workers sur réseau rooté
│       ├── AUTO-TARGET: Lit /state/best-target.json ★ NEW
│       ├── Fallback n00dles si aucune target
│       ├── Copie workers sur tous serveurs rootés
│       ├── Calcul threads optimaux
│       └── Stratégie: 50% weaken, 30% grow, 20% hack
│
├── target-selector.js               ★ v0.2.0 - NEW
│   └── Sélecteur intelligent de cible optimale
│       ├── Scan tous serveurs rootés
│       ├── Filtre par hack level accessible
│       ├── Algorithme scoring:
│       │   score = (maxMoney/1M)*0.4 + (100/hackTime)*0.3
│       │         + (hackChance)*0.2 + (100/security)*0.1
│       ├── Tri par score décroissant
│       └── Sauvegarde: /state/best-target.json
│
└── auto-spider.js                   ★ v0.2.0 - NEW
    └── Daemon permanent re-root + redeploy
        ├── Cycle: 5 minutes (configurable)
        ├── Workflow:
        │   1. Lance spider.js (auto-root)
        │   2. Compte serveurs rootés
        │   3. Lance target-selector.js
        │   4. Si nouveaux serveurs → redéploie workers
        │   5. Toast notifications
        └── Protection: Exception global-kill

───────────────────────────────────────────────────────────────────
📂 /lib/ - BIBLIOTHÈQUES RÉUTILISABLES
───────────────────────────────────────────────────────────────────

├── debug.js                         v0.1.0
│   └── Système DEBUG multi-niveaux
│       ├── 4 niveaux: SILENT(0), NORMAL(1), VERBOSE(2), ULTRA(3)
│       ├── Classe Debug: .normal(), .verbose(), .ultra()
│       ├── Toasts: .toastSuccess/Error/Warning/Info()
│       ├── Timing: .startTimer(), .endTimer()
│       ├── Display: .header(), .separator(), .clear()
│       └── Métriques: .money(), .metric()
│
└── state-manager.js                 v0.1.0
    └── API persistence /state/
        ├── .save(filename, data)
        ├── .load(filename, parseJSON)
        ├── .exists(), .delete(), .list()
        ├── .cleanup(maxAge)
        └── .append(filename, message)

───────────────────────────────────────────────────────────────────
📂 /workers/ - WORKERS MINIMALISTES (~1.7GB RAM each)
───────────────────────────────────────────────────────────────────

├── hack.js                          v0.1.1 - HOTFIX
│   └── while(true) { await ns.hack(target); }
│
├── grow.js                          v0.1.1 - HOTFIX
│   └── while(true) { await ns.grow(target); }
│
└── weaken.js                        v0.1.1 - HOTFIX
    └── while(true) { await ns.weaken(target); }

───────────────────────────────────────────────────────────────────
📂 /managers/ - GESTIONNAIRES INTELLIGENTS
───────────────────────────────────────────────────────────────────

└── server-manager.js                ★ v0.2.0 - NEW
    └── Gestionnaire purchased servers Matrix
        ├── Cycle: 2 minutes (configurable)
        ├── 25 noms Matrix:
        │   neo, trinity, morpheus, oracle, tank, dozer,
        │   mouse, cypher, apoc, switch, zion, sentinel,
        │   merovingian, keymaker, architect, seraph,
        │   persephone, nebuchadnezzar, logos, vigilant,
        │   osiris, agent-smith, construct, red-pill,
        │   white-rabbit
        ├── Logique achat:
        │   - Si < 25 servers ET argent > $55k → Achète 8GB
        │   - Upgrade path: 8→16→32→64→128→256→512→1024GB
        ├── Déploie workers après chaque achat/upgrade
        └── Protection: Exception global-kill

───────────────────────────────────────────────────────────────────
📂 /tools/ - OUTILS UTILITAIRES
───────────────────────────────────────────────────────────────────

├── telemetry.js                     v0.1.0
│   └── Daemon monitoring permanent (30s cycle)
│       ├── Modules:
│       │   - Network status (serveurs rootés)
│       │   - Performance metrics (threads, money, revenue)
│       │   - Player stats (hacking, BitNode, RAM)
│       │   - Version tracking (fichiers framework)
│       │   - Heartbeat (uptime, cycle)
│       └── Sauvegarde: /state/*.json
│
├── blackbox.js                      v0.1.0
│   └── Contract solver automatique (.cct)
│       ├── 8 algorithmes:
│       │   - Find Largest Prime Factor
│       │   - Subarray with Maximum Sum (Kadane)
│       │   - Total Ways to Sum (DP)
│       │   - Algorithmic Stock Trader I & II
│       │   - Generate IP Addresses
│       │   - Encryption I & II (Caesar, Vigenère)
│       ├── Cycle: 30s (configurable)
│       └── Toast succès pour chaque contrat résolu
│
└── log-action.js                    v0.1.0
    └── Logger actions manuelles opérateur
        ├── Historique: /state/operator-actions.json
        ├── Context auto: money, hacking, time
        └── Limite: 100 dernières entrées

───────────────────────────────────────────────────────────────────
📂 /state/ - PERSISTENCE (auto-généré par daemons)
───────────────────────────────────────────────────────────────────

├── network-status.json              (telemetry)
│   └── Serveurs scannés/rootés, RAM réseau, processus actifs
│
├── performance-metrics.json         (telemetry)
│   └── Money, revenue/s, threads totaux, hacking level
│
├── player-stats.json                (telemetry)
│   └── Hacking, BitNode, home RAM, purchased servers
│
├── version-tracking.json            (telemetry)
│   └── Versions actives des fichiers framework
│
├── daemon-heartbeat.json            (telemetry)
│   └── Timestamp, cycle, PID, uptime
│
├── operator-actions.json            (log-action)
│   └── Historique actions manuelles (achats, upgrades, etc.)
│
└── best-target.json                 ★ NEW (target-selector)
    └── Target optimale calculée
        ├── hostname, score, maxMoney
        ├── hackTime, hackChance, securityLevel
        └── Top 5 candidates

───────────────────────────────────────────────────────────────────
📂 /docs/ - DOCUMENTATION
───────────────────────────────────────────────────────────────────

├── HOTFIX_v0.1.1.md
├── GIT_COMMANDS.md
└── TRINITY_v0.2.0.md                ★ NEW - Ce fichier

═══════════════════════════════════════════════════════════════════
🎯 NOUVEAUTÉS v0.2.0 TRINITY MATRIX
═══════════════════════════════════════════════════════════════════

✨ FICHIERS NOUVEAUX (4):
   1. /core/target-selector.js      - Sélection intelligente cible
   2. /core/auto-spider.js           - Daemon re-root automatique
   3. /managers/server-manager.js    - Purchased servers Matrix
   4. /state/best-target.json        - Target optimale (généré)

🔧 FICHIERS MODIFIÉS (2):
   1. /core/deploy-workers.js        - Auto-target depuis best-target.json
   2. /boot.js                        - Lance 3 nouveaux daemons

📦 TOTAL FICHIERS:
   - Core: 4 (spider, deploy-workers★, target-selector★, auto-spider★)
   - Lib: 2 (debug, state-manager)
   - Workers: 3 (hack, grow, weaken)
   - Managers: 1★ (server-manager★)
   - Tools: 3 (telemetry, blackbox, log-action)
   - Deployment: 2 (boot★, deploy-ghost)
   - Docs: 3 (README, CHANGELOG, manifest)
   
   TOTAL: 18 fichiers (vs 13 en v0.1.1)

═══════════════════════════════════════════════════════════════════
🚀 WORKFLOW COMPLET v0.2.0
═══════════════════════════════════════════════════════════════════

BOOT SÉQUENCE:
└─> boot.js
    ├─> telemetry.js (daemon 30s)
    ├─> spider.js (root initial)
    ├─> target-selector.js (calcul initial) ★ NEW
    ├─> deploy-workers.js (auto-target) ★ MODIFIED
    ├─> blackbox.js (daemon 30s)
    ├─> auto-spider.js (daemon 5min) ★ NEW
    └─> server-manager.js (daemon 2min) ★ NEW

DAEMONS PERMANENTS:
├─ telemetry.js      → 30s  → /state/*.json
├─ blackbox.js       → 30s  → Résout contrats
├─ auto-spider.js    → 5min → Re-root + redeploy ★ NEW
└─ server-manager.js → 2min → Achète/upgrade Matrix ★ NEW

AUTO-SPIDER CYCLE (5min):
1. Run spider.js (auto-root nouveaux serveurs)
2. Compte serveurs rootés (détecte nouveaux)
3. Run target-selector.js (recalcule meilleure cible)
4. Si nouveaux serveurs → redeploy workers
5. Toast notifications si changements

SERVER MANAGER CYCLE (2min):
1. Vérifie argent disponible
2. Si < 25 servers ET $55k → Achète server 8GB (nom Matrix)
3. Pour chaque server → Upgrade si argent suffisant
4. Déploie workers après achat/upgrade

TARGET SELECTOR ALGORITHM:
score = (maxMoney/1M) * 0.4      // 40% poids argent max
      + (100/hackTime) * 0.3     // 30% poids vitesse
      + (hackChance) * 0.2       // 20% poids probabilité
      + (100/securityLevel) * 0.1 // 10% poids sécurité

═══════════════════════════════════════════════════════════════════
💰 IMPACT ATTENDU v0.2.0
═══════════════════════════════════════════════════════════════════

TARGET SELECTOR:
✅ +200-500% revenus (meilleure cible que n00dles)
✅ Adaptation automatique au niveau hacking
✅ Toujours optimal sans intervention

AUTO-SPIDER:
✅ Nouveaux serveurs rootés automatiquement (5min)
✅ Redéploiement automatique workers
✅ Optimisation continue de la target
✅ Zéro intervention manuelle

SERVER MANAGER:
✅ 25 servers Matrix auto-achetés progressivement
✅ Upgrade automatique (8→16→32→...→1TB)
✅ Déploiement automatique post-action
✅ Expansion RAM exponentielle

RÉSULTAT GLOBAL:
💰 $1M-5M/heure de revenus passifs (vs $100k/h en v0.1.1)
🚀 Progression exponentielle automatique
🎯 Zéro intervention manuelle nécessaire
🌐 Framework entièrement autonome

═══════════════════════════════════════════════════════════════════
📝 STANDARDS G.H.O.S.T. (APPLIQUÉS PARTOUT)
═══════════════════════════════════════════════════════════════════

✅ Headers ASCII art G.H.O.S.T. complets
✅ @file @version @author @description @usage @commands @changelog
✅ Système DEBUG multi-niveaux (0-3) intégré
✅ ns.tail() + ns.toast() + icônes partout
✅ import { Debug } from "/lib/debug.js"
✅ import { StateManager } from "/lib/state-manager.js"
✅ JSDoc complet
✅ Protection global-kill (daemons)
✅ --debug argument standard

═══════════════════════════════════════════════════════════════════
🎮 COMMANDES ESSENTIELLES
═══════════════════════════════════════════════════════════════════

# Boot complet Trinity Matrix
run /boot.js

# Monitoring
tail /tools/telemetry.js
tail /core/auto-spider.js
tail /managers/server-manager.js

# Vérification target
cat /state/best-target.json

# Re-calcul target manuel
run /core/target-selector.js

# Redéploiement manuel
run /core/deploy-workers.js               # Auto-target
run /core/deploy-workers.js joesguns      # Target spécifique

═══════════════════════════════════════════════════════════════════

G.H.O.S.T. v0.2.0 - TRINITY MATRIX
"Follow the White Rabbit, Neo."
```
