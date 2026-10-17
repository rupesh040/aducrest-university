# AduCrest photograph and logo inventory

All photographs below were extracted from individual photographic areas of the supplied reference screenshots. No complete page screenshot is used as a page or section background. Coordinates are native screenshot pixels `(left, top, right, bottom)`. No external stock photographs were substituted.

`public/images/logo.png` is a byte-for-byte copy of the supplied official logo, including its original transparency and colors. `public/images/logo-light.png` is an optional presentation derivative: navy pixels in the wordmark and tagline are white so they remain legible on navy headers and footers. The crest, gold wordmark, shape, and transparency are preserved.

| Asset under public/images | Source screenshot | Crop | Notes |
|---|---|---|---|
| `hero/student.jpg` | `home.jpg` | `(650, 125, 1349, 760)` | Unobscured right portion of homepage hero. |
| `about/student.jpg` | `about.jpg` | `(74, 553, 393, 1034)` | Narrow student portrait crop avoids the overlaid campus photograph. |
| `about/campus.jpg` | `about.jpg` | `(401, 734, 672, 1080)` |  |
| `courses/course-1.jpg` | `course.jpg` | `(77, 705, 358, 859)` |  |
| `courses/course-2.jpg` | `course.jpg` | `(381, 705, 659, 859)` |  |
| `courses/course-3.jpg` | `course.jpg` | `(682, 705, 963, 859)` |  |
| `courses/course-4.jpg` | `course.jpg` | `(984, 705, 1266, 859)` |  |
| `courses/course-5.jpg` | `course.jpg` | `(77, 1029, 358, 1170)` |  |
| `courses/course-6.jpg` | `course.jpg` | `(381, 1029, 659, 1170)` |  |
| `courses/course-7.jpg` | `course.jpg` | `(682, 1029, 963, 1170)` |  |
| `courses/course-8.jpg` | `course.jpg` | `(984, 1029, 1266, 1170)` |  |
| `faculty/faculty-1.jpg` | `faculty.jpg` | `(76, 709, 317, 904)` |  |
| `faculty/faculty-2.jpg` | `faculty.jpg` | `(394, 709, 635, 904)` |  |
| `faculty/faculty-3.jpg` | `faculty.jpg` | `(710, 709, 951, 904)` |  |
| `faculty/faculty-4.jpg` | `faculty.jpg` | `(1025, 709, 1267, 904)` |  |
| `faculty/faculty-5.jpg` | `faculty.jpg` | `(76, 999, 317, 1193)` |  |
| `faculty/faculty-6.jpg` | `faculty.jpg` | `(394, 999, 635, 1193)` |  |
| `faculty/faculty-7.jpg` | `faculty.jpg` | `(710, 999, 951, 1193)` |  |
| `faculty/faculty-8.jpg` | `faculty.jpg` | `(1025, 999, 1267, 1193)` |  |
| `faculty/faculty-9.jpg` | `faculty.jpg` | `(76, 1282, 317, 1467)` |  |
| `faculty/faculty-10.jpg` | `faculty.jpg` | `(394, 1282, 635, 1467)` |  |
| `faculty/faculty-11.jpg` | `faculty.jpg` | `(710, 1282, 951, 1467)` |  |
| `faculty/faculty-12.jpg` | `faculty.jpg` | `(1025, 1282, 1267, 1467)` |  |
| `blogs/blog-1.jpg` | `blog.jpg` | `(76, 745, 457, 982)` |  |
| `blogs/blog-2.jpg` | `blog.jpg` | `(488, 745, 864, 982)` |  |
| `blogs/blog-3.jpg` | `blog.jpg` | `(891, 745, 1270, 982)` |  |
| `blogs/blog-4.jpg` | `blog.jpg` | `(76, 1255, 457, 1489)` |  |
| `blogs/blog-5.jpg` | `blog.jpg` | `(488, 1255, 864, 1489)` |  |
| `blogs/blog-6.jpg` | `blog.jpg` | `(891, 1255, 1270, 1489)` |  |
| `blogs/classroom.jpg` | `course-detail.jpg` | `(76, 563, 858, 855)` |  |
| `blogs/group.jpg` | `blog-detail.jpg` | `(69, 1691, 856, 1960)` |  |
| `hero/admission.jpg` | `about.jpg` | `(884, 1835, 1312, 2240)` | Right portrait from admission banner; crop begins to the right of all text. |
| `testimonials/student.jpg` | `home.jpg` | `(971, 3112, 1210, 3349)` | Circular portrait retained with navy corners matching testimonial panel. |
| `banners/inner.jpg` | `faq.jpg` | `(762, 121, 1349, 511)` | Right-hand portion of common inner hero avoids baked page heading and breadcrumb. |
| `contact/campus.jpg` | `contact.jpg` | `(925, 734, 1275, 1304)` |  |
| `faq/student.jpg` | `faq.jpg` | `(37, 797, 402, 1220)` | Student cutout and pale blue decorative shape from FAQ illustration. |

## Practical limits

The source photographs are embedded in page screenshots; their extracted resolution is therefore lower than independent source photography. The homepage hero and inner banner use clean right-hand photographic crops so their original baked page titles and buttons do not appear in the rebuilt interface. Some decorative background shapes remain around the FAQ student and admission portrait.

The official logo contains navy wordmark text, so it is most legible on a light background. The unchanged original and optional light presentation derivative are both included.

## Clean photographic banner

`public/images/banners/inner-clean.png` is a built-in ImageGen edit of the photographic region cropped from `course.jpg`. It removes screenshot heading and breadcrumb graphics; the live site adds real HTML titles and breadcrumbs. The earlier text-free right crop remains available as `inner.jpg`. No complete screenshot is used as a background.

Final edit prompt (built-in tool mode):

> Use case: precise-object-edit. Edit target: the attached wide photographic banner crop. Remove ONLY the overlaid white text 'Our Courses' and the translucent brown rounded breadcrumb pill including the small home icon and 'Home > Our Courses' text. Inpaint those small regions with the actual underlying photograph: the woman's raised arm, hand and fingers, skin, hair and dark kitchen background. Keep the smiling woman's identity, eyeglasses, phone, brown shirt, pose, lighting, exact wide composition and all original photography unchanged. Output the clean full photograph only, in the same wide panoramic composition. No typography, no icons, no shapes, no UI or watermarks. This clean photograph will be a web banner background; live title text will be added in HTML.
