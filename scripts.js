// Cursor: cache elements and track pointer/ring positions
const cur = document.getElementById("cur")
const curR = document.getElementById("cur-r")
let mx = 0,
    my = 0,
    rx = 0,
    ry = 0

// Cursor dot follows the mouse directly
document.addEventListener("mousemove", (e) => {
    mx = e.clientX
    my = e.clientY
    cur.style.left = mx + "px"
    cur.style.top = my + "px"
})

// Cursor ring eases toward the mouse for a trailing effect
;(function tick() {
    rx += (mx - rx) * 0.12
    ry += (my - ry) * 0.12
    curR.style.left = rx + "px"
    curR.style.top = ry + "px"
    requestAnimationFrame(tick)
})()

// Interactive hover feedback for links and buttons
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

// Reveal animation: adds .visible when elements enter viewport
const obs = new IntersectionObserver(
    (entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) setTimeout(() => e.target.classList.add("visible"), i * 70)
        })
    },
    { threshold: 0.1 },
)

document.querySelectorAll(".reveal").forEach((el) => obs.observe(el))

// Work section accordion: expand selected project and collapse others
function toggleProject(element) {
    const container = element.parentElement
    const details = container.querySelector(".project-details")
    const isOpening = !element.classList.contains("active")

    // Close any currently open project first (single-open accordion behavior)
    document.querySelectorAll(".project-item").forEach((item) => {
        item.classList.remove("active")
        item.parentElement.querySelector(".project-details").style.maxHeight = null
    })

    if (isOpening) {
        element.classList.add("active")
        details.style.maxHeight = details.scrollHeight + "px"
    }
}
