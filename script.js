function onClickOnAnyInput(event) {
    newAudioSlider.currentEventTargetElement = event.target;
    if (newAudioSlider.startTimeSeconds) {

        var idCheck = newAudioSlider.currentEventTargetElement.id;

        // if(idCheck==="starttime"){

        //     var endTimeArray=newAudioSlider.endTime.value.split(":");

        //     var startTimeArray=newAudioSlider.startTime.value.split(":");

        //     newAudioSlider.extractedCurrentStartValue=newAudioSlider.startTime.value;

        //     newAudioSlider.extractedCurrentEndValue=newAudioSlider.endTime.value;

        //     var diff=((parseInt(endTimeArray[0])*3600)+(parseInt(endTimeArray[1])*60)+(parseInt(endTimeArray[2])))-((parseInt(startTimeArray[0])*3600)+(parseInt(startTimeArray[1])*60)+(parseInt(startTimeArray[2])));

        //     if(diff>1){

        //         var expectedDiff=diff-1;

        //         var valueToAddedIntoHour=parseInt(expectedDiff/3600);

        //         var valueToAddedIntoMinute=parseInt(expectedDiff/60);

        //         var valueToAddedIntoSeconds=parseInt(expectedDiff%60);

        //         newAudioSlider.startValueThatIsExpectedUpto=`${(parseInt(startTimeArray[0])+valueToAddedIntoHour).toString().padStart(2,'0')}:${(parseInt(startTimeArray[1])+valueToAddedIntoMinute).toString().padStart(2,'0')}:${(parseInt(startTimeArray[2])+valueToAddedIntoSeconds).toString().padStart(2,'0')}`;

        //         console.log(newAudioSlider.startValueThatIsExpectedUpto,newAudioSlider.extractedCurrentStartValue,newAudioSlider.extractedCurrentEndValue);

        //     }




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


        // else if(idCheck==="endtime"){

        //     var endTimeArray=newAudioSlider.endTime.value.split(":");

        //     var startTimeArray=newAudioSlider.startTime.value.split(":");

        //     newAudioSlider.extractedCurrentStartValue=newAudioSlider.startTime.value;

        //     newAudioSlider.extractedCurrentEndValue=newAudioSlider.endTime.value;

        //     var diff=((parseInt(endTimeArray[0])*3600)+(parseInt(endTimeArray[1])*60)+(parseInt(endTimeArray[2])))-((parseInt(startTimeArray[0])*3600)+(parseInt(startTimeArray[1])*60)+(parseInt(startTimeArray[2])));

        //     if(diff>1){

        //         var expectedDiff=diff-1;

        //         var totalDuration=parseInt(startTimeArray[0])*3600+parseInt(startTimeArray[1]*60)+parseInt(startTimeArray[2]%60);

        //         var expectedDuration=totalDuration+1;

        //         newAudioSlider.endValueThatIsExpectedUpto=`${parseInt(expectedDuration/3600).toString().padStart(2,'0')}:${parseInt(expectedDuration/60).toString().padStart(2,'0')}:${parseInt(expectedDuration%60).toString().padStart(2,'0')}`;

        //         console.log(newAudioSlider.endValueThatIsExpectedUpto,newAudioSlider.extractedCurrentStartValue,newAudioSlider.extractedCurrentEndValue);


        //     }

        // }



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


        // this.startTime;

        this.startTimeSeconds;
        this.startTimeMinutes;

        // this.endTime;

        this.endTimeSeconds;
        this.endTimeMinutes;

        //this.extractedCurrentStartValue;

        this.extractedCurrentStartValueSeconds;
        this.extractedCurrentStartValueMinutes;

        //this.extractedCurrentEndValue;

        this.extractedCurrentEndValueSeconds;
        this.extractedCurrentEndValueMinutes;

        //this.startValueThatIsExpectedUpto;
        this.startValueThatIsExpectedUptoSeconds;
        this.startValueThatIsExpectedUptoMinutes;

        //this.endValueThatIsExpectedUpto;
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

    audioBaseSliderAttributeSet(element, backgroundColor, position, marginTop, height, width, left) {
        element.style.backgroundColor = backgroundColor;
        element.style.position = position;
        element.style.marginTop = marginTop;
        element.style.height = height;
        element.style.width = width;
        element.style.left = left;
    }

    audioRangeSliderAttributeSet(element, backgroundColor, position, paddingTop, paddingBottom, left, top) {
        element.style.backgroundColor = backgroundColor;
        element.style.position = position;
        element.style.paddingTop = paddingTop;
        element.style.paddingBottom = paddingBottom;
        element.style.left = left;
        element.style.top = top;

    }

    labelSet(element, position, top, left) {
        element.style.position = position;
        element.style.top = top;
        element.style.left = left;
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

    creatingRequiredElements() {


        this.input = this.createElement('input');
        this.setTypeAttribute(this.input, 'file');
        this.setIdAttribute(this.input, "upload");
        this.appendToBody(this.input);

        this.audioSliderBase = this.createElement('div');
        this.setIdAttribute(this.audioSliderBase, 'audioSliderBased');

        this.minRangeOfAudioSlider = this.createElement('p');
        this.setInnerText(this.minRangeOfAudioSlider, "");
        this.setWidth(this.minRangeOfAudioSlider, 10);
        this.setIdAttribute(this.minRangeOfAudioSlider, 'minimumRangeOfAudioSlider');
        this.appendToParent(this.audioSliderBase, this.minRangeOfAudioSlider);

        this.maxRangeOfAudioSlider = this.createElement('p');
        this.setInnerText(this.maxRangeOfAudioSlider, "");
        this.setWidth(this.maxRangeOfAudioSlider, 10);
        this.setIdAttribute(this.maxRangeOfAudioSlider, 'maximumRangeOfAudioSlider');
        this.appendToParent(this.audioSliderBase, this.maxRangeOfAudioSlider);

        this.minRangeAudioLabel = this.createElement('label');
        this.setIdAttribute(this.minRangeAudioLabel, "minimumRangeAudioLabel");
        this.appendToParent(this.audioSliderBase, this.minRangeAudioLabel);

        this.maxRangeAudioLabel = this.createElement('label');
        this.setIdAttribute(this.maxRangeAudioLabel, "maximumRangeAudioLabel");
        this.appendToParent(this.audioSliderBase, this.maxRangeAudioLabel);


    }



}

const newAudioSlider = new AudioSlider(1, false, false);
newAudioSlider.creatingRequiredElements();
newAudioSlider.input.addEventListener("change", function (event) {
    if (document.getElementById('originalAudio')) {
        document.getElementById('originalAudio').remove();
        document.getElementById('submit').remove();
        document.getElementById('starttimeminutes').remove();
        document.getElementById('starttimeseconds').remove();
        document.getElementById('endtimeminutes').remove();
        document.getElementById('endtimeseconds').remove();
        if (document.getElementById("trimmedAudiolabel")) {
            document.getElementById('trimmedAudiolabel').remove();
            document.getElementById('trimmedAudio').remove();
            document.getElementById('playTrimmedAudio').remove();
            document.getElementById('downloadTrimmedAudio').remove();
            document.getElementById('speed').remove();
            document.getElementById('speedlabel').remove();
            document.getElementById('volume').remove();
            document.getElementById('volumelabel').remove();

        }

    }
    
    newAudioSlider.originalAudio = newAudioSlider.createElement('audio');
    newAudioSlider.setIdAttribute(newAudioSlider.originalAudio, "originalAudio");
    newAudioSlider.insertAfter(newAudioSlider.originalAudio, newAudioSlider.input);
    newAudioSlider.originalAudio.setAttribute("src", URL.createObjectURL(event.target.files[0]));
    newAudioSlider.originalAudio.setAttribute("controls", true);
    newAudioSlider.originalAudio.style.display = "flex";
    newAudioSlider.originalAudio.load();
    //newAudioSlider.originalAudio.defaultPlaybackRate=2;
    



    newAudioSlider.originalAudio.onloadedmetadata = function () {


        // newAudioSlider.startTime=document.createElement('input');
        // newAudioSlider.endTime=document.createElement('input');

        newAudioSlider.startTimeSeconds = document.createElement('input');
        newAudioSlider.startTimeMinutes = document.createElement('input');
        newAudioSlider.endTimeSeconds = document.createElement('input');
        newAudioSlider.endTimeMinutes = document.createElement('input');

        // newAudioSlider.startTime.setAttribute("type","time");
        // newAudioSlider.endTime.setAttribute("type","time");

        newAudioSlider.startTimeSeconds.setAttribute("type", "number");
        newAudioSlider.startTimeMinutes.setAttribute("type", "number");
        newAudioSlider.endTimeMinutes.setAttribute("type", "number");
        newAudioSlider.endTimeSeconds.setAttribute("type", "number");

        // newAudioSlider.startTime.setAttribute("step","1");
        // newAudioSlider.endTime.setAttribute("step","1");

        newAudioSlider.startTimeSeconds.setAttribute("id", "starttimeseconds");
        newAudioSlider.startTimeMinutes.setAttribute("id", "starttimeminutes");
        newAudioSlider.endTimeSeconds.setAttribute("id", "endtimeseconds");
        newAudioSlider.endTimeMinutes.setAttribute("id", "endtimeminutes");

        // newAudioSlider.startTime.setAttribute('min',"00:00:00");
        // newAudioSlider.startTime.setAttribute('max',"23:59:58");
        // newAudioSlider.endTime.setAttribute('min',"00:00:01");
        // newAudioSlider.endTime.setAttribute('max',"23:59:59");

        // newAudioSlider.startTime.value="00:00:00";
        // newAudioSlider.endTime.value=`${Math.floor(newAudioSlider.originalAudio.duration/3600).toString().padStart(2, '0')}:${Math.floor(newAudioSlider.originalAudio.duration/60).toString().padStart(2, '0')}:${Math.floor(newAudioSlider.originalAudio.duration%60).toString().padStart(2, '0')}`;

        newAudioSlider.startTimeSeconds.value = "0";
        newAudioSlider.startTimeMinutes.value = "0";
        newAudioSlider.endTimeSeconds.value = `${Math.floor(newAudioSlider.originalAudio.duration % 60)}`;
        newAudioSlider.endTimeMinutes.value = `${Math.floor(newAudioSlider.originalAudio.duration / 60)}`;



        // document.body.append(newAudioSlider.startTime);
        // document.body.append(newAudioSlider.endTime);

        document.body.append(newAudioSlider.startTimeMinutes);
        document.body.append(newAudioSlider.startTimeSeconds);
        document.body.append(newAudioSlider.endTimeMinutes);
        document.body.append(newAudioSlider.endTimeSeconds);





        // newAudioSlider.startTime.addEventListener("change",()=>{

        //     var startTimeArray=newAudioSlider.startTime.value.split(":");
        //     var startTimeExpectedUpto=newAudioSlider.startValueThatIsExpectedUpto.split(":");

        //     var startTimeArrayWholeValue=(parseInt(startTimeArray[0])*3600)+(parseInt(startTimeArray[1])*60)+(parseInt(startTimeArray[2]));
        //     var startTimeExpectedWholeValue=(parseInt(startTimeExpectedUpto[0])*3600)+(parseInt(startTimeExpectedUpto[1])*60)+(parseInt(startTimeExpectedUpto[2]));


        //     if(startTimeArrayWholeValue<=startTimeExpectedWholeValue){
        //         newAudioSlider.extractedCurrentStartValue=newAudioSlider.startTime.value;
        //         newAudioSlider.minRangeOfAudioSlider.style.left=(startTimeArrayWholeValue/(newAudioSlider.originalAudio.duration))*500+'px';
        //         newAudioSlider.minRangeAudioLabel.style.left=(startTimeArrayWholeValue/(newAudioSlider.originalAudio.duration))*500+'px';
        //         var percentage = (startTimeArrayWholeValue/(newAudioSlider.originalAudio.duration));
        //         var currAudioDuration = Math.ceil(percentage * (newAudioSlider.originalAudio.duration));
        //         newAudioSlider.minRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
        //     }
        //     else{
        //         newAudioSlider.startTime.value=newAudioSlider.extractedCurrentStartValue;
        //     }

        //     })



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


        //     newAudioSlider.endTime.addEventListener("change",()=>{

        //    var endTimeArray=newAudioSlider.endTime.value.split(":");
        //    var endTimeExpectedUpto=newAudioSlider.endValueThatIsExpectedUpto.split(":");

        //    var endTimeArrayWholeValue=(parseInt(endTimeArray[0])*3600)+(parseInt(endTimeArray[1])*60)+(parseInt(endTimeArray[2]));
        //    var endTimeExpectedWholeValue=(parseInt(endTimeExpectedUpto[0])*3600)+(parseInt(endTimeExpectedUpto[1])*60)+(parseInt(endTimeExpectedUpto[2]));


        //    if(endTimeArrayWholeValue>=endTimeExpectedWholeValue && endTimeArrayWholeValue<=newAudioSlider.originalAudio.duration){
        //        newAudioSlider.extractedCurrentEndValue=newAudioSlider.endTime.value;
        //        newAudioSlider.maxRangeOfAudioSlider.style.left=(endTimeArrayWholeValue/(newAudioSlider.originalAudio.duration))*500+'px';
        //         newAudioSlider.maxRangeAudioLabel.style.left=(endTimeArrayWholeValue/(newAudioSlider.originalAudio.duration))*500+'px';
        //         var percentage = (endTimeArrayWholeValue/(newAudioSlider.originalAudio.duration));
        //         var currAudioDuration = Math.ceil(percentage * (newAudioSlider.originalAudio.duration));
        //         newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
        //    }
        //    else{
        //        newAudioSlider.endTime.value=newAudioSlider.extractedCurrentEndValue;
        //    }

        //    })


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





        newAudioSlider.audioBaseSliderAttributeSet(newAudioSlider.audioSliderBase, "rgb(51 51 51 / 63%)", 'absolute', '4rem', '50px', '500px', '50px');
        newAudioSlider.audioRangeSliderAttributeSet(newAudioSlider.minRangeOfAudioSlider, 'red', 'absolute', '25px', '35px', '0px', '-21px');
        newAudioSlider.audioRangeSliderAttributeSet(newAudioSlider.maxRangeOfAudioSlider, 'red', 'absolute', '25px', '35px', '500px', '-21px');
        newAudioSlider.labelSet(newAudioSlider.minRangeAudioLabel, 'absolute', '-30px', '0px');
        newAudioSlider.labelSet(newAudioSlider.maxRangeAudioLabel, 'absolute', '-30px', '500px');
        document.body.append(newAudioSlider.audioSliderBase);
        newAudioSlider.minRangeAudioLabel.innerText = "0:00";
        newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(originalAudio.duration / 60)}:${newAudioSlider.flooring(originalAudio.duration % 60)}`;
        newAudioSlider.minimumGap = 0.2 * (newAudioSlider.originalAudio.duration);

        console.log("newAudioSlider.originalAudio.src",newAudioSlider.originalAudio.src);

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
        submitButton.style.position = "absolute";
        submitButton.style.top = "225px";
        submitButton.style.left = "280px";
        submitButton.innerText = "Submit";
        submitButton.setAttribute("id", 'submit');
        document.body.append(submitButton);




        document.getElementById('submit').addEventListener('click', function (e) {
            if (document.getElementById('trimmedAudio')) {
                document.getElementById('trimmedAudio').remove();
                document.getElementById('trimmedAudiolabel').remove();
                document.getElementById('playTrimmedAudio').remove();
                document.getElementById('downloadTrimmedAudio').remove();
                document.getElementById('speed').remove();
                document.getElementById('speedlabel').remove();
                document.getElementById('volume').remove();
                document.getElementById('volumelabel').remove();


            }

            newAudioSlider.playBackSpeedRateLabel=document.createElement('label');
            newAudioSlider.playBackSpeedRateLabel.innerText="speed";
            newAudioSlider.playBackSpeedRateLabel.setAttribute("id","speedlabel");
            document.body.append(newAudioSlider.playBackSpeedRateLabel);

            newAudioSlider.playBackSpeedRate=document.createElement('input');
            newAudioSlider.playBackSpeedRate.setAttribute('type','range');
            newAudioSlider.playBackSpeedRate.setAttribute('min','0.25');
            newAudioSlider.playBackSpeedRate.setAttribute('max','2');
            newAudioSlider.playBackSpeedRate.setAttribute('step','0.25');
            newAudioSlider.playBackSpeedRate.setAttribute('id','speed');
            document.body.append(newAudioSlider.playBackSpeedRate);
            newAudioSlider.playBackSpeedRate.value='1';
            


            newAudioSlider.playBackSpeedRate.addEventListener('change',function(event){
                document.getElementById('trimmedAudio').playbackRate=newAudioSlider.playBackSpeedRate.value;
            })



            newAudioSlider.musicVolumeLabel=document.createElement('label');
            newAudioSlider.musicVolumeLabel.innerText="volume control";
            newAudioSlider.musicVolumeLabel.setAttribute("id","volumelabel");
            document.body.append(newAudioSlider.musicVolumeLabel);

            newAudioSlider.musicVolume=document.createElement('input');
            newAudioSlider.musicVolume.setAttribute('type','range');
            newAudioSlider.musicVolume.setAttribute('min','0');
            newAudioSlider.musicVolume.setAttribute('max','1');
            newAudioSlider.musicVolume.setAttribute('step','0.1');
            newAudioSlider.musicVolume.setAttribute('id','volume');
            newAudioSlider.musicVolume.setAttribute('value','1');
            document.body.append(newAudioSlider.musicVolume);
            


            newAudioSlider.musicVolume.addEventListener('change',function(event){
                document.getElementById('trimmedAudio').volume=newAudioSlider.musicVolume.value;
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
                // wholeDuration = Math.floor(wholeDuration);

                var trimmedAudioBlob;
                // if (startValue === 0) {
                //     startValue = 1;
                //     endValue += 1;
                //     trimmedAudioBlob = newAudioSlider.Blob.slice(Math.floor((startValue * newAudioSlider.Blob.size) / wholeDuration), Math.floor((endValue * newAudioSlider.Blob.size) / wholeDuration), newAudioSlider.Blob.type);
                // }
                // else {
                //     if (startValue === 1) {
                //         startValue = 1;
                //         endValue += 1;
                //     }
                //     if (startValue > 1) {
                //         startValue -= 1;
                //         endValue += 1;
                //     }


                //     trimmedAudioBlob = newAudioSlider.Blob.slice(Math.floor((startValue * newAudioSlider.Blob.size) / wholeDuration), Math.floor((endValue * newAudioSlider.Blob.size) / wholeDuration), newAudioSlider.Blob.type);
                // }
                console.log((startValue * newAudioSlider.Blob.size) / wholeDuration, startValue, newAudioSlider.Blob.size, wholeDuration);

                const startTime = ((startValue * newAudioSlider.Blob.size) / wholeDuration);
                const endTime = ((endValue * newAudioSlider.Blob.size) / wholeDuration) + ((1 * newAudioSlider.Blob.size) / wholeDuration);
                

                trimmedAudioBlob = newAudioSlider.Blob.slice(startTime, endTime, newAudioSlider.Blob.type);

                var trimmedAudio = new Audio();
                trimmedAudio.setAttribute("id", 'trimmedAudio');
                trimmedAudio.src = window.URL.createObjectURL(trimmedAudioBlob);
                console.log(window.URL.createObjectURL(trimmedAudioBlob));
                trimmedAudio.controls = true;
                trimmedAudio.style.position = "absolute";
                trimmedAudio.style.top = "300px";
                trimmedAudio.style.left = "180px";
                document.body.append(trimmedAudio);

                var trimmedAudioLabel = document.createElement('label');
                trimmedAudioLabel.setAttribute("id", 'trimmedAudiolabel');
                trimmedAudioLabel.innerHTML = "new audio";
                trimmedAudioLabel.style.position = "absolute";
                trimmedAudioLabel.style.top = "250px";
                trimmedAudioLabel.style.left = "280px";
                document.body.append(trimmedAudioLabel);


                var playTrimmedAudio = newAudioSlider.createButton();

                playTrimmedAudio.setAttribute('id', 'playTrimmedAudio');
                playTrimmedAudio.innerHTML = "Play Trimmed Audio &#9658";
                playTrimmedAudio.style.position = "absolute";
                playTrimmedAudio.style.top = "400px";
                playTrimmedAudio.style.left = "100px";
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
                downloadAudio.style.position = "absolute";
                downloadAudio.style.top = "400px";
                downloadAudio.style.left = "400px";
                document.body.append(downloadAudio);

                downloadAudio.addEventListener('click', function () {
                    console.log(document.getElementById('speed').value);
                    function audioBufferToWav (buffer, opt) {
                        opt = opt || {}
                      
                        var numChannels = buffer.numberOfChannels
                        var sampleRate = buffer.sampleRate
                        var format = opt.float32 ? 3 : 1
                        var bitDepth = format === 3 ? 32 : 16
                      
                        var result
                        if (numChannels === 2) {
                          result = interleave(buffer.getChannelData(0), buffer.getChannelData(1))
                        } else {
                          result = buffer.getChannelData(0)
                        }
                      
                        return encodeWAV(result, format, sampleRate, numChannels, bitDepth)
                      }
                      
                      function encodeWAV (samples, format, sampleRate, numChannels, bitDepth) {
                        var bytesPerSample = bitDepth / 8
                        var blockAlign = numChannels * bytesPerSample
                      
                        var buffer = new ArrayBuffer(44 + samples.length * bytesPerSample)
                        var view = new DataView(buffer)
                      
                        /* RIFF identifier */
                        writeString(view, 0, 'RIFF')
                        /* RIFF chunk length */
                        view.setUint32(4, 36 + samples.length * bytesPerSample, true)
                        /* RIFF type */
                        writeString(view, 8, 'WAVE')
                        /* format chunk identifier */
                        writeString(view, 12, 'fmt ')
                        /* format chunk length */
                        view.setUint32(16, 16, true)
                        /* sample format (raw) */
                        view.setUint16(20, format, true)
                        /* channel count */
                        view.setUint16(22, numChannels, true)
                        /* sample rate */
                        view.setUint32(24, sampleRate, true)
                        /* byte rate (sample rate * block align) */
                        view.setUint32(28, sampleRate * blockAlign, true)
                        /* block align (channel count * bytes per sample) */
                        view.setUint16(32, blockAlign, true)
                        /* bits per sample */
                        view.setUint16(34, bitDepth, true)
                        /* data chunk identifier */
                        writeString(view, 36, 'data')
                        /* data chunk length */
                        view.setUint32(40, samples.length * bytesPerSample, true)
                        if (format === 1) { // Raw PCM
                          floatTo16BitPCM(view, 44, samples)
                        } else {
                          writeFloat32(view, 44, samples)
                        }
                      
                        return buffer
                      }
                      
                      function interleave (inputL, inputR) {
                        var length = inputL.length + inputR.length
                        var result = new Float32Array(length)
                      
                        var index = 0
                        var inputIndex = 0
                      
                        while (index < length) {
                          result[index++] = inputL[inputIndex]
                          result[index++] = inputR[inputIndex]
                          inputIndex++
                        }
                        return result
                      }
                      
                      function writeFloat32 (output, offset, input) {
                        for (var i = 0; i < input.length; i++, offset += 4) {
                          output.setFloat32(offset, input[i], true)
                        }
                      }
                      
                      function floatTo16BitPCM (output, offset, input) {
                        for (var i = 0; i < input.length; i++, offset += 2) {
                          var s = Math.max(-1, Math.min(1, input[i]))
                          output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
                        }
                      }
                      
                      function writeString (view, offset, string) {
                        for (var i = 0; i < string.length; i++) {
                          view.setUint8(offset + i, string.charCodeAt(i))
                        }
                      }
                    



                      

                    
                       var audioCtx=new AudioContext();
                    //   var    source = audioCtx.createBufferSource();
                    //   function getData() {
                          
                    //       request = new XMLHttpRequest();
                        
                    //       request.open('GET', './BlindingLights.mp3', true);
                        
                    //       request.responseType = 'arraybuffer';
                        
                    //       request.onload = function() {
                    //         var audioData = request.response;
                        
                    //         audioCtx.decodeAudioData(audioData, function(buffer) {
                    //             myBuffer = buffer;
                    //             source.buffer = myBuffer;
                    //             source.playbackRate.value = document.getElementById('speed').value;
                    //             source.connect(audioCtx.destination);
                    //             source.loop = true;
                    //           },
                        
                    //           function(e){"Error with decoding audio data" + e.err});
                        
                    //       }
                        
                    //       request.send();
                    //     }
                        
                      
                        
                    //       getData();
                        
                       
                        
                    



                    
                    let audio;
                    
                    
                     async function playBack(){
                    
                       await fetch(document.getElementById('trimmedAudio').src)
                    .then(data=>data.arrayBuffer())
                    .then(arrayBuffer=>audioCtx.decodeAudioData(arrayBuffer))
                    .then(decodedAudio=>audio=decodedAudio);
                        const playSound=audioCtx.createBufferSource();
                        playSound.buffer=audio;
                        // playSound.playbackRate.value=document.getElementById('speed').value;
                        // console.log("playSound.playbackRate.value",playSound.playbackRate.value);
                        // var sourceAudio=document.getElementById('sourceAudio');

                        const gainNode=audioCtx.createGain();
                        gainNode.gain.value=0.1;
                        playSound.connect(gainNode);
                        playSound.playbackRate.value=1.75;
                        gainNode.connect(audioCtx.destination);
                        playSound.start();

                        var wav=audioBufferToWav(playSound.buffer);
                    
                    
                        var anchor = document.createElement('a')
                        document.body.appendChild(anchor)
                        anchor.style = 'display: none'
                        var blob = new window.Blob([ new DataView(wav) ], {
                            type: 'audio/wav'
                          })
                          var newaudio=document.createElement('audio');
                          newaudio.setAttribute('controls','true');
                          newaudio.src=window.URL.createObjectURL(blob);
                          document.body.append(newaudio)
                      
                          var url = window.URL.createObjectURL(blob)
                          anchor.href = url
                          anchor.download = 'newaudio.wav'
                          anchor.click()
                          window.URL.revokeObjectURL(url)
                     
                    
                        console.log(wav);
                        //playSound.connect(ctx.destination);
                        //playSound.start();
                    }
                    
                    playBack()
                    // const a = Object.assign(document.createElement('a'), { href: document.getElementById('trimmedAudio').src, download: "newAudio.mp3" });
                    
                    // document.body.appendChild(a);
                    // a.click();
                    // a.remove();
                })

            }
        }
        )






    }
})











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
            // document.getElementById('starttime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`
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
            // document.getElementById('endtime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`
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

    var diff = Math.abs(newAudioSlider.currentEventClientX - event.clientX);


    if (event.clientX > newAudioSlider.currentEventClientX && newAudioSlider.currentMaxLeft - (event.clientX - 50) >= newAudioSlider.minimumGap) {


        newAudioSlider.minRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
        newAudioSlider.minRangeAudioLabel.style.left = `${event.clientX - 50}px`;
        var percentage = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left) / 500;
        var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
        newAudioSlider.minRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
        // document.getElementById('starttime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`
        document.getElementById('starttimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
        document.getElementById('starttimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
    }


    else if (event.clientX < newAudioSlider.currentEventClientX && event.clientX - 50 >= 0) {



        newAudioSlider.minRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
        newAudioSlider.minRangeAudioLabel.style.left = `${event.clientX - 50}px`;
        var percentage = parseInt(getComputedStyle(newAudioSlider.minRangeAudioLabel).left) / 500;
        var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
        newAudioSlider.minRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
        // document.getElementById('starttime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`
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

    var diff = Math.abs(newAudioSlider.currentEventClientX - event.clientX);


    if (event.clientX < newAudioSlider.currentEventClientX && (event.clientX - 50 - newAudioSlider.currentMinLeft) >= newAudioSlider.minimumGap) {

        newAudioSlider.maxRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
        newAudioSlider.maxRangeAudioLabel.style.left = `${event.clientX - 50}px`;
        var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
        var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
        newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
        // document.getElementById('endtime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`
        document.getElementById('endtimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
        document.getElementById('endtimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
    }

    else if (event.clientX > newAudioSlider.currentEventClientX && event.clientX - 50 <= 500) {

        newAudioSlider.maxRangeOfAudioSlider.style.left = `${event.clientX - 50}px`;
        newAudioSlider.maxRangeAudioLabel.style.left = `${event.clientX - 50}px`;
        var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
        var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
        newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
        // document.getElementById('endtime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`
        document.getElementById('endtimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
        document.getElementById('endtimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);
    }

    else if (event.clientX - 50 > 500) {
        newAudioSlider.maxRangeOfAudioSlider.style.left = `${500}px`;
        newAudioSlider.maxRangeAudioLabel.style.left = `${500}px`;
        newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(newAudioSlider.originalAudio.duration / 60)}:${newAudioSlider.flooring(newAudioSlider.originalAudio.duration % 60)}`;
        // document.getElementById('endtime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`
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
        // document.getElementById('starttime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`
        document.getElementById('starttimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
        document.getElementById('starttimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);

        newAudioSlider.maxRangeOfAudioSlider.style.left = `${newAudioSlider.currentMaxLeft - (newAudioSlider.currentEventClientX - event.clientX)}px`;
        newAudioSlider.maxRangeAudioLabel.style.left = `${newAudioSlider.currentMaxLeft - (newAudioSlider.currentEventClientX - event.clientX)}px`;
        var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
        var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
        newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
        // document.getElementById('endtime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`
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
        // document.getElementById('starttime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`;
        document.getElementById('starttimeminutes').value = newAudioSlider.flooring(currAudioDuration / 60);
        document.getElementById('starttimeseconds').value = newAudioSlider.flooring(currAudioDuration % 60);

        newAudioSlider.maxRangeOfAudioSlider.style.left = `${newAudioSlider.currentMaxLeft + (-newAudioSlider.currentEventClientX + event.clientX)}px`;
        newAudioSlider.maxRangeAudioLabel.style.left = `${newAudioSlider.currentMaxLeft + (-newAudioSlider.currentEventClientX + event.clientX)}px`;
        var percentage = parseInt(getComputedStyle(newAudioSlider.maxRangeAudioLabel).left) / 500;
        var currAudioDuration = percentage * (newAudioSlider.originalAudio.duration);
        newAudioSlider.maxRangeAudioLabel.innerText = `${newAudioSlider.flooring(currAudioDuration / 60)}:${newAudioSlider.flooring(currAudioDuration % 60)}`;
        // document.getElementById('endtime').value=`00:${newAudioSlider.flooring(currAudioDuration / 60).toString().padStart(2,'0')}:${newAudioSlider.flooring(currAudioDuration % 60).toString().padStart(2,'0')}`;
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
