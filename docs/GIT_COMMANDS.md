# 🚀 COMMANDES GIT - G.H.O.S.T. v0.1.0 PREMIER PUSH

## 📋 PRÉREQUIS

1. **Repo GitHub créé** : Nom suggéré `ghost-bitburner` ou `bitburner-ghost`
2. **Git configuré** sur ta machine locale
3. **Tous les fichiers** dans le dossier `ghost-framework/`

---

## 🎯 ÉTAPES DE DÉPLOIEMENT

### 1️⃣ Initialiser Git Local

```bash
cd ghost-framework/
git init
git branch -M main
```

### 2️⃣ Ajouter Tous les Fichiers

```bash
git add .
```

### 3️⃣ Premier Commit

```bash
git commit -m "🎉 G.H.O.S.T. v0.1.0 - Initial Release

Godlike Heuristic Operator & Strategy Toolkit

✨ Features:
- Framework modulaire complet (core, lib, workers, tools)
- Système DEBUG multi-niveaux (0-3) intégré partout
- BlackBox contract solver automatique (8 algorithmes)
- Telemetry daemon pour monitoring 24/7
- State Manager pour persistence JSON
- Auto-root spider (BFS network scan + NUKE)
- Worker deployment automatique
- Minimal workers (hack/grow/weaken <1.7GB RAM)

📦 Structure:
- /boot.js - Point d'entrée principal
- /core/ - Spider, deploy-workers
- /lib/ - Debug, state-manager
- /workers/ - hack, grow, weaken
- /tools/ - blackbox, telemetry, log-action
- /deploy-ghost.js - Script déploiement GitHub → Jeu

🎯 Cible: BitNode-1.1 (fresh start, no SF)
🧬 Version: 0.1.0
👤 Auteur: Claude (Godlike AI Operator)
"
```

### 4️⃣ Lier au Repo GitHub

**Remplace `USERNAME` et `REPO_NAME` par tes valeurs !**

```bash
git remote add origin https://github.com/USERNAME/REPO_NAME.git
```

**Exemple :**
```bash
git remote add origin https://github.com/YourUsername/ghost-bitburner.git
```

### 5️⃣ Push Initial

```bash
git push -u origin main
```

---

## ✅ VÉRIFICATION

Après le push, vérifie sur GitHub que tu vois :

```
ghost-bitburner/
├── README.md
├── CHANGELOG.md
├── manifest.json
├── boot.js
├── deploy-ghost.js
├── /core/
│   ├── spider.js
│   └── deploy-workers.js
├── /lib/
│   ├── debug.js
│   └── state-manager.js
├── /workers/
│   ├── hack.js
│   ├── grow.js
│   └── weaken.js
└── /tools/
    ├── blackbox.js
    ├── telemetry.js
    └── log-action.js
```

---

## 🎮 DÉPLOIEMENT DANS LE JEU

Une fois le repo GitHub en ligne :

### Dans le terminal Bitburner :

```bash
wget https://raw.githubusercontent.com/USERNAME/REPO_NAME/main/deploy-ghost.js deploy-ghost.js
run deploy-ghost.js
```

**Le script `deploy-ghost.js` va :**
1. Télécharger TOUS les fichiers depuis GitHub
2. Créer l'arborescence complète
3. Lancer boot.js automatiquement

---

## 🔧 COMMANDES GIT FUTURES

### Après modifications :

```bash
git add .
git commit -m "✨ Description des changements"
git push
```

### Voir l'état :

```bash
git status
```

### Voir l'historique :

```bash
git log --oneline
```

---

## 📝 NOTES

- **Branche principale** : `main`
- **GitHub raw URL** : Nécessaire pour wget dans Bitburner
- **Format commit** : Utilise emojis pour clarté (🎉 ✨ 🐛 📝 ⚡)
- **manifest.json** : Sera auto-mis à jour par le framework

---

## 🆘 TROUBLESHOOTING

### Erreur "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/REPO_NAME.git
```

### Erreur "refusing to merge unrelated histories"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Changer l'URL du repo
```bash
git remote set-url origin https://github.com/NOUVEAU_USERNAME/NOUVEAU_REPO.git
```

---

🎯 **PRÊT POUR LE PREMIER PUSH !**
