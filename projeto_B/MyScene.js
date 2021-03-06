/**
 * MyScene
 * @constructor
 */
class MyScene extends CGFscene {
  constructor() {
    super();
  }

  init(application) {
    this.n = 0;
    this.g = 0;

    this.r = Math.floor(Math.random() * 7 + 1);
    super.init(application);
    this.initCameras();
    this.initLights();
    this.initMaterials();
    this.wireframe = false;
    this.showShaderCode = true;

    //movimentos do bicho
    this.xpos = 5;
    this.ypos = 10;
    this.zpos = 0;
    this.nest_xpos = 1;
    this.nest_ypos = 2,2;
    this.nest_zpos = 0;

    this.velocity = 0;
    this.tetayy = 0;
    this.count = false;
    this.turnVar = false;
    this.scaleFactor = 1;
    this.speedFactor = 1;

    this.relampago = new MyLightning(this);

    this.branchTest = new MyTreeBranch(this);

    //-----floresta-----
    this.axiom = "X";
    this.ruleF = "FF";
    this.ruleX = "F[-X][X]F[-X]+FX";
    this.angleTree = 30.0;
    this.iterationsTree = 5;
    this.scaleFactorTree = 1;

    this.trees = [
      new MyTree(this),
      new MyTree(this),
      new MyTree(this),
      new MyTree(this),
      new MyTree(this)
    ];

    //--------------

    //Background color
    this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);
    this.setUpdatePeriod(50);

    //Initialize scene objects
    this.Cube = new MyCubeMap(this);
    this.axis = new CGFaxis(this);
    this.plane = new Plane(this, 32);

    //---------------galhos no chao---------------------
    this.galhos = [
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this),
      new MyTreeBranch(this)
    ];

    this.galhos_pos_x = [13];
    for (let i = 0; i < 13; i++) {
      this.galhos_pos_x[i] = Math.random() * 20 - 10;
    }

    this.galhos_pos_z = [13];
    for (let i = 0; i < 13; i++) {
      this.galhos_pos_z[i] = Math.random() * 20 - 10;
    }

    this.pickit = false;
    this.removei = [-1];
    this.noNinho = [-1];
    //-------------------------------------------------------

    this.shadersDiv = document.getElementById("shaders");
    this.vShaderDiv = document.getElementById("vshader");
    this.fShaderDiv = document.getElementById("fshader");

    this.house = new MyHouse(this);

    this.bird = new MyBird(
      this,
      this.tetayy,
      this.velocity,
      this.xpos,
      this.ypos,
      this.zpos
    );

    this.birdsNest = new MyPrism(this, 15, 2, 1);
    this.terrain = new MyTerrain(this);

    this.appearance = new CGFappearance(this);
    this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
    this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
    this.appearance.setShininess(120);

    //---------------floresta-------------------------
    for (var i = 0; i < this.trees.length; i++) {
      this.trees[i].generate(
        this.axiom,
        {
          X: [
            " F[-X][X]F[-X]+X",
            "F[-X][x]+X",
            "F[+X]-X",
            "F[/X][X]F[\\X]+X",
            "F[\\X][X]/X",
            "F[/X]\\X",
            "F[^X][X]F[&X]^X",
            "F[^X]&X",
            "F[&X]^X"
          ]
        },

        this.angleTree,
        this.iterationsTree,
        this.scaleFactorTree
      );
    }
    //------------------------------------------------------
  }

  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(45, 45, 45),
      vec3.fromValues(0, 0, 0)
    );
  }

  initMaterials() {
    this.sky = new CGFappearance(this);
    this.sky.setAmbient(1, 1, 1, 1);
    this.sky.setDiffuse(1, 1, 1, 1);
    this.sky.setSpecular(1, 1, 1, 1);
    this.sky.setShininess(10.0);
    this.sky.loadTexture("skybox/sky2.jpg");
    this.sky.setTextureWrap("REPEAT", "REPEAT");

    this.branch = new CGFappearance(this);
    this.branch.setAmbient(0.1, 0.1, 0.1, 1.0);
    this.branch.setDiffuse(0.9, 0.9, 0.9, 1.0);
    this.branch.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.branch.setShininess(10.0);
    this.branch.loadTexture("images/madeira.jpg");
    this.branch.setTextureWrap("REPEAT", "REPEAT");

    this.nest = new CGFappearance(this);
    this.nest.setAmbient(0.1, 0.1, 0.1, 1);
    this.nest.setDiffuse(0.9, 0.9, 0.9, 1);
    this.nest.setSpecular(0.1, 0.1, 0.1, 1);
    this.nest.setShininess(10.0);
    this.nest.loadTexture("images/birdNest.jpg");
    this.nest.setTextureWrap("REPEAT", "REPEAT");

    this.leaf = new CGFappearance(this);
    this.leaf.setAmbient(0, 204 / 255, 0, 1);
    this.leaf.setDiffuse(0, 204 / 255, 0, 1);
    this.leaf.setSpecular(0, 204 / 255, 0, 1);
    this.leaf.setShininess(10.0);
    this.leaf.loadTexture("images/leaf.jpg");
    this.leaf.setTextureWrap("REPEAT", "REPEAT");
  }

  // updates the selected object's wireframe mode
  onWireframeChanged(v) {
    if (v) this.terrain.plane.setLineMode();
    else this.terrain.plane.setFillMode();
  }
  remove_branch(j) {
    this.removei[this.n] = j;
    this.n = this.n + 1;
  }
  poe_ninho(j) {
    this.noNinho[this.g] = j;
    this.g = this.g + 1;
  }

  update(t) {
    this.checkKeys();
    this.t = t / 200;
    this.relampago.update(t);
  }

  /*------------para controlar animação------*/
  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in ​https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      this.count = true;
      this.bird.accelerate(this.count);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      this.count = false;
      this.bird.accelerate(this.count);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      this.turnVar = true;
      this.bird.turn(this.turnVar);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      this.turnVar = false;
      this.bird.turn(this.turnVar);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";

      this.bird.reset();
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyL")) {
      text += " L ";

      this.relampago.startAnimation();
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyP")) {
      text += " P ";
      this.bird.pickup();

      text += " True ";
      keysPressed = true;
    }

    if (keysPressed) console.log(text);
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    this.axis.display();

    //Apply default appearance
    this.setDefaultAppearance();

    this.terrain.display();

    //-----skybox--------
    this.pushMatrix();
    this.sky.apply();
    this.scale(100, 100, 100);
    this.Cube.display();
    this.popMatrix();

    //--------house with bird nest---------------

    this.pushMatrix();

    this.scale(0.2, 0.2, 0.2);

    this.pushMatrix();
    this.scale(7, 7, 7);
    this.house.display();
    this.popMatrix();

    this.bird.display();

    this.popMatrix();
	
	this.pushMatrix();
    this.translate(this.nest_xpos, this.nest_ypos, this.nest_zpos);
    this.scale(0.5, 0.4, 0.5);
    this.nest.apply();
    this.birdsNest.display();
    this.popMatrix();

    //---------------------galhos---------------------
    for (let i = 0; i < this.galhos.length; i++) {
      for (let v = 0; v < this.removei.length; v++) {
        if (this.removei[v] == i) {
          for (let s = 0; s < this.noNinho.length; s++) {
            if (this.noNinho[s] == i) {
              this.pushMatrix();

				//agrupar os galhos para nao ficar uma stack gigante
				if(i<4){
				this.translate(
					this.nest_xpos-0.1,
					this.nest_ypos + 0.2 * i ,
					this.nest_zpos
				  );
				}
				else if(i>=4 && i<8){
				this.translate(
					this.nest_xpos,
					this.nest_ypos + 0.2 * i -0.8 ,
					this.nest_zpos
				  );
				}
				else if(i>=8){
				this.translate(
					this.nest_xpos+0.1,
					this.nest_ypos + 0.2 * i - 1.6 ,
					this.nest_zpos
				  );
				}
              
              this.rotate(-Math.PI / 2, 1, 0, 0);
              this.scale(0.4, 0.5, 0.4);
              this.translate(0, -1, 0);
              this.branch.apply();
              this.galhos[i].display();
              this.popMatrix();
            }
          }
        } else {
          this.pushMatrix();

          this.translate(this.galhos_pos_x[i], 0.1, this.galhos_pos_z[i]);
          this.rotate((Math.PI / 14) * i, 0, 1, 0);
          this.rotate(-Math.PI / 2, 1, 0, 0);
          this.scale(0.4, 0.5, 0.4);
          this.translate(0, -1, 0);
          this.branch.apply();
          this.galhos[i].display();
          this.popMatrix();
        }
      }
    }

    //---------------------floresta---------------------
   this.pushMatrix();
    this.translate(6, 0, -5);
    this.scale(0.5, 1.5, 0.5);
    this.branchTest.display();
    this.popMatrix();
    this.pushMatrix();
    this.translate(6, 1, -5);
    this.scale(0.5, 0.5, 0.5);
    this.trees[0].display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-7, 0, 1);
    this.scale(0.5, 1.5, 0.5);
    this.branchTest.display();
    this.popMatrix();
    this.pushMatrix();
    this.translate(-7, 1, 1);
    this.scale(0.5, 0.5, 0.5);
    this.trees[1].display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-8, 0, -5);
    this.scale(0.5, 1.5, 0.5);
    this.branchTest.display();
    this.popMatrix();
    this.pushMatrix();
    this.translate(-8, 1, -5);
    this.scale(0.5, 0.5, 0.5);
    this.trees[2].display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-7, 0, 7);
    this.scale(0.5, 1.5, 0.5);
    this.branchTest.display();
    this.popMatrix();
    this.pushMatrix();
    this.translate(-7, 1, 7);
    this.scale(0.5, 0.5, 0.5);
    this.trees[4].display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(1, 0, -4);
    this.scale(0.5, 1, 0.5);
    this.branchTest.display();
    this.popMatrix();
    this.pushMatrix();
    this.translate(1, 1, -4);
    this.scale(0.5, 0.5, 0.5);
    this.trees[3].display();
    this.popMatrix();

    //-------------relampago----------
    this.pushMatrix();
    this.scale(0.8, 3, 1);
    this.relampago.display();
    this.popMatrix();
  }
}
