document.addEventListener("DOMContentLoaded", () => {
    canvas = createCanvas()

    Avatar.initializeAvatars(canvas)
    const nicky = new Avatar("nicky", "nicky", canvas.width - (2*Avatar.avatarWidth), -1)
    const gracie = new Avatar("gracie", "gracie", Avatar.avatarWidth, 1)

    function renderer(){
        Avatar.executeCharacterMovement()
        const canvas = createCanvas()
        const ctx = canvas.getContext('2d');
        ctx.drawImage(document.getElementById(gracie.imageIdWithDirection()), gracie.x, gracie.y, Avatar.avatarWidth, Avatar.avatarHeight);
        ctx.drawImage(document.getElementById(nicky.imageIdWithDirection()), nicky.x, nicky.y, Avatar.avatarWidth, Avatar.avatarHeight)
    }
    renderer()

    function handleKeyPress(e){
        switch (e.key){
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