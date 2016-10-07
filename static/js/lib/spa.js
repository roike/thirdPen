/*
 * third-pen spa.js
 * Root namespace module
*/

/*jslint           browser : true,   continue : true,
  devel  : true,    indent : 2,       maxerr  : 50,
  newcap : true,     nomen : true,   plusplus : true,
  regexp : true,    sloppy : true,       vars : false,
  white  : true
*/
/*global spa */

const spa = (() => {
  'use strict';
  const initModule = () => {
    //window.dispatchEvent(new Event('popstate'))をshellとmodelの
    //どちらでinitしているかで順序がかわる
    //通常はshellにおくがthird-penでは再認証をかけるタイミングで
    //modelにあるので、modelを後順位にした
    spa.shell.initModule();
    spa.model.initModule();
  };
  
  return { initModule: initModule };
})();
