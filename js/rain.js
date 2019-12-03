class Rain{
    constructor(rainCount)
    {
        this.rainDrop = new THREE.Vector3();
        this.rainGeo = new THREE.Geometry();
        this.rainMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.1,
            transparent: true});

            for(let i = 0; i<rainCount; i++)
            {
                this.rainDrop = new THREE.Vector3( 
                Math.random() * 400 -200,
                Math.random() * 500 - 250,
                Math.random() * 400 - 200
            );

            this.rainDrop.velocity = {};
            this.rainDrop.velocity = 0;
            this.rainGeo.vertices.push(this.rainDrop);
        }   

    }

    updateRain()
    {
        this.rainGeo.vertices.forEach(p => {
            p.velocity -= 0.1 + Math.random() * 0.1;
            p.z += p.velocity;
            if (p.z < -200) {
              p.z = 200;
              p.velocity = 0;
            }
          });
          this.rainGeo.verticesNeedUpdate = true;
          return true;
    }


}