const ap = new APlayer({
	// https://aplayer.js.org/#/zh-Hans/
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: true,
    audio: [
	{
        name: "叙世",
        artist: 'Aki阿杰,清弄',
        url: 'http://m10.music.126.net/20200204141544/94615b7479615cfeabe81ecd0c07ecc5/ymusic/555a/0f5e/015a/b047edf12a8457552b546011dd58ba8e.mp3',
        cover: 'http://p1.music.126.net/dbNkAQmHi2TUzgkE7Zox1A==/3318326092881882.jpg?param=130y130',
      },
	  {
        name: '句号',
        artist: '邓紫棋',
        url: 'http://m10.music.126.net/20200204141433/54a4e8ad980a067e8fad001b1aaa61a9/ymusic/5608/0e09/0f53/abf0f817349caa55389a890edfffa21e.mp3',
        cover: 'http://p2.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg?param=130y130',
      },
      {
        name: '你的酒馆对我打了烊',
        artist: '陈雪凝',
        url: 'http://m8.music.126.net/20200204142306/535eacbd2e304061d2eb2f2066b6c2ea/ymusic/8282/098a/d744/be1e1d3c2a46b4cbd259aca7ff050cd3.mp3',
        cover: 'http://p1.music.126.net/LiRR__0pJHSivqBHZzbMUw==/109951163816225567.jpg?param=130y130',
      },
	  {
        name: '世界美好与你环环相扣',
        artist: '柏松',
        url: 'http://m7.music.126.net/20200204141943/c86feba403c3d406486ab9c702855414/ymusic/0459/045c/520c/330c359473365e50a368ef0d43bc612f.mp3',
        cover: 'http://p2.music.126.net/uRIEA4Cq-i257Y2KJAXUYQ==/109951164459206904.jpg?param=130y130',
      },
      {
        name: '你的答案',
        artist: '阿冗',
        url: 'http://m10.music.126.net/20200204151615/352cef6b1c548a72c41e028ad52ae87e/ymusic/545e/065a/530b/c413a59407100320b8f9da233b35f938.mp3',
        cover: 'http://p1.music.126.net/OlX-4S4L0Hdkyy_DQ27zag==/109951164459621658.jpg?param=130y130',
      }
    ]
});