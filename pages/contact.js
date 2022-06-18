import Layout from "../layouts/page";

export default function Contact() {
  return (
    <Layout>
      {/*
        I am available for consulting and contract work that is about developer **tools**, **architecture**, JavaScript and testing **infrastructure**, web application **performance**, NFT projects and custom Solidity **Smart Contracts** development, and **design systems**.

        My offering also includes **technical oversight and team guidance**, leading groups of engineers through all the phases of a project: considering my experience my value often lies in **guiding and advising** your team and helping you **figure out solutions that have a high impact on your business**.

        If you want to hire me, just let me know about your project and let’s talk:
      */}
      <form
        action="https://contact-form-fn.vercel.app/api"
        method="post"
        className="Form"
        style={{ margin: "2rem auto" }}
        id="form"
      >
        <label>
          Company
          <input type="text" name="company" placeholder="Acme Inc." required />
        </label>
        <label>
          Name
          <input type="text" name="fullname" placeholder="Jon Doe" />
        </label>
        <label>
          Address
          <input type="text" name="address" placeholder="Market St." />
        </label>
        <label>
          Your email address
          <input
            type="email"
            name="email"
            placeholder="contact@acme.com"
            required
          />
        </label>
        <label>
          Subject
          <input type="text" name="project" placeholder="Hello there." />
          {/* Project type
    <select name="project" required>
      <option value="Infra">Tooling and Frontend infrastructure</option>
      <option value="Audit">Performance or Codebase Audit</option>
      <option value="Team Guidance">Team Guidance</option>
      <option value="NFT / Solidity">NTF project / Solidity smart contract</option>
      <option value="Design Systems">Design Systems</option>
      <option value="Other">Other</option>
    </select> */}
        </label>
        {/*<label>
    Budget
    <select name="budget" required>
      <option value="€1000-3000 EUR">€1000-2000 EUR</option>
      <option value="€3000-5000 EUR">€3000-5000 EUR</option>
      <option value="€5000-10000 EUR">€5000-10000 EUR</option>
      <option value="€10000+ EUR">€10000+ EUR</option>
    </select>
  </label>*/}

        <label>
          Message
          <textarea
            name="message"
            placeholder="Hey Giuseppe..."
            required
          ></textarea>{" "}
        </label>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button>
            Send<span aria-hidden="true"> →</span>
          </button>
        </div>
      </form>

      {/*
## Clients

Throughout my career I have lived in five different countries and worked for great companies and with great customers:

Yelp, Automattic, DatoCMS, Vercel, Swiss Red Cross, PSPDFKit, Graduateland.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">We&#39;ve been working with Giuseppe for many years, he&#39;s a great engineer, understands product, and gets things done.</p><br>&mdash; Peter Steinberger, CEO at PSPDFKit GmbH.</blockquote>

Some of my open source work runs on world-class websites like TikTok, Hulu, Nike, Vercel, Tencent News (xw.qq.com).

Over the years I have also built direct and privileged connections with engineers and leaders who work at Google, Facebook, Yelp, Uber, Netflix, Vercel, Twitter, Amazon and many more.

## Open Source

Over the years, I have done highly impactful contributions to projects like SUIT CSS, Next.js, React Native for Web and many more.

My most successful open source projects are [xm](https://twitter.com/giuseppegurgone/status/1305851405660549122) and Vercel's [styled-jsx](https://www.npmjs.com/package/styled-jsx) which I co-authored.

I love to work in public on projects that have an impact on your business and the entire community.

For example the tech team at the Swiss Red Cross hired me to improve the performance of the PostCSS plugin for styled-jsx.

> With this work the plugin is now ~5x faster!
>
> The development build which previously took ~2.5 minutes
> now takes 29 seconds!

[Hit me up](#form) if you want to sponsor my work or need help with an open source project.

*/}

      <script
        dangerouslySetInnerHTML={{
          __html: `
    document.querySelector('.Form').addEventListener('submit', event => {
    event.preventDefault()
    const confirmcode = [Math.ceil(Math.random()*10),Math.ceil(Math.random()*10)]
    const typedcode = window.prompt(\`Please confirm by typing the result of the following sum:
    \${confirmcode[0]}+\${confirmcode[1]}
    \`)

    if (Number(typedcode.trim()) !== confirmcode[0]+confirmcode[1]) {
      alert('Wrong sum. Please try again.')
      return
    }

    const button = event.target.querySelector('button')
    button.disabled = true

    fetch(event.target.action, {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(Object.fromEntries(new FormData(event.target)))
    }).then(response => {
      button.disabled = false
      if (!response.ok) {
        if (gtag) {
          gtag("event", "contact_error", {
            "event_category": "error",
            "event_label": "contact error",
            "value": \`\${response.status} \${response.statusText}\`
          })
        }
        throw new Error()
      }
      const success = document.createElement('p')
      success.classList.add('Note')
      success.innerHTML = 'Thank you for contacting me! I will get back to you as soon as possible.<br>Have a great day!'
      event.target.replaceWith(success)
    }).catch(() => {
      button.disabled = false
      alert(\`⚠ Something went wrong. Please contact me at \${atob('Y29udGFjdEBnZ3VyZ29uZS5jb20')}\`)
    })
  })`,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `.Form > :nth-child(2), .Form > :nth-child(3) {
    position: absolute;
    visibility: hidden;
    user-select: none;
    z-index: -1
  }`,
        }}
      />
    </Layout>
  );
}

export const config = {
  unstable_runtimeJS: false,
};
