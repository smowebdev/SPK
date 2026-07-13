    const items = document.querySelectorAll('.timeline__wrap-item');

    let queue = [];
    let running = false;
    let lastScroll = window.scrollY;

    function playQueue() {
        if (running || queue.length === 0) return;

        running = true;

        const item = queue.shift();
        item.classList.add('active');

        setTimeout(() => {
            running = false;
            playQueue();
        }, 400);
    }

    const observer = new IntersectionObserver((entries) => {
        const scrollingUp = window.scrollY < lastScroll;

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                if (!entry.target.classList.contains('active') &&
                    !queue.includes(entry.target)
                ) {
                    queue.push(entry.target);
                    playQueue();
                }
            } else if (
                scrollingUp &&
                entry.boundingClientRect.top > 0
            ) {
                entry.target.classList.remove('active');
            }

        });

        lastScroll = window.scrollY;
    }, {
        threshold: 0.7
    });

    items.forEach(item => observer.observe(item));

    // timeline-horizontal
    const timeline = document.querySelector(".timeline-horizontal");
    const items = [...timeline.querySelectorAll(".timeline-item")];

    let index = 0;
    let lock = false;

    function goTo(i) {
        index = Math.max(0, Math.min(i, items.length - 1));

        timeline.scrollTo({
            left: items[index].offsetLeft,
            behavior: "smooth"
        });

        lock = true;
        setTimeout(() => lock = false, 500);
    }

    timeline.addEventListener("wheel", e => {

        if (lock) return;

        if (e.deltaY > 0) {

            if (index < items.length - 1) {
                e.preventDefault();
                goTo(index + 1);
            }

        } else {

            if (index > 0) {
                e.preventDefault();
                goTo(index - 1);
            }

        }

    }, { passive: false });