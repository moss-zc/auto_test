// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
 start = 1;
}
function genericOnClick2(info, tab) {
 start = 0;
}

// Create one test item for each context type.


// Create a parent item and two children.
var parent1 = chrome.contextMenus.create({"title": "开始定位元素","onclick": genericOnClick});
var parent2 = chrome.contextMenus.create({"title": "结束定位元素","onclick": genericOnClick2});


var elm ='';

var elm_date ="";

var start = 0;



chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    
    if(start ==0){
      return 
    }


    if(request.msg_type=="get_elm"){
   //放数据
   if(elm=='')   {
      elm = "{"
      if(request.id!=null && request.id!=''){
        elm = elm + ":id=>\"" + request.id + '\",'
      }
   

      if(request.elm_type!=null && request.elm_type=='radio'){
        elm = elm + ":type=>\"" + request.elm_type + '\",'

         if(request.value!=null && request.value!=''){
        elm = elm + ":value=>\"" + request.value + '\",'
          }

      }else{
          if(request.type!=null && request.type!=''){
        elm = elm + ":type=>\"" + request.type + '\",'
          }
      }

      if(request.class!=null && request.class!=''){
        elm = elm + ":class=>\"" + request.class + '\",'
      }

  if(request.index!=null ){
        elm = elm + ":index=>" + request.index + ','
      }

      if(request.name!=null && request.name!=''){
        elm = elm + ":name=>\"" + request.name + '\",'
      }
      if(request.textContent!=null && request.textContent!='' && request.type != 'select'){
        elm = elm + ":text=>\"" + $.trim(request.textContent) + '\",'
      }
      elm = elm + "}"


   }else{

    var msg = {
        id: request.id,
        date:elm,
       msg_type:'set_date'
      };
      elm = '';
       sendResponse(msg);
   }
 
  }else{

 if(elm_date=='')   {
      
      if(request.textContent!=null && request.textContent!=''){
        elm_date = elm_date + "textContent:" + request.textContent + '|'
      }
      if(request.value!=null && request.value!=''){
        elm_date = elm_date + "value:" + request.value + '|'
      }


   }else{

    var msg = {
        id: request.id,
        date:elm_date,
       msg_type:'set_date'
      };
      elm_date = '';
       sendResponse(msg);
   }


  }



     
  });