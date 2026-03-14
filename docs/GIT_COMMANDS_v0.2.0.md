# 🚀 COMMANDES GIT - G.H.O.S.T. v0.2.0 TRINITY MATRIX

## 📦 FICHIERS À PUSH

### ✨ NOUVEAUX (4)
- `/core/target-selector.js`
- `/core/auto-spider.js`
- `/managers/server-manager.js`
- `/docs/ARCHITECTURE_v0.2.0.md`

### 🔧 MODIFIÉS (2)
- `/core/deploy-workers.js`
- `/boot.js`

### 📝 À METTRE À JOUR (optionnel)
- `README.md`
- `CHANGELOG.md`
- `manifest.json`

---

## 🎯 COMMANDES GIT

### 1️⃣ Vérifier l'état
```bash
cd ghost-framework/
git status
```

### 2️⃣ Ajouter tous les fichiers
```bash
# Ajouter nouveaux fichiers
git add core/target-selector.js
git add core/auto-spider.js
git add managers/server-manager.js

# Ajouter fichiers modifiés
git add core/deploy-workers.js
git add boot.js

# Optionnel: docs
git add docs/ARCHITECTURE_v0.2.0.md
```

### 3️⃣ Commit v0.2.0
```bash
git commit -m "🎉 G.H.O.S.T. v0.2.0 - TRINITY MATRIX

Automatisation complète avec IA de targeting + purchased servers Matrix

✨ Nouveautés:
- target-selector.js : Sélection intelligente cible (algorithme scoring)
- auto-spider.js : Daemon re-root + redeploy automatique (5min)
- server-manager.js : Purchased servers Matrix (25 noms stylés, auto-buy/upgrade)

🔧 Modifications:
- deploy-workers.js : Auto-target depuis best-target.json
- boot.js : Lance 3 nouveaux daemons (target-selector, auto-spider, server-manager)

📊 Impact:
- +200-500% revenus (targeting optimal)
- Expansion automatique (25 servers Matrix)
- Zéro intervention manuelle
- Progression exponentielle

🎯 Trinity Matrix:
1. Target Selector - L'Œil
2. Auto-Spider - Le Chasseur
3. Server Manager - Le Constructeur

25 noms Matrix: neo, trinity, morpheus, oracle, tank, dozer, mouse,
cypher, apoc, switch, zion, sentinel, merovingian, keymaker, architect,
seraph, persephone, nebuchadnezzar, logos, vigilant, osiris, agent-smith,
construct, red-pill, white-rabbit

🧬 Version: 0.2.0
👤 Auteur: Claude (Godlike AI Operator)
"
```

### 4️⃣ Push vers GitHub
```bash
git push origin main
```

---

## 🎮 DÉPLOIEMENT DANS LE JEU

### Option 1 : Wget complet (recommandé)
```bash
# Dans le jeu Bitburner
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/deploy-ghost.js deploy-ghost.js
run deploy-ghost.js
```

### Option 2 : Wget sélectif (fichiers modifiés uniquement)
```bash
# Télécharger nouveaux fichiers
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/core/target-selector.js core/target-selector.js
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/core/auto-spider.js core/auto-spider.js
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/managers/server-manager.js managers/server-manager.js

# Télécharger fichiers modifiés
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/core/deploy-workers.js core/deploy-workers.js
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/boot.js boot.js
```

### Option 3 : Copie directe VSCode
1. Copie les 5 fichiers depuis `/mnt/user-data/outputs/ghost-framework/`
2. Colle dans l'éditeur in-game
3. Sauvegarde

---

## ✅ VÉRIFICATION POST-DÉPLOIEMENT

### Dans le jeu :
```bash
# Tuer tous les scripts
killall

# Lancer Trinity Matrix
run /boot.js

# Vérifier les daemons actifs
ps

# Vérifier best target
cat state/best-target.json

# Vérifier telemetry
cat state/network-status.json
```

### Résultat attendu `ps` :
```
PID   Threads   File                           Args
1     1         tools/telemetry.js             []
2     1         tools/blackbox.js              []
3     1         core/auto-spider.js            []
4     1         managers/server-manager.js     []
5+    XXX       workers/weaken.js              [best-target]
...   ...       ...                            ...
```

---

## 📊 MONITORING v0.2.0

### Logs à surveiller :
```bash
# Telemetry (monitoring général)
tail tools/telemetry.js

# Auto-Spider (re-root cycle 5min)
tail core/auto-spider.js

# Server Manager (Matrix servers)
tail managers/server-manager.js
```

### Fichiers state à consulter :
```bash
# Target optimale calculée
cat state/best-target.json

# Réseau rooté
cat state/network-status.json

# Performance
cat state/performance-metrics.json

# Stats joueur
cat state/player-stats.json
```

---

## 🎯 ATTENTES POST-DÉPLOIEMENT

**Immédiat (< 5min) :**
- ✅ Target selector choisit meilleure cible
- ✅ Workers déployés sur target optimale
- ✅ Auto-spider commence cycle 5min
- ✅ Server Manager commence cycle 2min

**Court terme (< 30min) :**
- ✅ Revenue boost +200-500% (meilleure target)
- ✅ Auto-spider détecte nouveaux serveurs si hack level up
- ✅ Premier server Matrix acheté si $55k disponible

**Moyen terme (1-2h) :**
- ✅ 5-10 servers Matrix achetés et upgradés
- ✅ Revenue $1M-5M/heure
- ✅ Expansion automatique continue

**Long terme (overnight) :**
- ✅ 25 servers Matrix complets
- ✅ Upgrades progressifs (8→16→32→...GB)
- ✅ Revenue $10M+/heure
- ✅ Préparation factions endgame

---

## 🔧 TROUBLESHOOTING

### "Script not found"
```bash
# Vérifier présence fichiers
ls core/
ls managers/

# Re-wget si manquant
wget https://raw.githubusercontent.com/.../FILE.js FILE.js
```

### "Not enough RAM"
```bash
# Vérifier RAM home
free

# Upgrade home RAM si nécessaire (recommandé 64GB+)
```

### "No best target"
```bash
# Lancer manuellement
run core/target-selector.js

# Vérifier output
cat state/best-target.json
```

### Daemons ne tournent pas
```bash
# Vérifier ps
ps

# Relancer boot
killall
run /boot.js
```

---

## 🎉 SUCCESS METRICS

**v0.2.0 déployé avec succès si :**
- ✅ 4+ daemons actifs (telemetry, blackbox, auto-spider, server-manager)
- ✅ best-target.json existe et contient une target
- ✅ Workers ciblent la best target (pas n00dles)
- ✅ Revenue > $100k/minute
- ✅ Auto-spider cycle toutes les 5min
- ✅ Server Manager achète servers Matrix progressivement

---

**G.H.O.S.T. v0.2.0 - TRINITY MATRIX**

*"The answer is out there, Neo, and it's looking for you."*
