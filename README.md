# Olletho

## Sommaire

- [Description](#description)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Note de synthèse](#note-de-synthèse)
  - [Spécifications fonctionnelles](#spécifications-fonctionnelles)
  - [Spécifications techniques](#spécifications-techniques)
- [Screenshots](#screenshots)
- [Auteur](#auteur)

## Description

Olletho est une implémentation **en cours de développement** du jeu de société classique Othello pour deux joueurs. Le but du jeu Othello est de contrôler le plus de pions possible sur le plateau de jeu. Le joueur avec le plus de pions de sa couleur à la fin de la partie gagne. 
Ce projet utilise **React** pour créer une interface utilisateur interactive.

## Installation

1. Clonez le repository :
```bash
  git clone https://github.com/MaelleN95/olletho.git
```

2. Installez les dépendances :

```bash
  cd olletho
  npm install
```

3. Lancez l'application :

```bash
  npm run dev
```

## Utilisation

1. Accédez à [l'application](https://olletho.vercel.app/) via votre navigateur ou l'adresse [`http://localhost:5173/`](http://localhost:5173/) si vous utilisez le serveur local.
3. Amusez-vous !

## Structure du projet

- `public/` : Contient les fichiers publics et les ressources de l'application.
- `src/assets/` : Contient les fichiers statiques tels que les images et icônes.
- `src/assets/styles/` : Fichiers de style CSS pour la mise en forme du site.
- `src/components/` : Composants réutilisables du site.
- `src/logic/gameLogic` : Contient la logique du jeu.
- `src/main.jsx` : Point d'entrée principal de l'application.

## Technologies utilisées

- **React (v18.3.1)** : Pour la gestion des composants et de l'interface utilisateur.
- **Vite (v5.4.1)** : Pour le bundling et la gestion du développement.
- **CSS** : Pour la mise en forme et le design de l'application.
- **JavaScript** : Pour la logique du jeu et les interactions.

## Note de synthèse

### Spécifications fonctionnelles

| **Fonctionnalité**                     | **Description**                                                                                                           |
|----------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| Initialisation du plateau              | Le jeu démarre avec un plateau de 8x8, où les 4 pièces centrales sont placées (2 noires et 2 blanches).                   |
| Gestion des mouvements                 | Les joueurs peuvent cliquer sur une cellule vide pour y placer une pièce, si le mouvement est valide.                     |
| Vérification des coups valides         | Le système valide le coup en vérifiant si le joueur peut retourner des pièces adverses.                                   |
| Changement de joueur                   | Après chaque coup valide, le jeu change de joueur.                                                                        |
| Affichage du statut du jeu             | Un message indique le joueur courant, les coups invalides, et l'état de la partie.                                        |
| Affichage des disques                  | Le nombre de disques noirs et blancs est affiché en temps réel pendant le jeu.                                            |
| Détection de fin de jeu                | Le jeu se termine lorsqu'il n'y a plus de mouvements valides ou lorsque le plateau est plein.                             |
| Effets visuels de victoire             | Des confettis sont affichés lorsque l'un des joueurs gagne, créant une expérience festive.                                |
| Responsivité                           | L'interface s'adapte à toutes les tailles d'écran, permettant une expérience utilisateur cohérente sur mobile et desktop. |

### Spécifications techniques

| **Spécification**                     | **Description**                                                                                                            |
|---------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Langage de programmation              | Développement en JavaScript avec React.                                                                                    | 
| Architecture de composants            | Utilisation de composants React séparés (`Cell`, `GameStatus`, `Confetti`) pour modularité et réutilisabilité.             |
| Gestion des états                     | Utilisation de `useState` pour la gestion de l'état local (état du plateau, joueur courant, messages, etc.).               |
| Effets secondaires                    | Utilisation de `useEffect` pour gérer les effets secondaires, comme les animations de confettis lors de la victoire.       |
| Logique de jeu                        | Encapsulation de la logique de jeu dans des fonctions (validation des mouvements, retournement des pièces, etc.).          |
| Responsive design                     | Utilisation de CSS flexible et de media queries pour garantir que l'application fonctionne sur tous les appareils.         |

## Screenshots

### Page d'accueil
|![page-d-accueil](https://github.com/user-attachments/assets/75350591-61b0-4f6c-a363-2006f4319cea)|
|-|

### Victoire
|![victoire](https://github.com/user-attachments/assets/d2490d73-b4b9-4651-8487-47998aa44ff1)|
|-|

### Version mobile
|![version-mobile](https://github.com/user-attachments/assets/297566d4-0a23-4414-a627-c02b68ced8bd)|
|-|

## Auteur

- [Maëlle Nioche](https://www.linkedin.com/in/maelle-nioche/)
