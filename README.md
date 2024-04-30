## Revolve Simulator

![Revolve game](/public/revolve.jpg)

Revolve is a puzzle game similar to Rubik's cube or 15 puzzle. It consists of a fixed structure (4 balls at the top and 1 ball at the bottom) between which two rings (each containing 2 rows of 4 balls) can rotate.
The game contains 20 marbles of 4 colors (blue, red, yellow and green) and a free space for one marble.
The movements allowed are to rotate the two rings to the left or right, and to move the balls from top to bottom in a column, thus changing the location of the empty space.

> The aim of the game is to place all the balls of the same color on each of the four columns.

Every action taken is memorized (in a log).
For the moment, I haven't implemented automatic game resolution.
________________
Revolve est un jeu casse-tête similaire au Rubik's cube ou au Taquin. Il consiste en une structure fixe (4 billes en haut et 1 bille en bas) entre laquelle deux anneaux (contenant chacun 2 rangées de 4 billes) peuvent tourner.
Le jeu contient 20 billes de 4 couleurs (bleu, rouge, jaune et vert) et un espace libre pour une bille.
Les mouvements autorisés sont de faire tourner les deux anneaux vers la gauche ou la droite, et de déplacer les billes de haut en bas dans une colonne, modifiant ainsi l'emplacement de l'espace vide.

> Le but du jeu est de placer toutes les billes de la même couleur sur chacune des quatre colonnes.

Chaque action effectuée est mémorisée (dans un journal).
Pour l'instant, je n'ai pas implémenté la résolution automatique du jeu.

This game is implemented as a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play with this Revolve simulator and find the shortest strategies to solve this entertaining puzzle !

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur préféré pour jouer avec ce simulateur de  Revolve et trouver les stratégies les plus courtes pour résoudre ce puzzle amusant !

