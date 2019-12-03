

class Rain{
    constructor(rainCount)
    {
        this.velocity = 0.001 + Math.random() * 0.001;
        this.rainDrop = new THREE.Vector3();
        this.rainGeo = new THREE.Geometry();
        this.rainMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 0.01,
            transparent: true});

            for(let i = 0; i<rainCount; i++)
            {
                this.rainDrop = new THREE.Vector3( 
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 15
            );

            this.rainDrop.velocity = {};
            this.rainDrop.velocity = 0;
            this.rainGeo.vertices.push(this.rainDrop);
        }   

    }

    updateRain()
    {
        this.rainGeo.vertices.forEach(p => 
        {
            p.velocity -= this.velocity;
            p.z += p.velocity;
            if (p.z < 0) {
                p.z = 10;
                p.velocity = 0;
            }           
          });
          this.rainGeo.verticesNeedUpdate = true;
          return true;
    }


}

function updateRain(){};


