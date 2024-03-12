import { world, system } from '@minecraft/server';

let centerX;
let centerY;
let centerZ;

system.afterEvents.scriptEventReceive.subscribe(event=>{
	const messageSplit = event.message.split(" ");
	const player = event.sourceEntity;
	centerX = localCoord(player, messageSplit[0], "x");
	centerY = localCoord(player, messageSplit[1], "y");
	centerZ = localCoord(player, messageSplit[2], "z");
	
	switch(event.id){
		case "fill:cylinder" :
			cylinderFill(player, messageSplit);
			break;
		case "replace:cylinder" :
			cylinderReplace(player, messageSplit);
			break;
		case "shell:cylinder" :
			cylinderShell(player, messageSplit);
			break;
		case "fill:cylinder_rotated" :
			cylinder_rotatedFill(player, messageSplit);
			break;
		case "replace:cylinder_rotated" :
			cylinder_rotatedReplace(player, messageSplit);
			break;
		case "shell:cylinder_rotated" :
			cylinder_rotatedShell(player, messageSplit);
			break;
		case "fill:sphere" :
			sphereFill(player, messageSplit);
			break;
		case "replace:sphere" :
			sphereReplace(player, messageSplit);
			break;
		case "shell:sphere" :
			sphereShell(player, messageSplit);
			break;
		case "fill:hemisphere" :
			hemisphereFill(player, messageSplit);
			break;
		case "replace:hemisphere" :
			hemisphereReplace(player, messageSplit);
			break;
		case "shell:hemisphere" :
			hemisphereShell(player, messageSplit);
			break;
		case "fill:cone" :
			coneFill(player, messageSplit);
			break;
		case "replace:cone" :
			coneReplace(player, messageSplit);
			break;
		case "shell:cone" :
			coneShell(player, messageSplit);
			break;
		case "fill:torus" :
			torusFill(player, messageSplit);
			break;
		case "replace:torus" :
			torusReplace(player, messageSplit);
			break;
		case "shell:torus" :
			torusShell(player, messageSplit);
			break;
		case "fill:torus_rotated" :
			torus_rotatedFill(player, messageSplit);
			break;
		case "replace:torus_rotated" :
			torus_rotatedReplace(player, messageSplit);
			break;
		case "shell:torus_rotated" :
			torus_rotatedShell(player, messageSplit);
			break;
		case "fill:pyramid" :
			pyramidFill(player, messageSplit);
			break;
		case "replace:pyramid" :
			pyramidReplace(player, messageSplit);
			break;
		case "shell:pyramid" :
			pyramidShell(player, messageSplit);
			break;
	}
}, {namespaces : ["fill", "replace", "shell"]});

function cylinderFill(player, messageSplit){
//scriptevent fill:cylinder <center: x y z> <radius> <height> <tileName: Block>
	//scriptevent fill:cylinder ~ -60 ~ 25 50 prismarine
	
	const radius = messageSplit[3];
	const height = messageSplit[4];
	const block = messageSplit[5];
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= radius * radius){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function cylinderReplace(player, messageSplit){
//scriptevent replace:cylinder <center: x y z> <radius> <height> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:cylinder ~ -61 ~ 25 50 prismarine grass
	
	const radius = messageSplit[3];
	const height = messageSplit[4];
	const block = messageSplit[5];
	const replace = messageSplit[6];
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= radius * radius){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block + " "
						+ "replace " + replace;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function cylinderShell(player, messageSplit){
//scriptevent shell:cylinder <center: x y z> <radius> <height> <tileName: Block>
	//scriptevent shell:cylinder ~ -60 ~ 25 50 prismarine
	
	const radius = messageSplit[3];
	const height = messageSplit[4];
	const block = messageSplit[5];
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if(((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= radius * radius)
				    &&((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) >= (radius - 1) * (radius - 1))){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function cylinder_rotatedFill(player, messageSplit){
//scriptevent fill:cylinder_rotated <center: x y z> <radius> <length> <tileName: Block>
	//scriptevent fill:cylinder_rotated ~ -60 ~ 25 50 prismarine
	
	const radius = messageSplit[3];
	const length = messageSplit[4];
	const block = messageSplit[5];
	const fromX = centerX - radius;
	const fromZ = centerZ;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(length);
	
	for(let y = -radius; y <= radius; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z < toZ; z++){
				if((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) <= radius * radius){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function cylinder_rotatedReplace(player, messageSplit){
//scriptevent replace:cylinder_rotated <center: x y z> <radius> <length> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:cylinder_rotated ~ -61 ~ 25 50 prismarine grass
	
	const radius = messageSplit[3];
	const length = messageSplit[4];
	const block = messageSplit[5];
	const replace = messageSplit[6];
	const fromX = centerX - radius;
	const fromZ = centerZ;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(length);
	
	for(let y = -radius; y <= radius; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z < toZ; z++){
				if((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) <= radius * radius){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block + " "
						+ "replace " + replace;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function cylinder_rotatedShell(player, messageSplit){
//scriptevent shell:cylinder_rotated <center: x y z> <radius> <length> <tileName: Block>
	//scriptevent shell:cylinder_rotated ~ -60 ~ 25 50 prismarine
	
	const radius = messageSplit[3];
	const length = messageSplit[4];
	const block = messageSplit[5];
	const fromX = centerX - radius;
	const fromZ = centerZ;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(length);
	
	for(let y = -radius; y <= radius; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z < toZ; z++){
				if(((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) <= radius * radius)
				    &&((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) >= (radius - 1) * (radius - 1))){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function sphereFill(player, messageSplit){
//scriptevent fill:sphere <center: x y z> <radius> <tileName: Block>
	//scriptevent fill:sphere ~ -60 ~ 25 prismarine
	
	const radius = messageSplit[3];
	const block = messageSplit[4];
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = -radius; y < radius; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function sphereReplace(player, messageSplit){
//scriptevent replace:sphere <center: x y z> <radius> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:sphere ~ -61 ~ 25 prismarine grass
	
	const radius = messageSplit[3];
	const block = messageSplit[4];
	const replace = messageSplit[5];
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = -radius; y < radius; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block + " "
						+ "replace " + replace;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function sphereShell(player, messageSplit){
//scriptevent shell:sphere <center: x y z> <radius> <tileName: Block>
	//scriptevent shell:sphere ~ -60 ~ 25 prismarine
	
	const radius = messageSplit[3];
	const block = messageSplit[4];
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = -radius; y < radius; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if(((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius)
				    &&((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) >= (radius - 1) * (radius - 1))){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function hemisphereFill(player, messageSplit){
//scriptevent fill:hemisphere <center: x y z> <radius> <half: top/bottom> <tileName: Block>
	//scriptevent fill:hemisphere ~ -60 ~ 25 top prismarine
	
	const radius = messageSplit[3];
	const half = messageSplit[4];
	const block = messageSplit[5];
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	const fromHalf = (half == "bottom" ? -radius : 0);
	const toHalf = (half == "bottom" ? 0 : radius);
	
	for(let y = fromHalf; y < toHalf; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function hemisphereReplace(player, messageSplit){
//scriptevent replace:hemisphere <center: x y z> <radius> <half: top/bottom> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:hemisphere ~ -61 ~ 25 top prismarine grass
	
	const radius = messageSplit[3];
	const half = messageSplit[4];
	const block = messageSplit[5];
	const replace = messageSplit[6];
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	const fromHalf = (half == "bottom" ? -radius : 0);
	const toHalf = (half == "bottom" ? 0 : radius);
	
	for(let y = fromHalf; y < toHalf; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block + " "
						+ "replace " + replace;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function hemisphereShell(player, messageSplit){
//scriptevent shell:hemisphere <center: x y z> <radius> <half: top/bottom> <tileName: Block>
	//scriptevent shell:hemisphere ~ -60 ~ 25 top prismarine
	
	const radius = messageSplit[3];
	const half = messageSplit[4];
	const block = messageSplit[5];
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	const fromHalf = (half == "bottom" ? -radius : 0);
	const toHalf = (half == "bottom" ? 0 : radius);
	
	for(let y = fromHalf; y < toHalf; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if(((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius)
				    &&((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) >= (radius - 1) * (radius - 1))){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function coneFill(player, messageSplit){
//scriptevent fill:cone <center: x y z> <bottom radius> <top radius> <height> <tileName: Block>
	//scriptevent fill:cone ~ -60 ~ 30 1 50 prismarine
	
	const radius = messageSplit[3];
	const radiusTop = messageSplit[4];
	const height = messageSplit[5];
	const block = messageSplit[6];
	const fromX = centerX - (radius > radiusTop ? radius : radiusTop);
	const fromZ = centerZ - (radius > radiusTop ? radius : radiusTop);
	const toX = Math.floor(centerX) + (radius > radiusTop ? Math.floor(radius) : Math.floor(radiusTop));
	const toZ = Math.floor(centerZ) + (radius > radiusTop ? Math.floor(radius) : Math.floor(radiusTop));
	const radiusDiff = (radius - radiusTop) / height;
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= (radius - (radiusDiff * y)) * (radius - (radiusDiff * y))){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function coneReplace(player, messageSplit){
//scriptevent replace:cone <center: x y z> <bottom radius> <top radius> <height> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:cone ~ -61 ~ 30 1 50 prismarine grass
	
	const radius = messageSplit[3];
	const radiusTop = messageSplit[4];
	const height = messageSplit[5];
	const block = messageSplit[6];
	const replace = messageSplit[7];
	const fromX = centerX - (radius > radiusTop ? radius : radiusTop);
	const fromZ = centerZ - (radius > radiusTop ? radius : radiusTop);
	const toX = Math.floor(centerX) + (radius > radiusTop ? Math.floor(radius) : Math.floor(radiusTop));
	const toZ = Math.floor(centerZ) + (radius > radiusTop ? Math.floor(radius) : Math.floor(radiusTop));
	const radiusDiff = (radius - radiusTop) / height;
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= (radius - (radiusDiff * y)) * (radius - (radiusDiff * y))){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block + " "
						+ "replace " + replace;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function coneShell(player, messageSplit){
//scriptevent shell:cone <center: x y z> <bottom radius> <top radius> <height> <tileName: Block>
	//scriptevent shell:cone ~ -60 ~ 30 1 50 prismarine
	
	const radius = messageSplit[3];
	const radiusTop = messageSplit[4];
	const height = messageSplit[5];
	const block = messageSplit[6];
	const fromX = centerX - (radius > radiusTop ? radius : radiusTop);
	const fromZ = centerZ - (radius > radiusTop ? radius : radiusTop);
	const toX = Math.floor(centerX) + (radius > radiusTop ? Math.floor(radius) : Math.floor(radiusTop));
	const toZ = Math.floor(centerZ) + (radius > radiusTop ? Math.floor(radius) : Math.floor(radiusTop));
	const radiusDiff = (radius - radiusTop) / height;
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if(((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= (radius - (radiusDiff * y)) * (radius - (radiusDiff * y)))
				    &&((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) >= ((radius - (radiusDiff * y)) - 1) * ((radius - (radiusDiff * y)) - 1))){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function torusFill(player, messageSplit){
//scriptevent fill:torus <center: x y z> <major radius> <minor radius> <tileName: Block>
	//scriptevent fill:torus ~ -60 ~ 50 10 prismarine
	
	const major = messageSplit[3];
	const minor = messageSplit[4];
	const block = messageSplit[5];
	const radius = Math.floor(major) + Math.floor(minor);
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	const height = (minor * 2) + 1;
	
	for(let y = -height; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    +(toY - centerY) * (toY - centerY) <= minor * minor){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function torusReplace(player, messageSplit){
//scriptevent replace:torus <center: x y z> <major radius> <minor radius> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:torus ~ -61 ~ 50 10 prismarine grass
	
	const major = messageSplit[3];
	const minor = messageSplit[4];
	const block = messageSplit[5];
	const replace = messageSplit[6];
	const radius = Math.floor(major) + Math.floor(minor);
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	const height = (minor * 2) + 1;
	
	for(let y = -height; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    +(toY - centerY) * (toY - centerY) <= minor * minor){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block + " "
						+ "replace " + replace;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function torusShell(player, messageSplit){
//scriptevent shell:torus <center: x y z> <major radius> <minor radius> <tileName: Block>
	//scriptevent shell:torus ~ -60 ~ 50 10 prismarine
	
	const major = messageSplit[3];
	const minor = messageSplit[4];
	const block = messageSplit[5];
	const radius = Math.floor(major) + Math.floor(minor);
	const fromX = centerX - radius;
	const fromZ = centerZ - radius;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(radius);
	const height = (minor * 2) + 1;
	
	for(let y = -height; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    +(toY - centerY) * (toY - centerY) <= minor * minor
				    &&(Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    +(toY - centerY) * (toY - centerY) >= (minor - 1) * (minor - 1)){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function torus_rotatedFill(player, messageSplit){
//scriptevent fill:torus_rotated <center: x y z> <major radius> <minor radius> <tileName: Block>
	//scriptevent fill:torus_rotated ~ -60 ~ 50 10 prismarine
	
	const major = messageSplit[3];
	const minor = messageSplit[4];
	const block = messageSplit[5];
	const radius = Math.floor(major) + Math.floor(minor);
	const fromX = centerX - radius;
	const fromZ = centerZ - minor;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(minor);
	
	for(let y = -radius; y <= radius; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((Math.sqrt((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY)) - major)
				    +(z - centerZ) * (z - centerZ) <= minor * minor){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function torus_rotatedReplace(player, messageSplit){
//scriptevent replace:torus_rotated <center: x y z> <major radius> <minor radius> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:torus_rotated ~ -61 ~ 50 10 prismarine grass
	
	const major = messageSplit[3];
	const minor = messageSplit[4];
	const block = messageSplit[5];
	const replace = messageSplit[6];
	const radius = Math.floor(major) + Math.floor(minor);
	const fromX = centerX - radius;
	const fromZ = centerZ - minor;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(minor);
	
	for(let y = -radius; y <= radius; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((Math.sqrt((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY)) - major)
				    +(z - centerZ) * (z - centerZ) <= minor * minor){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block + " "
						+ "replace " + replace;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function torus_rotatedShell(player, messageSplit){
//scriptevent shell:torus_rotated <center: x y z> <major radius> <minor radius> <tileName: Block>
	//scriptevent shell:torus_rotated ~ -60 ~ 50 10 prismarine
	
	const major = messageSplit[3];
	const minor = messageSplit[4];
	const block = messageSplit[5];
	const radius = Math.floor(major) + Math.floor(minor);
	const fromX = centerX - radius;
	const fromZ = centerZ - minor;
	const toX = Math.floor(centerX) + Math.floor(radius);
	const toZ = Math.floor(centerZ) + Math.floor(minor);
	
	for(let y = -radius; y <= radius; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((Math.sqrt((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY)) - major)
				    +(z - centerZ) * (z - centerZ) <= minor * minor
				    &&(Math.sqrt((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY)) - major)
				    +(z - centerZ) * (z - centerZ) >= (minor - 1) * (minor - 1)){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function pyramidFill(player, messageSplit){
//scriptevent fill:pyramid <center: x y z> <bottom width> <top width> <height> <tileName: Block>
	//scriptevent fill:pyramid ~ -60 ~ 30 1 50 prismarine
	
	const width = messageSplit[3];
	const widthTop = messageSplit[4];
	const height = messageSplit[5];
	const block = messageSplit[6];
	const halfWidth = Math.floor((width - 1) / 2);
	const halfWidthTop = Math.floor((widthTop - 1) / 2);
	const fromX = centerX - (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const fromZ = centerZ - (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const toX = Math.floor(centerX) + (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const toZ = Math.floor(centerZ) + (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const widthDiff = (halfWidth - halfWidthTop) / height;
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const widthShift = (halfWidth > halfWidthTop ? (widthDiff * y) : (-widthDiff * (height - y)));
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if(x >= (fromX + widthShift) && x <= (toX - widthShift)
				    && z >= (fromZ + widthShift) && z <= (toZ - widthShift)){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function pyramidReplace(player, messageSplit){
//scriptevent replace:pyramid <center: x y z> <bottom width> <top width> <height> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:pyramid ~ -61 ~ 30 1 50 prismarine grass
	
	const width = messageSplit[3];
	const widthTop = messageSplit[4];
	const height = messageSplit[5];
	const block = messageSplit[6];
	const replace = messageSplit[7];
	const halfWidth = Math.floor((width - 1) / 2);
	const halfWidthTop = Math.floor((widthTop - 1) / 2);
	const fromX = centerX - (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const fromZ = centerZ - (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const toX = Math.floor(centerX) + (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const toZ = Math.floor(centerZ) + (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const widthDiff = (halfWidth - halfWidthTop) / height;
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const widthShift = (halfWidth > halfWidthTop ? (widthDiff * y) : (-widthDiff * (height - y)));
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if(x >= (fromX + widthShift) && x <= (toX - widthShift)
				    && z >= (fromZ + widthShift) && z <= (toZ - widthShift)){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block + " "
						+ "replace " + replace;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function pyramidShell(player, messageSplit){
//scriptevent shell:pyramid <center: x y z> <bottom width> <top width> <height> <tileName: Block>
	//scriptevent shell:pyramid ~ -60 ~ 30 1 50 prismarine
	
	const width = messageSplit[3];
	const widthTop = messageSplit[4];
	const height = messageSplit[5];
	const block = messageSplit[6];
	const halfWidth = Math.floor((width - 1) / 2);
	const halfWidthTop = Math.floor((widthTop - 1) / 2);
	const fromX = centerX - (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const fromZ = centerZ - (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const toX = Math.floor(centerX) + (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const toZ = Math.floor(centerZ) + (halfWidth > halfWidthTop ? halfWidth : halfWidthTop);
	const widthDiff = (halfWidth - halfWidthTop) / height;
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const toY = Math.floor(centerY) + y;
		const widthShift = (halfWidth > halfWidthTop ? (widthDiff * y) : (-widthDiff * (height - y)));
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				if((x == Math.ceil(fromX + widthShift) && z >= Math.ceil(fromZ + widthShift) && z <= Math.floor(toZ - widthShift))
				    ||(x == Math.floor(toX - widthShift) && z >= Math.ceil(fromZ + widthShift) && z <= Math.floor(toZ - widthShift))
				    ||(z == Math.ceil(fromZ + widthShift) && x >= Math.ceil(fromX + widthShift) && x <= Math.floor(toX - widthShift))
				    ||(z == Math.floor(toZ - widthShift) && x >= Math.ceil(fromX + widthShift) && x <= Math.floor(toX - widthShift))){
					const commandString = x + " "
						+ toY + " "
						+ z + " "
						+ x + " "
						+ toY + " "
						+ z + " "
						+ block;
					
					player.runCommand("fill " + commandString);
				}
			}
			if(x <= toX){
				system.run(loopX);
			}
			x++;
		};
		loopX();
	}
}
function localCoord(player, coord, axis){
	let tempCoord;
	let tempLocation;
	
	switch(axis){
		case "x" :
			tempLocation = Math.floor(player.location.x)
			break;
		case "y" :
			tempLocation = Math.floor(player.location.y)
			break;
		case "z" :
			tempLocation = Math.floor(player.location.z)
			break;
	}
	if(coord.indexOf("~") > -1 && (coord.length > 1)){
		tempCoord = tempLocation + Math.floor(coord.replace("~", ""))
	}else if(coord.indexOf("~") > -1 && (coord.length == 1)){
		tempCoord = tempLocation
	}else if(coord.indexOf("~") == -1){
		tempCoord = coord
	}
	return tempCoord;
}