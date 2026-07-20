    const items2 = document.querySelectorAll('.timeline__wrap-item');

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

    // // timeline-horizontal
    // const timeline = document.querySelector('#timeline-horizontal');
    // const items2 = [...timeline.querySelectorAll('.timeline-horizontal__item')];

    // let current = -1;
    // let lock = false;

    // const itemsPerView = window.innerWidth <= 767 ? 1 : 3;;
    // const duration = 500;

    // timeline.addEventListener('wheel', function(e) {

    //     if (lock) {
    //         e.preventDefault();
    //         return;
    //     }

    //     if (e.deltaY > 0) {

    //         if (current < items2.length - 1) {

    //             e.preventDefault();
    //             lock = true;

    //             current++;
    //             items2[current].classList.add('active');

    //             if (current === items2.length - 1) {

    //                 timeline.scrollTo({
    //                     left: items2[current].offsetLeft,
    //                     behavior: 'smooth'
    //                 });

    //                 setTimeout(() => {
    //                     timeline.classList.add('show-result');
    //                     lock = false;
    //                 }, 100);

    //                 return;
    //             }

    //             // if (current >= itemsPerView) {

    //             //     timeline.scrollTo({
    //             //         left: items2[current - itemsPerView + 1].offsetLeft,
    //             //         behavior: 'smooth'
    //             //     });

    //             // }

    //             if (current >= itemsPerView) {
    //                 timeline.scrollTo({
    //                     left: items2[current - itemsPerView + 1].offsetLeft,
    //                     behavior: 'smooth'
    //                 });
    //             }
    //             setTimeout(() => {
    //                 lock = false;
    //             }, duration);
    //         }

    //     } else {

    //         if (current >= 0) {

    //             e.preventDefault();
    //             lock = true;

    //             if (current === items2.length - 1) {

    //                 timeline.classList.remove('show-result');

    //                 items2[current].classList.remove('active');
    //                 current--;

    //                 const firstVisible = Math.max(0, current - itemsPerView + 1);

    //                 const left =
    //                     timeline.scrollLeft +
    //                     items2[firstVisible].getBoundingClientRect().left -
    //                     timeline.getBoundingClientRect().left;

    //                 timeline.scrollTo({
    //                     left,
    //                     behavior: 'smooth'
    //                 });

    //                 setTimeout(() => {
    //                     lock = false;
    //                 }, duration);

    //                 return;
    //             }
    //             items2[current].classList.remove('active');
    //             current--;

    //             if (current >= itemsPerView - 1) {

    //                 timeline.scrollTo({
    //                     left: items2[current - itemsPerView + 2].offsetLeft,
    //                     behavior: 'smooth'
    //                 });

    //             } else {

    //                 timeline.scrollTo({
    //                     left: 0,
    //                     behavior: 'smooth'
    //                 });

    //             }

    //             setTimeout(() => {
    //                 lock = false;
    //             }, duration);
    //         }

    //     }

    // }, {
    //     passive: false
    // });



    // let dragIsDown = false;
    // let dragStartX = 0;
    // let dragStartScroll = 0;
    // let dragVelocity = 0;
    // let dragLastX = 0;
    // let dragLastTime = 0;
    // let dragRafId = null;


    // // ===================== DRAG =====================
    // timeline.addEventListener('mousedown', (e) => {
    //     cancelAnimationFrame(dragRafId);
    //     dragIsDown = true;
    //     timeline.classList.add('dragging');

    //     dragStartX = dragLastX = e.pageX;
    //     dragStartScroll = timeline.scrollLeft;
    //     dragVelocity = 0;
    //     dragLastTime = Date.now();
    // });

    // timeline.addEventListener('mousemove', (e) => {
    //     if (!dragIsDown) return;
    //     e.preventDefault();

    //     const x = e.pageX;
    //     const now = Date.now();
    //     const dt = Math.max(now - dragLastTime, 10);

    //     const delta = x - dragLastX;
    //     timeline.scrollLeft -= delta * 2.1;

    //     dragVelocity = -delta / dt * 20;

    //     dragLastX = x;
    //     dragLastTime = now;
    // });

    // const dragEnd = () => {
    //     if (!dragIsDown) return;
    //     dragIsDown = false;
    //     timeline.classList.remove('dragging');

    //     if (Math.abs(dragVelocity) > 1.5) {
    //         dragMomentum();
    //     } else {
    //         dragSnapToNearest();
    //     }
    // };

    // window.addEventListener('mouseup', dragEnd);
    // timeline.addEventListener('mouseleave', dragEnd);

    // // Momentum
    // function dragMomentum() {
    //     let vel = dragVelocity;
    //     const animate = () => {
    //         if (Math.abs(vel) < 0.35) {
    //             dragSnapToNearest();
    //             return;
    //         }
    //         timeline.scrollLeft += vel;
    //         vel *= 0.905;
    //         dragRafId = requestAnimationFrame(animate);
    //     };
    //     dragRafId = requestAnimationFrame(animate);
    // }

    // function dragSnapToNearest() {
    //     if (!items2.length) return;

    //     const scrollPos = timeline.scrollLeft;
    //     const containerWidth = timeline.clientWidth;
    //     let closest = 0;
    //     let minDist = Infinity;

    //     items2.forEach((item, idx) => {
    //         const itemLeft = item.offsetLeft;
    //         const itemCenter = itemLeft + item.offsetWidth / 2;
    //         const scrollCenter = scrollPos + containerWidth / 2;

    //         const distance = Math.abs(itemCenter - scrollCenter); 

    //         if (distance < minDist) {
    //             minDist = distance;
    //             closest = idx;
    //         }
    //     });

    //     if (scrollPos + containerWidth > timeline.scrollWidth - 100) {
    //         closest = items2.length - 1;
    //     }

    //     const draggedDist = Math.abs(scrollPos - dragStartScroll);
    //     if (draggedDist < 80 && current !== -1) {
    //         closest = current;
    //     }

    //     current = closest;

    //     items2.forEach((item, i) => {
    //         item.classList.toggle('active', i <= current);
    //     });

    //     if (current === items2.length - 1) {
    //         timeline.classList.add('show-result');
    //     } else {
    //         timeline.classList.remove('show-result');
    //     }

    //     let target = 0;

    //     if (current === items2.length - 1) {

    //         target = items2[current].offsetLeft;

    //     } else if (current >= itemsPerView) {

    //         target = items2[current - itemsPerView + 1].offsetLeft;

    //     }

    //     timeline.scrollTo({
    //         left: target,
    //         behavior: 'smooth'
    //     });
    // }
    // timeline-horizontal
    // ===================== TIMELINE HORIZONTAL =====================

    const timeline = document.querySelector(".timeline-horizontal__wrap");
    const items = [...document.querySelectorAll("#timeline-horizontal .timeline-horizontal__item")];
    const fullItem = document.querySelector(".timeline-item--full");

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

        if (isMobile()) {

            const atTop = current === 0 && e.deltaY < 0;
            const atBottom = current === items.length - 1 && e.deltaY > 0;

            if (atTop || atBottom) {
                return;
            }

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