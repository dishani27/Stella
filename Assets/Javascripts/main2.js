class App {
  constructor () {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.synth = window.speechSynthesis;
    this.icon = document.querySelector('i.fa.fa-microphone');
    this.paragraph = document.createElement('p');
    this.icon = document.querySelector('.mic');
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
        console.log("inside printit(user)");
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
    if((speech.includes('time'))) {
      var spe = this.getTime();
      console.log(spe);
      this.printIt(spe);
      this.speak(this.getTime);
    }else
     if ((speech.includes('what is today\'s date'))||(speech.includes('date'))){
      var date = this.getDate();
      this.printIt(date);
      this.speak(this.getDate);
    }else
     if (speech.includes('what is the weather in')) {
      var weather = this.getWeather(speech);
      this.printIt(weather);
    }else
    if((speech.includes('what can I call you'))||(speech.includes('name'))){
      var name = this.getName();
      this.printIt(name);
      this.speak(this.getName);
    }else
   if((speech.includes('tell me a joke'))){
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
   if((speech.includes('another one'))||(speech.includes('another joke'))){
    var joke2 = this.getJoke2();
    this.printIt(joke2);
    this.speak(this.getJoke2);
  }else
  if((speech.includes('play')&&this.question)||(speech.includes('song')&&this.question)){
   console.log("in play");
   this.playSong();
   this.speak(this.playSay);
   this.question=true;
  }else
  if((speech.includes('riddle'))){
    var riddle = this.getRiddle();
    this.printIt(riddle);
    this.speak(this.getRiddle);
  }else
  if(((speech.includes('Beatbox')))||((speech.includes('beatboxing')))){
    var beatboxtext = this.getbeatboxreply();
    this.printIt(beatboxtext);
    this.speak(this.getbeatboxreply);
    this.getbeatbox();  
  }else
  if((speech.includes("do you know Siri"))||(speech.includes("do you know Google assistant"))||(speech.includes("do you know Cortana"))||(speech.includes("do you know Alexa"))){
    var Ans =this.getsiri();
    this.printIt(Ans);
    this.speak(this.getsiri);
  }else
  if(speech.includes('+')){
    this.add(speech);
  }else
  if(speech.includes('-')){
    this.sub(speech);
  }else
  if(speech.includes('multiply')||(speech.includes('x'))||(speech.includes('multiplied'))){
    this.multiply(speech);
  }else
  if(speech.includes('/')){
    this.divide(speech);
  }else
  if((speech.includes('divided by'))){
this.divide2(speech);
  }else
  
  if(speech.includes('news')||speech.includes('headline')){
    var news = this.getNewsreply();
    this.printIt(news);
    this.getNews();
    this.speak(this.getNewsreply);
  }else
  if (speech.includes('open') && this.question) {
        console.log("in open");
        this.openUrl(speech.split(' ')[1]);
        this.speak(this.openSay);
         this.question = false;
  }else{
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
    return 'A Riddle ? Alright , Here you go ... What is something that you always have but always leave behind? It is Fingerprint.. ';
  }
   getJoke(){
      return 'Did you hear about the semi-colon that broke the law ? He was given two consecutive sentences.';  
  }
  getJoke2(){
      return 'Can a kangaroo jump higher than a house . Of course, a house doesn’t jump at all.';  
  }
  getbeatboxreply(){
    return 'Here\'s one I have been practicing';
  }
  getsiri(){
    console.log("inside siri");
    return 'I haven\'t met her but you can call her my ancestor';
  }
  add(speech){
   self=this;
   var firstnum =parseInt(speech.split(' ')[0]);
    var secondnum =parseInt(speech.split(' ')[2]);
    console.log("first num ",firstnum," second num ",secondnum);
   var  sum =firstnum + secondnum;
   
   var reply = 'The Answer is '+sum;
  const utterThis = new SpeechSynthesisUtterance(reply);
   self.setVoice(utterThis);
  self.synth.speak(utterThis);
  this.printIt(reply);
}
  sub(speech){
    self=this;
   var firstnum =parseInt(speech.split(' ')[0]);
    var secondnum =parseInt(speech.split(' ')[2]);
    console.log("first num ",firstnum," second num ",secondnum);
   var  sum =firstnum - secondnum;
   var reply = 'The Answer is '+sum;
  const utterThis = new SpeechSynthesisUtterance(reply);
   self.setVoice(utterThis);
  self.synth.speak(utterThis);
  this.printIt(reply);  
}
  multiply(speech){
    self=this;
   var firstnum =parseInt(speech.split(' ')[0]);
    var secondnum =parseInt(speech.split(' ')[2]);
    console.log("first num ",firstnum," second num ",secondnum);
   var  sum =firstnum * secondnum;
       var reply = 'The Answer is '+sum;
  const utterThis = new SpeechSynthesisUtterance(reply);
   self.setVoice(utterThis);
  self.synth.speak(utterThis);
  this.printIt(reply);
}
  divide(speech){
    self=this;
   var firstnum =parseInt(speech.split(' ')[0]);
    var secondnum =parseInt(speech.split('/')[1]);
    console.log("first num ",firstnum," second num ",secondnum);
   var  sum =parseFloat(firstnum / secondnum).toFixed(2);
   var reply = 'The Answer is '+sum;
  const utterThis = new SpeechSynthesisUtterance(reply);
   self.setVoice(utterThis);
  self.synth.speak(utterThis);
  this.printIt(reply);
 }
 divide2(speech){
  self=this;
 var firstnum =parseInt(speech.split(' ')[0]);
  var secondnum =parseInt(speech.split(' ')[3]);
  console.log("first num ",firstnum," second num ",secondnum);
 var  sum =parseFloat(firstnum / secondnum).toFixed(2);
//  sum.toFixed(2);
 var reply = 'The Answer is '+sum;
const utterThis = new SpeechSynthesisUtterance(reply);
 self.setVoice(utterThis);
self.synth.speak(utterThis);
this.printIt(reply);
}
  getbeatbox(){
    var audio = document.createElement('audio');
    audio.src="Assets/Audio/beatbox.mp3";
    setTimeout(function(){ audio.play(); }, 3000);  
  }
  getName(){
    return 'You can call me Stella';
  }
   getNews(){
     var site='https://news.google.com/?hl=en-IN&gl=IN&ceid=IN:en';
     window.open(site); 
   }
   getNewsreply(){
    return 'Here is your dose of today\'s headline ';
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${speech.split(' ')[5]}&appid=6aa90859f3e957ff6c77ec9b1bc86296&units=metric`
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
      const utterThis = new SpeechSynthesisUtterance(`the weather condition in ${weather.name} is mostly full of
      ${weather.weather[0].description} at a temperature of ${weather.main.temp} degrees Celcius`);
      self.setVoice(utterThis);
      self.synth.speak(utterThis);
    });
  return 'the weather condition in '+ city +' is mostly full of haze at a temperature of 35 degrees Celcius`'
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
playSong(){
  var x = Math.floor((Math.random() * 5) + 1);
  var  site;
  console.log(x);
  switch(x){
    case 1:site='https://www.youtube.com/watch?v=1EadhOBcfI0';
            break;   
    case 2:site='https://www.youtube.com/watch?v=g7PP_gkcdgE';
            break;
    case 3:site='https://www.youtube.com/watch?v=fy31fx7oe6g';
            break;
    case 4:site='https://www.youtube.com/watch?v=eXBkFr_s3Bc';
            break;
    case 5:site='https://www.youtube.com/watch?v=m7Bc3pLyij0';
            break; 

  }
 var play = "There you go..." ;
  this.printIt(play);
  window.open(site);
}
playSay(){
  return "There you go...";
}
}

const speechRec = new App();


