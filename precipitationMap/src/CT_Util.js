/**
 *    Some util functions I use often for angular and vector math
 *
 *
 *
 */

 module.exports = {
   //Converts degrees to radians and visa versa
   deg2Rad : Math.PI/180,
   rad2Deg : 180/Math.PI,

   //Cosine, takes degrees
   cosd : function(angle){
      return Math.cos(angle*(Math.PI/180));
   },
   //Sine, takes degrees
   sind: function(angle){
      return Math.sin(angle*(Math.PI/180));
   },

   //Gets vec2 for a angle in degrees
   getDir: function(angleD){
      return vec2(Math.cos(angleD*(Math.PI/180)),Math.sin(angleD*(Math.PI/180)));
   },
   //Same, radians
   getDirR: function(angleR){
      return vec2(Math.cos(angleR),Math.sin(angleR));
   },

   //Takes vec2, returns the angle in degrees
   //Should be between 0 and 360
   getAng: function(direction){
      return 180 + Math.atan2(direction.y,direction.x)*(180/Math.PI);
   },
   //Same, radians (0 - 2π)
   getAngR: function(direction){
      return Math.PI + Math.atan2(direction.y,direction.x);
   },
};
