/*
  Site content. Everything on the page is rendered from this file.
  Snapshot of the public repositories at github.com/RyanBowie, taken 14 Nov 2026.
  Figures come from each repository's README or its published GitHub Pages report.
*/
window.SITE = {
  owner: {
    name: 'Ryan Bowen',
    handle: 'RyanBowie',
    github: 'https://github.com/RyanBowie',
    repos: 'https://github.com/RyanBowie?tab=repositories',
    avatar: 'assets/media/ryan-bowen.jpg',
    since: 2019
  },
  snapshot: '2026-11-18',

  // Topics that scroll past in the marquee between the numbers and the repository list.
  topics: [
    'copilot-studio', 'power-platform', 'microsoft-365-copilot', 'dataverse',
    'power-automate', 'microsoft-purview', 'power-bi', 'sharepoint',
    'load-testing', 'ai-agents', 'github-copilot', 'motion-graphics'
  ],

  // Copilot Studio agent projects are grouped by the harness their agent runs on, one colour per harness.
  // TO ADD THE NEW MICROSOFT COPILOT HARNESS REPO: add it to `repos` below with
  //     agent: { harness: ['mch'], note: 'one short line' }
  // and it appears in the agents group, its filter, the index and the colour key automatically.
  // A repo can list both harnesses, e.g. harness: ['standard', 'mch'] (it gets a split colour bar).
  // To rename a harness or change its colour, edit it here and nowhere else.
  harnesses: {
    standard: {
      label: 'Standard harness', short: 'standard',
      blurb: "Copilot Studio's harness for rule-based agents and agent flows.",
      color: '#583af7', on: '#ffffff'
    },
    mch: {
      label: 'Microsoft Copilot harness', short: 'ms copilot',
      blurb: "Copilot Studio's harness for reasoning-heavy, multi-step agents and workflows.",
      color: '#5fed83', on: '#180e27'
    }
  },

  categories: {
    benchmark: { label: 'benchmarks', color: '#583af7' },
    reference: { label: 'reference builds', color: '#009cff' },
    guide:     { label: 'guides', color: '#c05200' },
    tool:      { label: 'tools', color: '#f73678' }
  },

  repos: [
    {
      name: 'copilot-studio-load-test',
      title: 'How many people can use a Copilot Studio agent at once?',
      desc: 'Empirical load test of a Copilot Studio agent published to Microsoft 365 Copilot: where the limits actually are, and why throttles arrive as HTTP 200 successes.',
      lang: 'HTML', ext: '.html', cat: 'benchmark', pushed: '2026-10-20',
      site: '/copilot-studio-load-test/',
      agent: { harness: ['standard'], note: 'Scope: standard harness only. The limits are not assumed to apply to the other harness.' },
      feature: {
        order: 3, kicker: 'Load test', stat: '140,405',
        cap: 'real messages pushed through a live Copilot Studio agent',
        blurb: 'Not a simulation, and not a reading of the documentation. The documented quota is 100 generative messages a minute. The agent sustained 175, and every refusal arrived looking like a success. The headline 50,000 message run was performed twice, on different days.',
        facts: ['175/min safe rate', '4.5 s median response', '99.74% answered across 50,182'],
        art: 'knee', bg: '#583af7', fg: '#ffffff', alt: '#5fed83'
      }
    },
    {
      name: 'cat-benchmarks',
      title: 'Cat Benchmarks',
      desc: 'Interactive 3D cat benchmarks: one prompt, many AI models.',
      lang: 'HTML', ext: '.html', cat: 'benchmark', pushed: '2026-11-18',
      site: '/cat-benchmarks/',
      feature: {
        order: 1, kicker: 'A bit of fun', stat: '5.9/10',
        cap: 'is the best cat so far. One prompt, thirteen models, harsh marking.',
        blurb: 'The same one-shot prompt given to thirteen AI models at their highest reasoning setting: build a realistic interactive 3D cat with three.js, from scratch, with no other context. Each cat is scored across seven weighted criteria, and nothing has reached a 7 yet.',
        facts: ['13 models', '7 weighted criteria', '11,995 credits across all runs'],
        art: 'scores', bg: '#f73678', fg: '#180e27', alt: '#ffffff',
        // a real result shown on the poster instead of drawn artwork (falls back to `art` if it can't load).
        // video and still are local copies from the cat-benchmarks repo; `live` links out to the playable cat.
        media: {
          label: 'Claude Opus 5.5 · GitHub Copilot',
          tag: '5.9 / 10',
          video: 'assets/media/cat-opus-5.5-copilot.mp4',
          still: 'assets/media/cat-opus-5.5-copilot.jpg',
          live: '/cat-benchmarks/cats/claude-opus-5.5-copilot/'
        }
      }
    },
    {
      name: 'cathedral-benchmarks',
      title: 'Cathedral Benchmarks',
      desc: 'Interactive 3D Cologne Cathedral managed-app benchmarks: one research pack, one prompt, many AI models.',
      lang: 'JavaScript', ext: '.js', cat: 'benchmark', pushed: '2026-11-20',
      site: '/cathedral-benchmarks/',
      feature: {
        order: 1.5, kicker: 'Sister benchmark', stat: '7.5/10',
        cap: 'is the best Cologne Cathedral so far. One research pack, seven models.',
        blurb: 'One research pack and one fixed prompt, given to seven AI models. Each builds an interactive 3D Cologne Cathedral as a managed app in Copilot Managed Runtime, and every build is also published as a static mirror you can explore. Functional and visual scores are reported separately, and a pass needs 85 and 80.',
        facts: ['7 models', 'Functional and visual scores', 'Built in Copilot Managed Runtime', '33,772 credits across all runs'],
        art: 'towers', bg: '#009cff', fg: '#180e27', alt: '#ffffff',
        // the best build's preview image, a local copy from the cathedral-benchmarks repo; `live` opens its static mirror
        media: {
          label: 'GPT-6 Astra · GitHub Copilot app',
          tag: '7.5 / 10',
          still: 'assets/media/cathedral-gpt-6-astra.jpg',
          live: '/cathedral-benchmarks/builds/gpt-6-astra/',
          foot: ['model-built 3D cathedral', 'explore it']
        }
      }
    },
    {
      name: 'copilot-cowork-app-benchmark',
      title: 'Copilot Cowork managed-app benchmark',
      desc: 'Evidence-led Copilot Cowork managed-app costs, time, capabilities and model/effort comparisons.',
      lang: 'HTML', ext: '.html', cat: 'benchmark', pushed: '2026-10-20',
      site: '/copilot-cowork-app-benchmark/',
      feature: {
        order: 4, kicker: 'Benchmark', stat: '49',
        cap: 'app builds measured for cost, time and capability',
        blurb: 'What does it really cost to have Copilot Cowork build an app? Forty-nine completed measurements across five test scopes, comparing models and reasoning settings using actual /cost readings, without quietly combining different methods.',
        facts: ['5 test scopes', 'Actual /cost readings', 'Demo tenants, indicative only'],
        art: 'grid', bg: '#bba00a', fg: '#180e27', alt: '#583af7'
      }
    },
    {
      name: 'ai-video-creation-guide',
      title: 'AI video creation guide',
      desc: 'Community guide: make code-drawn animated videos with one prompt using Claude Opus 5.5 in the GitHub Copilot app.',
      lang: 'JavaScript', ext: '.js', cat: 'guide', pushed: '2026-10-20',
      site: '/ai-video-creation-guide/',
      feature: {
        order: 2, kicker: 'Guide', stat: '1',
        cap: 'prompt per video. Every frame is drawn in code.',
        blurb: 'Animated videos made from a single prompt. Frames are drawn with Canvas, SVG and WebGL, then rendered to MP4 with headless Edge and ffmpeg. The music and sound effects are synthesised in code. Prompts, source and reusable skills are all included.',
        facts: ['No paid generators', 'No npm', 'Prompts and source included'],
        art: 'frames', bg: '#c05200', fg: '#ffffff', alt: '#180e27'
      }
    },
    {
      name: 'copilot-studio-powerbi-agent',
      title: 'Copilot Studio + Power BI',
      desc: 'A standard Copilot Studio agent that generates DAX, queries Power BI semantic models as the user, and explains results. No Fabric data agent required.',
      lang: 'Python', ext: '.py', cat: 'reference', pushed: '2026-10-20',
      site: '/copilot-studio-powerbi-agent/',
      agent: { harness: ['standard'], note: 'Built in Copilot Studio, used inside Microsoft 365 Copilot.' },
      feature: {
        order: 5, kicker: 'Agent', stat: 'DAX',
        cap: 'written per question, run as the person asking, then explained',
        blurb: 'An experimental standard Copilot Studio agent. It reads prepared metadata, writes new DAX for each question, runs it against a Power BI semantic model with the asking user\'s permissions and explains the result. No Fabric data agent required.',
        facts: ['Configurable solution ZIP', 'Used inside Microsoft 365 Copilot', 'Experimental'],
        art: 'code', bg: '#5fed83', fg: '#180e27', alt: '#583af7'
      }
    },
    {
      name: 'copilot-studio-sharepoint-search-hub',
      title: 'SharePoint Search Hub',
      desc: 'Copilot Studio SharePoint hub-and-spoke search reference: caller-checked results, private Excel export, verified 512-item demo, architecture and unmanaged solution.',
      lang: 'Python', ext: '.py', cat: 'reference', pushed: '2026-11-15',
      site: '/copilot-studio-sharepoint-search-hub/',
      agent: { harness: ['standard'], note: 'Built in Copilot Studio, not Agent Builder.' },
      feature: {
        order: 6, kicker: 'Reference build', stat: '512',
        cap: 'item verified demo across a hub-and-spoke SharePoint estate',
        blurb: 'One Copilot Studio agent searching multiple approved SharePoint sites, instead of a separate agent for every department. Results are caller-checked, carry real source links and continue into a private Excel export. A reference implementation, not a production-ready release.',
        facts: ['Hub and spoke', 'Private Excel export', 'Unmanaged solution included'],
        art: 'hub', bg: '#009cff', fg: '#180e27', alt: '#ffffff'
      }
    },
    {
      name: 'custom-agent-reporting-architecture',
      title: 'Custom Agent Reporting Architecture',
      desc: 'Reference architecture for custom tenant-wide AI agent reporting (Copilot Studio, Agent Builder, SharePoint agents, Microsoft Foundry). Documentation only.',
      lang: null, ext: '.md', cat: 'reference', pushed: '2026-10-20',
      site: '/custom-agent-reporting-architecture/',
      feature: {
        order: 7, kicker: 'Architecture', stat: '4',
        cap: 'agent platforms in one tenant-wide report',
        blurb: 'A reference architecture for reporting on AI agents across Copilot Studio, Agent Builder, SharePoint agents and Microsoft Foundry, built with Power BI, Azure Resource Graph, Dataverse and the Purview audit log. An architecture showcase to guide your own build.',
        facts: ['Documentation only', 'Not a replacement for Microsoft Agent 365'],
        art: 'lanes', bg: '#180e27', fg: '#ffffff', alt: '#ae85ff'
      }
    },
    {
      name: 'copilot-studio-powerplatform-solution-reviewer-site',
      title: 'Solution Reviewer',
      desc: 'Copilot Studio solution reviewer walkthrough with a real canvas-app example, detailed output and setup guidance.',
      lang: 'HTML', ext: '.html', cat: 'reference', pushed: '2026-10-20',
      site: '/copilot-studio-powerplatform-solution-reviewer-site/',
      agent: { harness: ['standard'], note: 'Importable reviewer and automation solutions.' }
    },
    {
      name: 'copilot-studio-documentation-builder',
      title: 'Copilot Studio Documentation Builder',
      desc: 'Template-aligned technical documentation with Copilot Studio: Standard and Microsoft Copilot harness examples, implementation guidance and observed results.',
      lang: 'Python', ext: '.py', cat: 'reference', pushed: '2026-10-20',
      site: '/copilot-studio-documentation-builder/',
      agent: { harness: ['standard', 'mch'], note: 'Examples and observed results on both harnesses.' }
    },
    {
      name: 'copilot-studio-engineering-evidence',
      title: 'Engineering evidence review with Copilot Studio',
      desc: 'Copilot Studio Microsoft Copilot-harness reference: source-faithful engineering evidence, real file outputs and indicative dated test credits.',
      lang: 'Python', ext: '.py', cat: 'reference', pushed: '2026-11-15',
      site: '/copilot-studio-engineering-evidence/',
      agent: { harness: ['mch'], note: 'Large-file inferencing across 53 files and about 2,590 pages.' },
      feature: {
        order: 4.5, kicker: 'Harness reference', stat: '2,590',
        cap: 'pages of long, illustrated manuals reasoned over at once',
        blurb: 'A Microsoft Copilot-harness reference tested on large-file inferencing: reasoning across 53 files and 29 manuals, about 2,590 pages of text, tables, diagrams and scanned pages, rather than summarising one file. It produces complete source-clause records, unresolved conflicts and downloadable evidence.',
        facts: ['53 files, 29 manuals', 'Includes scanned pages (OCR)', 'Indicative, dated test credits'],
        art: 'pages', bg: '#ae85ff', fg: '#180e27', alt: '#ffffff'
      }
    },
    {
      name: 'copilot-interaction-logging',
      title: 'Copilot Interaction Logging',
      desc: 'Documentation-only build guide: collect Microsoft Purview CopilotInteraction audit records into Dataverse with Power Automate and the Microsoft Graph audit log query API.',
      lang: null, ext: '.md', cat: 'guide', pushed: '2026-10-20',
      site: '/copilot-interaction-logging/'
    },
    {
      name: 'slack-to-teams-migration-kit',
      title: 'Slack-to-Teams migration demonstrations',
      desc: 'Slack-to-Teams migration demonstrations with GitHub Copilot: screenshots, workflow, measured costs and limitations. Documentation only.',
      lang: 'HTML', ext: '.html', cat: 'guide', pushed: '2026-10-20',
      site: '/slack-to-teams-migration-kit/'
    },
    {
      name: 'universe-fx-kit',
      title: 'universe-fx-kit',
      desc: 'Showcase: cursor trail, text decode, octopus mascot, scroll reveal and a mini game for GitHub Pages. Dependency-free vanilla JS and CSS.',
      lang: 'JavaScript', ext: '.js', cat: 'tool', pushed: '2026-10-20',
      site: '/universe-fx-kit/'
    },
    {
      name: 'copilot-autoharness',
      title: 'copilot-autoharness',
      desc: 'Self-learning skill layer for the GitHub Copilot app. It distils reusable skills from real sessions, keeps them current and prunes the ones you stop using.',
      lang: 'JavaScript', ext: '.js', cat: 'tool', pushed: '2026-10-06',
      site: null
    }
  ]
};
