# 🚀 GIT v0.3.2 HOTFIX - COMMANDES RAPIDES

## 📦 FICHIERS (2)
```
managers/server-manager.js  (v0.3.1 → v0.3.2)
tools/telemetry.js          (v0.2.1 → v0.3.2)
```

## 🎯 PUSH
```bash
cd ghost-framework/

git add managers/server-manager.js
git add tools/telemetry.js

git commit -m "🔧 v0.3.2 HOTFIX - MAX_RAM + telemetry

Fixes:
- server-manager.js: MAX_RAM constant (ReferenceError fix)
- telemetry.js: Liste complète 17 fichiers (vs 7)

v0.3.2"

git push origin main
```

## 🎮 JEU
```bash
# Redeploy full
run deploy-ghost.js

# OU wget sélectif
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/managers/server-manager.js managers/server-manager.js
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/tools/telemetry.js tools/telemetry.js

# Relance
run /tools/global-kill.js
run /boot.js
```

## ⚠️ GLOBAL-KILL FIX
**Tu as uploadé l'ancienne version NEXUS v0.2.0 !**

**Remplace par :**
```bash
wget https://raw.githubusercontent.com/tylersense-ui/-G.H.O.S.T.-bitburner/main/tools/global-kill.js tools/global-kill.js
```

## 🔍 DIAGNOSTIC AUTO-SPIDER
```bash
run core/auto-spider.js --debug 2
# Rapporte erreur si il y en a
```

## ✅ VÉRIFICATION
```bash
# 1. Server manager ne crashe plus
tail managers/server-manager.js
# Pas de ReferenceError

# 2. Telemetry track 17 fichiers
cat state/version-tracking.json
# Doit montrer tous les lib/, core/, managers/

# 3. Global-kill tue partout
run /tools/global-kill.js
ps
# Telemetry seul (tous les workers tués)
```

---

**v0.3.2 STABLE ✅**
