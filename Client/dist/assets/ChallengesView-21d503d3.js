import{k as Pe,m as re,N as Oe,n as De,q as Z,s as Ue,d as B,v as Ke,x as Me,r as c,y as P,z as We,A as ce,o as _,B as K,w as d,f as T,C as U,D as u,F as ue,a as v,c as $,G as qe,H as ze,I as A,J as M,K as O,b as H,L as k,M as He,O as D,P as ie,Q as je,R as de,S as Ge,T as Je,U as x,V as Qe,W as Xe,g as Ye,h as j,X as ee,t as R,_ as G,Y as Ze,p as pe,e as ge,Z as xe,$ as et,a0 as q}from"./index-f48438ef.js";import{E as tt,a as fe}from"./select-6478868a.js";import{U as z,I as te,C as he,u as at,a as st,E as lt}from"./input-86eb12f4.js";import{d as ot,E as nt,a as ve,b as _e}from"./col-a1fd19f5.js";import{E as rt}from"./card-a156ac9e.js";import{E as ut}from"./rate-233716e2.js";import{_ as me}from"./TextSearch-b79fa742.js";const it=()=>Math.floor(Math.random()*1e4),ct=Pe({valueKey:{type:String,default:"value"},modelValue:{type:[String,Number],default:""},debounce:{type:Number,default:300},placement:{type:re(String),values:["top","top-start","top-end","bottom","bottom-start","bottom-end"],default:"bottom-start"},fetchSuggestions:{type:re([Function,Array]),default:Oe},popperClass:{type:String,default:""},triggerOnFocus:{type:Boolean,default:!0},selectWhenUnmatched:{type:Boolean,default:!1},hideLoading:{type:Boolean,default:!1},label:{type:String},teleported:De.teleported,highlightFirstItem:{type:Boolean,default:!1},fitInputWidth:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},name:String}),dt={[z]:e=>Z(e),[te]:e=>Z(e),[he]:e=>Z(e),focus:e=>e instanceof FocusEvent,blur:e=>e instanceof FocusEvent,clear:()=>!0,select:e=>Ue(e)},pt=["aria-expanded","aria-owns"],gt={key:0},ft=["id","aria-selected","onClick"],ye="ElAutocomplete",ht=B({name:ye,inheritAttrs:!1}),vt=B({...ht,props:ct,emits:dt,setup(e,{expose:o,emit:n}){const s=e,p=at(),f=Ke(),g=st(),l=Me("autocomplete"),a=c(),r=c(),C=c(),E=c();let S=!1,y=!1;const h=c([]),m=c(-1),ae=c(""),L=c(!1),W=c(!1),I=c(!1),N=P(()=>l.b(String(it()))),Se=P(()=>f.style),w=P(()=>(h.value.length>0||I.value)&&L.value),se=P(()=>!s.hideLoading&&I.value),Te=P(()=>a.value?Array.from(a.value.$el.querySelectorAll("input")):[]),Ee=async()=>{await Je(),w.value&&(ae.value=`${a.value.$el.offsetWidth}px`)},Le=()=>{m.value=-1},le=ot(async t=>{if(W.value)return;const i=b=>{I.value=!1,!W.value&&(x(b)?(h.value=b,m.value=s.highlightFirstItem?0:-1):Qe(ye,"autocomplete suggestions must be an array"))};if(I.value=!0,x(s.fetchSuggestions))i(s.fetchSuggestions);else{const b=await s.fetchSuggestions(t,i);x(b)&&i(b)}},s.debounce),we=t=>{const i=!!t;if(n(te,t),n(z,t),W.value=!1,L.value||(L.value=i),!s.triggerOnFocus&&!t){W.value=!0,h.value=[];return}le(t)},ke=t=>{var i;g.value||(((i=t.target)==null?void 0:i.tagName)!=="INPUT"||Te.value.includes(document.activeElement))&&(L.value=!0)},Ae=t=>{n(he,t)},Ie=t=>{y?y=!1:(L.value=!0,n("focus",t),s.triggerOnFocus&&!S&&le(String(s.modelValue)))},Ve=t=>{setTimeout(()=>{var i;if((i=C.value)!=null&&i.isFocusInsideContent()){y=!0;return}L.value&&F(),n("blur",t)})},Re=()=>{L.value=!1,n(z,""),n("clear")},oe=async()=>{w.value&&m.value>=0&&m.value<h.value.length?J(h.value[m.value]):s.selectWhenUnmatched&&(n("select",{value:s.modelValue}),h.value=[],m.value=-1)},Be=t=>{w.value&&(t.preventDefault(),t.stopPropagation(),F())},F=()=>{L.value=!1},Ne=()=>{var t;(t=a.value)==null||t.focus()},Fe=()=>{var t;(t=a.value)==null||t.blur()},J=async t=>{n(te,t[s.valueKey]),n(z,t[s.valueKey]),n("select",t),h.value=[],m.value=-1},Q=t=>{if(!w.value||I.value)return;if(t<0){m.value=-1;return}t>=h.value.length&&(t=h.value.length-1);const i=r.value.querySelector(`.${l.be("suggestion","wrap")}`),V=i.querySelectorAll(`.${l.be("suggestion","list")} li`)[t],X=i.scrollTop,{offsetTop:ne,scrollHeight:Y}=V;ne+Y>X+i.clientHeight&&(i.scrollTop+=Y),ne<X&&(i.scrollTop-=Y),m.value=t,a.value.ref.setAttribute("aria-activedescendant",`${N.value}-item-${m.value}`)};return We(E,()=>{w.value&&F()}),ce(()=>{a.value.ref.setAttribute("role","textbox"),a.value.ref.setAttribute("aria-autocomplete","list"),a.value.ref.setAttribute("aria-controls","id"),a.value.ref.setAttribute("aria-activedescendant",`${N.value}-item-${m.value}`),S=a.value.ref.hasAttribute("readonly")}),o({highlightedIndex:m,activated:L,loading:I,inputRef:a,popperRef:C,suggestions:h,handleSelect:J,handleKeyEnter:oe,focus:Ne,blur:Fe,close:F,highlight:Q}),(t,i)=>(_(),K(u(de),{ref_key:"popperRef",ref:C,visible:u(w),placement:t.placement,"fallback-placements":["bottom-start","top-start"],"popper-class":[u(l).e("popper"),t.popperClass],teleported:t.teleported,"gpu-acceleration":!1,pure:"","manual-mode":"",effect:"light",trigger:"click",transition:`${u(l).namespace.value}-zoom-in-top`,persistent:"",onBeforeShow:Ee,onHide:Le},{content:d(()=>[T("div",{ref_key:"regionRef",ref:r,class:U([u(l).b("suggestion"),u(l).is("loading",u(se))]),style:ue({[t.fitInputWidth?"width":"minWidth"]:ae.value,outline:"none"}),role:"region"},[v(u(nt),{id:u(N),tag:"ul","wrap-class":u(l).be("suggestion","wrap"),"view-class":u(l).be("suggestion","list"),role:"listbox"},{default:d(()=>[u(se)?(_(),$("li",gt,[v(u(qe),{class:U(u(l).is("loading"))},{default:d(()=>[v(u(ze))]),_:1},8,["class"])])):(_(!0),$(A,{key:1},M(h.value,(b,V)=>(_(),$("li",{id:`${u(N)}-item-${V}`,key:V,class:U({highlighted:m.value===V}),role:"option","aria-selected":m.value===V,onClick:X=>J(b)},[O(t.$slots,"default",{item:b},()=>[H(k(b[t.valueKey]),1)])],10,ft))),128))]),_:3},8,["id","wrap-class","view-class"])],6)]),default:d(()=>[T("div",{ref_key:"listboxRef",ref:E,class:U([u(l).b(),t.$attrs.class]),style:ue(u(Se)),role:"combobox","aria-haspopup":"listbox","aria-expanded":u(w),"aria-owns":u(N)},[v(u(lt),He({ref_key:"inputRef",ref:a},u(p),{clearable:t.clearable,disabled:u(g),name:t.name,"model-value":t.modelValue,onInput:we,onChange:Ae,onFocus:Ie,onBlur:Ve,onClear:Re,onKeydown:[i[0]||(i[0]=D(ie(b=>Q(m.value-1),["prevent"]),["up"])),i[1]||(i[1]=D(ie(b=>Q(m.value+1),["prevent"]),["down"])),D(oe,["enter"]),D(F,["tab"]),D(Be,["esc"])],onMousedown:ke}),je({_:2},[t.$slots.prepend?{name:"prepend",fn:d(()=>[O(t.$slots,"prepend")])}:void 0,t.$slots.append?{name:"append",fn:d(()=>[O(t.$slots,"append")])}:void 0,t.$slots.prefix?{name:"prefix",fn:d(()=>[O(t.$slots,"prefix")])}:void 0,t.$slots.suffix?{name:"suffix",fn:d(()=>[O(t.$slots,"suffix")])}:void 0]),1040,["clearable","disabled","name","model-value","onKeydown"])],14,pt)]),_:3},8,["visible","placement","popper-class","teleported","transition"]))}});var _t=Ge(vt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/autocomplete/src/autocomplete.vue"]]);const mt=Xe(_t),yt=B({name:"ChallengeList",props:{challengeList:{type:Object,default:()=>({})}},emits:["challengeListChange"],setup(e,o){const n=Ye(),s=c(1),p=j({handleClick:f=>{n.push({name:"challenge",params:{id:f.id}})}});return ee(s,f=>{o.emit("challengeListChange",f)}),{currentPage:s,...R(p),...R(e)}}});const Ct={class:"header"},bt={class:"title"},$t={class:"describe"},St={class:"pagination"};function Tt(e,o,n,s,p,f){const g=de,l=ut,a=fe,r=rt,C=_e,E=ve,S=tt;return _(),$(A,null,[e.challengeList?(_(),K(E,{key:0},{default:d(()=>[(_(!0),$(A,null,M(e.challengeList.results,y=>(_(),K(C,{key:y.id,span:8},{default:d(()=>[v(r,{class:"challenge",onClick:h=>e.handleClick(y)},{header:d(()=>[T("div",Ct,[v(g,{effect:"dark",content:y.title,placement:"top"},{default:d(()=>[T("span",bt,k(y.title),1)]),_:2},1032,["content"]),v(g,{effect:"dark",placement:"top"},{content:d(()=>[H("难度："+k(y.difficulty),1)]),default:d(()=>[v(l,{modelValue:y.difficulty,"onUpdate:modelValue":h=>y.difficulty=h,disabled:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)])]),default:d(()=>[T("div",$t,k(y.describe),1),(_(!0),$(A,null,M(y.tag,h=>(_(),K(a,{class:"tag",key:h.id},{default:d(()=>[H(k(h.value),1)]),_:2},1024))),128))]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})):Ze("",!0),T("div",St,[v(S,{"current-page":e.currentPage,"onUpdate:currentPage":o[0]||(o[0]=y=>e.currentPage=y),small:"",background:"",layout:"prev, pager, next","page-size":15,total:e.challengeList.count},null,8,["current-page","total"])])],64)}const Ce=G(yt,[["render",Tt],["__scopeId","data-v-cc2d060c"]]);const Et=B({name:"TagSearch",props:{tagList:{type:Array,default:()=>[]},selectedTag:{type:Array,default:()=>[]},isRefresh:{type:Boolean,default:!1}},setup(e,o){const n=c(""),s=c([]),p=c([]),f=c(),g=a=>r=>r.value.toLowerCase().indexOf(a.toLowerCase())===0;ee(()=>e.tagList,a=>{p.value=a}),ee(()=>e.isRefresh,()=>{s.value.forEach(a=>{s.value.splice(s.value.indexOf(a),1),p.value.unshift(a)}),o.emit("update:isRefresh",!1)});const l=j({querySearch:(a,r)=>{const C=a?p.value.filter(g(a)):p.value;r(C)},handleSelect:a=>{var r,C,E;s.value.push(a),p.value.splice(p.value.indexOf(a),1),o.emit("update:selectedTag",s.value),(C=(r=f.value)==null?void 0:r.inputRef)==null||C.clear(),(E=f.value)==null||E.blur(),o.emit("selectedTagChange")},handleClose:a=>{s.value.splice(s.value.indexOf(a),1),p.value.unshift(a),o.emit("update:selectedTag",s.value),o.emit("selectedTagChange")}});return{text:n,tagAutocomplete:f,...R(l)}}});const Lt=e=>(pe("data-v-afe1f2a6"),e=e(),ge(),e),wt={class:"tag-list"},kt=Lt(()=>T("span",{class:"tag-title"},"标签:",-1));function At(e,o,n,s,p,f){const g=fe,l=mt;return _(),$("div",wt,[kt,(_(!0),$(A,null,M(e.selectedTag,a=>(_(),K(g,{key:a.id,"disable-transitions":!1,onClose:r=>e.handleClose(a),class:"tag-item",closable:""},{default:d(()=>[H(k(a.value),1)]),_:2},1032,["onClose"]))),128)),v(l,{"fetch-suggestions":e.querySearch,modelValue:e.text,"onUpdate:modelValue":o[0]||(o[0]=a=>e.text=a),ref:"tagAutocomplete",clearable:"",placeholder:"+ New Tag",onSelect:e.handleSelect},null,8,["fetch-suggestions","modelValue","onSelect"])])}const be=G(Et,[["render",At],["__scopeId","data-v-afe1f2a6"]]),It=B({name:"ChallengeCategory",props:{categoryList:{type:Array,default:()=>[]},selectedCategory:{type:Object,default:()=>({id:1})}},setup(e,o){const n=j({handleClick:s=>{o.emit("update:selectedCategory",s),o.emit("categoryChange")}});return{...R(n),...R(e)}}});const Vt=e=>(pe("data-v-0fd702db"),e=e(),ge(),e),Rt={class:"category"},Bt=Vt(()=>T("span",{class:"title"},"类型:",-1)),Nt=["onClick"];function Ft(e,o,n,s,p,f){return _(),$("ul",Rt,[Bt,(_(!0),$(A,null,M(e.categoryList,g=>(_(),$("li",{key:g.id},[T("span",{onClick:l=>e.handleClick(g),class:U({is_active:e.selectedCategory.id==g.id})},k(g.name),11,Nt)]))),128))])}const $e=G(It,[["render",Ft],["__scopeId","data-v-0fd702db"]]),Pt=B({name:"ChallengesView",components:{ChallengeCategory:$e,TextSearch:me,TagSearch:be,ChallengeList:Ce},setup(){const e=c([]),o=c([]),n=c(),s=c(),p=c([]),f=c(!1),g=j({loadAll:()=>{xe().then(l=>{e.value=l.data}),et().then(l=>{o.value=l.data}),q().then(l=>{n.value=l.data})},handleCategoryAndSelectedTagChange:()=>{var a;const l={category:(a=s.value)==null?void 0:a.id,tag:p.value.map(r=>r.id)};q(l).then(r=>{n.value=r.data})},handleSearchChange:l=>{s.value={id:1,name:"All"},f.value=!f.value,q({title:l}).then(r=>{n.value=r.data})},handleChallengeListChange:l=>{const a={category:s.value,tag:p.value.map(r=>r.id),page:l};q(a).then(r=>{n.value=r.data})}});return ce(()=>{g.loadAll()}),{tagList:e,categoryList:o,challengeList:n,selectedCategory:s,selectedTag:p,isRefresh:f,...R(g)}}});const Ot={class:"challenge-list"};function Dt(e,o,n,s,p,f){const g=$e,l=_e,a=me,r=ve,C=be,E=Ce;return _(),$(A,null,[v(r,null,{default:d(()=>[v(l,{span:18},{default:d(()=>[v(g,{onCategoryChange:e.handleCategoryAndSelectedTagChange,categoryList:e.categoryList,selectedCategory:e.selectedCategory,"onUpdate:selectedCategory":o[0]||(o[0]=S=>e.selectedCategory=S)},null,8,["onCategoryChange","categoryList","selectedCategory"])]),_:1}),v(l,{span:6,class:"search-bar"},{default:d(()=>[v(a,{onSearchChange:e.handleSearchChange,placeholderText:"搜索题目"},null,8,["onSearchChange"])]),_:1})]),_:1}),v(C,{tagList:e.tagList,selectedTag:e.selectedTag,"onUpdate:selectedTag":o[1]||(o[1]=S=>e.selectedTag=S),onSelectedTagChange:e.handleCategoryAndSelectedTagChange,isRefresh:e.isRefresh,"onUpdate:isRefresh":o[2]||(o[2]=S=>e.isRefresh=S)},null,8,["tagList","selectedTag","onSelectedTagChange","isRefresh"]),T("div",Ot,[v(E,{challengeList:e.challengeList,onChallengeListChange:e.handleChallengeListChange},null,8,["challengeList","onChallengeListChange"])])],64)}const Gt=G(Pt,[["render",Dt],["__scopeId","data-v-166f0293"]]);export{Gt as default};
