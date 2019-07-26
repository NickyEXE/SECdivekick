class Avatar{
    constructor(name, imageId, x, direction){
        this.name = name
        this.imageId = imageId
        this.x = x
        this.y = this.constructor.initialAvatarY
        this.direction = direction
        this.xSpeed = 0
        this.ySpeed = 0
        this.score = 0
        this.charState = "ground"
        this.constructor.all.push(this)
    }

    checkCharState(){
        // Check to see if a jumping or diving character has hit the ground, and set them to on ground state
        if (this.y >= this.constructor.initialAvatarY && (this.charState === "dive" || this.charState === "kick")){
            this.y = this.constructor.initialAvatarY
            this.charState = "ground"
            this.ySpeed = 0
            this.xSpeed = 0
        }        
        // check if they're hitting a wall
        this.checkForWallHits()
        // Need to check to see if passing wall 
        // Need to check for victory conditions
    }

    imageIdWithDirection(){
        if (!this.knockedOut()){
            return `${this.imageId}-${this.direction===1 ? "right": "left"}-facing`}
        else {
            return `${this.imageId}-${this.direction === 1 ? "left" : "right"}-kod`
        }
    }

    knockedOut(){
        return !!(this.constructor.justWon && this.constructor.lastWinner !== this.name)
    }

    checkForWallHits(){
        if (this.x < 0){
            this.x = 0
            this.xSpeed = 0
        }
        if (this.x + this.constructor.avatarWidth > this.constructor.canvas.width){
            this.x = this.constructor.canvas.width - this.constructor.avatarWidth
            this.xSpeed = 0
        }
    }

    dive(){
        if (this.charState === "ground" && !this.knockedOut()){
            this.charState = "dive"
            this.ySpeed = this.constructor.jumpInitialVelocity}
    }

    kick(){
        if ((this.charState !== "ground" && this.charState !== "kick")&& !this.knockedOut()){
            this.charState = "kick"
            this.xSpeed = this.constructor.kickXSpeed
            this.ySpeed = this.constructor.kickYSpeed
        }
        // kickback
        if (this.charState === "ground" && !this.knockedOut()){
            this.ySpeed = this.constructor.kickbackYSpeed
            this.xSpeed = this.constructor.kickbackXSpeed
            this.charState = "dive"
        }
    }

    executeMovement(){
        this.y = this.y + this.ySpeed
        this.x = this.x + (this.xSpeed*this.direction)
        if (this.charState !== "ground"){
            this.ySpeed = this.ySpeed + this.constructor.gravity
        }
        this.checkCharState()
    }

    static initializeAvatarsAndGameConstants(canvas){
        this.canvas = canvas
        this.all = []
        this.lastWinner = ""
        this.avatarWidth = 50
        this.avatarHeight = 100
        this.jumpInitialVelocity = -5
        this.kickYSpeed = 3
        this.kickXSpeed = 2.8
        this.kickbackYSpeed = -3
        this.kickbackXSpeed = -1.5
        this.gameSpeed = 2
        this.gravity = 0.02
        this.initialAvatarY = canvas.height - Avatar.avatarHeight
        this.justWon = false
    }

    static resetDefaults(){
        console.log("firing")
        this.avatarWidth = 50
        this.avatarHeight = 100
        this.jumpInitialVelocity = -5
        this.kickYSpeed = 3
        this.kickXSpeed = 2.8
        this.kickbackYSpeed = -3
        this.kickbackXSpeed = -1.5
        this.gameSpeed = 2
        this.gravity = 0.02
    }

    static round(){
        return this.all[0].score + this.all[1].score + 1
    }

    static executeCharacterMovement(){
        this.directionCheck()
        this.all.forEach(avatar => avatar.executeMovement())
        this.stateCheck()
    }

    static directionCheck(){
        // This should be refactored as an instance method
        if (!this.all[0].knockedOut()){
            if (((this.all[0].charState ==="ground") && (this.all[0].x > this.all[1].x)) && this.all[0].direction === 1){
                this.all[0].direction = -1
            }
            if (((this.all[0].charState ==="ground") && (this.all[0].x < this.all[1].x)) && this.all[0].direction === -1) {
                this.all[0].direction = 1
            }
        }

        if (!this.all[1].knockedOut()){
            if (((this.all[1].charState ==="ground") && (this.all[1].x > this.all[0].x)) && this.all[1].direction === 1){
                this.all[1].direction = -1
            }
            if (((this.all[1].charState ==="ground") && (this.all[1].x < this.all[0].x))&& (this.all[1].direction === -1)) {
                this.all[1].direction = 1
            }
        }
    }

    static stateCheck(){
        if((Math.abs(Avatar.all[0].x - Avatar.all[1].x) <= this.avatarWidth) && (Math.abs(Avatar.all[0].y - Avatar.all[1].y) <= this.avatarHeight)){
            Avatar.all[0].y < Avatar.all[1].y ? Avatar.win(Avatar.all[0]) : Avatar.win(Avatar.all[1])
        }
    }

    static win(avatar){
        if (!this.justWon){
            avatar.score += 1
            this.lastWinner = avatar.name
            this.justWon = true
            this.resetGame()
        }
        // this.resetGame()
    }

    static resetGame(){
        setTimeout(() => {
        this.justWon = false
        this.all[0].x = this.avatarWidth
        this.all.forEach(avatar => {
            avatar.xSpeed = 0
            avatar.ySpeed = 0
            avatar.y = this.initialAvatarY
        })
        this.all[1].x = this.canvas.width - (2*this.avatarWidth)
        },1000)
        
    }



}
