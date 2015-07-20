/**
 *    Navigation
 *    Holds all the buttons, and manages their actions
 *
 *
 */

 var DOMElement = require('famous/dom-renderables/DOMElement');
 var navButton = require('./navButton');

 var cp = require('./colorPalette');

/**
 *@class navigation
 *@constructor
 *
 *
 */
function navigation(node, options){
   //Create node, add self to node as component
   this.node = node.addChild();
   this.id = this.node.addComponent(this);

   //Position and size the nav
   this.node
      .setAlign(0,0)
      .setMountPoint(0,0)
      .setSizeMode("absolute","absolute")
      .setAbsoluteSize(100,430)
      .setPosition(5,5)
   ;

   //Create a background for the panel
   this.dom = new DOMElement(this.node,{
      properties:{
         backgroundColor : cp.vdBase,
         border: "1px "+cp.dMain+" solid"
      }
   });

   //create our month buttons
   this.buttons = [];

   for(var i=0;i<12;i++){
      this.buttons.push(new navButton(this.node,{
         id : i
      }));
   }

   //Create a header
   this.headerNode = node.addChild();
   this.header = new DOMElement(this.headerNode,{
      content:"<h1>Average Monthly Precipitation 1981 - 2010</h1><br><h2>January</h2>",
   });
   this.headerNode
      .setAlign(0,0)
      .setMountPoint(0,0)
      .setPosition(115,5)
      .setSizeMode("relative","absolute")
      .setAbsoluteSize(0,100)
   ;

   //Month names for use in header
   this.months = ["January","February","March","April","May","June","July","August","September","November","December"];

   //pointer to the dataMaster component
   this.dm = options.dm;
}

navigation.prototype.onReceive = function(event, payload){
   if(event==='click'){
      //Get the button id
      var buttonID = payload.node.getComponent(2).buttonID;
      //Switch our data to that month
      this.dm.switchMonth(buttonID);

      //Change our header to the proper month
      this.header.setContent("<h1>Average Monthly Precipitation 1981 - 2010</h1><br><h2>"+this.months[buttonID]+"</h2>");
   }
}

module.exports = navigation;
