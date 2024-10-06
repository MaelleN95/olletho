import GameBoard from './components/GameBoard';
import Rules from './components/Rules';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <main>
        <h1>Olletho</h1>
        <section id="game">
          <GameBoard />
        </section>
        <section id="rules">
          <Rules />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
