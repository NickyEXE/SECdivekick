document.addEventListener("DOMContentLoaded", () => {
    canvas = createCanvas()

    Avatar.initializeAvatars(canvas)
    const gracie = new Avatar("Gracie", "gracie", Avatar.avatarWidth, 1)
    const nicky = new Avatar("Nicky", "nicky", canvas.width - (2*Avatar.avatarWidth), -1)
    // canvas.width = 1000
    //     canvas.height = 800

    function renderer(){
        Avatar.executeCharacterMovement()
        const canvas = createCanvas()
        const ctx = canvas.getContext('2d');
        drawImage(ctx, gracie)
        drawImage(ctx, nicky)
        ctx.font = "24px Comic Sans MS"
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(`SEC SIMULATOR`, canvas.width/2, 30)    
        ctx.fillText(`${gracie.name} - ${gracie.score}`, 100, 80)
        ctx.fillText(`${nicky.name} - ${nicky.score}`, canvas.width - 100, 80)
        ctx.fillStyle = "yellow";
        ctx.fillText(`Round ${Avatar.round()}`, canvas.width/2, 80)

        Avatar.justWon && ctx.fillText(`${Avatar.lastWinner.toUpperCase()} WINS`, canvas.width/2, canvas.height/2)
        // ctx.fillText("Hello World", 100, 30)
    }

    function drawImage(ctx, avatar){
        // if(Avatar.justWon){
        //     debugger
        // }

        !!avatar.knockedOut() ? ctx.drawImage(document.getElementById(avatar.imageIdWithDirection()), avatar.x, canvas.height-Avatar.avatarWidth, Avatar.avatarHeight, Avatar.avatarWidth) : ctx.drawImage(document.getElementById(avatar.imageIdWithDirection()), avatar.x, avatar.y, Avatar.avatarWidth, Avatar.avatarHeight)
    }

    renderer()

    function handleKeyPress(e){
        switch (e.key.toLowerCase()){
            case "a":
                gracie.dive()
                break;
            case "s":
                gracie.kick()
                break;
            case "k":
                nicky.dive()
                break;
            case "l":
                nicky.kick()
                break;
            default:
                break;
        }
    }

    document.addEventListener("keydown", handleKeyPress)
    
    setInterval(renderer, 1)
    

})