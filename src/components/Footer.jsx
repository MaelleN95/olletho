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
          <img src="./src/assets/icons/linkedin.svg" alt="LinkedIn" />
          LinkedIn
        </a>
        <a
          href="https://maelle-nioche.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          title="Portfolio"
        >
          <img src="./src/assets/icons/portfolio.svg" alt="Portfolio" />
          Portfolio
        </a>
        <a
          href="https://github.com/MaelleN95/olletho"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <img src="./src/assets/icons/github.svg" alt="Github" />
          GitHub
        </a>
      </div>
      <p>
        Olletho &copy; {new Date().getFullYear()}
        <br />
        Tous droits réservés
      </p>
    </footer>
  );
}

export default Footer;
