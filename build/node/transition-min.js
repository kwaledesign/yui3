YUI.add("transition",function(F){var H="transitionstart",E="transitionend",B=F.TransitionNative,A=Number;var G={},D,C=function(){this.init.apply(this,arguments);};F.extend(C,B,{_start:function(){G[F.stamp(this)]=this;this._startTime=new Date();C._startTimer();},_end:function(I){var J=this._duration*1000;if(I){this._runAttrs(J,J);}delete G[F.stamp(this)];this._running=false;this._startTime=null;},_runFrame:function(){var J=new Date()-this._startTime,I=(J>=this._totalDuration),K,L;this._runAttrs(J);if(I){this._end();}},_runAttrs:function(K){var P=this._runtimeAttr,J=C.behaviors,R=P.easing,L=this._node,N=false,I,M,Q,S,O;for(O in P){if(P[O].to){I=P[O];Q=I.duration;S=K;M=(O in J&&"set" in J[O])?J[O].set:C.DEFAULT_SETTER;N=(S>=Q);if(Q===0){Q=1;S=1;}else{if(S>Q){S=Q;}}if(!this._skip[O]){M(this,O,I.from,I.to,S,Q,I.easing,I.unit);if(N){this._skip[O]=true;L.fire(E,{elapsedTime:Q,propertyName:O});}}}}},_initAttrs:function(){var R={},S={},P=(typeof this._easing==="string")?F.Easing[this._easing]:this._easing,N={},I=C.behaviors,K=this._config,M,T,J,L;this._totalDuration=0;for(name in K){val=K[name];if(!/^(?:node|duration|iterations|easing)$/.test(name)){M=this._duration*1000;if(typeof val==="function"){val=val.call(this,node);}else{if(typeof val==="object"){M=("duration" in val)?val.duration*1000:this._duration*1000;P=(typeof val.easing==="string")?F.Easing[val.easing]:val.easing||P;val=val.value;}}J=(name in I&&"get" in I[name])?I[name].get(this,name):C.DEFAULT_GETTER(this,name);var Q=C.RE_UNITS.exec(J);var O=C.RE_UNITS.exec(val);J=Q?Q[1]:J;L=O?O[1]:val;T=O?O[2]:Q?Q[2]:"";if(!T&&C.RE_DEFAULT_UNIT.test(name)){T=C.DEFAULT_UNIT;}if(!J||!L){return;}N[name]={from:J,to:L,unit:T,duration:M,easing:P};if(M>this._totalDuration){this._totalDuration=M;}}}this._skip={};this._runtimeAttr=N;},_getOffset:function(J){var L=this._node,M=L.getComputedStyle(J),K=(J==="left")?"getX":"getY",N=(J==="left")?"setX":"setY";if(M==="auto"){var I=L.getStyle("position");if(I==="absolute"||I==="fixed"){M=L[K]();L[N](M);}else{M=0;}}return M;},destroy:function(){this.detachAll();this._node=null;}},{NAME:"transition",RE_DEFAULT_UNIT:/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,DEFAULT_UNIT:"px",DEFAULT_EASING:function(J,I,L,K){if((J/=K/2)<1){return L/2*J*J+I;}return -L/2*((--J)*(J-2)-1)+I;},DEFAULT_DURATION:0.5,intervalTime:20,behaviors:{left:{get:function(J,I){return J._getOffset(I);}}},DEFAULT_SETTER:function(L,M,O,P,R,K,N,Q){var J=L._node,I=N(R,A(O),A(P)-A(O),K);if(M in J._node.style||M in F.DOM.CUSTOM_STYLES){Q=Q||"";J.setStyle(M,I+Q);}else{if(J._node.attributes[M]){J.setAttribute(M,I);}else{J.set(M,I);}}},DEFAULT_GETTER:function(K,I){var J=K._node,L="";if(I in J._node.style||I in F.DOM.CUSTOM_STYLES){L=J.getComputedStyle(I);}else{if(J._node.attributes[I]){L=J.getAttribute(I);}else{L=J.get(I);}}return L;},_startTimer:function(){if(!D){D=setInterval(C._runFrame,C._intervalTime);}},_stopTimer:function(){clearInterval(D);D=0;},_runFrame:function(){var I=true;for(var J in G){if(G[J]._runFrame){I=false;G[J]._runFrame();}}if(I){C._stopTimer();}},RE_UNITS:/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/},true);C.behaviors.top=C.behaviors.left;F.Transition=C;F.Node.prototype.transition=function(I){var K=(B.supported&&B.useNative)?B:C,J=new K(this,I);J.run();return this;};},"@VERSION@",{requires:["transition-native","node-style","anim-easing"]});