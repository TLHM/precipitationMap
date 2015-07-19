/**
 *    dataLoader
 *    XHR isn't working, might be the dev environment
 *    Using static file instead
 *
 */

 var loadURL = require('famous/utilities/loadURL');

 var cp = require('./colorPalette');

/**
 *@class dataLoader
 *@constructor
 *
 *
 */
function dataLoader(node, options){
   //save node, own id
   this.node = node;
   this.id = node.addComponent(this);
   //so others know id we've loaded the data
   this.parsed = false;

   this.xhr = new XMLHttpRequest();
   this.xhr.open('GET', 'http://codetako.com/data/precipitationData_mini.json');
   this.xhr.send();

   this.node.requestUpdate(this.id);
}

dataLoader.prototype.getData = function(id){

}

dataLoader.prototype.onUpdate = function (){
   if(!this.parsed){
      if(this.xhr.readyState==4){
         this.dataText = this.xhr.responseText;
         alert(this.dataText);
         this.parsed=true;
      }

      this.node.requestUpdate(this.id);
   }
}

module.exports = dataLoader;
