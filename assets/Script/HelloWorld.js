
let PhysicsSegmentCollider = require('./PhysicsSegmentCollider');

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',

        drawNode: cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
        ;
    },

    start(){
        this.node.addChild(cc.instantiate(this.drawNode));
    },

    onEnable(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onDisable(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onTouchStart(event){
        this.node.addChild(cc.instantiate(this.drawNode));
        cc.log("on touch start.");
        // let pos = event.getLocation();
        // let node = new cc.Node();
        // node.x = pos.x;
        // node.y = pos.y;
        // this.node.addChild(node);
        // this.dpoins = [];
        //
        // let g = this.g = node.addComponent(cc.Graphics);
        // pos = node.convertToNodeSpaceAR(pos);
        // g.moveTo(pos.x,pos.y);
        // g.lineWidth = 5;
        // g.strokeColor = cc.Color.WHITE;
        //
        // this.dpoins.push(cc.v2(pos.x, pos.y));

        return true;
    },

    onTouchMove(event){
        // let pos = event.getLocation();
        // pos = this.g.node.convertToNodeSpaceAR(pos);
        //
        // let lastPos = this.dpoins[this.dpoins.length-1];
        // if(this.checkIsCanDraw(lastPos, pos)){
        //     this.g.lineTo(pos.x, pos.y);
        //     this.g.stroke();
        //     this.dpoins.push(cc.v2(pos.x, pos.y));
        // }

    },

    checkIsCanDraw(lastPos, curPos){
        return cc.pDistance(lastPos, curPos) >= 10;
    },

    onTouchEnd(event){

        // this.rigibody = this.g.node.addComponent(cc.RigidBody);
        // this.physicsLine = this.g.node.addComponent(PhysicsSegmentCollider);
        // this.physicsLine.lineWidth = 5;
        // this.physicsLine.points = this.dpoins;
        // this.physicsLine.apply();
    },

    // called every frame
    update: function (dt) {

    },
});
