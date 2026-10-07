import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site Footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-social">
            <a
              href="https://www.facebook.com/share/18ZEngJDKr/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Authentic Infosystem on Facebook"
              className="social-fb"
            >
              <FaFacebookF className="text-sm sm:text-base" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              title="Authentic Infosystem on X"
              className="social-x"
            >
              <FaXTwitter className="text-sm sm:text-base" />
            </a>
            <a
              href="https://www.instagram.com/authenticinfosystem?stkn=MWs3Z2V6Ynpmem8xNg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Authentic Infosystem on Instagram"
              className="social-insta"
            >
              <FaInstagram className="text-base sm:text-lg" />
            </a>
            <a
              href="https://www.youtube.com/@AUTHENTICINFOSYSTEM"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="Authentic Infosystem on YouTube"
              className="social-yt"
            >
              <FaYoutube className="text-base sm:text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/company/authentic-infosystem-india-private-limited/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="Authentic Infosystem on LinkedIn"
              className="social-in"
            >
              <FaLinkedinIn className="text-sm sm:text-base" />
            </a>
          </div>
        </div>

        <div className="footer-line"></div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Products</h3>
            <Link href="/amazon">Amazon Storefront</Link>
            <Link href="/laptops">Laptops</Link>
            <Link href="/desktops">Desktops</Link>
            <Link href="/phones">Smartphones</Link>
            <Link href="/networking">Networking</Link>
            <Link href="/accessories">Accessories</Link>
            <Link href="/configuration">Custom PC Build</Link>
          </div>

          <div className="footer-column">
            <h3>Solutions</h3>
            <Link href="/enterprise">Business Solutions</Link>
            <Link href="/enterprise">Bulk Orders</Link>
            <Link href="/enterprise">B2B Supply</Link>
            <Link href="/enterprise">Enterprise Infra</Link>
          </div>

          <div className="footer-column">
            <h3>Support</h3>
            <a href="/#contact">Contact Us</a>
            <a href="https://wa.me/919643990077" target="_blank" rel="noopener noreferrer">Warranty Support</a>
            <a href="https://wa.me/919643990077" target="_blank" rel="noopener noreferrer">Technical Help</a>
            <a href="https://wa.me/919643990077" target="_blank" rel="noopener noreferrer">Service Request</a>
          </div>

          <div className="footer-column">
            <h3>Custom PCs</h3>
            <Link href="/configuration/gaming">Gaming Rig</Link>
            <Link href="/configuration/workstation">Workstation PC</Link>
            <Link href="/configuration/creator">Creator Studio</Link>
            <Link href="/configuration/office">Office System</Link>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <a href="/#about">About Us</a>
            <a href="/#why-us">Why Choose Us</a>
            <a href="/#brands">Our Partners</a>
            <a href="/#contact">Get in Touch</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright © 2026 AUTHENTIC INFOSYSTEM INDIA PRIVATE LIMITED. All rights reserved.
          </p>

          <div className="footer-policy">
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}