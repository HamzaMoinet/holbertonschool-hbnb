# 🏠 HBNB - Part 4: Simple Web Client

Bienvenue dans la quatrième partie du projet **HBNB** !  
Ici, nous construisons un client web interactif pour communiquer avec notre API Flask existante.

---

## 📋 Objectifs

- Développer une interface utilisateur moderne en **HTML5**, **CSS3**, et **JavaScript ES6**.
- Interagir avec l'API back-end à l'aide de **Fetch API**.
- Implémenter la gestion de l'authentification utilisateur (JWT en cookie).
- Dynamiser la navigation sans rechargement de page.

---

## 🏗️ Fonctionnalités Implémentées

### 🔑 Login
- Formulaire de connexion (email + mot de passe).
- Authentification via appel API (`/login`).
- Stockage sécurisé du **JWT** dans un **cookie**.
- Redirection automatique après connexion réussie.
- Message d’erreur en cas d’échec.

### 🗺️ Liste des Lieux
- Récupération de la liste de lieux via API.
- Affichage sous forme de cartes (`place-card`) avec nom, prix par nuit, bouton "View Details".
- Filtrage dynamique côté client par **prix** (10€, 50€, 100€, Tous).
- Affichage conditionnel du lien de connexion selon l'authentification.

### 🏡 Détail d'un Lieu
- Vue détaillée d’un lieu spécifique :
  - Nom, description, hôte, prix, équipements, avis.
- Chargement dynamique selon l’ID de lieu extrait de l’URL.
- Section pour ajouter un avis, affichée uniquement pour les utilisateurs connectés.

### 📝 Ajouter un Avis
- Formulaire pour soumettre un avis (texte + note).
- Accessible uniquement pour les utilisateurs authentifiés.
- Appel API POST pour envoyer le nouvel avis.
- Message de succès ou d’échec affiché à l’utilisateur.

---

## 📂 Structure des Pages

- `index.html` : Liste des lieux
- `login.html` : Formulaire de connexion
- `place.html` : Détail d'un lieu
- `add_review.html` : Formulaire pour ajouter un avis

---

## 🧩 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Mise en forme responsive
- **JavaScript (ES6)** - Dynamisation du contenu (Fetch API, DOM Manipulation)
- **Cookies** - Gestion de session
- **Fetch API** - Requêtes HTTP asynchrones
- **JWT** - Authentification sécurisée

---

## ⚙️ Comment Démarrer

1. **Cloner ce repository** :
   ```bash
   git clone https://github.com/HamzaMoinet/holbertonschool-hbnb.git
   cd holbertonschool-hbnb/part4/Back

2. **Créer un environnement virtuel** :
    ```bash
    python3 -m venv env
    source env/bin/activate

3. **Démarrer l'API** :
    ```bash
    python3 run.py

## 🌳 Arborescence du Projet
```text
part4/
├── Back/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── v1/
│   │   │       ├── __init__.py
│   │   │       ├── users.py
│   │   │       ├── places.py
│   │   │       ├── reviews.py
│   │   │       ├── amenities.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── place.py
│   │   │   ├── review.py
│   │   │   ├── amenity.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── facade.py
│   │   ├── persistence/
│   │       ├── __init__.py
│   │       ├── repository.py
├── Front/
│   ├── index.html
│   ├── login.html
│   ├── place.html
│   ├── add_review.html
│   ├── scripts.js
│   ├── styles.css
│   ├── images/
│       ├── logo.png
│       ├── background.jpg
├── instance/
│   ├── development.db
├── run.py
├── config.py
├── requirements.txt
├── README.md
```