G.H.O.S.T. v0.2.0 - Framework Structure
═══════════════════════════════════════

/
├── boot.js                          # v0.2.0 - Orchestrateur (+3 daemons)
├── manifest.json                    # v0.2.0 - Tracking
├── deploy-ghost.js                  # v0.1.1 - Déploiement GitHub
├── README.md
├── CHANGELOG.md
│
├── /core/                           # Logique centrale
│   ├── spider.js                    # v0.1.0 - Auto-root BFS
│   ├── deploy-workers.js            # v0.2.0 - MODIFIÉ: Auto-target
│   ├── target-selector.js           # v0.2.0 - NEW: Meilleure cible
│   └── auto-spider.js               # v0.2.0 - NEW: Daemon re-root
│
├── /lib/                            # Bibliothèques
│   ├── state-manager.js             # v0.1.0 - Persistence
│   └── debug.js                     # v0.1.0 - DEBUG multi-niveaux
│
├── /workers/                        # Workers minimalistes
│   ├── hack.js                      # v0.1.1 - HOTFIX: Boucle infinie
│   ├── grow.js                      # v0.1.1 - HOTFIX: Boucle infinie
│   └── weaken.js                    # v0.1.1 - HOTFIX: Boucle infinie
│
├── /managers/                       # Gestionnaires intelligents
│   └── server-manager.js            # v0.2.0 - NEW: Purchased servers Matrix
│
├── /tools/                          # Outils utilitaires
│   ├── telemetry.js                 # v0.1.0 - Monitoring daemon
│   ├── blackbox.js                  # v0.1.0 - Contract solver
│   └── log-action.js                # v0.1.0 - Logger actions
│
└── /state/                          # Persistence (auto-généré)
    ├── network-status.json
    ├── performance-metrics.json
    ├── player-stats.json
    ├── daemon-heartbeat.json
    ├── operator-actions.json
    ├── version-tracking.json
    └── best-target.json             # v0.2.0 - NEW: Target optimale

NOUVEAUTÉS v0.2.0:
✨ target-selector.js - Algorithme scoring intelligent
✨ auto-spider.js - Daemon re-root + redeploy (5min)
✨ server-manager.js - Purchased servers Matrix (2min)
🔧 deploy-workers.js - Auto-target depuis best-target.json
🔧 boot.js - Lance les 3 nouveaux daemons