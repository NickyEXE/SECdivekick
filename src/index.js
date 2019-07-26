document.addEventListener("DOMContentLoaded", () => {
    canvas = createCanvas()

    Avatar.initializeAvatarsAndGameConstants(canvas)
    const gracie = new Avatar("Gracie", "gracie", Avatar.avatarWidth, 1)
    const nicky = new Avatar("Nicky", "nicky", canvas.width - (2*Avatar.avatarWidth), -1)
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
    }

    function drawImage(ctx, avatar){
        !!avatar.knockedOut() ? ctx.drawImage(document.getElementById(avatar.imageIdWithDirection()), avatar.x, canvas.height-Avatar.avatarWidth, Avatar.avatarHeight, Avatar.avatarWidth) : ctx.drawImage(document.getElementById(avatar.imageIdWithDirection()), avatar.x, avatar.y, Avatar.avatarWidth, Avatar.avatarHeight)
    }

    renderer()

    const pressedKeys = {
        "a": {pressed: false, 
            func: () => gracie.dive()},
        "s": {pressed: false, 
            func: () => gracie.kick()},
        "k": {pressed: false, 
            func: () => nicky.dive()},
        "l": {pressed: false, 
            func: () => nicky.kick()}
        }


    function handleKeyDown(e){
        if (pressedKeys[e.key]){
        pressedKeys[e.key].pressed = true
        // debugger
        // pressedKeys.forEach(key => key.pressed && key.func())}
        Object.keys(pressedKeys).forEach(key => pressedKeys[key].pressed ===true && pressedKeys[key].func())}
    }

    function handleKeyUp(e){
        if (pressedKeys[e.key]){
        pressedKeys[e.key].pressed = false
        Object.keys(pressedKeys).forEach(key => pressedKeys[key].pressed ===true && pressedKeys[key].func())
        }
    }

    function handleSlider(e){
        slidapter[e.target.id](e.target.value)
    }

    function resetDefaults(){
        Object.keys(defaultValueSet).forEach(key => document.getElementById(key).value = defaultValueSet[key])
        Avatar.resetDefaults()
        Avatar.all.forEach(avatar => avatar.y = Avatar.initialAvatarY)
    }

    defaultValueSet = {
        "gravity": Avatar.gravity*1000,
        "jumpInitialVelocity": Avatar.jumpInitialVelocity*-1,
        "kickYSpeed": Avatar.kickYSpeed,
        "kickXSpeed": Avatar.kickXSpeed,
        "kickbackYSpeed": Avatar.kickbackYSpeed*-1,
        "kickbackXSpeed": Avatar.kickbackXSpeed*10,
        "avatarWidth": Avatar.avatarWidth,
        "avatarHeight": Avatar.avatarHeight
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    document.getElementById("sliders").addEventListener("change", handleSlider)
    document.getElementById("reset-defaults").addEventListener("click", resetDefaults)
    
    setInterval(renderer, Avatar.gameSpeed)
    

})