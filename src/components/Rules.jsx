function Rules() {
  return (
    <>
      <h2>Les règles du jeu</h2>

      <h3 id="disposition-initiale">Disposition initiale</h3>
      <p>
        Au début de la partie, quatre pions sont placés au centre du plateau :
        deux pions noirs et deux pions blancs sont positionnés de façon à ce que
        chaque couleur forme une diagonale.
      </p>
      <img
        src="./src/assets/images/initialisation.webp"
        alt="Plateau d'initialisation"
      />

      <h3>Déroulement d&apos;un tour</h3>
      <p>
        Chaque joueur, à son tour, doit poser un pion sur une case vide du
        plateau. Le pion doit être positionné de façon à ce qu&apos;il
        &quot;encadre&quot; un ou plusieurs pions de l&apos;adversaire.
      </p>
      <p>
        Un pion est &quot;encadré&quot; lorsqu&apos;il est pris entre 2 pions de
        la couleur adverse. Les pions encadrés sont alors retournés pour devenir
        de la couleur du joueur qui vient de jouer.
      </p>
      <img
        src="./src/assets/images/encadrement.webp"
        alt="Exemple d'encadrement de pions adverses"
      />
      <p>
        Il est permis de prendre en tenaille un pion solitaire, un alignement de
        plusieurs pions, ainsi que plusieurs alignements à la fois. Il n&apos;y
        a pas de limite au nombre de pions retournés lors d&apos;un tour.
      </p>
      <img
        src="./src/assets/images/plusieurs-encadrements.webp"
        alt="Exemple de plusieurs encadrements de pions adverses"
      />
      <h3>Indications visuelles</h3>
      <p>
        Avec Olletho, vous pouvez visualiser les pions qui seront retournés en
        survolant les cases avec votre souris. Les pions qui seront retournés si
        vous jouez sur une case donnée seront indiqués par une pastille bleue.
      </p>
      <p>
        De plus, vous pouvez également voir le coup joué par votre adversaire
        par des indications visuelles sur le plateau :
      </p>
      <img
        src="./src/assets/images/affichage-coup-precedent.webp"
        alt="Indication du coup précédent"
      />
      <p>
        Un pion indiqués par un oeillet vert a été posé lors du dernier coup.
      </p>
      <p>
        Les pions retournés lors du dernier coup sont signalés par une pastille
        verte.
      </p>
      <h3>Déroulement d&apos;une partie</h3>
      <p>Le joueur aux pions noirs commence toujours.</p>
      <p>
        Si un joueur n&apos;est pas en mesure de retourner au moins un pion de
        son adversaire, il passe son tour. Cependant, si un coup est possible,
        le joueur est obligé de poser un pion, même si cela lui est défavorable.
      </p>

      <h3>Fin de la partie</h3>
      <p>
        La partie se termine lorsque les 64 cases sont occupées ou lorsque les
        deux joueurs ne peuvent plus jouer. Le joueur ayant le plus de pions de
        sa couleur sur le plateau remporte la partie.
      </p>
    </>
  );
}

export default Rules;
