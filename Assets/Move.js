#pragma strict

var gravity:float = 20;
var jumpSpeed:float = 8;
var damping:float = 1;
var speed:float = 6;
var rotateSpeed:float = 90;
private var mv:Vector3 = Vector3.zero;
private var rotv:Quaternion;
private var hin:float;
private var vin:float;
function Start () {
}

function Update () {
	hin = Input.GetAxis("Horizontal");
	vin = Input.GetAxis("Vertical");
	var ctrlr:CharacterController = GetComponent(CharacterController);
	if(ctrlr.isGrounded) {	
		mv = Vector3(0, 0, vin);
		mv = transform.TransformDirection(mv);
		mv *= speed;
		if(Input.GetButton("Jump")) {
			mv.y = jumpSpeed; 			
		}
	}
	mv.y -= gravity * Time.deltaTime;
	transform.Rotate(0, hin * rotateSpeed * Time.deltaTime, 0);
	ctrlr.Move(mv * Time.deltaTime);
	
}
