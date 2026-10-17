'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { content } from '@/lib/content';
import type { HeaderSection } from '@/types/content';
export function Header({data}:{data:HeaderSection}){const path=usePathname();const [open,setOpen]=useState(false);return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label={content.brand.name} onClick={()=>setOpen(false)}><Image src={data.logo.src} alt={data.logo.alt} width={270} height={90} priority/></Link><button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open?content.ui.closeMenu:content.ui.openMenu} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav id="main-navigation" className={open?'navigation open':'navigation'}>{data.navigation.map(link=><Link key={link.href} href={link.href} className={(link.href==='/'?path==='/':path.startsWith(link.href))?'active':''} onClick={()=>setOpen(false)} aria-current={(link.href==='/'?path==='/':path.startsWith(link.href))?'page':undefined}>{link.label}</Link>)}<Link href={data.apply.href} className="primary-button header-apply" onClick={()=>setOpen(false)}>{data.apply.label}<ArrowRight size={19}/></Link></nav></div></header>;}
