import React from 'react';
import { Instagram, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

const WHATSAPP_NUMBER = '7896960837';
const WHATSAPP_LINK = `https://wa.me/91${WHATSAPP_NUMBER}`;
const INSTAGRAM_LINK = 'https://www.instagram.com/craaaap.content/';
const EMAIL = 'team@craaaapcontent.com';

const LOGO_URL = '/assests/logo2.png';

const openExternal = (url) => {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => document.body.removeChild(a), 100);
};

const Footer = () => {
  return (
    <footer
      data-testid="main-footer"
      className="relative py-12 md:py-16"
      style={{ background: '#0A0A0A' }}>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <img
              src={LOGO_URL}
              alt="Craaaap Content"
              className="h-12 w-auto object-contain mb-4"
              data-testid="footer-logo" />

            <p className="font-manrope text-sm text-white/50 max-w-xs">
              The agency that turns influence into impact. We connect brands with creators to make content that actually works.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-syne font-bold text-sm uppercase tracking-widest text-white mb-6">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {['Home', 'Services', 'Works', 'About', 'Contact'].map((item) =>
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                data-testid={`footer-link-${item.toLowerCase()}`}
                className="font-manrope text-sm text-white/50 hover:text-[#FF1493] transition-colors flex items-center gap-1"
                data-hover>

                  {item}
                </a>
              )}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-syne font-bold text-sm uppercase tracking-widest text-white mb-6">
              Connect
            </h4>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => openExternal(`mailto:${EMAIL}`)}
                data-testid="footer-email-link"
                className="flex items-center gap-3 text-white/50 hover:text-[#FF1493] transition-colors group"
                data-hover>

                <Mail size={18} />
                <span className="font-manrope text-sm">{EMAIL}</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => openExternal(INSTAGRAM_LINK)}
                data-testid="footer-instagram-link"
                className="flex items-center gap-3 text-white/50 hover:text-[#FF1493] transition-colors group"
                data-hover>

                <Instagram size={18} />
                <span className="font-manrope text-sm">@craaaap.content</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => openExternal(WHATSAPP_LINK)}
                data-testid="footer-whatsapp-link"
                className="flex items-center gap-3 text-white/50 hover:text-[#25D366] transition-colors group"
                data-hover>

                <MessageCircle size={18} />
                <span className="font-manrope text-sm">WhatsApp</span>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-manrope text-xs text-white/30" data-testid="footer-copyright">
            &copy; {new Date().getFullYear()} Craaaap Content. All rights reserved.
          </p>
          <p className="font-mono text-xs text-white/20">
            Made with chaos and caffeine
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;