"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[400],{9400:(De,k,c)=>{c.r(k),c.d(k,{default:()=>we});var u=c(1728),P=c(3314),d=c(1217),f=c(430),U=c(7406),Z=c(3627),O=c(3617),b=c(2480),L=c(5707),j=c(6205),e=c(2223);let Q=(()=>{class n{constructor(){}ngOnInit(){}static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-register"]],standalone:!0,features:[e.jDz],decls:1,vars:0,template:function(i,a){1&i&&e._UZ(0,"router-outlet")},dependencies:[b.lC,L.y4,f.Ps,u.ot,d.si,U.Tx,O.Nh,P.vV,j.X,Z.p0],styles:[".login-contianer{width:485px;flex-shrink:0}.login-contianer .login-card{background:#E8E8E8;border-radius:30px}.country-selector{opacity:1!important}ngx-mat-intl-tel-input div button{margin:4px 0}.active{background-color:#f97c00!important;box-shadow:0 0 5px #f97c00!important}.stepper-item{position:relative;width:32px;height:32px;border-radius:50%;background-color:#cdcdcd;box-shadow:0 0 5px #c0bebb}.stepper-item span{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;font-weight:700}.step-arrow-active{color:#f97c00}\n"],encapsulation:2,changeDetection:0})}return n})();var m=c(4755),s=c(9401),C=c(1292),h=c(9114),g=c(9609),v=c(8467),I=c(3844),z=c(1600),M=c(8023),q=c(8930);let H=(()=>{class n{static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({imports:[q.vT]})}return n})();var J=c(7579);c(1591);let x=(()=>{class n{constructor(){this.changes=new J.x,this.optionalLabel="Optional",this.completedLabel="Completed",this.editableLabel="Editable"}static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();const ie={provide:x,deps:[[new e.FiY,new e.tp0,x]],useFactory:function ne(n){return n||new x}};let w=(()=>{class n{static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({providers:[ie,d.rD],imports:[d.BQ,m.ez,M.eL,H,f.Ps,d.si,d.BQ]})}return n})();var S=c(787),D=c(5656),N=c(8951),F=c(3648);const oe=["signUpNgForm"];function se(n,r){if(1&n&&e._UZ(0,"img",38),2&n){const t=e.oxw();e.Q6J("src",t.passport,e.LSH)}}function ce(n,r){if(1&n&&e._UZ(0,"img",38),2&n){const t=e.oxw();e.Q6J("src",t.registrationCertificate,e.LSH)}}function le(n,r){if(1&n&&e._UZ(0,"img",38),2&n){const t=e.oxw();e.Q6J("src",t.logo,e.LSH)}}function pe(n,r){if(1&n&&e._UZ(0,"img",38),2&n){const t=e.oxw();e.Q6J("src",t.transportationCertificate,e.LSH)}}function de(n,r){1&n&&(e.TgZ(0,"span"),e._uU(1," \u041f\u0440\u043e\u0434\u0430\u043b\u0436\u0438\u0442\u044c "),e.qZA())}function ue(n,r){1&n&&e._UZ(0,"mat-progress-spinner",39),2&n&&e.Q6J("diameter",24)("mode","indeterminate")}const E=function(){return["uz"]},R=function(){return["uz","kz","tj","kg","ru","af"]};let me=(()=>{class n{constructor(t,i,a,o,p){this.authService=t,this.toastr=i,this.formBuilder=a,this.router=o,this.cdr=p,this.formData=new FormData,this.logo=null,this.registrationCertificate=null,this.passport=null,this.transportationCertificate=null,this.showBankAccount2=!1,this.showTrashIcon=!1}ngOnInit(){this.data={certificate_registration:"",supervisor_passport:""},this.currentUser=(0,D.o)(localStorage.getItem("tmc")),this.authService.getMerchantById(this.currentUser.merchantId).subscribe(t=>{t.success&&(this.merchant=t.data,this.initForm(this.merchant))}),this.signUpForm=this.formBuilder.group({merchantId:[null],companyName:[null],companyType:[null],password:[null],email:[null],supervisorFirstName:[null,[s.kI.required]],supervisorLastName:[null,[s.kI.required]],phoneNumber:[null,[s.kI.required]],responsiblePersonFistName:[null,[s.kI.required]],responsiblePersonLastName:[null,[s.kI.required]],responsbilePersonPhoneNumber:[null,[s.kI.required]],factAddress:[null],legalAddress:[null,[s.kI.required]],garageAddress:[null],postalCode:[null],logo:[null],passport:[null],registrationCertificate:[null],transportationCertificate:[null]})}initForm(t){this.signUpForm.patchValue({merchantId:this.merchant.id,companyName:this.merchant.companyName,companyType:this.merchant.companyType,password:this.merchant.password,email:this.merchant.email,supervisorFirstName:t.supervisorFirstName,supervisorLastName:t.supervisorLastName,phoneNumber:t.phoneNumber,postalCode:t.postalCode,garageAddress:t.garageAddress,responsiblePersonFistName:t.responsiblePersonFistName,responsiblePersonLastName:t.responsiblePersonLastName,responsbilePersonPhoneNumber:t.responsbilePersonPhoneNumber,legalAddress:t.legalAddress,factAddress:t.factAddress})}signUp(){this.signUpForm.disable(),null===this.signUpForm.value.supervisorFirstName?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0418\u043c\u044f \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f")):null===this.signUpForm.value.supervisorLastName?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0424\u0430\u043c\u0438\u043b\u0438\u044f \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f")):null===this.signUpForm.value.phoneNumber?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0422\u0435\u043b\u0435\u0444\u043e\u043d \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f")):null===this.signUpForm.value.responsiblePersonFistName?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0418\u043c\u044f \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u043b\u0438\u0446\u0430")):null===this.signUpForm.value.responsiblePersonLastName?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0424\u0430\u043c\u0438\u043b\u0438\u044f \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u043b\u0438\u0446\u0430")):null===this.signUpForm.value.responsbilePersonPhoneNumber?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0422\u0435\u043b\u0435\u0444\u043e\u043d \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u043b\u0438\u0446\u0430")):null===this.signUpForm.value.address?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u042e\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0430\u0434\u0440\u0435\u0441")):(this.formData.append("merchantId",this.currentUser.merchantId),this.formData.append("supervisorFirstName",this.signUpForm.value.supervisorFirstName),this.formData.append("supervisorLastName",this.signUpForm.value.supervisorLastName),this.formData.append("responsiblePersonFistName",this.signUpForm.value.responsiblePersonFistName),this.formData.append("responsiblePersonLastName",this.signUpForm.value.responsiblePersonLastName),this.formData.append("responsbilePersonPhoneNumber",this.signUpForm.value.responsbilePersonPhoneNumber),this.formData.append("factAddress",this.signUpForm.value.factAddress),this.formData.append("legalAddress",this.signUpForm.value.legalAddress),this.formData.append("garageAddress",this.signUpForm.value.garageAddress),this.formData.append("postalCode",this.signUpForm.value.postalCode),this.authService.merchantUpdate(this.formData).subscribe(t=>{t.success&&(this.signUpForm.enable(),this.router.navigate(["register/step3"]))},t=>{this.signUpForm.enable(),this.toastr.error(t.message)}))}selectFile(t,i){const a=t.target.files[0];if(a){this.formData.append(i,a,(new Date).getTime().toString()+".jpg");const o=new FileReader;o.onload=()=>{this[i]=o.result,this.cdr.detectChanges()},o.readAsDataURL(a)}}static#e=this.\u0275fac=function(i){return new(i||n)(e.Y36(N.e),e.Y36(F._W),e.Y36(s.qu),e.Y36(b.F0),e.Y36(e.sBO))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["auth-step-2"]],viewQuery:function(i,a){if(1&i&&e.Gf(oe,5),2&i){let o;e.iGM(o=e.CRH())&&(a.signUpNgForm=o.first)}},standalone:!0,features:[e.jDz],decls:114,vars:38,consts:[[1,"flex","justify-center","items-center","h-full","w-full"],[1,"login-contianer"],[1,"mt-2","p-8","login-card"],[1,"flex","justify-between","items-center"],[1,"text-5xl","md:text-4xl","sm:text-3xl","font-extrabold","tracking-tight","leading-tight"],[1,"flex","items-center","gap-1"],[1,"stepper-item","active"],["svgIcon","heroicons_outline:arrow-long-right",1,"step-arrow-active"],["svgIcon","heroicons_outline:arrow-long-right",1,"step-arrow"],[1,"stepper-item"],[1,"mt-8","w-full",3,"formGroup"],["signInNgForm","ngForm"],[1,"flex","w-full","gap-2"],[1,"w-full"],["matInput","",3,"formControlName"],["name","phoneNumber",3,"formControlName","preferredCountries","onlyCountries"],["phone",""],["formControlName","responsbilePersonPhoneNumber","name","responsbilePersonPhoneNumber",3,"preferredCountries","onlyCountries"],["responsbilePersonPhoneNumber",""],[1,"flex","items-end","gap-8"],[1,"w-32"],[1,"font-bold"],[1,"relative","flex","items-center","justify-center","w-32","h-32","overflow-hidden"],[1,"absolute","inset-0","bg-black","bg-opacity-50","z-10","rounded-md"],[1,"absolute","inset-0","flex","items-center","justify-center","z-20"],["formControlName","passport","id","avatar-file-input1","type","file",1,"absolute","h-0","w-0","opacity-0","invisible","pointer-events-none",3,"multiple","accept","change"],["for","avatar-file-input1","matRipple","",1,"flex","items-center","justify-center","w-10","h-10","rounded-full","cursor-pointer","hover:bg-hover"],[1,"text-white",3,"svgIcon"],["class","object-fill w-full h-full",3,"src",4,"ngIf"],["formControlName","registrationCertificate","id","avatar-file-input4","type","file",1,"absolute","h-0","w-0","opacity-0","invisible","pointer-events-none",3,"multiple","accept","change"],["for","avatar-file-input4","matRipple","",1,"flex","items-center","justify-center","w-10","h-10","rounded-full","cursor-pointer","hover:bg-hover"],["formControlName","logo","id","avatar-file-input2","type","file",1,"absolute","h-0","w-0","opacity-0","invisible","pointer-events-none",3,"multiple","accept","change"],["for","avatar-file-input2","matRipple","",1,"flex","items-center","justify-center","w-10","h-10","rounded-full","cursor-pointer","hover:bg-hover"],["formControlName","transportationCertificate","id","avatar-file-input3","type","file",1,"absolute","h-0","w-0","opacity-0","invisible","pointer-events-none",3,"multiple","accept","change"],["for","avatar-file-input3","matRipple","",1,"flex","items-center","justify-center","w-10","h-10","rounded-full","cursor-pointer","hover:bg-hover"],["mat-flat-button","",1,"fuse-mat-button-large","dark","w-full","mt-10",3,"color","disabled","click"],[4,"ngIf"],[3,"diameter","mode",4,"ngIf"],[1,"object-fill","w-full","h-full",3,"src"],[3,"diameter","mode"]],template:function(i,a){1&i&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),e._uU(5," \u0420\u0415\u0413\u0418\u0421\u0422\u0420\u0410\u0426\u0418\u042f "),e.qZA(),e.TgZ(6,"div",5)(7,"div",6)(8,"span"),e._uU(9,"1"),e.qZA()(),e._UZ(10,"mat-icon",7),e.TgZ(11,"div",6)(12,"span"),e._uU(13,"2"),e.qZA()(),e._UZ(14,"mat-icon",8),e.TgZ(15,"div",9)(16,"span"),e._uU(17,"3"),e.qZA()()()(),e.TgZ(18,"form",10,11)(20,"div",12)(21,"mat-form-field",13)(22,"mat-label"),e._uU(23,"\u0418\u043c\u044f \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f"),e.qZA(),e._UZ(24,"input",14),e.qZA(),e.TgZ(25,"mat-form-field",13)(26,"mat-label"),e._uU(27,"\u0424\u0430\u043c\u0438\u043b\u0438\u044f \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f"),e.qZA(),e._UZ(28,"input",14),e.qZA(),e.TgZ(29,"mat-form-field",13)(30,"mat-label"),e._uU(31,"\u0422\u0435\u043b\u0435\u0444\u043e\u043d"),e.qZA(),e._UZ(32,"ngx-mat-intl-tel-input",15,16),e.qZA()(),e.TgZ(34,"div",12)(35,"mat-form-field",13)(36,"mat-label"),e._uU(37,"\u0418\u043c\u044f \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u043b\u0438\u0446\u0430"),e.qZA(),e._UZ(38,"input",14),e.qZA(),e.TgZ(39,"mat-form-field",13)(40,"mat-label"),e._uU(41,"\u0424\u0430\u043c\u0438\u043b\u0438\u044f \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u043b\u0438\u0446\u0430"),e.qZA(),e._UZ(42,"input",14),e.qZA(),e.TgZ(43,"mat-form-field",13)(44,"mat-label"),e._uU(45,"\u0422\u0435\u043b\u0435\u0444\u043e\u043d \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u043b\u0438\u0446\u0430"),e.qZA(),e._UZ(46,"ngx-mat-intl-tel-input",17,18),e.qZA()(),e.TgZ(48,"div",12)(49,"mat-form-field",13)(50,"mat-label"),e._uU(51,"\u0410\u0434\u0440\u0435\u0441 \u0433\u0430\u0440\u0430\u0436\u0430 "),e.qZA(),e._UZ(52,"input",14),e.qZA(),e.TgZ(53,"mat-form-field",13)(54,"mat-label"),e._uU(55,"\u041f\u043e\u0447\u0442\u043e\u044b\u0439 \u0438\u043d\u0434\u0435\u043a\u0441"),e.qZA(),e._UZ(56,"input",14),e.qZA()(),e.TgZ(57,"div",12)(58,"mat-form-field",13)(59,"mat-label"),e._uU(60,"\u042e\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0430\u0434\u0440\u0435\u0441"),e.qZA(),e._UZ(61,"input",14),e.qZA(),e.TgZ(62,"mat-form-field",13)(63,"mat-label"),e._uU(64,"\u0424\u0430\u043a\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0430\u0434\u0440\u0435\u0441"),e.qZA(),e._UZ(65,"input",14),e.qZA()(),e.TgZ(66,"div",19)(67,"div",20)(68,"mat-label",21),e._uU(69,"\u041f\u0430\u0441\u043f\u043e\u0440\u0442 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0438\u0442\u0435\u043b\u044f"),e.qZA(),e.TgZ(70,"div",22),e._UZ(71,"div",23),e.TgZ(72,"div",24)(73,"div")(74,"input",25),e.NdJ("change",function(p){return a.selectFile(p,"passport")}),e.qZA(),e.TgZ(75,"label",26),e._UZ(76,"mat-icon",27),e.qZA()()(),e.YNc(77,se,1,1,"img",28),e.qZA()(),e.TgZ(78,"div",20)(79,"mat-label",21),e._uU(80,"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u0430"),e.qZA(),e.TgZ(81,"div",22),e._UZ(82,"div",23),e.TgZ(83,"div",24)(84,"div")(85,"input",29),e.NdJ("change",function(p){return a.selectFile(p,"registrationCertificate")}),e.qZA(),e.TgZ(86,"label",30),e._UZ(87,"mat-icon",27),e.qZA()()(),e.YNc(88,ce,1,1,"img",28),e.qZA()(),e.TgZ(89,"div",20)(90,"mat-label",21),e._uU(91,"\u041b\u043e\u0433\u043e\u0442\u0438\u043f"),e.qZA(),e.TgZ(92,"div",22),e._UZ(93,"div",23),e.TgZ(94,"div",24)(95,"div")(96,"input",31),e.NdJ("change",function(p){return a.selectFile(p,"logo")}),e.qZA(),e.TgZ(97,"label",32),e._UZ(98,"mat-icon",27),e.qZA()()(),e.YNc(99,le,1,1,"img",28),e.qZA()(),e.TgZ(100,"div",20)(101,"mat-label",21),e._uU(102,"\u041b\u0438\u0446\u0435\u043d\u0437\u0438\u044f \u0434\u043b\u044f \u043f\u0435\u0440\u0435\u0432\u043e\u0437\u043a\u0438 \u0433\u0440\u0443\u0437\u0430"),e.qZA(),e.TgZ(103,"div",22),e._UZ(104,"div",23),e.TgZ(105,"div",24)(106,"div")(107,"input",33),e.NdJ("change",function(p){return a.selectFile(p,"transportationCertificate")}),e.qZA(),e.TgZ(108,"label",34),e._UZ(109,"mat-icon",27),e.qZA()()(),e.YNc(110,pe,1,1,"img",28),e.qZA()()(),e.TgZ(111,"button",35),e.NdJ("click",function(){return a.signUp()}),e.YNc(112,de,2,0,"span",36),e.YNc(113,ue,1,2,"mat-progress-spinner",37),e.qZA()()()()()),2&i&&(e.xp6(18),e.Q6J("formGroup",a.signUpForm),e.xp6(6),e.Q6J("formControlName","supervisorFirstName"),e.xp6(4),e.Q6J("formControlName","supervisorLastName"),e.xp6(4),e.Q6J("formControlName","phoneNumber")("preferredCountries",e.DdM(34,E))("onlyCountries",e.DdM(35,R)),e.xp6(6),e.Q6J("formControlName","responsiblePersonFistName"),e.xp6(4),e.Q6J("formControlName","responsiblePersonLastName"),e.xp6(4),e.Q6J("preferredCountries",e.DdM(36,E))("onlyCountries",e.DdM(37,R)),e.xp6(6),e.Q6J("formControlName","garageAddress"),e.xp6(4),e.Q6J("formControlName","postalCode"),e.xp6(5),e.Q6J("formControlName","legalAddress"),e.xp6(4),e.Q6J("formControlName","factAddress"),e.xp6(9),e.Q6J("multiple",!1)("accept","image/jpeg, image/png"),e.xp6(2),e.Q6J("svgIcon","heroicons_outline:camera"),e.xp6(1),e.Q6J("ngIf",a.passport),e.xp6(8),e.Q6J("multiple",!1)("accept","image/jpeg, image/png"),e.xp6(2),e.Q6J("svgIcon","heroicons_outline:camera"),e.xp6(1),e.Q6J("ngIf",a.registrationCertificate),e.xp6(8),e.Q6J("multiple",!1)("accept","image/jpeg, image/png"),e.xp6(2),e.Q6J("svgIcon","heroicons_outline:camera"),e.xp6(1),e.Q6J("ngIf",a.logo),e.xp6(8),e.Q6J("multiple",!1)("accept","image/jpeg, image/png"),e.xp6(2),e.Q6J("svgIcon","heroicons_outline:camera"),e.xp6(1),e.Q6J("ngIf",a.transportationCertificate),e.xp6(1),e.Q6J("color","primary")("disabled",a.signUpForm.disabled),e.xp6(1),e.Q6J("ngIf",!a.signUpForm.disabled),e.xp6(1),e.Q6J("ngIf",a.signUpForm.disabled))},dependencies:[w,m.ez,m.O5,C.p9,f.Ps,f.Hw,S.LD,h.KE,h.hX,s.u5,s._Y,s.Fj,s.JJ,s.JL,s.UX,s.sg,s.u,h.lN,g.c,g.Nt,u.ot,u.lW,v.Cq,v.Ou,z.d],styles:[".login-contianer{width:1040px}\n"],encapsulation:2,data:{animation:I.L}})}return n})();var he=c(5441);let ge=(()=>{class n{static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({imports:[he.U8,M.eL,m.ez,u.ot,d.BQ,d.BQ]})}return n})();var be=c(3933),xe=c(2621);const Se=["signUpNgForm"];function ye(n,r){if(1&n&&(e.TgZ(0,"mat-option",32),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.name)}}function ke(n,r){if(1&n&&(e.TgZ(0,"mat-option",32),e._uU(1),e.qZA()),2&n){const t=r.$implicit;e.Q6J("value",t.id),e.xp6(1),e.Oqu(t.name)}}function Ce(n,r){if(1&n&&(e.TgZ(0,"div",14)(1,"mat-form-field",15)(2,"mat-label"),e._uU(3,"\u0420\u0430\u0441\u0447\u0435\u0442\u043d\u044b\u0439 \u0441\u0447\u0435\u0442"),e.qZA(),e._UZ(4,"input",33),e.TgZ(5,"mat-select",34),e.YNc(6,ke,2,2,"mat-option",18),e.qZA()()()),2&n){const t=e.oxw(2);e.xp6(6),e.Q6J("ngForOf",t.currencies)}}function Ie(n,r){1&n&&(e.TgZ(0,"span"),e._uU(1," \u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c "),e.qZA())}function Me(n,r){1&n&&e._UZ(0,"mat-progress-spinner",35),2&n&&e.Q6J("diameter",24)("mode","indeterminate")}const Ae=function(){return["/register/step2"]};function Te(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"div",5),e._uU(5," \u0420\u0415\u0413\u0418\u0421\u0422\u0420\u0410\u0426\u0418\u042f "),e.qZA(),e.TgZ(6,"div",6)(7,"div",7)(8,"span"),e._uU(9,"1"),e.qZA()(),e._UZ(10,"mat-icon",8),e.TgZ(11,"div",7)(12,"span"),e._uU(13,"2"),e.qZA()(),e._UZ(14,"mat-icon",8),e.TgZ(15,"div",7)(16,"span"),e._uU(17,"3"),e.qZA()()()(),e.TgZ(18,"form",9,10)(20,"div",11)(21,"mat-form-field",12)(22,"mat-label"),e._uU(23,"\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u0431\u0430\u043d\u043a\u0430"),e.qZA(),e._UZ(24,"input",13),e.qZA(),e.TgZ(25,"mat-form-field",12)(26,"mat-label"),e._uU(27,"\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u0444\u0438\u043b\u0438\u0430\u043b\u0430 \u0431\u0430\u043d\u043a\u0430"),e.qZA(),e._UZ(28,"input",13),e.qZA(),e.TgZ(29,"div",14)(30,"mat-form-field",15)(31,"mat-label"),e._uU(32,"\u0420\u0430\u0441\u0447\u0435\u0442\u043d\u044b\u0439 \u0441\u0447\u0435\u0442"),e.qZA(),e._UZ(33,"input",16),e.TgZ(34,"mat-select",17),e.YNc(35,ye,2,2,"mat-option",18),e.qZA()()(),e.YNc(36,Ce,7,1,"div",19),e.TgZ(37,"button",20),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.toggleShowBankAccount2())}),e.TgZ(38,"mat-icon"),e._uU(39),e.qZA()()(),e.TgZ(40,"div",21)(41,"mat-form-field",12)(42,"mat-label"),e._uU(43,"\u0418\u041d\u041d"),e.qZA(),e._UZ(44,"input",22),e.qZA(),e.TgZ(45,"mat-form-field",12)(46,"mat-label"),e._uU(47,"\u041a\u043e\u0434 \u043f\u043b\u0430\u0442\u0435\u043b\u044c\u0449\u0438\u043a\u0430 \u041d\u0414\u0421"),e.qZA(),e._UZ(48,"input",23),e.qZA(),e.TgZ(49,"mat-form-field",12)(50,"mat-label"),e._uU(51,"\u041e\u041a\u042d\u0414"),e.qZA(),e._UZ(52,"input",24),e.qZA()(),e.TgZ(53,"div",21)(54,"mat-form-field",12)(55,"mat-label"),e._uU(56,"\u041c\u0424\u041e"),e.qZA(),e._UZ(57,"input",24),e.qZA(),e.TgZ(58,"mat-form-field",12)(59,"mat-label"),e._uU(60,"DUNS \u043d\u043e\u043c\u0435\u0440"),e.qZA(),e._UZ(61,"input",22),e.qZA(),e.TgZ(62,"mat-form-field",12)(63,"mat-label"),e._uU(64,"IBAN \u043d\u043e\u043c\u0435\u0440"),e.qZA(),e._UZ(65,"input",25),e.qZA()(),e.TgZ(66,"div",21)(67,"mat-form-field",12)(68,"mat-label"),e._uU(69,"\u0417\u0430\u043c\u0435\u0442\u043a\u0438"),e.qZA(),e._UZ(70,"input",13),e.qZA()(),e.TgZ(71,"div",26)(72,"a",27),e._UZ(73,"mat-icon",28),e._uU(74," \u041d\u0430\u0437\u0430\u0434 "),e.qZA(),e.TgZ(75,"button",29),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.signUp())}),e.YNc(76,Ie,2,0,"span",30),e.YNc(77,Me,1,2,"mat-progress-spinner",31),e.qZA()()()()()()}if(2&n){const t=e.oxw();e.xp6(18),e.Q6J("formGroup",t.signUpForm),e.xp6(6),e.Q6J("formControlName","bankName"),e.xp6(4),e.Q6J("formControlName","bankBranchName"),e.xp6(7),e.Q6J("ngForOf",t.currencies),e.xp6(1),e.Q6J("ngIf",t.showBankAccount2),e.xp6(3),e.Oqu(t.showTrashIcon?"delete":"add"),e.xp6(5),e.Q6J("formControlName","inn"),e.xp6(4),e.Q6J("formControlName","taxPayerCode"),e.xp6(4),e.Q6J("formControlName","oked"),e.xp6(5),e.Q6J("formControlName","mfo"),e.xp6(4),e.Q6J("formControlName","dunsNumber"),e.xp6(4),e.Q6J("formControlName","ibanNumber"),e.xp6(5),e.Q6J("formControlName","notes"),e.xp6(2),e.Q6J("routerLink",e.DdM(19,Ae))("color","primary"),e.xp6(3),e.Q6J("color","primary")("disabled",t.signUpForm.disabled),e.xp6(1),e.Q6J("ngIf",!t.signUpForm.disabled),e.xp6(1),e.Q6J("ngIf",t.signUpForm.disabled)}}function Be(n,r){1&n&&(e.TgZ(0,"div",1)(1,"div",36)(2,"div",37)(3,"div",38)(4,"div",39),e._UZ(5,"img",40),e.qZA(),e.TgZ(6,"p",41),e._uU(7,"\u0412\u0430\u0448\u0430 \u0437\u0430\u044f\u0432\u043a\u0430 \u043f\u0440\u0438\u043d\u044f\u0442\u0430 \u043d\u0430 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443"),e.qZA(),e.TgZ(8,"p",42),e._uU(9,"\u041e\u0442\u0432\u0435\u0442 \u043f\u0440\u0438\u0434\u0435\u0442 \u043a \u0432\u0430\u043c \u043d\u0430 \u043f\u043e\u0447\u0442\u0443"),e.qZA()()()()())}const we=[{path:"",component:Q,resolve:{},children:[{path:"step2",component:me},{path:"step3",component:(()=>{class n{constructor(t,i,a,o){this.authService=t,this.typesService=i,this.toastr=a,this.formBuilder=o,this.showBankAccount2=!1,this.showTrashIcon=!1,this.completed=!1}ngOnInit(){this.currentUser=(0,D.o)(localStorage.getItem("tmc")),this.authService.getMerchantById(this.currentUser.merchantId).subscribe(t=>{t.success&&(this.merchant=t.data,this.merchant.completed&&!this.merchant.verified&&!this.merchant.rejected&&(this.completed=!0))}),this.signUpForm=this.formBuilder.group({companyName:[null],companyType:[null],password:[null],email:[null],phoneNumber:[null],merchantId:[null],responsiblePersonLastName:[null],responsiblePersonFistName:[null],registrationCertificate:[null],passport:[null],logo:[null],responsbilePersonPhoneNumber:[null],supervisorFirstName:[null],supervisorLastName:[null],legalAddress:[null],factAddress:[null],bankAccounts:[null],currency:[null,[s.kI.required]],bankAccount:[null,[s.kI.required,s.kI.maxLength(20),s.kI.minLength(20),s.kI.pattern("^[0-9]*$")]],currency2:[null],bankAccount2:[null,[s.kI.minLength(20),s.kI.maxLength(20),s.kI.pattern("^[0-9]*$")]],bankName:[null,[s.kI.required]],bankBranchName:[null,[s.kI.required]],inn:[null,[s.kI.required]],taxPayerCode:[null,[s.kI.minLength(12),s.kI.maxLength(12),s.kI.required]],oked:[null,[s.kI.required]],mfo:[null,[s.kI.required,s.kI.required,s.kI.maxLength(5),s.kI.minLength(5),s.kI.pattern("^[0-9]*$")]],dunsNumber:[null],ibanNumber:[null],notes:[null]}),this.typesService.getCurrencies().subscribe(t=>{t.success&&(this.currencies=t.data,this.signUpForm.patchValue({currency:this.currencies[0].id,currency2:this.currencies[0].id}))})}signUp(){this.signUpForm.disable(),""===this.signUpForm.value.bankName?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u0431\u0430\u043d\u043a\u0430")):""===this.signUpForm.value.bankAccount?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0420\u0430\u0441\u0447\u0435\u0442\u043d\u044b\u0439 \u0441\u0447\u0435\u0442")):""===this.signUpForm.value.inn?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u0418\u041d\u041d")):""===this.signUpForm.value.taxPayerCode?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u041a\u043e\u0434 \u043f\u043b\u0430\u0442\u0435\u043b\u044c\u0449\u0438\u043a\u0430 \u041d\u0414\u0421")):""===this.signUpForm.value.oked?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u041a\u043e\u0434 \u043f\u043b\u0430\u0442\u0435\u043b\u044c\u0449\u0438\u043a\u0430 \u041e\u041a\u042d\u0414")):""===this.signUpForm.value.mfo?(this.signUpForm.enable(),this.toastr.error("\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0443\u043a\u0430\u0437\u0430\u0442\u044c \u041a\u043e\u0434 \u043f\u043b\u0430\u0442\u0435\u043b\u044c\u0449\u0438\u043a\u0430 \u041c\u0424\u041e")):(this.signUpForm.patchValue(""==this.signUpForm.value.bankAccount2?{responsiblePersonLastName:this.merchant.responsiblePersonLastName,responsiblePersonFistName:this.merchant.responsiblePersonFistName,registrationCertificate:this.merchant.registrationCertificate,passport:this.merchant.passport,logo:this.merchant.logo,responsbilePersonPhoneNumber:this.merchant.responsbilePersonPhoneNumber,supervisorFirstName:this.merchant.supervisorFirstName,supervisorLastName:this.merchant.supervisorLastName,legalAddress:this.merchant.legalAddress,factAddress:this.merchant.factAddress,merchantId:+this.merchant.id,companyName:this.merchant.companyName,companyType:this.merchant.companyType,password:this.merchant.password,phoneNumber:this.merchant.phoneNumber,email:this.merchant.email,bankAccounts:[{account:+this.signUpForm.value.bankAccount,currencyId:this.signUpForm.value.currency},{account:+this.signUpForm.value.bankAccount2,currencyId:this.signUpForm.value.currency2}]}:{responsiblePersonLastName:this.merchant.responsiblePersonLastName,responsiblePersonFistName:this.merchant.responsiblePersonFistName,registrationCertificate:this.merchant.registrationCertificate,passport:this.merchant.passport,logo:this.merchant.logo,responsbilePersonPhoneNumber:this.merchant.responsbilePersonPhoneNumber,supervisorFirstName:this.merchant.supervisorFirstName,supervisorLastName:this.merchant.supervisorLastName,legalAddress:this.merchant.legalAddress,factAddress:this.merchant.factAddress,merchantId:+this.merchant.id,companyName:this.merchant.companyName,companyType:this.merchant.companyType,password:this.merchant.password,phoneNumber:this.merchant.phoneNumber,email:this.merchant.email,bankAccounts:[{account:+this.signUpForm.value.bankAccount,currencyId:this.signUpForm.value.currency}]}),this.signUpForm.enable(),this.authService.merchantComplete(this.signUpForm.value).subscribe(t=>{t.success&&(this.completed=!0,this.signUpForm.enable())},t=>{this.signUpForm.enable(),this.toastr.error(t.error.message)}))}toggleShowBankAccount2(){this.showBankAccount2=!this.showBankAccount2,this.showTrashIcon=!this.showTrashIcon}static#e=this.\u0275fac=function(i){return new(i||n)(e.Y36(N.e),e.Y36(xe.K),e.Y36(F._W),e.Y36(s.qu))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["auth-step-3"]],viewQuery:function(i,a){if(1&i&&e.Gf(Se,5),2&i){let o;e.iGM(o=e.CRH())&&(a.signUpNgForm=o.first)}},standalone:!0,features:[e.jDz],decls:2,vars:2,consts:[["class","flex justify-center items-center h-full w-full",4,"ngIf"],[1,"flex","justify-center","items-center","h-full","w-full"],[1,"login-contianer"],[1,"mt-2","p-8","login-card"],[1,"flex","justify-between","items-center"],[1,"text-5xl","md:text-4xl","sm:text-3xl","font-extrabold","tracking-tight","leading-tight"],[1,"flex","items-center","gap-1"],[1,"stepper-item","active"],["svgIcon","heroicons_outline:arrow-long-right",1,"step-arrow-active"],[1,"mt-8","w-full",3,"formGroup"],["signInNgForm","ngForm"],[1,"flex","items-center","w-full","gap-2"],[1,"w-full"],["matInput","",3,"formControlName"],[1,"flex","w-full"],[1,"flex-auto"],["matInput","","formControlName","bankAccount","type","text","mask","99999999999999999999"],["formControlName","currency","matPrefix",""],[3,"value",4,"ngFor","ngForOf"],["class","flex w-full",4,"ngIf"],["mat-flat-button","",1,"fuse-mat-button-large","dark",3,"click"],[1,"flex","w-full","gap-2"],["matInput","","type","text","mask","999999999",3,"formControlName"],["matInput","","type","text","mask","999999999999",3,"formControlName"],["matInput","","type","text","mask","99999",3,"formControlName"],["matInput","","type","text","mask","999999999999999999",3,"formControlName"],[1,"flex","gap-4","mt-6"],["mat-flat-button","",1,"fuse-mat-button-large","bg-[#F97C00]","dark","w-full","gap-3",3,"routerLink","color"],["svgIcon","heroicons_outline:arrow-long-left"],["mat-flat-button","",1,"fuse-mat-button-large","dark","w-full",3,"color","disabled","click"],[4,"ngIf"],[3,"diameter","mode",4,"ngIf"],[3,"value"],["matInput","","formControlName","bankAccount2","type","text","mask","99999999999999999999"],["formControlName","currency2","matPrefix",""],[3,"diameter","mode"],[1,"form-done","rounded-lg"],[1,"login-card"],[2,"text-align","center"],[1,"flex","items-center","justify-center","mt-10","mb-5"],["src","../../../../../assets/icons/success.svg","alt","Success Icon",2,"width","90px !important","height","90px !important"],[1,"font-bold","text-3xl","mt-5","mb-5","w-80","m-auto"],[1,"text-stone-400","mb-5"]],template:function(i,a){1&i&&(e.YNc(0,Te,78,20,"div",0),e.YNc(1,Be,10,0,"div",0)),2&i&&(e.Q6J("ngIf",!a.completed),e.xp6(1),e.Q6J("ngIf",a.completed))},dependencies:[ge,be.Z6,w,m.ez,m.sg,m.O5,C.p9,f.Ps,f.Hw,S.LD,h.KE,h.hX,h.qo,S.gD,d.ey,b.rH,s.u5,s._Y,s.Fj,s.JJ,s.JL,s.UX,s.sg,s.u,h.lN,g.c,g.Nt,u.ot,u.zs,u.lW,v.Cq,v.Ou],styles:[".form-done{width:500px;background-color:#e8e8e8}.form_done_icon{font-size:90px;height:90px!important;width:90px!important}.login-contianer{width:1040px}\n"],encapsulation:2,data:{animation:I.L}})}return n})()}]}]}}]);