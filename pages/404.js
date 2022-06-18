import Layout from "../layouts/base";

export default function NotFound() {
  return (
    <Layout>
      <div className="Article">404 Not found</div>
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};
