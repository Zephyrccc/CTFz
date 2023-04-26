import{d as R,r as P,h as C,X as q,t as I,_ as B,B as y,w as a,Y as S,o as h,a as s,b as _,L as E,f,E as M,p as H,e as W,u as G,c as $,I as J,ao as K,A as Q,aX as j,aY as L,aZ as x,i as V,a_ as ee}from"./index-f48438ef.js";import{E as X}from"./card-a156ac9e.js";import{E as oe}from"./select-6478868a.js";import{E as se}from"./input-86eb12f4.js";import{b as ae,a as re}from"./col-a1fd19f5.js";import{a as ne,E as le}from"./table-column-b5089e17.js";import{h as te}from"./moment-fbc5633a.js";import{E as de}from"./overlay-3223c60b.js";import{a as ue,E as ie}from"./form-item-b08d89a2.js";import{E as fe}from"./divider-91fb6dfc.js";import{E as pe}from"./button-f8fb6abb.js";import"./_initCloneObject-69a7e4eb.js";const me=R({name:"SolveRecord",props:{userSolveRecord:{type:Object,default:()=>({})}},components:{},emits:["userSolveRecordChange"],setup(e,o){const i=P(1),w=C({formatTime:n=>(console.log(e.userSolveRecord),te(n).format("YYYY-MM-DD HH:mm:ss"))});return q(i,n=>{o.emit("userSolveRecordChange",n)}),{currentPage:i,...I(w),...I(e)}}});const ce=e=>(H("data-v-c7f09f14"),e=e(),W(),e),_e=ce(()=>f("h3",null,"解题记录",-1)),we={class:"pagination"};function ge(e,o,i,w,n,p){const l=M,t=ne,m=le,g=oe,u=X;return e.userSolveRecord?(h(),y(u,{key:0,class:"solve-info"},{default:a(()=>{var d;return[_e,s(m,{data:e.userSolveRecord.results,stripe:""},{default:a(()=>[s(t,{prop:"challenge",label:"题目名称","show-overflow-tooltip":""},{default:a(c=>[s(l,{href:"/challenge/"+c.row.challenge.id,type:"primary"},{default:a(()=>[_(E(c.row.challenge.title),1)]),_:2},1032,["href"])]),_:1}),s(t,{prop:"challenge.category.name",label:"类型"}),s(t,{prop:"solvedTime",label:"解题时间"},{default:a(c=>[_(E(e.formatTime(c.row.created_time)),1)]),_:1}),_("> ")]),_:1},8,["data"]),f("div",we,[s(g,{small:"",background:"",layout:"prev, pager, next","current-page":e.currentPage,"onUpdate:currentPage":o[0]||(o[0]=c=>e.currentPage=c),"page-size":15,total:(d=e.userSolveRecord)==null?void 0:d.count},null,8,["current-page","total"])])]}),_:1})):S("",!0)}const z=B(me,[["render",ge],["__scopeId","data-v-c7f09f14"]]),ve=R({name:"UserProfile",props:{userInfo:{type:Object,default:()=>({})}},emits:["changePassword","changeUserInfo"],components:{},setup(e,o){const i=G(),w=P(!1),n=P(!1),p=P(),l=C({describe:""}),t=C({validateOldPassword:(g,u,d)=>{u===""?d(new Error("请输入原密码")):/^[\S]{5,15}$/.test(u)?d():d(new Error("用户名必须是字母或数字或可见特殊字符的组合,长度在[5,15]"))},validateNewPassword(g,u,d){if(u==="")d(new Error("请输入新密码"));else if(!/^[\S]{5,15}$/.test(u))d(new Error("用户名必须是字母或数字或可见特殊字符的组合,长度在[5,15]"));else{if(m.passwordInfo.checkPassword!==""){if(!p.value)return;p.value.validateField("checkPassword",()=>null)}d()}},validateConfirmPassword(g,u,d){u===""?d(new Error("请再次输入新密码以确认")):u!==m.passwordInfo.newPassword?d(new Error("两次输入的密码不匹配")):d()},submitPasswordForm:g=>{g&&g.validate(u=>{if(u)n.value=!1,o.emit("changePassword",i.state.UserInfo.id,m.passwordInfo.oldPassword,m.passwordInfo.newPassword);else return n.value=!1,!1})},changeUserInfo:()=>{w.value=!1,o.emit("changeUserInfo",i.state.UserInfo.id,l.describe)}}),m=C({passwordInfo:{oldPassword:"",newPassword:"",checkPassword:""},rules:{oldPassword:[{validator:t.validateOldPassword,trigger:"blur"}],newPassword:[{validator:t.validateNewPassword,trigger:"blur"}],checkPassword:[{validator:t.validateConfirmPassword,trigger:"blur"}]}});return{store:i,ruleFormRef:p,userChangeInfo:l,changeProfilevisible:w,changePasswordVisible:n,...I(t),...I(e),...I(m)}}});const F=e=>(H("data-v-afad8bb6"),e=e(),W(),e),he={class:"username"},Ee={key:0,class:"button-box"},Pe={class:"value"},Ie=F(()=>f("div",null,"分数",-1)),be={class:"value"},Ce=F(()=>f("div",null,"解题数",-1)),Ue=F(()=>f("div",null,"团队",-1)),ye=["id"],Ve={class:"dialog-footer"},Se=["id"],$e={class:"dialog-footer"};function Re(e,o,i,w,n,p){const l=pe,t=fe,m=ae,g=M,u=re,d=X,c=se,U=ue,k=ie,D=de;return h(),$(J,null,[e.userInfo?(h(),y(d,{key:0},{default:a(()=>{var r,N,A;return[f("div",he,E((r=e.userInfo)==null?void 0:r.username),1),f("span",null,E((N=e.userInfo)==null?void 0:N.describe),1),e.store.getters["UserInfo/isUserSelf"]((A=e.userInfo)==null?void 0:A.id)?(h(),$("div",Ee,[s(l,{type:"primary",onClick:o[0]||(o[0]=v=>e.changeProfilevisible=!0)},{default:a(()=>[_("修改资料")]),_:1}),s(l,{type:"primary",onClick:o[1]||(o[1]=v=>e.changePasswordVisible=!0)},{default:a(()=>[_("修改密码")]),_:1})])):S("",!0),s(t),s(u,{justify:"space-between",class:"user-info"},{default:a(()=>[s(m,{span:6,class:"score"},{default:a(()=>{var v;return[f("div",Pe,E((v=e.userInfo)==null?void 0:v.total_score),1),Ie]}),_:1}),s(m,{span:6,class:"solve"},{default:a(()=>{var v,b;return[f("div",be,E((b=(v=e.userInfo)==null?void 0:v.solve_record)==null?void 0:b.length),1),Ce]}),_:1}),s(m,{span:6,class:"team"},{default:a(()=>{var v,b,T;return[(v=e.userInfo)!=null&&v.team?(h(),y(g,{key:0,href:"/team/"+((T=(b=e.userInfo)==null?void 0:b.team)==null?void 0:T.id),type:"danger",class:"value"},{default:a(()=>{var Y,O;return[_(E((O=(Y=e.userInfo)==null?void 0:Y.team)==null?void 0:O.name),1)]}),_:1},8,["href"])):(h(),y(g,{key:1,type:"danger",class:"value",underline:!1},{default:a(()=>[_("-")]),_:1})),Ue]}),_:1})]),_:1})]}),_:1})):S("",!0),s(D,{modelValue:e.changeProfilevisible,"onUpdate:modelValue":o[4]||(o[4]=r=>e.changeProfilevisible=r),title:"Warning",width:"30%","align-center":""},{header:a(({titleId:r})=>[f("h3",{id:r},"修改个人信息",8,ye)]),footer:a(()=>[f("span",Ve,[s(l,{onClick:o[3]||(o[3]=r=>e.changeProfilevisible=!1)},{default:a(()=>[_("取消")]),_:1}),s(l,{type:"primary",onClick:e.changeUserInfo},{default:a(()=>[_("确认")]),_:1},8,["onClick"])])]),default:a(()=>[s(k,{"label-width":"100px"},{default:a(()=>[s(U,{label:"个人简介"},{default:a(()=>[s(c,{modelValue:e.userChangeInfo.describe,"onUpdate:modelValue":o[2]||(o[2]=r=>e.userChangeInfo.describe=r)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),s(D,{modelValue:e.changePasswordVisible,"onUpdate:modelValue":o[10]||(o[10]=r=>e.changePasswordVisible=r),title:"Warning",width:"30%","align-center":""},{header:a(({titleId:r})=>[f("h3",{id:r},"修改密码",8,Se)]),footer:a(()=>[f("span",$e,[s(l,{onClick:o[8]||(o[8]=r=>e.changePasswordVisible=!1)},{default:a(()=>[_("取消")]),_:1}),s(l,{type:"primary",onClick:o[9]||(o[9]=r=>e.submitPasswordForm(e.ruleFormRef))},{default:a(()=>[_("确认")]),_:1})])]),default:a(()=>[s(k,{"label-width":"100px",ref:"ruleFormRef",model:e.passwordInfo,rules:e.rules},{default:a(()=>[s(U,{label:"原密码",prop:"oldPassword"},{default:a(()=>[s(c,{modelValue:e.passwordInfo.oldPassword,"onUpdate:modelValue":o[5]||(o[5]=r=>e.passwordInfo.oldPassword=r),type:"password",autocomplete:"off"},null,8,["modelValue"])]),_:1}),s(U,{label:"修改密码",prop:"newPassword"},{default:a(()=>[s(c,{modelValue:e.passwordInfo.newPassword,"onUpdate:modelValue":o[6]||(o[6]=r=>e.passwordInfo.newPassword=r),type:"password",autocomplete:"off"},null,8,["modelValue"])]),_:1}),s(U,{label:"确认密码",prop:"checkPassword"},{default:a(()=>[s(c,{modelValue:e.passwordInfo.checkPassword,"onUpdate:modelValue":o[7]||(o[7]=r=>e.passwordInfo.checkPassword=r),type:"password",autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue"])],64)}const Z=B(ve,[["render",Re],["__scopeId","data-v-afad8bb6"]]),Be=R({name:"UserView",props:{},components:{UserProfile:Z,SolveRecord:z},setup(){const e=K(),o=P(),i=P(),w=C({loadAll:()=>{j(Number(e.params.id)).then(n=>{o.value=n.data}),L(Number(e.params.id)).then(n=>{i.value=n.data})},hanldeUserSolveRecordChange:n=>{L(Number(e.params.id),n).then(p=>{i.value=p.data})},handleChangePassword:(n,p,l)=>{x(n,p,l).then(t=>{V.success({title:"修改密码成功"})},t=>{V.error({title:"密码修改失败",message:"原密码错误"})})},handleChangeUserInfo:(n,p)=>{ee(n,p).then(l=>{j(Number(e.params.id)).then(t=>{o.value=t.data}),V.success({title:"修改个人资料成功"})})}});return Q(()=>{w.loadAll()}),{userInfo:o,userSolveRecord:i,...I(w)}}});const Fe={class:"user"};function ke(e,o,i,w,n,p){const l=Z,t=z;return h(),$("div",Fe,[s(l,{userInfo:e.userInfo,onChangePassword:e.handleChangePassword,onChangeUserInfo:e.handleChangeUserInfo},null,8,["userInfo","onChangePassword","onChangeUserInfo"]),s(t,{userSolveRecord:e.userSolveRecord,onUserSolveRecordChange:e.hanldeUserSolveRecordChange},null,8,["userSolveRecord","onUserSolveRecordChange"])])}const ze=B(Be,[["render",ke],["__scopeId","data-v-7a039405"]]);export{ze as default};