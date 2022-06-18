import Layout from "../layouts/base";

export default function Error() {
  return (
    <Layout>
      <div className="Article">An error occurred</div>
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};
