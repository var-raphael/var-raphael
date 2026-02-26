# How I Built a CLI Tool That Writes Git Commit Messages Using AI ⚡

Every developer has been there.

You just finished coding. It's late. You want to push to GitHub and sleep. But then Git asks you for a commit message and your brain goes completely blank. You type something like `"fix stuff"` or `"update"` or the classic `"asjdhakjsd"` and push. 😂

That was me. Every single time.

I'd either forget to push entirely, push with a garbage commit message, or just sit there staring at the terminal for 5 minutes trying to remember what I even changed. It was frustrating enough that I decided to fix it. So I built **phantomit-cli**.

---

## What It Does 🛠️

phantomit-cli watches your Git changes, understands what actually changed in your code, and generates a proper, meaningful commit message for you automatically.

Instead of typing:
```bash
git add .
git commit -m "stuff"
```

You just run:
```bash
phantomit
```

And it reads your diff, sends it to an AI model, and returns a clean commit message like:

```
feat(auth): add JWT token refresh logic to prevent session expiry
```

One command. Done.

---

## Why I Built It 💡

I had two problems that kept showing up:

**Problem 1: Laziness.** After hours of coding, the last thing I wanted to do was craft a thoughtful commit message. So I wouldn't. Or I'd forget to push entirely.

**Problem 2: Meaningless commits.** When I did push, my commit history looked like a mess. "fix", "update", "test", "ok now". Useless for anyone reading the history later, including future me.

I looked around for existing tools but nothing felt right. So I built exactly what I needed.

---

## The Hardest Part 🔧

Building the concept was straightforward. The hard parts were:

**File watching.** The tool needed to detect every change, edits, deletions, new files, new folders, and respond intelligently to each one. Building a reliable file watching system that didn't miss events or fire duplicate triggers took real work.

**Diff comparison.** It's not enough to know a file changed. The tool needs to understand *what* changed, which lines, which functions, which logic, so it can generate a commit message that actually reflects the work. Getting the diff parsing right and feeding it to the AI in a way that produced consistent, meaningful output was the most technically demanding part of the project.

---

## How I Built It Fast ⚡

Full transparency, the coding took 3 days.

I used AI to accelerate the implementation. But not as a crutch. I designed the logic myself, I corrected the critical bugs myself, I handled all the DevOps: npm publishing, GitHub versioning, release pipeline. AI helped me move faster on the parts that didn't need original thinking. The architecture, the edge cases, the decisions, that was all me.

This is how I think modern developers should work. Use every tool available. Ship faster. Spend your thinking on what actually matters.

---

## Publishing to npm 📦

Getting it onto npm for the first time was its own learning experience. Setting up the package.json correctly, versioning, making sure the CLI binary was executable across different operating systems, writing the README that actually explains it clearly, all of that is work people don't talk about enough.

But seeing `npm install -g phantomit-cli` work for the first time and watching it run on someone else's machine? That feeling doesn't get old.

---

## Try It

```bash
npm install -g phantomit-cli
```

GitHub: [github.com/var-raphael/phantomit-cli](https://github.com/var-raphael)

Documentation: [phantomit-docs.vercel.app](https://phantomit-docs.vercel.app)

If you've ever typed `"fix stuff"` as a commit message, this is for you. 😄
