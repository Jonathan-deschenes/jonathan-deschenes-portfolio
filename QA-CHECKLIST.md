# Manual QA checklist — mobile & display (pre-deploy)

Run through each breakpoint below on each listed page in real browser devtools
(or a physical device). Check off only after visually confirming — don't assume.

## Breakpoints

- [ ] 375px (iPhone SE / small Android)
- [ ] 390px (iPhone 12/13/14 baseline)
- [ ] 768px (iPad portrait / small tablet)
- [ ] 1024px+ (iPad landscape / small laptop)

## Pages to check at every breakpoint above

- [ ] `/` (home)
- [ ] `/rendez-vous` (booking page, Cal.com embed)
- [ ] `/soumission` (3-step quote wizard)
- [ ] `/contact`
- [ ] `/realisations/[slug]` (any one project detail page)

## Specific interactions

- [ ] Floating CTA (bottom-right, every page) never overlaps page content or
      the footer at any breakpoint.
- [ ] Floating CTA / form submit buttons aren't obscured by the mobile
      on-screen keyboard when a text field inside a modal, `/soumission`, or
      `/contact` is focused.
- [ ] Modal (`?modal=booking|quote|contact`) is usable full-height on small
      screens — no clipped content, close button reachable, background
      scroll locked while open.
- [ ] Cal.com embed on `/rendez-vous` and inside the booking modal: picking a
      date/time does NOT jump/scroll the parent page unexpectedly.
- [ ] Header CTA text collapses to "Réserver" below the `sm` breakpoint, no
      overflow/wrap at the collapse point.
- [ ] `/soumission`'s 3-step wizard stepper is usable and legible at
      375-390px (no overlap, back/next reachable without horizontal scroll).
- [ ] No horizontal overflow/scroll on any page at any breakpoint.
- [ ] Honeypot regression check: in devtools, set the hidden `name="website"`
      input's value on `/soumission` and `/contact`, then submit — the form
      should still show a normal success state to the user (no visible error,
      no console error), while the automated test suite already proves no
      email is actually sent server-side for that submission.

## Security headers spot-check (after a production build)

```
npm run build && npm run start
# in another terminal:
curl -sI http://localhost:3000/ | grep -Ei "content-security-policy|x-content-type-options|referrer-policy|permissions-policy|strict-transport-security"
```

Confirm all 5 headers are present:
- [ ] Content-Security-Policy
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy
- [ ] Strict-Transport-Security

## Known findings (not fixed in this pass — for awareness)

- `/api/booking` is an unwired fallback endpoint: the live booking flow is
  100% the Cal.com embed, no UI form ever calls this route. It also has no
  HMAC signature verification — if it's ever pointed at a real Cal.com
  webhook, add `x-cal-signature-256` verification first (see the comment in
  `src/app/api/booking/route.ts`).
- The in-memory rate limiter is per-serverless-instance (not shared across
  Vercel instances) and is bypassable by spoofing `x-forwarded-for` with a
  different value per request — documented, accepted trade-off at current
  traffic volume, not remediated in this pass.
