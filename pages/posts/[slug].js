// pages/posts/[slug].js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // For parsing front matter
import { remark } from 'remark';
import html from 'remark-html';

export default function Post({ postData }) {
  return (
    <div>
      <h1>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}

export async function getStaticPaths() {
  // Get the list of all Markdown files in the content directory
  const files = fs.readdirSync(path.join(process.cwd(), 'content'));

  // Generate paths for each file (excluding the file extension)
  const paths = files.map((file) => ({
    params: { slug: file.replace(/\.md$/, '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const fullPath = path.join(process.cwd(), 'content', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse front matter and content using gray-matter
  const { data, content } = matter(fileContents);

  // Use remark to convert Markdown to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      postData: {
        title: data.title,
        contentHtml,
      },
    },
  };
}
