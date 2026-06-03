import './Footer.css'

const NAV_LINKS = [
  { label: 'HOME', page: 'home' },
  { label: 'ABOUT ME', page: 'about' },
  { label: 'THE CAVE', page: 'cave' },
  { label: 'GUEST ARCHIVE', page: 'archive' },
]

export default function Footer({ activePage = 'home', onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer__quote">
        <p>
          <span className="footer__quote-muted">The most thoughtful designs are shaped as much by </span>
          <span className="footer__quote-white">what they give up</span>
          <span className="footer__quote-muted"> as by what they </span>
          <span className="footer__quote-white">make possible.</span>
        </p>
      </div>

      <div className="footer__links">
        <div className="footer__link-col">
          <a href="mailto:manohar.create@gmail.com" className="footer__link footer__link--muted">EMAIL</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer__link footer__link--muted">LINKEDIN</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="footer__link footer__link--muted">RESUME</a>
        </div>
        <div className="footer__link-col">
          {NAV_LINKS.map(({ label, page }) => (
            <a
              key={page}
              href="#"
              className={`footer__link ${activePage === page ? 'footer__link--active' : 'footer__link--muted'}`}
              onClick={(e) => { e.preventDefault(); onNavigate?.(page) }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
