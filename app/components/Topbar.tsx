import { Icon } from './Primitives';
import type { TopbarSection } from '@/app/data/types';

export function Topbar({data}:{data:TopbarSection}){return <div className="topbar"><div className="container topbar-inner"><div className="topbar-contacts">{data.contacts.map(item=><a href={item.href} key={item.label}><Icon name={item.icon} size={17}/><span>{item.label}</span></a>)}</div><div className="topbar-socials">{data.socials.map(s=><a key={s.icon} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer"><Icon name={s.icon} size={15}/></a>)}</div></div></div>;}
