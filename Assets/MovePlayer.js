#pragma strict


private var player:Transform;
private var followPath:FollowPath;
private var level:Transform;
private var tileGenerator:TileGeneator;
function Start () {
	player = GameObject.Find("Player");
	followPath = player.GetComponent(FollowPath);
	
	level = GameObject.Find("Level");
	tileGenerator = level.GetComponent(TileGeneator);
	
	if(!player || !followPath || !level || !tileGenerator)enabled=false;
}

function Update () {
	
}