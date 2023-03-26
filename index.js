const emailInput = {
    element: document.querySelector("#email"),
    checkEntry: function() {
        this.element.value.trim()
        if (this.element.value === "")
            return false
        else if (this.element.value.includes("@"))
            return true
    },
    doAlert: function() {
        this.element.style.animation = "alert 0.5s ease backwards"

        this.element.addEventListener("animationend", () => {
            this.element.removeAttribute("style")
        })
    },
    clearInput: function() {
        this.element.value = ""
    }
}

const button = {
    element: document.querySelector("#submitButton"),
    submit: function() {
        if (emailInput.checkEntry()) {
            modal.toggleVisibility(true)
            modal.autoClose()
        }
        else {
            emailInput.doAlert()
        }
    }
}

const modal = {
    element: document.querySelector("#modal"),
    backdrop: document.querySelector("#backdrop"),
    wrapper: document.querySelector("#modalWrapper"),
    timeout: undefined,
    duration: 1000 * 3,
    toggleVisibility: function(state) {
        if (state) {
            document.body.style.overflow = "hidden"
            this.wrapper.classList.add("open")
            this.element.setAttribute("open", "")
            this.backdrop.style.animation = "opacityIn 0.5s ease backwards"
            this.element.style.animation = "riseIn 0.5s ease backwards"
        }
        else {
            this.element.style.animation = "riseOut 0.5s ease backwards"

            this.element.addEventListener("animationend", ({ animationName }) => {
                if (animationName === "riseOut") {
                    this.element.removeAttribute("open")

                    this.backdrop.style.animation = "opacityOut 0.5s ease backwards"
                    this.backdrop.addEventListener("animationend", ({ animationName }) => {

                        if (animationName === "opacityOut") {
                            this.wrapper.classList.remove("open")
                            document.body.style.overflow = "auto"
                        }
                    })
                }
            })
        }
    },
    autoClose: function() {
        this.timeout = setTimeout(() => {
            this.toggleVisibility(false)
            emailInput.clearInput()
            clearTimeout(this.timeout)
        }, this.duration)
    }
}

button.element.onclick = ev => {
    ev.preventDefault()
    button.submit()
}