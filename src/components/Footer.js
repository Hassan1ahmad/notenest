import React from 'react';
import './footer.css'


export default function Footer() {
    return (
        <footer className="foot">
            <div className="footer-content">
            
                <div className="footer-links">
                    <nav>
                        <ul>
                            <li> <a href="https://github.com/Hassan1ahmad" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-github"></i>                    </a></li>
                            <li> <a href="https://www.instagram.com/hassanopahmadxd/" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-instagram"></i>                    </a></li>
                            <li>  <a href="https://linkedin.com/in/hassan-ahmad-" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-linkedin"></i>                    </a></li>
                            <li><a href="mailto:hassan1ahmad999@gmail.com">
                            <i className="fa-solid fa-envelope"></i>                    </a></li>
                        </ul>
                    </nav>
                </div>
                
            </div>
            <div className="footer-copyright">
                &copy; {new Date().getFullYear()} Hassan Ahmad. All Rights Reserved.
            </div>
        </footer>
    );
}
