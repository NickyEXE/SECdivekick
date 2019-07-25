document.addEventListener("DOMContentLoaded", () => {
    canvas = createCanvas()

    Avatar.initializeAvatars(canvas)
    const gracie = new Avatar("Gracie", "gracie", Avatar.avatarWidth, 1)
    const nicky = new Avatar("Nicky", "nicky", canvas.width - (2*Avatar.avatarWidth), -1)
    

    function renderer(){
        Avatar.executeCharacterMovement()
        const canvas = createCanvas()
        const ctx = canvas.getContext('2d');
        ctx.drawImage(document.getElementById(gracie.imageIdWithDirection()), gracie.x, gracie.y, Avatar.avatarWidth, Avatar.avatarHeight);
        ctx.drawImage(document.getElementById(nicky.imageIdWithDirection()), nicky.x, nicky.y, Avatar.avatarWidth, Avatar.avatarHeight)
        ctx.font = "24px Comic Sans MS"
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(`${gracie.name} - ${gracie.score}`, 100, 40)
        ctx.fillText(`${nicky.name} - ${nicky.score}`, canvas.width - 100, 40)
        ctx.fillStyle = "yellow";
        ctx.fillText(`Round ${Avatar.round}`, canvas.width/2, 40)

        Avatar.justWon && ctx.fillText(`${Avatar.lastWinner.toUpperCase()} WINS`, canvas.width/2, canvas.height/2)
        // ctx.fillText("Hello World", 100, 30)
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