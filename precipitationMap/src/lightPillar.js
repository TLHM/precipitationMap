/**
 *    lightPillar
 *    A cylinder that is positioned with latitude and longitude on its parent - the globe
 *
 *
 */

 var Geometry = require('famous/webgl-geometries/Geometry');
 var Mesh = require('famous/webgl-renderables/Mesh');
 var Color = require('famous/utilities/Color');
 var Transitionable = require('famous/transitions/Transitionable');

 var ctu = require('./CT_Util');
 var cp = require('./colorPalette');

/**
 *@class lightPillar
 *@constructor
 *
 *
 */
function lightPillar(node, options){
   //save node, own id
   this.node = node.addChild();
   this.id = this.node.addComponent(this);

   //Create a visual cylinder
   this.visual = new Mesh(this.node);
   this.visual.setGeometry('Cylinder');
   this.parentRadius = 400;

   //Get the data passed in via options
   this.monthlyData = (options && options.months)?options.months:[0,0,0,0,0,0,0,0,0,0,0,0];
   this.latitude = (options && options.lat)?options.lat:0;
   this.longitude = (options && options.lon)?options.lon:0;
   this.curMonth = 0;

   //Set our material
   this.material = (options && options.material)?options.material:(new Color('blue'));
   this.material.setG(255*(this.monthlyData[0]/2500.0));
   this.material.setOpacity(2*(this.monthlyData[0]/2500.0));
   this.visual.setBaseColor(this.material);

   //offset the longitude to match with the texture
   this.longitudeAdj = this.longitude-90;

   //Set size of the cylinder
   //Position self according to the lat and lon values passed in
   var position = this.calcPosition();
   this.node
      .setSizeMode("absolute","absolute","absolute")
      .setAbsoluteSize(2,2,10)
      .setOrigin(.5,.5,0)
      .setAlign(.5,.5,.5)
      .setMountPoint(.5,.5,0)
      .setPosition(position[0]*this.parentRadius,position[1]*this.parentRadius,position[2]*this.parentRadius)
      .setRotation(-this.latitude*ctu.deg2Rad, this.longitudeAdj*ctu.deg2Rad, 0)
      .setOpacity(.5);
   ;

   //No animations yet added
   //this.node.requestUpdate(this.id);
}

//Converts the longitude and latitude into cartesian coordinates for the position of the pillar
//Assumes our globe is a sphere
lightPillar.prototype.calcPosition = function(){
   return [ctu.cosd(this.latitude) * ctu.sind(this.longitudeAdj),
      ctu.sind(-this.latitude), ctu.cosd(this.latitude) * ctu.cosd(this.longitudeAdj)];
}

//Alter the position of the pillar
lightPillar.prototype.shiftLat = function (shift){
   this.latitude+=shift;
   var position = this.calcPosition();

   this.node
      .setPosition(position[0]*this.parentRadius,position[1]*this.parentRadius,position[2]*this.parentRadius)
      .setRotation(-this.latitude*ctu.deg2Rad, this.longitudeAdj*ctu.deg2Rad, 0)
   ;
}

lightPillar.prototype.shiftLon = function (shift){
   this.longitude+=shift;
   this.longitudeAdj = this.longitude-90;

   var position = this.calcPosition();
   this.node
      .setPosition(position[0]*this.parentRadius,position[1]*this.parentRadius,position[2]*this.parentRadius)
      .setRotation(-this.latitude*ctu.deg2Rad, this.longitudeAdj*ctu.deg2Rad, 0)
   ;
}

//Set the latitude or longitude of the pillar
lightPillar.prototype.setLat = function (newLat){
   this.latitude=newLat;
   var position = this.calcPosition();

   this.node
      .setPosition(position[0]*250,position[1]*250,position[2]*250)
      .setRotation(-this.latitude*ctu.deg2Rad, this.longitudeAdj*ctu.deg2Rad, 0)
   ;
}

lightPillar.prototype.setLon = function (newLon){
   this.longitude=newLon;
   this.longitudeAdj = this.longitude-90;

   var position = this.calcPosition();
   this.node
      .setPosition(position[0]*250,position[1]*250,position[2]*250)
      .setRotation(-this.latitude*ctu.deg2Rad, this.longitudeAdj*ctu.deg2Rad, 0)
   ;
}


//Set the month the pillar is representing data from
lightPillar.prototype.setMonth = function(month){
   this.curMonth = month;
   var data = this.monthlyData[month]/2500.0;
   this.material.setOpacity(data*2);
   this.material.setG(data*255);
   this.visual.setBaseColor(this.material);
}

//No animation right now
/*lightPillar.prototype.onUpdate = function (time) {
   //If animating, update animation

   //Keep updating
   this.node.requestUpdate(this.id);
};*/

module.exports = lightPillar;
