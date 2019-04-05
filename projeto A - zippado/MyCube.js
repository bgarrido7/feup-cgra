class MyCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			//face tras
			-0.5, -0.5, -0.5,	//0    0
			0.5, -0.5, -0.5, 	//3		1
			0.5, 0.5, -0.5,		//18	2
			-0.5, 0.5, -0.5, 	//21	3
			
			//face baixo
			-0.5, -0.5, -0.5,	//0		4
			0.5, -0.5, -0.5,	//3		5
			0.5, -0.5, 0.5,		//6		6
			-0.5, -0.5, 0.5,	//9		7

			//face direita
			0.5, -0.5, -0.5,	//3		8
			0.5, -0.5, 0.5,		//6		9
			0.5, 0.5, 0.5,		//15	10
			0.5, 0.5, -0.5,		//18	11

			//face esquerda
			-0.5, -0.5, -0.5,	//0		12
			-0.5, -0.5, 0.5,	//9		13
			-0.5, 0.5, 0.5,		//12	14
			-0.5, 0.5, -0.5,	//21	15

			//face cima
			-0.5, 0.5, 0.5,		//12	16
			0.5, 0.5, 0.5,		//15	17
			0.5, 0.5, -0.5,		//18	18
			-0.5, 0.5, -0.5,	//21	19
			
			//face frente
			0.5, -0.5, 0.5,		//6		20
			-0.5, -0.5, 0.5,	//9		21
			-0.5, 0.5, 0.5,		//12	22
			0.5, 0.5, 0.5,		//15	23
		];

		//Counter-clockwise reference of vertices

		this.indices = [
		//face tras
		2, 0, 1,
		2,3,0,

		//face baixo
		4,7,6,
		4,6,5,

		//face direita
		10,11,8,
		10,8,9,

		//face esquerda
		15,14,13,
		12,15,13,

		//face cima
		19,18,17,
		19,17,16,

		//face frente
		23,20,21,
		22,23,21,
		];
		
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.normals = [
			
			//face tras
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			//face baixo
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			//face direita
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			//face esquerda
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			

			//face cima
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,

			//face frente
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
		]

			this.initGLBuffers();
	}
}