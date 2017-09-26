
/********************************导航条****************************/
var navEleId = "#navtemplate";
var childrenClassName = "navitem";
var navEleData = [
    ["高超概述","productoverview","active"],
    ["国之重器","productadvantage","inactive"],
    ["研究难点","productfunction","inactive"],
    ["研究进展","applicationscene","inactive"],
    ["相关链接","helpdocument","inactive"],
];
var navReplaceStr = ["{{itemcontent}}","{{linkid111}}","{{isactive}}"];
renderDom(navEleId, navEleData, navReplaceStr);
// activeListen(navEleId,childrenClassName);



/********************************高超高超***************************/
var advantageId = "#advantagetemplate";
var childrenClassName = "advantageitem";
var advantageData = [
    ["一小时全球打击",
    "高超声速飞行器以马赫数5～10的速度，拥有数小时内打遍全球的能力，对于突发的军事行为具备极为讯敏的应对能力","active"],
    ["太空核反击",
    "高超声速飞行器能够在大气层外进行核反击，大大提高了国家的二次核反击能力，有力保证了核力量的震慑作用","inactive"],
    ["突破反导系统","高超声速飞行器能够突破传统的反导系统，使常规的反导导弹无力跟踪拦截，成为下一代洲际打击的杀手锏","inactive"],
    ["工业皇冠",
    "高超声速飞行器带来了超燃发动机技术，突破了气动力难题，气动热难题，是未来“工业皇冠”上新的明珠","inactive"],
];
var navReplaceStr = ["{{itemtitle}}","{{itemcontent}}","{{isactive}}"];
renderDom(advantageId, advantageData, navReplaceStr);
activeListen(advantageId,childrenClassName);


/********************************研究难点***************************/
var functionId = "#functiontemplate";
var childrenClassName = "functionitem";
var functionData = [
    ["气动力难题","大气层顶部空气稀薄，如何为飞行器提供足够的飞行升力","active"],
    ["气动热难题","高超声速与近空间气体分子产生强烈的挤压、摩擦，导致局部巨大热流梯度","inactive"],
    ["超燃冲压发动机","宿来被比拟为在龙卷分钟点燃火柴，内部气体流速过大，气流过于紊乱","inactive"],
    ["等离子体电磁烦扰","飞行器高速飞行电离周边气体，形成等离子体，造成电磁干扰","inactive"],
    ["控制难题","高超声速机械性能要求极高，控制精度要求极高","inactive"],
    ["实验困难","试射成本高，环境模拟困难","inactive"],
];
var navReplaceStr = ["{{function-title}}","{{function-content}}","{{isactive}}"];
renderDom(functionId, functionData, navReplaceStr);
activeListen(functionId,childrenClassName);

/********************************研究成果***************************/
var sceneId = "#scenetabtemplate";
var childrenClassName = "tabitem"
var sceneData = [
    ["active","压缩拐角",],
    ["inactive","壁面粗糙度",],
    ["inactive","热压关联",],
    ["inactive","DSMC算法",],
];
var navReplaceStr = ["{{isactive}}","{{scene-content}}",];
renderDom(sceneId, sceneData, navReplaceStr);
activeListen(sceneId,childrenClassName);



var sceneBody = "#scenebodytemplate";
var childrenClassName = "bodyitem";
//var commonStr = "";
var sceneContentData = [
    ["active","压缩拐角的分离与再附过程中用理论计算相结合的方法预测最大压力值点和最大热流点"],
    ["inactive","分别获得了平板与球头体上粗糙壁面对热流的影响"],
    ["inactive","提出了一个广义物理模型理论，获得了热流与压强在特定情况下的比拟关联式"],
    ["inactive","用DSMC算法，构建程序来模拟高超声速飞行器在稀薄气流中的流动特性"],
];
var navReplaceStr = ["{{isactive}}","{{scene-content}}",];
renderDom(sceneBody, sceneContentData, navReplaceStr);
activeListen(sceneId,childrenClassName);


/********************************帮助文档***************************/
var helpDocId = "#helpdoctemplate";
var childrenClassName = "helpitem"
var helpDocData = [
    ["航天科工","三院301室","active"],
    ["力学研究所","LHD国家重点实验室","inactive"],
    ["29基地","CARDC","inactive"],
    ["NASA","NASA官网","inactive"],
];
var navReplaceStr = ["{{helptitle}}","{{helplink}}","{{isactive}}"];
renderDom(helpDocId, helpDocData, navReplaceStr);
activeListen(helpDocId,childrenClassName);




/******************************** common function ***************************/
function renderDom(domId, domData, replaceStr){
    var template = $(domId).html();
    var Doms = [];
    for(var i = 0; i < domData.length; i++){
        var replacedDom = replaceTemplate(replaceStr, template, domData[i]);
        Doms.push(replacedDom);
    }
    Doms = Doms.join("");
    $(domId).html(Doms);

}

function replaceTemplate(replaceStr, template, realData){
    var replacedDom = "";
    for(var i = 0; i < replaceStr.length; i++){
        var regular = new RegExp(replaceStr[i],"g");
        template = template.replace(regular,realData[i]);
    }
    replacedDom = template;
    return replacedDom;
}

function activeListen(templateId,className){
    $(templateId).bind('click', function(event) {
        $(templateId).children("." + className).removeClass('active');
        $(templateId).children("." + className).addClass('inactive');

        var currentDom = $(event.target);
        var regularClass = new RegExp(className);
        if(!regularClass.test(currentDom.attr("class"))){
            currentDom = currentDom.parent("."+className).addClass("active");
        }
        currentDom.removeClass('inactive');
        currentDom.addClass("active");
    });
    
}


/************************** 自主实现顶部吸附与页面滑动效果 ***************************/

scrollNavigation();
var displayState = 0;
var activeItem = 0;
var clickScroll = 0;
function scrollNavigation(){
    $(window).scroll(scrollHandler);
}

function scrollHandler(){
    
    domIds = ["#navbar","#productoverview","#productadvantage","#productfunction","#applicationscene","#helpdocument"];
    var navId = domIds[0];
    if(reachedTop(navId)){
        var reachedOne = whichReached(domIds) - 1;
        console.log("目前激活的是："+reachedOne);
        if(displayState == 0){
            appear();
            if(!clickScroll){
                slide(0);
            }
        }

        if(activeItem != reachedOne && !clickScroll){
            slide(reachedOne);
            activeItem = reachedOne;
        }

    }else{
        if(displayState == 1){
            disappear();    
        }
        // console.log("导航没到顶部"); 
    }
}

function whichReached(domIds){
    if(!reachedTop(domIds[0])){
        return -1;
    }
    for(var i = 0; i < domIds.length - 1; i++){
        if(reachedTop(domIds[i]) && !reachedTop(domIds[i+1])){
            return i;
        }
    }
    return domIds.length - 1;
}

function reachedTop(domId){
    var reached;
    var settingDistance = 150;
    if(domId == "#navbar"){
        settingDistance = 0;
    }
    if(computePosition(domId) <= settingDistance){
        reached = 1;
    }else{
        reached = 0;
    }
    return reached;
}

function computePosition(domId){  //计算此元素距离顶部的高度
    var Ydistance = $(domId).offset().top - $(window).scrollTop();
    return Ydistance;
}
/************************** 自主实现顶部吸附与页面滑动效果 ***************************/




/***************************** fixed navigationbar ******************************/
var fixedNavEleId = "#fixednavtemplate";
var childrenClassName = "fixednavitem";
var navEleData = [
    ["高超概述","productoverview","active"],
    ["国之重器","productadvantage","inactive"],
    ["研究难点","productfunction","inactive"],
    ["研究进展","applicationscene","inactive"],
    ["相关链接","helpdocument","inactive"],
];
var navReplaceStr = ["{{itemcontent}}","{{linkid111}}","{{isactive}}"];
renderDom(fixedNavEleId, navEleData, navReplaceStr);
activeListen(fixedNavEleId,childrenClassName);

/***************************** fixed navigationbar ******************************/

function appear(){
    displayState = 1;
    $("#topnavbar").css("display","block");
    $("#topnavbar").animate({
        top:"0px"
    },200);
}
function disappear(){
    displayState = 0;
    $("#topnavbar").animate({
        top:"-60px"
    },200,function(){
        $("#topnavbar").css("display","none");
    }); 
}
function slide(reachedOne){
    var parentDom = $("#fixednavtemplate");
    var hiddenParentDom = $("#navtemplate");
    var domAlign = parentDom.children(".fixednavitem").eq(reachedOne);
    var hiddenDomAlign = hiddenParentDom.children(".navitem").eq(reachedOne);
    parentDom.children(".fixednavitem").removeClass('active');
    parentDom.children(".fixednavitem").addClass('inactive');
    domAlign.removeClass('inactive');
    domAlign.addClass('active');
    var left = hiddenDomAlign.offset().left;
    $("#slider").width(hiddenDomAlign.width());
    left = left + "px";
    $("#slider").animate({
        left:left
    },"fast");
}



listenNavClick("#navtemplate","navitem");
listenNavClick("#fixednavtemplate","fixednavitem");
function listenNavClick(bindId,childrenClassName){
    var domIds = ["#productoverview","#productadvantage","#productfunction","#applicationscene","#helpdocument"];
    var bindDom = $(bindId);
    var childrenDoms = bindDom.children('.'+childrenClassName);
    for(var i = 0; i < childrenDoms.length; i++){
        childrenDoms[i]._index = i;
        $(childrenDoms[i]).click(function(e){
            console.log(domIds[this._index]);
            clickScroll = 1;
            scroll(domIds[this._index]);
            slide(this._index);
            activeItem = this._index;
        });
    }

}
function scroll(domId){
    console.log(computePosition(domId));
    var movingY = $(domId).offset().top - 100;
    $('html, body').animate({
        scrollTop: movingY
    },'slow', function(){clickScroll = 0});
}

