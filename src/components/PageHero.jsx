// Full-viewport photo hero — same hx-hero styling as the homepage and About
// page, for the inner pages (Education, Talent). Images are served from
// public/ so they're stable URLs, not hashed src/assets imports.
// `actions` (optional) renders under the intro, e.g. the page's CTAs.
// `focal` / `focalMobile` (optional) are CSS object-positions, so one image
// can be framed differently on desktop and on phones (≤768px).
export default function PageHero({ id, eyebrow, title, intro, image, imageMobile, alt, width, height, actions, focal, focalMobile }) {
  return (
    <section className="hx-hero" aria-labelledby={id}>
      <picture>
        {imageMobile && <source media="(max-width: 768px)" srcSet={imageMobile} />}
        <img
          src={image} alt={alt} loading="eager" fetchpriority="high" decoding="async"
          width={width} height={height} className="hx-hero-img"
          style={focal || focalMobile ? { '--hero-focal': focal, '--hero-focal-m': focalMobile || focal } : undefined}
        />
      </picture>
      <div className="hx-hero-shade" aria-hidden="true" />
      <div className="hx-hero-content">
        <div className="hx-eyebrow hx-eyebrow--hero">{eyebrow}</div>
        <h1 id={id} className="hx-hero-title">{title}</h1>
        <p className="hx-hero-copy">{intro}</p>
        {actions && <div className="hx-ctas">{actions}</div>}
      </div>
    </section>
  );
}
