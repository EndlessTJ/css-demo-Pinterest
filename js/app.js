/**
 * Created by 田进 on 2016/6/10.
 */


window.onload=function () {
    imgLocation("container","box");
    var imgData={"data":[{"src":"1.jpg"},{"src":"2.png"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"}]};
    window.onscroll=function(){
        if (checkLocation()){
            for(var i=0;i<imgData.data.length;i++){
                var cbox=document.getElementById("container");
                var newDiv=document.createElement("div");
                newDiv.className="box";
                cbox.appendChild(newDiv);
                var newel=document.createElement("div");
                newel.className="box_img";
                newDiv.appendChild(newel);
                var newImg=document.createElement("img");
                // newImg.src="img/"+imgData.data[i].src;
                newImg.setAttribute("src","img/"+imgData.data[i].src);
                newel.appendChild(newImg);

            }

        }
        imgLocation("container","box")

    }
};
//获取图片加载的位置
function checkLocation(){
    var cbox=document.getElementById("container");
    var contain=cWidth(cbox,"box");
    var lastImgHeight=contain[contain.length-1].offsetTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

    if (lastImgHeight<pageHeight+scrollTop){
        return true
    }

}






//设置图片的位置
function imgLocation(parent,contain) {
    var cparent = document.getElementById(parent);
    var childArr = cWidth(cparent, contain);
    var imgWidth = childArr[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);
    cparent.style.cssText = "width:" + imgWidth * num + "px";

    for (var i = 0; i < childArr.length; i++) {
        if (i < num) {
            var boxHeightArr = cHeight(childArr, num);
        } else {
            var minHeight = Math.min.apply(null, boxHeightArr);
            var minIndex = minHeightLocation(boxHeightArr, minHeight);
            childArr[i].style.position = "absolute";
            childArr[i].style.top = minHeight + "px";
            childArr[i].style.left = childArr[minIndex].offsetLeft + "px";
            boxHeightArr[minIndex] = boxHeightArr[minIndex] + childArr[i].offsetHeight;
        }
    }
}

//另一种方法
/*
    var boxHeightArr=[];
    for(var i=0;i<childArr.length;i++){
        if (i<num){
            boxHeightArr[i]=childArr[i].offsetHeight;
        }else {
            var minHeight=Math.min.apply(null,boxHeightArr);
            var minIndex=minHeightLocation(boxHeightArr,minHeight);
            childArr[i].style.position="absolute";
                 childArr[i].style.top=minHeight+"px";
                  childArr[i].style.left=minIndex*imgWidth+"px";
                  boxHeightArr[minIndex]=boxHeightArr[minIndex]+childArr[i].offsetHeight;
        }
    }
}*/
//最小高度的位置
function minHeightLocation(boxHeightArr,minHeight){
    for(var i in boxHeightArr){
        if (boxHeightArr[i]==minHeight){
            return i
        }

    }

}

// 以数组的方式返回怎个盒子的内容
function  cWidth(parent,contain){
    var elWidth=[];
    var allContain=parent.getElementsByTagName("*");
    for(var i=0; i<allContain.length;i++){
       if (allContain[i].className==contain){
           elWidth.push(allContain[i]);
       }
    }
    return elWidth;
}

//返回每张图片的高度
function cHeight(box,num){
    var elHeight=[];
    for(var i=0;i<box.length;i++){
       if (i<num){
           elHeight[i]=box[i].offsetHeight;
       }
    }
    return elHeight;
}