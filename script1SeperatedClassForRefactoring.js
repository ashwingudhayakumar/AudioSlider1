class AudioSlider {
	constructor() {
		this.diff;

		this.originalAudio;
		this.minimumGap;
		this.playPauseCount;

		this.startTimeSeconds;
		this.startTimeMinutes;

		this.endTimeSeconds;
		this.endTimeMinutes;

		this.extractedCurrentStartValueSeconds;
		this.extractedCurrentStartValueMinutes;

		this.extractedCurrentEndValueSeconds;
		this.extractedCurrentEndValueMinutes;

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
		this.setProperty(this.maxRangeOfAudioSlider)

		this.minRangeAudioLabel = this.createElement('label');
		this.setIdAttribute(this.minRangeAudioLabel, "minimumRangeAudioLabel");
		this.appendToParent(this.audioSliderBase, this.minRangeAudioLabel);

		this.maxRangeAudioLabel = this.createElement('label');
		this.setIdAttribute(this.maxRangeAudioLabel, "maximumRangeAudioLabel");
		this.appendToParent(this.audioSliderBase, this.maxRangeAudioLabel);

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
		isResetLeft?element.style.left="0px":element.style.left="500px";
	}
}