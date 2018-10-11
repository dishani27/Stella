class App {
  constructor () {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.synth = window.speechSynthesis;
    this.icon = document.querySelector('.mic');
    this.paragraph = document.createElement('p');
   this.paragraph.innerText = "Say Something...";
    this.paragraph.className = "user"
    this.container = document.querySelector('.text-box');
    this.sound = document.querySelector('.sound');
    this.listening = false;
    this.question = false;
    this.appendParagraph();
    this.voices = [];
    this.handleMicIconClick();
    this.watchRecognition();
    this.cachedWeather = false;
  }
  
  appendParagraph() {
    this.container.appendChild(this.paragraph);
  }

  handleMicIconClick() {
    this.icon.addEventListener('click', () => {
      if (this.listening) {
        this.recognition.stop();
        return;
      }
      this.sound.play();
      this.dictate();
    });
  }

  watchRecognition() {
    this.recognition.onstart = function() {
      this.listening = true;
      console.log('Speech recognition service has started');
    };
    
    this.recognition.onend = function() {
      console.log('Speech recognition service disconnected');
    };
  }
 printIt(print){
  const speechToText = print;
      this.paragraph.textContent = speechToText;
  
      if (event.results[0].isFinal) {
        this.container.scrollTo(0, this.container.scrollHeight);
        this.paragraph = document.createElement('p');
        this.paragraph.className="user";
        this.appendParagraph();
       // console.log("inside printit(user)");
}
 }
  dictate() {
    console.log('dictating...');
    this.recognition.start();
    this.recognition.onresult = (event) => {
      const speechToText = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join(' ');
      console.log("aaaa",speechToText);
      console.log("aassa",event.results[0]);
      this.paragraph.textContent = speechToText;
  
      if (event.results[0].isFinal) {
         console.log("inside dictate(stella)");
      //  this.paragraph.textContent = speechToText;
        this.paragraph = document.createElement('p');
        this.paragraph.className="stella";
        this.appendParagraph();
        this.handleRequest(speechToText);
        this.paragraph.innerText = "Say Something...";
        this.container.scrollTo(0, this.container.scrollHeight);


      }
    };
    // this.recognition.onend = this.recognition.start
  }

  speak(action) {
    
    const utterThis = new SpeechSynthesisUtterance(action());
    this.setVoice(utterThis);
    this.synth.speak(utterThis);
  }

  setVoice(utterThis) {
      this.voices=window.speechSynthesis.getVoices();
        utterThis.voice = this.voices[3];
      
    
  }

  handleRequest(speech) {
    this.question = true;

    if (speech.includes('what is the time')) {
      var spe = this.getTime();
      console.log(spe);
      this.printIt(spe);
      this.speak(this.getTime);
    
    }else if (speech.includes('what is today\'s date')) {
      var date = this.getDate();
      this.printIt(date);
      this.speak(this.getDate);
    }else

    if (speech.includes('what is the weather in')) {
      
      // this.getWeather(speech);
      var weather = this.getWeather(speech);
      this.printIt(weather);
    }
    else
    if(speech.includes('what is your name')){
      var name = this.getName();
      this.printIt(name);
      this.speak(this.getName);
    }else
   if(speech.includes('tell me a joke')){
     var joke = this.getJoke();
     console.log(joke);
     this.printIt(joke);
     this.speak(this.getJoke);
   }else
   if((speech.includes('hi'))||(speech.includes('hello'))){
     var reply = this.getReply();
     this.printIt(reply);
     this.speak(this.getReply);
   }else
   if(speech.includes('tell me another joke')){
    var joke2 = this.getJoke2();
    this.printIt(joke2);
    this.speak(this.getJoke2);
  }else
  if(speech.includes('play')&&this.question){
   console.log("in play");
   this.playSong(speech.split(['1']));
   this.speak(this.playSay);
   this.question=true;
  }else
  if(speech.includes('ask me a riddle')){
    var riddle = this.getRiddle();
    this.printIt(riddle);
    this.speak(this.getRiddle);
  }else
  if(speech.includes('fingerprint')){
    var ans = this.getAnswer();
    this.printIt(ans);
    this.speak(this.getAnswer);
  }else
  if (speech.includes('open') && this.question) {
        console.log("in open");
        // this.openUrl(speech.split(' ')[1]);
        this.openUrl(speech.split(' ')[1]);
        this.speak(this.openSay);

        this.question = false;
  }
  else{
        var notans = this.wrongAns();
        this.printIt(notans);
        this.speak(this.wrongAns);
      }
  };
  getReply(){
    return 'Hi ! How can I help you ??';
  }
  getAnswer(){
      return 'Voila !! you did it ';
  }
  wrongAns(){
    return 'Oops !! I did not get that .. Try something else .';
  }
  getRiddle(){
    return 'A Riddle ? Alright , Here you go ... What is something that you always have but always leave behind? . . . Fingerprints';
  }

  getJoke(){
      return 'Did you hear about the semi-colon that broke the law? He was given two consecutive sentences.';  
  }
  getJoke2(){
      return 'Can a kangaroo jump higher than a house . Of course, a house doesn’t jump at all.';
    
  }
  getName(){
    return 'You can call me Stella';
  }

  getTime() {
    const time = new Date(Date.now());

    return `The Time is ${time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    
  }

  getDate() {
    const time = new Date(Date.now())
    return `Today is ${time.toLocaleDateString()}`;
  }

   getWeather(speech) {
    self = this;
    var city=speech.split(' ')[5];
    console.log(city);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`;
    if ('caches' in window) {
      caches.match(url).then(function(response) {
        if (response) {
          self.cachedWeather = true;
          response.json().then(function updateFromCache(json) {
            if (json.cod === '404') {
              const utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
              self.setVoice(utterThis);
              self.synth.speak(utterThis);
              name=json.name;
              desc=json.weather[0].description;
              temp=json.main.temp;
              return;
            }
            const utterThis = new SpeechSynthesisUtterance(`the weather condition in ${json.name} is mostly full of
            ${json.weather[0].description} at a temperature of ${json.main.temp} degrees Celcius`);
            self.setVoice(utterThis);
            self.synth.speak(utterThis);
          });
        }
    

      });
    

    }
    fetch(url)
    .then(function(response){
      return response.json();
    }).then(function(weather){
      if (self.cachedWeather) {
        return;
      }
      if (weather.cod === '404') {
        const utterThis = new SpeechSynthesisUtterance(`I cannot find the weather for ${speech.split(' ')[5]}`);
        self.setVoice(utterThis);
        self.synth.speak(utterThis);
        return;
      }
      const utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
      self.setVoice(utterThis);
      self.synth.speak(utterThis);
    });
 // return 'the weather condition in '+ city +' is mostly full of haze at a temperature of 35 degrees Celcius`'
  }

  openUrl(url) {
    console.log("ins open url",url);
    var site = "http://www."+url+".com";
    // console.log(site);
     var open = "Opening "+ url;
    
    this.printIt(open);     
    window.open(site);
 }
 openSay(){
  return "Opening ... ";     
  
}
playSong(songName){
  console.log("inside playsong ",songName);
  var site = 'https://www.google.com/search?source=hp&ei=UIy8W_OIMMn1vgSvvp_oBw&q='+songName+'&oq=play+dil&gs_l=psy-ab.3.0.0l10.206910.212775.0.214754.10.8.0.0.0.0.292.931.0j1j3.4.0....0...1.1.64.psy-ab..6.4.928.0..0i131k1.0.Mi40dvwAsLo';
  var play = "Playing your Song" ;
  this.printIt(play);
  window.open(site);
}
playSay(){
  return "Playing your Song..";
}
}

const speechRec = new App();


