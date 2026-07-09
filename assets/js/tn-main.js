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