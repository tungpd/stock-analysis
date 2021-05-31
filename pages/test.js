import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import LayoutArticle from '@/Layout/LayoutArticle';

import Test from '../components/test';

const components = { Test };

export default function TestPage({ source }) {
	return (
		<LayoutArticle>
			<div className="wrapper">
				<MDXRemote {...source} components={components} />
			</div>
		</LayoutArticle>
	);
}

export async function getStaticProps() {
	// MDX text - can be from a local file, database, anywhere
	const source = 'Some **mdx** text, with a component <Test />';
	const mdxSource = await serialize(source);
	return { props: { source: mdxSource } };
}
