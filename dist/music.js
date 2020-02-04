const ap = new APlayer({
	// https://aplayer.js.org/#/zh-Hans/
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: true,
    audio: [
	{
        name: "叙世",
        artist: 'Aki阿杰,清弄',
        url: 'http://music.163.com/song/media/outer/url?id=35447402.mp3',
        cover: 'http://p1.music.126.net/dbNkAQmHi2TUzgkE7Zox1A==/3318326092881882.jpg?param=130y130',
      },
	  {
        name: '句号qq',
        artist: '邓紫棋',
        url: 'http://183.232.248.21/amobile.music.tc.qq.com/C400001QJyJ32zybEe.m4a?guid=181427132&vkey=9DBE34F5ADCD3A3861DA0B9035175100DB9D7CB265836252FBCA98F7EA13822D40C7000CC357125D3430F346036FD5F8583DF1DD9FC928E6&uin=0&fromtag=66',
        cover: 'http://p2.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg?param=130y130',
      },
	  {
        name: '句号wy',
        artist: '邓紫棋',
        url: 'http://music.163.com/song/media/outer/url?id=1405283464.mp3',
        cover: 'http://p2.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg?param=130y130',
      }, 
      {
        name: '你的酒馆对我打了烊',
        artist: '陈雪凝',
        url: 'http://music.163.com/song/media/outer/url?id=1341964346.mp3',
        cover: 'http://p1.music.126.net/LiRR__0pJHSivqBHZzbMUw==/109951163816225567.jpg?param=130y130',
      },
	  {
        name: '世界美好与你环环相扣',
        artist: '柏松',
        url: 'http://music.163.com/song/media/outer/url?id=1400053020.mp3',
        cover: 'http://p2.music.126.net/uRIEA4Cq-i257Y2KJAXUYQ==/109951164459206904.jpg?param=130y130',
      },
      {
        name: '你的答案',
        artist: '阿冗',
        url: 'http://music.163.com/song/media/outer/url?id=1400256289.mp3',
        cover: 'http://p1.music.126.net/OlX-4S4L0Hdkyy_DQ27zag==/109951164459621658.jpg?param=130y130',
      }
    ]
});