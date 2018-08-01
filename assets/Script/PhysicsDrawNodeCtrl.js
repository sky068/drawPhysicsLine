/**
 * Created by skyxu on 2018/8/1.
 * 绘图节点（绘制线段）， 同时添加物理特性
 */

"use strict";

let PhysicsSegmentCollider = require('./PhysicsSegmentCollider');

cc.Class({
    extends: cc.Component,

    properties: {
        visualPath: cc.Graphics,
        lineWidth: 5,
        minLen: 5,     // 物理线段最小长度, 太小创建的线段太多计算量太大
    },

    onLoad(){
        this.path = this.node.getComponent(cc.Graphics);
        this.path.lineWidth = this.visualPath.lineWidth = this.lineWidth;
        this.touchPoints = [];
    },

    onEnable(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancle, this);
    },

    onDisable(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancle, this);
    },

    start(){

    },

    touchStart(event){
        cc.log('pDrawNode touch start');

        let touchPos = event.getLocation();
        touchPos = this.node.convertToNodeSpaceAR(touchPos);
        this.touchPoints.push(cc.p(touchPos.x, touchPos.y));
        this.path.moveTo(touchPos.x, touchPos.y);

        return true;
    },

    touchMove(event){
        cc.log('pDrawNode touch move');
        let touchPos = event.getLocation();
        touchPos = this.node.convertToNodeSpaceAR(touchPos);
        let lastPos = this.touchPoints[this.touchPoints.length - 1];
        if (this.checkIsCanDraw(lastPos, touchPos)){
            // 射线检测
            let result = cc.director.getPhysicsManager().rayCast(lastPos, touchPos, cc.RayCastType.All);
            if (result.length <= 0){
                this.touchPoints.push(cc.p(touchPos.x, touchPos.y));
                this.path.lineTo(touchPos.x, touchPos.y);
                this.path.stroke();
            } else {
                this.visualPath.clear();
                this.visualPath.moveTo(lastPos.x, lastPos.y);
                this.visualPath.lineTo(touchPos.x, touchPos.y);
                this.visualPath.stroke();
            }
        }
    },

    touchEnd(event){
        cc.log('pDrawNode touch end');
        this.visualPath.clear();
        this.createRigidBody();
    },

    touchCancle(event){
        cc.log('pDrawNode touch cancle');
        this.createRigidBody();
    },

    createRigidBody(){
        this.rigidBody = this.node.addComponent(cc.RigidBody);
        this.physicsSegment = this.node.addComponent(PhysicsSegmentCollider);
        this.physicsSegment.points = this.touchPoints;
        this.physicsSegment.apply();
    },

    checkIsCanDraw(lastPoint, curPoint){
        return cc.pDistance(lastPoint, curPoint) >= this.minLen;
    }
});
