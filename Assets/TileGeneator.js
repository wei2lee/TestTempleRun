#pragma strict


var maxTile:int = 10;
var tilePrefabs:Transform[];
var initPosition:Vector3 = Vector3.zero;
private var tiles:List.<Transform> = new List.<Transform>();
private var tileId:int;
function Start () { 
	if(tilePrefabs.Length==0)enabled=false;
}

function Update () {
	var ind:int;
	var ctile:Transform;
	var cstart:Transform;
	var cend:Transform;
	
	var ltile:Transform;
	var lstart:Transform;
	var lend:Transform;
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
}