
var vid, playbtn,seekslider,curtimetext,durtimetext,mutebtn,volumeslider,fullscreenbtn,vid2;
function initializePlayer(){
	//Set object references
	//video element one
	vid = document.getElementById("my_video");
	playbtn = document.getElementById("playpausebtn");
	seekslider = document.getElementById("seekslider");
	curtimetext = document.getElementById("curtimetext");
	durtimetext = document.getElementById("durtimetext");
	mutebtn = document.getElementById("mutebtn");
	volumeslider = document.getElementById("volumeslider");
	fullscreenbtn = document.getElementById("fullscreenbtn");
	vid.addEventListener("ended",onFinish,false);

	//video element two
	vid2 = document.getElementById("my_video2");
	
	//Add Event listeners
	//video element one listeners
	playbtn.addEventListener("click",playPause,false);
	seekslider.addEventListener("change",vidSeek,false);
	vid.addEventListener("timeupdate",seekTimeUpdate,false);
	mutebtn.addEventListener("click",vidMute,false);
	volumeslider.addEventListener("change",setVolume,false);
	fullscreenbtn.addEventListener("click",toggleFullScreen,false);

	vid2.muted = true;
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
	if (vid.requestFullscreen) {
			vid.requestFullscreen();
		} else if (vid.mozRequestFullScreen) {
			vid.mozRequestFullScreen(); // Firefox
		} else if (vid.webkitRequestFullscreen) {
			vid.webkitRequestFullscreen(); // Chrome and Safari			
		}
}

function onFinish(){
	playbtn.style.background = "url(img/play1.png)";
}
