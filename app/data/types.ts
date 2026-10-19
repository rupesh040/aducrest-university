export interface ImageAsset {
  src: string;
  alt: string;
}
export interface ButtonLink {
  label: string;
  href: string;
}
export interface Heading {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
}
export interface SocialLink extends ButtonLink {
  icon: string;
}
export interface ContactLink {
  icon: string;
  label: string;
  href: string;
}
export interface FooterContact extends ContactLink {
  value: string;
}
export interface ComponentMapping {
  key: string;
  component: string;
}
export interface PageConfiguration {
  title: string;
  description: string;
  components: ComponentMapping[];
}
export type PageId =
  | "home"
  | "about"
  | "courses"
  | "course-detail"
  | "faculty"
  | "faculty-detail"
  | "blog"
  | "blog-detail"
  | "faq"
  | "contact";
export interface TopbarSection {
  contacts: ContactLink[];
  socials: SocialLink[];
}
export interface HeaderSection {
  logo: ImageAsset;
  navigation: ButtonLink[];
  apply: ButtonLink;
}
export interface FooterSection {
  logo: ImageAsset;
  description: string;
  socials: SocialLink[];
  linksTitle: string;
  links: ButtonLink[];
  coursesTitle: string;
  courseLinks: ButtonLink[];
  addressTitle: string;
  contacts: FooterContact[];
  copyright: string;
}
export interface HeroSection {
  eyebrow: string;
  titleLines: { text: string; accent: boolean }[];
  description: string;
  button: ButtonLink;
  image: ImageAsset;
}
export interface AboutSection {
  heading: Heading;
  paragraphs: string[];
  images: ImageAsset[];
  benefits: { icon: string; title: string; description: string }[];
  button: ButtonLink;
  phone: { label: string; value: string; href: string };
}
export interface PopularCoursesSection {
  heading: Heading;
  courseSlugs: string[];
  pageSize: number;
}
export interface AdmissionCTASection {
  heading: Heading;
  features: { icon: string; label: string }[];
  button: ButtonLink;
  image: ImageAsset;
}
export interface FacultyPreviewSection {
  heading: Heading;
  facultyIds: string[];
  pageSize: number;
}
export interface TestimonialsSection {
  heading?: Heading;
  testimonialIds: string[];
}
export interface LatestBlogsSection {
  heading: Heading;
  blogSlugs: string[];
  pageSize: number;
}
export interface BannerSection {
  title: string;
  image: ImageAsset;
  breadcrumbs: { label: string; href?: string }[];
}
export interface ListingSection {
  heading: Heading;
  pageSize: number;
}
export interface CourseDetailSection {
  overviewHeading: Heading;
  outcomesHeading: Heading;
  detailsHeading: Heading;
  applyLabel: string;
}
export interface BlogDetailSection {
  recentTitle: string;
  recentSlugs: string[];
}
export interface FAQSection {
  heading: Heading;
  image: ImageAsset;
  support: { title: string; description: string; button: ButtonLink };
  items: { id: string; question: string; answer: string }[];
}
export type FormFieldName =
  | "fullName"
  | "email"
  | "phone"
  | "birthDate"
  | "course"
  | "department"
  | "message";
export type FormValues = Record<FormFieldName, string>;
export interface FormSectionConfig {
  title: string;
  highlight: string;
  description: string;
  submitLabel: string;
  fields: FormFieldName[];
}
export interface ContactSection {
  heading: Heading;
  form: FormSectionConfig;
  information: {
    icon: string;
    title: string;
    lines: string[];
    href?: string;
  }[];
  image: ImageAsset;
  socialTitle: string;
  socials: SocialLink[];
  map: { embedUrl: string; title: string; notice: string };
}
export interface ApplicationSection {
  heading: Heading;
  form: FormSectionConfig;
  promo: {
    heading: Heading;
    image: ImageAsset;
    description: string;
    benefits: string[];
  };
  help: {
    icon: string;
    title: string;
    description: string;
    value: string;
    href: string;
  }[];
}
export interface ApplicationProcessSection {
  heading: Heading;
  steps: { title: string; description: string; icon: string }[];
}
export interface FacultyEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface FacultyExperience {
  position: string;
  institution: string;
  year: string;
}

export interface FacultyContact {
  phone: string;
  email: string;
  office: string;
}

export interface FacultySocial {
  platform: string;
  href: string;
}

export interface FacultyDetailSection {
  profileEyebrow?: string;
  contactTitle?: string;
  subjectsTitle?: string;
  aboutTitle?: string;
  educationTitle?: string;
  experienceTitle?: string;
}

export type SectionData =
  | TopbarSection
  | HeaderSection
  | FooterSection
  | HeroSection
  | AboutSection
  | PopularCoursesSection
  | AdmissionCTASection
  | FacultyPreviewSection
  | FacultyDetailSection
  | TestimonialsSection
  | LatestBlogsSection
  | BannerSection
  | ListingSection
  | CourseDetailSection
  | BlogDetailSection
  | FAQSection
  | ContactSection
  | ApplicationSection
  | ApplicationProcessSection;
export interface CourseMeta {
  cost: string;
  instructor: string;
  duration: string;
  students: string;
  views: string;
  lessons: string;
  language: string;
  certificate: string;
}
export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  duration: string;
  eligibility: string;
  image: ImageAsset;
  mainImage: ImageAsset;
  previewImage: ImageAsset;
  updated: string;
  overview: string[];
  outcomes: string[];
  meta: CourseMeta;
  videoUrl: string | null;
}
export interface Faculty {
  id: string;
  slug: string;
  name: string;
  role: string;
  department: string;
  image: ImageAsset;
  shortBio?: string;
  about?: string[];
  contact?: FacultyContact;
  socials?: FacultySocial[];
  education?: FacultyEducation[];
  experience?: FacultyExperience[];
  subjects?: string[];
}
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  course: string;
  image: ImageAsset;
}
export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; author: string; role: string }
  | { type: "image"; image: ImageAsset }
  | { type: "list"; items: string[] };
export interface Blog {
  id: string;
  slug: string;
  title: string;
  highlight?: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: ImageAsset;
  blocks: BlogBlock[];
}
export interface Department {
  id: string;
  label: string;
}
export interface FormFieldDefinition {
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "date" | "select" | "textarea";
  required: boolean;
}
export interface FormUI {
  timeZone: string;
  fields: Record<FormFieldName, FormFieldDefinition>;
  validation: {
    required: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    birthDateFuture: string;
    course: string;
    department: string;
    message: string;
    invalidOption: string;
    maxLength: string;
    invalidPayload: string;
    tooLarge: string;
  };
  status: {
    submitting: string;
    contactValidated: string;
    applicationValidated: string;
    contactDelivered: string;
    applicationDelivered: string;
    error: string;
    invalid: string;
    invalidJson: string;
    unavailable: string;
    network: string;
    tooLarge: string;
    validationOnlyNotice: string;
    deliveryFailed: string;
    invalidOrigin: string;
    invalidContentType: string;
  };
  notice: string;
  optionalLabel: string;
  requiredLabel: string;
}
export interface UIContent {
  previous: string;
  next: string;
  goToPage: string;
  goToSlide: string;
  openMenu: string;
  closeMenu: string;
  scrollToTop: string;
  viewDetails: string;
  readMore: string;
  duration: string;
  eligibility: string;
  by: string;
  lastUpdated: string;
  home: string;
  videoPreview: string;
  videoUnavailable: string;
  closeVideo: string;
  coursesNavigation: string;
  facultyNavigation: string;
  blogsNavigation: string;
  testimonialNavigation: string;
  paginationLabel: string;
  noResults: string;
  notFoundTitle: string;
  notFoundDescription: string;
  backHome: string;
  coursesBack: string;
  blogBack: string;
  skipToContent: string;
  demoNotice: string;
  contentNotice: string;
  metaLabels: Record<keyof CourseMeta, string>;
  forms: FormUI;
}
export interface EducationContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
    logo: ImageAsset;
    email: string;
    phone: string;
    address: string;
    admissionsEmail: string;
  };
  ui: UIContent;
  templateComponents: Record<
    string,
    { shared: Record<string, string>; pages: Record<PageId, PageConfiguration> }
  >;
  sections: Record<string, { variants: Record<string, SectionData> }>;
  collections: {
    courses: Course[];
    faculty: Faculty[];
    blogs: Blog[];
    testimonials: Testimonial[];
    departments: Department[];
  };
}
