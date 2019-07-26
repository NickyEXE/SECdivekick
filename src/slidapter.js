const slidapter = {
    "gravity": (value) => Avatar.gravity = value/1000,
    "jumpInitialVelocity": (value) => Avatar.jumpInitialVelocity = parseInt(value),
    "kickYSpeed": (value) => Avatar.kickYSpeed = parseInt(value),
    "kickXSpeed": (value) => Avatar.kickXSpeed = parseInt(value),
    "kickbackYSpeed": (value) => Avatar.kickbackYSpeed = parseInt(value),
    "kickbackXSpeed": (value) => Avatar.kickbackXSpeed = parseInt(value),
    "avatarHeight": (value) => {
        Avatar.all.forEach(avatar => avatar.y = avatar.y - (parseInt(value) - Avatar.avatarHeight))
        Avatar.initialAvatarY = canvas.height - parseInt(value)
        Avatar.avatarHeight = parseInt(value)},
    "avatarWidth": (value) => Avatar.avatarWidth = parseInt(value)
}