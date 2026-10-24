import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';
import { serviceCatalog } from './services';

export const contentSchema = z.object({
  title: z.string().trim().min(5).max(150),
  summary: z.string().trim().min(20).max(320),
  published: z.boolean().default(false),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().startsWith(value), 'Use a valid YYYY-MM-DD date.'),
  author: z.string().trim().min(1).max(100).default('Cryol Technologies'),
  cover: z.string().regex(/^(?:\/uploads\/[^?#\r\n]+\.(?:png|jpe?g|webp|gif|avif))?$/i).refine(v => !v.split('/').includes('..')).optional().default(''),
  coverAlt: z.string().max(200).optional().default(''),
  services: z.array(z.string().refine(slug => serviceCatalog.some(s => s.slug === slug))).max(7).optional().default([]),
  seoTitle: z.string().max(150).optional().default(''),
  seoDescription: z.string().max(320).optional().default(''),
  industry: z.string().max(100).optional().default(''),
  client: z.string().max(150).optional().default(''),
});

export type ContentKind = 'blog' | 'case-studies';
export type ContentEntry = z.infer<typeof contentSchema> & { slug: string; body: string; kind: ContentKind };
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseContent(source: string, slug: string, kind: ContentKind): ContentEntry {
  if (!validSlug.test(slug)) throw new Error('Content filenames must use lowercase words separated by hyphens.');
  const match = source.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Add a YAML header between --- lines.');
  const raw = parse(match[1], { maxAliasCount: 10 });
  // Optional fields cleared in the editor may be represented as YAML null.
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
    for (const key of ['cover', 'coverAlt', 'seoTitle', 'seoDescription', 'industry', 'client']) {
      if (raw[key] === null) raw[key] = '';
    }
    if (raw.services === null) raw.services = [];
  }
  const fields = contentSchema.parse(raw);
  if (!match[2].trim()) throw new Error('Add article content below the header.');
  return { ...fields, slug, kind, body: match[2].trim() };
}

export async function getContent(kind: ContentKind): Promise<ContentEntry[]> {
  const directory = path.join(process.cwd(), 'content', kind);
  const files = await readdir(directory);
  const entries = await Promise.all(files.filter(file => file.endsWith('.md')).map(async file => {
    const source = await readFile(path.join(directory, file), 'utf8');
    try { return parseContent(source, file.slice(0, -3), kind); }
    catch (error) { throw new Error('Invalid content in ' + kind + '/' + file + ': ' + (error instanceof Error ? error.message : 'Check the template.')); }
  }));
  return entries.filter(entry => entry.published).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export async function getContentEntry(kind: ContentKind, slug: string) {
  if (!validSlug.test(slug)) return undefined;
  return (await getContent(kind)).find(entry => entry.slug === slug);
}
