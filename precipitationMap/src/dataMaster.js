/**
 *    lightPillar
 *    Holds our data points
 *    Adds light pillars over time, updates them.
 *
 */

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

   this.pillars.push(new lightPillar(this.node,{
      lat : 30,
      lon : 30,
   }));

   //Begin creating lightPillars
   //this.node.requestUpdate(this.id);
}

//Creates a new pillar, gives it the lat,lon for proper positioning, and the monthly data
/*dataMaster.prototype.addPillar = function (index) {
   var dataPoint = this.data[index];

   this.pillars.push(new lightPillar(this.node,{
      lat : dataPoint.Latitude,
      lon : dataPoint.Longitude,
      months : [datapoint.Jan,datapoint.Feb,datapoint.Mar,datapoint.Apr,datapoint.May,datapoint.Jun,datapoint.Jul,
         datapoint.Aug,datapoint.Sep,datapoint.Oct,datapoint.Nov,datapoint.Dec]
   }));
};

dataMaster.prototype.onUpdate = function onUpdate (time) {
   //add a pillar
   this.addPillar(curPillar);
   curPillar++;

   if(this.curPillar < this.data.length){
      //Keep updating
      this.node.requestUpdate(this.id);
   }
};*/

module.exports = dataMaster;
