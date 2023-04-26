import{k as me,m as S,ax as L,ay as V,az as W,aA as pe,aB as he,aC as $,d as ae,aD as R,aE as ye,aF as be,x as Ve,r as _,y as u,U as E,s as G,aG as T,q as U,X as we,o as d,c as h,I as q,J as xe,C as y,D as o,a as Ce,w as X,ab as J,B as w,a7 as D,ac as Y,Y as N,G as Q,F as Z,L as Ie,S as ge,aH as x,aI as ee,W as Se}from"./index-f48438ef.js";import{C as _e,U as C,b as Ee,c as Te}from"./input-86eb12f4.js";const De=me({modelValue:{type:Number,default:0},id:{type:String,default:void 0},lowThreshold:{type:Number,default:2},highThreshold:{type:Number,default:4},max:{type:Number,default:5},colors:{type:S([Array,Object]),default:()=>L(["","",""])},voidColor:{type:String,default:""},disabledVoidColor:{type:String,default:""},icons:{type:S([Array,Object]),default:()=>[V,V,V]},voidIcon:{type:W,default:()=>pe},disabledVoidIcon:{type:W,default:()=>V},disabled:Boolean,allowHalf:Boolean,showText:Boolean,showScore:Boolean,textColor:{type:String,default:""},texts:{type:S(Array),default:()=>L(["Extremely bad","Disappointed","Fair","Satisfied","Surprise"])},scoreTemplate:{type:String,default:"{value}"},size:he,label:{type:String,default:void 0},clearable:{type:Boolean,default:!1}}),Ne={[_e]:v=>$(v),[C]:v=>$(v)},ke=["id","aria-label","aria-labelledby","aria-valuenow","aria-valuetext","aria-valuemax"],Be=["onMousemove","onClick"],He=ae({name:"ElRate"}),Me=ae({...He,props:De,emits:Ne,setup(v,{expose:le,emit:m}){const e=v;function I(a,l){const t=n=>G(n),i=Object.keys(l).map(n=>+n).filter(n=>{const b=l[n];return(t(b)?b.excluded:!1)?a<n:a<=n}).sort((n,b)=>n-b),p=l[i[0]];return t(p)&&p.value||p}const k=R(ye,void 0),B=R(be,void 0),oe=Ee(),r=Ve("rate"),{inputId:te,isLabeledByFormItem:H}=Te(e,{formItemContext:B}),s=_(e.modelValue),g=_(-1),f=_(!0),se=u(()=>[r.b(),r.m(oe.value)]),c=u(()=>e.disabled||(k==null?void 0:k.disabled)),re=u(()=>r.cssVarBlock({"void-color":e.voidColor,"disabled-void-color":e.disabledVoidColor,"fill-color":F.value})),M=u(()=>{let a="";return e.showScore?a=e.scoreTemplate.replace(/\{\s*value\s*\}/,c.value?`${e.modelValue}`:`${s.value}`):e.showText&&(a=e.texts[Math.ceil(s.value)-1]),a}),A=u(()=>e.modelValue*100-Math.floor(e.modelValue)*100),ne=u(()=>E(e.colors)?{[e.lowThreshold]:e.colors[0],[e.highThreshold]:{value:e.colors[1],excluded:!0},[e.max]:e.colors[2]}:e.colors),F=u(()=>{const a=I(s.value,ne.value);return G(a)?"":a}),ue=u(()=>{let a="";return c.value?a=`${A.value}%`:e.allowHalf&&(a="50%"),{color:F.value,width:a}}),P=u(()=>{let a=E(e.icons)?[...e.icons]:{...e.icons};return a=T(a),E(a)?{[e.lowThreshold]:a[0],[e.highThreshold]:{value:a[1],excluded:!0},[e.max]:a[2]}:a}),ie=u(()=>I(e.modelValue,P.value)),ce=u(()=>c.value?U(e.disabledVoidIcon)?e.disabledVoidIcon:T(e.disabledVoidIcon):U(e.voidIcon)?e.voidIcon:T(e.voidIcon)),de=u(()=>I(s.value,P.value));function z(a){const l=c.value&&A.value>0&&a-1<e.modelValue&&a>e.modelValue,t=e.allowHalf&&f.value&&a-.5<=s.value&&a>s.value;return l||t}function O(a){e.clearable&&a===e.modelValue&&(a=0),m(C,a),e.modelValue!==a&&m("change",a)}function fe(a){c.value||(e.allowHalf&&f.value?O(s.value):O(a))}function ve(a){if(c.value)return;let l=s.value;const t=a.code;return t===x.up||t===x.right?(e.allowHalf?l+=.5:l+=1,a.stopPropagation(),a.preventDefault()):(t===x.left||t===x.down)&&(e.allowHalf?l-=.5:l-=1,a.stopPropagation(),a.preventDefault()),l=l<0?0:l,l=l>e.max?e.max:l,m(C,l),m("change",l),l}function j(a,l){if(!c.value){if(e.allowHalf&&l){let t=l.target;ee(t,r.e("item"))&&(t=t.querySelector(`.${r.e("icon")}`)),(t.clientWidth===0||ee(t,r.e("decimal")))&&(t=t.parentNode),f.value=l.offsetX*2<=t.clientWidth,s.value=f.value?a-.5:a}else s.value=a;g.value=a}}function K(){c.value||(e.allowHalf&&(f.value=e.modelValue!==Math.floor(e.modelValue)),s.value=e.modelValue,g.value=-1)}return we(()=>e.modelValue,a=>{s.value=a,f.value=e.modelValue!==Math.floor(e.modelValue)}),e.modelValue||m(C,0),le({setCurrentValue:j,resetCurrentValue:K}),(a,l)=>{var t;return d(),h("div",{id:o(te),class:y([o(se),o(r).is("disabled",o(c))]),role:"slider","aria-label":o(H)?void 0:a.label||"rating","aria-labelledby":o(H)?(t=o(B))==null?void 0:t.labelId:void 0,"aria-valuenow":s.value,"aria-valuetext":o(M)||void 0,"aria-valuemin":"0","aria-valuemax":a.max,tabindex:"0",style:Z(o(re)),onKeydown:ve},[(d(!0),h(q,null,xe(a.max,(i,p)=>(d(),h("span",{key:p,class:y(o(r).e("item")),onMousemove:n=>j(i,n),onMouseleave:K,onClick:n=>fe(i)},[Ce(o(Q),{class:y([o(r).e("icon"),{hover:g.value===i},o(r).is("active",i<=s.value)])},{default:X(()=>[z(i)?N("v-if",!0):(d(),h(q,{key:0},[J((d(),w(D(o(de)),null,null,512)),[[Y,i<=s.value]]),J((d(),w(D(o(ce)),null,null,512)),[[Y,!(i<=s.value)]])],64)),z(i)?(d(),w(o(Q),{key:1,style:Z(o(ue)),class:y([o(r).e("icon"),o(r).e("decimal")])},{default:X(()=>[(d(),w(D(o(ie))))]),_:1},8,["style","class"])):N("v-if",!0)]),_:2},1032,["class"])],42,Be))),128)),a.showText||a.showScore?(d(),h("span",{key:0,class:y(o(r).e("text"))},Ie(o(M)),3)):N("v-if",!0)],46,ke)}}});var Ae=ge(Me,[["__file","/home/runner/work/element-plus/element-plus/packages/components/rate/src/rate.vue"]]);const Oe=Se(Ae);export{Oe as E};
