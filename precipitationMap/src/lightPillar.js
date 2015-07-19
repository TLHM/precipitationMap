/**
 *    lightPillar
 *    A cylinder that is positioned with latitude and longitude on its parent - the globe
 *
 *
 */

 var Geometry = require('famous/webgl-geometries/Geometry');
 var Mesh = require('famous/webgl-renderables/Mesh');
 var Color = require('famous/utilities/Color');
 var Material = require('famous/webgl-materials/Material');
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
   this.visual.setBaseColor(new Color('blue'));

   //Get the data passed in via options
   this.monthlyData = (options && options.months)?options.months:[0,0,0,0,0,0,0,0,0,0,0,0];
   this.latitude = (options && options.lat)?options.lat:0;
   this.longitude = (options && options.lon)?options.lon:0;

   //Set size of the cylinder
   //Position self according to the lat and lon values passed in
   var position = [ctu.cosd(this.latitude) * ctu.cosd(this.longitude),
      ctu.cosd(this.latitude) * ctu.sind(this.longitude), ctu.sind(this.latitude)];
   this.node
      .setSizeMode("absolute","absolute","absolute")
      .setAbsoluteSize(10,10,100)
      .setOrigin(.5,.5,0)
      .setAlign(.5,.5,.5)
      .setMountPoint(.5,.5,0)
      .setPosition(position[0]*250,position[1]*250,position[2]*250)
      .setRotation(this.latitude*ctu.deg2Rad, (this.longitude+90)*ctu.deg2Rad, 0)
   ;

   // Let the magic begin...
   this.node.requestUpdate(this.id);

   //The shader does most of the work!
   /*var shader = `
      vec4 mistShader(sampler2D tex , vec4 mask){
         vec4 col1 = texture2D(tex, fract(1.5*v_textureCoordinate));
         vec4 colD = texture2D(tex, fract(.09*col1.xy+v_textureCoordinate+u_tOff));
         vec3 trueCol = mix(u_col1, u_col2, colD.x);
         float maskVal = mix(mask.x*mask.y, mask.z*mask.y, colD.y);
         return vec4(trueCol, colD.z*max(v_textureCoordinate.y-.1,0.0)*maskVal);
      }
   `;
   //Used to actually use the shader in Famous
   //We pass in an additional mask texture read (as a color value) for the full effect
   Material.registerExpression('mistShader',{
      glsl: 'mistShader($TEXTURE, %1);',
      defines: shader,
      output: 4
   });
   //The additional masking texture we'll pass to the shader
   Material.registerExpression('maskOffset',{
      glsl: 'texture2D($TEXTURE, fract(1.6*v_textureCoordinate));',
      output: 4
   });
   //Create the Material for the additional masking texture
   this.maskMat = Material.maskOffset([],{
      texture:'./images/m01.png'
   });

   //For animating the offset in the textures
   this.offsetVec = [Math.random()*(4)-2, Math.random()*(4)-2];
   this.off = new Transitionable(this.offsetVec);

   //Create the material that uses the shader
   //Uniforms are two colors and an offset used for the animation effect
   this.noiseMat = Material.mistShader( this.maskMat,{
      texture : './images/c16_10.png',
      uniforms : {
         u_col1 : 3,
         u_col2 : 3,
         u_tOff : 2,
      }
   });
   //Set uniform values
   this.noiseMat.setUniform('u_col1', new Color(cp.vdBase).getNormalizedRGB());
   this.noiseMat.setUniform('u_col2', new Color(cp.dBase).getNormalizedRGB());
   this.noiseMat.setUniform('u_tOff', this.offsetVec);
   //Set the mesh to use this material
   this.mistMesh.setBaseColor(this.noiseMat);*/

   //Begin animation
   //this.node.requestUpdate(this.id);
   //Necessary in current version for proper transparancy
   //this.node.setOpacity(.99);
}

lightPillar.prototype.onUpdate = function (time) {
   //If we've stopped animating, begin again
   /*if (!this.off.isActive()) this.off.set([Math.random()*(4)-2, Math.random()*(4)-2], {
      duration : 120000,
      curve : 'inOutSine'
   });
   //Get the current value of the tweener
   this.offsetVec = this.off.get();
   //Update the material with the new value
   this.noiseMat.setUniform('u_tOff', this.offsetVec);
   this.mistMesh.setBaseColor(this.noiseMat);
   //Keep updating
   this.node.requestUpdate(this.id);*/

   //this.node.setRotation(0, time / 2000, 0);
   this.node.requestUpdateOnNextTick(this.id);
};

module.exports = lightPillar;
