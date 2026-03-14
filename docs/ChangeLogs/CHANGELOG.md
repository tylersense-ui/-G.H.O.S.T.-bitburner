# 📝 CHANGELOG - G.H.O.S.T.

Tous les changements notables du framework G.H.O.S.T. seront documentés ici.

Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)

---

## [0.1.0] - 2025-01-XX

### 🎉 Initial Release - BN1.1 Bootstrap

**Première version complète du framework G.H.O.S.T. pour BitNode-1.1 (virgin run, no Source Files)**

### ✨ Ajouté

#### Core Infrastructure
- **`/boot.js`** - Point d'entrée principal, orchestrateur de démarrage
  - Lance séquence : telemetry → spider → deploy-workers → blackbox
  - Target automatique : n00dles (early game)
  - Support arguments : `--debug`, `--target`

- **`/core/spider.js`** - Auto-root network scanner
  - Scan BFS complet du réseau
  - Détection automatique port openers disponibles
  - NUKE automatique si ports suffisants
  - Toast pour chaque root obtenu
  - Statistiques finales (rootés/total)

- **`/core/deploy-workers.js`** - Déploiement intelligent workers
  - Copie workers sur tous serveurs rootés avec RAM
  - Calcul threads optimaux par serveur
  - Stratégie : 50% weaken, 30% grow, 20% hack
  - Killall avant déploiement (nettoyage)

#### Libraries
- **`/lib/debug.js`** - Système DEBUG multi-niveaux réutilisable
  - 4 niveaux : SILENT (0), NORMAL (1), VERBOSE (2), ULTRA (3)
  - Classe `Debug` avec méthodes helper
  - Toasts intégrés : `.toastSuccess()`, `.toastError()`, `.toastWarning()`, `.toastInfo()`
  - Timing : `.startTimer()`, `.endTimer()`
  - Métriques : `.money()`, `.metric()`
  - Display : `.header()`, `.separator()`, `.clear()`
  - Icônes prédéfinis : ✅ ❌ ⚠️ ℹ️ 💰 🌐 ⚡ 🔒 🎯 🚀

- **`/lib/state-manager.js`** - API persistence pour /state/
  - `.save()` - Sauvegarde JSON
  - `.load()` - Chargement avec auto-parsing
  - `.exists()`, `.delete()`, `.list()`
  - `.cleanup()` - Nettoyage vieux fichiers
  - `.append()` - Logs texte

#### Workers (Ultra-light ~1.7GB RAM)
- **`/workers/hack.js`** - Worker minimal hack
- **`/workers/grow.js`** - Worker minimal grow
- **`/workers/weaken.js`** - Worker minimal weaken

#### Tools
- **`/tools/telemetry.js`** - Daemon monitoring permanent
  - 6 modules : network, performance, player, versions, batcher, heartbeat
  - Update toutes les 30s (configurable)
  - Sauvegarde JSON dans /state/
  - Integration système DEBUG
  - Survie au global-kill (protection PID)

- **`/tools/blackbox.js`** - Solveur automatique contrats (.cct)
  - 8 algorithmes supportés :
    - Find Largest Prime Factor
    - Subarray with Maximum Sum (Kadane)
    - Total Ways to Sum (DP)
    - Algorithmic Stock Trader I & II
    - Generate IP Addresses
    - Encryption I & II (Caesar, Vigenère)
  - Scan BFS réseau
  - Cycle 30s (configurable)
  - Toast pour chaque succès
  - Stats par cycle

- **`/tools/log-action.js`** - Logger actions manuelles opérateur
  - Historique persistant /state/operator-actions.json
  - Context automatique (money, hacking, time)
  - Limite 100 entrées

#### Deployment
- **`/deploy-ghost.js`** - Déploiement automatique depuis GitHub
  - Wget tous les fichiers framework
  - Support arguments : `--user`, `--branch`
  - Vérification intégrité
  - Instructions post-deploy

- **`/manifest.json`** - Tracking fichiers et versions
  - Liste complète fichiers framework
  - Features documentation
  - Phases roadmap
  - Métadonnées deployment

#### Documentation
- **`/README.md`** - Documentation principale complète
  - Installation (GitHub + manuel)
  - Architecture détaillée
  - Usage (tous les scripts)
  - Système DEBUG
  - Monitoring
  - Roadmap BN1

- **`/CHANGELOG.md`** - Ce fichier
  - Historique versions
  - Format Keep a Changelog

### 🎯 Objectifs Phase 1 Atteints
- ✅ Auto-root complet du réseau
- ✅ Déploiement intelligent de workers
- ✅ Monitoring permanent (telemetry)
- ✅ Résolution automatique de contrats
- ✅ Bootstrap économique ($100k-500k target)

### 📊 Statistiques Code
- **Total fichiers** : 13
- **Total lignes** : ~2500+
- **Core scripts** : 3
- **Lib modules** : 2
- **Workers** : 3
- **Tools** : 3
- **Deployment** : 2

### 🛠️ Technologies
- Bitburner v2.0+
- JavaScript ES6+
- Netscript 2.0 (NS)
- GitHub deployment
- JSON persistence

### 📝 Standards Appliqués
- ✅ Headers ASCII art complets
- ✅ Version tags uniformes (v0.1.0)
- ✅ Auteur : Claude (Godlike AI Operator)
- ✅ JSDoc complet
- ✅ Usage, commandes, changelog dans chaque fichier
- ✅ Système DEBUG multi-niveaux partout
- ✅ ns.tail() + ns.toast() systématiques
- ✅ Couleurs et icônes pour lisibilité

### 🎮 Testé Sur
- BitNode-1.1 (virgin run, no SF)
- Hacking Level 1
- $1,000 starting money
- 8GB home RAM

---

## [Unreleased] - Roadmap Futures Versions

### [0.2.0] - Expansion (Planifié)
- Purchased servers management
- Home RAM auto-upgrade
- Faction joining automation
- Target selector intelligent
- HWGW batching basique

### [0.3.0] - Endgame BN1 (Planifié)
- Augmentation buying automation
- Daedalus path automation
- The Red Pill acquisition
- w0r1d_d43m0n hack automation
- Reset policy intelligent

### [0.4.0] - Multi-BitNode (Planifié)
- BitNode detection automatique
- Adaptive strategies per BitNode
- Source File integration
- Cross-BitNode persistence

---

**Format:** [version] - date

**Types de changements:**
- `✨ Ajouté` - Nouvelles features
- `🔧 Modifié` - Changements features existantes
- `❌ Déprécié` - Features bientôt supprimées
- `🗑️ Supprimé` - Features supprimées
- `🐛 Corrigé` - Bug fixes
- `🔒 Sécurité` - Vulnérabilités

---

**G.H.O.S.T. v0.1.0** - *Automated Excellence, Human-Free.*
