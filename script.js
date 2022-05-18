function onClickOnAnyInput(event) {
    newAudioSlider.currentEventTargetElement = event.target;
    if (newAudioSlider.startTimeSeconds) {

        var idCheck = newAudioSlider.currentEventTargetElement.id;






        if (idCheck === "starttimeseconds" || idCheck === "starttimeminutes") {

            newAudioSlider.extractedCurrentStartValueSeconds = newAudioSlider.startTimeSeconds.value;

            newAudioSlider.extractedCurrentStartValueMinutes = newAudioSlider.startTimeMinutes.value;

            newAudioSlider.extractedCurrentEndValueSeconds = newAudioSlider.endTimeSeconds.value;

            newAudioSlider.extractedCurrentEndValueMinutes = newAudioSlider.endTimeMinutes.value;

            var diff = (parseInt(newAudioSlider.extractedCurrentEndValueMinutes) * 60 + parseInt(newAudioSlider.extractedCurrentEndValueSeconds)) - (parseInt(newAudioSlider.extractedCurrentStartValueMinutes * 60) + parseInt(newAudioSlider.extractedCurrentStartValueSeconds));

            if (diff > 1) {

                var expectedDiff = diff - 1;

                var valueToAddedIntoMinutes = parseInt(expectedDiff / 60);

                var valueToAddedIntoSeconds = parseInt(expectedDiff % 60);


                newAudioSlider.startValueThatIsExpectedUptoSeconds = parseInt(newAudioSlider.extractedCurrentStartValueSeconds) + valueToAddedIntoSeconds;

                newAudioSlider.startValueThatIsExpectedUptoMinutes = parseInt(newAudioSlider.extractedCurrentStartValueMinutes) + valueToAddedIntoMinutes;


            }


        }





        else if (idCheck === "endtimeseconds" || idCheck === "endtimeminutes") {

            newAudioSlider.extractedCurrentStartValueSeconds = newAudioSlider.startTimeSeconds.value;

            newAudioSlider.extractedCurrentStartValueMinutes = newAudioSlider.startTimeMinutes.value;

            newAudioSlider.extractedCurrentEndValueSeconds = newAudioSlider.endTimeSeconds.value;

            newAudioSlider.extractedCurrentEndValueMinutes = newAudioSlider.endTimeMinutes.value;

            var diff = (newAudioSlider.extractedCurrentEndValueMinutes * 60 + newAudioSlider.extractedCurrentEndValueSeconds) - (newAudioSlider.extractedCurrentStartValueMinutes * 60 + newAudioSlider.extractedCurrentStartValueSeconds);

            if (diff > 1) {

                var totalDuration = parseInt(newAudioSlider.extractedCurrentStartValueMinutes * 60) + parseInt(newAudioSlider.extractedCurrentStartValueSeconds);

                var expectedDurationForEnd = totalDuration + 1;

                newAudioSlider.endValueThatIsExpectedUptoSeconds = parseInt(expectedDurationForEnd % 60);

                newAudioSlider.endValueThatIsExpectedUptoMinutes = parseInt(expectedDurationForEnd / 60);

            }

        }



    }
}

class AudioSlider {
    constructor(initialMinCheckBoolean, initialMaxCheckBoolean) {
        this.minCheckBoolean = initialMinCheckBoolean;
        this.maxCheckBoolean = initialMaxCheckBoolean;
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

    setProperty(x){
        this.setInnerText(x, "");
        this.setWidth(x, 10);
        this.appendToParent(this.audioSliderBase, x);

    }

    creatingRequiredElements() {


        this.input = this.createElement('input');
        this.setTypeAttribute(this.input, 'file');
        this.setIdAttribute(this.input, "upload");
        this.appendToBody(this.input);

        this.audioSliderBase = this.createElement('div');
        this.setIdAttribute(this.audioSliderBase, 'audioSliderBased');

        this.minRangeOfAudioSlider = this.createElement('p');
        this.setIdAttribute(this.minRangeOfAudioSlider, 'minimumRangeOfAudioSlider');
        this.setProperty(this.minRangeOfAudioSlider);

        this.maxRangeOfAudioSlider = this.createElement('p');
        this.setIdAttribute(this.minRangeOfAudioSlider, 'maximumRangeOfAudioSlider');
        this.setProperty(this.maxRangeOfAudioSlider)


        this.minRangeAudioLabel = this.createElement('label');
        this.setIdAttribute(this.minRangeAudioLabel, "minimumRangeAudioLabel");
        this.appendToParent(this.audioSliderBase, this.minRangeAudioLabel);

        this.maxRangeAudioLabel = this.createElement('label');
        this.setIdAttribute(this.maxRangeAudioLabel, "maximumRangeAudioLabel");
        this.appendToParent(this.audioSliderBase, this.maxRangeAudioLabel);


    }

    removeElementById(removeArray) {
        console.log(removeArray);
        removeArray.forEach((item) => {if(document.getElementById([item]))document.getElementById([item]).remove()});
    }

    attributeSet(element,attributeObj){
        for (const key in attributeObj) {
            element.setAttribute([key],attributeObj[key]);
        }
    }

    



}

const newAudioSlider = new AudioSlider(1, false, false);
newAudioSlider.creatingRequiredElements();
newAudioSlider.input.addEventListener("change", function (event) {
    if (document.getElementById('originalAudio')) {
        newAudioSlider.removeElementById(['originalAudio', 'submit', 'starttimeminutes', 'starttimeseconds', 'endtimeminutes', 'endtimeseconds']);
        if (document.getElementById("trimmedAudioLabel")) {
            newAudioSlider.removeElementById(['trimmedAudiolabel', 'trimmedAudio', 'playTrimmedAudio', 'downloadTrimmedAudio', 'speed', 'speedlabel', 'volume', 'volumelabel']);
        }

    }

    newAudioSlider.originalAudio = newAudioSlider.createElement('audio');
    newAudioSlider.setIdAttribute(newAudioSlider.originalAudio, "originalAudio");
    newAudioSlider.insertAfter(newAudioSlider.originalAudio, newAudioSlider.input);
    newAudioSlider.originalAudio.setAttribute("src", URL.createObjectURL(event.target.files[0]));
    newAudioSlider.originalAudio.setAttribute("controls", true);
    newAudioSlider.originalAudio.style.display = "flex";
    newAudioSlider.originalAudio.load();





    newAudioSlider.originalAudio.onloadedmetadata = function () {




        newAudioSlider.startTimeSeconds = document.createElement('input');
        newAudioSlider.startTimeMinutes = document.createElement('input');
        newAudioSlider.endTimeSeconds = document.createElement('input');
        newAudioSlider.endTimeMinutes = document.createElement('input');


         

        [newAudioSlider.startTimeSeconds,newAudioSlider.startTimeMinutes, newAudioSlider.endTimeMinutes,newAudioSlider.endTimeSeconds].forEach((x)=>x.setAttribute('type','number'));



        newAudioSlider.startTimeSeconds.setAttribute("id", "starttimeseconds");
        newAudioSlider.startTimeMinutes.setAttribute("id", "starttimeminutes");
        newAudioSlider.endTimeSeconds.setAttribute("id", "endtimeseconds");
        newAudioSlider.endTimeMinutes.setAttribute("id", "endtimeminutes");



        newAudioSlider.startTimeSeconds.value = "0";
        newAudioSlider.startTimeMinutes.value = "0";
        newAudioSlider.endTimeSeconds.value = `${Math.floor(newAudioSlider.originalAudio.duration % 60)}`;
        newAudioSlider.endTimeMinutes.value = `${Math.floor(newAudioSlider.originalAudio.duration / 60)}`;

       elementsNeededToAppendToBody=[newAudioSlider.startTimeMinutes,newAudioSlider.startTimeSeconds,newAudioSlider.endTimeMinutes,newAudioSlider.endTimeSeconds];
       elementsNeededToAppendToBody.forEach((x)=>newAudioSlider.appendToBody(x));




        newAudioSlider.startTimeSeconds.addEventListener("change", () => {

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
            }
            else {
                newAudioSlider.startTimeSeconds.value = newAudioSlider.extractedCurrentStartValueSeconds;
                newAudioSlider.startTimeMinutes.value = newAudioSlider.extractedCurrentStartValueMinutes;
            }

        })






        newAudioSlider.startTimeMinutes.addEventListener("change", () => {

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
            }
            else {
                newAudioSlider.startTimeSeconds.value = newAudioSlider.extractedCurrentStartValueSeconds;
                newAudioSlider.startTimeMinutes.value = newAudioSlider.extractedCurrentStartValueMinutes;
            }

        })





        newAudioSlider.endTimeSeconds.addEventListener("change", () => {

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
            }
            else {
                newAudioSlider.endTimeSeconds.value = newAudioSlider.extractedCurrentEndValueSeconds;
                newAudioSlider.endTimeMinutes.value = newAudioSlider.extractedCurrentEndValueMinutes;
            }

        })



        newAudioSlider.endTimeMinutes.addEventListener("change", () => {

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
            }
            else {
                newAudioSlider.endTimeSeconds.value = newAudioSlider.extractedCurrentEndValueSeconds;
                newAudioSlider.endTimeMinutes.value = newAudioSlider.extractedCurrentEndValueMinutes;
            }

        })





        newAudioSlider.styleSet(newAudioSlider.audioSliderBase, { 'backgroundColor': 'rgb(51 51 51 / 63%)', 'position': 'absolute', 'marginTop': '4rem', 'height': '50px', 'width': '500px', 'left': '50px' });
        newAudioSlider.styleSet(newAudioSlider.minRangeOfAudioSlider, { backgroundColor: 'red', position: 'absolute', paddingTop: '25px', paddingBottom: '35px', left: '0px', top: '-21px' });
        newAudioSlider.styleSet(newAudioSlider.maxRangeOfAudioSlider, { backgroundColor: 'red', position: 'absolute', paddingTop: '25px', paddingBottom: '35px', left: '500px', top: '-21px' });
        newAudioSlider.styleSet(newAudioSlider.minRangeAudioLabel, { position: 'absolute', top: '-30px', left: '0px' });
        newAudioSlider.styleSet(newAudioSlider.maxRangeAudioLabel, { position: 'absolute', top: '-30px', left: '500px' });
        document.body.append(newAudioSlider.audioSliderBase);
        newAudioSlider.minRangeAudioLabel.innerText = "0:00";
        newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(originalAudio.duration / 60)}:${newAudioSlider.flooring(originalAudio.duration % 60)}`;
        newAudioSlider.minimumGap = 0.2 * (newAudioSlider.originalAudio.duration);

        console.log("newAudioSlider.originalAudio.src", newAudioSlider.originalAudio.src);

        fetch(newAudioSlider.originalAudio.src).then(function (response) {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Network response was not ok.');
        }).then(function (blob) {
            newAudioSlider.Blob = blob;
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error);
        });

        var submitButton = newAudioSlider.createElement('button');
        newAudioSlider.styleSet(submitButton,{position:'absolute',top:"225px",left:"280px"});
        submitButton.innerText = "Submit";
        submitButton.setAttribute("id", 'submit');
        document.body.append(submitButton);




        document.getElementById('submit').addEventListener('click', function (e) {
            if (document.getElementById('trimmedAudio')) {
                newAudioSlider.removeElementById(['trimmedAudioLabel', 'trimmedAudio', 'playTrimmedAudio', 'downloadTrimmedAudio', 'speed', 'speedlabel', 'volume', 'volumelabel']);
            }

            newAudioSlider.playBackSpeedRateLabel = document.createElement('label');
            newAudioSlider.playBackSpeedRateLabel.innerText = "speed";
            newAudioSlider.playBackSpeedRateLabel.setAttribute("id", "speedlabel");
            document.body.append(newAudioSlider.playBackSpeedRateLabel);

            newAudioSlider.playBackSpeedRate = document.createElement('input');
            newAudioSlider.attributeSet(newAudioSlider.playBackSpeedRate,{type:'range',min:'0.25',max:'2',step:'0.25',id:'speed'});

            document.body.append(newAudioSlider.playBackSpeedRate);
            newAudioSlider.playBackSpeedRate.value = '1';



            newAudioSlider.playBackSpeedRate.addEventListener('change', function (event) {
                document.getElementById('trimmedAudio').playbackRate = newAudioSlider.playBackSpeedRate.value;
            })



            newAudioSlider.musicVolumeLabel = document.createElement('label');
            newAudioSlider.musicVolumeLabel.innerText = "volume control";
            newAudioSlider.musicVolumeLabel.setAttribute("id", "volumelabel");
            document.body.append(newAudioSlider.musicVolumeLabel);

            newAudioSlider.musicVolume = document.createElement('input');
            newAudioSlider.attributeSet(newAudioSlider.musicVolume,{type:'range',min:'0',max:'1',step:'0.1',id:'volume',value:'1'});

            document.body.append(newAudioSlider.musicVolume);



            newAudioSlider.musicVolume.addEventListener('change', function (event) {
                document.getElementById('trimmedAudio').volume = newAudioSlider.musicVolume.value;
            })


            var minArray = document.getElementById('minimumRangeAudioLabel').innerText.split(":")
            var maxArray = document.getElementById('maximumRangeAudioLabel').innerText.split(":")

            var startValue = ((parseInt(minArray[0]) * 60) + parseInt(minArray[1]));
            var endValue = ((parseInt(maxArray[0]) * 60) + parseInt(maxArray[1]));
            if (startValue > endValue) {
                window.alert("Start value must be less than end value");
            }
            else if (startValue === endValue) {
                window.alert("both can't be in same time");
            }
            else {
                var wholeDuration = newAudioSlider.originalAudio.duration;


                var trimmedAudioBlob;

                console.log((startValue * newAudioSlider.Blob.size) / wholeDuration, startValue, newAudioSlider.Blob.size, wholeDuration);

                const startTime = ((startValue * newAudioSlider.Blob.size) / wholeDuration);
                const endTime = ((endValue * newAudioSlider.Blob.size) / wholeDuration) + ((1 * newAudioSlider.Blob.size) / wholeDuration);


                trimmedAudioBlob = newAudioSlider.Blob.slice(startTime, endTime, newAudioSlider.Blob.type);

                var trimmedAudio = new Audio();
                trimmedAudio.setAttribute("id", 'trimmedAudio');
                trimmedAudio.src = window.URL.createObjectURL(trimmedAudioBlob);
                console.log(window.URL.createObjectURL(trimmedAudioBlob));
                trimmedAudio.controls = true;
                newAudioSlider.styleSet(trimmedAudio,{position : "absolute",top : "300px",left : "180px"});
                trimmedAudio.loop = 'true';
                newAudioSlider.appendToBody(trimmedAudio);
                

                var trimmedAudioLabel = document.createElement('label');
                newAudioSlider.setIdAttribute(trimmedAudioLabel,'trimmedAudioLabel');
                trimmedAudioLabel.innerHTML = "new audio";
                newAudioSlider.styleSet(trimmedAudioLabel,{position : "absolute",top : "250px",left : "280px"});
                newAudioSlider.appendToBody(trimmedAudioLabel);


                var playTrimmedAudio = newAudioSlider.createButton();

                newAudioSlider.setIdAttribute(playTrimmedAudio,'playTrimmedAudio');
                playTrimmedAudio.innerHTML = "Play Trimmed Audio &#9658";
                newAudioSlider.styleSet(playTrimmedAudio,{position : "absolute",top : "400px",left : "100px"});
                document.body.append(playTrimmedAudio);


                playTrimmedAudio.addEventListener('click', function () {
                    if (!newAudioSlider.playPauseCount) {
                        playTrimmedAudio.innerHTML = "Pause Trimmed Audio &#9208";

                        trimmedAudio.play();
                        newAudioSlider.playPauseCount = 1;
                    }
                    else {
                        playTrimmedAudio.innerHTML = "Play Trimmed Audio &#9658";
                        trimmedAudio.pause();
                        newAudioSlider.playPauseCount = 0;
                    }
                })


                var downloadAudio = newAudioSlider.createButton();
                downloadAudio.innerHTML = "Download Trimmed Audio &#8681";
                downloadAudio.setAttribute('id', 'downloadTrimmedAudio');

                newAudioSlider.styleSet(downloadAudio,{position : "absolute",top:"400px",left:"400px"});
                newAudioSlider.appendToBody(downloadAudio);

                downloadAudio.addEventListener('click', function () {
                    const a = Object.assign(document.createElement('a'), { href: document.getElementById('trimmedAudio').src, download: "newAudio.mp3" });

                    document.body.appendChild(a);
                    a.click();
                    a.remove();

                })
            }
        }
        )
    }
}
)

newAudioSlider.audioSliderBase.addEventListener('click', function (event) {


    var left = parseInt(getComputedStyle(newAudioSlider.minRangeOfAudioSlider).left);
    var right = parseInt(getComputedStyle(newAudioSlider.maxRangeOfAudioSlider).left);
    var mid = event.clientX - 50;
    var midTrue = (mid > left) && (mid < right);


    if ((event.clientX - 50) < left && !midTrue) {
        goLeft(mid);
    }
    else if ((event.clientX - 50) > right && !midTrue) {
        goRight(mid);
    }


});


function goLeft(dest) {
    var current = parseInt(getComputedStyle(newAudioSlider.minRangeOfAudioSlider).left);
    var destination = dest;
    setTimeout(function () {
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
    setTimeout(function () {
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








newAudioSlider.minRangeOfAudioSlider.addEventListener('mousedown', function (e) {


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
    }


    else if (event.clientX < newAudioSlider.currentEventClientX && event.clientX - 50 >= 0) {



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
}
)







newAudioSlider.maxRangeOfAudioSlider.addEventListener('mousedown', function (e) {


    e.stopPropagation();

    newAudioSlider.currentEventClientX = e.clientX;
    newAudioSlider.currentMinLeft = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left);
    newAudioSlider.currentMaxLeft = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left);


    window.addEventListener('mousemove', mousemoveMax, true);


}
)



function mousemoveMax(event) {


    if (event.clientX < newAudioSlider.currentEventClientX && (event.clientX - 50 - newAudioSlider.currentMinLeft) >= newAudioSlider.minimumGap) {

        newAudioSlider.maxRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
        newAudioSlider.maxRangeAudioLabel.style.left = `${event.clientX - 50}px`;
        var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
        var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
        newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
        document.getElementById('endtimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
        document.getElementById('endtimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
    }

    else if (event.clientX > newAudioSlider.currentEventClientX && event.clientX - 50 <= 500) {

        newAudioSlider.maxRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
        newAudioSlider.maxRangeAudioLabel.style.left = `${event.clientX - 50}px`;
        var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
        var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
        newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
        document.getElementById('endtimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
        document.getElementById('endtimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
    }

    else if (event.clientX - 50 > 500) {
        newAudioSlider.maxRangeOfAudioSlider.style.left = `${500}px`;
        newAudioSlider.maxRangeAudioLabel.style.left = `${500}px`;
        newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(newAudioSlider.originalAudio.duration / 60)}:${newAudioSlider.flooring(newAudioSlider.originalAudio.duration % 60)}`;
        document.getElementById('endtimeminutes').value = newAudioSlider.flooring(newAudioSlider.originalAudio.duration / 60);
        document.getElementById('endtimeseconds').value = newAudioSlider.flooring(newAudioSlider.originalAudio.duration % 60);
    }



}


window.addEventListener('mouseup', () => {

    window.removeEventListener("mousemove", mousemoveMax, true);
}

)






newAudioSlider.audioSliderBase.addEventListener('mousedown', function (e) {

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
}
)


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

    }

    else if (event.clientX > newAudioSlider.currentEventClientX && (newAudioSlider.currentMaxLeft + (-newAudioSlider.currentEventClientX + event.clientX) <= 500)) {

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

}
)
