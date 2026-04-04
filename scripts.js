const cur = document.getElementById("cur")
const curR = document.getElementById("cur-r")
let mx = 0,
    my = 0,
    rx = 0,
    ry = 0

document.addEventListener("mousemove", (e) => {
    mx = e.clientX
    my = e.clientY
    cur.style.left = mx + "px"
    cur.style.top = my + "px"
})

;(function tick() {
    rx += (mx - rx) * 0.12
    ry += (my - ry) * 0.12
    curR.style.left = rx + "px"
    curR.style.top = ry + "px"
    requestAnimationFrame(tick)
})()

document.querySelectorAll("a,button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
        cur.style.width = "10px"
        cur.style.height = "10px"
        curR.style.width = "44px"
        curR.style.height = "44px"
        curR.style.opacity = "0.25"
    })
    el.addEventListener("mouseleave", () => {
        cur.style.width = "6px"
        cur.style.height = "6px"
        curR.style.width = "28px"
        curR.style.height = "28px"
        curR.style.opacity = "0.4"
    })
})

const obs = new IntersectionObserver(
    (entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) setTimeout(() => e.target.classList.add("visible"), i * 70)
        })
    },
    { threshold: 0.1 },
)

document.querySelectorAll(".reveal").forEach((el) => obs.observe(el))
