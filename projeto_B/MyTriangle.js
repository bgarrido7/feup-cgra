class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

	}
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			0, 3, 0,	//1
			3, 0, 0,	//2
		];

		this.indices = [
			0, 2, 1,
			0, 1, 2,			
		];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,		
		];	
		//a face de tras nao tem luz 
		//pq nao sei pôr as normais para esse lado
		//(os pontos já se usam 1x nas normais para a face da frente) 
		
		
		this.initGLBuffers();
	}
/*
    display(){
        this.scene.leaf.apply();
        super.display();

    }*/
}