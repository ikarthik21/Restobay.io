(()=>{var e=document.getElementById("north"),t=document.getElementById("south"),o=document.getElementById("desserts"),n=document.getElementById("north-bt"),l=document.getElementById("south-bt"),d=document.getElementById("desserts-bt"),s=document.getElementById("all-bt");s.addEventListener("click",(function(){t.style.display="block",e.style.display="block",o.style.display="block",s.style.borderBottom="4px solid #ef5644",n.style.borderBottom="none",l.style.borderBottom="none",d.style.borderBottom="none"})),n.addEventListener("click",(function(){t.style.display="none",e.style.display="block",o.style.display="none",n.style.borderBottom=" 4px solid #ef5644",l.style.borderBottom="none",d.style.borderBottom="none",s.style.borderBottom="none"})),l.addEventListener("click",(function(){t.style.display="block",e.style.display="none",o.style.display="none",l.style.borderBottom=" 4px solid #ef5644",n.style.borderBottom="none",d.style.borderBottom="none",s.style.borderBottom="none"})),d.addEventListener("click",(function(){t.style.display="none",e.style.display="none",o.style.display="block",d.style.borderBottom="4px solid #ef5644",n.style.borderBottom="none",s.style.borderBottom="none",l.style.borderBottom="none"}))})();