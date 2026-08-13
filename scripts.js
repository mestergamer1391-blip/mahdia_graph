// نمایش تدریجی نمونه‌کارها
const cards=document.querySelectorAll('.card');
const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')})
},{threshold:.1});
cards.forEach((c,i)=>{c.style.transitionDelay=(i*.06)+'s';observer.observe(c)});

// کپی لینک سایت
document.getElementById('copyBtn').addEventListener('click',async()=>{
 const text=document.getElementById('siteLink').textContent.trim();
 try{await navigator.clipboard.writeText(text)}
 catch{const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
 const label=document.getElementById('copyText');label.textContent='کپی شد ✓';
 setTimeout(()=>label.textContent='کپی لینک',1600);
});

// DNA متحرک پس‌زمینه؛ با اسکرول حرکت آن نیز تغییر می‌کند
const canvas=document.getElementById('dna-bg'),ctx=canvas.getContext('2d');
let w,h,dpr=1,scrollY=0;
function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0)}
resize();addEventListener('resize',resize);addEventListener('scroll',()=>scrollY=scrollY*0.85+window.scrollY*0.15,{passive:true});
function drawDNA(time){
 ctx.clearRect(0,0,w,h);
 const cols=w<600?1:2;
 for(let c=0;c<cols;c++){
  const cx=cols===1?w*.5:w*(.25+c*.5);
  const base=scrollY*.14+c*2;
  for(let j=0;j<2;j++){
   ctx.beginPath();
   for(let y=-30;y<h+40;y+=5){
    const yy=y+base, phase=yy*.022+time*.0012+c;
    const x=cx+Math.sin(phase)*55*(j?1:-1);
    j?ctx.lineTo(x,yy):ctx.lineTo(x,yy);
   }
   ctx.strokeStyle='#d4af37';ctx.globalAlpha=.10;ctx.lineWidth=1.2;ctx.stroke();
  }
  for(let y=10;y<h;y+=24){
   const yy=y+base, phase=yy*.022+time*.0012+c;
   const x1=cx+Math.sin(phase)*55, x2=cx-Math.sin(phase)*55;
   ctx.beginPath();ctx.moveTo(x1,yy);ctx.lineTo(x2,yy);
   ctx.strokeStyle='#d4af37';ctx.globalAlpha=.09;ctx.stroke();
   ctx.beginPath();ctx.arc(x1,yy,2,0,Math.PI*2);ctx.fillStyle='#d4af37';ctx.globalAlpha=.18;ctx.fill();
   ctx.beginPath();ctx.arc(x2,yy,2,0,Math.PI*2);ctx.fill();
  }
 }
 requestAnimationFrame(drawDNA);
}
requestAnimationFrame(drawDNA);