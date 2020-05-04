function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.image-upload-wrap').hide();
            $('#loading').show();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        };
        reader.readAsDataURL(input.files[0]);
        init().then(() => {
            predict();
            $('#loading').hide();
        });
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function() {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function() {
    $('.image-upload-wrap').removeClass('image-dropping');
});


let URL;
const urlMale = "https://teachablemachine.withgoogle.com/models/UHjCBukkm/";
const urlFemale = "https://teachablemachine.withgoogle.com/models/ju5-q_uzx/";
let model, webcam, labelContainer, maxPredictions;
var dogMsg = new Array("愛らしくて魅力的な顔、第一印象からでも話しかけやすく、誰とでもすぐに仲良くなれるタイプ。優しい笑顔で大人気のあなたはヨクバリ〜〜〜", "男女問わず「かわいい！」「癒される！」と言われる優しい雰囲気を持った顔立ち大人気NO1！！！","笑うと子犬のような顔になる笑顔が可愛いK-POPアイドルに似ている。まさかアナタは？？？","たまらない魅力がたくさん！周りから好きになっちゃうかも！");
var catMsg = new Array("最近、にわかに脚光を浴びている顔、クールでどこか気品が感じられ、謎めいた雰囲気が漂うアナタ！！。", "第一印象から冷たく感じられるあなた、コワイコワイ","一度ハマったらもっと知りたくなる“ツンデレ人”。","プライドが高くちょっぴりわがままで、初対面の人にはなかなか心を開かず、心を許した特定の相手に対しては全力で甘える傾向があるアナタ、愛されますよ。");
var bearMsg = new Array("第一印象が怖くて近づいてこないが、誰よりも暖かい人、ガンバロヨ", "印象と別に暖かく頼もしいNo１","ぽっちゃり＆ガッチリ体型でよく食べるが、気が優しい力持つアナタ、ワウパワープール","デブじゃないよ、熊だよ");
var dinosaurMsg = new Array("シックな性格、悪そうに見える印象だが、知るほどハマってしまう魅力を持つ人", "アナタはまだまだ進化中、素晴らしい","お前に決めた！！！","やや離れた瞳と大きな口、基本温和だがテンションが上がると熱い麺もある人");
var wolfMsg = new Array("冷静&クールな性格が影響しているのか、個人主義的なところがある人", "仕事も恋愛も、狙った獲物は逃さないタイプ、ワォー。好きになり「この人がほしい」と思ったら口説き落とすまであきらめない人。","野生の強い印象、素敵な顔、性欲が強い魅力的なアナタ","ほとんど人を頼らず、冷めているところがあり、誰かに相談することは意味がないと考える人。しかし、実行力はかなりのもの");
var horseMsg = new Array("やり手で仕事もバリバリこなし、プライベートでは友人も多いアナタ素晴らしい。", "頭の回転が速く、相手の気持ちを察してうまく行動できる人。","持久力が強く、何をしても真面目にする。精力も強く浮気が多いアナタGOOD!!!","性格が変わった人で短気のため、ミスが多いだが、自分の価値をしてくれる人を出会うと実力を発揮するタイプ");
var snakeMsg = new Array("雰囲気から自信や頼もしさも感じる。また、冷たい印象があることが魅力的に映るでしょう", "ミステリアスでクールな印象を持つアナタ、クシーで特別感がある。","意志が強くて度胸もあって雰囲気だけでなく、内面的な強さを持っている人。","たくさんの魅力を秘めているアナタ、頼りがいや強さだけでなく、おおらかな性格を表すこともある。");
var foxMsg = new Array("美しくてすごく綺麗な顔も持ち、セクシーな魅力が溢れる人", "エレガントタイプ顔でセンスがいい性格を持つ人が多いあなたは愛されているよ！！！","プライドが高い、というよりは失敗するのが嫌いで、その失敗したところも他人に見られたくない、といった完璧主義者と思われているタイプ。","眼光の鋭さがあり、その目力の強さが近寄りがたい冷たい雰囲気を周りに与えてしまっているようなタイプ、鹿kし、笑顔が可愛い。");
var monkeyMsg = new Array("心身ともに頑丈でたくましく、アクティブで頼りがいがある。その一方で、妙に鈍感な一面も併せ持つのが特徴。", "一言でいえば、みんなの兄貴分のような存在、アニキ〜〜〜〜〜〜。","猿顔とは、言葉のとおりで「猿に似ている顔」という意味があるため、猿顔は美人とあまり結びつかない人も多いでしょう。","恋愛は不器用。猿顔の人は恋愛で苦労することが多いタイプ。愛嬌があり、周りとのコミュニケーションも上手くモテるが、自分から恋の駆け引きをするのは苦手。");
var mouseMsg = new Array("話好きで社交的ですが、実はかなり自我が強く、そこに本人の悩みは集中しているタイプ。", "がさつな性格が多い。しかし、生活力が強い、自我が強くて意志も強いタイプ","いい加減さ・曖昧さ(あやふやな状況)を嫌うタイプ。どちらが正しくてどちらが間違っているかについて白黒つけたい心理に根ざしている部分がある。","行動がテキパキしている・動きがスピーディーであると言われる。勤勉・実直な性格であり、目標達成のためにコツコツと地道な努力を続けられるタイプ。");
var rabbitMsg = new Array("穏やかで人を癒す性格の人が多い。さらに、滅多なことでは怒ったりせず静かに注意する程度なので、どんな人とも付き合うことができ好かれやすいタイプ", "結婚したら良きパートナーになるが、傷つきやすい一面もある。付き合う相手で運勢が変動するので注意が必要","うさぎ顔の人は純粋で優しい性格なので、他人の言動によって傷つきやすいタイプ。","恋愛面では、うさぎ顔とは正反対の肉食系の人が好み。");

var rstTitle = new Array("愛らしい犬顔", "クールな猫顔", "頼もしい熊顔", "シックな恐竜顔", "素敵なオオカミ顔", "力持ち馬顔", "Sっぽい雰囲気がある蛇顔", "魅力的なキツネ顔", "モテる猿顔", "集中力いいネズミ顔", "可愛いウサギ顔");

async function init() {
    if (document.getElementById("gender").checked) {
        URL = urlMale;
    } else {
        URL = urlFemale;
    }
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    // maxPredictions = model.getTotalClasses();
    maxPredictions = 5;
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        var em = document.createElement("div")
        em.classList.add("d-flex");
        labelContainer.appendChild(em);
    }
}

async function predict() {
    var image1 = document.getElementById("face-image")
    const prediction = await model.predict(image1, false);
    prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
    var rsMsg;
    var resultTitle, resultExplain;
    var ranNum = Math.floor(Math.random()*(4));
    switch (prediction[0].className) {
        case "dog":
            resultTitle = rstTitle[0];
            resultExplain = dogMsg[ranNum];
            break;

        case "cat":
            resultTitle = rstTitle[1];
            resultExplain = catMsg[ranNum];
            break;

        case "bear":
            resultTitle = rstTitle[2];
            resultExplain = bearMsg[ranNum];
            break;

        case "dinosaur":
            resultTitle = rstTitle[3];
            resultExplain = dinosaurMsg[ranNum];
            break;

        case "wolf":
            resultTitle = rstTitle[4];
            resultExplain = wolfMsg[ranNum];
            break;

        case "horse":
            resultTitle = rstTitle[5];
            resultExplain = horseMsg[ranNum];
            break;

        case "snake":
            resultTitle = rstTitle[6];
            resultExplain = snakeMsg[ranNum];
            break;

        case "fox":
            resultTitle = rstTitle[7];
            resultExplain = foxMsg[ranNum];
            break;

        case "monkey":
            resultTitle = rstTitle[8];
            resultExplain = monkeyMsg[ranNum];
            break;

        case "mouse":
            resultTitle = rstTitle[9];
            resultExplain = mouseMsg[ranNum];
            break;

        case "rabbit":
            resultTitle = rstTitle[10];
            resultExplain = rabbitMsg[ranNum];
            break;

        default:
            resultTitle = "該当なし";
            resultExplain = ""

        }
    
    var title = "<div class='" + prediction[0].className + "-animal-title animal-title'>" + resultTitle + "</div>";
    var explain = "<div class='animal-explain pt-2'>" + resultExplain + "</div>";

    $('.result-message').html(title + explain);
    var barWidth;
    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability.toFixed(2) > 0.1) {
            barWidth = Math.round(prediction[i].probability.toFixed(2) * 100) + "%";
        } else if (prediction[i].probability.toFixed(2) >= 0.01) {
            barWidth = "4%"
        } else {
            barWidth = "2%"
        }
        var labelTitle;
        switch (prediction[i].className) {
            case "dog":
                labelTitle = "<img src='img/animal/dog.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;
            case "cat":
                labelTitle = "<img src='img/animal/cat.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;
            case "bear":
                labelTitle = "<img src='img/animal/bear.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;
            case "dinosaur":
                labelTitle = "<img src='img/animal/dinosaur.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;
            case "wolf":
                labelTitle = "<img src='img/animal/wolf.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;
           case "horse":
                labelTitle = "<img src='img/animal/horse.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;
            case "snake":
                labelTitle = "<img src='img/animal/snake.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;
            case "fox":
                labelTitle = "<img src='img/animal/fox.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;            
            case "monkey":
                labelTitle = "<img src='img/animal/monkey.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;
            case "mouse":
                labelTitle = "<img src='img/animal/mouse.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;
            case "rabbit":
                labelTitle = "<img src='img/animal/rabbit.png' alt='' style='width:12%;height:12%;padding-right:10px'>"
                break;
            default:
                labelTitle = "알수없음"
        }
        var label = labelTitle;
        var bar = "<div class='bar-container position-relative container'><div class='" + prediction[i].className + "-box animal-box'></div><div class='d-flex justify-content-center align-items-center " + prediction[i].className + "-bar animal-bar' style='width: " + barWidth + "'><span class='d-block percent-text'>" + Math.round(prediction[i].probability.toFixed(2) * 100) + "%</span></div></div>";
        labelContainer.childNodes[i].innerHTML = label + bar;
    }
}
