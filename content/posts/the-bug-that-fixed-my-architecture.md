---
title: "The Bug That Fixed My Architecture"
date: "2026-07-29"
excerpt: "A storage problem, a clustering fix, and the race condition that fix caused. How one bad graph led to a better one."
tags: ["Go", "Distributed Systems", "Pipelines"]
---

Quorel runs a pipeline for every dataset: crawl, clean, extract, dedup, version. Simple on paper. It got a lot less simple once hundreds of independent users started running it against the same live web.

## The First Sign Something Was Wrong

Storage was filling up faster than it should have. Not gradually, noticeably. I dug in and found the actual cause fast: every user's pipeline was crawling and saving its own copy of a page, even when someone else had crawled that exact URL minutes earlier.

Multiply that across hundreds of users hitting overlapping sources, and you get a lot of duplicated bytes for zero extra value. Crawling is also the slowest, most expensive step in the whole pipeline, so this wasn't just a storage problem. It was a cost and speed problem wearing a storage costume.

## The Fix: Cluster by URL

The fix seemed obvious once I saw it clearly. Cluster requests by URL. Crawl and clean a given page exactly once, no matter how many users asked for it. Then fan that shared result out, so each user's extraction step still runs independently against their own schema and intent.

One crawl, many extractions. Storage and crawl time both dropped hard.

I shipped it faster than I should have. A user had complained a pipeline was too slow, and the clustering redesign was the answer, so I pushed to get it live rather than sitting with the design longer.

## The Bug the Fix Introduced

Once it was live, I started seeing corrupted versions on some datasets. Not consistently, just occasionally, which made it worse to track down.

The cause: pipelines inside the same cluster were racing each other. Some extraction steps needed to wait for every other pipeline sharing that crawl to finish before versioning could safely combine the results. Instead, each one was completing and trying to version independently, stepping on each other mid-write.

Clustering had solved the redundant-crawl problem and quietly created a coordination problem in its place.

## The Real Fix: A Waiting Barrier

The fix wasn't more speed, it was a checkpoint. I added a waiting mechanism just before the versioning stage: it collects every pipeline completion for a given dataset cluster and holds until all of them are done, then combines the results and versions once, as a single unit.

```go
// simplified shape of the barrier
func waitForCluster(clusterID string, expected int) []Result {
    results := make([]Result, 0, expected)
    for len(results) < expected {
        r := <-clusterChannel(clusterID)
        results = append(results, r)
    }
    return results
}
```

No more racing. No more partial versions. The pipeline got slightly slower for that one dataset cluster, and correct every time, which was the actual trade I wanted.

## What Actually Changed

The storage spike wasn't really a storage bug. It was a signal that the architecture was doing more work than it needed to. Fixing it properly meant introducing shared state across independent users for the first time, which is exactly what created the race condition.

Neither piece was optional in hindsight. The clustering fix needed the waiting barrier to be safe. I just didn't know that until the bug told me.
