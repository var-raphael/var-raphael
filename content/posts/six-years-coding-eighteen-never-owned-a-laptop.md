---
title: "I've Been Coding for 6 Years. I'm 18. I've Never Owned a Laptop."
date: "2026-27-26"
excerpt: "No laptop. No stable internet. No mentor. Just a Huawei Android phone, an obsession I couldn't explain, and a notebook filled cover to cover with code I copied by hand at midnight."
tags: ["Story", "Career", "SelfTaught", "MobileCoding", "Developer"]
---

No laptop. No stable internet. No mentor. Just a Huawei Android phone, an obsession I couldn't explain, and a notebook I filled cover to cover with code I copied by hand at midnight.

This is not a motivational post. This is just what happened.

---

## It Started With a Facebook Post

I was 12 years old, in junior high school, when I stumbled across an indie developer on Facebook who posted about web development and dropped a link to W3Schools. Something clicked immediately. Not just curiosity, hunger. The kind that doesn't let you sleep.

I had no laptop. I had a version 5 Huawei Android phone. 1GB RAM. 8GB storage. Unreliable internet. None of that felt like a barrier at the time. It just felt like the situation I had to work with.

I bought a dedicated notebook, not a computer, a physical paper notebook, and started copying. HTML. CSS. JavaScript. PHP. The entire W3Schools curriculum, written out by hand, at midnight, while the rest of the house slept.

Don't ask me why midnight. I couldn't afford data during peak hours, yh thats it.

---

## The First Thing I Built

A few months after starting, still 12 years old, still on a phone, I built **Trilog**, a social network website with a built-in digital marketplace where users could buy and sell things.

Not a tutorial follow-along. My own idea. My own logic. My own code.

My school friends used it. That was the first time I understood what it meant to build something real, something other people actually touched. That feeling never left me.

I also built a website for downloading graphic design templates around the same time.

Then I lost everything. I hadn't heard of GitHub yet, didn't know about version control, and one day the source code was just gone. No backup. No recovery. Months of work, vanished.

That hurt. But it also taught me something no tutorial ever could. Infrastructure matters. Backing up your work matters. Understanding your tools beyond just writing code matters.

---

## What Coding on a Phone Actually Teaches You

People always react with surprise when I say I coded on a phone for 6 years. Like it's impressive or sad or both.

Honestly? It made me better.

When your device is slow, every unnecessary loop costs you. When your screen is small, you learn to write clean, readable code because you can only see 10 lines at a time. When you can't run a debugger properly, you learn to think through your logic on paper before you write a single line.

Before building anything significant I would sketch the algorithm and logic with pen and paper first, mapping out edge cases, thinking through failure scenarios, questioning every assumption. That habit didn't come from a coding course. It came from necessity.

It taught me to think first, type second. Most developers do it the other way around.

---

## The Mentor Who Changed Things

A few years into coding, I met my mentor. He saw what I was doing and took it seriously when most people around me didn't. He introduced me to GitHub. He showed me that what I was building wasn't just a hobby, it was a skill that could take me somewhere.

Two years ago he bought me a new phone. 6GB RAM, 128GB storage. A real upgrade from that first Huawei. But even now, at 18, I'm still building everything from a mobile phone. I'm planning to get a proper laptop in the coming months and honestly I think it will push my output 10x. Not because I need it to be capable, I've proved I don't, but because I'm ready to move even faster.

I finished high school last year. I'm applying to university to study Computer Science next January. But I haven't been waiting around.

---

## What I've Shipped

In the last few years, working entirely from a phone, I've built and shipped four real products. Not tutorials. Not clones. Things with real users and real infrastructure.

**PhantomTrack** is a privacy-first web analytics platform built for developers who are tired of Google Analytics being bloated and Fathom or Plausible being too expensive. One script tag, instant insights. No cookies, no noise, no data sold for ads. Everything you need on a single scrollable page: who visited, where from, which pages, what they clicked, how long they stayed. It has 10+ active users including developers in the US, and it runs on a dedicated server I pay for out of pocket because people actually depend on it. Built with PHP and MySQL. [phantomtrack-docs.vercel.app](https://phantomtrack-docs.vercel.app)

**phantomit-cli** is a CLI tool that watches your code as you work, diffs every change, and automatically generates a professional git commit message using AI. If you've ever pushed a commit that just says "fix" or "update" at midnight because you were too tired to think, this is for you. Published on npm, actively maintained, real downloads from real developers. Built with TypeScript and Node.js. [phantomit-docs.vercel.app](https://phantomit-docs.vercel.app)

**ClassFlow** is an assignment management platform for teachers and students. Real-time grading, file uploads, comment threads, and visual dashboards that make tracking student progress clean and simple. Built with Next.js, TypeScript, and PostgreSQL. [myclassflow.vercel.app](https://myclassflow.vercel.app)

**Go Rate Limiter** is a high-performance rate limiting library written in Go. Token bucket algorithm, atomic operations to eliminate race conditions, handles 10k+ requests per second, DDoS tested. Built for developers who need infrastructure-level request control without the bloat. [github.com/var-raphael/Ratelimiter](https://github.com/var-raphael/Ratelimiter)

None of these are fake. They are live, they have users, and they cost me real time and real money to keep running.

---

## The Hardest Real Problem I've Solved

The most painful technical situation I've faced was a CORS issue between my Vercel frontend and a free hosting server for PhantomTrack's backend. Hours of debugging. Nothing worked. Free servers have restrictions that don't show up in documentation.

I ended up buying a dedicated server. Not because I wanted to spend money, I'm 18 and every naira counts, but because I had real users depending on the product and I wasn't going to let them down over a hosting limitation.

That decision taught me something important: **when you have real users, you don't get to take shortcuts.** The responsibility changes everything.

I also ran into a tracking bug where PhantomTrack wasn't recording page views on React and Next.js sites at all. The reason: those frameworks use client-side routing, not full page reloads, so the traditional tracking script never fired after the first visit. I had to rebuild the tracking layer to patch the browser history API and detect route changes in real time. That fix taught me more about how browsers actually work than any course ever could.

Another bug: the totalling system was counting the same user twice if they refreshed the page, inflating the numbers. Fixed it by adjusting the SQL queries to deduplicate visits at the database level. Small fix, but it required understanding the data model deeply, not just patching surface symptoms.

---

## Why Hire Me

I'll be direct because I think you deserve a straight answer rather than a sales pitch.

**I ship things that work.** Every project in my portfolio is live. Not deployed once and forgotten, actively maintained because real people use them. I know what it feels like to have users depending on something I built and I take that seriously.

**I learn fast and I prove it.** I picked up TypeScript and Go in 2023 simultaneously, while already knowing PHP and JavaScript, because I understood that all programming languages share the same fundamental concepts with different syntax. Within months I was shipping production tools in both. That's not luck, that's how I'm wired.

**I think before I type.** Six years of coding on a phone with 1GB RAM taught me to plan my logic on paper before writing a single line. I map edge cases, question assumptions, and think through failure scenarios before touching the keyboard. Most bugs I never write in the first place.

**I don't need hand-holding.** I taught myself everything from a mobile phone by copying W3Schools by hand at midnight. I've never had a classroom, a bootcamp, or a team to lean on. I figure things out. That's not a boast, it's just the environment I was built in.

**I understand the full stack.** Frontend, backend, infrastructure, DevOps, npm publishing, database optimization, server configuration. Not surface-level familiarity. I've debugged all of it in production with real users watching.

**I bring energy and ownership.** I mentor students, lead a small startup team, and teach free coding classes on WhatsApp, Telegram, and Facebook because I remember being the 12-year-old with no direction and I don't want anyone else to feel that lost. I bring that same care and ownership to everything I touch professionally.

What I'm looking for is a real team building something that matters. An environment where I can contribute, grow faster than I could alone, and do the best work of my life.

If that sounds like your team, let's talk.

---

There's a saying: *if you love what you do, you'll never work a day in your life.*

I've been not working since I was 12.

---

*Portfolio: [var-raphael.vercel.app](https://var-raphael.vercel.app)*
*Email: samuelraphael925@gmail.com*
