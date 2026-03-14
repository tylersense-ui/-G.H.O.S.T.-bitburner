# 🚀 COMMANDES GIT - G.H.O.S.T. v0.3.1 HOTFIX

## 📦 FICHIERS MODIFIÉS (4)

```
core/deploy-workers.js      (v0.2.0 → v0.3.1)
core/auto-spider.js         (v0.2.0 → v0.3.1)
tools/global-kill.js        (v0.2.1 → v0.3.1)
managers/server-manager.js  (v0.2.0 → v0.3.1)
```

---

## 🎯 PUSH HOTFIX

```bash
cd ghost-framework/

# Ajouter fichiers corrigés
git add core/deploy-workers.js
git add core/auto-spider.js
git add tools/global-kill.js
git add managers/server-manager.js

# Commit
git commit -m "🔧 v0.3.1 HOTFIX - Bugs critiques v0.3.0

URGENT FIXES:
- deploy-workers.js: profitPerSecond support (TypeError crash)
- auto-spider.js: profitPerSecond support (TypeError crash)
- global-kill.js: telemetry exclusion robuste (3 formats)
- server-manager.js: auto-stop when all servers maxed

Impact:
✅ Framework fonctionnel (was completely broken)
✅ Workers deployed on profit/s target
✅ Telemetry preserved by global-kill
✅ Server manager stops when mission complete

v0.3.1"

# Push
git push origin main
```

---

## 🎮 DANS LE JEU

### Option A : Auto-Update (RECOMMANDÉ)
```bash
run deploy-ghost.js          # Auto-update v0.3.1
run /tools/global-kill.js    # Kill propre (telemetry préservée!)
run /boot.js                 # Relance framework
```

### Option B : Wget Sélectif (Quick Fix)
```bash
# Seulement les 4 fichiers corrigés
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/core/deploy-workers.js core/deploy-workers.js
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/core/auto-spider.js core/auto-spider.js
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/tools/global-kill.js tools/global-kill.js
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/managers/server-manager.js managers/server-manager.js

# Relance
run /tools/global-kill.js
run /boot.js
```

---

## ✅ VÉRIFICATION

```bash
# 1. Pas de crashes TypeError
# Console doit être propre

# 2. Workers déployés
ps | grep worker
# Doit montrer workers actifs

# 3. Telemetry tourne
ps | grep telemetry
# telemetry.js avec PID

# 4. Best target (profit/s)
cat state/best-target.json
# "profitPerSecond": 708333 (ou similaire)

# 5. Auto-Spider OK
tail core/auto-spider.js
# Cycles réguliers sans error

# 6. Server Manager OK
tail managers/server-manager.js
# Achète/upgrade ou s'arrête si maxed
```

---

## 💰 RÉSULTAT ATTENDU

**v0.3.0 (BUGGÉ) :**
- ❌ deploy-workers crash
- ❌ auto-spider crash
- ❌ telemetry tuée
- ❌ $0/s (rien ne fonctionne)

**v0.3.1 (FIXÉ) :**
- ✅ deploy-workers OK
- ✅ auto-spider OK (cycle 5min)
- ✅ telemetry OK
- ✅ **$500k-1M+/s** (profit/s targeting)

---

**G.H.O.S.T. v0.3.1 - HOTFIX**

*"Bugs squashed. Profit/s restored."*
