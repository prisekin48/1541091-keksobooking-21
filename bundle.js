(()=>{"use strict";window.util={getRandomElementFromArray:e=>e[window.util.getRandomNumber(0,e.length-1)],getRandomArray:e=>{const t=[],n=window.util.getRandomNumber(1,e.length),o=e.slice();for(let e=0;e<n;e++){const e=window.util.getRandomNumber(0,o.length-1);t.push(o.splice(e,1)[0])}return t},getRandomNumber:(e,t)=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e)}})(),(()=>{"use strict";const e=document.querySelector(".map"),t=e.querySelectorAll(".map__filter"),n=e.querySelector(".map__features"),o=e=>{for(const n of t)n.disabled=!e;n.disabled=!e};window.map={switchState:t=>{t?(e.classList.remove("map--faded"),window.backend.makeRequest()):(e.classList.add("map--faded"),(()=>{const t=e.querySelectorAll(".map__pin:not(.map__pin--main)");for(const e of t)e.remove()})(),o(t))},renderPins:t=>{const n=document.createDocumentFragment(),r=e.querySelector(".map__pins");t.forEach((e=>{const t=window.pin.create(e);n.appendChild(t)})),r.appendChild(n),o(!0)}}})(),(()=>{"use strict";const e=document.querySelector("#pin").content.querySelector(".map__pin"),t=e=>{e.classList.add("map__pin--active")};window.pin={create:n=>{const o=e.cloneNode(!0),r=o.querySelector("img");return o.style.left=n.location.x-25+"px",o.style.top=n.location.y-70+"px",r.src=""+n.author.avatar,r.alt=""+n.offer.title,o.addEventListener("keydown",(e=>{((e,n,o)=>{"Enter"===e.key&&(window.card.removeCurrent(),window.card.render(n),t(o))})(e,n,o)})),o.addEventListener("click",(()=>{var e,r;e=n,r=o,window.card.removeCurrent(),window.card.render(e),t(r)})),o},unsetActive:()=>{const e=document.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")}}})(),(()=>{"use strict";const e={MIN_TITLE_LENGHT:30,MAX_TITLE_LENGHT:100,MIN_PRICE:{palace:1e4,flat:1e3,house:5e3,bungalow:0},MAX_PRICE:1e6},t={0:{disabled:[0,1,3],enabled:[2]},1:{disabled:[0,3],enabled:[1,2]},2:{disabled:[3],enabled:[0,1,2]},3:{disabled:[0,1,2],enabled:[3]}},n=document.querySelector(".ad-form"),o=n.querySelectorAll("fieldset"),r=n.querySelector("#title"),i=n.querySelector("#price"),d=n.querySelector("#type"),a=n.querySelector("#timein"),c=n.querySelector("#timeout"),s=n.querySelector("#room_number"),l=n.querySelector("#capacity"),u=e=>{e.validity.valid?e.style.border="unset":e.style.border="2px solid #f00"},m=e=>{e.target===a&&(c.options.selectedIndex=e.target.options.selectedIndex),e.target===c&&(a.options.selectedIndex=e.target.options.selectedIndex)},p=()=>{let t=`Диапазон цен для выбранного типа жилья:\n\n                        ${e.MIN_PRICE[d.value]} - ${e.MAX_PRICE}`;i.value<e.MIN_PRICE[d.value]||i.value>e.MAX_PRICE?i.setCustomValidity(t):i.setCustomValidity(""),u(i),i.reportValidity()},f=()=>{i.placeholder=e.MIN_PRICE[d.value],i.min=e.MIN_PRICE[d.value],i.max=e.MAX_PRICE},w=e=>{e.preventDefault(),window.card.removeCurrent();let t=new FormData(n);window.backend.submitForm(t)};r.addEventListener("input",(()=>{let t=`Заголовок объявления должен содержать от\n                            ${e.MIN_TITLE_LENGHT} до ${e.MAX_TITLE_LENGHT} символов.\n                            \nВы ввели ${r.value.length}.`;r.value.length<e.MIN_TITLE_LENGHT||r.value.length>e.MAX_TITLE_LENGHT?r.setCustomValidity(t):r.setCustomValidity(""),u(r),r.reportValidity()})),i.addEventListener("input",p),a.addEventListener("change",(e=>{m(e)})),c.addEventListener("change",(e=>{m(e)})),d.addEventListener("change",(()=>{f(),p()})),s.addEventListener("change",(()=>{const e=s.options.selectedIndex;l.options.selectedIndex=t[e].enabled[0],(()=>{const e=s.options.selectedIndex;for(let n of t[e].disabled)l.options[n].disabled=!0;for(let n of t[e].enabled)l.options[n].disabled=!1})()})),n.addEventListener("submit",w),f(),window.form={enable:()=>{n.classList.remove("ad-form--disabled");for(const e of o)e.disabled=!1},disable:()=>{n.reset(),document.querySelector(".ad-form__photo").innerHTML="",document.querySelector(".ad-form-header__preview img").src="img/muffin-grey.svg",n.classList.add("ad-form--disabled");for(const e of o)e.disabled=!0;f()},submit:w}})(),(()=>{"use strict";const e=document.querySelector(".map__pin--main"),t=document.querySelector("#address"),n={MIN_Y:130,MAX_Y:630,MIN_X:0,MAX_X:1200},o=(e,n,o)=>{e?t.setAttribute("value",`${n+32}, ${o+87}`):t.setAttribute("value",`${n+32}, ${o+32}`)};let r={};const i=t=>{let i=r.x-t.clientX,d=r.y-t.clientY;r.x=t.clientX,r.y=t.clientY,t.clientY>=n.MIN_Y-87-c.y&&t.clientY<=n.MAX_Y-87-c.y&&t.clientX>=n.MIN_X-32-c.x&&t.clientX<=n.MAX_X-32-c.x&&(e.style.top=e.offsetTop-d+"px",e.style.left=e.offsetLeft-i+"px"),o(window.main.isActive,e.offsetLeft,e.offsetTop)},d=()=>{document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",d)},a=e=>{"Enter"===e.key&&(e.preventDefault(),window.main.activate())};let c={};const s=t=>{0===t.button&&(r.x=t.clientX,r.y=t.clientY,c.x=e.offsetLeft-r.x,c.y=e.offsetTop-r.y,document.addEventListener("mousemove",i),document.addEventListener("mouseup",d))},l=()=>{window.main.activate(),e.removeEventListener("keydown",a),e.removeEventListener("click",l)};window.mainPin={reset:()=>{e.style.left="570px",e.style.top="375px",o(window.main.isActive,e.offsetLeft,e.offsetTop)},setAddress:o,WorkingArea:n,addMainPinListeners:()=>{e.addEventListener("click",l),e.addEventListener("mousedown",s),e.addEventListener("keydown",a)}}})(),(()=>{"use strict";const e={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},t=(e,t)=>{e?t.textContent=e:t.remove()},n=e=>{"Escape"===e.key&&o()},o=()=>{const e=document.querySelector(".map__card");e&&e.remove(),window.pin.unsetActive(),document.removeEventListener("keydown",n)};window.card={render:r=>{const i=document.querySelector("#card").content.querySelector(".map__card").cloneNode(!0),d=i.querySelector(".popup__close");t(r.offer.title,i.querySelector(".popup__title")),t(r.offer.address,i.querySelector(".popup__text--address")),t(r.offer.price+"₽/ночь",i.querySelector(".popup__text--price")),t(e[r.offer.type],i.querySelector(".popup__type")),t(`${r.offer.rooms} комнаты для ${r.offer.guests} гостей`,i.querySelector(".popup__text--capacity")),t(`Заезд после ${r.offer.checkin}, выезд до ${r.offer.checkout}`,i.querySelector(".popup__text--time")),((e,t)=>{if(t.length>0){let n=document.createDocumentFragment();for(let o of t){let t=e.querySelector(".popup__feature").cloneNode();t.classList.value="popup__feature popup__feature--"+o,t.textContent=o,n.appendChild(t)}e.innerHTML="",e.appendChild(n)}else e.innerHTML=""})(i.querySelector(".popup__features"),r.offer.features),t(r.offer.description,i.querySelector(".popup__description")),((e,t)=>{if(t.length>0){let n=document.createDocumentFragment();for(let o of t){let t=e.querySelector(".popup__photo").cloneNode();t.src=o,n.appendChild(t)}e.innerHTML="",e.appendChild(n)}else e.innerHTML=""})(i.querySelector(".popup__photos"),r.offer.photos),i.querySelector(".popup__avatar").src=r.author.avatar,d.addEventListener("click",(()=>{o()})),d.addEventListener("keydown",(e=>{"Enter"===e.key&&o()})),document.addEventListener("keydown",n),document.querySelector(".map__filters-container").before(i)},removeCurrent:o}})(),(()=>{"use strict";window.ADS_COUNT=5;const e=document.querySelector(".map"),t=(t,n)=>{const o=document.createElement("div");o.style.position="absolute",o.style.maxWidth="20%",o.style.top="20px",o.style.left="20px",o.style.padding="10px",o.style.backgroundColor=n?"crimson":"lightgreen",o.textContent=t,o.addEventListener("click",(()=>{o.remove()})),e.appendChild(o),setTimeout((()=>{o&&o.remove()}),5e3)},n=(e,t,n)=>{e.timeout=1e4,e.addEventListener("load",(()=>{let o;switch(e.status){case 200:t(e.response);break;case 400:o="Неверный запрос";break;case 401:o="Пользователь не авторизован";break;case 404:o="Ничего не найдено";break;default:o=`Статус ответа: ${e.status} ${e.statusText}`}o&&n(o)})),e.addEventListener("error",(()=>{n("Произошла ошибка соединения")})),e.addEventListener("timeout",(()=>{n(`Запрос не успел выполниться за ${e.timeout} мс`)}))},o=e=>{window.backend.ads=e,window.map.renderPins(window.backend.ads.slice(null,window.ADS_COUNT)),t("Объявления загружены успешно",!1)},r=e=>{t("При загрузке объявлений произошла ошибка: "+e,!0)},i=e=>{e.preventDefault(),"Escape"===e.key&&(a.remove(),document.removeEventListener("keydown",i),document.removeEventListener("click",d))},d=e=>{e.preventDefault(),a.remove(),document.removeEventListener("keydown",i),document.removeEventListener("click",d)};let a=document.createDocumentFragment();const c=e=>{e?a=document.querySelector("#success").content.querySelector(".success").cloneNode(!0):(a=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),a.querySelector(".error__button").addEventListener("click",(e=>{a.remove(),window.form.submit(e)}))),document.querySelector("main").appendChild(a),document.addEventListener("keydown",i),document.addEventListener("click",d)},s=()=>{window.main.deactivate(),c(!0)},l=()=>{c(!1)};window.backend={makeRequest:()=>{((e,t)=>{const o=new XMLHttpRequest;o.responseType="json",n(o,e,t),o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.send()})(o,r)},submitForm:e=>{((e,t,o)=>{const r=new XMLHttpRequest;n(r,t,o),r.open("POST","https://21.javascript.pages.academy/keksobooking"),r.send(e)})(e,s,l)}}})(),(()=>{"use strict";const e="any",t=document.querySelector(".map__filters"),n=t.querySelector("#housing-type"),o=t.querySelector("#housing-price"),r=t.querySelector("#housing-rooms"),i=t.querySelector("#housing-guests"),d=t.querySelector("#filter-wifi"),a=t.querySelector("#filter-dishwasher"),c=t.querySelector("#filter-parking"),s=t.querySelector("#filter-washer"),l=t.querySelector("#filter-elevator"),u=t.querySelector("#filter-conditioner"),m=document.querySelectorAll(".map__checkbox");window.lastTimeout=null;const p=()=>{window.lastTimeout&&window.clearTimeout(window.lastTimeout),window.lastTimeout=window.setTimeout((()=>{var e;e=f(),window.card.removeCurrent(),document.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>e.remove())),window.map.renderPins(e)}),500)},f=()=>{const t=window.backend.ads;let d=[];for(let c=0;c<t.length&&(!((t=>n.value===e||t.offer.type===n.value)(a=t[c])&&(t=>{switch(o.value){case e:return!0;case"low":return t.offer.price<=9999;case"high":return t.offer.price>=50001;case"middle":return t.offer.price>9999&&t.offer.price<50001}})(a)&&(t=>r.value===e||t.offer.rooms===parseInt(r.value,10))(a)&&(t=>i.value===e||t.offer.guests===parseInt(i.value,10))(a)&&(e=>{let t=[];m.forEach((e=>{e.checked&&t.push(e.value)}));for(let n of t)if(!1===e.offer.features.includes(n))return!1;return!0})(a))||(d.push(t[c]),d.length!==window.ADS_COUNT));c++);var a;return d.length<=window.ADS_COUNT?d:d.slice(null,window.ADS_COUNT)};n.addEventListener("change",p),o.addEventListener("change",p),r.addEventListener("change",p),i.addEventListener("change",p),d.addEventListener("change",p),a.addEventListener("change",p),c.addEventListener("change",p),s.addEventListener("change",p),l.addEventListener("change",p),u.addEventListener("change",p),window.filters={reset:()=>{n.selectedIndex=0,o.selectedIndex=0,r.selectedIndex=0,i.selectedIndex=0,d.checked=!1,a.checked=!1,c.checked=!1,s.checked=!1,l.checked=!1,u.checked=!1}}})(),(()=>{"use strict";const e=document.querySelector(".map__pin--main"),t=document.querySelector(".ad-form__reset"),n=()=>{window.main.isActive=!1,window.map.switchState(window.main.isActive),window.filters.reset(),window.mainPin.addMainPinListeners(),window.mainPin.reset(),window.form.disable()};window.main={isActive:!1,activate:()=>{window.main.isActive=!0,window.map.switchState(window.main.isActive),window.mainPin.setAddress(window.main.isActive,e.offsetLeft,e.offsetTop),window.form.enable()},deactivate:n},t.addEventListener("click",window.main.deactivate),n()})(),(()=>{const e=["image/jpg","image/jpeg","image/png"],t=document.querySelector("#avatar"),n=document.querySelector(".ad-form-header__preview img"),o=document.querySelector("#images"),r=document.querySelector(".ad-form__photo"),i=e=>{n.src=e},d=e=>{let t=document.createElement("img");t.style.width="70px",t.style.height="70px",t.src=e,r.innerHTML="",r.append(t)},a=(t,n)=>{const o=t.files[0];let r=!1;if(o&&(r=e.some((e=>o.type===e))),r){const e=new FileReader;e.addEventListener("load",(()=>{n(e.result)})),e.readAsDataURL(o)}};t.addEventListener("change",(()=>{a(t,i)})),o.addEventListener("change",(()=>{a(o,d)}))})();