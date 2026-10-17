import { readFileSync, statSync, existsSync } from 'node:fs';
import { dirname, resolve, relative, isAbsolute, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Validate the actual content architecture and references before a build.
// This script intentionally uses only Node's standard library.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const filename = resolve(root, 'src/data/content.json');
const publicDirectory = resolve(root, 'public');
const errors = [];
const fail = (path, message) => errors.push(`${path}: ${message}`);
const object = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0;
const requiredPages = ['home', 'about', 'courses', 'course-detail', 'faculty', 'blog', 'blog-detail', 'faq', 'contact', 'apply-now'];
const staticRoutes = new Set(['/', '/about', '/courses', '/faculty', '/blog', '/faq', '/contact', '/apply-now']);
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif']);
const supportedBlocks = new Set(['paragraph', 'heading', 'quote', 'image', 'list']);
const checkedImages = new Set();
let mappingCount = 0;
let linkCount = 0;
let sectionCount = 0;

function requireText(value, path) {
  if (!nonempty(value)) fail(path, 'must be a nonempty string');
}

function requireTexts(value, path) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(path, 'must contain at least one text item');
    return;
  }
  value.forEach((item, index) => requireText(item, `${path}[${index}]`));
}

function requireObject(value, path) {
  if (!object(value)) {
    fail(path, 'must be an object');
    return false;
  }
  return true;
}

function requireCollection(value, path) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(path, 'must be a nonempty collection');
    return [];
  }
  return value;
}

function uniqueIdentifiers(items, field, path) {
  const seen = new Set();
  items.forEach((item, index) => {
    const value = item?.[field];
    requireText(value, `${path}[${index}].${field}`);
    if (nonempty(value)) {
      if (seen.has(value)) fail(`${path}[${index}].${field}`, `duplicate ${field} "${value}"`);
      seen.add(value);
      if (field === 'slug' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
        fail(`${path}[${index}].slug`, 'must use lowercase URL-safe words separated by hyphens');
      }
    }
  });
  return seen;
}

function validateImage(value, path) {
  if (!requireObject(value, path)) return;
  requireText(value.src, `${path}.src`);
  requireText(value.alt, `${path}.alt`);
}

function validateAsset(src, path) {
  if (!nonempty(src) || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(src)) return;
  const pathname = src.split(/[?#]/)[0];
  if (!pathname.startsWith('/')) {
    fail(path, `local asset must use an absolute public path: "${src}"`);
    return;
  }
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { fail(path, 'asset path has invalid URL encoding'); return; }
  const asset = resolve(publicDirectory, `.${decoded}`);
  const publicRelative = relative(publicDirectory, asset);
  if (publicRelative.startsWith('..') || isAbsolute(publicRelative)) {
    fail(path, 'asset path escapes public/');
    return;
  }
  if (checkedImages.has(asset)) return;
  checkedImages.add(asset);
  if (!existsSync(asset) || !statSync(asset).isFile()) fail(path, `missing asset public${pathname}`);
}

function validateLink(href, path, routes) {
  requireText(href, path);
  if (!nonempty(href)) return;
  linkCount++;
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return;
  if (href === '#' || href === '') { fail(path, 'placeholder link has no destination'); return; }
  if (href.startsWith('#')) return;
  if (!href.startsWith('/')) { fail(path, `internal link must begin with /: "${href}"`); return; }
  let pathname;
  try { pathname = decodeURIComponent(href.split(/[?#]/)[0]); } catch { fail(path, 'link has invalid URL encoding'); return; }
  if (pathname.length > 1) pathname = pathname.replace(/\/+$/, '');
  if (!routes.has(pathname)) fail(path, `unknown internal route "${pathname}"`);
}

function checkReferences(list, allowed, path) {
  if (!Array.isArray(list) || list.length === 0) { fail(path, 'must contain at least one collection reference'); return; }
  const seen = new Set();
  list.forEach((value, index) => {
    requireText(value, `${path}[${index}]`);
    if (!allowed.has(value)) fail(`${path}[${index}]`, `unknown collection reference "${value}"`);
    if (seen.has(value)) fail(`${path}[${index}]`, `duplicate collection reference "${value}"`);
    seen.add(value);
  });
}

function validateHeading(value, path) {
  if (!requireObject(value, path)) return;
  requireText(value.title, `${path}.title`);
  for (const key of ['eyebrow', 'highlight', 'description']) {
    if (value[key] !== undefined) requireText(value[key], `${path}.${key}`);
  }
}

let parsed;
try {
  parsed = JSON.parse(readFileSync(filename, 'utf8').replace(/^\uFEFF/, ''));
} catch (error) {
  console.error(`Content validation failed: cannot read or parse src/data/content.json.\n${error.message}`);
  process.exit(1);
}

const content = parsed.Education;
if (!requireObject(content, 'Education')) finish();
const collections = object(content.collections) ? content.collections : {};
if (!object(content.collections)) fail('Education.collections', 'must be an object');
const courses = requireCollection(collections.courses, 'collections.courses');
const faculty = requireCollection(collections.faculty, 'collections.faculty');
const blogs = requireCollection(collections.blogs, 'collections.blogs');
const testimonials = requireCollection(collections.testimonials, 'collections.testimonials');
const departments = requireCollection(collections.departments, 'collections.departments');
const courseSlugs = uniqueIdentifiers(courses, 'slug', 'collections.courses');
uniqueIdentifiers(courses, 'id', 'collections.courses');
const facultyIds = uniqueIdentifiers(faculty, 'id', 'collections.faculty');
const blogSlugs = uniqueIdentifiers(blogs, 'slug', 'collections.blogs');
uniqueIdentifiers(blogs, 'id', 'collections.blogs');
const testimonialIds = uniqueIdentifiers(testimonials, 'id', 'collections.testimonials');
uniqueIdentifiers(departments, 'id', 'collections.departments');
const routes = new Set([...staticRoutes, ...[...courseSlugs].map(slug => `/courses/${slug}`), ...[...blogSlugs].map(slug => `/blog/${slug}`)]);

courses.forEach((course, index) => {
  const path = `collections.courses[${index}]`;
  if (!requireObject(course, path)) return;
  for (const key of ['title', 'category', 'duration', 'eligibility', 'updated']) requireText(course[key], `${path}.${key}`);
  for (const key of ['image', 'mainImage', 'previewImage']) validateImage(course[key], `${path}.${key}`);
  requireTexts(course.overview, `${path}.overview`);
  requireTexts(course.outcomes, `${path}.outcomes`);
  if (requireObject(course.meta, `${path}.meta`)) {
    for (const key of ['cost', 'instructor', 'duration', 'students', 'views', 'lessons', 'language', 'certificate']) requireText(course.meta[key], `${path}.meta.${key}`);
  }
  if (course.videoUrl !== null && course.videoUrl !== undefined) requireText(course.videoUrl, `${path}.videoUrl`);
});

faculty.forEach((member, index) => {
  const path = `collections.faculty[${index}]`;
  if (!requireObject(member, path)) return;
  for (const key of ['name', 'role', 'department']) requireText(member[key], `${path}.${key}`);
  validateImage(member.image, `${path}.image`);
});

blogs.forEach((blog, index) => {
  const path = `collections.blogs[${index}]`;
  if (!requireObject(blog, path)) return;
  for (const key of ['title', 'category', 'date', 'author', 'excerpt']) requireText(blog[key], `${path}.${key}`);
  validateImage(blog.image, `${path}.image`);
  const blocks = requireCollection(blog.blocks, `${path}.blocks`);
  blocks.forEach((block, blockIndex) => {
    const blockPath = `${path}.blocks[${blockIndex}]`;
    if (!requireObject(block, blockPath)) return;
    if (!supportedBlocks.has(block.type)) { fail(`${blockPath}.type`, `unsupported article block "${block.type}"`); return; }
    if (['paragraph', 'heading', 'quote'].includes(block.type)) requireText(block.text, `${blockPath}.text`);
    if (block.type === 'quote') {
      requireText(block.author, `${blockPath}.author`);
      requireText(block.role, `${blockPath}.role`);
    }
    if (block.type === 'image') validateImage(block.image, `${blockPath}.image`);
    if (block.type === 'list') requireTexts(block.items, `${blockPath}.items`);
  });
});

testimonials.forEach((testimonial, index) => {
  const path = `collections.testimonials[${index}]`;
  if (!requireObject(testimonial, path)) return;
  for (const key of ['quote', 'name', 'course']) requireText(testimonial[key], `${path}.${key}`);
  validateImage(testimonial.image, `${path}.image`);
});
departments.forEach((department, index) => requireText(department?.label, `collections.departments[${index}].label`));

if (requireObject(content.brand, 'brand')) {
  for (const key of ['name', 'tagline', 'description', 'email', 'phone', 'address', 'admissionsEmail']) requireText(content.brand[key], `brand.${key}`);
  validateImage(content.brand.logo, 'brand.logo');
}

const sections = object(content.sections) ? content.sections : {};
if (!object(content.sections) || Object.keys(sections).length === 0) fail('sections', 'must contain reusable section variants');
const allVariants = new Set();
for (const [sectionKey, section] of Object.entries(sections)) {
  if (!requireObject(section, `sections.${sectionKey}`)) continue;
  const variants = section.variants;
  if (!requireObject(variants, `sections.${sectionKey}.variants`) || Object.keys(variants).length === 0) {
    fail(`sections.${sectionKey}.variants`, 'must contain at least one variant');
    continue;
  }
  for (const [variant, data] of Object.entries(variants)) {
    const path = `sections.${sectionKey}.variants.${variant}`;
    allVariants.add(variant);
    sectionCount++;
    if (!requireObject(data, path)) continue;
    if (Object.keys(data).length === 0) fail(path, 'variant must contain data');
    for (const heading of ['heading', 'overviewHeading', 'outcomesHeading', 'detailsHeading']) {
      if (data[heading] !== undefined) validateHeading(data[heading], `${path}.${heading}`);
    }
    if (data.courseSlugs !== undefined) checkReferences(data.courseSlugs, courseSlugs, `${path}.courseSlugs`);
    if (data.facultyIds !== undefined) checkReferences(data.facultyIds, facultyIds, `${path}.facultyIds`);
    if (data.blogSlugs !== undefined) checkReferences(data.blogSlugs, blogSlugs, `${path}.blogSlugs`);
    if (data.recentSlugs !== undefined) checkReferences(data.recentSlugs, blogSlugs, `${path}.recentSlugs`);
    if (data.testimonialIds !== undefined) checkReferences(data.testimonialIds, testimonialIds, `${path}.testimonialIds`);
    if (data.pageSize !== undefined && (!Number.isInteger(data.pageSize) || data.pageSize < 1)) fail(`${path}.pageSize`, 'must be a positive integer');
    if (Array.isArray(data.items) && /faq/i.test(sectionKey)) {
      uniqueIdentifiers(data.items, 'id', `${path}.items`);
      data.items.forEach((item, index) => {
        requireText(item.question, `${path}.items[${index}].question`);
        requireText(item.answer, `${path}.items[${index}].answer`);
      });
    }
    if (data.form !== undefined && requireObject(data.form, `${path}.form`)) {
      for (const key of ['title', 'description', 'submitLabel']) requireText(data.form[key], `${path}.form.${key}`);
      const fields = requireCollection(data.form.fields, `${path}.form.fields`);
      const seen = new Set();
      fields.forEach((field, index) => {
        if (!object(content.ui?.forms?.fields?.[field])) fail(`${path}.form.fields[${index}]`, `unknown form field "${field}"`);
        if (seen.has(field)) fail(`${path}.form.fields[${index}]`, `duplicate form field "${field}"`);
        seen.add(field);
      });
    }
  }
}

const templates = content.templateComponents;
if (!requireObject(templates, 'templateComponents') || Object.keys(templates).length === 0) fail('templateComponents', 'must contain at least one template');
if (!object(templates?.['template-1'])) fail('templateComponents.template-1', 'active template used by src/lib/content.ts must exist');
for (const [templateId, template] of Object.entries(object(templates) ? templates : {})) {
  const templatePath = `templateComponents.${templateId}`;
  if (!requireObject(template, templatePath)) continue;
  if (requireObject(template.shared, `${templatePath}.shared`)) {
    if (Object.keys(template.shared).length < 3) fail(`${templatePath}.shared`, 'must provide topbar, header, and footer mappings');
    for (const [key, variant] of Object.entries(template.shared)) {
      requireText(variant, `${templatePath}.shared.${key}`);
      if (!allVariants.has(variant)) fail(`${templatePath}.shared.${key}`, `missing shared variant "${variant}" across sections`);
    }
  }
  if (!requireObject(template.pages, `${templatePath}.pages`)) continue;
  for (const pageId of requiredPages) {
    const page = template.pages[pageId];
    const pagePath = `${templatePath}.pages.${pageId}`;
    if (!requireObject(page, pagePath)) continue;
    for (const key of ['title', 'description']) requireText(page[key], `${pagePath}.${key}`);
    const mappings = requireCollection(page.components, `${pagePath}.components`);
    const mappedCollections = new Set();
    mappings.forEach((mapping, index) => {
      const path = `${pagePath}.components[${index}]`;
      if (!requireObject(mapping, path)) return;
      requireText(mapping.key, `${path}.key`);
      requireText(mapping.component, `${path}.component`);
      mappingCount++;
      const data = sections[mapping.key]?.variants?.[mapping.component];
      if (!object(data)) { fail(path, `missing ordered section variant ${mapping.key}/${mapping.component}`); return; }
      // A numbered listing requires enough data to actually change pages.
      const listing = { courses, faculty, blog: blogs }[pageId];
      if (listing && data.pageSize !== undefined) {
        mappedCollections.add(pageId);
        if (listing.length <= data.pageSize) fail(`${path}.pageSize`, `${pageId} has ${listing.length} entries but pageSize ${data.pageSize}; pagination needs at least two pages`);
      }
    });
    if (['courses', 'faculty', 'blog'].includes(pageId) && mappedCollections.size === 0) fail(`${pagePath}.components`, 'listing needs a mapped section with a configured pageSize');
  }
}

// Walk all data, including variants not currently active, to catch future edits.
function inspect(value, path = 'Education', key = '') {
  if (typeof value === 'string') {
    if (/\b(?:plumb(?:ing|er|ers)?|sewer|faucet|toilet|water heater|drain cleaning)\b/i.test(value)) fail(path, 'contains unrelated plumbing template content');
    if (/^(?:(?:our|popular|professional|quality)\s+)?services$/i.test(value.trim())) fail(path, 'contains an unrelated Services template label');
    if (key === 'href') validateLink(value, path, routes);
    if (key === 'src' || value.startsWith('/images/') || (value.startsWith('/') && imageExtensions.has(extname(value.split(/[?#]/)[0]).toLowerCase()))) validateAsset(value, path);
    return;
  }
  if (Array.isArray(value)) { value.forEach((item, index) => inspect(item, `${path}[${index}]`)); return; }
  if (!object(value)) return;
  if (Object.prototype.hasOwnProperty.call(value, 'src')) validateImage(value, path);
  for (const [childKey, child] of Object.entries(value)) {
    if (/^services?$/i.test(childKey)) fail(`${path}.${childKey}`, 'contains an unrelated Services template section');
    inspect(child, `${path}.${childKey}`, childKey);
  }
}
inspect(content);

function finish() {
  if (errors.length) {
    console.error(`Content validation failed (${errors.length} ${errors.length === 1 ? 'error' : 'errors'}):`);
    errors.slice(0, 60).forEach(error => console.error(`- ${error}`));
    if (errors.length > 60) console.error(`- ...and ${errors.length - 60} more errors`);
    process.exit(1);
  }
  console.log(`Content valid: ${requiredPages.length} pages, ${sectionCount} variants, ${mappingCount} ordered mappings, ${courses.length} courses, ${faculty.length} faculty, ${blogs.length} articles, ${checkedImages.size} local assets, ${linkCount} links.`);
}
finish();
