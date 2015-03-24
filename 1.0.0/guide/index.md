## 综述

Popup是一个淘宝弹层动效组件示例，我们期待大家遵循统一的动效展示形式，本组件可作为一种参考。

## 初始化组件
		
    S.use('kg/effect-popup/1.0.0/index', function (S, EffectPopup) {
         var popup = new EffectPopup();
         popup.open('有一天，我们发现，做个有情怀的码农是多么重要');
    })

## API说明

* backClass: 背景层class
* backOpacity: 背景层透明度
* containerClass: 弹层容器class
* closeContent: 关闭按钮html内容
* markup: 弹层容器html内容
* speed: 动效展示速度
* modal: 是否打开模态窗口模式（点击背景层可关闭）
* width: 弹层宽度
* height: 弹层高度
* beforeOpen: 弹层打开前回调函数
* afterOpen: 弹层打开后回调函数
* beforeClose: 弹层关闭前回调函数
* afterClose: 弹层关闭后回调函数
