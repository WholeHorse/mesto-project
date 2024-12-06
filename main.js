(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{xz:()=>M});var t={baseUrl:"https://nomoreparties.co/v1/frontend-st-cohort-201",headers:{authorization:"66609c41-4c09-4cb2-96c3-972ab97a1142","Content-Type":"application/json"}},n=function(e){return e.ok?e.json():(console.error("Ошибка: ".concat(e.status," - ").concat(e.statusText)),Promise.reject("Ошибка: ".concat(e.status)))},r=document.querySelector(".cards-grid"),o=document.querySelector("#card-template").content;function c(e,r){var c=o.querySelector(".place").cloneNode(!0),a=c.querySelector(".place__photo"),u=c.querySelector(".place__like-button"),i=c.querySelector(".place__like-counter");return r._id===e.owner._id?c.querySelector(".place__delete-button").addEventListener("click",(function(r){!function(e,r){(function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then(n)})(r).then((function(){e.target.closest(".place").remove()})).catch((function(e){return console.error("Ошибка при удалении карточки: ".concat(e))}))}(r,e._id)})):c.querySelector(".place__delete-button").remove(),i.textContent=e.likes.length,c.querySelector(".place__name").textContent=e.name,a.src=e.link,a.alt=e.name,a.addEventListener("click",(function(){M(e.link,e.name)})),u.addEventListener("click",(function(r){!function(e,r,o){var c=e.target,a=c.classList.contains("place__like-button_active")?function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then(n)}(r):function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then(n)}(r);a.then((function(e){!function(e,t){t.textContent=e.likes.length}(e,o),c.classList.toggle("place__like-button_active")})).catch((function(e){return console.error("Ошибка при обработке лайка: ".concat(e))}))}(r,e._id,i)})),e.likes.some((function(e){return e._id===r._id}))&&u.classList.add("place__like-button_active"),c}function a(e){r.prepend(e)}function u(e){"Escape"===e.key&&i(document.querySelector(".popup_opened"))}function i(e){e&&(e.classList.remove("popup_opened"),document.removeEventListener("keydown",u))}function l(e){e&&(e.classList.add("popup_opened"),document.addEventListener("keydown",u))}function s(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d,f=document.querySelectorAll(".popup"),_=document.querySelectorAll(".popup__close-button"),m=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),v=document.querySelector(".profile__avatar-button"),h=document.querySelector(".popup__input-container_type_add"),b=document.querySelector(".popup__text-input_type_card-name"),S=document.querySelector(".popup__text-input_type_link"),q=document.querySelector(".profile__name"),E=document.querySelector(".profile__description"),L=document.querySelector(".popup_type_add_card"),g=document.querySelector(".popup_type_edit-profile"),C=document.querySelector(".popup__input-container_type_profile"),k=C.querySelector(".popup__text-input_type_name"),x=C.querySelector(".popup__text-input_type_description"),A=document.querySelector(".profile__avatar"),O=document.querySelector(".popup_type_edit-avatar"),U=document.querySelector(".popup__input-container_type_avatar"),j=U.querySelector(".popup__text-input_type_avatar"),w=document.querySelector(".popup_type_image"),T=w.querySelector(".popup__label"),P=document.querySelector(".popup__image"),B={formSelector:".popup__input-container",inputSelector:".popup__text-input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_inactive",inputErrorClass:"popup__text-input_type_error",errorClass:"popup__input-error_active"};function D(e,t){e.target.querySelector(".popup__submit").textContent=t}function M(e,t){l(w),P.src=e,P.alt=t,T.textContent=t}function N(e){A.src=e.avatar,q.textContent=e.name,E.textContent=e.about,d=e}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),s(n,r,t)}))}))}(t,e)}))}(B),Promise.all([fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then(n),fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then(n)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],u=r[1];N(u),o.reverse().forEach((function(e){a(c(e,u))}))})).catch((function(e){console.log("Ошибка ".concat(e))})),U.addEventListener("submit",(function(e){var r;e.preventDefault(),D(e,"Сохранение..."),(r=j.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:r})}).then(n)).then((function(t){N(t),i(O),U.reset(),e.submitter.classList.add("popup__submit_inactive"),e.submitter.disabled=!0})).catch((function(){return console.log("Ошибка при обновлении аватара")})).finally((function(){D(e,"Сохранить")}))})),h.addEventListener("submit",(function(e){e.preventDefault(),D(e,"Создание..."),function(e,r){return fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:e,link:r})}).then(n)}(b.value,S.value).then((function(e){a(c(e,d))})).then((function(){i(L),h.reset(),s(Array.from(e.srcElement.querySelectorAll(".popup__text-input")),e.submitter,B)})).catch((function(e){return console.log("Ошибка при добавлении новой карточки: ".concat(e.status))})).finally((function(){D(e,"Создать")}))})),C.addEventListener("submit",(function(e){var r,o;e.preventDefault(),D(e,"Сохранение..."),(r="".concat(k.value),o="".concat(x.value),fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:o})}).then(n)).then((function(e){N(e)})).then((function(){i(g),h.reset(),e.submitter.classList.add("popup__submit_inactive"),e.submitter.disabled=!0})).catch((function(e){console.log("Ошибка при обновлении информации о пользователе: ".concat(e.status))})).finally((function(){D(e,"Сохранить")}))})),v.addEventListener("click",(function(){l(O)})),m.addEventListener("click",(function(){l(g),k.value=q.textContent,x.value=E.textContent})),y.addEventListener("click",(function(){l(L)})),_.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){i(t)}))})),f.forEach((function(e){e.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&i(e.target)}))}))})();