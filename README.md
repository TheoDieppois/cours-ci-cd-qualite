# TP 2 - Pipeline CI/CD avec GitHub Actions

## Objectif

Mettre en place un pipeline CI/CD sur les repositories du TP precedent avec **GitHub Actions**.

Le pipeline doit avoir **4 jobs** qui s'executent dans l'ordre :

1. **Lint** — Verifier la qualite du code
2. **Test** — Lancer les tests unitaires
3. **Build** — Compiler le projet
4. **Deploy** — Deployer sur le serveur

## Ce qui change par rapport au TP 1

Le backend inclut maintenant des outils de qualite :

- **ESLint** — analyse statique du code (`npm run lint`)
- **Vitest** — tests unitaires (`npm run test`)
- Des fonctions utilitaires dans `back/src/utils.js` avec leurs tests dans `back/tests/utils.test.js`

## Lancer en local

```bash
# Backend
cd back
npm install
npm run lint      # Verifier le code
npm run test      # Lancer les tests
npm start         # Demarrer le serveur

# Frontend
cd front
npm install
npm run build     # Verifier que le build fonctionne
```

## Etapes du TP

### 1. Mettre a jour vos repositories

Remplacez le code de vos deux repositories (front et back) avec le nouveau code fourni.

### 2. Creer le pipeline pour le backend

Dans votre repository backend, creez le fichier `.github/workflows/ci.yml`.

Le pipeline doit se declencher sur **push** et **pull request** sur la branche `main`.

**Job 1 — Lint :**

- Checkout du code
- Installation de Node.js (v20)
- Installation des dependances
- Lancer le lint (`npm run lint`)

**Job 2 — Test :**

- Ne doit s'executer **que si le lint a reussi**
- Lancer les tests (`npm run test`)

**Job 3 — Build :**

- Ne doit s'executer **que si les tests ont reussi**
- Verifier que le projet demarre correctement

**Job 4 — Deploy :**

- Ne doit s'executer **que si le build a reussi**
- Ne doit se declencher **que sur un push sur main** (pas sur les pull requests)
- Se connecter au serveur en SSH
- Pull le code, installer les dependances, redemarrer PM2

### 3. Creer le pipeline pour le frontend

Dans votre repository frontend, creez un pipeline similaire.

**Job 1 — Lint :**

- Checkout + Node.js + dependances
- Lancer le lint (ajoutez ESLint au frontend si vous le souhaitez, sinon passez ce job)

**Job 2 — Test :**

- Meme logique que le backend (si vous avez des tests)

**Job 3 — Build :**

- Build du projet (`npm run build`)
- Doit echouer si le build ne passe pas

**Job 4 — Deploy :**

- Memes conditions que pour le backend
- Se connecter en SSH, pull le code, installer les dependances, rebuild

### 4. Configurer les secrets GitHub

Pour que le job de deploy puisse se connecter a votre serveur, il faut stocker les informations de connexion dans les **secrets** du repository GitHub.

Quels secrets sont necessaires pour une connexion SSH ?

Allez dans : **Settings > Secrets and variables > Actions** de chaque repository.

### 5. Tester le pipeline

- Faites un commit et un push sur `main`
- Verifiez que le pipeline se lance dans l'onglet **Actions** de GitHub
- Verifiez que les 4 jobs s'executent dans l'ordre
- Verifiez que le site est mis a jour automatiquement

### 6. Tester avec une pull request

- Creez une branche, faites une modification, ouvrez une PR
- Verifiez que **seuls les jobs Lint, Test et Build** se lancent (pas le deploy)

## Indices

- Le fichier de workflow va dans `.github/workflows/`
- `needs:` permet de dire qu'un job depend d'un autre
- `if:` permet de conditionner l'execution d'un job
- `github.event_name` et `github.ref` sont utiles pour les conditions
- L'action `appleboy/ssh-action@v1` permet d'executer des commandes SSH

## Pour aller plus loin

- Ajoutez une notification (Slack, Discord) quand le deploy est termine
- Ajoutez un badge de statut du pipeline dans le README
