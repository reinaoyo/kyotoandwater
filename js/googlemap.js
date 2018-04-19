// display_marker.js

// window.addEventListenerに関数オブジェクトを登録しておくと，
// 全部のコンテンツの読み込みが終了した時に自動的に，
// 登録しておいた関数オブジェクトが次々と呼ばれる
window.addEventListener('load',() => {
  const latlng =[
    {lat:35.013003,lng:135.677773},//渡月橋
    {lat:35.039177, lng:135.773008},//下鴨神社
    {lat:35.031804, lng:135.771987},//旧三井家下鴨別邸
    {lat:35.027048,lng:135.798227},//銀閣寺
    {lat:34.889350,lng:135.807704},//平等院
    {lat:34.985897,  lng:135.758838}//京都駅
  ];
  //登録する関数オブジェクト記述開始
    //地図表示に必要なパラメータを保持するconstオブジェクト
    const mapElement = {
      // 日野キャンパス2号館をの緯度経度を中心にして表示する
      center:latlng[5],//京都駅
      // ズームレベル
      zoom:11
    };

    // 地図を保持するためのconstオブジェクトmyMapを宣言し，
    // GoogleMapsのコンストラクタの引数に，先に定義した地図表示に必要なパラメータを食わせる
    const myMap =
      new google.maps.Map(document.getElementById('map'), mapElement);
    // コンストラクタが実行されると表示される

    // 日野キャンパス1号館にマーカを表示するためのパラメータのconstオブジェクト
    const MarkerElement= new Array();
    const Marker= new Array();
    window.infoWindowArray = new Array();

    for(let i=0;i<6;i++){
      if(i<5){
        MarkerElement[i] = {
          position: latlng[i],
          // どのマップオブジェクトに表示するか
          map: myMap,
          icon: {
		         url: 'img/pinB.png',
		           scaledSize: new google.maps.Size(20, 30)
	            }
            };
  	    }else{
          MarkerElement[i] = {
            position: latlng[i],
            // どのマップオブジェクトに表示するか
            map: myMap,
            icon: {
              url: 'img/pinO.png',
              scaledSize: new google.maps.Size(20, 30)
            }
          }
        }
      Marker[i] =new google.maps.Marker(MarkerElement[i]);
  }

  const contentImg =[
    '<img class="mini" src="img/togetu.jpg">',
    '<img class="mini" src="img/simogamo.jpg">',
    '<img class="mini" src="img/mitui.jpg">',
    '<img class="mini" src="img/ginkaku.jpg">',
    '<img class="mini" src="img/byoudouin.jpg">'
  ];

  const contentText =[
    '<a class="name" href =#togetu>渡月橋</a>',
    '<a href =#simogamo>下鴨神社</a>',
    '<a  href =#mitui>旧三井家下鴨別邸</a>',
    '<a  href =#ginkaku>東山慈照寺（銀閣寺）</a>',
    '<a  href =#byoudouin>平等院鳳凰堂</a>'
  ];
  const InfoWindowElement = new Array();
  const InfoWindow = new Array();
  const contentHTML = new Array();

  for (let i=0;i<5;i++){
    contentHTML[i] =contentText[i] + '<br />' + contentImg[i];
    InfoWindowElement[i] ={content: contentHTML[i],maxWidth: 400 };
    //InfoWindowのコンストラクタを呼ぶ
    InfoWindow[i] = new google.maps.InfoWindow(InfoWindowElement[i]);
    window.infoWindowArray.push(InfoWindow[i]);
    Marker[i].addListener('click', ()=> { //関数オブジェクトを記述開始
      //マーカオブジェクトがクリックされた時に，この関数が呼ばれる
      window.infoWindowArray.forEach((val, index, array) => {
       val.close();
     });
        InfoWindow[i].open(myMap, Marker[i]);
      });//関数オブジェクト記述ここまで

  }

});
