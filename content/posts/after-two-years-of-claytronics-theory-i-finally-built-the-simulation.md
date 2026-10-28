---
title: "After Two Years of Claytronics Theory, I Finally Built the Simulation"
date: "2026-10-28"
excerpt: "I spent two years working out how programmable matter could work. This month it became code: what I built, what broke, and what's next."
tags: ["Claytronics", "Go", "Python", "Simulation"]
---

For two years I've been working on one idea: what if a 3D object could be built out of thousands of tiny beads that roll into place on their own? Scan a mango, send the coordinates to a floor, and a few thousand beads crawl out and form it. That's claytronics, or programmable matter. I only started writing it down this month, and the simulation is the first thing I've been able to actually test.

I code entirely on my phone, so everything here runs in Termux.

## The idea

The beads are deliberately dumb. Each one has a magnetic shell, a way to report where it is, and a light. All the intelligence lives in a smart array underneath them.

1. A 3D model becomes a hollow shell of voxels: `{x, y, z, colour}` for every bead.
2. The array hands each bead a coordinate.
3. Beads roll across the array one tile at a time. The array switches on the tile it wants the bead to roll towards.
4. A bead reports the tile it actually landed on. If it tumbled somewhere else, the array replans from that report.
5. Beads dock into the shape and bond to their neighbours.

The array never acts on where it thinks a bead is. It only acts on what the bead reports. That's the rule that should make the same logic work on real hardware.

## Step one: model to beads

A small Python script takes a GLB file and turns it into voxels. The mango I tested with became 76,419 beads at 0.5mm, hollow and about two beads thick, with colours sampled from the model's texture. It also checks the result is one connected piece, so nothing floats.

## The bead shape

I started with spheres, then switched to the truncated octahedron: eight hexagonal faces and six square ones. It fills space with no gaps, it sits naturally on a body-centred cubic lattice, and every bead touches 14 neighbours. The lattice is simple to write down: integer coordinates that are all even or all odd.

I made one bead in that shape and rolled it on a flat surface. It rolled well and had good grip. That is the only physical test so far. Rolling over other beads is still untested.

## Step two: the crawl, in Go

The logic is written in Go with only the standard library, so there's nothing to install. The first version sent one bead across the floor. Each roll has a chance of going wrong, and the bead lands on a random neighbouring tile instead. The array notices from the report and corrects.

```
t=1  roll E to (1,0)   TUMBLE, landed on (0,1)
t=2  roll E to (1,1)   correction: ok
```

With 15% bad rolls, a bead still reaches its coordinate every time I've run it. The same seed gives the same run on every machine, which matters because I run it on a phone and test it somewhere else.

## Step three: many beads

One bead is easy. The interesting part is a crowd. The floor rules are strict:

- A tile holds at most one bead.
- A bead may only roll onto a tile that was empty at the start of the tick, so no two beads ever swap places or follow each other.
- Bad rolls into a busy tile are bumps: the bead stays put.

The array plans one bead at a time a few ticks ahead, around the beads already planned, and replans every tick. I check those rules after every tick in the tests, across hundreds of runs with clumsy beads. Nothing has broken them.

What did break was something else: a bead docking early on a tile that another bead needed to pass through, walling it in forever. Beads are interchangeable, so the fix is in the order. The bead at the front of the queue gets the target furthest from the exit, and beads go in waves. Fill the far side first and every empty tile keeps a route out.

## Where it stands

100 beads race to random targets on a 30x20 floor and all dock in 84 ticks. 600 beads filling a build area in waves finish in about five seconds of computing. Batching is slower in ticks than racing, because waves go one after another, but it stops the jams.

## What this is and isn't

It's a logic simulation. It decides routes and handles failures, but it has no real physics engine behind it. A tumble is a dice roll, not a simulated bead. I'm not claiming anything about the material, and I know people have worked on this for a long time: Carnegie Mellon's claytronics, the 3D Catoms from FEMTO-ST, and MIT's M-Blocks. What I'm exploring is the approach: dumb beads, a smart array, and a strict report-and-correct loop. I want to see how far it goes.

## What's next

Read the mango's voxels into the simulation and assign every bead a coordinate, with fill order from the bottom layer up. Then a 3D replay in the browser, so you can watch the mango build itself. Beyond that, the bead's faces, climbing over other beads, and shrinking the bead towards 0.5mm, which is a materials problem and the reason I want to study Materials Science and Engineering at KAIST.

When the live simulation is ready, it will be linked from my portfolio.

## Get in touch

If this interests you, or you've worked on something similar, I'd like to hear from you. You can reach me at [samuelraphael925@gmail.com](mailto:samuelraphael925@gmail.com), on [X](https://x.com/PhantomDev001), or on [LinkedIn](https://www.linkedin.com/in/samuel-raphael-7679313a2).
