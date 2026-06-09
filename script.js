const hdr=document.getElementById('hdr');
addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>40),{passive:true});

const burger=document.getElementById('burger'),menu=document.getElementById('menu');

function openNav(){
  menu.classList.add('open');
  burger.classList.add('open');
  hdr.classList.add('nav-open');
  document.documentElement.classList.add('nav-open');
  document.body.classList.add('nav-open');
}
function closeNav(){
  menu.classList.remove('open');
  burger.classList.remove('open');
  document.documentElement.classList.remove('nav-open');
  document.body.classList.remove('nav-open');
  setTimeout(()=>hdr.classList.remove('nav-open'),500);
}

burger.addEventListener('click',()=>menu.classList.contains('open')?closeNav():openNav());
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});

const io=new IntersectionObserver((es)=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
}),{threshold:.16,rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=(Math.min(i%6,5)*80)+'ms';io.observe(el);});

document.getElementById('partnerForm').addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.target,note=document.getElementById('formNote'),btn=f.querySelector('button');
  if(!f.checkValidity()){note.textContent='Please complete all fields to continue.';note.style.color='#D8BD7C';return;}
  btn.textContent='Sending…';btn.disabled=true;
  const data=new URLSearchParams(new FormData(f)).toString();
  fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:data})
    .then(r=>{
      if(!r.ok) throw new Error('network');
      btn.textContent='Application Sent';
      note.textContent='Thank you. Your application has reached info@seasonb2b.com — we respond within one business day.';
      note.style.color='#C9A24B';
      f.reset();
    })
    .catch(()=>{
      const v=id=>document.getElementById(id).value;
      const body=`Agency Name: ${v('f_agency')}\nCountry: ${v('f_country')}\nContact Person: ${v('f_person')}\nEmail: ${v('f_email')}\nWhatsApp: ${v('f_wa')}\nAnnual Travel Sales Volume: ${v('f_vol')}`;
      window.location.href='mailto:info@seasonb2b.com?subject='+encodeURIComponent('Partnership Application — '+v('f_agency'))+'&body='+encodeURIComponent(body);
      btn.textContent='Submit Application';btn.disabled=false;
      note.textContent='Opening your email app to send to info@seasonb2b.com…';note.style.color='#D8BD7C';
    });
});
