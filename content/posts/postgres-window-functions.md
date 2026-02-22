---
title: "PostgreSQL Window Functions Are Underrated"
date: "2026-01-28"
excerpt: "Most devs reach for a subquery or application-level grouping. Window functions solve this cleaner."
tags: ["PostgreSQL", "SQL", "Backend"]
---

Most developers I talk to have heard of window functions but never actually used them. They reach for a subquery, or worse, pull data into the application and group it in JavaScript. Window functions solve a whole class of problems cleaner and faster — here's why you should add them to your toolkit.

## What Is a Window Function?

A window function performs a calculation across a set of rows related to the current row — without collapsing them into a single output row like `GROUP BY` does.

```sql
SELECT
  user_id,
  amount,
  SUM(amount) OVER (PARTITION BY user_id ORDER BY created_at) AS running_total
FROM payments;
```

This gives you a running total per user, per row — something that would require a correlated subquery or application-side logic without window functions.

## The Functions You'll Actually Use

**`ROW_NUMBER()`** — rank rows within a partition. Great for "get the latest record per user":

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
  FROM orders
) sub WHERE rn = 1;
```

**`LAG()` / `LEAD()`** — access previous or next row values. Perfect for comparing a value to the previous period.

**`RANK()` / `DENSE_RANK()`** — leaderboards, top-N queries, percentile grouping.

## Performance

Window functions run after `WHERE` and `GROUP BY` but before `ORDER BY` and `LIMIT`. PostgreSQL is smart about optimizing them — in most cases they're faster than the equivalent subquery.

Next time you're about to write a correlated subquery or pull rows into your app to sort them — check if a window function solves it first. It usually does.
