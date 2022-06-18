import Head from "next/head";
import config from "../config";

export default function BaseLayout({ children, meta = {} }) {
  return (
    <>
      <Head>
        <title>{meta.title || config.title}</title>
        <meta name="title" content={meta.title || config.title} />
        <meta
          name="description"
          content={meta.description || config.description}
        />
        <link rel="canonical" href={`${config.url}${meta.slug}`} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        {meta.preview_image ? (
          <>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={config.twitter} />
            <meta name="twitter:creator" content={config.twitter} />
            <meta name="twitter:image:src" content={meta.preview_image} />
            <meta property="og:title" content={meta.title} />
            <meta property="og:url" content={`${config.url}${meta.slug}`} />
            <meta property="og:site_name" content={meta.title} />
            <meta name="og:image" content={meta.preview_image} />
          </>
        ) : null}
        {meta.private ? (
          <>
            <meta name="robots" content="noindex" />
            <meta name="googlebot" content="noindex" />
          </>
        ) : null}
      </Head>
      <Nav position="after">
        <main>{children}</main>
        <script
          dangerouslySetInnerHTML={{
            __html: `!(function (e) {
        e &&
          [].slice
            .call(e.querySelectorAll("h1, h2, h3, h4, h5, h6"))
            .forEach(function (e) {
              if (e.id) {
                var t = document.createElement("a");
                (t.href = "#" + e.id),
                  (t.textContent = e.textContent),
                  (e.textContent = ""),
                  e.appendChild(t);
              }
            });
      })(document.querySelector && document.querySelector(".Article-content"));`,
          }}
        />

        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "212f94be22414d25af0ea64230f55e8d"}'
        ></script>
        <script src="/fp.js" />
        <script
          src="/screensaver.js"
          message="Giuseppe Gurgone"
          async=""
          defer=""
        />
      </Nav>
    </>
  );
}

function Nav({ position, children }) {
  return (
    <>
      {position === "after" ? children : null}
      <nav className={`Nav${position == "after" ? " Nav--after" : ""}`}>
        <span className="Nav-group">
          <a href="/contact" className="Nav-link is-active">
            contact
          </a>
          <span className="Nav-separator" aria-hidden="true"></span>
          <a
            href="/blog"
            className="Nav-link is-active"
            aria-label="blog archive"
          >
            blog
          </a>
          <span className="Nav-separator" aria-hidden="true"></span>
          <a
            href="https://github.com/giuseppeg"
            className="Nav-link is-active"
            aria-label="blog archive"
          >
            github
          </a>
          {config.twitter ? (
            <>
              <span className="Nav-separator" aria-hidden="true"></span>
              <a
                href={`https://twitter.com/${config.twitter}`}
                className="Nav-link"
                rel="nofollow"
                aria-label="twitter profile"
              >
                {config.twitter}
              </a>
            </>
          ) : null}{" "}
          {config.facebook ? (
            <>
              <span className="Nav-separator" aria-hidden="true"></span>
              <a
                href={`https://facebook.com/${config.facebook}`}
                className="Nav-link Nav-link--social Nav-link--facebook"
                rel="nofollow"
                aria-label="facebook profile"
              >
                fb/{config.facebook}
              </a>
            </>
          ) : null}{" "}
          {config.linkedin ? (
            <>
              <span className="Nav-separator" aria-hidden="true"></span>
              <a
                href={`https://linkedin.com/in/${config.linkedin}`}
                className="Nav-link Nav-link--social Nav-link--linkedin"
                rel="nofollow"
                aria-label="linkedin profile"
              >
                in/{config.linkedin}
              </a>
            </>
          ) : null}
        </span>
      </nav>
      {position !== "after" ? children : null}
    </>
  );
}
