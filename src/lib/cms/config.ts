import { CMS_PATH, type cmsSettings } from './settings';
import { serviceCatalog } from '../services';
type Settings = ReturnType<typeof cmsSettings>;

export function cmsConfig(settings: Settings) {
  const common = [
    { label: 'Title', name: 'title', widget: 'string', pattern: ['^.{5,150}$', 'Use 5–150 characters.'] },
    { label: 'Short summary', name: 'summary', widget: 'text', pattern: ['^[\\s\\S]{20,320}$', 'Use 20–320 characters.'] },
    { label: 'Publish on website', name: 'published', widget: 'boolean', default: false, hint: 'Keep off while drafting. Turn on and save when ready to publish.' },
    { label: 'Date', name: 'date', widget: 'datetime', format: 'YYYY-MM-DD', date_format: 'DD MMM YYYY', time_format: false, picker_utc: true },
    { label: 'Author', name: 'author', widget: 'string', default: 'Cryol Technologies' },
    { label: 'Cover image', name: 'cover', widget: 'image', required: false, hint: 'Upload JPG, PNG, WebP, GIF or AVIF.' },
    { label: 'Image description', name: 'coverAlt', widget: 'string', required: false },
    { label: 'Related services', name: 'services', widget: 'select', multiple: true, required: false, options: serviceCatalog.map(s => ({ label: s.title, value: s.slug })) },
    { label: 'SEO title (optional)', name: 'seoTitle', widget: 'string', required: false, hint: 'Leave blank to use the article title.' },
    { label: 'SEO description (optional)', name: 'seoDescription', widget: 'text', required: false, hint: 'Leave blank to use the summary.' },
    { label: 'Content', name: 'body', widget: 'markdown', hint: 'Use headings, paragraphs, lists and images. The page design is automatic.' },
  ];
  return {
    load_config_file: false,
    backend: {
      name: 'github', repo: settings.repo, branch: settings.branch,
      base_url: settings.origin, auth_endpoint: CMS_PATH + '/auth/authorize',
      site_domain: new URL(settings.origin).host,
    },
    publish_mode: 'simple',
    site_url: settings.origin,
    display_url: settings.origin,
    logo_url: settings.origin + '/assets/img/cryol___logo__white.png',
    media_folder: 'public/uploads', public_folder: '/uploads',
    slug: { encoding: 'ascii', clean_accents: true, sanitize_replacement: '-' },
    collections: [
      { name: 'blog', label: 'Blogs', label_singular: 'Blog post', folder: 'content/blog', extension: 'md', format: 'frontmatter', create: true, slug: '{{slug}}', preview_path: 'blog/{{slug}}', summary: '{{title}} — {{published}}', fields: common },
      { name: 'case-studies', label: 'Case Studies', label_singular: 'Case study', folder: 'content/case-studies', extension: 'md', format: 'frontmatter', create: true, slug: '{{slug}}', preview_path: 'case-studies/{{slug}}', summary: '{{title}} — {{published}}', fields: [
        ...common.slice(0, 5),
        { label: 'Industry', name: 'industry', widget: 'string', required: false },
        { label: 'Client (only with permission)', name: 'client', widget: 'string', required: false },
        ...common.slice(5),
      ] },
    ],
  };
}
