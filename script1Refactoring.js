// p#currentTimePElement:before {display: inline-block;content: "00:01";height: 20px;width: 60px;background: red;position: absolute;top: -15px;left: 50%;transform: translate(-50%, 0);border-radius: 3px;text-align: center;color: #fff;}

function opacityDecreasingMinimumDiv(){
	newAudioCutter.loweringOpacityInMin.style.width=newAudioCutter.minRangeOfAudioSlider.style.left;
}

function opacityDecreasingMaximumDiv(){
	newAudioCutter.loweringOpacityInMax.style.width=1800-parseInt(newAudioCutter.maxRangeOfAudioSlider.style.left)-9+'px';
}


function ExtractingCurrentAndDiff(){
	newAudioCutter.extractedCurrentStartValueSeconds = newAudioCutter.startTimeSeconds.value;
	newAudioCutter.extractedCurrentStartValueMinutes = newAudioCutter.startTimeMinutes.value;
	newAudioCutter.extractedCurrentEndValueSeconds = newAudioCutter.endTimeSeconds.value;
	newAudioCutter.extractedCurrentEndValueMinutes = newAudioCutter.endTimeMinutes.value;
			newAudioCutter.diffBtwDuration = (parseInt(newAudioCutter.extractedCurrentEndValueMinutes) * 60 + parseInt(newAudioCutter.extractedCurrentEndValueSeconds)) - (parseInt(newAudioCutter.extractedCurrentStartValueMinutes * 60) + parseInt(newAudioCutter.extractedCurrentStartValueSeconds));

}
function onClickOnAnyInput(event) {
	newAudioCutter.currentEventTargetElement = event.target;
		var idCheck = newAudioCutter.currentEventTargetElement.id;
		if (idCheck === "starttimeseconds" || idCheck === "starttimeminutes") {
			ExtractingCurrentAndDiff();
			if (newAudioCutter.diffBtwDuration > 1) {
				var expectedTimeToAdded = newAudioCutter.diffBtwDuration - 1;
				var valueToAddedIntoMinutes = parseInt(expectedTimeToAdded / 60);
				var valueToAddedIntoSeconds = parseInt(expectedTimeToAdded % 60);
				newAudioCutter.startValueThatIsExpectedUptoSeconds = parseInt(newAudioCutter.extractedCurrentStartValueSeconds) + valueToAddedIntoSeconds;
				newAudioCutter.startValueThatIsExpectedUptoMinutes = parseInt(newAudioCutter.extractedCurrentStartValueMinutes) + valueToAddedIntoMinutes;
			}
		}
		else if (idCheck === "endtimeseconds" || idCheck === "endtimeminutes") {
			ExtractingCurrentAndDiff();
			if (newAudioCutter.diffBtwDuration > 1) {
				var totalDurationOfStart = parseInt(newAudioCutter.extractedCurrentStartValueMinutes * 60) + parseInt(newAudioCutter.extractedCurrentStartValueSeconds);
				var expectedDurationForEnd = totalDurationOfStart + 1;
				newAudioCutter.endValueThatIsExpectedUptoSeconds = parseInt(expectedDurationForEnd % 60);
				newAudioCutter.endValueThatIsExpectedUptoMinutes = parseInt(expectedDurationForEnd / 60);
			}
		}	
}


function decodingAudioAndCallingVisualize (url){
	const audioContext = new AudioContext();
	fetch(url)
		.then(response => response.arrayBuffer())
		.then(arrayBuff => audioContext.decodeAudioData(arrayBuff))
		.then(audioBuff => visualizeAudioBuff(audioBuff));
};
let amountOfWaveToBeDisplayed;
function accumulatedDataFunc( audioBuff ) {
		const firstChannelData = audioBuff.getChannelData(0);
		amountOfWaveToBeDisplayed = 100000;
		const trimBlock = Math.floor(firstChannelData.length / amountOfWaveToBeDisplayed);
		const accumulatedDataArray = new Array();
		for (let i = 0; i < amountOfWaveToBeDisplayed; i++) {
			let blockStart = trimBlock * i;
			let sum = 0;

			for (let j = 0; j < trimBlock; j++) {
				sum = sum + Math.abs(firstChannelData[blockStart + j])
			}
			accumulatedDataArray.push(sum);
		}
		return accumulatedDataArray;
	}
var normalizedData;
function visualizeAudioBuff(audioBuff) {
	
	var accumulatedData = accumulatedDataFunc(audioBuff);
	
	const normalizeData = accumulatedDataArray => {
		var multiplier = Math.pow(Math.max(...accumulatedDataArray), -1);
		multiplier=(0.9)*multiplier;

		return accumulatedDataArray.map(n => n * multiplier);
	}
	 normalizedData= normalizeData(accumulatedData);
	draw(normalizedData);

}


function draw(normalizedData) {
	const canvas = document.querySelector("canvas");
	canvas.style.background = "rgb(6 6 8)";
	canvas.width = 1800;
	canvas.height = 180;
	const context = canvas.getContext("2d");
	context.translate(0, canvas.height / 2);
	const width = canvas.width / normalizedData.length;
	for (let i = 0; i < normalizedData.length; i++) {
		const x = width * i;

		let height = (normalizedData[i] * canvas.height )- canvas.height / 2;
		if (height < 0) {
			height = i%2?(-0.01*height):(0.01*height);
		}
		drawArcAndLineSegment(context, x, height, width, (i) % 2);
	}
};



function drawArcAndLineSegment  (context, x, height, width, isEven) {
	context.lineWidth = normalizedData.length>amountOfWaveToBeDisplayed?normalizedData.length/amountOfWaveToBeDisplayed:amountOfWaveToBeDisplayed/normalizedData.length;
	context.strokeStyle = "rgb(86 216 11)";//"#14CA15";
	context.beginPath();
	height = isEven ? height : -height;
	context.moveTo(x, 0);
	context.lineTo(x, height);
	context.arc(x+width/2 , height, width/2 , Math.PI, 0, isEven);
	context.lineTo(x + width, 0);
	context.stroke();

};


function checkElementsAlreadyPresent(){

	if (document.getElementById('originalAudio')) {
		newAudioCutter.removeElementById(['originalAudio', 'submit', 'starttimeminutes', 'starttimeseconds', 'endtimeminutes', 'endtimeseconds']);
		if (document.getElementById("trimmedAudioLabel")) {
			newAudioCutter.removeElementById(['trimmedAudiolabel', 'trimmedAudio', 'playTrimmedAudio', 'downloadTrimmedAudio', 'speed', 'speedlabel', 'volume', 'volumelabel']);
		}

	}

}


function originalAudioSet(){

	newAudioCutter.originalAudio = newAudioCutter.createElement('audio');
	newAudioCutter.setIdAttribute(newAudioCutter.originalAudio, "originalAudio");
	newAudioCutter.insertAfter(newAudioCutter.originalAudio, newAudioCutter.uploadSong);
	newAudioCutter.originalAudio.setAttribute("src", URL.createObjectURL(event.target.files[0]));
	newAudioCutter.originalAudio.setAttribute("controls", true);
	newAudioCutter.originalAudio.style.display = "flex";
	newAudioCutter.originalAudio.load();

}

function createAndSetValuesToInputElements(){
	newAudioCutter.startTimeSeconds = document.createElement('input');
		newAudioCutter.startTimeMinutes = document.createElement('input');
		newAudioCutter.endTimeSeconds = document.createElement('input');
		newAudioCutter.endTimeMinutes = document.createElement('input');

		[newAudioCutter.startTimeSeconds, newAudioCutter.startTimeMinutes, newAudioCutter.endTimeMinutes, newAudioCutter.endTimeSeconds].forEach((x) => x.setAttribute('type', 'number'));

		newAudioCutter.startTimeSeconds.setAttribute("id", "starttimeseconds");
		newAudioCutter.startTimeMinutes.setAttribute("id", "starttimeminutes");
		newAudioCutter.endTimeSeconds.setAttribute("id", "endtimeseconds");
		newAudioCutter.endTimeMinutes.setAttribute("id", "endtimeminutes");

		newAudioCutter.startTimeSeconds.value = "0";
		newAudioCutter.startTimeMinutes.value = "0";
		newAudioCutter.endTimeSeconds.value = `${Math.floor(newAudioCutter.originalAudio.duration % 60)}`;
		newAudioCutter.endTimeMinutes.value = `${Math.floor(newAudioCutter.originalAudio.duration / 60)}`;

		elementsNeededToAppendToBody = [newAudioCutter.startTimeMinutes, newAudioCutter.startTimeSeconds, newAudioCutter.endTimeMinutes, newAudioCutter.endTimeSeconds];

		elementsNeededToAppendToBody.forEach((x) => newAudioCutter.appendToBody(x));
}



function startTimeSecondsF(){
	
		var startTimeSeconds = parseInt(newAudioCutter.startTimeSeconds.value);
		var startTimeMinutes = parseInt(newAudioCutter.startTimeMinutes.value);
	
		var startTimeExpectedUptoSeconds = parseInt(newAudioCutter.startValueThatIsExpectedUptoSeconds);
		var startTimeExpectedUptoMinutes = parseInt(newAudioCutter.startValueThatIsExpectedUptoMinutes);
	
		var startTimeCurrentWholeValue = startTimeMinutes * 60 + startTimeSeconds;
		var startTimeExpectedWholeValue = startTimeExpectedUptoMinutes * 60 + startTimeExpectedUptoSeconds;
	
		if (startTimeCurrentWholeValue <= startTimeExpectedWholeValue && startTimeCurrentWholeValue >= 0) {
			if (newAudioCutter.startTimeSeconds.value == 60) {
				newAudioCutter.startTimeSeconds.value = 0;
				newAudioCutter.startTimeMinutes.value = parseInt(newAudioCutter.startTimeMinutes.value) + 1;
			}
			if (newAudioCutter.startTimeSeconds.value == -1) {
				newAudioCutter.startTimeSeconds.value = 59;
				newAudioCutter.startTimeMinutes.value = parseInt(newAudioCutter.startTimeMinutes.value) - 1;
			}
			newAudioCutter.extractedCurrentStartValueSeconds = newAudioCutter.startTimeSeconds.value;
			newAudioCutter.extractedCurrentStartValueMinutes = newAudioCutter.startTimeMinutes.value;
			newAudioCutter.minRangeOfAudioSlider.style.left = ((startTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration)) * 1800)-9 + 'px';
			newAudioCutter.minRangeAudioLabel.style.left = ((startTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration)) * 1800 )-9+ 'px';
			var percentage = (startTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration));
			var currAudioDuration = Math.ceil(percentage * (newAudioCutter.originalAudio.duration));
			newAudioCutter.minRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		} else {
			newAudioCutter.startTimeSeconds.value = newAudioCutter.extractedCurrentStartValueSeconds;
			newAudioCutter.startTimeMinutes.value = newAudioCutter.extractedCurrentStartValueMinutes;
		}
		if(newAudioCutter.currentTimePElement){
		newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft+9 }px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9 }px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		}
		opacityDecreasingMinimumDiv()
	
}

function startTimeMinutesF(){


	var startTimeSeconds = parseInt(newAudioCutter.startTimeSeconds.value);
		var startTimeMinutes = parseInt(newAudioCutter.startTimeMinutes.value);

		var startTimeExpectedUptoSeconds = parseInt(newAudioCutter.startValueThatIsExpectedUptoSeconds);
		var startTimeExpectedUptoMinutes = parseInt(newAudioCutter.startValueThatIsExpectedUptoMinutes);

		var startTimeCurrentWholeValue = startTimeMinutes * 60 + startTimeSeconds;
		var startTimeExpectedWholeValue = startTimeExpectedUptoMinutes * 60 + startTimeExpectedUptoSeconds;

		if (startTimeCurrentWholeValue <= startTimeExpectedWholeValue && startTimeCurrentWholeValue >= 0) {
			newAudioCutter.extractedCurrentStartValueSeconds = newAudioCutter.startTimeSeconds.value;
			newAudioCutter.extractedCurrentStartValueMinutes = newAudioCutter.startTimeMinutes.value;
			newAudioCutter.minRangeOfAudioSlider.style.left = ((startTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration)) * 1800)-9 + 'px';
			newAudioCutter.minRangeAudioLabel.style.left = ((startTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration)) * 1800)-9 + 'px';
			var percentage = (startTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration));
			var currAudioDuration = Math.ceil(percentage * (newAudioCutter.originalAudio.duration));
			newAudioCutter.minRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		} else {
			newAudioCutter.startTimeSeconds.value = newAudioCutter.extractedCurrentStartValueSeconds;
			newAudioCutter.startTimeMinutes.value = newAudioCutter.extractedCurrentStartValueMinutes;
		}
		if(newAudioCutter.currentTimePElement){
		newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft+9 }px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9 }px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		}
		opacityDecreasingMinimumDiv()
}


function endTimeSecondsF(){
	var endTimeSeconds = parseInt(newAudioCutter.endTimeSeconds.value);
		var endTimeMinutes = parseInt(newAudioCutter.endTimeMinutes.value);

		var endTimeExpectedUptoSeconds = parseInt(newAudioCutter.endValueThatIsExpectedUptoSeconds);
		var endTimeExpectedUptoMinutes = parseInt(newAudioCutter.endValueThatIsExpectedUptoMinutes);

		var endTimeCurrentWholeValue = endTimeMinutes * 60 + endTimeSeconds;
		var endTimeExpectedWholeValue = endTimeExpectedUptoMinutes * 60 + endTimeExpectedUptoSeconds;

		if (endTimeCurrentWholeValue >= endTimeExpectedWholeValue && endTimeCurrentWholeValue <= newAudioCutter.originalAudio.duration) {
			if (newAudioCutter.endTimeSeconds.value == 60) {
				newAudioCutter.endTimeSeconds.value = 0;
				newAudioCutter.endTimeMinutes.value = parseInt(newAudioCutter.endTimeMinutes.value) + 1;
			}
			if (newAudioCutter.endTimeSeconds.value == -1) {
				newAudioCutter.endTimeSeconds.value = 59;
				newAudioCutter.endTimeMinutes.value = parseInt(newAudioCutter.endTimeMinutes.value) - 1;
			}
			newAudioCutter.extractedCurrentEndValueSeconds = newAudioCutter.endTimeSeconds.value;
			newAudioCutter.extractedCurrentEndValueMinutes = newAudioCutter.endTimeMinutes.value;
			newAudioCutter.maxRangeOfAudioSlider.style.left = (endTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration)) * 1800 + 'px';
			newAudioCutter.maxRangeAudioLabel.style.left = (endTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration)) * 1800 + 'px';
			var percentage = (endTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration));
			var currAudioDuration = Math.ceil(percentage * (newAudioCutter.originalAudio.duration));
			newAudioCutter.maxRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		} else {
			newAudioCutter.endTimeSeconds.value = newAudioCutter.extractedCurrentEndValueSeconds;
			newAudioCutter.endTimeMinutes.value = newAudioCutter.extractedCurrentEndValueMinutes;
		}
		if(newAudioCutter.currentTimePElement){
		newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft +9}px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9 }px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		}
		opacityDecreasingMaximumDiv();
}


function endTimeMinutesF(){
	var endTimeSeconds = parseInt(newAudioCutter.endTimeSeconds.value);
		var endTimeMinutes = parseInt(newAudioCutter.endTimeMinutes.value);

		var endTimeExpectedUptoSeconds = parseInt(newAudioCutter.endValueThatIsExpectedUptoSeconds);
		var endTimeExpectedUptoMinutes = parseInt(newAudioCutter.endValueThatIsExpectedUptoMinutes);

		var endTimeCurrentWholeValue = endTimeMinutes * 60 + endTimeSeconds;
		var endTimeExpectedWholeValue = endTimeExpectedUptoMinutes * 60 + endTimeExpectedUptoSeconds;

		if (endTimeCurrentWholeValue >= endTimeExpectedWholeValue && endTimeCurrentWholeValue <= newAudioCutter.originalAudio.duration) {
			newAudioCutter.extractedCurrentEndValueSeconds = newAudioCutter.endTimeSeconds.value;
			newAudioCutter.extractedCurrentEndValueMinutes = newAudioCutter.endTimeMinutes.value;
			newAudioCutter.maxRangeOfAudioSlider.style.left = (endTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration)) * 1800 + 'px';
			newAudioCutter.maxRangeAudioLabel.style.left = (endTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration)) * 1800 + 'px';
			var percentage = (endTimeCurrentWholeValue / (newAudioCutter.originalAudio.duration));
			var currAudioDuration = Math.ceil(percentage * (newAudioCutter.originalAudio.duration));
			newAudioCutter.maxRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		} else {
			newAudioCutter.endTimeSeconds.value = newAudioCutter.extractedCurrentEndValueSeconds;
			newAudioCutter.endTimeMinutes.value = newAudioCutter.extractedCurrentEndValueMinutes;
		}
		if(newAudioCutter.currentTimePElement){
		newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft +9}px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9 }px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		}
		opacityDecreasingMaximumDiv();
}

var wholeDuration;

const currentStateOfTrimmedAudio = {
				
	currenttime: null,
	set currentTime(currenttime) {
	  this.currenttime = currenttime;
	  
	  newAudioCutter.currentTimePElement.style.left=(parseInt(newAudioCutter.minRangeOfAudioSlider.style.left)+9)+(this.currenttime/trimmedAudio.duration)*((trimmedAudio.duration/wholeDuration)*1800)+'px';
	  newAudioCutter.currentTimeLabelElement.style.left=(parseInt(newAudioCutter.minRangeOfAudioSlider.style.left)+9)+(this.currenttime/trimmedAudio.duration)*((trimmedAudio.duration/wholeDuration)*1800)+'px';
	  currentTimeLabelElement.innerHTML=`${Math.floor((((((parseInt(newAudioCutter.minRangeOfAudioSlider.style.left)+9)/1800)*wholeDuration))+Math.floor(trimmedAudio.currentTime))/60)}:${Math.floor((((((parseInt(newAudioCutter.minRangeOfAudioSlider.style.left)+9)/1800)*wholeDuration))+Math.floor(trimmedAudio.currentTime))%60)}`;

	}
  };


function eventListenerOfCurrentTime() 
			{ 
				
				trimmedAudio.addEventListener('play', () => {
					window.playInterval = setInterval(() => {
						newAudioCutter.isPlaying=true;
						currentStateOfTrimmedAudio.currentTime=trimmedAudio.currentTime;
					}, 1000);
				});

				trimmedAudio.addEventListener('pause', () => {
					newAudioCutter.isPlaying=false;
					clearInterval(window.playInterval);
				});
			}
			


function afterOnLoadedMetaData(){
	createAndSetValuesToInputElements();


	newAudioCutter.startTimeSeconds.addEventListener("change",startTimeSecondsF);

	newAudioCutter.startTimeMinutes.addEventListener("change", startTimeMinutesF);

	newAudioCutter.endTimeSeconds.addEventListener("change", endTimeSecondsF);

	newAudioCutter.endTimeMinutes.addEventListener("change", endTimeMinutesF);

	
	document.body.append(newAudioCutter.audioSliderBase);

	newAudioCutter.reset(newAudioCutter.minRangeOfAudioSlider,true);
	newAudioCutter.reset(newAudioCutter.minRangeAudioLabel,true);
	newAudioCutter.reset(newAudioCutter.maxRangeOfAudioSlider,false);
	newAudioCutter.reset(newAudioCutter.maxRangeAudioLabel,false);
	newAudioCutter.minRangeAudioLabel.innerText = "0:00";
	newAudioCutter.maxRangeAudioLabel.innerText = `${newAudioCutter.flooring(originalAudio.duration / 60)}:${newAudioCutter.flooring(originalAudio.duration % 60)}`;
	newAudioCutter.minimumGap = 0.1 * (newAudioCutter.originalAudio.duration);




	fetch(newAudioCutter.originalAudio.src).then(function(response) {
		if (response.ok) {
			return response.blob();
		}
		throw new Error('Network response was not ok.');
	}).then(function(blob) {
		newAudioCutter.Blob = blob;
	}).catch(function(error) {
		console.log('There has been a problem with your fetch operation: ', error);
	});

	var submitButton = newAudioCutter.createElement('button');
	newAudioCutter.styleSet(submitButton, {
		position: 'absolute',
		top: "400px",
		left: "900px"
	});
	submitButton.innerText = "Submit";
	submitButton.setAttribute("id", 'submit');
	document.body.append(submitButton);

	document.getElementById('submit').addEventListener('click', function(e) {
		if (document.getElementById('trimmedAudio')) {
			newAudioCutter.removeElementById(['trimmedAudioLabel', 'trimmedAudio', 'playTrimmedAudio', 'downloadTrimmedAudio', 'speed', 'speedlabel', 'volume', 'volumelabel','currentTimePElement','currentTimeLabelElement']);
		}
		document.querySelector('select').style.display="block";

		newAudioCutter.createElementAfterSubmitting();

		newAudioCutter.currentTimePElement.style.left=parseInt(document.getElementById('minimumRangeOfAudioSlider').style.left)+9+'px';
		newAudioCutter.currentTimeLabelElement.style.left=parseInt(document.getElementById('minimumRangeOfAudioSlider').style.left)+9+'px';

		newAudioCutter.currentTimePElement.addEventListener('mousedown', function(e) {
			e.stopPropagation();
			newAudioCutter.currentEventClientX = e.clientX;
			newAudioCutter.currentMinLeft = parseInt(getComputedStyle(newAudioCutter.minRangeAudioLabel).left);
			newAudioCutter.currentMaxLeft = parseInt(getComputedStyle(newAudioCutter.maxRangeAudioLabel).left);
			window.addEventListener('mousemove', mousemoveCurrentTimeElement, true);
	
		}
	
	)
	
	function mousemoveCurrentTimeElement(event) {
		if (event.clientX-50 > (newAudioCutter.currentMinLeft+9) && event.clientX-50 <= newAudioCutter.currentMaxLeft ) {
			newAudioCutter.currentTimePElement.style.left = `${event.clientX-50 }px`;
			newAudioCutter.currentTimeLabelElement.style.left = `${event.clientX-50 }px`;
			var percentage = parseInt(event.clientX-50) / 1800;
			var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
		newAudioCutter.currentTimeLabelElement.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;

		newAudioCutter.currentMinLeft = parseInt(getComputedStyle(newAudioCutter.minRangeAudioLabel).left);
		newAudioCutter.currentMaxLeft = parseInt(getComputedStyle(newAudioCutter.maxRangeAudioLabel).left);
		trimmedAudio.currentTime=((event.clientX-50-newAudioCutter.currentMinLeft)/(newAudioCutter.currentMaxLeft-newAudioCutter.currentMinLeft))*trimmedAudio.duration;
		} 
	}

	window.addEventListener('mouseup', () => {
		window.removeEventListener("mousemove", mousemoveCurrentTimeElement, true);
	})
	


		newAudioCutter.playBackSpeedRateLabel = document.createElement('label');
		newAudioCutter.playBackSpeedRateLabel.innerText = "speed";
		newAudioCutter.playBackSpeedRateLabel.setAttribute("id", "speedlabel");
		newAudioCutter.styleSet(newAudioCutter.playBackSpeedRateLabel, {
			position: 'absolute',
			top: '80px',
			left: '750px'
		});
		newAudioCutter.appendToBody(newAudioCutter.playBackSpeedRateLabel);

		newAudioCutter.playBackSpeedRate = document.createElement('input');
		newAudioCutter.attributeSet(newAudioCutter.playBackSpeedRate, {
			type: 'range',
			min: '0.25',
			max: '2',
			step: '0.25',
			id: 'speed'
		});
		newAudioCutter.styleSet(newAudioCutter.playBackSpeedRate, {
			position: 'absolute',
			top: '80px',
			left: '800px'
		});
		newAudioCutter.appendToBody(newAudioCutter.playBackSpeedRate);

		newAudioCutter.playBackSpeedRate.value = '1';

		newAudioCutter.playBackSpeedRate.addEventListener('change', function(event) {
			document.getElementById('trimmedAudio').playbackRate = newAudioCutter.playBackSpeedRate.value;
		})

		newAudioCutter.musicVolumeLabel = document.createElement('label');
		newAudioCutter.musicVolumeLabel.innerText = "volume control";
		newAudioCutter.musicVolumeLabel.setAttribute("id", "volumelabel");
		newAudioCutter.styleSet(newAudioCutter.musicVolumeLabel, {
			position: 'absolute',
			top: '80px',
			left: '950px'
		});
		newAudioCutter.appendToBody(newAudioCutter.musicVolumeLabel);

		newAudioCutter.musicVolume = document.createElement('input');
		newAudioCutter.attributeSet(newAudioCutter.musicVolume, {
			type: 'range',
			min: '0',
			max: '1',
			step: '0.1',
			id: 'volume',
			value: '1'
		});
		newAudioCutter.styleSet(newAudioCutter.musicVolume, {
			position: 'absolute',
			top: '80px',
			left: '1050px'
		});
		newAudioCutter.appendToBody(newAudioCutter.musicVolume);

		newAudioCutter.musicVolume.addEventListener('change', function(event) {
			document.getElementById('trimmedAudio').volume = newAudioCutter.musicVolume.value;
		})

		var minArray = document.getElementById('minimumRangeAudioLabel').innerText.split(":")
		var maxArray = document.getElementById('maximumRangeAudioLabel').innerText.split(":")

		var startValue = ((parseInt(minArray[0]) * 60) + parseInt(minArray[1]));
		var endValue = ((parseInt(maxArray[0]) * 60) + parseInt(maxArray[1]));
		if (startValue > endValue) {
			window.alert("Start value must be less than end value");
		} else if (startValue === endValue) {
			window.alert("both can't be in same time");
		} else {
			 wholeDuration = newAudioCutter.originalAudio.duration;

			var trimmedAudioBlob;

			const startTime = ((startValue * newAudioCutter.Blob.size) / wholeDuration);
			const endTime = ((endValue * newAudioCutter.Blob.size) / wholeDuration) + ((1 * newAudioCutter.Blob.size) / wholeDuration);

			trimmedAudioBlob = newAudioCutter.Blob.slice(startTime, endTime, newAudioCutter.Blob.type);

			var trimmedAudio = new Audio();
			trimmedAudio.setAttribute("id", 'trimmedAudio');
			trimmedAudio.src = window.URL.createObjectURL(trimmedAudioBlob);
			trimmedAudio.controls = true;
			newAudioCutter.styleSet(trimmedAudio, {
				position: "absolute",
				top: "489px",
				left: "783px"
			});
			trimmedAudio.loop = 'true';
			newAudioCutter.appendToBody(trimmedAudio);

			var trimmedAudioLabel = document.createElement('label');
			newAudioCutter.setIdAttribute(trimmedAudioLabel, 'trimmedAudioLabel');
			trimmedAudioLabel.innerHTML = "new audio";
			newAudioCutter.styleSet(trimmedAudioLabel, {
				position: "absolute",
				top: "443px",
				left: "897px"
			});
			newAudioCutter.appendToBody(trimmedAudioLabel);

			var playTrimmedAudio = newAudioCutter.createButton();

			newAudioCutter.setIdAttribute(playTrimmedAudio, 'playTrimmedAudio');
			playTrimmedAudio.innerHTML = "Play Trimmed Audio &#9658";
			newAudioCutter.styleSet(playTrimmedAudio, {
				position: "absolute",
				top: "603px",
				left: "693px"
			});
			document.body.append(playTrimmedAudio);
			eventListenerOfCurrentTime();
			
			
			playTrimmedAudio.addEventListener('click', function() {
				if (!newAudioCutter.playPauseCount) {
					playTrimmedAudio.innerHTML = "Pause Trimmed Audio &#9208";
					trimmedAudio.play();
					newAudioCutter.playPauseCount = 1;
				} else {
					playTrimmedAudio.innerHTML = "Play Trimmed Audio &#9658";
					trimmedAudio.pause();
					newAudioCutter.playPauseCount = 0;
				}
				
				
			})

			var downloadAudio = newAudioCutter.createButton();
			downloadAudio.innerHTML = "Download Trimmed Audio &#8681";
			downloadAudio.setAttribute('id', 'downloadTrimmedAudio');

			newAudioCutter.styleSet(downloadAudio, {
				position: "absolute",
				top: "603px",
				left: "1031px"
			});
			newAudioCutter.appendToBody(downloadAudio);

			downloadAudio.addEventListener('click', function() {
				const a = Object.assign(document.createElement('a'), {
					href: document.getElementById('trimmedAudio').src,
					download:"newAudio"+document.querySelector('select').value
					// download: "newAudio.mp3"
				});

				document.body.appendChild(a);
				a.click();
				a.remove();

			})
		}
	})
}


const newAudioCutter = new classForHoldingCommonVarAndFunc();
window.onload = function() {
	document.querySelector('select').style.display="none";
  };


newAudioCutter.creatingRequiredElements();
newAudioCutter.loweringOpacityInMin=document.createElement('div');
newAudioCutter.loweringOpacityInMin.setAttribute("id","divForLoweringOpacityInMinArea");
document.body.append(newAudioCutter.loweringOpacityInMin);
newAudioCutter.loweringOpacityInMax=document.createElement('div');
newAudioCutter.loweringOpacityInMax.setAttribute("id","divForLoweringOpacityInMaxArea");
document.body.append(newAudioCutter.loweringOpacityInMax);
newAudioCutter.uploadSong.setAttribute("accept",".mp3");


newAudioCutter.uploadSong.addEventListener("change", function(event) {
	
	
	decodingAudioAndCallingVisualize(URL.createObjectURL(event.target.files[0]));
	
	checkElementsAlreadyPresent();
	
	originalAudioSet(event);

	newAudioCutter.originalAudio.onloadedmetadata = afterOnLoadedMetaData;
})

newAudioCutter.audioSliderBase.addEventListener('click', function(event) {
	var left = parseInt(getComputedStyle(newAudioCutter.minRangeOfAudioSlider).left);
	var right = parseInt(getComputedStyle(newAudioCutter.maxRangeOfAudioSlider).left);
	var pos = event.clientX - 50;
	var midTrue = (pos > left) && (pos < right);

	if ((event.clientX - 50) < left && !midTrue) {
		pos=pos-9;
		goLeft(pos);
	} else if ((event.clientX - 50) > right && !midTrue) {
		goRight(pos);
	}
});

function goLeft(dest) {
	var current = parseInt(getComputedStyle(newAudioCutter.minRangeOfAudioSlider).left);
	var destination = dest;
	setTimeout(function() {
		if (current > destination) {
			newAudioCutter.minRangeOfAudioSlider.style.left = current - 1 + 'px';
			newAudioCutter.minRangeAudioLabel.style.left = current - 1 + 'px';
			var percentage = (parseInt(getComputedStyle(newAudioCutter.minRangeAudioLabel).left)+9) / 1800;
			var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
			newAudioCutter.minRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
			document.getElementById('starttimeminutes').value = newAudioCutter.flooring(currAudioDuration / 60);
			document.getElementById('starttimeseconds').value = newAudioCutter.flooring(currAudioDuration % 60);
			goLeft(destination);
			if(newAudioCutter.currentTimePElement){
			newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		
			}
			opacityDecreasingMinimumDiv()

		}
	}, 1);
}

function goRight(dest) {
	var current = parseInt(getComputedStyle(newAudioCutter.maxRangeOfAudioSlider).left);
	var destination = dest;
	setTimeout(function() {
		if (current < destination) {
			newAudioCutter.maxRangeOfAudioSlider.style.left = current + 1 + 'px';
			newAudioCutter.maxRangeAudioLabel.style.left = current + 1 + 'px';
			var percentage = parseInt(getComputedStyle(newAudioCutter.maxRangeAudioLabel).left) / 1800;
			var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
			newAudioCutter.maxRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
			document.getElementById('endtimeminutes').value = newAudioCutter.flooring(currAudioDuration / 60);
			document.getElementById('endtimeseconds').value = newAudioCutter.flooring(currAudioDuration % 60);
			goRight(destination);
			if(newAudioCutter.currentTimePElement){
			newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
			}
			opacityDecreasingMaximumDiv()
		}
	}, 1);
}
// var minMouseDownFlag=false;
// var minMouseMoveFlag=false;
// var minMouseUpFlag=false;
newAudioCutter.minRangeOfAudioSlider.addEventListener('mousedown', function(e) {
		e.stopPropagation();
		newAudioCutter.currentEventClientX = e.clientX;
		newAudioCutter.currentMinLeft = parseInt(getComputedStyle(newAudioCutter.minRangeAudioLabel).left);
		newAudioCutter.currentMaxLeft = parseInt(getComputedStyle(newAudioCutter.maxRangeAudioLabel).left);
		// minMouseDownFlag=true;
		// console.log("mouse down triggered");
		window.addEventListener('mousemove', mousemoveMin, true);
		

	}

)

function mousemoveMin(event) {
	
	// minMouseMoveFlag=true;
	//console.log("mouse move triggered");
	if (event.clientX > newAudioCutter.currentEventClientX && newAudioCutter.currentMaxLeft - (event.clientX - 50) >= newAudioCutter.minimumGap) {
		newAudioCutter.minRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
		newAudioCutter.minRangeAudioLabel.style.left = `${event.clientX - 50}px`;
		var percentage = (parseInt(getComputedStyle(newAudioCutter.minRangeAudioLabel).left)+9)/ 1800;
		var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
		newAudioCutter.minRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		document.getElementById('starttimeminutes').value = newAudioCutter.flooring(currAudioDuration / 60);
		document.getElementById('starttimeseconds').value = newAudioCutter.flooring(currAudioDuration % 60);
		newAudioCutter.isAnySliderMoving=true;
		opacityDecreasingMinimumDiv()
		if(newAudioCutter.currentTimePElement){
			newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		}
		
		
		
		
	} else if (event.clientX < newAudioCutter.currentEventClientX && event.clientX - 50 >= -9) {
		newAudioCutter.minRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
		newAudioCutter.minRangeAudioLabel.style.left = `${event.clientX - 50}px`;
		var percentage = (parseInt(getComputedStyle(newAudioCutter.minRangeAudioLabel).left)+9) / 1800;
		var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
		newAudioCutter.minRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		document.getElementById('starttimeminutes').value = newAudioCutter.flooring(currAudioDuration / 60);
		document.getElementById('starttimeseconds').value = newAudioCutter.flooring(currAudioDuration % 60);
		opacityDecreasingMinimumDiv()
		newAudioCutter.isAnySliderMoving=true;
		if(newAudioCutter.currentTimePElement){
			newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
	}
	
		
		
		
	}

}

window.addEventListener('mouseup', () => {
	// console.log("mouse up triggered");
	// if(minMouseMoveFlag){
	// minMouseUpFlag=true;
	// minMouseMoveFlag=false;
	// }
	window.removeEventListener("mousemove", mousemoveMin, true);
	if(newAudioCutter.isPlaying && newAudioCutter.isAnySliderMoving){
		document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
	}
	newAudioCutter.isAnySliderMoving=false;
})

// setInterval(()=>{
// 	if(minMouseUpFlag){
// 		window.removeEventListener("mousemove", mousemoveMin, true);
// 		minMouseUpFlag=false;
// 	}

// },10);
newAudioCutter.maxRangeOfAudioSlider.addEventListener('mousedown', function(e) {
	e.stopPropagation();
	newAudioCutter.currentEventClientX = e.clientX;
	newAudioCutter.currentMinLeft = parseInt(getComputedStyle(newAudioCutter.minRangeAudioLabel).left);
	newAudioCutter.currentMaxLeft = parseInt(getComputedStyle(newAudioCutter.maxRangeAudioLabel).left);
	window.addEventListener('mousemove', mousemoveMax, true);
})

function mousemoveMax(event) {
	if (event.clientX < newAudioCutter.currentEventClientX && (event.clientX - 50 - newAudioCutter.currentMinLeft) >= newAudioCutter.minimumGap) {
		newAudioCutter.maxRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
		newAudioCutter.maxRangeAudioLabel.style.left = `${event.clientX - 50}px`;
		var percentage = parseInt(getComputedStyle(newAudioCutter.maxRangeAudioLabel).left) / 1800;
		var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
		newAudioCutter.maxRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		document.getElementById('endtimeminutes').value = newAudioCutter.flooring(currAudioDuration / 60);
		document.getElementById('endtimeseconds').value = newAudioCutter.flooring(currAudioDuration % 60);
		newAudioCutter.isAnySliderMoving=true;
		if(newAudioCutter.currentTimePElement){
			newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		}
		
	} else if (event.clientX > newAudioCutter.currentEventClientX && event.clientX - 50 <= 1800) {
		newAudioCutter.maxRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
		newAudioCutter.maxRangeAudioLabel.style.left = `${event.clientX - 50}px`;
		var percentage = parseInt(getComputedStyle(newAudioCutter.maxRangeAudioLabel).left) / 1800;
		var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
		newAudioCutter.maxRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		document.getElementById('endtimeminutes').value = newAudioCutter.flooring(currAudioDuration / 60);
		document.getElementById('endtimeseconds').value = newAudioCutter.flooring(currAudioDuration % 60);
		newAudioCutter.isAnySliderMoving=true;
		if(newAudioCutter.currentTimePElement){
			newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		}
		
	} 
	else if (event.clientX - 50 > 1800) {
		newAudioCutter.maxRangeOfAudioSlider.style.left = `${1800}px`;
		newAudioCutter.maxRangeAudioLabel.style.left = `${1800}px`;
		newAudioCutter.maxRangeAudioLabel.innerText = `${newAudioCutter.flooring(newAudioCutter.originalAudio.duration / 60)}:${newAudioCutter.flooring(newAudioCutter.originalAudio.duration % 60)}`;
		document.getElementById('endtimeminutes').value = newAudioCutter.flooring(newAudioCutter.originalAudio.duration / 60);
		document.getElementById('endtimeseconds').value = newAudioCutter.flooring(newAudioCutter.originalAudio.duration % 60);
		newAudioCutter.isAnySliderMoving=true;
		if(newAudioCutter.currentTimePElement){
			newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft+9}px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		}
		
	}
	opacityDecreasingMaximumDiv();
	
}

window.addEventListener('mouseup', () => {
    window.removeEventListener("mousemove", mousemoveMax, true);
	if(newAudioCutter.isPlaying && newAudioCutter.isAnySliderMoving){
		document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
	}
	newAudioCutter.isAnySliderMoving=false;
})

newAudioCutter.audioSliderBase.addEventListener('mousedown', function(e) {
	var left = parseInt(getComputedStyle(newAudioCutter.minRangeOfAudioSlider).left);
	var right = parseInt(getComputedStyle(newAudioCutter.maxRangeOfAudioSlider).left);
	var mid = e.clientX - 50;
	var midTrue = (mid > left) && (mid < right);

	if (midTrue) {
		document.body.style.cursor = "all-scroll";
		var hoverDiv = newAudioCutter.createElement('div');
		hoverDiv.classList.add("hoverDiv");
		hoverDiv.style.width = `${parseInt((getComputedStyle(newAudioCutter.maxRangeAudioLabel).left)) - parseInt((getComputedStyle(newAudioCutter.minRangeAudioLabel).left)) - 9}px`;
		hoverDiv.style.left = `${parseInt((getComputedStyle(newAudioCutter.minRangeAudioLabel).left)) + 9}px`;
		newAudioCutter.setIdAttribute(hoverDiv, "hoverDiv");
		newAudioCutter.audioSliderBase.append(hoverDiv);
		newAudioCutter.currentEventClientX = e.clientX;
		newAudioCutter.currentMinLeft = parseInt(getComputedStyle(newAudioCutter.minRangeAudioLabel).left);
		newAudioCutter.currentMaxLeft = parseInt(getComputedStyle(newAudioCutter.maxRangeAudioLabel).left);
		newAudioCutter.currentHoverLeft = parseInt((getComputedStyle(newAudioCutter.minRangeAudioLabel).left)) + 9;
		window.addEventListener('mousemove', mousemoveEvent, true);

	}
})

function mousemoveEvent(event) {

	if (event.clientX < newAudioCutter.currentEventClientX && (newAudioCutter.currentMinLeft - (newAudioCutter.currentEventClientX - event.clientX) >= -9)) {
		newAudioCutter.minRangeOfAudioSlider.style.left = `${newAudioCutter.currentMinLeft - (newAudioCutter.currentEventClientX - event.clientX)}px`;
		newAudioCutter.minRangeAudioLabel.style.left = `${newAudioCutter.currentMinLeft - (newAudioCutter.currentEventClientX - event.clientX)}px`;
		hoverDiv.style.left = `${newAudioCutter.currentHoverLeft - (newAudioCutter.currentEventClientX - event.clientX)}px`;
		var percentage = (parseInt(getComputedStyle(newAudioCutter.minRangeAudioLabel).left)+9)/ 1800;
		var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
		newAudioCutter.minRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		document.getElementById('starttimeminutes').value = newAudioCutter.flooring(currAudioDuration / 60);
		document.getElementById('starttimeseconds').value = newAudioCutter.flooring(currAudioDuration % 60);
		newAudioCutter.maxRangeOfAudioSlider.style.left = `${newAudioCutter.currentMaxLeft - (newAudioCutter.currentEventClientX - event.clientX)}px`;
		newAudioCutter.maxRangeAudioLabel.style.left = `${newAudioCutter.currentMaxLeft - (newAudioCutter.currentEventClientX - event.clientX)}px`;
		var percentage = parseInt(getComputedStyle(newAudioCutter.maxRangeAudioLabel).left) / 1800;
		var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
		newAudioCutter.maxRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		document.getElementById('endtimeminutes').value = newAudioCutter.flooring(currAudioDuration / 60);
		document.getElementById('endtimeseconds').value = newAudioCutter.flooring(currAudioDuration % 60);
		newAudioCutter.isAnySliderMoving=true;
		if(newAudioCutter.currentTimePElement){
			newAudioCutter.currentTimePElement.style.left= `${newAudioCutter.currentMinLeft+9}px`;
			newAudioCutter.currentTimeLabelElement.style.left= `${newAudioCutter.currentMinLeft+9}px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		}
		

	} else if (event.clientX > newAudioCutter.currentEventClientX && (newAudioCutter.currentMaxLeft + (-newAudioCutter.currentEventClientX + event.clientX) <= 1800)) {
		newAudioCutter.minRangeOfAudioSlider.style.left = `${newAudioCutter.currentMinLeft + (-newAudioCutter.currentEventClientX + event.clientX)}px`;
		newAudioCutter.minRangeAudioLabel.style.left = `${newAudioCutter.currentMinLeft + (-newAudioCutter.currentEventClientX + event.clientX)}px`;
		hoverDiv.style.left = `${newAudioCutter.currentHoverLeft + (-newAudioCutter.currentEventClientX + event.clientX)}px`;
		var percentage = (parseInt(getComputedStyle(newAudioCutter.minRangeAudioLabel).left) +9)/ 1800;
		var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
		newAudioCutter.minRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		document.getElementById('starttimeminutes').value = newAudioCutter.flooring(currAudioDuration / 60);
		document.getElementById('starttimeseconds').value = newAudioCutter.flooring(currAudioDuration % 60);
		newAudioCutter.maxRangeOfAudioSlider.style.left = `${newAudioCutter.currentMaxLeft + (-newAudioCutter.currentEventClientX + event.clientX)}px`;
		newAudioCutter.maxRangeAudioLabel.style.left = `${newAudioCutter.currentMaxLeft + (-newAudioCutter.currentEventClientX + event.clientX)}px`;
		var percentage = parseInt(getComputedStyle(newAudioCutter.maxRangeAudioLabel).left) / 1800;
		var currAudioDuration = percentage * (newAudioCutter.originalAudio.duration);
		newAudioCutter.maxRangeAudioLabel.innerText = `${newAudioCutter.flooring(currAudioDuration / 60)}:${newAudioCutter.flooring(currAudioDuration % 60)}`;
		document.getElementById('endtimeminutes').value = newAudioCutter.flooring(currAudioDuration / 60);
		document.getElementById('endtimeseconds').value = newAudioCutter.flooring(currAudioDuration % 60);
		newAudioCutter.isAnySliderMoving=true;
		if(newAudioCutter.currentTimePElement){
			newAudioCutter.currentTimePElement.style.left=`${newAudioCutter.currentMinLeft + 9}px`;
			newAudioCutter.currentTimeLabelElement.style.left=`${newAudioCutter.currentMinLeft + 9}px`;
			currentStateOfTrimmedAudio.currentTime=0;
			trimmedAudio.currentTime=0;
			document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
		}

	}
	opacityDecreasingMinimumDiv()
	opacityDecreasingMaximumDiv()
}

window.addEventListener('mouseup', () => {
	if (document.getElementById("hoverDiv")) {
		document.getElementById("hoverDiv").remove();
	}
	window.removeEventListener("mousemove", mousemoveEvent, true);
	document.body.style.cursor = "auto";
	if(newAudioCutter.isPlaying && newAudioCutter.isAnySliderMoving){
		document.getElementById('submit').click();
		document.getElementById('trimmedAudio').play();
	}
	newAudioCutter.isAnySliderMoving=false;
})



