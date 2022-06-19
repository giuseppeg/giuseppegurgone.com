import config from "../config.mjs";
import BaseLayout from "./base";
import Time from "../components/Time";

export default function PostLayout({ meta, content }) {
  const twitterDiscuss = encodeURIComponent(`${config.url}${meta.slug}`);
  return (
    <BaseLayout meta={meta}>
      <article className="Article">
        <header className="Article-header">
          <div className="Article-meta">
            <Time date={meta.date} />
          </div>
          <h1 className="Article-title">{meta.title}</h1>
          {meta.subtitle ? (
            <h2 className="Article-subtitle">{meta.subtitle}</h2>
          ) : null}
        </header>
        <a
          className="Article-readmo"
          href={`/${meta.slug}`}
          style={{ visibility: "hidden" }}
          data-readmoapp
        >
          <span className="Article-readmoIcon" aria-hidden="true">
            🎧
          </span>
          <span className="Article-readmoIconSpace"></span>listen to this
          article
        </a>
        <section className="Article-content">
          <div className="Copy">
            {meta.tldr ? (
              <div className="Note">
                <b>TL;DR</b> {meta.tldr}
              </div>
            ) : null}
            {meta.private ? (
              <p className="Note Note--center">
                This page is private. Please do not share it publicly.
              </p>
            ) : null}
            {meta.note ? <p className="Note">{meta.note}</p> : null}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </section>
        <footer className="Article-footer">
          <div className="Article-social Article-social--twitter">
            <div className="Article-twitter">
              <a
                href={`https://twitter.com/search?q=${twitterDiscuss}`}
                rel="noopener"
                target="_blank"
              >
                Discuss on Twitter
              </a>
            </div>
          </div>
          {meta.hn_id ? (
            <div className="Article-social">
              Discuss on{" "}
              <a
                href={`https://news.ycombinator.com/item?id=${meta.hn_id}`}
                rel="noopener"
                rel="nofollow"
              >
                HackerNews
              </a>
            </div>
          ) : null}
          {meta.reddit_link ? (
            <div className="Article-social">
              Discuss on{" "}
              <a href={meta.reddit_link} rel="noopener" rel="nofollow">
                Reddit
              </a>
            </div>
          ) : null}
          <div className="Article-social">
            <a
              href={`https://github.com/giuseppeg/giuseppegurgone.com/edit/master/posts/${meta.slug}.md`}
              rel="noopener"
            >
              Edit on GitHub
            </a>
          </div>
          {meta.disqus ? (
            <div className="Article-social Article-social--comments">
              <div id="disqus_thread"></div>
              <script>
                {`var disqus_config=function(){this.page.url="${config.url}${meta.slug}",this.page.identifier='${meta.date}',this.page.title="${meta.title}"};!function(){var e=document,t=e.createElement("script");t.async="true";t.src="//giuseppegurgoneblog.disqus.com/embed.js",t.setAttribute("data-timestamp",+new Date),(e.head||e.body).appendChild(t)}();`}
              </script>
              <noscript>
                Please enable JavaScript to view the{" "}
                <a href="https://disqus.com/?ref_noscript" rel="nofollow">
                  comments powered by Disqus.
                </a>
              </noscript>
            </div>
          ) : null}
          <a
            href="/blog"
            className="Article-back"
            title="Go back to the articles list"
          >
            ←
          </a>
        </footer>
      </article>
      <script
        src={`https://unpkg.com/@readmo/sdk@latest?${Date.now()}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `if (ReadMo.isBrowserSupported()) {
    document.querySelector('[data-readmoapp]').style.visibility = 'visible'

    ReadMo.embed({
      selector: "a[data-readmoapp]",
      partner: {
        name: "Giuseppe Gurgone",
        url: "https://giuseppegurgone.com",
        image: "https://user-images.githubusercontent.com/711311/101384003-2a51ab80-38ba-11eb-8460-853d88885671.jpeg",
        roundedImage: true,
      },
    })
  }
  `,
        }}
      />
    </BaseLayout>
  );
}
