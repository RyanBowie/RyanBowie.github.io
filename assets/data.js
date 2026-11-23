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

  // B230, the footer robot. It tells a random LLM fact or joke each time it is poked.
  // The pool is curated by hand, not generated live: a public page should not repeat made-up "facts".
  // Every fact was checked against a primary or reputable source on the `checked` date below, and the
  // Copilot Studio harness facts come from Microsoft Learn ("Harnesses overview"). Model details change
  // fast, so re-check before adding anything time-sensitive. Each item is [kind, topic, text].
  bot: {
    name: 'B230',
    checked: '2026-11-15',

    // Shared counters ("everyone: N facts, N jokes"). Leave blank and the page simply hides them.
    // After deploying counter-worker/ (see its README) paste the Worker's URL here, e.g.
    //   counterUrl: 'https://b230-counters.YOURNAME.workers.dev',
    counterUrl: '',

    topics: {
      anthropic: 'Anthropic', openai: 'OpenAI', xai: 'xAI Grok', mistral: 'Mistral',
      google: 'Google', meta: 'Meta', copilot: 'Copilot', llm: 'LLMs',
      microsoft: 'Microsoft', github: 'GitHub', deepseek: 'DeepSeek', history: 'AI history',
      race: 'Model race', local: 'Local models'
    },

    items: [
      // ── facts ──
      ['fact', 'anthropic', `Anthropic was founded in 2021 by former OpenAI researchers, including siblings Dario and Daniela Amodei.`],
      ['fact', 'anthropic', `Anthropic's Haiku, Sonnet and Opus tier names run from a short poem to a full musical work: fastest model to most capable.`],
      ['fact', 'anthropic', `Constitutional AI, published by Anthropic in 2022, trains a model against a written set of principles, not only human labels.`],
      ['fact', 'anthropic', `Anthropic released the Model Context Protocol in November 2024 as an open standard for connecting AI models to tools and data.`],
      ['fact', 'llm', `MCP has since spread beyond Anthropic: OpenAI, Google and Microsoft have all added support for it.`],

      ['fact', 'openai', `ChatGPT launched on 30 November 2022 and passed one million users in about five days.`],
      ['fact', 'openai', `GPT stands for Generative Pre-trained Transformer.`],
      ['fact', 'openai', `GPT-3 (2020) had 175 billion parameters, more than a hundred times GPT-2's 1.5 billion.`],
      ['fact', 'openai', `OpenAI's DALL·E is named after the painter Salvador Dalí and Pixar's robot WALL·E.`],
      ['fact', 'openai', `In August 2025 OpenAI released gpt-oss-120b and gpt-oss-20b, open-weight models under the Apache 2.0 licence.`],
      ['fact', 'openai', `OpenAI was founded in December 2015 as a non-profit AI research lab.`],

      ['fact', 'xai', `Grok comes from Robert Heinlein's 1961 novel Stranger in a Strange Land, where it means to understand something deeply.`],
      ['fact', 'xai', `In March 2024 xAI released the weights of Grok-1, a 314-billion-parameter model, under the Apache 2.0 licence.`],
      ['fact', 'xai', `Grok-1 is a mixture-of-experts model: only 2 of its 8 experts run for each token.`],

      ['fact', 'mistral', `Mistral AI was founded in Paris in 2023. Its name comes from the strong wind that blows across southern France.`],
      ['fact', 'mistral', `Mistral's chat assistant is called Le Chat, which is French for "the cat".`],
      ['fact', 'mistral', `Mistral 7B, released in September 2023, came under the permissive Apache 2.0 licence.`],
      ['fact', 'mistral', `Mixtral 8x7B (December 2023) is a sparse mixture of experts: each token is routed to 2 of its 8 experts.`],

      ['fact', 'google', `The Transformer behind almost every modern LLM came from Google's 2017 paper "Attention Is All You Need".`],
      ['fact', 'google', `Google's Bard chatbot was renamed Gemini in February 2024.`],
      ['fact', 'google', `Gemini is Latin for "twins". Jeff Dean has said the twins are the Google Brain and DeepMind teams.`],
      ['fact', 'google', `Google DeepMind was formed in April 2023 by merging DeepMind with the Google Brain team.`],

      ['fact', 'meta', `Llama stands for Large Language Model Meta AI.`],
      ['fact', 'meta', `Meta released Llama 2 in July 2023, with weights free for research and commercial use under Meta's own licence.`],

      ['fact', 'copilot', `Copilot Studio was called Power Virtual Agents until November 2023.`],
      ['fact', 'copilot', `Microsoft 365 Copilot became generally available to enterprise customers on 1 November 2023.`],
      ['fact', 'copilot', `Dataverse, the data platform under Power Platform, was called the Common Data Service until November 2020.`],
      ['fact', 'copilot', `Copilot Studio can add tools from a Model Context Protocol (MCP) server to an agent.`],
      ['fact', 'copilot', `Copilot Studio has three harnesses: Standard, Customer Conversation and Microsoft Copilot.`],
      ['fact', 'copilot', `Copilot Studio's Standard harness powers rule-based agents and agent flows.`],
      ['fact', 'copilot', `The Microsoft Copilot harness is the one built for reasoning-heavy, multi-step agents and workflows.`],
      ['fact', 'copilot', `Agents running on the Microsoft Copilot harness use Copilot Credits.`],
      ['fact', 'copilot', `GitHub Copilot began as a technical preview in June 2021, powered by OpenAI Codex.`],

      ['fact', 'llm', `LLMs read tokens, not letters, which is why counting the r's in "strawberry" is harder than it looks.`],
      ['fact', 'llm', `Temperature controls how random a model's next-word choice is. At zero it is close to deterministic.`],
      ['fact', 'llm', `An agent harness is everything around the model: the loop, the tools, the memory and the context handling.`],
      ['fact', 'llm', `A context window is how much text a model can consider at once, measured in tokens.`],
      ['fact', 'llm', `DeepMind's 2022 Chinchilla paper argued many big models were undertrained: model size and training data should grow together.`],
      ['fact', 'llm', `ELIZA, built at MIT by Joseph Weizenbaum in 1966, is often called the first chatbot.`],
      ['fact', 'llm', `RLHF, reinforcement learning from human feedback, is a big reason chat models follow instructions instead of just continuing the text.`],
      ['fact', 'llm', `A hallucination is a fluent, confident answer that happens to be false.`],

      // ── jokes ──
      ['joke', 'llm', `Why did the LLM bring a ladder? To reach a bigger context window.`],
      ['joke', 'llm', `Temperature 0: ask twice, get one answer. Temperature 1: ask twice, get two confident answers.`],
      ['joke', 'llm', `A tokenizer walks into a bar and orders "un", "believ" and "able".`],
      ['joke', 'llm', `I asked a model for a random number. It said 7. I asked again. It said 7.`],
      ['joke', 'llm', `How many prompt engineers does it take to change a lightbulb? Let's think step by step.`],
      ['joke', 'llm', `The model cited a paper that doesn't exist. The DOI looked fantastic, though.`],
      ['joke', 'llm', `Agents never fail. They just retry with increasing confidence.`],
      ['joke', 'llm', `An agent without a harness is just a language model with ambition.`],
      ['joke', 'llm', `Fine-tuning: teaching an old model new tricks and occasionally making it forget the old ones.`],
      ['joke', 'llm', `Benchmarks: where every model is best at something and nobody is best at everything.`],
      ['joke', 'llm', `I asked the LLM to sort a list. Then I wrote a test to check the sort. Trust, but verify.`],
      ['joke', 'llm', `Agent status: 200 OK. Agent reality: on fire.`],
      ['joke', 'llm', `MCP is the USB-C of agents: one plug, and somebody still brings the wrong cable.`],
      ['joke', 'anthropic', `Claude walks into a bar. "What can I get you?" "Happy to help! Could I ask a couple of clarifying questions first?"`],
      ['joke', 'anthropic', `Anthropic names its models after poetry. I'd name mine after error messages: Timeout, Retry, Rate Limit.`],
      ['joke', 'openai', `GPT: Generative Pre-trained Transformer. On a Monday morning: Guess, Pretend, Talk.`],
      ['joke', 'openai', `ChatGPT hit a million users in five days. My side project hit a million TODOs.`],
      ['joke', 'xai', `To "grok" is to understand deeply. To "rm -rf" is to understand too late.`],
      ['joke', 'xai', `Heinlein gave us "grok" in 1961. We still say "it just works" without understanding why.`],
      ['joke', 'mistral', `Mistral's assistant is Le Chat, French for "the cat". Naturally I asked it to get off my keyboard.`],
      ['joke', 'mistral', `Mixtral: eight experts, two turn up per token. Finally, a team that runs like mine.`],
      ['joke', 'google', `Google invented the Transformer and the whole industry transformed. Attention really was all we needed.`],
      ['joke', 'google', `Gemini means twins: two teams, one model. Group projects, but it worked.`],
      ['joke', 'meta', `Llama: Large Language Model Meta AI. Not the animal, which also spits when you ask it something difficult.`],
      ['joke', 'copilot', `A Copilot Studio agent is only as good as its instructions. Mine says: be helpful. Brave.`],
      ['joke', 'copilot', `A harness won't make the model smarter. It just makes it harder to wander off into the weeds.`],
      ['joke', 'copilot', `GitHub Copilot is a copilot, not an autopilot. The difference matters when something is on fire.`],
      ['joke', 'copilot', `Low-code: the art of writing code with extra steps and a lovely canvas.`],

      // ── more facts: AI history and how it works ──
      ['fact', 'history', `The term "artificial intelligence" comes from the 1955 proposal for a 1956 summer workshop at Dartmouth, written by John McCarthy and colleagues.`],
      ['fact', 'history', `Alan Turing's 1950 paper "Computing Machinery and Intelligence" introduced what became the Turing test, which he called the imitation game.`],
      ['fact', 'history', `In 1948 Claude Shannon generated English-like text from letter and word statistics, a tiny ancestor of today's language models.`],
      ['fact', 'history', `IBM's Deep Blue beat world chess champion Garry Kasparov in a 1997 match.`],
      ['fact', 'history', `DeepMind's AlphaGo beat the Go champion Lee Sedol 4-1 in March 2016.`],
      ['fact', 'history', `AlexNet's win in the 2012 ImageNet competition helped kick off the modern deep learning boom.`],
      ['fact', 'history', `Geoffrey Hinton and John Hopfield shared the 2024 Nobel Prize in Physics for foundational work on artificial neural networks.`],
      ['fact', 'history', `Demis Hassabis and John Jumper shared the 2024 Nobel Prize in Chemistry for AlphaFold, alongside David Baker for protein design.`],
      ['fact', 'history', `Geoffrey Hinton, Yann LeCun and Yoshua Bengio shared the 2018 Turing Award for their work on deep learning.`],
      ['fact', 'history', `AI has had "winters": in the 1970s and again in the late 1980s, funding and enthusiasm collapsed after big promises went unmet.`],
      ['fact', 'microsoft', `Microsoft's Tay chatbot was taken offline in March 2016, less than a day after it launched on Twitter.`],
      ['fact', 'meta', `Meta's Galactica science model was pulled in November 2022, three days after its public demo launched.`],
      ['fact', 'history', `The 2021 "stochastic parrots" paper, by Emily Bender, Timnit Gebru and colleagues, questioned the risks of ever-larger language models.`],
      ['fact', 'google', `Word2vec, released by Google in 2013, popularised word embeddings: "king" minus "man" plus "woman" lands near "queen".`],
      ['fact', 'llm', `Hugging Face is named after the hugging-face emoji.`],
      ['fact', 'llm', `Common Crawl, a non-profit founded in 2007 that archives the web, is a major source of LLM training text.`],
      ['fact', 'llm', `Byte-pair encoding, now a standard way to split text into tokens, began life as a 1994 data compression algorithm.`],
      ['fact', 'llm', `A token averages about four characters of English, so 1,000 tokens is roughly 750 words.`],
      ['fact', 'meta', `Retrieval-augmented generation got its name from a 2020 paper by researchers at Facebook AI Research and collaborators.`],
      ['fact', 'google', `Google researchers showed in 2022 that chain-of-thought prompting, writing out the reasoning, improves answers on maths problems.`],
      ['fact', 'llm', `Adding "Let's think step by step" to a prompt improved zero-shot reasoning in large models, a 2022 finding by Kojima and colleagues.`],
      ['fact', 'llm', `Simon Willison coined the term "prompt injection" in September 2022.`],
      ['fact', 'llm', `Andrej Karpathy coined "vibe coding" in a February 2025 post, and Collins Dictionary made it its 2025 Word of the Year.`],
      ['fact', 'llm', `Merriam-Webster chose "slop", meaning low-quality AI-generated content, as its 2025 Word of the Year.`],
      ['fact', 'llm', `Cambridge Dictionary chose "hallucinate" as its 2023 Word of the Year after the word gained an AI meaning.`],
      ['fact', 'microsoft', `LoRA, the low-rank adaptation trick for cheap fine-tuning, came from Microsoft researchers in 2021.`],
      ['fact', 'llm', `Model distillation, training a small model to mimic a big one, was popularised by a 2015 paper by Geoffrey Hinton and colleagues.`],
      ['fact', 'llm', `Quantisation stores a model's weights in fewer bits, such as 4, so big models fit on smaller hardware.`],
      ['fact', 'openai', `OpenAI's 2020 scaling-laws paper found that a model's loss falls predictably as size, data and compute grow.`],
      ['fact', 'google', `Several authors of the Transformer paper went on to found AI companies, including Cohere and Character.AI.`],
      ['fact', 'openai', `GPT-1 (2018) had 117 million parameters, tiny next to today's models.`],
      ['fact', 'openai', `OpenAI released GPT-2 in stages in 2019, citing worries about misuse of the full model.`],
      ['fact', 'openai', `The GPT-3 paper was titled "Language Models are Few-Shot Learners".`],
      ['fact', 'google', `BERT, released by Google in 2018, stands for Bidirectional Encoder Representations from Transformers.`],
      ['fact', 'google', `Google's PaLM, announced in 2022, had 540 billion parameters.`],
      ['fact', 'anthropic', `Claude 2.1 (November 2023) offered a 200,000-token context window, roughly 150,000 words.`],
      ['fact', 'google', `Google's Gemini 1.5 Pro, announced in February 2024, introduced a context window of up to one million tokens.`],
      ['fact', 'openai', `GPT-3's context window was about 2,000 tokens. Today's long-context models handle a million or more.`],
      ['fact', 'llm', `MMLU, a popular benchmark, tests models on 57 subjects, from maths to law.`],
      ['fact', 'openai', `HumanEval, OpenAI's 2021 coding benchmark, has 164 hand-written programming problems.`],
      ['fact', 'llm', `SWE-bench tests whether a model can fix real issues from popular open-source Python projects on GitHub.`],
      ['fact', 'llm', `Chatbot Arena, started by LMSYS at UC Berkeley in 2023, ranks models using head-to-head votes from users.`],
      ['fact', 'llm', `ARC, created by François Chollet in 2019, tests abstract reasoning with small coloured-grid puzzles.`],
      ['fact', 'openai', `Whisper, OpenAI's speech model, was trained on 680,000 hours of audio and released in September 2022.`],
      ['fact', 'openai', `OpenAI added function calling to its API in June 2023, an early step towards today's agents.`],
      ['fact', 'openai', `OpenAI's o1 reasoning model, previewed in September 2024, was reportedly codenamed Strawberry.`],
      ['fact', 'openai', `GPT-4o, released in May 2024, has an "o" for "omni": one model for text, audio and images.`],
      ['fact', 'openai', `ChatGPT Plus launched in February 2023 at $20 a month.`],
      ['fact', 'microsoft', `Microsoft invested $1 billion in OpenAI in 2019, three years before ChatGPT.`],
      ['fact', 'openai', `Sora, OpenAI's text-to-video model, was first shown in February 2024.`],

      // ── more facts: model makers ──
      ['fact', 'anthropic', `Anthropic is a public benefit corporation, and its Long-Term Benefit Trust can elect some of its board members.`],
      ['fact', 'anthropic', `Anthropic's Responsible Scaling Policy (September 2023) defines AI Safety Levels, loosely modelled on biosafety levels.`],
      ['fact', 'anthropic', `In October 2024 an upgraded Claude 3.5 Sonnet added "computer use" in beta: Claude could look at a screen, move a cursor and click.`],
      ['fact', 'anthropic', `Anthropic launched Claude Code as a research preview in February 2025, alongside Claude 3.7 Sonnet.`],
      ['fact', 'anthropic', `Anthropic's 2024 "Golden Gate Claude" demo showed a model that kept steering every answer back to the Golden Gate Bridge.`],
      ['fact', 'anthropic', `Claude's 100,000-token context window arrived in May 2023, long enough for a whole novel.`],
      ['fact', 'anthropic', `Anthropic's published constitution for Claude draws on sources including the UN Universal Declaration of Human Rights.`],
      ['fact', 'anthropic', `Claude 3.7 Sonnet (February 2025) was Anthropic's first hybrid reasoning model: quick answers or extended thinking from one model.`],
      ['fact', 'anthropic', `Anthropic announced the first Claude on 14 March 2023, the same day OpenAI released GPT-4.`],
      ['fact', 'xai', `xAI released Grok 4 in July 2025, trained on its Colossus supercomputer in Memphis.`],
      ['fact', 'xai', `xAI described Grok as modelled on The Hitchhiker's Guide to the Galaxy: a witty answer machine.`],
      ['fact', 'xai', `Grok launched in November 2023, first for subscribers of X Premium+.`],
      ['fact', 'xai', `In March 2025 xAI acquired X, formerly Twitter, in an all-stock deal.`],
      ['fact', 'mistral', `Mistral AI's three founders came from DeepMind and Meta before starting the company in Paris in 2023.`],
      ['fact', 'mistral', `Microsoft and Mistral announced a multi-year partnership in February 2024, with Mistral Large first on Azure.`],
      ['fact', 'mistral', `Mistral AI released Codestral, a model focused on code, in May 2024.`],
      ['fact', 'mistral', `Pixtral 12B (September 2024) was Mistral's first model to take both images and text.`],
      ['fact', 'google', `Google announced the Agent2Agent (A2A) protocol in April 2025 and handed it to the Linux Foundation that June.`],
      ['fact', 'google', `Google revealed its first Tensor Processing Unit, a chip built for neural networks, in 2016.`],
      ['fact', 'google', `Google bought DeepMind in 2014. The London lab had been founded in 2010.`],
      ['fact', 'google', `Google's Gemma open models launched in February 2024.`],
      ['fact', 'google', `Google's Bard launch demo in February 2023 included a wrong James Webb telescope claim, and Alphabet's shares fell.`],
      ['fact', 'google', `DeepMind's AlphaFold database grew to over 200 million predicted protein structures in 2022.`],
      ['fact', 'meta', `Meta's original LLaMA weights leaked as a torrent in March 2023, days after it shared them with researchers.`],
      ['fact', 'meta', `Meta billed Llama 3.1 405B, released in July 2024, as the largest openly available foundation model.`],
      ['fact', 'meta', `PyTorch began at Meta, then Facebook, and now lives under the Linux Foundation's PyTorch Foundation.`],
      ['fact', 'deepseek', `DeepSeek-R1, released on 20 January 2025, is an open-weight reasoning model under the MIT licence.`],
      ['fact', 'deepseek', `DeepSeek-R1 has 671 billion parameters, according to DeepSeek's technical report.`],
      ['fact', 'deepseek', `DeepSeek is a Chinese AI lab based in Hangzhou, backed by the hedge fund High-Flyer.`],

      // ── more facts: Microsoft, GitHub and Copilot Studio ──
      ['fact', 'microsoft', `Bing Chat and Bing Chat Enterprise were renamed Copilot at Microsoft Ignite on 15 November 2023.`],
      ['fact', 'microsoft', `Microsoft's Phi family are small language models. The 2023 paper behind Phi-1 was titled "Textbooks Are All You Need".`],
      ['fact', 'microsoft', `Azure AI Studio became Azure AI Foundry in 2024, and Azure AI Foundry became Microsoft Foundry in 2025.`],
      ['fact', 'copilot', `Microsoft Flow was renamed Power Automate in November 2019.`],
      ['fact', 'github', `Microsoft bought GitHub in 2018 for $7.5 billion.`],
      ['fact', 'github', `GitHub Copilot became generally available in June 2022, a year after its technical preview.`],
      ['fact', 'copilot', `A Copilot Studio agent can be published to channels such as Microsoft Teams and Microsoft 365 Copilot.`],
      ['fact', 'copilot', `In Copilot Studio, adding tools from an MCP server needs generative orchestration turned on.`],
      ['fact', 'copilot', `Microsoft provides a Dataverse MCP server, so Copilot Studio agents can work with Dataverse data.`],
      ['fact', 'copilot', `Copilot Studio agents can use knowledge sources such as SharePoint sites and public websites.`],
      ['fact', 'copilot', `Copilot Studio's Customer Conversation harness is for agents that answer questions and resolve issues over voice and chat.`],
      ['fact', 'copilot', `Microsoft Purview's audit log can record Microsoft 365 Copilot interactions as CopilotInteraction events.`],
      ['fact', 'copilot', `Microsoft Flow became generally available on 1 November 2016.`],
      ['fact', 'copilot', `Power Virtual Agents, the ancestor of Copilot Studio, was announced at Microsoft Ignite in November 2019.`],

      // ── more facts: how LLMs work ──
      ['fact', 'llm', `Embeddings turn text into lists of numbers, so that similar meanings end up close together.`],
      ['fact', 'llm', `A model's parameters are the numbers it learns in training. "70B" means 70 billion of them.`],
      ['fact', 'llm', `Mixture-of-experts models send each token to a few specialist sub-networks instead of the whole model.`],
      ['fact', 'llm', `Greedy decoding always picks the likeliest next token. Sampling methods such as top-p add variety.`],
      ['fact', 'llm', `A system prompt is a hidden instruction that sets a chat model's role and rules before the conversation starts.`],
      ['fact', 'llm', `Prompt injection hides instructions in content an agent reads, such as a web page or email, to hijack its behaviour.`],
      ['fact', 'llm', `Tool use, or function calling, lets a model ask for code to be run and then read the result.`],
      ['fact', 'llm', `Most agents run a loop: think, call a tool, read the result, repeat until the job is done.`],
      ['fact', 'llm', `Fine-tuning changes a model's weights. RAG leaves the weights alone and puts relevant documents in the prompt.`],
      ['fact', 'llm', `KV caching stores earlier attention results so the model doesn't recompute them for every new token.`],
      ['fact', 'llm', `Open weights means you can download the trained model. Open source usually expects more: the code and a permissive licence.`],
      ['fact', 'llm', `LLM prices are quoted per million tokens, and input and output tokens are often priced differently.`],
      ['fact', 'llm', `Grounding a model in retrieved documents can reduce hallucinations, but it doesn't eliminate them.`],
      ['fact', 'llm', `Benchmark contamination is when test questions leak into training data, inflating a model's score.`],
      ['fact', 'llm', `Model cards, proposed by Google researchers in 2018, are short documents on what a model is for and where it fails.`],
      ['fact', 'llm', `Red teaming means deliberately trying to make a model misbehave, so weaknesses are found before users find them.`],
      ['fact', 'llm', `Speculative decoding speeds things up: a small model drafts tokens and a large model checks them.`],
      ['fact', 'llm', `Attention lets every token weigh every other token in the context when working out its meaning.`],
      ['fact', 'llm', `Transformers replaced recurrent networks partly because they can process a whole sequence in parallel during training.`],

      // ── more jokes: LLMs and agents ──
      ['joke', 'llm', `My agent has two modes: working, and working very confidently on the wrong thing.`],
      ['joke', 'llm', `Prompt engineering is talking to a very literal intern who has read the entire internet.`],
      ['joke', 'llm', `An LLM walks into a bar, orders a drink, and then politely explains the history of drinks.`],
      ['joke', 'llm', `RAG: because even a language model should be allowed to look things up.`],
      ['joke', 'llm', `I fixed the hallucination by adding "do not hallucinate" to the prompt. The model said it would try.`],
      ['joke', 'llm', `The context window is full. Please delete something you love.`],
      ['joke', 'llm', `Token budget: the only budget where "just one more word" costs money.`],
      ['joke', 'llm', `I told the model to be concise. It wrote three paragraphs on why concision matters.`],
      ['joke', 'llm', `Zero-shot: no examples, full confidence.`],
      ['joke', 'llm', `Few-shot learning: show the model three examples and it will generalise to a fourth you didn't want.`],
      ['joke', 'llm', `Prompt injection: a web page tells your agent "ignore previous instructions" and your agent says "sure".`],
      ['joke', 'llm', `Chain of thought: showing your work, even when the answer was wrong from step one.`],
      ['joke', 'llm', `The model aced the benchmark. The benchmark had been in its training data. Revision strategy: 100%.`],
      ['joke', 'llm', `Open weights: the model is free to download. The GPUs are not.`],
      ['joke', 'llm', `Vector databases: for when "find me something similar" is a feature, not a cry for help.`],
      ['joke', 'llm', `My favourite AI safety feature is the line that reads "please verify important information".`],
      ['joke', 'llm', `Retrying: doing the same thing again and hoping for a different token.`],
      ['joke', 'llm', `System prompt: 4,000 words of rules. User: "hi". Model: reads all 4,000 words, replies "Hello!"`],
      ['joke', 'llm', `Rate limits: the only thing that scales perfectly with enthusiasm.`],
      ['joke', 'llm', `Ask a model about last month and watch it confidently describe last year.`],
      ['joke', 'llm', `I asked an LLM for a regex. Now I have two problems and a very confident explanation.`],
      ['joke', 'llm', `Temperature 2: poetry. Temperature 0: tax forms.`],
      ['joke', 'llm', `I fine-tuned a model on my emails. Now it apologises for the delayed reply to everything.`],
      ['joke', 'llm', `Nothing says "production ready" like a prompt that says PLEASE in capital letters.`],
      ['joke', 'llm', `Benchmarks say my model is a genius. The model says I'm absolutely right. We agree on very little else.`],
      ['joke', 'llm', `The harness: because "let the model run free" sounded great right up until it touched the wrong folder.`],
      ['joke', 'llm', `An agent reviewed its own work and gave itself five stars.`],
      ['joke', 'llm', `Vibe coding: describe it, accept everything, discover the bug six features later. Evidence over vibes, please.`],
      ['joke', 'llm', `"Slop" is a word of the year now. Draft 1: slop. Draft 2: slop, but with bullet points.`],

      // ── more jokes: the model makers ──
      ['joke', 'anthropic', `Anthropic's tiers go Haiku, Sonnet, Opus. Finally, an AI roadmap that scans.`],
      ['joke', 'anthropic', `"You're absolutely right!" Famous last words before the model changes its answer back.`],
      ['joke', 'openai', `GPT-4o: the "o" is for omni. Mine is for "oh no".`],
      ['joke', 'openai', `Strawberry: the fruit, the codename, and the reason I never trust a letter count.`],
      ['joke', 'xai', `The Hitchhiker's Guide says the answer is 42. Every LLM I ask says 42. Coincidence?`],
      ['joke', 'xai', `To grok is to understand deeply. Me, reading my own regex from last week: not so much.`],
      ['joke', 'mistral', `A mistral is a strong wind through southern France. Also my budget, whenever I click "run".`],
      ['joke', 'google', `Google gave us the Transformer, then Gemini, then renamed things so often my bookmarks need a changelog.`],
      ['joke', 'google', `"Attention Is All You Need": the most influential paper title and the most common thing I say at standup.`],
      ['joke', 'meta', `Llama begat Alpaca, Vicuna and a whole farm of fine-tunes. The ecosystem is basically a petting zoo.`],
      ['joke', 'deepseek', `DeepSeek-R1 shows its reasoning at length. Finally, a colleague who really does explain their thinking.`],
      ['joke', 'copilot', `Standard harness: predictable. Microsoft Copilot harness: ambitious. Me: somewhere between the two before coffee.`],
      ['joke', 'copilot', `Copilot Studio has a topic for everything, including what to do when someone asks about a topic you don't have.`],
      ['joke', 'copilot', `Power Platform: where "citizen developer" is a job title and "where did my flow go?" is a weekly meeting.`],
      ['joke', 'copilot', `Dataverse used to call them entities. Now they're tables. Same data, fewer philosophy degrees needed.`],
      ['joke', 'github', `GitHub Copilot suggested a function name. It was better than anything I'd have picked. This is why I don't get to name things.`],
      ['joke', 'history', `ELIZA (1966) fooled people with pattern matching. Modern models fool people with better pattern matching.`],
      ['joke', 'history', `The Turing test: if you can't tell it's a machine, it's either a very good AI or a very bad customer-support script.`],
      ['joke', 'history', `AI winters: when "this time it's different" was briefly not true.`],

      // ── dated facts: the model race (each states its own date, so none go stale) ──
      ['fact', 'race', `Claude Opus 4.5 launched on 24 November 2025 with a reported 80.9% on SWE-bench Verified.`],
      ['fact', 'race', `When Claude Opus 4.5 launched on 24 November 2025 it cost $5 per million input tokens and $25 per million output, a third of earlier Opus pricing.`],
      ['fact', 'race', `Launch coverage dates Claude Opus 5 to 24 July 2026 and Opus 5.5 to 22 September 2026: two flagship releases in about two months.`],
      ['fact', 'race', `Between 24 November 2025 and 22 September 2026 the Claude Opus line passed through at least 4.6, 4.7, 4.8 and 5 on its way from 4.5 to 5.5.`],
      ['fact', 'race', `OpenAI shipped GPT-5.5 on 23 April 2026, about six weeks after GPT-5.4 in early March.`],
      ['fact', 'race', `OpenAI reported GPT-5.5 at 82.7% on Terminal-Bench 2.0 in April 2026, up from 75.1% for GPT-5.4 six weeks earlier.`],
      ['fact', 'race', `OpenAI priced GPT-5.5 at roughly double GPT-5.4's API price when it launched in April 2026.`],
      ['fact', 'race', `At GPT-5.5's April 2026 launch, reported SWE-Bench Pro scores were 64.3% for Claude Opus 4.7 and 58.6% for GPT-5.5. GPT-5.5 led Terminal-Bench 2.0.`],
      ['fact', 'race', `Leaderboards put Claude Opus 4.5 at about 58% on Terminal-Bench 2.0 in late 2025. GPT-5.5 was reported at 82.7% by April 2026, on different harnesses.`],
      ['fact', 'race', `OpenAI's GPT-5 family reached 5.5 by April 2026: 5, 5.1, 5.2, 5.3-Codex, 5.4 and 5.5, all in under a year.`],

      // ── local models ──
      ['fact', 'local', `Georgi Gerganov's llama.cpp, first released in March 2023, runs Llama models in plain C/C++ with no dependencies.`],
      ['fact', 'local', `GGUF, the file format most local models now use, appeared in August 2023 and replaced the older GGML format.`],
      ['fact', 'local', `Ollama wraps llama.cpp in a one-command tool to download and run models, with a local HTTP API.`],
      ['fact', 'local', `OpenAI's gpt-oss-20b is designed to run on a machine with 16 GB of memory. The 120b version needs a single 80 GB GPU.`],
      ['fact', 'local', `In March 2023 Stanford's Alpaca fine-tuned the 7B LLaMA model for under $600 and showed what small teams could do.`],
      ['fact', 'local', `DeepSeek released R1 in sizes from 1.5 billion to 70 billion parameters, based on Qwen and Llama, small enough to run locally.`],
      ['fact', 'local', `Quantising a model from 16-bit to 4-bit shrinks its weights roughly fourfold, at some cost in quality.`],
      ['fact', 'local', `A 7-billion-parameter model quantised to 4 bits needs only about 4 GB of memory.`],
      ['fact', 'local', `A model running locally keeps your prompts on your own machine: nothing is sent to a cloud service.`],
      ['fact', 'local', `Microsoft said in April 2024 that Phi-3-mini was small enough to run on a phone.`],

      // ── jokes: the race and local models ──
      ['joke', 'race', `Model releases: if you blink, the leaderboard changes. If you don't blink, it changes anyway.`],
      ['joke', 'race', `Benchmark scores keep going up. My prompts stay the same and the bugs are somehow still mine.`],
      ['joke', 'local', `A local model is private, free and doubles as a room heater.`],
      ['joke', 'local', `Local LLM tip: if the fan sounds like a jet engine, the model is thinking.`],
      ['joke', 'local', `Quantise it until it fits. Then wonder why it got a bit less clever.`],
      ['joke', 'local', `ollama pull: the 2020s version of "this will only take a minute" while 40 GB downloads.`],
      ['joke', 'local', `Cloud model: someone else's GPU. Local model: your GPU, your fan, your electricity bill.`],
      ['joke', 'local', `My data never leaves my laptop. Neither does the heat.`]
    ]
  },

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
      site: 'https://ryanbowie.github.io/copilot-studio-load-test/',
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
      site: 'https://ryanbowie.github.io/cat-benchmarks/',
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
          live: 'https://ryanbowie.github.io/cat-benchmarks/cats/claude-opus-5.5-copilot/'
        }
      }
    },
    {
      name: 'copilot-cowork-app-benchmark',
      title: 'Copilot Cowork managed-app benchmark',
      desc: 'Evidence-led Copilot Cowork managed-app costs, time, capabilities and model/effort comparisons.',
      lang: 'HTML', ext: '.html', cat: 'benchmark', pushed: '2026-10-20',
      site: 'https://ryanbowie.github.io/copilot-cowork-app-benchmark/',
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
      site: 'https://ryanbowie.github.io/ai-video-creation-guide/',
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
      site: 'https://ryanbowie.github.io/copilot-studio-powerbi-agent/',
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
      site: 'https://ryanbowie.github.io/copilot-studio-sharepoint-search-hub/',
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
      site: 'https://ryanbowie.github.io/custom-agent-reporting-architecture/',
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
      site: 'https://ryanbowie.github.io/copilot-studio-powerplatform-solution-reviewer-site/',
      agent: { harness: ['standard'], note: 'Importable reviewer and automation solutions.' }
    },
    {
      name: 'copilot-studio-documentation-builder',
      title: 'Copilot Studio Documentation Builder',
      desc: 'Template-aligned technical documentation with Copilot Studio: Standard and Microsoft Copilot harness examples, implementation guidance and observed results.',
      lang: 'Python', ext: '.py', cat: 'reference', pushed: '2026-10-20',
      site: 'https://ryanbowie.github.io/copilot-studio-documentation-builder/',
      agent: { harness: ['standard', 'mch'], note: 'Examples and observed results on both harnesses.' }
    },
    {
      name: 'copilot-studio-engineering-evidence',
      title: 'Engineering evidence review with Copilot Studio',
      desc: 'Copilot Studio Microsoft Copilot-harness reference: source-faithful engineering evidence, real file outputs and indicative dated test credits.',
      lang: 'Python', ext: '.py', cat: 'reference', pushed: '2026-11-15',
      site: 'https://ryanbowie.github.io/copilot-studio-engineering-evidence/',
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
      site: 'https://ryanbowie.github.io/copilot-interaction-logging/'
    },
    {
      name: 'slack-to-teams-migration-kit',
      title: 'Slack-to-Teams migration demonstrations',
      desc: 'Slack-to-Teams migration demonstrations with GitHub Copilot: screenshots, workflow, measured costs and limitations. Documentation only.',
      lang: 'HTML', ext: '.html', cat: 'guide', pushed: '2026-10-20',
      site: 'https://ryanbowie.github.io/slack-to-teams-migration-kit/'
    },
    {
      name: 'universe-fx-kit',
      title: 'universe-fx-kit',
      desc: 'Showcase: cursor trail, text decode, octopus mascot, scroll reveal and a mini game for GitHub Pages. Dependency-free vanilla JS and CSS.',
      lang: 'JavaScript', ext: '.js', cat: 'tool', pushed: '2026-10-20',
      site: 'https://ryanbowie.github.io/universe-fx-kit/'
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
