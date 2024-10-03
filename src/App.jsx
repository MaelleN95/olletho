import GameBoard from './components/GameBoard';

function App() {
  return (
    <main>
      <h1>Olletho</h1>
      <section id="game">
        <GameBoard />
      </section>
      <section id="rules">
        <h2>Les règles du jeu</h2>
        <h3>Plateau et matériel</h3>
        <p>
          Le plateau d'Olletho est une grille carrée de 8 cases par 8 cases,
          soit 64 cases en tout. Chaque joueur dispose de 64 pions bicolores,
          noirs d’un côté et blancs de l’autre.
        </p>
        <h3>Disposition initiale</h3>
        <p>
          Au début de la partie, quatre pions sont placés au centre du plateau :
          Deux pions noirs et deux pions blancs sont positionnés de façon à ce
          que chaque couleur forme une diagonale.
        </p>
        <h3>Déroulement d'un tour</h3>
        <p>
          Chaque joueur, à son tour, doit poser un pion sur une case vide du
          plateau. Le joueur doit poser un pion de sa couleur de façon à ce
          qu'il y ait au moins un pion de l'adversaire entre le pion posé et un
          autre pion de sa couleur.
        </p>
        <p>
          Un coup est valide lorsque le joueur "encadre" un ou plusieurs pions
          de l'adversaire.
        </p>
        <p>
          Un pion est encadré lorsqu'il est pris entre un pion de la couleur du
          joueur et un autre pion de la même couleur. Les pions encadrés sont
          retournés pour devenir de la couleur du joueur.
        </p>
        <p>
          Tous les pions de l'adversaire qui sont pris entre le pion posé et un
          autre pion de la même couleur sont retournés pour devenir de la
          couleur du joueur
        </p>
        <h3>Déroulement d'une partie</h3>
        <p>Le joueur aux pions noirs commence toujours.</p>
        <p>
          Si un joueur n'est pas en mesure de retourner au moins un pion de son
          adversaire, il passe son tour. Cependant, si un coup est possible, le
          joueur est obligé de poser un pion, même si cela n'est pas avantageux
          pour lui pour la suite.
        </p>
        <p>
          Il n'y a pas de restriction au nombre de pions qui peuvent être
          retourner lors d'un coup.
        </p>
        <h3>Fin de la partie</h3>
        <p>
          La partie se termine lorsque les 64 cases sont occupées ou lorsque les
          deux joueurs ne peuvent plus jouer. Le joueur ayant le plus de pions
          de sa couleur sur le plateau remporte la partie.
        </p>
      </section>
    </main>
  );
}

export default App;
