---
title: "I Got Tired of Paying for Analytics I Didn't Need. So I Built My Own"
date: "2026-25-26"
excerpt: "Google Analytics was overkill. Fathom and Plausible were too pricey for indie projects. So I built PhantomTrack — one page, everything you need, nothing you don't."
tags: ["Analytics", "Privacy", "PHP", "SideProject", "IndieHacker"]
---

Analytics should be simple.

You want to know who visited your site, where they came from, which pages they hit, what they clicked, and how long they stayed. That's it. Five things. One page. Done.

But somehow every analytics tool out there decided that wasn't enough.

---

## The Problem With Existing Tools 😤

I tried **Google Analytics** first. Everyone does. But Google Analytics felt like walking into a cockpit when all I needed was a light switch. The dashboard is overwhelming, configuration takes time, and most importantly, Google uses your visitors' data for ad targeting. As a developer building products for other developers, that felt wrong. My users didn't consent to feeding Google's ad machine just by visiting my site.

Then I tried **Fathom** and **Plausible**. Both are genuinely good tools, privacy-first, clean. But the pricing? For an indie dev or early stage startup just trying to understand their users, $14 to $19 a month is a real cost. Multiply that across multiple projects and it adds up fast.

I didn't need dashboards across 10 different pages. I didn't need team collaboration features or advanced funnels or export pipelines. I needed one page. Scrollable. Everything visible at once. Fast.

That tool didn't exist at the price point I needed. So I built it. 🛠️

---

## What PhantomTrack Does Differently ⚡

PhantomTrack gives you exactly what you need and nothing else:

- 👤 Who visited: unique visitors, sessions
- 🌍 Where they came from: country, referrer
- 📄 Which pages they hit: page views, most visited
- 🖱️ What they interacted with: click tracking
- ⏱️ How long they stayed: session duration

All of it on **one page**. No navigation. No sub-dashboards. No bloat. You open it, you scroll, you know everything in under 30 seconds.

No data sold. No ads. No noise.

It's built for developers who want signal, not noise.

---

## One Script. That's It. 🎯

Adding PhantomTrack to any site takes one line:

```html
<script src="https://cdn.phantomtrack.com/phantom.js" 
        data-trackid="your-track-id">
</script>
```

Works on any site, plain HTML, Next.js, React, WordPress, anything. No configuration. No events to set up manually. It just works.

---

## Real Users. Real Feedback. 🙏

PhantomTrack has 10+ active users right now including developers from the US who found it organically on Twitter. That's the validation that matters, people who had no reason to use it choosing it anyway.

The feedback shaped the product. Early on, the tracking algorithm broke on React and Next.js sites because of their client-side routing. Traditional page view tracking relies on full page reloads, which React doesn't do. I had to rethink the approach and build SPA-aware tracking from scratch. That fix alone made PhantomTrack genuinely better than the first version.

---

## Try It Free 🚀

PhantomTrack is free to use right now.

Docs and setup: [phantomtrack-docs.vercel.app](https://phantomtrack-docs.vercel.app)

If you're building something and want clean, honest analytics without the noise, give it a shot. 👻
