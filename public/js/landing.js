const login = document.querySelector('.login')
const signup = document.querySelector('.signUp')
const guest = document.querySelector('.guest')
const landingPage = document.querySelector('.container')
const loginPage = document.querySelector('.formContainer')
const signUpPage = document.querySelector('.formContainer1')
const cancel = document.querySelector('.cancel')
const cancel2 = document.querySelector('.cancel2')


login.addEventListener('click', () => {
    landingPage.style.display = "none"
    signUpPage.style.display= "none"
    loginPage.style.display = "flex"
})

signup.addEventListener('click', () => {
    landingPage.style.display = "none"
    signUpPage.style.display= "flex"
    loginPage.style.display = "none"
})

guest.addEventListener('click', () => {
    // something
})

cancel.addEventListener('click', () => {
    landingPage.style.display = "flex"
    signUpPage.style.display= "none"
    loginPage.style.display = "none"
})

cancel2.addEventListener('click', () => {
    landingPage.style.display = "flex"
    signUpPage.style.display= "none"
    loginPage.style.display = "none"
})
