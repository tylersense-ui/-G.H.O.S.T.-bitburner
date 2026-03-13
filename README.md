# 🎯 G.H.O.S.T. v0.1.0

**Godlike Heuristic Operator & Strategy Toolkit**

Framework d'automatisation Bitburner pour BitNode-1.1 (virgin run, no Source Files)

---

## 📋 DESCRIPTION

G.H.O.S.T. est un framework modulaire conçu pour automatiser la progression dans Bitburner, en particulier pour les débuts de partie (BN1.1 sans Source Files débloqués).

**Objectifs Phase 1 (v0.1.0) :**
- ✅ Auto-root complet du réseau
- ✅ Déploiement intelligent de workers
- ✅ Monitoring permanent (telemetry)
- ✅ Résolution automatique de contrats
- ✅ Bootstrap économique ($100k-500k)

---

## 🚀 INSTALLATION

### Méthode 1 : Déploiement GitHub (Recommandé)

1. **Créer le repo GitHub :**
   - Nom : `ghost-bitburner`
   - Visibilité : Public

2. **Push le code :**
   ```bash
   # Voir section "Commandes Git" ci-dessous
   ```

3. **Dans le jeu :**
   ```javascript
   // Éditer deploy-ghost.js : changer DEFAULT_USER = "VotreUsername"
   run deploy-ghost.js
   ```

4. **Lancer le framework :**
   ```javascript
   run /boot.js
   ```

### Méthode 2 : Manuel (Via VSCode)

1. Copier tous les fichiers dans votre éditeur in-game
2. Respecter l'arborescence ci-dessous
3. `run /boot.js`

---

## 📁 ARCHITECTURE

```
/
├── boot.js                    # Point d'entrée principal
├── manifest.json              # Tracking fichiers/versions
├── deploy-ghost.js            # Script déploiement GitHub
├── README.md                  # Documentation
├── CHANGELOG.md               # Historique versions
│
├── /core/                     # Logique centrale
│   ├── spider.js              # Auto-root network (BFS + NUKE)
│   └── deploy-workers.js      # Distribution workers sur réseau
│
├── /lib/                      # Bibliothèques réutilisables
│   ├── state-manager.js       # Persistence API (/state/)
│   └── debug.js               # Système DEBUG multi-niveaux
│
├── /workers/                  # Workers minimalistes (~1.7GB RAM)
│   ├── hack.js                # Worker hack
│   ├── grow.js                # Worker grow
│   └── weaken.js              # Worker weaken
│
├── /managers/                 # Gestionnaires intelligents
│   └── (vide - phase future)
│
├── /state/                    # Persistence (fichiers JSON générés)
│   ├── network-status.json    # État réseau
│   ├── performance-metrics.json
│   ├── player-stats.json
│   ├── daemon-heartbeat.json
│   ├── operator-actions.json
│   └── version-tracking.json
│
└── /tools/                    # Outils utilitaires
    ├── telemetry.js           # Monitoring daemon permanent
    ├── blackbox.js            # Contract solver (8 algorithmes)
    └── log-action.js          # Logger actions manuelles
```

---

## 🎮 USAGE

### Démarrage Simple

```javascript
run /boot.js
```

**Ce que fait boot.js :**
1. Lance telemetry daemon (monitoring permanent)
2. Lance spider (auto-root network)
3. Lance deploy-workers (déploie workers sur target)
4. Lance blackbox (résout contrats en background)

### Démarrage Avec Options

```javascript
// Mode verbose
run /boot.js --debug 2

// Target spécifique
run /boot.js --target foodnstuff

// Combiné
run /boot.js --debug 2 --target joesguns
```

### Scripts Individuels

```javascript
// Monitoring seul
run /tools/telemetry.js
run /tools/telemetry.js --debug 2 --interval 60000

// Auto-root seul
run /core/spider.js
run /core/spider.js --debug 2

// Déploiement manuel
run /core/deploy-workers.js n00dles
run /core/deploy-workers.js foodnstuff --debug 2

// Contract solver seul
run /tools/blackbox.js
run /tools/blackbox.js --debug 3

// Logger action manuelle
run /tools/log-action.js "Bought NeuroFlux x10"
```

---

## 🐛 SYSTÈME DEBUG

**4 Niveaux de Verbosité :**

- **SILENT (0)** : Toasts succès uniquement, pas de logs
- **NORMAL (1)** : Infos importantes (défaut production)
- **VERBOSE (2)** : Détails + metrics + timing
- **ULTRA (3)** : Debug complet (chaque action)

**Utilisation :**
```javascript
run /boot.js --debug 0  // Silent
run /boot.js --debug 1  // Normal (défaut)
run /boot.js --debug 2  // Verbose
run /boot.js --debug 3  // Ultra
```

**Features DEBUG :**
- ✅ Logs conditionnels selon niveau
- ✅ Toasts automatiques (succès, erreur, warning, info)
- ✅ Auto-tail activé
- ✅ Couleurs et icônes
- ✅ Timing et metrics

---

## 📊 MONITORING

### Telemetry Daemon

Lance en permanence, log toutes les 30s :
- État réseau (serveurs scannés/rootés)
- Performance (threads, money, revenue/s)
- Stats joueur (hacking level, BitNode, RAM)
- Versions actives des scripts
- Heartbeat (uptime, cycle)

**Fichiers générés dans `/state/` :**
- `network-status.json`
- `performance-metrics.json`
- `player-stats.json`
- `version-tracking.json`
- `daemon-heartbeat.json`

**Consulter :**
```javascript
tail /tools/telemetry.js
cat /state/network-status.json
```

---

## 🎯 ROADMAP BN1

### Phase 1 : Bootstrap Économique (v0.1.0) ✅
- Auto-root réseau
- Workers déployés
- Monitoring actif
- Objectif : $100k-500k

### Phase 2 : Expansion (v0.2.0) 🚧
- Purchased servers
- Home RAM upgrades
- Premières factions (CyberSec, NiteSec)
- Objectif : $10M+

### Phase 3 : Endgame BN1 (v0.3.0) 📅
- Daedalus invitation
- The Red Pill
- Hack w0r1d_d43m0n
- BitNode destruction

---

## 🛠️ TECHNOLOGIES

- **Bitburner** : v2.0+
- **Language** : JavaScript (ES6+)
- **APIs** : Netscript 2.0 (NS)
- **Deployment** : GitHub + wget
- **Persistence** : JSON files (/state/)

---

## 📝 CHANGELOG

Voir [CHANGELOG.md](./CHANGELOG.md)

---

## 👤 AUTEUR

**Claude** - Godlike AI Operator

---

## 📜 LICENCE

Open source - Usage libre pour Bitburner

---

## 🙏 REMERCIEMENTS

- **Bible du Hacker** (Chapitre 1.2) - BlackBox algorithm base
- **BN1 Roadmap** - Progression guide
- **NS API Reference** - API documentation

---

## 🔗 LIENS UTILES

- [Bitburner Official](https://danielyxie.github.io/bitburner/)
- [Bitburner Documentation](https://bitburner-official.readthedocs.io/)
- [GitHub Repo](https://github.com/USERNAME/ghost-bitburner)

---

**G.H.O.S.T. v0.1.0 - Godlike Heuristic Operator & Strategy Toolkit**

*"Automated Excellence, Human-Free."*
