/**
 *    navButton
 *    Has behaviors on mouse actions.
 *    Click is caught by MainMenu for navigational effects.
 *
 */

 var DOMElement = require('famous/dom-renderables/DOMElement');
 var Transitionable = require('famous/transitions/Transitionable');

 var cp = require('./colorPalette');

/**
 *@class navButton
 *@constructor
 *
 *
 */
function navButton(node, options){
   this.node = node.addChild();
   this.id = this.node.addComponent(this);

   //Unique ID for buttons, determines what happens when you click!
   this.buttonID = (options && options.id)?options.id:0;

   //Set positioning and size of the button
   this.node
      .setSizeMode("relative","absolute")
      .setAlign(.5,0)
      .setMountPoint(.5,0)
      .setDifferentialSize(-10,0)
      .setAbsoluteSize(0,30)
      .setPosition(0,5+this.buttonID*35)
      .setOrigin(.5,.5)
   ;

   //How much does this grow on MouseOver?
   this.overSize = (options && options.overSize)?options.overSize:1.1;

   //Prepare animator
   this.anim = new Transitionable(1);

   //Create HTML content
   var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
   this.dom = new DOMElement(this.node, {
      content: months[this.buttonID],
   });
   this.dom.addClass('buttonNeutral');

   //We listen to these events:
   this.node.addUIEvent('click');
   this.node.addUIEvent('mouseenter');
   this.node.addUIEvent('mouseleave');
}

navButton.prototype.onUpdate = function(){
   //Animate position if necessary
   if(this.anim.isActive()){
      var size = this.anim.get();
      this.node.setScale(size,size,size);

      this.node.requestUpdate(this.id);
   }
}

navButton.prototype.onReceive = function(event, payload){
   if(event==='click'){
      //Actions carried out further up the heirarchy by navigation

   }else if (event==='mouseenter'){
      //Change the css
      this.dom.addClass('buttonOver');
      this.dom.removeClass('buttonNeutral');

      //Begin/continue position animation
      if(this.anim.isActive()){
         this.anim.from(this.anim.get()).to(this.overSize, 'linear', 200);
      }else{
         this.anim.set(this.overSize, {duration:200});
      }
      this.node.requestUpdate(this.id);

   }else if (event==='mouseleave'){
      //Change the css
      this.dom.addClass('buttonNeutral');
      this.dom.removeClass('buttonOver');

      //Begin/continue position animation
      if(this.anim.isActive()){
         this.anim.from(this.anim.get()).to(1, 'linear', 200);
      }else{
         this.anim.set(1, {duration:200});
      }
      this.node.requestUpdate(this.id);
   }
}

module.exports = navButton;
