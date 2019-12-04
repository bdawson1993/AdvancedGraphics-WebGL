

class Rain{
    constructor(rainCount, scene)
    {
        this.drops = [];

            for(let i = 0; i<rainCount; i++)
            {
                let pos = new THREE.Vector3(
                Math.random() * 10 - 5,
                Math.random() * 10 - 5,
                Math.random() * 15);
                var rainDrop = new DropLet(scene, pos);

                //add object
                this.drops.push(rainDrop);
            }

    }   

    update()
    {
        this.drops.forEach(p => 
        {
            p.update();          
        });

        this.collisionChecks();
    }

    collisionChecks()
    {
        for(var i = 0; i < this.drops.length; i++)
        {
            for(var y = 0; y < this.drops.length;y++)
            {
                if(i == y) //don't check agaisnt self
                    continue;

                var dist = this.drops[i].posistion.distanceTo(this.drops[y].posistion);
                //console.log(dist);
                if(dist < 0.4)
                {
                    this.drops[i].collide();
                    this.drops[y].collide();
                }

                
            }
        }
    }

}


class DropLet
{
    constructor(scene, pos)
    {
        
        this.velocity = new THREE.Vector3(0,0, 0.01 + Math.random() * 0.01);
        this.dropGeo = new THREE.Geometry();
        this.dropMaterial = new THREE.PointsMaterial({
            color: new THREE.Color('blue'),
            size: 0.01,
            transparent: true});
        
        this.posistion = pos; 
        this.dropGeo.vertices.push(pos);
        
        this.dropletPoint = new THREE.Points(this.dropGeo, this.dropMaterial);


        scene.add(this.dropletPoint);
        
    }


    update() 
    {
        this.posistion = this.posistion.sub(this.velocity);
        this.dropletPoint.geometry.vertices[0] = this.posistion;
        this.dropletPoint.geometry.verticesNeedUpdate = true;
        this.dropletPoint.geometry.computeBoundingSphere();

        if(this.posistion.z < 0)
        {
            this.posistion.z = 10;
            this.dropMaterial.size = 0.01
            this.velocity = new THREE.Vector3(0,0, 0.01 + Math.random() * 0.01);
        }
    }

    collide()
    {
        this.dropMaterial.size = 0.08;
        this.velocity.add(new THREE.Vector3(0,0, 0.001))
    }



}

function update(){};



