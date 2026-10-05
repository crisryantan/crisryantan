# Harry Potter and the Order of the Agents

*[FILL: publish date] · 6 min read · AI & Productivity*

For most of this year my AI workflow was one agent doing everything. It wrote the code, reviewed its own code, read CI logs, dug through dashboards, and remembered whatever survived the end of a session. Every task I touched in a day piled into the same conversation, and the only reviewer of the code was the model that wrote it.

So I split it into a fleet of seven agents, each named after the Harry Potter character who fits the job, and ran it for **[FILL: how long]**. This post is about what that did for my token bill and my day.

## Where my tokens were going

Before changing anything, I measured how I actually used Claude Code: the first turn of my 80 most recent sessions, and 30 days of tool calls from my local transcripts.

- **88k tokens** in a fresh session before I'd typed anything
- **435k tokens** of context carried on the median call
- **196 tools** from four connectors loaded into every session, none of them called in 30 days
- **14.8M tokens** of shell output in a month

About 64k of that 88k is the app's own tool schemas and system prompt, which I can't change. The second number was the real problem. 59% of my input that month was context above 200k, because sessions ran for hours and dragged every earlier task along with them.

## The Order

Seven desks, each with one job and one task at a time. I'm the Headmaster, and everything important still comes back to me.

| Desk | Model | Job |
| --- | --- | --- |
| **McGonagall** | Claude Opus | Chief of staff. Turns my ask into a ticket, routes work, keeps my queue. |
| **Harry** | Codex | Builder. One task in its own git worktree, local commits only. |
| **Hermione** | Claude Opus | Reviews Codex-written code, and fact-checks review comments on my PRs. |
| **Moody** | Codex, read-only | Reviews Claude-written code from the other model family. |
| **Ron** | Claude Haiku | Patrol. Sorts PR and CI changes into routine or needs-me. |
| **Snape** | Claude Sonnet | Read-only data investigator. Every number ships with its query. |
| **Dumbledore's portrait** | Claude Opus | Nightly memory review. Proposes fixes and never applies them. |

The casting does some real work. Ron kept goal for Gryffindor, so watching everything that comes at the hoops is literally his position. Snape's old potions book is full of corrections to the official recipe, which is the attitude I want from whoever reads my data. Moody is an Auror on loan from outside the castle who trusts nothing he hasn't checked himself, which is the job of a reviewer from a different model family.

## Shorter sessions did most of the work

The biggest lever was the least clever one. Every desk does one task, and once a session passes about 200k context, a hook prints one line telling me to write a checkpoint and start fresh. The next session picks up from that checkpoint instead of from hours of history.

- Median context per call: 435k → **[FILL]**
- Share of input above 200k: 59% → **[FILL]**

## A lighter starting point

I also shrank what every session loads before I type. My memory index had grown to 23.5KB, close to the size where it would start getting cut off without warning. I moved closed and withdrawn entries to an archive and rewrote the rest as one short line each, which brought it down to 8.3KB. That file loads into every call, so the trim takes roughly 3.8k tokens off each one.

- Fresh session first turn: 88k → **[FILL]**
- Background desks, which run headless with only the tools their job needs: **[FILL]** on the first turn

## A quiet day costs almost nothing

Most of the watching doesn't need a model. A shell script I call the Marauder's Map diffs my PRs and CI every 15 minutes at zero tokens, and Ron only wakes up when something actually changed. Scripts compute the facts for the morning PR lineup and the weekly scoreboard, and Ron writes them up.

- Map rounds that cost zero tokens: **[FILL]%**
- Patrol cost on a typical day: **[FILL]**
- **[FILL: what the morning lineup replaced in your actual morning, in a sentence]**

## Every change reviewed by the other model family

When Codex writes code, Claude reviews it. When Claude writes code, including in my own sessions, Codex reviews it. Two models from the same family tend to share blind spots. A passing review writes a hall pass named after that exact commit, and a hook on `git push` refuses anything without one.

- Changes that went through the gate: **[FILL]**
- Findings that changed a diff before it was pushed: **[FILL]**
- **[FILL: one concrete catch, in a sentence or two]**

## Memory that tidies itself

The Pensieve, a SQLite file with full-text search, keeps a capped extract of every session at no token cost. Every weekday night, Dumbledore's portrait reads the day, finds where a desk had to look something up again, and writes a patch for me to accept or bin.

- Nightly patches proposed and accepted: **[FILL]**

## Shell output, compressed carefully

[RTK](https://github.com/rtk-ai/rtk) rewrites shell commands so their output reaches the model filtered and deduplicated. Shell output was my single biggest tool cost, so I measured before switching the hook on, and kept review-critical commands like `git diff` out of it so reviewers always see the whole diff.

- **[FILL: rtk gain result, or why it was a no-go]**

## The bug the audit found

The audit turned something up before any agent had run. My own guard hooks had never once fired. They read their input from an environment variable, but Claude Code hands hooks their input as JSON on stdin, so every check they were meant to do had been silently passing, and I'd have gone on trusting them.

## If you build your own

- Measure first. For me, most of the bill was session length.
- Let scripts do the watching, and save the models for judgment.
- Keep yourself as the gate for merges, deploys, credentials, and anything that reaches another person. My only pre-approvals are ones I write down myself, and none of them can be a merge or a deploy.
- Don't copy files by hand. I had my own agent build the fleet one stage at a time, showing me every file, diff, and undo step and waiting for my yes before each one.
