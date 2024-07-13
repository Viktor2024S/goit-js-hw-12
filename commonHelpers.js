import{a as y,S as p,i}from"./assets/vendor-7439763b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const g="44806240-6b3f320b71171cc3cb97c5da2",L="https://pixabay.com/api/";async function m(r,t=1,a=15){const n={key:g,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:a},e=await y.get(L,{params:n});if(e.status!==200)throw new Error("Network response was not ok");return e.data}function h(r,t){const a=r.map(e=>`
    <div class="gallery-item">
      <a href="${e.largeImageURL}" class="gallery-link">
        <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p>Likes: ${e.likes}</p>
        <p>Views: ${e.views}</p>
        <p>Comments: ${e.comments}</p>
        <p>Downloads: ${e.downloads}</p>
      </div>
    </div>
  `).join("");t.insertAdjacentHTML("beforeend",a),new p(".gallery a",{}).refresh()}const w=document.querySelector("#search-form"),f=document.querySelector("#gallery"),d=document.querySelector("#loader"),o=document.createElement("button");o.textContent="Load more";o.classList.add("load-more");o.classList.add("hidden");document.body.appendChild(o);let c="",l=1;async function b(r){if(r.preventDefault(),c=r.target.elements.query.value.trim(),!c){i.error({title:"Error",message:"Search query cannot be empty!"});return}l=1,d.classList.remove("hidden"),f.innerHTML="",o.classList.add("hidden");try{const t=await m(c,l);t.hits.length===0?i.warning({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"}):(h(t.hits,f),t.totalHits>15&&o.classList.remove("hidden"))}catch(t){console.log(t),i.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{d.classList.add("hidden")}}async function v(){l+=1,d.classList.remove("hidden"),o.classList.add("hidden");try{const r=await m(c,l);h(r.hits,f),l*15>=r.totalHits?(o.classList.add("hidden"),i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):o.classList.remove("hidden")}catch(r){console.log(r),i.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{d.classList.add("hidden")}}w.addEventListener("submit",b);o.addEventListener("click",v);
//# sourceMappingURL=commonHelpers.js.map
