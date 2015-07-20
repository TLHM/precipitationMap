/**
 *    dataMaster
 *    Holds our data points
 *    Adds light pillars over time, updates them.
 *
 */
var Material = require('famous/webgl-materials/Material');
var lightPillar = require("./lightPillar");

/**
 *@class dataMaster
 *@constructor
 *
 *
 */
function dataMaster(node, options){
   //save node, own id
   this.node = node;
   this.id = node.addComponent(this);

   //Get our static data
   this.data = require('./myData');

   //Keeps track of how much of the data we've added
   this.curPillar = 0;

   //Array of pillars
   this.pillars = [];

   //Create a material for the pillars to be displayed with
   //First a shader, it fades out depending on the uv coordinate
   //Has a color depending on the dataValue (0-1)

   //Shader not working for some reason
   //Simpler visual style adopted
   /*var shader = `
      vec4 lightPillarShader(){
         return vec4(1,1,1,1);
         //vec4 col = mix(new vec4(.2998,.3443,.3558,.5),new vec4(.198,.434,.368,1), u_DataValue);
         //return vec4( col.xyz , (1.0-v_textureCoordinate.y*v_textureCoordinate.y)*col.w );
      }
   `;

   //Make the shader available through Famous' system
   Material.registerExpression('lightPillarShader',{
      glsl: 'lightPillarShader();',
      defines: shader,
      output: 4
   });
   //Create material and set uniform
   this.material = Material.lightPillarShader([],{
      uniforms: {
         u_DataValue : 1
      }
   });
   this.material.setUniform('u_DataValue',1);*/

   //Begin creating lightPillars
   this.node.requestUpdate(this.id);
}

//Movement functions. Were used to test the conversion of lat,lon to x,y,z
dataMaster.prototype.LatUp = function(){
   for(var i=0;i<this.pillars.length;i++){
      this.pillars[i].shiftLat(10);
   }
}

dataMaster.prototype.LatDn = function(){
   for(var i=0;i<this.pillars.length;i++){
      this.pillars[i].shiftLat(-10);
   }
}

dataMaster.prototype.LonUp = function(){
   for(var i=0;i<this.pillars.length;i++){
      this.pillars[i].shiftLon(10);
   }
}

dataMaster.prototype.LonDn = function(){
   for(var i=0;i<this.pillars.length;i++){
      this.pillars[i].shiftLon(-10);
   }
}


//Switch which month the pillars are representing data for
dataMaster.prototype.switchMonth = function(month){
   for(var i=0;i<this.pillars.length;i++){
      this.pillars[i].setMonth(month);
   }
}

//Creates a new pillar, gives it the lat,lon for proper positioning, and the monthly data
dataMaster.prototype.addPillar = function (index) {
   var dataPoint = this.data[index];

   this.pillars.push(new lightPillar(this.node,{
      lat : dataPoint.Latitude,
      lon : dataPoint.Longitude,
      months : [dataPoint.Jan, dataPoint.Feb, dataPoint.Mar, dataPoint.Apr, dataPoint.May, dataPoint.Jun,
         dataPoint.Jul, dataPoint.Aug, dataPoint.Sep, dataPoint.Oct, dataPoint.Nov, dataPoint.Dec],
      material : this.material
   }));
};

dataMaster.prototype.onUpdate = function onUpdate (time) {
   //add a pillar
   this.addPillar(this.curPillar);
   this.curPillar++;

   //If we have more to load
   if(this.curPillar < this.data.length){
      //Keep updating
      this.node.requestUpdate(this.id);
   }
};

module.exports = dataMaster;
