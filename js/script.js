
var vid, playbtn,seekslider,curtimetext,durtimetext,mutebtn,volumeslider,fullscreenbtn,vid2,stepforward,stepbackward,
next,previous,switchscreen,count,playerdiv,screenshot,dragdiv,counter,curdivheight,dragdivval,lbl,txtJump,btnJump,lblvps;
function initializePlayer(){	

	vid = document.getElementById("my_video");
	vid2 = document.getElementById("my_video2");
	playbtn = document.getElementById("playpausebtn");
	seekslider = document.getElementById("seekslider");
	curtimetext = document.getElementById("curtimetext");
	durtimetext = document.getElementById("durtimetext");
	mutebtn = document.getElementById("mutebtn");
	volumeslider = document.getElementById("volumeslider");
	fullscreenbtn = document.getElementById("fullscreenbtn");
	stepforward = document.getElementById("stepforward");
	stepbackward = document.getElementById("stepbackward");	
	switchscreen = document.getElementById("switchscreen");
	playerdiv = document.getElementById("mainContent");	
	dragdiv = document.getElementById("draggable");
	lbl = document.getElementById("lbl");
	txtJump = document.getElementById("txtJump");
	btnJump = document.getElementById("btnJump");
	lblvps = document.getElementById("lblvps");
	
	count = 0;
	counter = 0;
	vid2.muted = true;
	dragdiv.style.pointerEvents = "none";
	dragdiv.style.background = "url(img/a.png)";
	lbl.innerHTML = 'Normal mode';
	vid.frameRate = 29.97;	
		
	//Add Event listeners
	//video element one listeners
	playbtn.addEventListener("click",playPause,false);
	seekslider.addEventListener("change",vidSeek,false);
	vid.addEventListener("timeupdate",seekTimeUpdate,false);
	mutebtn.addEventListener("click",vidMute,false);
	volumeslider.addEventListener("change",setVolume,false);
	fullscreenbtn.addEventListener("click",toggleFullScreen,false);
	vid.addEventListener("ended",onFinish,false);

	stepforward.addEventListener("click",stepVideoForward,false);
	stepbackward.addEventListener("click",stepVideoBackward,false);	
	switchscreen.addEventListener("click",toggleScreen,false);
	btnJump.addEventListener("click",jumpToFrame,false);	
	txtJump.addEventListener("click",pauseVideo,false);
	
}
window.onload = initializePlayer();

//video one functions
function playPause() {		
	if(vid.paused){
		vid.play();
		playbtn.style.background = "url(img/pause.png)";

		vid2.play();
	}
	else{
		vid.pause();	
		playbtn.style.background = "url(img/play1.png)";

		vid2.pause();	
	}
}

function vidSeek() {
	var seekto = vid.duration * (seekslider.value / 100);
	vid.currentTime = seekto;
	vid2.currentTime = seekto;
}

function seekTimeUpdate(){
	if(vid.duration > vid2.duration){
		var nt = vid.currentTime * (100 / vid.duration);
		seekslider.value = nt;
		var curmins = Math.floor(vid.currentTime / 60);
		var cursecs = Math.floor(vid.currentTime - curmins * 60);
		var durmins = Math.floor(vid.duration / 60);
		var dursecs = Math.floor(vid.duration - durmins * 60);
		if(cursecs < 10){
			cursecs = "0"+cursecs;
		}
		if(dursecs < 10){
			dursecs = "0"+dursecs;
		}
		if(curmins < 10){
			curmins = "0"+curmins;
		}
		if(durmins < 10){
			durmins = "0"+durmins;
		}
		curtimetext.innerHTML = curmins+":"+cursecs;
		durtimetext.innerHTML = durmins+":"+dursecs;
		txtJump.value = vid.currentTime;
		if(vid.readyState == 0){
			lblvps.innerHTML = "No information is available about the media resource.";
		}
		else if(vid.readyState == 1){
			lblvps.innerHTML = "Enough of the media resource has been retrieved that the metadata attributes are initialized. Seeking will no longer raise an exception.";
		}
		else if(vid.readyState == 2){
			lblvps.innerHTML = "Data is available for the current playback position, but not enough to actually play more than one frame.";
		}
		else if(vid.readyState == 3){
			lblvps.innerHTML = "Data for the current playback position as well as for at least a little bit of time into the future is available (in other words, at least two frames of video, for example).";	
		}
		else if(vid.readyState == 4){
			lblvps.innerHTML = "Enough data is available—and the download rate is high enough—that the media can be played through to the end without interruption.";
		}
		else{

		}

		/*if(vid.currentTime != vid2.currentTime){
			vid.currentTime = vid2.currentTime;	
		}
		else if(vid2.currentTime != vid.currentTime){
			vid2.currentTime = vid.currentTime;	
		}
		else{
			
		}*/
		
	}
	else{
		var nt2 = vid2.currentTime * (100/ vid2.duration);
		seekslider.value = nt2;
		var curmins2 = Math.floor(vid2.currentTime / 60);
		var cursecs2 = Math.floor(vid2.currentTime - curmins2 * 60);
		var durmins2 = Math.floor(vid2.duration / 60);
		var dursecs2 = Math.floor(vid2.duration - durmins2 * 60);
		if(cursecs2 < 10){
			cursecs2 = "0"+cursecs2;
		}
		if(dursecs2 < 10){
			dursecs2 = "0"+dursecs2;
		}
		if(curmins2 < 10){
			curmins2 = "0"+curmins2;
		}
		if(durmins2 < 10){
			durmins2 = "0"+durmins2;
		}
		curtimetext.innerHTML = curmins2+":"+cursecs2;
		durtimetext.innerHTML = durmins2+":"+dursecs2;
		txtJump.value = vid2.currentTime;
		/*if(vid.currentTime != vid2.currentTime){
			vid.currentTime = vid2.currentTime;	
		}
		else if(vid2.currentTime != vid.currentTime){
			vid2.currentTime = vid.currentTime;	
		}
		else{
			
		}*/
		if(vid.readyState == 0){
			lblvps.innerHTML = "No information is available about the media resource.";
		}
		else if(vid.readyState == 1){
			lblvps.innerHTML = "Enough of the media resource has been retrieved that the metadata attributes are initialized. Seeking will no longer raise an exception.";
		}
		else if(vid.readyState == 2){
			lblvps.innerHTML = "Data is available for the current playback position, but not enough to actually play more than one frame.";
		}
		else if(vid.readyState == 3){
			lblvps.innerHTML = "Data for the current playback position as well as for at least a little bit of time into the future is available (in other words, at least two frames of video, for example).";	
		}
		else if(vid.readyState == 4){
			lblvps.innerHTML = "Enough data is available—and the download rate is high enough—that the media can be played through to the end without interruption.";
		}
		else{

		}
	}

}

function vidMute(){
	if(vid.muted){
		vid.muted = false;
		mutebtn.style.background = "url(img/muteoff.png)";
		volumeslider.value = 100;
	}
	else{
		vid.muted = true;
		mutebtn.style.background = "url(img/muteon.png)";
		volumeslider.value = 0;
	}
}

function setVolume(){
	vid.volume = volumeslider.value / 100;
}

function toggleFullScreen(){
	counter += 1;
	if(counter == 1){
		
		if(count == 1){
			//resize enabled show both screen
			curdivheight = playerdiv.offsetHeight;//screen.height
			dragdivval = curdivheight/2;
			dragdiv.style.marginTop = dragdivval.toString()+'px';
			if (vid.requestFullscreen) {
				playerdiv.requestFullscreen();
			} else if (vid.mozRequestFullScreen) {
				playerdiv.mozRequestFullScreen(); // Firefox
			} else if (vid.webkitRequestFullscreen) {
				playerdiv.webkitRequestFullscreen(); // Chrome and Safari			
			}	
		}
		else if(count == 2){
			//mirror view- show
			if (vid.requestFullscreen) {
				playerdiv.requestFullscreen();
			} else if (vid.mozRequestFullScreen) {
				playerdiv.mozRequestFullScreen(); // Firefox
			} else if (vid.webkitRequestFullscreen) {
				playerdiv.webkitRequestFullscreen(); // Chrome and Safari			
			}
		}
		else{
			if (vid.requestFullscreen) {
				vid.requestFullscreen();
			} else if (vid.mozRequestFullScreen) {
				vid.mozRequestFullScreen(); // Firefox
			} else if (vid.webkitRequestFullscreen) {
				vid.webkitRequestFullscreen(); // Chrome and Safari			
			}
		}		
	}
	else if(counter == 2){
		if(count == 1){
			//resize enabled show both screen
			if (vid.requestFullscreen) {
				playerdiv.requestFullscreen();
			} else if (vid.mozRequestFullScreen) {
				playerdiv.mozRequestFullScreen(); // Firefox
			} else if (vid.webkitRequestFullscreen) {
				playerdiv.webkitRequestFullscreen(); // Chrome and Safari			
			}	
		}
		else if(count == 2){
			//mirror view- show
			if (vid.requestFullscreen) {
				playerdiv.requestFullscreen();
			} else if (vid.mozRequestFullScreen) {
				playerdiv.mozRequestFullScreen(); // Firefox
			} else if (vid.webkitRequestFullscreen) {
				playerdiv.webkitRequestFullscreen(); // Chrome and Safari			
			}
		}
		else{
			if (vid2.requestFullscreen) {
				vid2.requestFullscreen();
			} else if (vid2.mozRequestFullScreen) {
				vid2.mozRequestFullScreen(); // Firefox
			} else if (vid2.webkitRequestFullscreen) {
				vid2.webkitRequestFullscreen(); // Chrome and Safari			
			}
		}
		counter = 0;
	}
	else{

	}

}

function onFinish(){
	playbtn.style.background = "url(img/play1.png)";
}

function stepVideoForward(){
	vid.currentTime += 1;
	vid2.currentTime += 1;
	vid.pause();
	vid2.pause();
	playbtn.style.background = "url(img/play1.png)";
}

function stepVideoBackward(){
	vid.currentTime -= 1;
	vid2.currentTime -= 1;
	vid.pause();
	vid2.pause();
	playbtn.style.background = "url(img/play1.png)";
}

function toggleScreen(){
	count += 1;
	if(count == 1){
		//alert('resize enabled');
		lbl.innerHTML = 'Resize Enabled';
		dragdiv.style.pointerEvents = "auto";	
		dragdiv.style.background = "url(img/scro.jpg)";	
	}
	else if(count == 2){
		//alert('mirror view applied on second video');
		lbl.innerHTML = 'Mirror view enabled for second video';
		//dragdiv.style.pointerEvents = "none";
		//dragdiv.style.background = "url(img/a.png)";	
		vid2.style.transform = "rotateY(180deg)";
		vid2.style.webkitTransform = "rotateY(180deg)";		
		vid2.style.MozTransform = "rotateY(180deg)";		
	}
	else{
		//alert('mirror view disabled on second video');
		lbl.innerHTML = 'Normal mode';
		vid2.style.transform = "rotateY(360deg)";
		vid2.style.webkitTransform = "rotateY(360deg)";		
		vid2.style.mozTransform = "rotateY(360deg)";
		dragdiv.style.pointerEvents = "none";
		dragdiv.style.background = "url(img/a.png)";	
		count = 0;
	}
			
}
function jumpToFrame(){
	//alert(vid.duration);
	if(vid.duration > vid2.duration){
		if(txtJump.value > vid.duration || txtJump.value < 0 || isNaN(txtJump.value)){
			alert('you have entered an incorrect time frame');
		}
		else{
			vid.currentTime = txtJump.value;
			vid2.currentTime = txtJump.value;
		}
	}
	else{
		if(txtJump.value > vid.duration || txtJump.value < 0 || isNaN(txtJump.value)){
			alert('you have entered an incorrect time frame');
		}
		else{
			vid.currentTime = txtJump.value;
			vid2.currentTime = txtJump.value;
		}
	}
	
}
function pauseVideo(){
	vid.pause();
	vid2.pause();
	playbtn.style.background = "url(img/play1.png)";
	/*var w = 300;
	var h = 300;
	var left = (window.screen.width/2)-(w/2);
	var top = (window.screen.height/2)-(h/2);

	var win = window.open("index.html", "_blank", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);*/
}