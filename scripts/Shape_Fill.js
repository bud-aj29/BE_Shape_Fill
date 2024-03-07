import { world, system } from '@minecraft/server';

system.afterEvents.scriptEventReceive.subscribe(event=>{
	switch(event.id){
		case "fill:cylinder" :
			cylinderFill(event.sourceEntity, event.message);
			break;
		case "replace:cylinder" :
			cylinderReplace(event.sourceEntity, event.message);
			break;
		case "shell:cylinder" :
			cylinderShell(event.sourceEntity, event.message);
			break;
		case "fill:sphere" :
			sphereFill(event.sourceEntity, event.message);
			break;
		case "replace:sphere" :
			sphereReplace(event.sourceEntity, event.message);
			break;
		case "shell:sphere" :
			sphereShell(event.sourceEntity, event.message);
			break;
		case "fill:hemisphere" :
			hemisphereFill(event.sourceEntity, event.message);
			break;
		case "replace:hemisphere" :
			hemisphereReplace(event.sourceEntity, event.message);
			break;
		case "shell:hemisphere" :
			hemisphereShell(event.sourceEntity, event.message);
			break;
		case "fill:cone" :
			coneFill(event.sourceEntity, event.message);
			break;
		case "replace:cone" :
			coneReplace(event.sourceEntity, event.message);
			break;
		case "shell:cone" :
			coneShell(event.sourceEntity, event.message);
			break;
		case "fill:torus" :
			torusFill(event.sourceEntity, event.message);
			break;
		case "replace:torus" :
			torusReplace(event.sourceEntity, event.message);
			break;
		case "shell:torus" :
			torusShell(event.sourceEntity, event.message);
			break;
	}
}, {namespaces : ["fill", "replace", "shell"]});

function cylinderFill(player, message){
//scriptevent fill:cylinder <center: x y z> <radius> <height> <tileName: Block>
	//scriptevent fill:cylinder 0 -59 0 75 20 glass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let height = messageSplit[4];
	let block = messageSplit[5];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= radius * radius){
					let commandString = x + " "
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
function cylinderReplace(player, message){
//scriptevent replace:cylinder <center: x y z> <radius> <height> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:cylinder 0 -59 0 75 20 glass grass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let height = messageSplit[4];
	let block = messageSplit[5];
	let replace = messageSplit[6];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= radius * radius){
					let commandString = x + " "
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
function cylinderShell(player, message){
//scriptevent shell:cylinder <center: x y z> <radius> <height> <tileName: Block>
	//scriptevent shell:cylinder 0 -59 0 75 20 glass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let height = messageSplit[4];
	let block = messageSplit[5];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if(((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= radius * radius)
				    &&((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) >= (radius - 1) * (radius - 1))){
					let commandString = x + " "
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
function sphereFill(player, message){
//scriptevent fill:sphere <center: x y z> <radius> <tileName: Block>
	//scriptevent fill:sphere 0 -59 0 25 glass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let block = messageSplit[4];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = -radius; y < radius; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius){
					let commandString = x + " "
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
function sphereReplace(player, message){
//scriptevent replace:sphere <center: x y z> <radius> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:sphere 0 -59 0 25 glass grass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let block = messageSplit[4];
	let replace = messageSplit[5];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = -radius; y < radius; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius){
					let commandString = x + " "
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
function sphereShell(player, message){
//scriptevent shell:sphere <center: x y z> <radius> <tileName: Block>
	//scriptevent shell:sphere 0 -59 0 25 glass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let block = messageSplit[4];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	
	for(let y = -radius; y < radius; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if(((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius)
				    &&((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) >= (radius - 1) * (radius - 1))){
					let commandString = x + " "
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
function hemisphereFill(player, message){
//scriptevent fill:hemisphere <center: x y z> <radius> <half: top/bottom> <tileName: Block>
	//scriptevent fill:hemisphere 0 -59 0 25 top glass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let half = messageSplit[4];
	let block = messageSplit[5];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	let fromHalf = (half == "bottom" ? -radius : 0);
	let toHalf = (half == "bottom" ? 0 : radius);
	
	for(let y = fromHalf; y < toHalf; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius){
					let commandString = x + " "
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
function hemisphereReplace(player, message){
//scriptevent replace:hemisphere <center: x y z> <radius> <half: top/bottom> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:hemisphere 0 -59 0 25 top glass grass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let half = messageSplit[4];
	let block = messageSplit[5];
	let replace = messageSplit[6];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	let fromHalf = (half == "bottom" ? -radius : 0);
	let toHalf = (half == "bottom" ? 0 : radius);
	
	for(let y = fromHalf; y < toHalf; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius){
					let commandString = x + " "
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
function hemisphereShell(player, message){
//scriptevent shell:hemisphere <center: x y z> <radius> <half: top/bottom> <tileName: Block>
	//scriptevent shell:hemisphere 0 -59 0 25 top glass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let half = messageSplit[4];
	let block = messageSplit[5];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	let fromHalf = (half == "bottom" ? -radius : 0);
	let toHalf = (half == "bottom" ? 0 : radius);
	
	for(let y = fromHalf; y < toHalf; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if(((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) <= radius * radius)
				    &&((x - centerX) * (x - centerX) + (toY - centerY) * (toY - centerY) + (z - centerZ) * (z - centerZ) >= (radius - 1) * (radius - 1))){
					let commandString = x + " "
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
function coneFill(player, message){
//scriptevent fill:cone <center: x y z> <bottom radius> <top radius> <height> <tileName: Block>
	//scriptevent fill:cone 0 -59 0 75 10 20 glass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let radiusTop = messageSplit[4];
	let height = messageSplit[5];
	let block = messageSplit[6];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	let radiusDiff = (Math.floor(radius) - Math.floor(radiusTop)) / Math.floor(height);
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= (Math.floor(radius) - (radiusDiff * y)) * (Math.floor(radius) - (radiusDiff * y))){
					let commandString = x + " "
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
function coneReplace(player, message){
//scriptevent replace:cone <center: x y z> <bottom radius> <top radius> <height> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:cone 0 -59 0 75 10 20 glass grass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let radiusTop = messageSplit[4];
	let height = messageSplit[5];
	let block = messageSplit[6];
	let replace = messageSplit[7];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	let radiusDiff = (Math.floor(radius) - Math.floor(radiusTop)) / Math.floor(height);
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= (Math.floor(radius) - (radiusDiff * y)) * (Math.floor(radius) - (radiusDiff * y))){
					let commandString = x + " "
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
function coneShell(player, message){
//scriptevent shell:cone <center: x y z> <bottom radius> <top radius> <height> <tileName: Block>
	//scriptevent shell:cone 0 -59 0 75 10 20 glass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let radius = messageSplit[3];
	let radiusTop = messageSplit[4];
	let height = messageSplit[5];
	let block = messageSplit[6];
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	let radiusDiff = (Math.floor(radius) - Math.floor(radiusTop)) / Math.floor(height);
	
	for(let y = 0; y < height; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if(((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) <= (Math.floor(radius) - (radiusDiff * y)) * (Math.floor(radius) - (radiusDiff * y)))
				    &&((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ) >= ((Math.floor(radius) - (radiusDiff * y)) - 1) * ((Math.floor(radius) - (radiusDiff * y)) - 1))){
					let commandString = x + " "
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
function torusFill(player, message){
//scriptevent fill:torus <center: x y z> <major radius> <minor radius> <tileName: Block>
	//scriptevent fill:torus 0 -59 0 75 20 glass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let major = messageSplit[3];
	let minor = messageSplit[4];
	let block = messageSplit[5];
	let radius = Math.floor(major) + Math.floor(minor);
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	let height = (Math.floor(minor) * 2) + 1;
	
	for(let y = -height; y < height; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    +(toY - centerY) * (toY - centerY) <= minor * minor){
					let commandString = x + " "
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
function torusReplace(player, message){
//scriptevent replace:torus <center: x y z> <major radius> <minor radius> <tileName: Block> <replaceTileName: Block>
	//scriptevent replace:torus 0 -59 0 75 20 glass grass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let major = messageSplit[3];
	let minor = messageSplit[4];
	let block = messageSplit[5];
	let replace = messageSplit[6];
	let radius = Math.floor(major) + Math.floor(minor);
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	let height = (Math.floor(minor) * 2) + 1;
	
	for(let y = -height; y < height; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    +(toY - centerY) * (toY - centerY) <= minor * minor){
					let commandString = x + " "
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
function torusShell(player, message){
//scriptevent shell:torus <center: x y z> <major radius> <minor radius> <tileName: Block>
	//scriptevent shell:torus 0 -59 0 75 20 glass
	
	let messageSplit = message.split(" ");
	let centerX = localCoord(player, messageSplit[0], "x");
	let centerY = localCoord(player, messageSplit[1], "y");
	let centerZ = localCoord(player, messageSplit[2], "z");
	let major = messageSplit[3];
	let minor = messageSplit[4];
	let block = messageSplit[5];
	let radius = Math.floor(major) + Math.floor(minor);
	let fromX = Math.floor(centerX) - Math.floor(radius);
	let fromZ = Math.floor(centerZ) - Math.floor(radius);
	let toX = Math.floor(centerX) + Math.floor(radius);
	let toZ = Math.floor(centerZ) + Math.floor(radius);
	let height = (Math.floor(minor) * 2) + 1;
	
	for(let y = -height; y < height; y++){
		let x = fromX;
		const loopX = () => {
			for(let z = fromZ; z <= toZ; z++){
				let toY = Math.floor(centerY) + y;
				if((Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    +(toY - centerY) * (toY - centerY) <= minor * minor
				    &&(Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    *(Math.sqrt((x - centerX) * (x - centerX) + (z - centerZ) * (z - centerZ)) - major)
				    +(toY - centerY) * (toY - centerY) >= (minor - 1) * (minor - 1)){
					let commandString = x + " "
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