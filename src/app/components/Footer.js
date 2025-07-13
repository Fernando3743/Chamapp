'use client';

import Link from 'next/link';

const Footer = () => {

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Templates', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'API Documentation', href: '#' }
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact Us', href: '#' }
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' }
    ]
  };

  const socialLinks = [
    { text: 'f', href: '#', label: 'Facebook' },
    { text: 't', href: '#', label: 'Twitter' },
    { text: 'in', href: '#', label: 'LinkedIn' },
    { text: 'ig', href: '#', label: 'Instagram' }
  ];

  return (
    <footer>
      <div className="footer-content">
        {/* Brand Column */}
        <div className="footer-brand">
          <h3>
            BusinessHub
          </h3>
          <p>
            Empowering businesses with all-in-one software solutions. From startups to enterprises, we provide the tools you need to succeed in the digital age.
          </p>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="social-link"
              >
                {social.text}
              </a>
            ))}
          </div>
        </div>

        {/* Product Links */}
        <div className="footer-links">
          <h4>Product</h4>
          <ul>
            {footerLinks.product.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            {footerLinks.company.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            {footerLinks.support.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © 2025 BusinessHub. All rights reserved. Made with ❤️ for businesses worldwide.
        </p>
      </div>
    </footer>
  );
};

export default Footer;