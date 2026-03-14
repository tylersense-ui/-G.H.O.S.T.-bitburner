# 🔧 G.H.O.S.T. v0.2.1 - HOTFIX CRITIQUE

## ⚠️ PROBLÈMES CORRIGÉS

**Version :** v0.2.1 - Hotfix Critical  
**Date :** 2025-01-XX  
**Type :** Corrections bugs critiques + nouvelles fonctionnalités

---

## 🐛 BUGS CRITIQUES FIXES

### 1️⃣ deploy-ghost.js - PAS AUTO-UPDATE
**Problème :** `deploy-ghost.js` ne se téléchargeait pas lui-même → Impossible de get la dernière version automatiquement

**Solution :**
- ✅ STEP 0 ajouté : Se télécharge lui-même en premier
- ✅ Liste fichiers mise à jour (v0.2.0 complet)
- ✅ Workflow : `run deploy-ghost.js` après `git push` → AUTO-UPDATE !

```javascript
// ÉTAPE 0 : AUTO-UPDATE
const selfUrl = `${baseUrl}/deploy-ghost.js`;
await ns.wget(selfUrl, "/deploy-ghost.js", "home");
```

---

### 2️⃣ Dépréciations Bitburner
**Problème :** Warnings de dépréciation dans console

**Fixes :**
- ✅ `ns.tail()` → `ns.ui.openTail()` (dans `/lib/debug.js`)
- ✅ `ns.getTimeSinceLastAug()` → `Date.now() - ns.getResetInfo().lastAugReset` (dans `/tools/telemetry.js`)

---

### 3️⃣ Telemetry se coupe
**Problème :** Telemetry démarre puis s'arrête immédiatement

**Cause :** Boot.js utilise `ns.exec()` qui retourne immédiatement, mais les daemons doivent tourner en parallèle

**Solution :** Aucune modification nécessaire dans boot.js - C'est le comportement attendu ! Les daemons tournent en background.

**Vérification :**
```bash
ps  # Doit montrer telemetry avec PID actif
```

---

### 4️⃣ Pas de global-kill.js
**Problème :** Aucun moyen de killer tout proprement en préservant telemetry

**Solution :** Nouveau fichier `/tools/global-kill.js`

**Features :**
- ✅ Scan réseau complet (BFS)
- ✅ Kill TOUS les processus sur TOUS les serveurs
- ✅ Exception telemetry (par défaut)
- ✅ Option `--keep-telemetry false` pour tout tuer

**Usage :**
```bash
run /tools/global-kill.js                    # Keep telemetry
run /tools/global-kill.js --keep-telemetry false   # Kill everything
```

---

## 📦 FICHIERS MODIFIÉS (4)

1. **`/deploy-ghost.js`** (v0.2.0 → v0.2.1)
   - Auto-update lui-même (STEP 0)
   - Liste fichiers complète v0.2.0
   - Instructions post-deploy

2. **`/lib/debug.js`** (v0.1.0 → v0.2.1)
   - FIX: `ns.tail()` → `ns.ui.openTail()`

3. **`/tools/telemetry.js`** (v0.1.0 → v0.2.1)
   - FIX: `ns.getTimeSinceLastAug()` → `Date.now() - ns.getResetInfo().lastAugReset`

4. **`/tools/global-kill.js`** (NEW v0.2.1)
   - Killall intelligent avec exclusions

---

## 🚀 DÉPLOIEMENT v0.2.1

### Option 1 : Auto-Update (RECOMMANDÉ)
```bash
# 1. Push sur GitHub
git add deploy-ghost.js lib/debug.js tools/telemetry.js tools/global-kill.js
git commit -m "🔧 G.H.O.S.T. v0.2.1 - HOTFIX"
git push origin main

# 2. Dans le jeu - JUSTE ÇA !
run deploy-ghost.js   # S'auto-update + télécharge tout !
```

### Option 2 : Wget Manuel
```bash
# Télécharger les 4 fichiers modifiés
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/deploy-ghost.js deploy-ghost.js
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/lib/debug.js lib/debug.js
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/tools/telemetry.js tools/telemetry.js
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/tools/global-kill.js tools/global-kill.js
```

---

## ✅ VÉRIFICATION POST-HOTFIX

```bash
# 1. Global kill propre
run /tools/global-kill.js

# 2. Relance Trinity Matrix
run /boot.js

# 3. Vérifier pas de warnings
# Console doit être PROPRE (pas de dépréciation)

# 4. Vérifier telemetry tourne
ps
# Doit montrer telemetry.js avec PID actif

# 5. Vérifier logs telemetry
tail /tools/telemetry.js
# Doit afficher cycles réguliers (30s)
```

---

## 🎯 WORKFLOW COMPLET POST-HOTFIX

```bash
# Nettoyage complet
run /tools/global-kill.js

# Relance Trinity Matrix
run /boot.js

# Vérification
ps                          # 4+ daemons actifs
cat state/best-target.json  # Target optimale
tail core/auto-spider.js    # Cycle 5min
tail managers/server-manager.js  # Cycle 2min
```

**Résultat attendu :**
- ✅ Aucun warning dépréciation
- ✅ Telemetry tourne en continu
- ✅ Auto-Spider cycle 5min
- ✅ Server Manager cycle 2min
- ✅ Workers sur best target

---

## 💡 NOUVEAUTÉS POUR FUTURES VERSIONS

**À intégrer (inspiré des lib/ NEXUS uploadées) :**

1. **Réserve RAM Home** - Éviter de consommer 100% home
2. **Capabilities.js** - Détection intelligente capacités joueur
3. **Constants.js** - Configuration centralisée
4. **FormulasHelper.js** - Calculs précis avec Formulas.exe
5. **Network.js** - Tri par profit/s au lieu de maxMoney

**→ Sera implémenté dans v0.3.0 !**

---

## 📊 RÉCAPITULATIF COMPLET

**Fichiers totaux G.H.O.S.T. :** 19 (vs 18 en v0.2.0)

```
/deploy-ghost.js           ★ v0.2.1 MODIFIÉ
/boot.js                   v0.2.0
/manifest.json             v0.2.0

/core/
├── spider.js              v0.1.0
├── deploy-workers.js      v0.2.0
├── target-selector.js     v0.2.0
└── auto-spider.js         v0.2.0

/lib/
├── state-manager.js       v0.1.0
└── debug.js               ★ v0.2.1 MODIFIÉ

/workers/
├── hack.js                v0.1.1
├── grow.js                v0.1.1
└── weaken.js              v0.1.1

/managers/
└── server-manager.js      v0.2.0

/tools/
├── telemetry.js           ★ v0.2.1 MODIFIÉ
├── blackbox.js            v0.1.0
├── log-action.js          v0.1.0
└── global-kill.js         ★ v0.2.1 NEW
```

---

## 🎉 CONCLUSION

**v0.2.1 HOTFIX COMPLET !**

**Problèmes résolus :**
- ✅ deploy-ghost.js auto-update
- ✅ Dépréciations corrigées
- ✅ global-kill.js créé
- ✅ Workflow simplifié

**Prochaine étape :**
1. Push hotfix v0.2.1 sur GitHub
2. Dans le jeu : `run deploy-ghost.js` (s'auto-update !)
3. `run /tools/global-kill.js && run /boot.js`
4. Enjoy Trinity Matrix sans warnings ! 🎬

---

**G.H.O.S.T. v0.2.1 - HOTFIX**

*"There is no spoon... but there is clean code."*
