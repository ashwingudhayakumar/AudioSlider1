class classForHoldingCommonVarAndFunc {
	constructor() {
		this.diffBtwDuration;

		this.extractedCurrentStartValueSeconds;
		this.extractedCurrentStartValueMinutes;
		this.extractedCurrentEndValueSeconds;
		this.extractedCurrentEndValueMinutes;

		this.originalAudio;
		this.minimumGap;
		this.playPauseCount;

		this.startTimeSeconds;
		this.startTimeMinutes;

		this.endTimeSeconds;
		this.endTimeMinutes;

		

		this.startValueThatIsExpectedUptoSeconds;
		this.startValueThatIsExpectedUptoMinutes;

		this.endValueThatIsExpectedUptoSeconds;
		this.endValueThatIsExpectedUptoMinutes;

		this.currentEventTargetElement;

		this.currentEventClientX;
		this.currentMinLeft;
		this.currentMaxLeft;
		this.currentHoverLeft;

		this.playBackSpeedRate;
		this.playBackSpeedRateLabel;
		this.musicVolume;
		this.musicVolumeLabel;

		this.currentTimePElement;
		this.currentTimeLabelElement;


		this.isPlaying;
		this.isAnySliderMoving;

		this.loweringOpacityInMin;
		this.loweringOpacityInMax;

	}

	createElement(specified) {
		return document.createElement(specified);

	}

	createButton() {
		return document.createElement('button');
	}

	setInnerHTML(element, content) {
		element.innerHTML = content;
	}

	setIdAttribute(element, name) {
		element.setAttribute("id", name);
	}

	setTypeAttribute(element, filetype) {
		element.setAttribute("type", filetype);
	}

	appendToBody(element) {
		document.body.append(element);
	}

	setBackgroundColor(element, color) {
		element.style.color = color;
	}

	appendToParent(parent, child) {
		parent.appendChild(child);
	}

	styleSet(element, styleObject) {
		for (const key in styleObject) {
			element.style[key] = styleObject[key];
		}

	}

	insertAfter(newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	};

	flooring(arg) {
		return Math.floor(arg);
	}

	setInnerText(element, string) {
		element.innerText = string;
	}

	setWidth(element, amount) {
		element.style.width = `${amount}px`;
	}

	setProperty(x) {
		this.setInnerText(x, "");
		this.setWidth(x, 10);
		this.appendToParent(this.audioSliderBase, x);

	}

	creatingRequiredElements() {
		this.uploadSong = this.createElement('input');
		this.setTypeAttribute(this.uploadSong, 'file');
		this.setIdAttribute(this.uploadSong, "upload");
		this.appendToBody(this.uploadSong);

		this.audioSliderBase = this.createElement('div');
		this.setIdAttribute(this.audioSliderBase, 'audioSliderBased');

		this.minRangeOfAudioSlider = this.createElement('p');
		this.minRangeOfAudioSlider.setAttribute("id",'minimumRangeOfAudioSlider');
		this.setProperty(this.minRangeOfAudioSlider);

		this.maxRangeOfAudioSlider = this.createElement('p');
		this.setIdAttribute(this.maxRangeOfAudioSlider, 'maximumRangeOfAudioSlider');
		this.setProperty(this.maxRangeOfAudioSlider);

		this.minRangeAudioLabel = this.createElement('label');
		this.setIdAttribute(this.minRangeAudioLabel, "minimumRangeAudioLabel");
		this.appendToParent(this.audioSliderBase, this.minRangeAudioLabel);

		this.maxRangeAudioLabel = this.createElement('label');
		this.setIdAttribute(this.maxRangeAudioLabel, "maximumRangeAudioLabel");
		this.appendToParent(this.audioSliderBase, this.maxRangeAudioLabel);


		this.loweringOpacityInMin=document.createElement('div');
		this.loweringOpacityInMin.setAttribute("id","divForLoweringOpacityInMinArea");
		document.body.append(this.loweringOpacityInMin);


		this.loweringOpacityInMax=document.createElement('div');
		this.loweringOpacityInMax.setAttribute("id","divForLoweringOpacityInMaxArea");
		this.appendToParent(this.audioSliderBase, this.loweringOpacityInMax);

		this.trimmedAudio;

		

	}

	createElementAfterSubmitting(){


		this.currentTimePElement=this.createElement('p');
		this.setIdAttribute(this.currentTimePElement, 'currentTimePElement');
		this.setProperty(this.currentTimePElement);
		this.currentTimePElement.style.width='4px';

		
		this.currentTimeLabelElement = this.createElement('label');
		this.setIdAttribute(this.currentTimeLabelElement, "currentTimeLabelElement");
		this.appendToParent(this.audioSliderBase, this.currentTimeLabelElement);
	}



	removeElementById(removeArray) {
		removeArray.forEach((item) => {
			if (document.getElementById([item])) document.getElementById([item]).remove()
		});
	}

	attributeSet(element, attributeObj) {
		for (const key in attributeObj) {
			element.setAttribute([key], attributeObj[key]);
		}
	}

	reset(element,isResetLeft){
		isResetLeft?element.style.left="-9px":element.style.left="1800px";
	}
}
