import kojiLogo from '../assets/icons/koji-logo.png'; 

function Footer() {
  
  return (
    <footer>
      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/maelle-nioche/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <img src="./assets/icons/linkedin.svg" alt="LinkedIn" />
          LinkedIn
        </a>
        <a
          href="https://koji-dev.fr/"
          target="_blank"
          rel="noopener noreferrer"
          title="Portfolio"
        >
          <img src={kojiLogo} alt="Logo de Koji" />
          Développé par Kōji
        </a>
        <a
          href="https://github.com/MaelleN95/olletho"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <img src="./assets/icons/github.svg" alt="Github" />
          GitHub
        </a>
      </div>
      <p>
        Olletho &copy; {new Date().getFullYear()} - Développé par Kōji
        <br />
        Tous droits réservés
      </p>
    </footer>
  );
}

export default Footer;
