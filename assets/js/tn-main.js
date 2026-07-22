    const items2 = document.querySelectorAll('.timeline__wrap-item');
    if (items2) {
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

        items2.forEach(item => observer.observe(item));

    }

    // ===================== TIMELINE HORIZONTAL =====================

    const timeline = document.querySelector(".timeline-horizontal__wrap");
    const items = [...document.querySelectorAll("#timeline-horizontal .timeline-horizontal__item")];
    const fullItem = document.querySelector(".timeline-item--full");
    if (timeline && fullItem) {
        function updateFullWidth() {
            fullItem.style.minWidth = `${timeline.offsetWidth}px`;
        }

        updateFullWidth();

        window.addEventListener("resize", updateFullWidth);
        let current = document.querySelectorAll("#timeline-horizontal .timeline-horizontal__item.active").length - 1;
        if (current < 0) current = 0;

        let lock = false;
        const duration = 500;

        const isMobile = () => window.innerWidth <= 767;

        function updateActive() {
            items.forEach((item, i) => {
                item.classList.toggle("active", i <= current);
            });

            timeline.classList.toggle("show-result", current === items.length - 1);
        }

        function scrollToCurrent() {

            if (isMobile()) {

                timeline.scrollTo({
                    left: items[current].offsetLeft,
                    behavior: "smooth"
                });

            } else {

                const itemsPerView = 3;

                let left = 0;

                if (current === items.length - 1) {

                    left = items[current].offsetLeft;

                } else if (current >= itemsPerView) {

                    left = items[current - itemsPerView + 1].offsetLeft;

                }

                timeline.scrollTo({
                    left,
                    behavior: "smooth"
                });

            }

        }

        updateActive();
        scrollToCurrent();


        //======================== WHEEL ========================

        timeline.addEventListener("wheel", e => {

            if (lock) {
                e.preventDefault();
                return;
            }
            const atTop = current === 0 && e.deltaY < 0;
            const atBottom = current === items.length - 1 && e.deltaY > 0;
            if (isMobile()) {



                if (atTop || atBottom) {
                    return;
                }

            }
            if (atTop || atBottom) {
                return;
            }

            e.preventDefault();

            lock = true;

            if (e.deltaY > 0) {

                if (current < items.length - 1)
                    current++;

            } else {


                if (current > 0)
                    current--;

            }

            updateActive();
            scrollToCurrent();

            setTimeout(() => {

                lock = false;

            }, duration);

        }, {
            passive: false
        });


        //======================== TOUCH ========================

        let startX = 0;

        timeline.addEventListener("touchstart", e => {

            startX = e.touches[0].clientX;

        }, {
            passive: true
        });

        timeline.addEventListener("touchend", e => {

            if (!isMobile() || lock) return;

            const diff = startX - e.changedTouches[0].clientX;

            if (Math.abs(diff) < 40) return;

            lock = true;

            if (diff > 0) {

                if (current < items.length - 1)
                    current++;

            } else {

                if (current > 0)
                    current--;

            }

            updateActive();
            scrollToCurrent();

            setTimeout(() => {

                lock = false;

            }, duration);

        }, {
            passive: true
        });


        //======================== DRAG DESKTOP ========================

        let isDown = false;
        let dragStart = 0;
        let dragScroll = 0;

        timeline.addEventListener("mousedown", e => {

            if (isMobile()) return;

            isDown = true;

            timeline.classList.add("dragging");

            dragStart = e.pageX;

            dragScroll = timeline.scrollLeft;

        });

        window.addEventListener("mouseup", snap);

        timeline.addEventListener("mouseleave", snap);

        timeline.addEventListener("mousemove", e => {

            if (!isDown || isMobile()) return;

            e.preventDefault();

            timeline.scrollLeft = dragScroll - (e.pageX - dragStart);

        });

        function snap() {

            if (!isDown) return;

            isDown = false;

            timeline.classList.remove("dragging");

            let closest = 0;

            let min = Infinity;

            const center = timeline.scrollLeft + timeline.clientWidth / 2;

            items.forEach((item, i) => {

                const c = item.offsetLeft + item.offsetWidth / 2;

                const d = Math.abs(center - c);

                if (d < min) {

                    min = d;

                    closest = i;

                }

            });

            current = closest;

            updateActive();

            scrollToCurrent();

        }
    }

    $(".document-process__tab").on("click", function() {
        var target = $(this).data("programme");

        // Active tab
        $(".document-process__tab")
            .removeClass("process__tab--active")
            .attr("aria-selected", "false");

        $(this)
            .addClass("process__tab--active")
            .attr("aria-selected", "true");

        $(".timeline__list").hide();
        $("#" + target).show();
    });