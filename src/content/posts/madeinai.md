---
author: Milad Zarei
pubDatetime: 2025-09-24T18:37:00Z
modDatetime: 2025-09-24T18:37:00Z
title: Should you mention "Made with AI"?
slug: mention-made-with-ai
featured: true
draft: false
tags:
  - AI
  - Resume
description: Is a vibe-coded project yours?
---

Online code hosting services are booming with AI-generated code. Here are some stats from the recent [GitHub blog](https://github.blog/news-insights/company-news/the-august-17-outage-and-the-work-ahead/). Clearly, a lot of repositories have been created since the dawn of LLMs. 

Some online code hosting websites like [Codeberg](https://www.codeberg.org) are [against](https://blog.codeberg.org/protecting-our-floss-commons-from-llms.html) LLM generated projects and rightfully so. They believe that LLMs are negatively impacting the FLOSS environment.

![Github stats](https://github.blog/wp-content/uploads/2026/08/blog-post-aug-17-outage-1.png?w=768)


Recently I had this idea of a CLI tool for video journaling and I vibe-coded it and called it vj and published it on my [GitHub](https://github.com/MiliAxe/vj). This made me think whether your projects on GitHub should reflect your programming skills or not. I did not write a single line of code for this project, and I have *zero clue* about the architecture of the project. 

These are some serious red flags for an open source project:

- I can't review PRs or address issues without giving it to a coding agent.
- If I were to include my GitHub profile in my CV and send it to somewhere, anyone seeing this repository would implicitly imply that I coded this project on my own if I don't explicitly mention that it was entirely written with AI.
- LLMs tend to sometimes copy-paste code from somebody else without their permission and therefore, you might be just stealing somebody else's code!

I eventually pushed this project to my GitHub solely to help out those that might be going through things ,and I included a "Made with AI" badge on top:

[![Made with AI](https://img.shields.io/badge/Made%20with-AI-lightgrey?style=for-the-badge)](https://github.com/mefengl/made-by-ai)

I believe that nobody should hide using AI. We should be accepting that completely vibe-coding projects yields a project that you have no clue how it works to an extent, and your technical skills don't really improve in the process of creating them.


