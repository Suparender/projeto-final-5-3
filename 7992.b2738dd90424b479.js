"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7992],{7992:(U,g,c)=>{c.r(g),c.d(g,{HomePageModule:()=>v});var m=c(6814),h=c(95),n=c(7852),l=c(7928),t=c(9468),d=c(4073),f=c(6033),p=c(553);function Z(e,a){if(1&e){const o=t.EpF();t.TgZ(0,"ion-accordion",8)(1,"ion-item",9)(2,"ion-label")(3,"strong"),t._uU(4,"Assunto: "),t.qZA(),t._uU(5),t.qZA()(),t.TgZ(6,"div",10),t.NdJ("click",function(){const r=t.CHM(o).index,i=t.oxw(2);return t.KtG(i.viewDoc(i.documentsId[r]))}),t.TgZ(7,"ion-card")(8,"ion-card-header"),t._UZ(9,"img",11),t.qZA(),t.TgZ(10,"ion-card-content")(11,"p")(12,"strong"),t._uU(13,"Nome: "),t.qZA(),t._uU(14),t.qZA(),t.TgZ(15,"p")(16,"strong"),t._uU(17,"E-mail: "),t.qZA(),t._uU(18),t.qZA(),t.TgZ(19,"p")(20,"strong"),t._uU(21,"Assunto: "),t.qZA(),t._uU(22),t.qZA(),t.TgZ(23,"p")(24,"strong"),t._uU(25,"Data: "),t.qZA(),t._uU(26),t.ALo(27,"date"),t.ALo(28,"date"),t.qZA()()()()()}if(2&e){const o=a.$implicit,s=t.oxw(2);t.xp6(5),t.hij(" ",s.general.formatText(o.form.subject),""),t.xp6(4),t.s9C("src",o.imagem.url,t.LSH),t.MGl("alt","Imagem do contato ",o.name,""),t.xp6(5),t.hij(" ",s.general.formatText(o.form.name),""),t.xp6(4),t.hij(" ",s.general.formatText(o.form.email),""),t.xp6(4),t.hij(" ",s.general.formatText(o.form.subject),""),t.xp6(4),t.AsE(" ",t.xi3(27,8,o.date,"dd/MM/yyyy")," \xe0s ",t.xi3(28,11,o.date,"H:m"),".")}}function A(e,a){if(1&e&&(t.TgZ(0,"ion-accordion-group")(1,"ion-item"),t._uU(2,"Lista de contatos"),t.qZA(),t.YNc(3,Z,29,14,"ion-accordion",7),t.qZA()),2&e){const o=t.oxw();t.xp6(3),t.Q6J("ngForOf",o.documents)}}function x(e,a){1&e&&(t.TgZ(0,"ion-card")(1,"ion-card-content")(2,"p"),t._uU(3,"Nenhum contato encontrado."),t.qZA(),t.TgZ(4,"p"),t._uU(5,"Entre em contato clicando no bot\xe3o abaixo."),t.qZA(),t.TgZ(6,"ion-button",12),t._UZ(7,"ion-icon",13),t._uU(8," Contate-nos "),t.qZA()()())}const T=[{path:"",component:(()=>{class e{constructor(){this.env=p.N,this.firestore=(0,t.f3M)(d.gg),this.router=(0,t.f3M)(l.F0),this.general=(0,t.f3M)(f.m),this.Collection=(0,d.hJ)(this.firestore,"contacts"),this.unsubscribeSnapshot=null,this.documentsId=new Array,this.documents=new Array}ngOnInit(){this.getDocuments()}ngOnDestroy(){this.documents=[],this.documentsId=[],this.unsubscribeSnapshot&&this.unsubscribeSnapshot()}getDocuments(){this.documents=[],this.documentsId=[],this.unsubscribeSnapshot&&this.unsubscribeSnapshot();const o=(0,d.IO)(this.Collection,(0,d.ar)("status","==","received"),(0,d.Xo)("date","asc"));(0,d.cf)(o,u=>{u.docChanges().forEach(r=>{if("added"===r.type&&(this.documentsId.push(r.doc.id),this.documents.push(r.doc.data())),"modified"===r.type)for(let i=0;i<this.documentsId.length;i++)if(this.documentsId[i]===r.doc.id){this.documents.splice(i,1),this.documents.splice(i,0,r.doc.data());break}if("removed"===r.type){for(let i=0;i<this.documents.length;i++)if(this.arraysEqual(this.documents[i],r.doc.data())){this.documents.splice(i,1);break}for(let i=0;i<this.documentsId.length;i++)if(this.documentsId[i]===r.doc.id){this.documentsId.splice(i,1);break}}})})}arraysEqual(o,s){if(o.length!==s.length)return!1;for(let u=0;u<o.length;u++)if(o[u]!==s[u])return!1;return!0}viewDoc(o){this.router.navigate(["/view"],{state:{index:o}})}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-home"]],decls:15,vars:5,consts:[[3,"translucent"],["slot","start"],[1,"ion-text-center"],["name","home","slot","end","size","large",1,"ion-margin"],[1,"ion-padding"],[4,"ngIf"],["target","_blank","title","copyright",3,"href"],["style","cursor: pointer;",4,"ngFor","ngForOf"],[2,"cursor","pointer"],["slot","header"],["slot","content",1,"ion-padding",3,"click"],[2,"width","100px",3,"src","alt"],["routerLink","/contact"],["name","chatbubbles","slot","start"]],template:function(o,s){1&o&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),t._UZ(3,"ion-menu-button"),t.qZA(),t.TgZ(4,"ion-title",2),t._uU(5,"\xcdnicio"),t.qZA(),t._UZ(6,"ion-icon",3),t.qZA()(),t.TgZ(7,"ion-content",4),t.YNc(8,A,4,1,"ion-accordion-group",5),t.YNc(9,x,9,0,"ion-card",5),t.qZA(),t.TgZ(10,"ion-footer")(11,"ion-toolbar")(12,"ion-title",2)(13,"a",6),t._uU(14),t.qZA()()()()),2&o&&(t.Q6J("translucent",!0),t.xp6(8),t.Q6J("ngIf",s.documents.length>0),t.xp6(1),t.Q6J("ngIf",0===s.documents.length),t.xp6(4),t.Q6J("href",s.env.authorUrl,t.LSH),t.xp6(1),t.hij("\xa9 2023 ",s.env.author,"."))},dependencies:[m.sg,m.O5,n.We,n.eh,n.YG,n.Sm,n.PM,n.FN,n.Zi,n.W2,n.fr,n.Gu,n.gu,n.Ie,n.Q$,n.fG,n.wd,n.sr,n.YI,l.rH,m.uU]}),e})()}];let b=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[l.Bz.forChild(T),l.Bz]}),e})(),v=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[m.ez,h.u5,n.Pc,b]}),e})()}}]);