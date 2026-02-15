import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/SEO'

const LorikeetWebPerformanceTrifectaPage = () => {
  return (
    <Layout>
      <Seo
        title="The Web Performance Trifecta: Compression, Preloading, and Code Splitting at Lorikeet"
        description="How we reduced cold load transfer by 75%, cut widget load time to under 700ms, and trimmed 630KB from our bundles through three complementary performance optimizations."
      />

      <article className="py-20 bg-blitz-white min-h-screen">
        <div className="max-width-container section-padding">
          {/* Back Link */}
          <Link
            to="/#blog"
            className="inline-flex items-center text-blitz-soft hover:text-blitz-accent transition-colors duration-200 mb-8"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to posts
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blitz-primary mb-6">
              The Web Performance Trifecta: Compression, Preloading, and Code Splitting at Lorikeet
            </h1>
            <div className="flex flex-wrap items-center text-blitz-charcoal/60 text-sm mb-6">
              <time className="mr-4">February 15, 2026</time>
              <span className="mr-4">&bull;</span>
              <span className="mr-4">10 min read</span>
              <span className="mr-4">&bull;</span>
              <span className="bg-blitz-accent/10 text-blitz-soft px-3 py-1 rounded-full">
                Performance
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose-blitz">
            <h2>The Opportunity: Untapped Performance Across the Stack</h2>

            <p>
              As Lorikeet's product matured, we turned our attention to web performance and
              quickly identified significant headroom. Our static assets were being served
              without HTTP compression, the chat widget was downloading every asset fresh on
              each open, and the design system's bundle configuration meant the widget carried
              more code than it needed. Each of these represented a meaningful opportunity to
              improve the experience for both our users and the customers who embed our widget.
            </p>

            <p>
              We tackled this with three complementary optimizations: enabling HTTP compression
              at the CDN, preloading widget assets with a preparative iframe, and eliminating
              unused code through tree-shaking. Each addressed a different layer of the stack,
              and together they transformed our performance profile.
            </p>

            <div className="bg-gradient-to-r from-blitz-accent/10 to-blitz-soft/10 border border-blitz-accent/20 p-8 rounded-lg my-8">
              <p className="text-xl font-semibold text-blitz-primary mb-4">
                Combined Results
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-3xl font-bold text-blitz-accent">75%</p>
                  <p className="text-sm text-blitz-charcoal/70">Web app cold load reduction (1.56 MB to 392 KB)</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blitz-accent">681ms</p>
                  <p className="text-sm text-blitz-charcoal/70">Chat widget time-to-ready (down from 1.24s)</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blitz-accent">~2.1 MB to 795 KB</p>
                  <p className="text-sm text-blitz-charcoal/70">Chat widget cold load transfer (62% reduction)</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blitz-accent">630KB</p>
                  <p className="text-sm text-blitz-charcoal/70">Trimmed from chat bundles via tree-shaking</p>
                </div>
              </div>
            </div>

            <h2>1.{' '}
              <a
                href="https://www.debugbear.com/blog/http-compression-gzip-brotli"
                className="text-blitz-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                HTTP Compression
              </a>
              : A Low-Hanging Win Hiding in Plain Sight
            </h2>

            <p>
              When we audited the stack, we spotted an opportunity: HTTP compression hadn't
              been enabled at the CDN layer yet. Unlike some providers that compress by default,
              GCP Cloud CDN requires you to explicitly opt in, so it's something you only
              discover when you go looking for it.
            </p>

            <h3>The Audit</h3>

            <p>
              We measured every layer: CDN backend buckets, the NestJS API server, the Remix SSR
              apps, the Vite build pipeline, and the Kubernetes gateway. Here's what we found:
            </p>

            <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
              <thead>
                <tr className="bg-blitz-charcoal/5">
                  <th className="border border-blitz-charcoal/20 p-3 text-left">Layer</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-left">Compression</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">CDN static assets</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-red-600 font-medium">Disabled</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">NestJS API server</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-red-600 font-medium">No middleware</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">Remix SSR apps</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-red-600 font-medium">No middleware</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">GKE L7 load balancer</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-green-600 font-medium">Brotli (origin responses only)</td>
                </tr>
              </tbody>
            </table>

            <p>
              The good news: the GKE L7 external load balancer was already Brotli-compressing
              origin-served responses (HTML, tRPC JSON). The opportunity was in the CDN layer,
              where all 33 JS/CSS bundles were being served at their full uncompressed size.
            </p>

            <h3>The Fix</h3>

            <p>
              The fix was a single Terraform attribute on the CDN backend bucket to enable
              automatic compression. Cloud CDN inspects the <code>Accept-Encoding</code> request
              header and compresses eligible responses on-the-fly. Brotli is preferred for
              the ~97% of browsers that support it, with gzip as fallback. Rollback is instant:
              remove the attribute and re-apply.
            </p>

            <p>
              We also investigated adding <code>compression</code> middleware to the NestJS server,
              but HAR analysis revealed this would be counterproductive. The GKE load balancer
              already Brotli-compresses all non-CDN responses. Adding application-level gzip would
              either downgrade compression quality (gzip instead of Brotli) or cause double
              compression.
            </p>

            <h3>Results</h3>

            <p>
              We ran baseline measurements before the Terraform change and re-measured immediately
              after. The top 5 largest assets tell the story:
            </p>

            <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
              <thead>
                <tr className="bg-blitz-charcoal/5">
                  <th className="border border-blitz-charcoal/20 p-3 text-left">Asset</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">Before</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">After</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">Reduction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3"><code>components</code></td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">267 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">85 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">68%</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3"><code>customer.store</code></td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">198 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">61 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">69%</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3"><code>entry.client</code></td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">126 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">40 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">69%</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3"><code>hub</code></td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">44 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">13 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">71%</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3"><code>browser.client</code></td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">27 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">9 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">69%</td>
                </tr>
                <tr className="bg-blitz-charcoal/5 font-semibold">
                  <td className="border border-blitz-charcoal/20 p-3">Web app total (33 assets)</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">1.56 MB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">392 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right text-green-600">75%</td>
                </tr>
                <tr className="bg-blitz-charcoal/5 font-semibold">
                  <td className="border border-blitz-charcoal/20 p-3">Chat widget total (17 assets + font)</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">1.81 MB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">795 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right text-green-600">56%</td>
                </tr>
              </tbody>
            </table>

            <p>
              The chat widget reduction is lower because its woff2 font (346 KB) is already
              internally compressed and doesn't benefit from CDN-level compression.
            </p>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <p className="font-semibold text-blitz-charcoal mb-2">
                Why This Matters Beyond Raw Transfer Size
              </p>
              <p className="text-sm">
                These are shared CDN assets that every route depends on. Smaller assets mean the
                browser downloads, parses, and executes JavaScript faster, leading to faster Remix
                hydration, earlier route loader execution, and quicker time-to-interactive across
                every page. For the chat widget, which customers embed on their own sites, every
                KB shaved is less overhead on their page load.
              </p>
            </div>

            <h2>2. Preparative Iframe: Warming the Cache Before Users Need It</h2>

            <p>
              The chat widget is embedded on customer websites as a third-party script. When a user
              opens the widget, the browser needs to download all the JS, CSS, and font assets
              before anything renders. On a cold load, that means hitting the network for every
              asset. The preparative iframe changes this by loading a lightweight{' '}
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Speculative_loading"
                className="text-blitz-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                preload route
              </a>
              {' '}in a hidden iframe as soon as the host page loads, well before the user
              actually opens the widget.
            </p>

            <h3>How It Works</h3>

            <p>
              The preload route serves a minimal HTML page that references the same assets the
              widget will need. The browser downloads and caches these assets during idle time. When
              the user eventually opens the widget, 85% of assets are served from the browser cache
              at effectively 0ms instead of fetching from the network.
            </p>

            <h3>Validating with HAR Files</h3>

            <p>
              To verify the preload was actually working, we captured HAR (HTTP Archive) files
              for both the preloaded and non-preloaded flows in production. HAR files record
              every network request the browser makes, including timing, response size, and
              whether assets were served from cache. By comparing the two
              captures side by side, we could confirm that preloaded assets
              showed <code>transferSize: 0</code> (a cache hit) and see the exact timing
              waterfall for each request. This was especially important because the Performance
              Resource Timing API can't detect cache status for cross-origin CDN assets without
              a <code>Timing-Allow-Origin</code> header, so HAR analysis was the most reliable
              way to confirm the behavior.
            </p>

            <pre className="bg-blitz-charcoal text-blitz-white p-6 rounded-lg overflow-x-auto my-6">
{`Without Preload:
[0ms]    GET /widget (302) ────────────────── 362ms
[362ms]  GET /tickets/... (HTML) ──────────── 270ms
[362ms]  GET 13 assets from network ────────  ~900ms
[~1242ms] Widget ready

With Preload (assets already cached):
[0ms]    GET /widget (302) ────────────────── 328ms
[328ms]  GET /tickets/... (HTML) ──────────── 296ms
[328ms]  GET 11 assets from cache ─────────── 0ms
[~769ms]  Widget ready`}
            </pre>

            <h3>Production Results</h3>

            <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
              <thead>
                <tr className="bg-blitz-charcoal/5">
                  <th className="border border-blitz-charcoal/20 p-3 text-left">Metric</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">Without Preload</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">With Preload</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">Improvement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">Time to ready</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">1,242ms</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">769ms</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">38% faster</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">Assets cached</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">0 / 13</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">11 / 13</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">85% cache hit</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">Total asset load time</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">3,837ms</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">1,928ms</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">50% less</td>
                </tr>
              </tbody>
            </table>

            <p>
              The two assets that still hit the network are a hash-specific route chunk and the
              font file, which have different cache keys between the preload and widget routes.
            </p>

            <h2>3.{' '}
              <a
                href="https://webpack.js.org/guides/tree-shaking/"
                className="text-blitz-accent hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tree-Shaking
              </a>
              {' '}and Code Splitting: Less Code, Faster Everything
            </h2>

            <p>
              We identified another opportunity in bundle size. Our design system package didn't
              yet have <code>sideEffects</code> configuration, which meant Vite couldn't tree-shake
              unused exports. Components only used by the web app were being pulled into the chat
              bundle even though the widget never imports them.
            </p>

            <h3>Three Changes, One PR</h3>

            <p>
              <strong>1. Enable tree-shaking:</strong> Adding a <code>sideEffects</code> field to
              the design system's <code>package.json</code> told Vite which exports are
              side-effect-free and can be safely eliminated if unused.
            </p>

            <p>
              <strong>2. Consolidate React into a single chunk:</strong> Tree-shaking caused React
              to get duplicated across multiple chunks. We added a <code>manualChunks</code> configuration
              in Vite to keep React in a single shared chunk.
            </p>

            <p>
              <strong>3. Preload the font:</strong> The Inter font (346 KB) was being downloaded
              during widget load. We added a <code>&lt;link rel="preload"&gt;</code> to the
              preload route so the font is cached during the preparative iframe phase.
            </p>

            <h3>Bundle Impact</h3>

            <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
              <thead>
                <tr className="bg-blitz-charcoal/5">
                  <th className="border border-blitz-charcoal/20 p-3 text-left">Chunk</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">Before</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">After</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">Reduction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3"><code>post-message</code></td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">563 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">73 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">87%</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3"><code>hub</code></td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">305 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">167 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">45%</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3"><code>react</code></td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">(scattered)</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">144 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium">(consolidated)</td>
                </tr>
                <tr className="bg-blitz-charcoal/5 font-semibold">
                  <td className="border border-blitz-charcoal/20 p-3">Server bundle</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">2,807 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">2,013 KB</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right text-green-600">28%</td>
                </tr>
              </tbody>
            </table>

            <p>
              The <code>post-message</code> chunk saw the most dramatic reduction: 87%. This chunk
              contained the bulk of unused design system code that tree-shaking eliminated.
            </p>

            <h2>The Compounding Effect</h2>

            <p>
              These three optimizations are complementary, not redundant. Tree-shaking reduces what
              needs to be compressed. Compression reduces what needs to be transferred. Preloading
              ensures transfers happen before the user is waiting. The combined effect is
              multiplicative.
            </p>

            <p>
              After all three were in production, we re-measured the chat widget with and without
              the preparative iframe:
            </p>

            <table className="w-full border-collapse border border-blitz-charcoal/20 my-6">
              <thead>
                <tr className="bg-blitz-charcoal/5">
                  <th className="border border-blitz-charcoal/20 p-3 text-left">Metric</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">Original (no optimizations)</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">Final (all three)</th>
                  <th className="border border-blitz-charcoal/20 p-3 text-right">Improvement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">Time to ready (with preload)</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">769ms</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">681ms</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">11% faster</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">Time to ready (without preload)</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">1,242ms</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">956ms</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">23% faster</td>
                </tr>
                <tr>
                  <td className="border border-blitz-charcoal/20 p-3">Preload duration</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">442ms</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right">52ms</td>
                  <td className="border border-blitz-charcoal/20 p-3 text-right font-medium text-green-600">88% faster</td>
                </tr>
              </tbody>
            </table>

            <p>
              The preload duration dropping from 442ms to 52ms is particularly notable. With smaller
              bundles and HTTP caching from prior visits, the preload phase becomes essentially
              free. The preload percentage improvement is smaller (29% vs the original 38%) because
              the without-preload baseline is now much faster, there's less room for caching to help
              when assets are already small and compressed.
            </p>

            <div className="bg-blitz-accent/5 border-l-4 border-blitz-accent p-6 my-8">
              <p className="font-semibold text-blitz-charcoal mb-2">
                Where These Gains Matter Most
              </p>
              <ul className="space-y-2 text-sm">
                <li><strong>Chat widget cold loads:</strong> End-customers loading the widget for the first time on a ticket page. CDN transfer dropped from 1.81 MB to 795 KB.</li>
                <li><strong>Web app cold loads:</strong> Users opening the app for the first time or after a deploy invalidates the cache.</li>
                <li><strong>High-latency regions:</strong> Customers far from us-west1 benefit disproportionately since smaller payloads mean fewer round trips.</li>
                <li><strong>Core Web Vitals:</strong> Smaller JS bundles reduce First Contentful Paint and Largest Contentful Paint by getting critical resources to the browser faster.</li>
              </ul>
            </div>

            <h2>Methodology: Measure, Change, Verify</h2>

            <p>
              Every optimization followed the same discipline: capture a baseline measurement,
              make the change, and re-measure immediately. For CDN compression, we wrote a shell
              script that curls all 33 CDN assets and records their <code>Content-Encoding</code> and
              transfer sizes. For the preparative iframe, we compared HAR files and the
              widget's <code>lorikeet:performance</code> postMessage event, which
              includes <code>timeToReady</code>. For tree-shaking, we compared Vite's build output
              before and after.
            </p>

            <p>
              The cross-origin nature of CDN assets made measurement tricky. The Performance
              Resource Timing API can't detect cache status for cross-origin assets without
              a <code>Timing-Allow-Origin</code> header. We verified cache hits through three methods:
              the <code>timeToReady</code> metric (the primary signal), DevTools Network tab
              showing "(disk cache)", and HAR file analysis where <code>transferSize: 0</code> indicates
              a cache hit.
            </p>

            <h2>What We Learned</h2>

            <ol className="list-decimal list-inside space-y-3 ml-4 text-lg">
              <li>
                <strong>Know your provider's defaults.</strong> GCP Cloud CDN requires an
                explicit opt-in for compression. It's worth auditing what your infrastructure
                does out of the box.
              </li>
              <li>
                <strong>Audit every layer.</strong> We found compression unconfigured at the CDN,
                not yet added at the app level, and already working at the load balancer. Each
                layer had different behavior. You can't improve what you haven't measured.
              </li>
              <li>
                <strong>Small bundles compound with preloading.</strong> Tree-shaking made the
                preload phase 88% faster (442ms to 52ms). Optimizations that seem independent often
                amplify each other.
              </li>
              <li>
                <strong>sideEffects is table stakes.</strong> A single line in <code>package.json</code> eliminated
                87% of one chunk. If you maintain a shared package consumed by multiple apps, ensure
                bundlers can tree-shake it.
              </li>
              <li>
                <strong>Don't compress twice.</strong> We nearly added gzip middleware to NestJS
                before discovering the load balancer already applies Brotli. HAR analysis saved us
                from degrading compression quality.
              </li>
            </ol>

            <h2>Closing Thoughts</h2>

            <p>
              These three optimizations reinforced a principle I keep coming back to: the
              methodology matters more than any individual fix. Instrument, measure, identify,
              optimize. The same discipline that guided our{' '}
              <Link
                to="/blog/sdk-to-ssr-performance-optimization"
                className="text-blitz-accent hover:underline"
              >
                SSR performance work
              </Link>
              {' '}applied just as well to infrastructure-level changes like CDN compression.
              Performance wins are everywhere once you start measuring.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-blitz-charcoal/10">
            <Link to="/#blog" className="btn-primary">
              &larr; Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default LorikeetWebPerformanceTrifectaPage
