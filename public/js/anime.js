anime({
    targets: '.gym-club-img',
    duration: 1000,
    translateY: 600,
}) 
anime({
    targets: '#buttons',
    duration: 1500,
    translateX: 1000,
    easing: 'easeInOutSine',
    delay: (elm, i) => i*300
})
anime({
    targets: '.square1',
    duration: 30000,
    rotate: 360,
    easing: 'linear',
    loop: true
})
anime({
    targets: '.square2',
    duration: 20000,
    rotate: 360,
    easing: 'linear',
    loop: true
})
anime({
    targets: '.square3',
    duration: 25000,
    rotate: -360,
    easing: 'linear',
    loop: true
})  