import Layout from "../layouts/base";
import { getPosts, suggestedPosts, externalPosts } from "../data/posts";
import Time from "../components/Time";

export default function Blog({ posts }) {
  return (
    <Layout>
      <nav className="ArticleExcerpt">
        <a className="ArticleExcerpt-meta" href="/" title="home">
          <span
            aria-hidden="true"
            style={{ fontSize: "1.25em", marginRight: "1rem" }}
          >
            ←
          </span>
        </a>
        <a className="ArticleExcerpt-meta" href="/blog">
          Blog <span className="Nav-separator" aria-hidden="true"></span>
        </a>
        <a className="ArticleExcerpt-meta" href="#external-posts">
          External posts{" "}
          <span className="Nav-separator" aria-hidden="true"></span>
        </a>
        <a className="ArticleExcerpt-meta" href="#suggested-reads">
          Suggested reads
        </a>
      </nav>

      {posts[0].map((post) => (
        <article className="ArticleExcerpt" key={post.url}>
          <h2 className="ArticleExcerpt-title">
            <a className="ArticleExcerpt-link" href={post.url} rel="prefetch">
              {post.title}
            </a>
          </h2>
          <div className="ArticleExcerpt-meta">
            <Time date={post.date} />
          </div>
        </article>
      ))}

      <div
        className="ArticleExcerpt ArticleExcerpt--section"
        id="external-posts"
      >
        <h2 className="ArticleExcerpt-meta">External posts</h2>
      </div>
      {posts[1].map((post) => (
        <article className="ArticleExcerpt" key={post.url}>
          <h2 className="ArticleExcerpt-title">
            <a className="ArticleExcerpt-link" href={post.url} rel="prefetch">
              {post.title}
            </a>
          </h2>
          <div className="ArticleExcerpt-meta">
            <Time date={post.date} />
          </div>
        </article>
      ))}

      <div
        className="ArticleExcerpt ArticleExcerpt--section"
        id="suggested-reads"
      >
        <h2 className="ArticleExcerpt-meta">Suggested reads</h2>
      </div>
      {posts[2].map((post) => (
        <article className="ArticleExcerpt" key={post.url}>
          <h2 className="ArticleExcerpt-title">
            <a className="ArticleExcerpt-link" href={post.url} rel="prefetch">
              {post.title}
            </a>
          </h2>
          <div className="ArticleExcerpt-meta">{post.author}</div>
        </article>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: [getPosts(), externalPosts, suggestedPosts].map(sortPosts),
    },
  };
}

function sortPosts(posts) {
  return posts
    .filter((p) => !p.private && !p.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export const config = {
  unstable_runtimeJS: false,
};
