#pragma strict

import System.Collections.Generic;

var maxTile:int = 10;
var tilePrefabs:Transform[];
var initPosition:Vector3 = Vector3.zero;

var destroyTileDistance:float = 200;
var destroyTileAfter:float = 5;
var useXZPlane:boolean = true;

private var player:Transform;
private var tiles:List.<Transform> = new List.<Transform>();
private var tileId:int;
function Start () { 
	player = GameObject.Find("Player");
	if(!player && !tilePrefabs.Length)enabled=false;
}

function Update () {
	var ind:int;
	var ctile:Transform;
	var cstart:Transform;
	var cend:Transform;
	
	var ltile:Transform;
	var lstart:Transform;
	var lend:Transform;
	
	var i:int;
	while(tiles.Count < maxTile) {
	
		if(tileId == 0) {
			ind = 0;
		}else{
			do {
				ind = Random.Range(0, tilePrefabs.Length);
			}while(!tilePrefabs[ind]);
		}
		
		ctile = GameObject.Instantiate(tilePrefabs[ind]);
		if(tileId==0) ctile.position=initPosition;
		
		ctile.name = "tile" + tileId++;
		ctile.transform.parent = transform;
		
		cstart = ctile.Find("Start");
		cend = ctile.Find("End");
		
		if(tiles.Count > 0) {
			ltile = tiles[tiles.Count - 1] as Transform;
			lstart = ltile.Find("Start");
			lend = ltile.Find("End");
		}
		
		if(lstart && lend && cstart && cend) {
			ctile.rotation = lend.rotation;
			ctile.position += lend.position - cstart.position;
		}
		tiles.Add(ctile);
	}
	
	for(i = tiles.Count - 1 ; i >= 0 ; i++) {
		var t:Transform = tiles[i];
		if((!useXZPlane && Vector3.Distance(player.position, t.position) > destroyTileDistance) || 
			(useXZPlane && Vector3.Distance(Vector3(player.position.x, 0, player.position.z), Vector3(t.position.x, 0, t.position.z)) > destroyTileDistance)  {
			tiles.RemoveAt(i);			
			GameObject.Destroy(t, destroyTileAfter);
		}
	}
}