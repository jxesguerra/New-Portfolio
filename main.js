/* VANILLA JAVASCRIPT — content rendering, accessibility, and frame-budgeted animation. */
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = matchMedia('(max-width: 700px)').matches;
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = value => { try { const u = new URL(value); return ['https:','http:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
let toastTimer;
function notify(text){ $('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),4000); }
$$('[data-name]').forEach(el=>el.textContent=CONTENT.name);
$('#bio').textContent=CONTENT.bio;$('#location').textContent=CONTENT.location;$('#school').textContent=CONTENT.school;$('#year').textContent=new Date().getFullYear();
document.title=`${CONTENT.name} — Sunset Bahay Kubo, 2099`;
function wireSocial(type,link){$$('.social-'+type).forEach(a=>{const url=type==='email' ? (link ? 'mailto:'+link : '') : safeURL(link);if(url){a.href=url;if(type!=='email'){a.target='_blank';a.rel='noopener noreferrer';}}else{a.addEventListener('click',e=>{e.preventDefault();notify(`Add your ${type==='email'?'email address':type==='github'?'GitHub link':'LinkedIn link'} in the content block to connect this button.`);});}});}
wireSocial('github',CONTENT.github);wireSocial('linkedin',CONTENT.linkedin);wireSocial('email',CONTENT.email);
// Accessible text is complete from the first frame; animation is visual only.
$('#typed-tagline').setAttribute('aria-label',CONTENT.tagline);
if(reduced){$('#typed-tagline').textContent=CONTENT.tagline;}else{let i=0;const typing=setInterval(()=>{$('#typed-tagline').textContent=CONTENT.tagline.slice(0,++i);if(i>=CONTENT.tagline.length)clearInterval(typing);},38);}
// Optional supplied images replace only the scene. SVG remains the fallback.
Object.entries(CONTENT.images).forEach(([key,src])=>{if(!src)return;const container=$('#'+key+'-scene');if(!container)return;const image=new Image();image.className='scene-photo';image.alt='';image.onload=()=>{container.replaceChildren(image);};image.src=src;});
// Face photo: a supplied portrait replaces the illustrated placeholder in the introduction.
const portraitFrame=$('#portrait-frame');
if(portraitFrame&&CONTENT.images.portrait){const image=new Image();image.className='portrait-photo';image.alt=`Portrait of ${CONTENT.name}`;image.onload=()=>portraitFrame.replaceChildren(image);image.onerror=()=>notify('Your portrait photo could not be loaded. Check the filename in the content block.');image.src=CONTENT.images.portrait;}
CONTENT.skills.forEach((group,gi)=>{const el=document.createElement('div');el.className='stack-group reveal';el.innerHTML=`<h3 class="category">${String(gi+1).padStart(2,'0')} / ${esc(group.category)}</h3><div class="skills">${group.items.map((skill,si)=>`<div class="skill-wrap"><button type="button" class="skill" aria-describedby="tip-${gi}-${si}"><span class="skill-mark" aria-hidden="true">${esc(skill.mark)}</span><span class="skill-name">${esc(skill.name)}</span></button><span class="skill-tip glass" role="tooltip" id="tip-${gi}-${si}">${esc(skill.use)}</span></div>`).join('')}</div>`;$('#stack-groups').append(el);});
// Original miniature project illustrations; use screenshot in CONTENT for your real work.
function projectArt(p){if(p.screenshot)return `<img src="${esc(p.screenshot)}" alt="${esc(p.title)} project screenshot" loading="lazy">`;
const mode=p.art;const color=mode==='market'?'#fcd116':mode==='learning'?'#d89bef':'#5cffc4';
const screens={community:`<rect x="92" y="59" width="153" height="12" rx="2" fill="#5cffc4" opacity=".22"/><rect x="92" y="80" width="93" height="4" fill="#bec3c4" opacity=".5"/><rect x="92" y="102" width="70" height="52" rx="3" fill="#374c4b"/><rect x="170" y="102" width="70" height="52" rx="3" fill="#3c394f"/><path d="M99 142L121 116L151 142" fill="#5cffc4" opacity=".3"/><circle cx="205" cy="122" r="10" fill="#fcd116" opacity=".5"/><path d="M187 146Q205 124 223 146" fill="#b19ea9" opacity=".4"/><rect x="92" y="163" width="147" height="3" fill="#d1c9d1" opacity=".3"/>`,market:`<rect x="135" y="33" width="101" height="159" rx="11" fill="#171b2b" stroke="#a193af"/><rect x="143" y="47" width="85" height="134" rx="5" fill="#302a3c"/><rect x="169" y="39" width="34" height="3" rx="2" fill="#838396"/><text x="151" y="67" fill="#fcd116" font-family="monospace" font-size="9">palengke.</text><rect x="151" y="78" width="69" height="29" rx="4" fill="#fcd116" opacity=".15"/><text x="157" y="96" fill="#fcd116" font-family="monospace" font-size="10">₱ 1,250</text><g stroke="#9cbcb0" opacity=".7"><path d="M167 122H214M167 141H214M167 160H214"/><rect x="152" y="117" width="8" height="8" rx="2"/><rect x="152" y="136" width="8" height="8" rx="2"/><rect x="152" y="155" width="8" height="8" rx="2"/></g>`,learning:`<text x="95" y="74" fill="#d89bef" font-family="monospace" font-size="10">let curiosity = true;</text><text x="95" y="93" fill="#789b9c" font-family="monospace" font-size="9">while (learning) { grow(); }</text><path d="M119 147L154 116L188 147L222 121" stroke="#5cffc4" fill="none" stroke-width="2"/><g fill="#302a43" stroke="#d89bef"><circle cx="119" cy="147" r="9"/><circle cx="154" cy="116" r="9"/><circle cx="188" cy="147" r="9"/><circle cx="222" cy="121" r="9"/></g>`};
return `<svg viewBox="0 0 340 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(p.title)} concept illustration"><defs><pattern id="grid-${esc(mode)}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#b09abb" stroke-opacity=".1"/></pattern></defs><rect width="340" height="220" fill="#272338"/><rect width="340" height="220" fill="url(#grid-${esc(mode)})"/><circle cx="285" cy="37" r="49" fill="${color}" opacity=".04"/><path d="M0 182Q64 149 132 183T340 173M0 202Q80 171 156 202T340 194" fill="none" stroke="${color}" stroke-opacity=".17"/><path d="M22 35H35M22 35V48M315 177H303M315 177V164" stroke="${color}" stroke-opacity=".6"/>${mode==='market'?'':`<rect x="74" y="38" width="188" height="145" rx="5" fill="#191e2a" stroke="#686078"/><path d="M74 52H262" stroke="#686078"/><circle cx="82" cy="45" r="2" fill="#c8283c"/><circle cx="89" cy="45" r="2" fill="#fcd116"/><circle cx="96" cy="45" r="2" fill="#5cffc4"/><path d="M158 183V193M178 183V193M143 193H193" stroke="#807187" stroke-width="3"/>`}${screens[mode]||screens.community}<use href="#palm-trunk" x="267" y="129" width="42" height="91" opacity=".5"/><svg class="palm-top" x="267" y="129" width="42" height="91" opacity=".5" viewBox="0 0 160 300" overflow="visible"><path class="fr" style="--a:5deg;--d:0s" d="M82 95Q14 37 0 107Q35 75 82 95"/><path class="fr" style="--a:7deg;--d:-.8s" d="M82 95Q27 1 11 52Q50 47 82 95"/><path class="fr" style="--a:4deg;--d:-1.6s" d="M82 95Q87 12 131 28Q96 51 82 95"/><path class="fr" style="--a:6deg;--d:-.4s" d="M82 95Q151 48 160 104Q116 74 82 95"/><path class="fr" style="--a:5deg;--d:-1.2s" d="M82 95Q134 99 151 161Q110 117 82 95"/><path class="fr" style="--a:7deg;--d:-2s" d="M82 95Q40 112 17 163Q29 95 82 95"/></svg><text x="23" y="207" fill="#a59aae" font-family="monospace" font-size="6">CONCEPT PREVIEW / ${esc(p.year)}</text></svg>`;
}
CONTENT.projects.forEach((project,index)=>{const card=document.createElement('article');card.className='project-card glass reveal';card.innerHTML=`<div class="project-art">${projectArt(project)}<span class="project-number">${esc(project.year)}</span><button class="btn project-expand" aria-label="View ${esc(project.title)} details" data-open="${index}">${icon('external')}</button></div><div class="project-body"><p class="project-kind">${esc(project.kind)}</p><h3 class="project-title">${esc(project.title)}</h3><p class="project-desc">${esc(project.description)}</p><div class="tags">${project.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><div class="project-links"><button class="text-link" data-open="${index}">View project ${icon('arrow')}</button><a href="${safeURL(project.repo)||'#projects'}" class="text-link repo" data-repo="${index}">${icon('github')}Source code</a></div></div>`;$('#project-grid').append(card);});
let lastTrigger;const modal=$('#project-modal');
$$('[data-open]').forEach(b=>b.addEventListener('click',()=>{const p=CONTENT.projects[Number(b.dataset.open)];if(!p)return;lastTrigger=b;$('#modal-title').textContent=p.title;$('#modal-kind').textContent=p.kind;$('#modal-details').textContent=p.details;$('#modal-art').innerHTML=projectArt(p);$('#modal-tags').innerHTML=p.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('');$('#modal-actions').replaceChildren();[['Live demo',p.demo,'external'],['Source code',p.repo,'github']].forEach(([label,url,ic])=>{const valid=safeURL(url);const a=document.createElement(valid?'a':'button');a.className='btn';a.innerHTML=icon(ic)+esc(label);if(valid){a.href=valid;a.target='_blank';a.rel='noopener noreferrer';}else{a.addEventListener('click',()=>notify('This is a sample project. Add your real project link in the content block.'));}$('#modal-actions').append(a);});modal.showModal();document.body.style.overflow='hidden';}));
function closeModal(){modal.close();document.body.style.overflow='';lastTrigger?.focus();}
$('.modal-close').addEventListener('click',closeModal);modal.addEventListener('cancel',e=>{e.preventDefault();closeModal();});modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();}});
$$('[data-repo]').forEach(a=>{const p=CONTENT.projects[Number(a.dataset.repo)];if(safeURL(p.repo)){a.target='_blank';a.rel='noopener noreferrer';}else a.addEventListener('click',e=>{e.preventDefault();notify('Add your project repository link in the content block.');});});
// A self-contained file cannot deliver email: be honest about the hand-off.
$('#contact-form').addEventListener('submit',e=>{e.preventDefault();const feedback=$('#form-feedback');feedback.hidden=false;if(!CONTENT.email){feedback.textContent='Your message is ready, but this sample portfolio needs an owner email address before it can be sent.';return;}const data=new FormData(e.currentTarget);const body=`Kumusta ${CONTENT.name}!\n\n${data.get('message')}\n\nFrom: ${data.get('name')}\nReply to: ${data.get('email')}`;window.location.href=`mailto:${CONTENT.email}?subject=${encodeURIComponent(String(data.get('subject')))}&body=${encodeURIComponent(body)}`;feedback.textContent='Salamat! Your email draft is ready. Please finish sending it in your email app.';});
$('.menu-toggle').addEventListener('click',()=>{const open=$('#nav-links').classList.toggle('open');$('.menu-toggle').setAttribute('aria-expanded',String(open));$('.menu-toggle').setAttribute('aria-label',open?'Close navigation':'Open navigation');});
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>{$('#nav-links').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');$('.menu-toggle').setAttribute('aria-label','Open navigation');}));
$('#logo').addEventListener('click',()=>{const lit=$('.floating-parol').classList.toggle('lit');notify(lit?'A little light from home. Maligayang pagdating!':'The parol is resting. Click again to light it.');});
const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.08});$$('.reveal').forEach(el=>revealObserver.observe(el));
// One rAF per scheduled pointer/scroll frame; no perpetual full-page render loop.
let scheduled=false,scrollY=window.scrollY,px=0,py=0,cx=0,cy=0;
function frame(){scheduled=false;const max=document.documentElement.scrollHeight-innerHeight;const progress=max>0?Math.min(1,scrollY/max):0;document.documentElement.style.setProperty('--night',progress.toFixed(3));if(!reduced&&!mobile){document.documentElement.style.setProperty('--parallax-x',px+'px');document.documentElement.style.setProperty('--parallax-y',py+'px');$('.cursor').style.transform=`translate(${cx-8}px,${cy-8}px)`;$('.cursor-dot').style.transform=`translate(${cx-1.5}px,${cy-1.5}px)`;}
const sections=$$('main>section');let active=sections[0]?.id;sections.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)active=s.id;});$$('.nav-links a').forEach(a=>{const yes=a.hash==='#'+active;a.classList.toggle('active',yes);if(yes)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(frame);}}
addEventListener('scroll',()=>{scrollY=window.scrollY;schedule();},{passive:true});addEventListener('resize',schedule,{passive:true});
if(!reduced&&!mobile){addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;cx=e.clientX;cy=e.clientY;px=(cx/innerWidth-.5)*-12;py=(cy/innerHeight-.5)*-8;$('.cursor').style.opacity='.8';$('.cursor-dot').style.opacity='1';schedule();},{passive:true});document.addEventListener('pointerleave',()=>{$('.cursor').style.opacity='0';$('.cursor-dot').style.opacity='0';});$$('.glass,.btn').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');if(el.classList.contains('project-card')){el.style.transform=`perspective(900px) rotateX(${((e.clientY-r.top)/r.height-.5)*-5}deg) rotateY(${((e.clientX-r.left)/r.width-.5)*6}deg)`;}});el.addEventListener('pointerleave',()=>{if(el.classList.contains('project-card'))el.style.transform='';});});}
// Deterministic particle placements keep the visual stable and reduce mobile count.
$$('.section').forEach((s,index)=>{for(let i=0;i<(mobile?6:17);i++){const dot=document.createElement('i');dot.className='firefly';dot.setAttribute('aria-hidden','true');dot.style.left=((i*37+index*13)%94+3)+'%';dot.style.top=((i*23+17)%65+25)+'%';dot.style.animationDelay=-(i%7)+'s';s.append(dot);}if(index===0&&!reduced){for(let i=0;i<(mobile?3:7);i++){const petal=document.createElement('i');petal.className='petal';petal.setAttribute('aria-hidden','true');petal.style.left=(15+i*12)+'%';petal.style.top=(30+i*4)+'%';petal.style.animationDelay=(-i*3)+'s';s.append(petal);}}});
setTimeout(()=>$('.boot').classList.add('done'),reduced?0:950);schedule();

/* CINEMATIC 3D LAYER — light layers, holo shards, pointer depth, scroll camera. */
(function(){
'use strict';
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer: fine)').matches&&!matchMedia('(max-width: 700px)').matches;
const root=document.documentElement;
const hero=document.querySelector('#intro');
function layer(parent,cls,html){const d=document.createElement('div');d.className='cine-layer '+cls;d.setAttribute('aria-hidden','true');if(html)d.innerHTML=html;parent.append(d);return d;}
// Cinematic vignette over the whole page
const vig=document.createElement('div');vig.className='cine-vignette';vig.setAttribute('aria-hidden','true');document.body.append(vig);
// Hero: god rays, lens flare, fog, holo shards
const shards=[];
if(hero){
  
  [{t:'SYS.NODE_01',s:'● ONLINE // PH-MNL',pos:'right:3%;top:15%',d:26,delay:0},{t:'LATENCY',s:'12 ms · STABLE',pos:'right:7%;top:77%',d:18,delay:-2.4},{t:'MABUHAY.EXE',s:'RUNNING WITH PUSO',pos:'left:56%;top:31%',d:34,delay:-4.6}].forEach(c=>{
    const el=document.createElement('div');el.className='shard';el.setAttribute('aria-hidden','true');el.style.cssText=c.pos+';animation-delay:'+c.delay+'s';el.dataset.depth=c.d;
    el.innerHTML='<div class="shard-face">'+c.t+'<b>'+c.s+'</b></div>';hero.append(el);shards.push(el);
  });
}
// Fireflies: seeded randomness keeps the layout stable between loads
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
const mobileView=matchMedia('(max-width: 700px)').matches;
$$('main>section').forEach((sec,idx)=>{
  const count=idx===0?(mobileView?12:30):(mobileView?6:16);
  for(let i=0;i<count;i++){
    const f=document.createElement('i');f.className='fly';f.setAttribute('aria-hidden','true');
    const big=rnd()>.8;const st=f.style;
    st.left=(rnd()*96+2).toFixed(1)+'%';st.top=(18+rnd()*78).toFixed(1)+'%';
    st.setProperty('--s',(big?6.5:3+rnd()*2.5).toFixed(1)+'px');
    st.setProperty('--t',(11+rnd()*14).toFixed(1)+'s');st.setProperty('--b',(2.4+rnd()*3.2).toFixed(1)+'s');
    st.setProperty('--d',(-rnd()*14).toFixed(1)+'s');
    for(let k=1;k<=4;k++){st.setProperty('--x'+k,((rnd()-.5)*140).toFixed(0)+'px');st.setProperty('--y'+k,((rnd()-.6)*110).toFixed(0)+'px');}
    sec.append(f);
  }
});
// Holographic perspective floor in the lower sections
['#stack','#projects','#contact'].forEach((sel,i)=>{const s=document.querySelector(sel);if(s)layer(s,'holo-grid'+(i===1?' violet':''));});
// Pointer-driven depth (mouse only, never in reduced motion)
if(!reduced&&fine){
  const portrait=$$('.hero-portrait')[0];let tx=0,ty=0,raf=0;
  const apply=()=>{raf=0;shards.forEach(s=>{const d=Number(s.dataset.depth);s.style.transform='translate3d('+(tx*d).toFixed(1)+'px,'+(ty*d).toFixed(1)+'px,0)';});
    if(portrait){portrait.style.transform='perspective(900px) rotateY('+(tx*14).toFixed(2)+'deg) rotateX('+(-ty*10).toFixed(2)+'deg)';portrait.style.setProperty('--shine',((tx+.5)*100).toFixed(1)+'%');}};
  if(hero){
    hero.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;if(!raf)raf=requestAnimationFrame(apply);},{passive:true});
    hero.addEventListener('pointerleave',()=>{tx=0;ty=0;if(!raf)raf=requestAnimationFrame(apply);});
  }
  $$('.skill').forEach(el=>{
    el.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform='perspective(380px) translateY(-7px) rotateX('+(-y*28).toFixed(1)+'deg) rotateY('+(x*28).toFixed(1)+'deg)';});
    el.addEventListener('pointerleave',()=>{el.style.transform='';});
  });
  $$('.project-card').forEach(card=>{
    card.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=card.getBoundingClientRect();card.style.setProperty('--tx',(((e.clientX-r.left)/r.width-.5)*2).toFixed(3));card.style.setProperty('--ty',(((e.clientY-r.top)/r.height-.5)*2).toFixed(3));});
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--tx',0);card.style.setProperty('--ty',0);});
  });
}
// Scroll camera: hero dolly + fade, and gentle depth drift on every other scene
if(!reduced){
  const sections=$$('main>section:not(.hero)');let queued=false;
  const update=()=>{queued=false;const h=hero?hero.offsetHeight:800;const p=Math.min(1,window.scrollY/(h*.85));
    root.style.setProperty('--hero-p',p.toFixed(3));root.style.setProperty('--dolly',(1+p*.1).toFixed(3));
    sections.forEach(s=>{const r=s.getBoundingClientRect();if(r.bottom<-200||r.top>innerHeight+200)return;s.style.setProperty('--sy',(((r.top+r.height/2)-innerHeight/2)/innerHeight*-24).toFixed(1));});};
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});
  addEventListener('resize',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});
  update();
}
})();

/* ADDITIONS: silhouettes with swaying leaves in every section + certificates */
(function(){
const fig=(id,w,h,x)=>`<use class="fig" href="#${id}" x="${x}" y="${214-h}" width="${w}" height="${h}"/>`;
const LEAVES=[['l','M60 150C40 150 18 138 6 118C30 116 52 128 60 150Z'],['r','M60 150C80 150 102 138 114 118C90 116 68 128 60 150Z'],['l','M60 112C44 110 26 98 16 80C38 80 54 92 60 112Z'],['r','M60 112C76 110 94 98 104 80C82 80 66 92 60 112Z'],['l','M61 74C48 70 36 58 30 42C48 44 58 56 61 74Z'],['r','M61 74C74 70 86 58 92 42C74 44 64 56 61 74Z'],['t','M62 36C56 28 56 16 62 4C68 16 68 28 62 36Z']];
let fd=0;const frond=(x,y,w)=>`<g class="plant" transform="translate(${x} ${y}) scale(${(w/120).toFixed(3)})"><path class="stem" d="M60 160Q57 90 62 8"/>${LEAVES.map(l=>`<path class="lf ${l[0]}" style="--d:${(-(fd++%9)*.37).toFixed(2)}s" d="${l[1]}"/>`).join('')}</g>`;
const group=kind=>`<svg class="sil-fig" viewBox="0 0 230 220" focusable="false"><ellipse class="sil-ground" cx="112" cy="214" rx="78" ry="6"/>${frond(-4,121,70)}${kind==='human'?fig('human',68,170,76):fig('robot',77,171,72)}${frond(146,104,82)}${frond(128,150,46)}${frond(58,172,34)}</svg>`;
document.querySelectorAll('main>section').forEach((s,i)=>{const d=document.createElement('div');d.className='sil'+(i===0?' hero-sil':'');d.setAttribute('aria-hidden','true');const o=i%2?['robot','human']:['human','robot'];d.innerHTML=group(o[0])+group(o[1]);s.append(d);});
const cs=document.querySelector('#certificates');if(cs){const g=document.createElement('div');g.className='cine-layer holo-grid';g.setAttribute('aria-hidden','true');cs.append(g);}
function certArt(c){if(c.image)return `<img src="${esc(c.image)}" alt="${esc(c.title)} certificate" loading="lazy">`;return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Certificate placeholder"><rect width="400" height="300" fill="#272338"/><rect x="18" y="18" width="364" height="264" rx="4" fill="#191e2a" stroke="#fcd116" stroke-opacity=".7"/><rect x="28" y="28" width="344" height="244" fill="none" stroke="#5cffc4" stroke-opacity=".35" stroke-dasharray="4 4"/><text x="200" y="74" text-anchor="middle" fill="#fcd116" font-family="monospace" font-size="16" letter-spacing="4">CERTIFICATE</text><text x="200" y="96" text-anchor="middle" fill="#a59aae" font-family="monospace" font-size="9" letter-spacing="2">OF ACHIEVEMENT</text><text x="200" y="136" text-anchor="middle" fill="#5cffc4" font-family="monospace" font-size="10" letter-spacing="2">YOUR CERTIFICATE HERE</text><path d="M110 164H290M140 186H260" stroke="#b09abb" stroke-opacity=".4" stroke-width="3"/><circle cx="200" cy="238" r="20" fill="#fcd116" opacity=".85"/><circle cx="200" cy="238" r="13" fill="none" stroke="#191e2a" stroke-width="2"/></svg>`;}
const grid=document.querySelector('#cert-grid');const certs=CONTENT.certificates||[];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.08});
certs.forEach((c,i)=>{const v=safeURL(c.link);const card=document.createElement('article');card.className='cert-card glass reveal';card.innerHTML=`<button type="button" class="cert-art" data-cert="${i}" aria-label="View ${esc(c.title)}">${certArt(c)}<span class="project-number">${esc(c.date)}</span></button><div class="project-body"><p class="project-kind">${esc(c.issuer)}</p><h3 class="project-title">${esc(c.title)}</h3>${c.credential?`<p class="project-desc" style="min-height:0">Credential ID: ${esc(c.credential)}</p>`:''}<div class="project-links" style="margin-top:18px"><button type="button" class="text-link" data-cert="${i}">View certificate ${icon('arrow')}</button>${v?`<a class="text-link repo" href="${v}" target="_blank" rel="noopener noreferrer">${icon('external')}Verify</a>`:''}</div></div>`;grid.append(card);io.observe(card);});
const m=document.getElementById('project-modal'),art=document.getElementById('modal-art');
grid.addEventListener('click',e=>{const b=e.target.closest('[data-cert]');if(!b)return;const c=certs[Number(b.dataset.cert)];if(!c)return;lastTrigger=b;
document.getElementById('modal-kind').textContent=c.issuer;document.getElementById('modal-title').textContent=c.title;document.getElementById('modal-details').textContent=`Issued ${c.date}${c.credential?' · Credential ID '+c.credential:''}`;
art.classList.add('cert');art.innerHTML=certArt(c);document.getElementById('modal-tags').replaceChildren();const acts=document.getElementById('modal-actions');acts.replaceChildren();const v=safeURL(c.link);
if(v){const a=document.createElement('a');a.className='btn';a.href=v;a.target='_blank';a.rel='noopener noreferrer';a.innerHTML=icon('external')+'Verify credential';acts.append(a);}
m.showModal();document.body.style.overflow='hidden';});
m.addEventListener('close',()=>art.classList.remove('cert'));
})();

/* ROUND 2: theme toggle + cursor pets (firefly at night, hummingbird by day) */
(function(){
const root=document.documentElement,tg=document.getElementById('theme-toggle');
const setTheme=t=>{if(t==='light')root.setAttribute('data-theme','light');else root.removeAttribute('data-theme');tg.textContent=t==='light'?'☾':'☀';tg.setAttribute('aria-label',t==='light'?'Switch to night mode':'Switch to light mode');};
let saved=null;try{saved=localStorage.getItem('theme');}catch(e){}
setTheme(saved==='light'?'light':'dark');
tg.addEventListener('click',()=>{const n=root.dataset.theme==='light'?'dark':'light';setTheme(n);try{localStorage.setItem('theme',n);}catch(e){}});
if(matchMedia('(prefers-reduced-motion: reduce)').matches||!matchMedia('(pointer: fine)').matches||matchMedia('(max-width: 700px)').matches)return;
const box=document.createElement('div');box.className='pets';box.setAttribute('aria-hidden','true');
let h='';for(let i=0;i<6;i++)h+=`<i class="pet ff${i?'':' hd'}" style="--s:${10-i*1.2}px;opacity:${1-i*.15}"></i>`;
h+=`<div class="pet bird"><svg viewBox="0 0 80 60"><g class="bird-in"><path d="M22 30Q8 30 2 44Q14 44 26 38Z" fill="#1f7a55"/><path d="M24 34Q12 38 8 50Q20 46 28 40Z" fill="#2b9467"/><g class="wing w2"><path d="M28 30C18 14 30 0 50 2C48 12 42 24 32 32Z" fill="#1e8560"/></g><ellipse cx="36" cy="32" rx="20" ry="14" fill="#2fa66f"/><ellipse cx="38" cy="38" rx="14" ry="8" fill="#e8f7ee"/><circle cx="56" cy="24" r="11" fill="#3cc085"/><ellipse cx="57" cy="32" rx="6" ry="4" fill="#e23b5e"/><path d="M65 23L77 26L65 29Z" fill="#f0a030"/><circle cx="58" cy="21" r="3.2" fill="#fff"/><circle cx="59" cy="21" r="1.8" fill="#10151f"/><g class="wing"><path d="M30 31C20 14 32 -1 54 2C52 14 44 26 34 33Z" fill="#35b583"/><path d="M36 26L50 8M33 29L44 16" stroke="#a8f0cf" stroke-width="1.6" stroke-linecap="round" fill="none"/></g></g></svg></div>`;
box.innerHTML=h;document.body.append(box);
const ffs=[...box.querySelectorAll('.ff')],bird=box.querySelector('.bird');
let tx=0,ty=0,flip=1,first=true;const P=ffs.map(()=>({x:0,y:0}));
function draw(){ffs.forEach((f,i)=>f.style.transform=`translate(${P[i].x}px,${P[i].y}px)`);bird.style.transform=`translate(${P[0].x}px,${P[0].y}px) scaleX(${flip})`;}
function tick(){let mv=false;P.forEach((p,i)=>{const g=i?P[i-1]:{x:tx,y:ty},k=i?.42:.14,dx=g.x-p.x,dy=g.y-p.y;if(Math.abs(dx)+Math.abs(dy)>.4){mv=true;p.x+=dx*k;p.y+=dy*k;if(!i&&Math.abs(dx)>3)flip=dx<0?-1:1;}});draw();if(mv)requestAnimationFrame(tick);}
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const o=root.dataset.theme==='light'?[18,-16]:[10,10];tx=e.clientX+o[0];ty=e.clientY+o[1];if(first){P.forEach(p=>{p.x=tx;p.y=ty;});first=false;}box.classList.add('on');requestAnimationFrame(tick);},{passive:true});
document.addEventListener('pointerleave',()=>box.classList.remove('on'));
})();

document.querySelectorAll('main>section').forEach(s=>{const f=document.createElement('div');f.className='fog';f.setAttribute('aria-hidden','true');s.append(f);});
