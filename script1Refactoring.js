
function ExtractingCurrentAndDiff(){
	newAudioSlider.extractedCurrentStartValueSeconds = newAudioSlider.startTimeSeconds.value;
			newAudioSlider.extractedCurrentStartValueMinutes = newAudioSlider.startTimeMinutes.value;
			newAudioSlider.extractedCurrentEndValueSeconds = newAudioSlider.endTimeSeconds.value;
			newAudioSlider.extractedCurrentEndValueMinutes = newAudioSlider.endTimeMinutes.value;
			newAudioSlider.diff = (parseInt(newAudioSlider.extractedCurrentEndValueMinutes) * 60 + parseInt(newAudioSlider.extractedCurrentEndValueSeconds)) - (parseInt(newAudioSlider.extractedCurrentStartValueMinutes * 60) + parseInt(newAudioSlider.extractedCurrentStartValueSeconds));

}
function onClickOnAnyInput(event) {
	newAudioSlider.currentEventTargetElement = event.target;
		var idCheck = newAudioSlider.currentEventTargetElement.id;
		if (idCheck === "starttimeseconds" || idCheck === "starttimeminutes") {
			ExtractingCurrentAndDiff();
			if (newAudioSlider.diff > 1) {
				var expectedTimeToAdded = newAudioSlider.diff - 1;
				var valueToAddedIntoMinutes = parseInt(expectedTimeToAdded / 60);
				var valueToAddedIntoSeconds = parseInt(expectedTimeToAdded % 60);
				newAudioSlider.startValueThatIsExpectedUptoSeconds = parseInt(newAudioSlider.extractedCurrentStartValueSeconds) + valueToAddedIntoSeconds;
				newAudioSlider.startValueThatIsExpectedUptoMinutes = parseInt(newAudioSlider.extractedCurrentStartValueMinutes) + valueToAddedIntoMinutes;
			}
		}
		else if (idCheck === "endtimeseconds" || idCheck === "endtimeminutes") {
			ExtractingCurrentAndDiff();
			if (newAudioSlider.diff > 1) {
				var totalDurationOfStart = parseInt(newAudioSlider.extractedCurrentStartValueMinutes * 60) + parseInt(newAudioSlider.extractedCurrentStartValueSeconds);
				var expectedDurationForEnd = totalDurationOfStart + 1;
				newAudioSlider.endValueThatIsExpectedUptoSeconds = parseInt(expectedDurationForEnd % 60);
				newAudioSlider.endValueThatIsExpectedUptoMinutes = parseInt(expectedDurationForEnd / 60);
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

function visualizeAudioBuff(audioBuff) {
	const accumulatedDataFunc = audioBuff => {
		const firstChannelData = audioBuff.getChannelData(0);
		const amountOfWaveToBeDisplayed = 500;
		const trimBlock = Math.floor(firstChannelData.length / amountOfWaveToBeDisplayed);
		const accumulatedDataArray = new Array();
		for (let i = 0; i < amountOfWaveToBeDisplayed; i++) {
			let blockStart = trimBlock * i;
			let sum = 0;

			for (let j = 0; j < trimBlock; j++) {
				sum = sum + Math.abs(firstChannelData[blockStart + j])
			}
			accumulatedDataArray.push(sum / trimBlock);
		}
		return accumulatedDataArray;
	}
	var accumulatedData = accumulatedDataFunc(audioBuff);

	const normalizeData = accumulatedDataArray => {
		const multiplier = Math.pow(Math.max(...accumulatedDataArray), -1);
		return accumulatedDataArray.map(n => n * multiplier);
	}
	var normalizedData= normalizeData(accumulatedData);

	draw(normalizedData);

}


function draw(normalizedData) {
	const canvas = document.querySelector("canvas");
	canvas.style.background = "rgb(0 100 170)";
	canvas.width = canvas.offsetWidth;
	canvas.height = (canvas.offsetHeight);
	const context = canvas.getContext("2d");
	context.translate(0, canvas.offsetHeight / 2);

	const width = canvas.offsetWidth / normalizedData.length;
	for (let i = 0; i < normalizedData.length; i++) {
		const x = width * i;

		let height = normalizedData[i] * canvas.offsetHeight - canvas.offsetHeight / 2;
		if (height < 0) {
			height = 0;
		}
		drawArcAndLineSegment(context, x, height, width, (i) % 2);
	}
};



function drawArcAndLineSegment  (context, x, y, width, isEven) {
	context.lineWidth = 1;
	context.strokeStyle = "#fff";
	context.beginPath();
	y = isEven ? y : -y;
	context.moveTo(x, 0);
	context.lineTo(x, y);
	context.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
	context.lineTo(x + width, 0);
	context.stroke();

};


function checkElementsAlreadyPresent(){

	if (document.getElementById('originalAudio')) {
		newAudioSlider.removeElementById(['originalAudio', 'submit', 'starttimeminutes', 'starttimeseconds', 'endtimeminutes', 'endtimeseconds']);
		if (document.getElementById("trimmedAudioLabel")) {
			newAudioSlider.removeElementById(['trimmedAudiolabel', 'trimmedAudio', 'playTrimmedAudio', 'downloadTrimmedAudio', 'speed', 'speedlabel', 'volume', 'volumelabel']);
		}

	}

}


function originalAudioSet(){

	newAudioSlider.originalAudio = newAudioSlider.createElement('audio');
	newAudioSlider.setIdAttribute(newAudioSlider.originalAudio, "originalAudio");
	newAudioSlider.insertAfter(newAudioSlider.originalAudio, newAudioSlider.uploadSong);
	newAudioSlider.originalAudio.setAttribute("src", URL.createObjectURL(event.target.files[0]));
	newAudioSlider.originalAudio.setAttribute("controls", true);
	newAudioSlider.originalAudio.style.display = "flex";
	newAudioSlider.originalAudio.load();

}

function createAndSetValuesToInputElements(){
	newAudioSlider.startTimeSeconds = document.createElement('input');
		newAudioSlider.startTimeMinutes = document.createElement('input');
		newAudioSlider.endTimeSeconds = document.createElement('input');
		newAudioSlider.endTimeMinutes = document.createElement('input');

		[newAudioSlider.startTimeSeconds, newAudioSlider.startTimeMinutes, newAudioSlider.endTimeMinutes, newAudioSlider.endTimeSeconds].forEach((x) => x.setAttribute('type', 'number'));

		newAudioSlider.startTimeSeconds.setAttribute("id", "starttimeseconds");
		newAudioSlider.startTimeMinutes.setAttribute("id", "starttimeminutes");
		newAudioSlider.endTimeSeconds.setAttribute("id", "endtimeseconds");
		newAudioSlider.endTimeMinutes.setAttribute("id", "endtimeminutes");

		newAudioSlider.startTimeSeconds.value = "0";
		newAudioSlider.startTimeMinutes.value = "0";
		newAudioSlider.endTimeSeconds.value = `${Math.floor(newAudioSlider.originalAudio.duration % 60)}`;
		newAudioSlider.endTimeMinutes.value = `${Math.floor(newAudioSlider.originalAudio.duration / 60)}`;

		elementsNeededToAppendToBody = [newAudioSlider.startTimeMinutes, newAudioSlider.startTimeSeconds, newAudioSlider.endTimeMinutes, newAudioSlider.endTimeSeconds];

		elementsNeededToAppendToBody.forEach((x) => newAudioSlider.appendToBody(x));
}



function startTimeSecondsF(){
	
		var startTimeSeconds = parseInt(newAudioSlider.startTimeSeconds.value);
		var startTimeMinutes = parseInt(newAudioSlider.startTimeMinutes.value);
	
		var startTimeExpectedUptoSeconds = parseInt(newAudioSlider.startValueThatIsExpectedUptoSeconds);
		var startTimeExpectedUptoMinutes = parseInt(newAudioSlider.startValueThatIsExpectedUptoMinutes);
	
		var startTimeCurrentWholeValue = startTimeMinutes * 60 + startTimeSeconds;
		var startTimeExpectedWholeValue = startTimeExpectedUptoMinutes * 60 + startTimeExpectedUptoSeconds;
	
		if (startTimeCurrentWholeValue <= startTimeExpectedWholeValue && startTimeCurrentWholeValue >= 0) {
			if (newAudioSlider.startTimeSeconds.value == 60) {
				newAudioSlider.startTimeSeconds.value = 0;
				newAudioSlider.startTimeMinutes.value = parseInt(newAudioSlider.startTimeMinutes.value) + 1;
			}
			if (newAudioSlider.startTimeSeconds.value == -1) {
				newAudioSlider.startTimeSeconds.value = 59;
				newAudioSlider.startTimeMinutes.value = parseInt(newAudioSlider.startTimeMinutes.value) - 1;
			}
			newAudioSlider.extractedCurrentStartValueSeconds = newAudioSlider.startTimeSeconds.value;
			newAudioSlider.extractedCurrentStartValueMinutes = newAudioSlider.startTimeMinutes.value;
			newAudioSlider.minRangeOfAudioSlider.style.left = (startTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration)) * 500 + 'px';
			newAudioSlider.minRangeAudioLabel.style.left = (startTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration)) * 500 + 'px';
			var percentage = (startTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration));
			var currAudioDuration = Math.ceil(percentage * (newAudioSlider.originalAudio.duration));
			newAudioSlider.minRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		} else {
			newAudioSlider.startTimeSeconds.value = newAudioSlider.extractedCurrentStartValueSeconds;
			newAudioSlider.startTimeMinutes.value = newAudioSlider.extractedCurrentStartValueMinutes;
		}
	
	
}

function startTimeMinutesF(){


	var startTimeSeconds = parseInt(newAudioSlider.startTimeSeconds.value);
		var startTimeMinutes = parseInt(newAudioSlider.startTimeMinutes.value);

		var startTimeExpectedUptoSeconds = parseInt(newAudioSlider.startValueThatIsExpectedUptoSeconds);
		var startTimeExpectedUptoMinutes = parseInt(newAudioSlider.startValueThatIsExpectedUptoMinutes);

		var startTimeCurrentWholeValue = startTimeMinutes * 60 + startTimeSeconds;
		var startTimeExpectedWholeValue = startTimeExpectedUptoMinutes * 60 + startTimeExpectedUptoSeconds;

		if (startTimeCurrentWholeValue <= startTimeExpectedWholeValue && startTimeCurrentWholeValue >= 0) {
			newAudioSlider.extractedCurrentStartValueSeconds = newAudioSlider.startTimeSeconds.value;
			newAudioSlider.extractedCurrentStartValueMinutes = newAudioSlider.startTimeMinutes.value;
			newAudioSlider.minRangeOfAudioSlider.style.left = (startTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration)) * 500 + 'px';
			newAudioSlider.minRangeAudioLabel.style.left = (startTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration)) * 500 + 'px';
			var percentage = (startTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration));
			var currAudioDuration = Math.ceil(percentage * (newAudioSlider.originalAudio.duration));
			newAudioSlider.minRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		} else {
			newAudioSlider.startTimeSeconds.value = newAudioSlider.extractedCurrentStartValueSeconds;
			newAudioSlider.startTimeMinutes.value = newAudioSlider.extractedCurrentStartValueMinutes;
		}

}


function endTimeSecondsF(){
	var endTimeSeconds = parseInt(newAudioSlider.endTimeSeconds.value);
		var endTimeMinutes = parseInt(newAudioSlider.endTimeMinutes.value);

		var endTimeExpectedUptoSeconds = parseInt(newAudioSlider.endValueThatIsExpectedUptoSeconds);
		var endTimeExpectedUptoMinutes = parseInt(newAudioSlider.endValueThatIsExpectedUptoMinutes);

		var endTimeCurrentWholeValue = endTimeMinutes * 60 + endTimeSeconds;
		var endTimeExpectedWholeValue = endTimeExpectedUptoMinutes * 60 + endTimeExpectedUptoSeconds;

		if (endTimeCurrentWholeValue >= endTimeExpectedWholeValue && endTimeCurrentWholeValue <= newAudioSlider.originalAudio.duration) {
			if (newAudioSlider.endTimeSeconds.value == 60) {
				newAudioSlider.endTimeSeconds.value = 0;
				newAudioSlider.endTimeMinutes.value = parseInt(newAudioSlider.endTimeMinutes.value) + 1;
			}
			if (newAudioSlider.endTimeSeconds.value == -1) {
				newAudioSlider.endTimeSeconds.value = 59;
				newAudioSlider.endTimeMinutes.value = parseInt(newAudioSlider.endTimeMinutes.value) - 1;
			}
			newAudioSlider.extractedCurrentEndValueSeconds = newAudioSlider.endTimeSeconds.value;
			newAudioSlider.extractedCurrentEndValueMinutes = newAudioSlider.endTimeMinutes.value;
			newAudioSlider.maxRangeOfAudioSlider.style.left = (endTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration)) * 500 + 'px';
			newAudioSlider.maxRangeAudioLabel.style.left = (endTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration)) * 500 + 'px';
			var percentage = (endTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration));
			var currAudioDuration = Math.ceil(percentage * (newAudioSlider.originalAudio.duration));
			newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		} else {
			newAudioSlider.endTimeSeconds.value = newAudioSlider.extractedCurrentEndValueSeconds;
			newAudioSlider.endTimeMinutes.value = newAudioSlider.extractedCurrentEndValueMinutes;
		}
}


function endTimeMinutesF(){
	var endTimeSeconds = parseInt(newAudioSlider.endTimeSeconds.value);
		var endTimeMinutes = parseInt(newAudioSlider.endTimeMinutes.value);

		var endTimeExpectedUptoSeconds = parseInt(newAudioSlider.endValueThatIsExpectedUptoSeconds);
		var endTimeExpectedUptoMinutes = parseInt(newAudioSlider.endValueThatIsExpectedUptoMinutes);

		var endTimeCurrentWholeValue = endTimeMinutes * 60 + endTimeSeconds;
		var endTimeExpectedWholeValue = endTimeExpectedUptoMinutes * 60 + endTimeExpectedUptoSeconds;

		if (endTimeCurrentWholeValue >= endTimeExpectedWholeValue && endTimeCurrentWholeValue <= newAudioSlider.originalAudio.duration) {
			newAudioSlider.extractedCurrentEndValueSeconds = newAudioSlider.endTimeSeconds.value;
			newAudioSlider.extractedCurrentEndValueMinutes = newAudioSlider.endTimeMinutes.value;
			newAudioSlider.maxRangeOfAudioSlider.style.left = (endTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration)) * 500 + 'px';
			newAudioSlider.maxRangeAudioLabel.style.left = (endTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration)) * 500 + 'px';
			var percentage = (endTimeCurrentWholeValue / (newAudioSlider.originalAudio.duration));
			var currAudioDuration = Math.ceil(percentage * (newAudioSlider.originalAudio.duration));
			newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		} else {
			newAudioSlider.endTimeSeconds.value = newAudioSlider.extractedCurrentEndValueSeconds;
			newAudioSlider.endTimeMinutes.value = newAudioSlider.extractedCurrentEndValueMinutes;
		}
}






function afterOnLoadedMetaData(){
	createAndSetValuesToInputElements();


	newAudioSlider.startTimeSeconds.addEventListener("change",startTimeSecondsF);

	newAudioSlider.startTimeMinutes.addEventListener("change", startTimeMinutesF);

	newAudioSlider.endTimeSeconds.addEventListener("change", endTimeSecondsF);

	newAudioSlider.endTimeMinutes.addEventListener("change", endTimeMinutesF);

	
	document.body.append(newAudioSlider.audioSliderBase);

	newAudioSlider.reset(newAudioSlider.minRangeOfAudioSlider,1);
	newAudioSlider.reset(newAudioSlider.minRangeAudioLabel,1);
	newAudioSlider.reset(newAudioSlider.maxRangeOfAudioSlider,0);
	newAudioSlider.reset(newAudioSlider.maxRangeAudioLabel,0);
	newAudioSlider.minRangeAudioLabel.innerText = "0:00";
	newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(originalAudio.duration / 60)}:${newAudioSlider.flooring(originalAudio.duration % 60)}`;
	newAudioSlider.minimumGap = 0.1 * (newAudioSlider.originalAudio.duration);

	fetch(newAudioSlider.originalAudio.src).then(function(response) {
		if (response.ok) {
			return response.blob();
		}
		throw new Error('Network response was not ok.');
	}).then(function(blob) {
		newAudioSlider.Blob = blob;
	}).catch(function(error) {
		console.log('There has been a problem with your fetch operation: ', error);
	});

	var submitButton = newAudioSlider.createElement('button');
	newAudioSlider.styleSet(submitButton, {
		position: 'absolute',
		top: "225px",
		left: "280px"
	});
	submitButton.innerText = "Submit";
	submitButton.setAttribute("id", 'submit');
	document.body.append(submitButton);

	document.getElementById('submit').addEventListener('click', function(e) {
		if (document.getElementById('trimmedAudio')) {
			newAudioSlider.removeElementById(['trimmedAudioLabel', 'trimmedAudio', 'playTrimmedAudio', 'downloadTrimmedAudio', 'speed', 'speedlabel', 'volume', 'volumelabel']);
		}

		newAudioSlider.playBackSpeedRateLabel = document.createElement('label');
		newAudioSlider.playBackSpeedRateLabel.innerText = "speed";
		newAudioSlider.playBackSpeedRateLabel.setAttribute("id", "speedlabel");
		newAudioSlider.styleSet(newAudioSlider.playBackSpeedRateLabel, {
			position: 'absolute',
			top: '80px',
			left: '750px'
		});
		newAudioSlider.appendToBody(newAudioSlider.playBackSpeedRateLabel);

		newAudioSlider.playBackSpeedRate = document.createElement('input');
		newAudioSlider.attributeSet(newAudioSlider.playBackSpeedRate, {
			type: 'range',
			min: '0.25',
			max: '2',
			step: '0.25',
			id: 'speed'
		});
		newAudioSlider.styleSet(newAudioSlider.playBackSpeedRate, {
			position: 'absolute',
			top: '80px',
			left: '800px'
		});
		newAudioSlider.appendToBody(newAudioSlider.playBackSpeedRate);

		newAudioSlider.playBackSpeedRate.value = '1';

		newAudioSlider.playBackSpeedRate.addEventListener('change', function(event) {
			document.getElementById('trimmedAudio').playbackRate = newAudioSlider.playBackSpeedRate.value;
		})

		newAudioSlider.musicVolumeLabel = document.createElement('label');
		newAudioSlider.musicVolumeLabel.innerText = "volume control";
		newAudioSlider.musicVolumeLabel.setAttribute("id", "volumelabel");
		newAudioSlider.styleSet(newAudioSlider.musicVolumeLabel, {
			position: 'absolute',
			top: '80px',
			left: '950px'
		});
		newAudioSlider.appendToBody(newAudioSlider.musicVolumeLabel);

		newAudioSlider.musicVolume = document.createElement('input');
		newAudioSlider.attributeSet(newAudioSlider.musicVolume, {
			type: 'range',
			min: '0',
			max: '1',
			step: '0.1',
			id: 'volume',
			value: '1'
		});
		newAudioSlider.styleSet(newAudioSlider.musicVolume, {
			position: 'absolute',
			top: '80px',
			left: '1050px'
		});
		newAudioSlider.appendToBody(newAudioSlider.musicVolume);

		newAudioSlider.musicVolume.addEventListener('change', function(event) {
			document.getElementById('trimmedAudio').volume = newAudioSlider.musicVolume.value;
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
			var wholeDuration = newAudioSlider.originalAudio.duration;

			var trimmedAudioBlob;

			const startTime = ((startValue * newAudioSlider.Blob.size) / wholeDuration);
			const endTime = ((endValue * newAudioSlider.Blob.size) / wholeDuration) + ((1 * newAudioSlider.Blob.size) / wholeDuration);

			trimmedAudioBlob = newAudioSlider.Blob.slice(startTime, endTime, newAudioSlider.Blob.type);

			var trimmedAudio = new Audio();
			trimmedAudio.setAttribute("id", 'trimmedAudio');
			trimmedAudio.src = window.URL.createObjectURL(trimmedAudioBlob);
			trimmedAudio.controls = true;
			newAudioSlider.styleSet(trimmedAudio, {
				position: "absolute",
				top: "300px",
				left: "180px"
			});
			trimmedAudio.loop = 'true';
			newAudioSlider.appendToBody(trimmedAudio);

			var trimmedAudioLabel = document.createElement('label');
			newAudioSlider.setIdAttribute(trimmedAudioLabel, 'trimmedAudioLabel');
			trimmedAudioLabel.innerHTML = "new audio";
			newAudioSlider.styleSet(trimmedAudioLabel, {
				position: "absolute",
				top: "250px",
				left: "280px"
			});
			newAudioSlider.appendToBody(trimmedAudioLabel);

			var playTrimmedAudio = newAudioSlider.createButton();

			newAudioSlider.setIdAttribute(playTrimmedAudio, 'playTrimmedAudio');
			playTrimmedAudio.innerHTML = "Play Trimmed Audio &#9658";
			newAudioSlider.styleSet(playTrimmedAudio, {
				position: "absolute",
				top: "400px",
				left: "100px"
			});
			document.body.append(playTrimmedAudio);

			playTrimmedAudio.addEventListener('click', function() {
				if (!newAudioSlider.playPauseCount) {
					playTrimmedAudio.innerHTML = "Pause Trimmed Audio &#9208";

					trimmedAudio.play();
					newAudioSlider.playPauseCount = 1;
				} else {
					playTrimmedAudio.innerHTML = "Play Trimmed Audio &#9658";
					trimmedAudio.pause();
					newAudioSlider.playPauseCount = 0;
				}
			})

			var downloadAudio = newAudioSlider.createButton();
			downloadAudio.innerHTML = "Download Trimmed Audio &#8681";
			downloadAudio.setAttribute('id', 'downloadTrimmedAudio');

			newAudioSlider.styleSet(downloadAudio, {
				position: "absolute",
				top: "400px",
				left: "400px"
			});
			newAudioSlider.appendToBody(downloadAudio);

			downloadAudio.addEventListener('click', function() {
				const a = Object.assign(document.createElement('a'), {
					href: document.getElementById('trimmedAudio').src,
					download: "newAudio.mp3"
				});

				document.body.appendChild(a);
				a.click();
				a.remove();

			})
		}
	})
}


const newAudioSlider = new AudioSlider();

newAudioSlider.creatingRequiredElements();


newAudioSlider.uploadSong.addEventListener("change", function(event) {
	
	
	decodingAudioAndCallingVisualize(URL.createObjectURL(event.target.files[0]));
	
	checkElementsAlreadyPresent();
	
	originalAudioSet();

	newAudioSlider.originalAudio.onloadedmetadata = afterOnLoadedMetaData;
})

newAudioSlider.audioSliderBase.addEventListener('click', function(event) {
	var left = parseInt(getComputedStyle(newAudioSlider.minRangeOfAudioSlider).left);
	var right = parseInt(getComputedStyle(newAudioSlider.maxRangeOfAudioSlider).left);
	var mid = event.clientX - 50;
	var midTrue = (mid > left) && (mid < right);

	if ((event.clientX - 50) < left && !midTrue) {
		goLeft(mid);
	} else if ((event.clientX - 50) > right && !midTrue) {
		goRight(mid);
	}
});

function goLeft(dest) {
	var current = parseInt(getComputedStyle(newAudioSlider.minRangeOfAudioSlider).left);
	var destination = dest;
	setTimeout(function() {
		if (current > destination) {
			newAudioSlider.minRangeOfAudioSlider.style.left = current - 1 + 'px';
			newAudioSlider.minRangeAudioLabel.style.left = current - 1 + 'px';
			var percentage = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left) / 500;
			var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
			newAudioSlider.minRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
			document.getElementById('starttimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
			document.getElementById('starttimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
			goLeft(destination);
		}
	}, 1);
}

function goRight(dest) {
	var current = parseInt(getComputedStyle(newAudioSlider.maxRangeOfAudioSlider).left);
	var destination = dest;
	setTimeout(function() {
		if (current < destination) {
			newAudioSlider.maxRangeOfAudioSlider.style.left = current + 1 + 'px';
			newAudioSlider.maxRangeAudioLabel.style.left = current + 1 + 'px';
			var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
			var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
			newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
			document.getElementById('endtimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
			document.getElementById('endtimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
			goRight(destination);
		}
	}, 1);
}

newAudioSlider.minRangeOfAudioSlider.addEventListener('mousedown', function(e) {
		e.stopPropagation();
		newAudioSlider.currentEventClientX = e.clientX;
		newAudioSlider.currentMinLeft = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left);
		newAudioSlider.currentMaxLeft = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left);
		window.addEventListener('mousemove', mousemoveMin, true);

	}

)

function mousemoveMin(event) {
	if (event.clientX > newAudioSlider.currentEventClientX && newAudioSlider.currentMaxLeft - (event.clientX - 50) >= newAudioSlider.minimumGap) {
		newAudioSlider.minRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
		newAudioSlider.minRangeAudioLabel.style.left = `${event.clientX - 50}px`;
		var percentage = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left) / 500;
		var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
		newAudioSlider.minRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		document.getElementById('starttimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
		document.getElementById('starttimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
	} else if (event.clientX < newAudioSlider.currentEventClientX && event.clientX - 50 >= 0) {
		newAudioSlider.minRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
		newAudioSlider.minRangeAudioLabel.style.left = `${event.clientX - 50}px`;
		var percentage = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left) / 500;
		var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
		newAudioSlider.minRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		document.getElementById('starttimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
		document.getElementById('starttimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
	}
}

window.addEventListener('mouseup', () => {
	window.removeEventListener("mousemove", mousemoveMin, true);
})

newAudioSlider.maxRangeOfAudioSlider.addEventListener('mousedown', function(e) {
	e.stopPropagation();
	newAudioSlider.currentEventClientX = e.clientX;
	newAudioSlider.currentMinLeft = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left);
	newAudioSlider.currentMaxLeft = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left);
	window.addEventListener('mousemove', mousemoveMax, true);
})

function mousemoveMax(event) {
    console.log("mousemoveMax");
	if (event.clientX < newAudioSlider.currentEventClientX && (event.clientX - 50 - newAudioSlider.currentMinLeft) >= newAudioSlider.minimumGap) {
		newAudioSlider.maxRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
		newAudioSlider.maxRangeAudioLabel.style.left = `${event.clientX - 50}px`;
		var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
		var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
		newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		document.getElementById('endtimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
		document.getElementById('endtimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
	} else if (event.clientX > newAudioSlider.currentEventClientX && event.clientX - 50 <= 500) {
		newAudioSlider.maxRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
		newAudioSlider.maxRangeAudioLabel.style.left = `${event.clientX - 50}px`;
		var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
		var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
		newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		document.getElementById('endtimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
		document.getElementById('endtimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
	} else if (event.clientX - 50 > 500) {
		newAudioSlider.maxRangeOfAudioSlider.style.left = `${500}px`;
		newAudioSlider.maxRangeAudioLabel.style.left = `${500}px`;
		newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(newAudioSlider.originalAudio.duration / 60)}:${newAudioSlider.flooring(newAudioSlider.originalAudio.duration % 60)}`;
		document.getElementById('endtimeminutes').value = newAudioSlider.flooring(newAudioSlider.originalAudio.duration / 60);
		document.getElementById('endtimeseconds').value = newAudioSlider.flooring(newAudioSlider.originalAudio.duration % 60);
	}
}

window.addEventListener('mouseup', () => {
    window.removeEventListener("mousemove", mousemoveMax, true);
})

newAudioSlider.audioSliderBase.addEventListener('mousedown', function(e) {
	var left = parseInt(getComputedStyle(newAudioSlider.minRangeOfAudioSlider).left);
	var right = parseInt(getComputedStyle(newAudioSlider.maxRangeOfAudioSlider).left);
	var mid = e.clientX - 50;
	var midTrue = (mid > left) && (mid < right);

	if (midTrue) {
		document.body.style.cursor = "all-scroll";
		var hoverDiv = newAudioSlider.createElement('div');
		hoverDiv.classList.add("hoverDiv");
		hoverDiv.style.width = `${parseInt((getComputedStyle(newAudioSlider.maxRangeAudioLabel).left)) - parseInt((getComputedStyle(newAudioSlider.minRangeAudioLabel).left)) - 9}px`;
		hoverDiv.style.left = `${parseInt((getComputedStyle(newAudioSlider.minRangeAudioLabel).left)) + 9}px`;
		newAudioSlider.setIdAttribute(hoverDiv, "hoverDiv");
		newAudioSlider.audioSliderBase.append(hoverDiv);
		newAudioSlider.currentEventClientX = e.clientX;
		newAudioSlider.currentMinLeft = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left);
		newAudioSlider.currentMaxLeft = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left);
		newAudioSlider.currentHoverLeft = parseInt((getComputedStyle(newAudioSlider.minRangeAudioLabel).left)) + 9;
		window.addEventListener('mousemove', mousemoveEvent, true);

	}
})

function mousemoveEvent(event) {
	if (event.clientX < newAudioSlider.currentEventClientX && (newAudioSlider.currentMinLeft - (newAudioSlider.currentEventClientX - event.clientX) >= 0)) {
		newAudioSlider.minRangeOfAudioSlider.style.left = `${newAudioSlider.currentMinLeft - (newAudioSlider.currentEventClientX - event.clientX)}px`;
		newAudioSlider.minRangeAudioLabel.style.left = `${newAudioSlider.currentMinLeft - (newAudioSlider.currentEventClientX - event.clientX)}px`;
		hoverDiv.style.left = `${newAudioSlider.currentHoverLeft - (newAudioSlider.currentEventClientX - event.clientX)}px`;
		var percentage = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left) / 500;
		var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
		newAudioSlider.minRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		document.getElementById('starttimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
		document.getElementById('starttimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
		newAudioSlider.maxRangeOfAudioSlider.style.left = `${newAudioSlider.currentMaxLeft - (newAudioSlider.currentEventClientX - event.clientX)}px`;
		newAudioSlider.maxRangeAudioLabel.style.left = `${newAudioSlider.currentMaxLeft - (newAudioSlider.currentEventClientX - event.clientX)}px`;
		var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
		var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
		newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		document.getElementById('endtimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
		document.getElementById('endtimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);

	} else if (event.clientX > newAudioSlider.currentEventClientX && (newAudioSlider.currentMaxLeft + (-newAudioSlider.currentEventClientX + event.clientX) <= 500)) {
		newAudioSlider.minRangeOfAudioSlider.style.left = `${newAudioSlider.currentMinLeft + (-newAudioSlider.currentEventClientX + event.clientX)}px`;
		newAudioSlider.minRangeAudioLabel.style.left = `${newAudioSlider.currentMinLeft + (-newAudioSlider.currentEventClientX + event.clientX)}px`;
		hoverDiv.style.left = `${newAudioSlider.currentHoverLeft + (-newAudioSlider.currentEventClientX + event.clientX)}px`;
		var percentage = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left) / 500;
		var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
		newAudioSlider.minRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		document.getElementById('starttimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
		document.getElementById('starttimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
		newAudioSlider.maxRangeOfAudioSlider.style.left = `${newAudioSlider.currentMaxLeft + (-newAudioSlider.currentEventClientX + event.clientX)}px`;
		newAudioSlider.maxRangeAudioLabel.style.left = `${newAudioSlider.currentMaxLeft + (-newAudioSlider.currentEventClientX + event.clientX)}px`;
		var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
		var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
		newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
		document.getElementById('endtimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
		document.getElementById('endtimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);

	}
}

window.addEventListener('mouseup', () => {
	if (document.getElementById("hoverDiv")) {
		document.getElementById("hoverDiv").remove();
	}
	window.removeEventListener("mousemove", mousemoveEvent, true);
	document.body.style.cursor = "auto";
})