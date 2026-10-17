# AduCrest University

A complete, responsive university website built with Next.js App Router, React, TypeScript, Tailwind CSS, Lucide icons, and centralized JSON content. The ten reference layouts share navigation, banners, cards, carousels, forms, and a component registry.

## Run locally

Use Node.js **22.13 or newer** and npm. Open a terminal in this project directory:

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:3000**. To run a production build locally:

```sh
npm run build
npm start
```

The development and production scripts bind to the local interface. On your own server, use a reverse proxy in front of that address or run `npx next start --hostname 0.0.0.0` when your hosting platform requires a public listening interface. Keep the server process running; the contact and admission handlers require a server runtime.

## Pages

| URL | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/courses` | Paginated courses |
| `/courses/[slug]` | Individual course |
| `/faculty` | Paginated faculty |
| `/blog` | Paginated articles |
| `/blog/[slug]` | Individual article |
| `/faq` | Accessible FAQ accordion |
| `/contact` | Contact form, information, and map |
| `/apply-now` | Admission form and application process |

Every JSON course and article has its own slug route and metadata. Unknown course or article slugs show the application's not-found page. The JSON-defined entries are supplied to `generateStaticParams` during the build.

## Content architecture

Edit **`src/data/content.json`** to update the website. All visible website copy, navigation labels, images and alt text, course and faculty data, article blocks, form labels, validation messages, and submission feedback come from this file.

```text
Education
├── brand
├── ui
├── templateComponents
│   └── template-1
│       ├── shared
│       └── pages
├── sections
│   └── section-key
│       └── variants
│           └── EducationComponent1
└── collections
    ├── courses
    ├── faculty
    ├── blogs
    ├── testimonials
    └── departments
```

`Education.templateComponents.template-1.shared` resolves the common topbar, header, and footer. Each page in `pages` defines an ordered `components` array. Every array item has a section `key` and a `component` identifier:

```json
{ "key": "popular-courses", "component": "EducationPopularCourses1" }
```

The renderer resolves that identifier through `src/lib/componentRegistry.tsx` and reads its data from `Education.sections[key].variants[component]`. Reordering a page's `components` array changes section order. Shared component configurations are reused across routes. Unknown registered identifiers are handled by the registry's fallback behavior.

To change a section, edit its variant. To add a new variant, implement the React component, register its identifier, add its variant data, and reference it in a page configuration. TypeScript interfaces live in `src/types/content.ts`; content access helpers live in `src/lib/content.ts`.

Course, faculty, article, and department collections render automatically. Keep IDs and slugs unique. Preview sections select collection items using their configured slug or ID arrays; include a newly added item there when it should also appear in a homepage carousel. Listing `pageSize` settings control pagination. Blog `blocks` support paragraphs, headings, quotes, images, and checklists without embedding article HTML in JSX.

Changing a content file requires a rebuild on a production deployment; the project does not include a remote CMS or an admin editor.

## Project layout

```text
app/                         Next.js App Router pages and API routes
src/components/layout/       Shared topbar, navigation, footer, banners
src/components/sections/     Home/About sections, listings, cards, and detail renderers
src/components/forms/        Controlled forms and admission/contact sections
src/components/faq/          Accessible FAQ accordion
src/components/ui/           Reusable design primitives and interactions
src/data/content.json        Central website content
src/lib/                     Content helpers, registry, validation, submission handler
src/types/content.ts         Content interfaces
public/images/               Local photographic and branding assets
scripts/verify-content.mjs   Content, route, and local asset checks
```

The App Router is deliberately at the project root, while the reusable implementation is under `src/`. The `@/` import alias points to `src/`.

## Contact and admission forms

Both forms use controlled React inputs and the same validation rules on the client and server. They check required fields, email and phone formatting, valid course and department IDs, message length, and valid dates of birth that are not in the future. The current day uses `Education.ui.forms.timeZone` (`Asia/Kolkata`) consistently on the client and server. API handlers accept JSON, bound request size, and reject cross-origin submissions when an Origin header is supplied.

Endpoints:

```text
POST /api/contact
POST /api/admission
```

**The default mode validates details only.** It returns `ok: true` with `status: "validated"` and a clear message explaining that nothing was sent or stored. It does not create admissions records, send email, upload documents, or persist personal data. Validation success is not admission confirmation.

### Connect a production submission service

Copy `.env.example` to `.env.local`, then configure one or both server-side webhooks:

```dotenv
ADUCREST_CONTACT_WEBHOOK_URL=https://your-service.example/contact
ADUCREST_CONTACT_WEBHOOK_TOKEN=
ADUCREST_ADMISSION_WEBHOOK_URL=https://your-service.example/admission
ADUCREST_ADMISSION_WEBHOOK_TOKEN=
```

URLs must use HTTPS and must not include URL credentials or fragments. Tokens are optional; when set, the handler sends `Authorization: Bearer <token>`. Keep these variables server-side: do not rename them with a `NEXT_PUBLIC_` prefix or put secrets in `content.json`. Restart the development server after changing environment variables; configure the same variables in the production host.

The configured service receives a JSON POST:

```json
{
  "type": "admission",
  "submittedAt": "2026-10-17T12:00:00.000Z",
  "fields": {
    "fullName": "Example Applicant",
    "email": "applicant@example.com",
    "phone": "+91 98765 43210",
    "birthDate": "2004-02-29",
    "course": "a-course-id-from-content-json",
    "department": "a-department-id-from-content-json",
    "message": ""
  }
}
```

Contact requests contain `fullName`, `email`, `phone`, `course`, and `message`. Admission requests additionally contain `birthDate` and `department`; their message is optional. A course detail page's Apply Now link preselects that course in the admission form. Unknown fields and non-string values are rejected. The handler forwards normalized, validated fields, uses an eight-second timeout, refuses redirects, and does not log personal data or webhook response bodies.

A `2xx` response from the webhook returns `status: "delivered"`; the JSON-configured feedback accurately describes acceptance by that service. The receiving service is responsible for email delivery, storage, access control, duplicate handling, and any subsequent admission workflow. A non-`2xx` response or network failure remains an error. With neither webhook configured, the default validation-only mode continues to work.

After configuring a real service, update `Education.ui.forms.notice` and the relevant status copy in `content.json` so the displayed explanation matches your integration. Never replace validation-only feedback with an unverified delivery claim.

## Images, links, map, and video

The official supplied logo is included as `public/images/logo.png`. The optional light derivative improves wordmark contrast on navy backgrounds. Photographs are individual crops from the provided reference screenshots, rather than independent high-resolution originals. **`ASSETS.md`** records every source, crop, and limitation. No whole reference page is used as a background. Replace the JSON image paths with higher-resolution licensed photographs when those become available.

The sample university addresses and contact details reproduce the design brief and are illustrative. The map URL and location notice are configured under `Education.sections.contact.variants.EducationContact1.map`; the map is centered on New Delhi, not a verified campus address. Replace the address, map, phone numbers, email addresses, and social links with the university's verified details before launch. The included social links point to their platforms because no official university profiles were supplied.

Course preview buttons use each course's configured `videoUrl`. A missing URL opens the JSON-configured unavailable message instead of pretending to play a video. Configure an actual supported HTTPS video URL to enable a preview.

## Verify

Run the checks before deploying:

```sh
npm run lint
npm run typecheck
npm run verify:content
npm run test:forms
npm run build
```

The content verifier checks the JSON architecture and its referenced entries, links, slugs, and image paths. Manually check the responsive menu, carousels, listing pagination, dynamic routes, FAQ keyboard controls, and both forms in a browser after content or design changes.

`npm run test:forms` runs 65 checks against the actual shared validation and submission-handler modules. It covers valid and malformed payloads, required fields, invalid contact details, invalid/future dates and the local-day boundary, unknown collection IDs, oversized bodies, strict origin handling (including localhost/127.0.0.1 development aliases), default validation-only responses, and successful/failing mocked HTTPS webhooks. The test uses the installed TypeScript dev dependency to transpile those modules in memory and makes no real outbound network requests.

## Deployment

For a standard Next.js deployment, install with `npm ci`, build with `npm run build`, and start with `npm start`, or use a hosting provider's Next.js support. Supply the webhook environment variables only when a real submission service is ready. A static file-only host cannot execute the included API routes.

The source also includes the optional Sites/Vinext adapter used for private Sites hosting:

```sh
npm run build:sites
```

`build:sites` packages the same Next.js application through the adapter. `npm run dev:sites` runs its local adapter development mode. These commands are separate from the standard Next.js build and require the included adapter tooling and hosting environment. Keep `build/`, `vendor/`, `vite.config.ts`, and adapter scripts when using that path. The checkout-local `.sites-runtime` directory is tooling state and is excluded from version control.

No database, email account, or storage provider is required to run or build the default website.

With a local server running, `npm run test:smoke` checks every configured route and the local form endpoints. Pass an alternate base URL after `--`; remote checks use `--skip-api`.

The footer identifies the site as a design demonstration. Programme details, fees, enrolment figures, additional faculty profiles and student stories are illustrative content, requiring institutional verification for real use.
