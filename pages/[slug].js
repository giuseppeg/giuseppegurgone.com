import { compile } from "../data/md";
import Layout from "../layouts/post";

export default function PostPage({ content, meta }) {
  return <Layout meta={meta} content={content} />;
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const props = await compile(`${process.cwd()}/posts`, slug);
  if (!props) {
    return {
      notFound: true,
    };
  }
  return { props };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const config = {
  unstable_runtimeJS: false,
};
