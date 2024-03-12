"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[592],{2621:(y,C,c)=>{c.d(C,{K:()=>m});var l=c(2340),i=c(2223),f=c(3144);let m=(()=>{class h{constructor(g){this.http=g}getTransportTypes(){return this.http.get(l.O.apiReferences+"/references/transport-types/all")}getTransportKinds(){return this.http.get(l.O.apiReferences+"/references/transport-kinds/all")}getCargoTypes(){return this.http.get(l.O.apiReferences+"/references/cargo-type-groups/all")}getCurrencies(){return this.http.get(l.O.apiReferences+"/references/currencies/all")}getPackages(){return this.http.get(l.O.apiReferences+"/references/cargo-packages/all")}getCargoLoadingMethod(){return this.http.get(l.O.apiReferences+"/references/cargo-loading-method/all")}static#t=this.\u0275fac=function(a){return new(a||h)(i.LFG(f.eN))};static#e=this.\u0275prov=i.Yz7({token:h,factory:h.\u0275fac,providedIn:"root"})}return h})()},1709:(y,C,c)=>{c.d(C,{Oz:()=>b,oY:()=>v});var l=c(5861),i=c(2223),f=c(4755);const m=["input"];function h(d,F){if(1&d){const t=i.EpF();i.TgZ(0,"span")(1,"input",1,2),i.NdJ("click",function(s){i.CHM(t);const n=i.oxw();return i.KtG(n.onClick(s))})("paste",function(s){const o=i.CHM(t).index,r=i.oxw();return i.KtG(r.onPaste(s,o))})("input",function(s){const o=i.CHM(t).index,r=i.oxw();return i.KtG(r.onInput(s,o))})("keydown",function(s){const o=i.CHM(t).index,r=i.oxw();return i.KtG(r.onKeydown(s,o))}),i.qZA()()}if(2&d){const t=i.oxw();i.ekj("code-hidden",t.isCodeHidden),i.xp6(1),i.Q6J("type",t.inputType)("disabled",t.disabled),i.uIk("inputmode",t.inputMode)("autocapitalize",t.autocapitalize)}}const _=new i.OlP("CodeInputComponentConfig"),g={codeLength:4,inputType:"tel",inputMode:"numeric",initialFocusField:void 0,isCharsCode:!1,isCodeHidden:!1,isPrevFocusableAfterClearing:!0,isFocusingOnLastByClickIfFilled:!1,code:void 0,disabled:!1,autocapitalize:void 0};var a=(()=>((a=a||{})[a.ready=0]="ready",a[a.reset=1]="reset",a))();let b=(()=>{class d{constructor(t){if(this.isNonDigitsCode=!1,this.codeChanged=new i.vpe,this.codeCompleted=new i.vpe,this.placeholders=[],this.inputs=[],this.inputsStates=[],this.state={isFocusingAfterAppearingCompleted:!1,isInitialFocusFieldEnabled:!1},Object.assign(this,g),t)for(const e in t)t.hasOwnProperty(e)&&g.hasOwnProperty(e)&&(this[e]=t[e])}ngOnInit(){this.state.isInitialFocusFieldEnabled=!this.isEmpty(this.initialFocusField),this.onCodeLengthChanges()}ngAfterViewInit(){this.inputsListSubscription=this.inputsList.changes.subscribe(this.onInputsListChanges.bind(this)),this.onInputsListChanges(this.inputsList)}ngAfterViewChecked(){this.focusOnInputAfterAppearing()}ngOnChanges(t){t.code&&this.onInputCodeChanges(),t.codeLength&&this.onCodeLengthChanges()}ngOnDestroy(){this.inputsListSubscription&&this.inputsListSubscription.unsubscribe()}reset(t=!1){this.onInputCodeChanges(),this.state.isInitialFocusFieldEnabled&&this.focusOnField(this.initialFocusField),t&&this.emitChanges()}focusOnField(t){if(t>=this._codeLength)throw new Error("The index of the focusing input box should be less than the codeLength.");this.inputs[t].focus()}onClick(t){if(!this.isFocusingOnLastByClickIfFilled)return;const s=this.inputs[this._codeLength-1];t.target===s||!(this.getCurrentFilledCode().length>=this._codeLength)||setTimeout(()=>s.focus())}onInput(t,e){const s=t.target,n=t.data||s.value;if(this.isEmpty(n))return;if(!this.canInputValue(n))return t.preventDefault(),t.stopPropagation(),this.setInputValue(s,null),void this.setStateForInput(s,a.reset);const o=n.toString().trim().split("");for(let u=0;u<o.length;u++){const p=u+e;if(p>this._codeLength-1)break;this.setInputValue(this.inputs[p],o[u])}this.emitChanges();const r=e+o.length;r>this._codeLength-1?s.blur():this.inputs[r].focus()}onPaste(t,e){t.preventDefault(),t.stopPropagation();const s=t.clipboardData?t.clipboardData.getData("text").trim():void 0;if(this.isEmpty(s))return;const n=s.split("");let o=0;for(let r=e;r<this.inputs.length&&o!==n.length;r++){const u=this.inputs[r],p=n[o];if(!this.canInputValue(p))return this.setInputValue(u,null),void this.setStateForInput(u,a.reset);this.setInputValue(u,p.toString()),o++}this.inputs[e].blur(),this.emitChanges()}onKeydown(t,e){var s=this;return(0,l.Z)(function*(){const n=t.target,o=s.isEmpty(n.value),r=e-1,u=yield s.isBackspaceKey(t),p=s.isDeleteKey(t);!u&&!p||(t.preventDefault(),s.setInputValue(n,null),o||s.emitChanges(),!(r<0||p)&&(o||s.isPrevFocusableAfterClearing)&&s.inputs[r].focus())})()}onInputCodeChanges(){if(!this.inputs.length)return;if(this.isEmpty(this.code))return void this.inputs.forEach(s=>{this.setInputValue(s,null)});const t=this.code.toString().trim().split("");let e=!0;for(const s of t)if(!this.canInputValue(s)){e=!1;break}this.inputs.forEach((s,n)=>{this.setInputValue(s,e?t[n]:null)})}onCodeLengthChanges(){if(this.codeLength)if(this._codeLength=this.codeLength,this._codeLength>this.placeholders.length){const t=Array(this._codeLength-this.placeholders.length).fill(1);this.placeholders.splice(this.placeholders.length-1,0,...t)}else this._codeLength<this.placeholders.length&&this.placeholders.splice(this._codeLength)}onInputsListChanges(t){if(t.length>this.inputs.length){const e=t.filter((n,o)=>o>this.inputs.length-1);this.inputs.splice(this.inputs.length,0,...e.map(n=>n.nativeElement));const s=Array(e.length).fill(a.ready);this.inputsStates.splice(this.inputsStates.length,0,...s)}else t.length<this.inputs.length&&(this.inputs.splice(t.length),this.inputsStates.splice(t.length));this.onInputCodeChanges()}focusOnInputAfterAppearing(){this.state.isInitialFocusFieldEnabled&&(this.state.isFocusingAfterAppearingCompleted||(this.focusOnField(this.initialFocusField),this.state.isFocusingAfterAppearingCompleted=document.activeElement===this.inputs[this.initialFocusField]))}emitChanges(){setTimeout(()=>this.emitCode(),50)}emitCode(){const t=this.getCurrentFilledCode();this.codeChanged.emit(t),t.length>=this._codeLength&&this.codeCompleted.emit(t)}getCurrentFilledCode(){let t="";for(const e of this.inputs)this.isEmpty(e.value)||(t+=e.value);return t}isBackspaceKey(t){return t.key&&"backspace"===t.key.toLowerCase()||t.keyCode&&8===t.keyCode?Promise.resolve(!0):t.keyCode&&229===t.keyCode?new Promise(s=>{setTimeout(()=>{const n=t.target,o=this.getStateForInput(n)===a.reset;o&&this.setStateForInput(n,a.ready),s(0===n.selectionStart&&!o)})}):Promise.resolve(!1)}isDeleteKey(t){return t.key&&"delete"===t.key.toLowerCase()||t.keyCode&&46===t.keyCode}setInputValue(t,e){const n="has-value",o="empty";this.isEmpty(e)?(t.value="",t.classList.remove(n),t.parentElement.classList.add(o)):(t.value=e,t.classList.add(n),t.parentElement.classList.remove(o))}canInputValue(t){return!this.isEmpty(t)&&(/^[0-9]+$/.test(t.toString())||this.isCharsCode||this.isNonDigitsCode)}setStateForInput(t,e){const s=this.inputs.indexOf(t);s<0||(this.inputsStates[s]=e)}getStateForInput(t){const e=this.inputs.indexOf(t);return this.inputsStates[e]}isEmpty(t){return null==t||!t.toString().length}static#t=this.\u0275fac=function(e){return new(e||d)(i.Y36(_,8))};static#e=this.\u0275cmp=i.Xpm({type:d,selectors:[["code-input"]],viewQuery:function(e,s){if(1&e&&i.Gf(m,5),2&e){let n;i.iGM(n=i.CRH())&&(s.inputsList=n)}},inputs:{codeLength:"codeLength",inputType:"inputType",inputMode:"inputMode",initialFocusField:"initialFocusField",isNonDigitsCode:"isNonDigitsCode",isCharsCode:"isCharsCode",isCodeHidden:"isCodeHidden",isPrevFocusableAfterClearing:"isPrevFocusableAfterClearing",isFocusingOnLastByClickIfFilled:"isFocusingOnLastByClickIfFilled",code:"code",disabled:"disabled",autocapitalize:"autocapitalize"},outputs:{codeChanged:"codeChanged",codeCompleted:"codeCompleted"},features:[i.TTD],decls:1,vars:1,consts:[[3,"code-hidden",4,"ngFor","ngForOf"],["autocomplete","one-time-code",3,"type","disabled","click","paste","input","keydown"],["input",""]],template:function(e,s){1&e&&i.YNc(0,h,3,6,"span",0),2&e&&i.Q6J("ngForOf",s.placeholders)},dependencies:[f.sg],styles:["[_nghost-%COMP%]{--text-security-type: disc;--item-spacing: 4px;--item-height: 4.375em;--item-border: 1px solid #dddddd;--item-border-bottom: 1px solid #dddddd;--item-border-has-value: 1px solid #dddddd;--item-border-bottom-has-value: 1px solid #dddddd;--item-border-focused: 1px solid #dddddd;--item-border-bottom-focused: 1px solid #dddddd;--item-shadow-focused: 0px 1px 5px rgba(221, 221, 221, 1);--item-border-radius: 5px;--item-background: transparent;--item-font-weight: 300;--color: #171516;display:flex;transform:translateZ(0);font-size:inherit;color:var(--color)}[_nghost-%COMP%]   span[_ngcontent-%COMP%]{display:block;flex:1;padding-right:var(--item-spacing)}[_nghost-%COMP%]   span[_ngcontent-%COMP%]:first-child{padding-left:var(--item-spacing)}[_nghost-%COMP%]   span.code-hidden[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{text-security:var(--text-security-type);-webkit-text-security:var(--text-security-type);-moz-text-security:var(--text-security-type)}[_nghost-%COMP%]   input[_ngcontent-%COMP%]{width:100%;height:var(--item-height);color:inherit;background:var(--item-background);text-align:center;font-size:inherit;font-weight:var(--item-font-weight);border:var(--item-border);border-bottom:var(--item-border-bottom);border-radius:var(--item-border-radius);-webkit-appearance:none;transform:translateZ(0);-webkit-transform:translate3d(0,0,0);outline:none}[_nghost-%COMP%]   input.has-value[_ngcontent-%COMP%]{border:var(--item-border-has-value);border-bottom:var(--item-border-bottom-has-value)}[_nghost-%COMP%]   input[_ngcontent-%COMP%]:focus{border:var(--item-border-focused);border-bottom:var(--item-border-bottom-focused);box-shadow:var(--item-shadow-focused)}"]})}return d})(),v=(()=>{class d{static forRoot(t){return{ngModule:d,providers:[{provide:_,useValue:t}]}}static#t=this.\u0275fac=function(e){return new(e||d)};static#e=this.\u0275mod=i.oAB({type:d});static#s=this.\u0275inj=i.cJS({imports:[f.ez]})}return d})()}}]);