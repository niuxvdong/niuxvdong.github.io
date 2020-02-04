const ap = new APlayer({
	// https://aplayer.js.org/#/zh-Hans/
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: true,
    audio: [
	{
        name: "叙世",
        artist: 'Aki阿杰,清弄',
        url: 'http://m10.music.126.net/20200204152847/d9f9337b97635c784f4885e0207607a5/ymusic/555a/0f5e/015a/b047edf12a8457552b546011dd58ba8e.mp3',
        cover: 'http://p1.music.126.net/dbNkAQmHi2TUzgkE7Zox1A==/3318326092881882.jpg?param=130y130',
      },
	  {
        name: '句号',
        artist: '邓紫棋',
        url: 'http://m10.music.126.net/20200204152927/57befb1b90576a4438160fc69e032c88/ymusic/5608/0e09/0f53/abf0f817349caa55389a890edfffa21e.mp3',
        cover: 'http://p2.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg?param=130y130',
      },
      {
        name: '你的酒馆对我打了烊',
        artist: '陈雪凝',
        url: 'http://m10.music.126.net/20200204152953/44f08e1e34baa04d7df677eee2f6a95b/ymusic/8282/098a/d744/be1e1d3c2a46b4cbd259aca7ff050cd3.mp3',
        cover: 'http://p1.music.126.net/LiRR__0pJHSivqBHZzbMUw==/109951163816225567.jpg?param=130y130',
      },
	  {
        name: '世界美好与你环环相扣',
        artist: '柏松',
        url: 'http://m10.music.126.net/20200204153022/bd039f69918fb70d6539dbc6738e0bd9/ymusic/0e0f/040c/545a/9e13518f413f4ebfe7c6c0693aeed819.mp3',
        cover: 'http://p2.music.126.net/uRIEA4Cq-i257Y2KJAXUYQ==/109951164459206904.jpg?param=130y130',
      },
      {
        name: '你的答案',
        artist: '阿冗',
        url: 'http://m10.music.126.net/20200204153058/a27658d45a136c70429abfca024b7ead/ymusic/545e/065a/530b/c413a59407100320b8f9da233b35f938.mp3',
        cover: 'http://p1.music.126.net/OlX-4S4L0Hdkyy_DQ27zag==/109951164459621658.jpg?param=130y130',
      }
    ]
});