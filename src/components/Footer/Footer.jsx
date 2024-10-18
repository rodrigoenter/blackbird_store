import './Footer.css';
import logo from '../../assets/images/footer/blackbird_footer.png';
import instagramIcon from '../../assets/images/footer/ig_footer.png';
import facebookIcon from '../../assets/images/footer/facebook_footer.png';
import mailIcon from '../../assets/images/footer/mail_footer.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <a href="/">
                        <img src={logo} alt="logo_footer" />
                    </a>
                </div>
                <div className="footer-icons">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagramIcon} alt="Instagram" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={facebookIcon} alt="Facebook" />
                    </a>
                    <a href="mailto:example@example.com">
                        <img src={mailIcon} alt="Mail" />
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© Blackbird: Music store. Argentina. 2024.</p>
            </div>
        </footer>
    );
};

export default Footer;
