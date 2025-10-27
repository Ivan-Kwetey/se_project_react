import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__content modal__text">
        Developed by Kwetey <span>{currentYear}</span>
      </p>
    </footer>
  );
}

export default Footer;
