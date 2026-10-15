# Make My Marriage — Design

Version 1. Product behavior is in [make-my-marriage.md](make-my-marriage.md). Architecture is in [system-design.md](system-design.md). This document is the same design, section by section, in bullets.

## Problem

- An Indian wedding is several events, two families, a vendor list, and a guest list that keeps changing until the week of the wedding.
- A solo planner runs many of these at once.
- The work sits in WhatsApp chats, spreadsheets, and memory: who is coming to which function, which vendor is still owed money, and where the photos went.

## Product

- Make My Marriage is the planner’s workspace for every client wedding, and the phone page guests use to reply, watch, and send photos.
- One planner account holds many weddings.
- The couple and a few family members get a login on a single wedding.
- Guests do not create accounts. They use a private link.
- Version one covers planning, money, guests, invites, the public page, live viewing, and the photo gallery.

## Goals

- A planner can create a wedding, seed it from a template, and invite the couple in one sitting.
- The planner can see, for every active wedding, what is due, who has replied, and how much money is left.
- A guest can RSVP for each event and upload photos from a phone without an account.
- The couple can approve photos and follow the plan without seeing the planner’s other clients.
- One planner’s weddings are never visible to another planner.

## Users and permissions

- **Planner.** Signs up directly. Owns the wedding. Full access, including delete wedding and remove members.
- **Couple.** Invite only. Can manage that wedding, including vendors, budget, website, live settings, and photo approval. Cannot delete the wedding or remove the planner. Can invite family.
- **Family.** Invite only. Can create and edit tasks and guests, copy guest links, and view events, the run sheet, the budget, and approved photos. Cannot edit vendors, the website, live settings, or the approval queue. Cannot invite people.
- **Guest.** No login. Can open the published page, submit their own RSVP, watch the live video, and upload photos.
- A person’s email can belong to a planner account and also be a member of someone else’s wedding. Access is always per wedding.

## Planner home

- After login the planner sees only their weddings.
- Each card shows couple names, city, primary date, days remaining, RSVP progress (households replied / invited), open tasks, and budget spent versus planned.
- Empty state offers two actions: start from the Indian wedding template, or start blank.
- Home lists weddings the user owns, and weddings where they are an active member.
- A user who owns nothing and belongs to one wedding goes straight into that wedding.
- A user who owns nothing and belongs to several sees only those weddings.

## Wedding setup

- Required fields: bride’s name, groom’s name, city, primary wedding date, and template (Indian multi-event, or blank).
- Display title defaults to “Bride & Groom”.
- Time zone defaults to Asia/Kolkata. Currency defaults to INR.
- The planner can edit these later.
- Changing the primary date does not move events that already exist.

### Indian multi-event template

- Mehendi, two days before the primary date.
- Haldi, one day before.
- Sangeet, one day before, evening.
- Wedding ceremony, on the primary date.
- Reception, on the primary date, evening.
- Event times are Mehendi 16:00, Haldi 10:00, Sangeet 19:00, wedding ceremony 10:00, and reception 19:00.
- The seeded checklist is the 15 tasks in the product requirements, from booking the venue 180 days out through the day-of run-sheet review.
- The planner can edit or delete every seeded row.
- Events sort by date, then start time.

## Dashboard

- Days until the primary date.
- Next event, by date and start time.
- Open tasks and overdue tasks.
- Households invited, households replied, and headcount of households with at least one Yes.
- Planned, spent, and remaining, in total and split by bride side, groom side, and shared.
- Count of photos waiting for approval.

## Events and run sheet

- Each event has name, date, start time, optional end time, venue name, address, map link, dress code, internal notes, and a public on/off switch.
- The run sheet is an ordered list on that event: time, title, person responsible (a member or a typed name), and a note.
- The run sheet is internal. It does not appear on the public page.

## Tasks

- Each task has title, optional notes, status (to do, in progress, done), optional due date, optional assignee, and optional event.
- The list filters by status, assignee, event, and overdue.
- Completing a task keeps it visible under Done.
- Removing a member clears their assignment.
- Deleting an event clears that link on tasks. The tasks remain.

## Vendors and payments

- Categories: Venue, Catering, Decor, Photo and video, Makeup and attire, Music and entertainment, Priest and ritual, Invitations, Stay and travel, Other.
- Each vendor has name, category, contact name, phone, email, quote, status (Enquiry, Quoted, Booked, Completed, Cancelled), which side pays (bride, groom, or shared), notes, and optional contract files (PDF or image).
- While adding a vendor, the planner can search Google Places.
- Choosing a result fills name, address, and phone, and stores the place id.
- The Places API key stays on the server.
- Payment milestones have label, amount, due date, and status unpaid or paid.
- Marking a milestone paid creates one linked expense for that amount if one does not already exist.
- Marking it unpaid removes that linked expense.
- Spent on the budget is the sum of expenses, so a paid milestone is counted once.

## Budget

- A budget line has category, side (bride, groom, shared), planned amount, notes, and an optional vendor.
- An expense has amount, date, side, category, note, and optional vendor.
- Expenses are the actual money out.
- The wedding shows planned, spent, and remaining in total and per side.

## Guests

- A guest row is a household.
- Fields: name, phone, optional email, side (bride or groom), party size (at least 1), meal (unset, veg, Jain, non-veg, or mixed), needs a stay, stay note, and internal notes.
- Internal notes are never shown publicly.
- The household is invited to selected events.
- RSVP per invited event is pending, yes, or no.
- A long random token is created when the guest is saved.
- Add one household with a form, or paste many lines of `Name, phone`.
- Pasted rows land on the bride side with party size 1 and no events selected, so the planner can assign events after.
- Phone numbers are stored for WhatsApp and are never rendered on the public site.
- Headcount for a Yes uses the household party size.
- A household that says No to every invited event counts as replied and adds zero to attending headcount.

## Invites and reminders

- Two editable messages per wedding: invitation and reminder.
- Placeholders: guest name, couple names, RSVP link, and the names of invited events.
- For each household the planner or couple can copy the RSVP link or open WhatsApp.
- WhatsApp uses `wa.me` with the guest’s phone and the filled message.
- If the phone cannot be used, the product copies the message.
- Family can copy links for guests. They do not edit the message templates.
- Filters: side, event, no reply yet, replied.
- The reminder action uses the reminder template on the current filter, one guest at a time.
- The product does not send WhatsApp messages from a server.

## People

- The planner or couple invites by name, email, and role (couple or family).
- The invite is a single-use link the inviter can copy.
- Resend sends that link.
- The invited person sets a password if they are new, or accepts the wedding if they already have an account.
- Pending invites can be revoked.
- Invite tokens expire after 7 days.

## Website

- Three templates share the same content: Editorial, Festive, and Minimal.
- The planner or couple edits couple names, date, city, short story, optional cover image, which events are public, the slug, and the template.
- Preview is available before publish to planner and couple.
- Publish makes `/w/[slug]` public. Until then, visitors see a short unpublished message.
- Changing the slug updates the public URL. The previous slug stops working, and the editor warns before saving that change.
- The public page is mobile-first and shows hero, story, public schedule, venues, RSVP entry, live block, and approved photos.
- A small footer credits Make My Marriage.

## Live

- The planner or couple pastes a YouTube URL and switches visibility on.
- Accepted hosts: `youtube.com/watch`, `youtu.be`, and `youtube.com/live`.
- Any other URL is rejected.
- The public page embeds that video.
- Hiding the block, or leaving the URL empty, removes it from the public page.

## Gallery and QR

- Each wedding has a private gallery URL, `/g/[galleryToken]`.
- Guests who open it enter a name and can add up to 10 images (JPEG, PNG, or WebP), 10 MB each.
- Uploads stay pending until the planner or couple approves them.
- Photo files go to Cloudflare R2. The uploader, status, and file keys are stored in MongoDB.
- Approve publishes the photo. Reject deletes the file.
- Family sees approved photos only.
- The public page shows approved photos only after publish.
- The private gallery URL works before the site is published.
- The QR code is a PNG generated from the private gallery URL.
- Scanning it opens `/g/[galleryToken]`, not the public wedding page.

## Guest flows

- Published page: `/w/[slug]`.
- Personal RSVP: `/w/[slug]/r/[token]`.
- The guest sees their household name and each invited event, marks Yes or No, can lower the attending party size but not raise it above the invited size, sets meal, leaves a note, and saves.
- They can update the same link later.
- The RSVP link works even when the site is still unpublished.
- Lost-link recovery on the published page: the guest enters a phone number.
- One matching household continues to that token page.
- Zero or several matches show the same “use your WhatsApp link” message.
- Lookups are rate-limited. The page never prints the guest list.
- Photo upload and the private gallery: `/g/[galleryToken]`.

## Main flow

- Create the wedding.
- Seed events and tasks from the template.
- Invite the couple.
- Add guests.
- Share each invite on WhatsApp.
- Guest RSVPs.
- Publish the site.
- Show the YouTube embed.
- Approve photos.

## Privacy and access

- Every wedding query is limited to the owner or a member of that wedding.
- Guest tokens are unguessable. Knowing the slug is not enough to RSVP as someone else or to see pending photos.
- Internal notes, run sheets, budgets, vendor contacts, and phone numbers stay off the public page.
- Contract files and pending photos require planner or couple access.
- Upload and phone lookup are rate-limited.
- Uploads accept images only, within the size and count caps.
- Guest tokens are 32 random bytes, base64url, unique, and never written to logs.

## Experience

- Planner screens are built for a laptop and remain usable on a phone, especially guest links and WhatsApp share.
- Guest pages are built for a phone first.
- Planner UI is calm and operational. Public templates feel ceremonial.
- Dates and times display in Asia/Kolkata.
- Money displays as INR.

## Stack

- **App.** Next.js (App Router) on Node.js. One monolith for the planner workspace and the guest page.
- **Language.** TypeScript.
- **UI.** React Server Components, Tailwind CSS, shadcn/ui.
- **Mutations.** Server Actions.
- **HTTP endpoints.** Route Handlers for presigned uploads, the QR image, and Google Places search.
- **Validation.** Zod on every Server Action and Route Handler input.
- **Deployment.** Vercel, region `bom1` (Mumbai).
- **Database.** MongoDB Atlas, region `ap-south-1`. Databases `makemymarriage-dev` and `makemymarriage-prod`.
- **ODM.** Mongoose.
- **Auth.** Auth.js, email and password, JWT in an httpOnly cookie.
- **Passwords.** bcryptjs.
- **File storage.** Cloudflare R2. Buckets `mmm-private` and `mmm-public`.
- **Photo metadata.** MongoDB `photos` collection. Image bytes stay in R2.
- **Uploads.** Presigned URL from the browser to R2.
- **Email.** Resend, for member invites and password reset.
- **Vendor discovery.** Google Places API. The API key stays on the server.
- **Live stream.** YouTube embed.
- **QR.** Generated from the private gallery URL.
- **Access control.** `requireWeddingAccess` in the app.
- **Rate limits.** `rateLimits` collection in Atlas.
- **Guest messages.** `wa.me` links opened on the guest’s phone.

## Architecture

- One Next.js app on Vercel. Atlas holds the records. R2 holds the files.
- No second API service, no Redis, and no worker process in version one.
- Server Actions handle form changes. Route Handlers exist for presigned uploads, the QR image, and Places search.
- Events and the run sheet are embedded on the wedding document.
- Guests, tasks, vendors, money, and photos are their own collections, so the wedding document stays well under MongoDB’s 16 MB limit.
- The browser uploads straight to R2. A 10 MB file does not pass through Vercel.
- WhatsApp sharing happens on the guest’s phone, so the server has no message queue.
- Domain code lives in `lib/domain`. Routes and actions call it.
- The Mongoose connection is cached on `globalThis`. Pool size stays at 10.
- Data routes run on the Node runtime. Edge middleware only checks that a session cookie exists. It does not query Atlas.

## Routes

- `/weddings` and `/weddings/[weddingId]/*` — planner, couple, or family. Session required.
- `/w/[slug]` — public wedding page.
- `/w/[slug]/r/[token]` — personal RSVP.
- `/g/[galleryToken]` — private gallery and upload. The QR code encodes this URL.
- `POST /api/uploads/sign` and `POST /api/uploads/complete` — guest or member.
- `GET /api/weddings/[weddingId]/qr` — planner or couple. Returns a PNG.
- `GET /api/places/search` — planner or couple. Google Places.

## Access control

- Atlas does not enforce per-wedding visibility. The application does.
- Every read and write goes through a wedding-scoped module.
- `ownerId` matches the user → role `planner`.
- Else an active `weddingMembers` row → `couple` or `family`.
- Else no access.
- Planner has every capability.
- Couple has every capability except `wedding.delete` and `member.removePlanner`.
- Family can write tasks and guests, copy guest links, and read events, the run sheet, the budget, and approved photos.
- Public handlers load the wedding by slug and the guest by token. They do not trust a wedding id from the browser.

## Collections

- **users.** `name`, unique `email`, `passwordHash`, optional `businessName`, timestamps.
- **weddings.** `ownerId`, names, `title`, `city`, `primaryDate`, `timezone`, `currency`, `template`, unique `slug`, unique `galleryToken`, `published`, website fields, invite and reminder messages, `live.youtubeUrl`, `live.visible`, and embedded `events[]` with `runSheet[]`.
- **weddingMembers.** `weddingId`, `userId`, `role`, `name`, `email`, `inviteStatus`, `tokenHash`, `expiresAt`. Unique on wedding plus email.
- **tasks.** `weddingId`, `title`, `notes`, `status`, `dueDate`, `assigneeId`, `eventId`, `phase`.
- **vendors.** `weddingId`, contact fields, `category`, `quote`, `status`, `side`, `notes`, optional `googlePlaceId`, `address`, `mapsUrl`, `contracts[]`, `milestones[]`.
- **budgetLines.** `weddingId`, `category`, `side`, `plannedAmount`, `notes`, optional `vendorId`.
- **expenses.** `weddingId`, `amount`, `date`, `side`, `category`, `note`, optional `vendorId`, optional `milestoneId`.
- **guests.** `weddingId`, household fields, `token`, `invitedEventIds[]`, `rsvps[]`, `attendingCount`, `responseNote`, `respondedAt`.
- **photos.** Metadata only. `weddingId`, `uploaderName`, `note`, `status`, `privateKey`, `publicUrl`, `contentType`, `size`, `reviewedAt`, `reviewedBy`.
- **rateLimits.** `key`, `count`, `windowStart`. Used for phone lookup and upload signing.

## Indexes

- `weddings`: unique `slug`, unique `galleryToken`, `ownerId` + `primaryDate`.
- `weddingMembers`: unique `{ weddingId, email }`, plus `userId`.
- `tasks`: `{ weddingId, status, dueDate }` and `{ weddingId, assigneeId }`.
- `vendors`, `budgetLines`, `expenses`: `weddingId`.
- `guests`: unique `token`, `{ weddingId, phone }`, and `weddingId`.
- `photos`: unique `privateKey`, `{ weddingId, status, createdAt }`.
- `rateLimits`: unique `key`, TTL on `windowStart`.

## Money write

- Spent is the sum of `expenses`, grouped by side.
- Marking a milestone paid and creating its expense happens in one Atlas transaction.
- Marking it unpaid deletes that linked expense in the same transaction.
- This is the only multi-document transaction in version one.
- Dashboard totals are four indexed queries: open tasks, RSVP totals, expense sums, and pending photos.

## Photo and contract flow

- Signing an upload checks the caller, the MIME type, and a maximum size of 10 MB.
- Allowed types: `image/jpeg`, `image/png`, `image/webp`, and PDF for contracts.
- The presigned PUT expires in five minutes and is bound to that content type and length.
- Object keys are `weddings/{weddingId}/photos/{photoId}` and `weddings/{weddingId}/contracts/{fileId}`.
- The client cannot choose the key.
- The browser PUTs the file to the private bucket, then calls complete.
- Complete checks the object with HEAD and inserts the photo as pending.
- Complete is idempotent on `privateKey`.
- Approve copies the object into the public bucket, writes `publicUrl`, sets status approved, then deletes the private object.
- If the copy fails, the photo stays pending.
- Reject deletes the private object and the photo row.
- Contracts stay in the private bucket. Planner and couple download them with a signed GET that expires in a few minutes.
- The public gallery reads `publicUrl` only.

## Auth

- Planner signup and login are email plus password.
- Session cookie is httpOnly, secure in production, and lasts about 30 days.
- Couple and family have no public signup.
- The inviter sees a copyable link, and Resend sends that same link.
- Accepting an invite creates the user if needed, sets `userId`, and marks the member active.
- Password reset uses a single-use token, a copyable link, and a Resend email.

## App layout

- `app/(auth)/` for login, signup, and `invite/[token]`.
- `app/(workspace)/weddings` and `weddings/[weddingId]/...` for the planner workspace.
- `app/w/[slug]` for the public page and `r/[token]` for RSVP.
- `app/g/[galleryToken]` for the private gallery and upload.
- `app/api/uploads/sign` and `complete` for R2.
- `app/api/weddings/[weddingId]/qr` for the QR PNG.
- `app/api/places/search` for Google Places.
- `lib/db.ts` caches the Mongoose connection.
- `lib/auth.ts` is Auth.js.
- `lib/r2.ts` presigns, heads, copies, and deletes.
- `lib/email.ts` is Resend.
- `lib/places.ts` is Google Places.
- `lib/validation/` holds Zod schemas.
- `lib/access.ts` is `requireWeddingAccess`.
- `lib/domain/` holds weddings, tasks, vendors, budget, guests, and photos.
- `lib/models/` holds Mongoose schemas.

## Environment

- `MONGODB_URI`
- `MONGODB_DB`
- `AUTH_SECRET`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_PRIVATE_BUCKET`
- `R2_PUBLIC_BUCKET`
- `R2_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_APP_URL`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `GOOGLE_PLACES_API_KEY`
- Atlas allows TLS from the internet, because Vercel has no stable egress IP.
- The database user can read and write only this application’s databases.
- Secrets live in Vercel env, not in the repo.

## Acceptance

- A new planner can sign up, create a templated wedding, and see seeded events and tasks.
- The planner can invite a couple and a family member. Each person only sees what their role allows, on that wedding alone.
- A second planner cannot open the first planner’s wedding by URL or by guessing an id.
- The planner can record a vendor, mark an advance paid, and see that amount once in spent.
- The planner can add a household, invite them to three events, open WhatsApp with their link, and see Yes or No per event after the guest saves.
- Unpublished weddings still accept token RSVP. The public homepage stays unpublished until publish.
- A YouTube URL embeds. A non-YouTube URL is rejected. Turning visibility off removes the block.
- A guest upload stays hidden until approval, then appears on the gallery. Reject removes it.
- The downloaded QR code opens the private gallery URL.
- Family cannot open the approval queue, vendors, or website editor.

## Build sequence

- Auth, planner account, weddings, and invites with the three roles.
- Events, run sheet, tasks, vendors with Google Places search, milestones, budget, and expenses.
- Guests and token RSVP.
- Templates, preview, publish, and YouTube embed.
- Invite and reminder messages, Resend, copy link, and WhatsApp share.
- Photo upload, MongoDB photo metadata, approval, private gallery, and a QR code of that URL.
- Role checks, then a browser pass of planner, couple, family, RSVP, and photo approval.

## Later

- Agency staff who share one planner account.
- WhatsApp Business API sends.
- Subscription billing.
- A freeform page builder.
- In-app live streaming.
- Seating.
- A shagun ledger.
- More ritual templates, added as data.
- A scheduled cleanup for private photo objects that never got a MongoDB row.
- Redis, a job queue, Atlas Search, and image-processing workers stay out until one of those jobs is real.

## Summary

This document covers the full version-one design in bullets:

- Problem, product, goals, users, and permissions.
- Planner home, wedding setup, and the Indian multi-event template.
- Dashboard, events, tasks, vendors, budget, guests, invites, people, website, live video, gallery, and QR.
- Guest flows, the main planner flow, privacy, and experience.
- Stack, architecture, routes, and access control, including one shared database with a planner tenant per `ownerId` and a wedding boundary per `weddingId`.
- Collections, indexes, the money write, photo upload, auth, app layout, and environment variables.
- Acceptance checks, build order, and later work.
