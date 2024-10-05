import GameBoard from './components/GameBoard';
import Rules from './components/Rules';

function App() {
  return (
    <main>
      <h1>Olletho</h1>
      <section id="game">
        <GameBoard />
      </section>
      <section id="rules">
        <Rules />
      </section>
    </main>
  );
}

export default App;
