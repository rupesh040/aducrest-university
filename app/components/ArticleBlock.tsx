import { GraduationCap, Quote } from 'lucide-react';
import { Photo, CheckList } from './Primitives';
import type { BlogBlock } from '@/app/data/types';

export function ArticleBlock({block}:{block:BlogBlock}){switch(block.type){case 'paragraph':return <p>{block.text}</p>;case 'heading':return <h2 className="article-subheading">{block.text}</h2>;case 'quote':return <figure className="quote-card"><Quote size={43} fill="currentColor"/><div><blockquote>{block.text}</blockquote><figcaption>{block.author}<span>{block.role}</span></figcaption></div><GraduationCap className="quote-cap" size={76}/></figure>;case 'image':return <Photo asset={block.image} className="article-image"/>;case 'list':return <CheckList items={block.items}/>;}}
