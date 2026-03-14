# 🔥 G.H.O.S.T. v0.1.1 - HOTFIX CRITIQUE

## ⚠️ PROBLÈME RÉSOLU

**Bug identifié :** Workers se terminaient après 1 seule exécution au lieu de tourner en continu.

**Impact :** Pas de revenus passifs - nécessitait relance manuelle constante.

---

## ✅ SOLUTION v0.1.1

### Fichiers Modifiés (3)
1. **workers/hack.js** - Ajout boucle infinie `while(true)`
2. **workers/grow.js** - Ajout boucle infinie `while(true)`
3. **workers/weaken.js** - Ajout boucle infinie `while(true)`

### Avant (v0.1.0 - BUGGÉ)
```javascript
export async function main(ns) {
    const target = ns.args[0];
    await ns.hack(target);  // ❌ Se termine après 1 exécution
}
```

### Après (v0.1.1 - FIXÉ)
```javascript
export async function main(ns) {
    const target = ns.args[0];
    
    // ✅ BOUCLE INFINIE - Tourne 24/7
    while (true) {
        await ns.hack(target);
    }
}
```

---

## 📦 DÉPLOIEMENT

### Option 1 : Télécharge les 3 nouveaux workers
Remplace ces fichiers sur ton GitHub :
- `/workers/hack.js` ✅
- `/workers/grow.js` ✅
- `/workers/weaken.js` ✅

Ensuite dans le jeu :
```bash
# Redéployer depuis GitHub
wget https://raw.githubusercontent.com/USERNAME/REPO/main/workers/hack.js workers/hack.js
wget https://raw.githubusercontent.com/USERNAME/REPO/main/workers/grow.js workers/grow.js
wget https://raw.githubusercontent.com/USERNAME/REPO/main/workers/weaken.js workers/weaken.js

# Relancer le déploiement
killall
run core/deploy-workers.js
```

---

### Option 2 : Copie directe (rapide)

Copie-colle chaque fichier dans l'éditeur in-game :

**workers/hack.js v0.1.1** (voir fichier joint)
**workers/grow.js v0.1.1** (voir fichier joint)
**workers/weaken.js v0.1.1** (voir fichier joint)

Puis :
```bash
killall
run core/deploy-workers.js
```

---

## 🎯 VALIDATION

Après déploiement, vérifie :

```bash
ps  # Tu dois voir plein de workers actifs (pas juste telemetry)
```

**Résultat attendu :**
```
PID   Threads   File                    Args
---   -------   ----                    ----
1     1         tools/telemetry.js      []
2     5         workers/weaken.js       [n00dles]
3     3         workers/grow.js         [n00dles]
4     2         workers/hack.js         [n00dles]
... (beaucoup plus de lignes sur tous les serveurs)
```

---

## 📊 IMPACT ATTENDU

Avec **20 serveurs rootés** + workers permanents :
- **Revenue passif 24/7** 💰
- **Hacking XP constant** 📈
- **Aucune intervention manuelle nécessaire** ✅

Tu devrais générer **$50k-100k/heure** automatiquement !

---

## 🔜 PROCHAINE SESSION

Une fois les workers fixes déployés, on pourra :
1. Créer **Target Selector** intelligent (choisir mieux que n00dles)
2. Ajouter **Auto-Spider** qui re-roote automatiquement
3. Implémenter **Purchased Servers** auto-buy

**Mais d'abord : fixons ce bug !** 🔧
