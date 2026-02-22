---
title: "Why I Switched from REST to tRPC for Internal APIs"
date: "2026-02-12"
excerpt: "After two projects with REST endpoints that nobody documented, I gave tRPC a shot. Here's what changed."
tags: ["TypeScript", "tRPC", "API"]
---

After shipping two internal tools with REST endpoints that slowly turned into undocumented chaos, I finally gave tRPC a proper shot on my third project. Here's what I found.

## The Problem with REST on Solo Projects

When you're the only dev, you know every endpoint by heart. Until you don't. Three months later you're staring at `/api/users/update` wondering if it takes `id` or `userId`, whether it returns the full object or just a status, and whether you need the auth header or not.

Documentation helps — but nobody writes it when they're moving fast.

## Enter tRPC

tRPC gives you end-to-end type safety between your Next.js server and client with zero code generation. You define a procedure once on the server, and your client just knows the shape of the input and output automatically.

```ts
// server
export const userRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => db.user.findUnique({ where: { id: input.id } })),
});

// client — fully typed, no guessing
const user = trpc.user.getById.useQuery({ id: '123' });
```

No more guessing. Your editor tells you exactly what each call needs and returns.

## When I'd Still Use REST

tRPC is tightly coupled to TypeScript on both ends. If you're building a public API, integrating with mobile apps, or your backend isn't Node — REST is still the right call.

But for internal Next.js tools? tRPC wins every time.
