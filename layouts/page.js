import config from "../config";
import BaseLayout from "./base";

export default function Page({ meta = {}, children }) {
  return (
    <BaseLayout meta={meta}>
      <style>
        {`.Article-header .Avatar {
            margin-bottom: 3rem;
          }
          .Article-header .Avatar img {
            display: block;
            width: 64px;
            height: 64px;
            border-radius: 100%;
          }
          @media (min-width: 520px) {
            .Article-header {
              position: relative;
              padding-right: 84px;
            }
            .Article-header .Avatar {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              margin-bottom: 0;
            }
          }
          .Article-meta {
            margin-top: 0.25em;
          }`
          .split("\n")
          .map((l) => l.trim())
          .join(" ")}
      </style>
      <article className="Article">
        <header className="Article-header">
          <h1 className="Article-title">
            <a href="/">{meta.title || config.title}</a>
          </h1>
          <p className="Article-meta">{meta.subtitle || config.subtitle}</p>
        </header>
        <section className="Article-content">
          <div className="Copy">{children}</div>
        </section>
      </article>
    </BaseLayout>
  );
}
