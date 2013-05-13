#pragma strict

import System.Collections.Generic;

var waypoints:List.<Transform> = new List.<Transform>();
var waypointRadius : float  = 0.1;
var damping : float = 100;
var loop : boolean = false;
var speed : float = 6;
var faceHeading : boolean = true;
var jumpSpeed : float = 8;
var useQueue : boolean = false;

private var targetHeading : Vector3;
private var currentHeading : Vector3;
private var targetwaypoint : Transform;
private var targetwaypointind : int;
private var xform : Transform;
private var distToTWPoint : float;

var useXZPlane:boolean = true;
var useCharacterController:boolean = true;
var gravity:float = 20;
var leanSpeed:float = 6;
private var ctrlr:CharacterController;
private var mv:Vector3;

function isWayPointsValid():boolean {
	if(useQueue) return true;

	var i:int = 0;
	if(waypoints.Count==0)return false;
	for(i=0;i<waypoints.Count;i++){
		if(waypoints[i]==null)
			return false;
	}
	return true;
}


// Use this for initialization
function Start() {
	ctrlr = GetComponent(CharacterController);
    xform = transform;
    
    
    if(!useQueue) currentHeading = xform.forward;
    else currentHeading = Vector3.zero;
    
    if(!isWayPointsValid())
    {
        Debug.Log("No waypoints on "+name);
        enabled = false;
    }
    
    if(!useQueue) {
    	targetwaypointind = 0;
    	targetwaypoint = waypoints[targetwaypointind];
    }else {
    	targetwaypoint = waypoints[0];
    	waypoints.RemoveAt(0);
    }
}


// calculates a new heading
function FixedUpdate() {
	if(!useQueue) targetwaypoint = waypoints[targetwaypointind];
	if(useXZPlane)
    	targetHeading = Vector3(targetwaypoint.position.x, xform.position.y, targetwaypoint.position.z) - xform.position;
    else {
    	targetHeading = targetwaypoint.position - xform.position;
    }
    targetHeading.Normalize();
    currentHeading = Vector3.Lerp(currentHeading,targetHeading,damping*Time.deltaTime);
}

// moves us along current heading
function Update(){
	
	if(!useCharacterController) {
    	xform.position +=currentHeading * Time.deltaTime * speed;
    	if(faceHeading) {
        	xform.LookAt(xform.position+currentHeading);
        }
    }else{
    	mv = currentHeading * speed * Time.deltaTime;
    	mv.y -= gravity * Time.deltaTime;
    	ctrlr.Move(mv);
    }
	
	if(!useXZPlane)
		distToTWPoint = Vector3.Distance(xform.position,targetwaypoint.position);
	else
		distToTWPoint = Vector3.Distance(xform.position,Vector3(targetwaypoint.position.x, xform.position.y, targetwaypoint.position.z));
    if(distToTWPoint<=waypointRadius)
    {
    	if(!useQueue) {
    
	        targetwaypointind++;
	        if(targetwaypointind>=waypoints.Count)
	        {
	            targetwaypointind = 0;
	            if(!loop)
	                enabled = false;
	        }
        
        }else{
        	if(waypoints.Count > 0){
        		targetwaypoint = waypoints[0];
        		waypoints.RemoveAt(0);
        	}else{
        		enabled = false;
        	}
        }
    }
}


// draws red line from waypoint to waypoint
function OnDrawGizmos(){
	
	Gizmos.color = Color.blue;
	if(xform){
		Gizmos.DrawRay(xform.position, currentHeading);
	};
	
    Gizmos.color = Color.red;
    for(var i : int = 0; i< waypoints.Count;i++)
    {
       var pos : Vector3 = waypoints[i].position;
        if(i>0)
        {
            var prev : Vector3 = waypoints[i-1].position;
            Gizmos.DrawLine(prev,pos);
        }
    }
}