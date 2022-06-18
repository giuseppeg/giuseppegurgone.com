import "../styles/index.css";

export default function Page({ Component, pageProps }) {
  return <Component {...pageProps} meta={pageProps.meta || {}} />;
}
