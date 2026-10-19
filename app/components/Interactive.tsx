'use client';
import { Children, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, X, Play } from 'lucide-react';
import { content } from '@/app/data';

export function Carousel({children,columns=4,label,dark=false}:{children:ReactNode;columns?:number;label:string;dark?:boolean}) {
 const track=useRef<HTMLDivElement>(null); const [index,setIndex]=useState(0); const [visible,setVisible]=useState(columns); const items=Children.toArray(children);
 useEffect(()=>{const el=track.current;if(!el)return;const observer=new ResizeObserver(()=>{const child=el.firstElementChild;if(child)setVisible(Math.max(1,Math.round(el.clientWidth/(child.getBoundingClientRect().width+22))));});observer.observe(el);return()=>observer.disconnect();},[]);
 const pages=Math.max(1,Math.ceil(items.length/visible));
 const go=(page:number)=>{const el=track.current;if(!el)return;const target=(page+pages)%pages;const first=el.firstElementChild;const stride=first?(first.getBoundingClientRect().width+parseFloat(getComputedStyle(el).gap))*visible:el.clientWidth;el.scrollTo({left:target*stride,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});setIndex(target);};
 if(!items.length)return null;
 return <div className={`carousel ${dark?'is-dark':''}`} role="region" aria-label={label} aria-roledescription="carousel"><div ref={track} className={`carousel-track columns-${columns}`} onScroll={()=>{const el=track.current;if(el)setIndex(Math.min(pages-1,Math.round(el.scrollLeft/((el.firstElementChild!.getBoundingClientRect().width+parseFloat(getComputedStyle(el).gap))*visible))));}}>{items.map((item,i)=><div className="carousel-slide" key={i}>{item}</div>)}</div>{pages>1&&<div className="carousel-controls"><button type="button" className="circle-control" aria-label={content.ui.previous} onClick={()=>go(index-1)}><ArrowLeft size={18}/></button><div className="carousel-dots">{Array.from({length:pages},(_,i)=><button key={i} type="button" className={i===index?'active':''} aria-label={`${content.ui.goToSlide} ${i+1}`} aria-current={i===index?'true':undefined} onClick={()=>go(i)}/>)}</div><button type="button" className="circle-control" aria-label={content.ui.next} onClick={()=>go(index+1)}><ArrowRight size={18}/></button></div>}</div>;
}
export function PaginatedGrid({children,pageSize,columns=4}:{children:ReactNode;pageSize:number;columns?:number}) {const items=Children.toArray(children);const [page,setPage]=useState(1);const total=Math.max(1,Math.ceil(items.length/pageSize));const start=useRef<HTMLDivElement>(null);const go=(p:number)=>{setPage(p);start.current?.scrollIntoView({block:'start',behavior:'smooth'});};return <div ref={start} className="paginated-grid"><div className={`card-grid grid-${columns}`}>{items.slice((page-1)*pageSize,page*pageSize)}</div>{total>1&&<nav className="pagination" aria-label={content.ui.paginationLabel}><button disabled={page===1} aria-label={content.ui.previous} onClick={()=>go(page-1)}><ArrowLeft size={18}/></button>{Array.from({length:total},(_,i)=><button key={i} aria-label={`${content.ui.goToPage} ${i+1}`} aria-current={page===i+1?'page':undefined} className={page===i+1?'active':''} onClick={()=>go(i+1)}>{i+1}</button>)}<button disabled={page===total} aria-label={content.ui.next} onClick={()=>go(page+1)}><ArrowRight size={18}/></button></nav>}</div>;}
export function ScrollToTop(){return <button type="button" className="scroll-top" aria-label={content.ui.scrollToTop} onClick={()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}><ArrowUp size={22}/></button>;}
export function VideoPreview({url}:{url:string|null}) {
 const [open,setOpen]=useState(false);const close=useRef<HTMLButtonElement>(null);const trigger=useRef<HTMLButtonElement>(null);const dialog=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!open)return;const returnTarget=trigger.current;const originalOverflow=document.body.style.overflow;document.body.style.overflow='hidden';close.current?.focus();
  const handler=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){setOpen(false);return;}
   if(event.key!=='Tab')return;
   const focusable=Array.from(dialog.current?.querySelectorAll<HTMLElement>('button, a[href], video[controls], [tabindex="0"]')??[]);const first=focusable[0];const last=focusable[focusable.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
  };
  window.addEventListener('keydown',handler);return()=>{document.body.style.overflow=originalOverflow;window.removeEventListener('keydown',handler);returnTarget?.focus();};
 },[open]);
 return <><button ref={trigger} type="button" className="play-button" aria-label={content.ui.videoPreview} onClick={()=>setOpen(true)}><Play fill="currentColor"/></button>{open&&<div className="modal-backdrop" onClick={()=>setOpen(false)}><div ref={dialog} className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-title" onClick={event=>event.stopPropagation()}><button ref={close} className="modal-close" type="button" aria-label={content.ui.closeVideo} onClick={()=>setOpen(false)}><X/></button><h2 id="video-title">{content.ui.videoPreview}</h2>{url?<video src={url} controls autoPlay/>:<p>{content.ui.videoUnavailable}</p>}</div></div>}</>;
}
