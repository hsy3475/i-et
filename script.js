(function () {
  "use strict";

  // Mobile menu toggle
  var toggle = document.getElementById("menu-toggle");
  var panel = document.getElementById("menu-panel");
  toggle.addEventListener("click", function () {
    var open = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  panel.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // 검색창 오버레이 열기/닫기 ⭐ 추가
  var searchOpen = document.getElementById("search-open");
  var searchOverlay = document.getElementById("search-overlay");
  var searchClose = document.getElementById("search-close");
  var searchForm = document.getElementById("search-form");
  var searchInput = document.getElementById("search-input");

  function openSearch() {
    searchOverlay.classList.add("open");
    searchOverlay.setAttribute("aria-hidden", "false");
    searchOpen.setAttribute("aria-expanded", "true");
    document.body.classList.add("search-lock");
    // 애니메이션 끝나고 입력창에 바로 커서
    setTimeout(function () {
      searchInput.focus();
    }, 300);
  }

  function closeSearch() {
    searchOverlay.classList.remove("open");
    searchOverlay.setAttribute("aria-hidden", "true");
    searchOpen.setAttribute("aria-expanded", "false");
    document.body.classList.remove("search-lock");
    searchOpen.focus();
  }

  searchOpen.addEventListener("click", openSearch);
  searchClose.addEventListener("click", closeSearch);

  // 어두운 배경 클릭하면 닫기 (입력창 클릭은 제외)
  searchOverlay.addEventListener("click", function (e) {
    if (e.target === searchOverlay) closeSearch();
  });

  // ESC 키로 닫기
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && searchOverlay.classList.contains("open")) {
      closeSearch();
    }
  });

  // 검색 실행 (지금은 새로고침만 막아둠, 검색 페이지 생기면 여기서 이동)
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var keyword = searchInput.value.trim();
    if (!keyword) {
      searchInput.focus();
      return;
    }
    // 예) location.href = "search.html?q=" + encodeURIComponent(keyword);
  });

  // 웰컴 쿠폰 발급 모달 ⭐ 추가
  var couponBtn = document.getElementById("coupon-btn");
  var couponModal = document.getElementById("coupon-modal");
  var couponClose = document.getElementById("coupon-close");
  var couponOk = document.getElementById("coupon-ok");
  var couponTitle = document.getElementById("coupon-title");
  var couponIssued = false; // 한 번 발급받았는지 체크

  function openCoupon() {
    // 두 번째 클릭부터는 이미 발급됐다고 안내
    couponTitle.textContent = couponIssued
      ? "이미 발급된 쿠폰이에요!"
      : "쿠폰이 발급되었습니다!";
    couponIssued = true;
    couponModal.classList.add("open");
    couponModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("search-lock"); // 뒤 페이지 스크롤 막기 (검색창 클래스 재사용)
    setTimeout(function () {
      couponOk.focus();
    }, 300);
  }

  function closeCoupon() {
    couponModal.classList.remove("open");
    couponModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("search-lock");
    couponBtn.focus();
  }

  couponBtn.addEventListener("click", openCoupon);
  couponClose.addEventListener("click", closeCoupon);
  couponOk.addEventListener("click", closeCoupon);

  // 어두운 배경 클릭하면 닫기 (흰 박스 클릭은 제외)
  couponModal.addEventListener("click", function (e) {
    if (e.target === couponModal) closeCoupon();
  });

  // ESC 키로 닫기
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && couponModal.classList.contains("open")) {
      closeCoupon();
    }
  });

  // Active nav link on scroll
  var sections = ["about", "products", "wellness", "community"].map(
    function (id) {
      return document.getElementById(id);
    },
  );
  var navLinks = document.querySelectorAll(".nav-links a");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (a) {
              a.classList.toggle(
                "active",
                a.getAttribute("href") === "#" + entry.target.id,
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach(function (s) {
      if (s) obs.observe(s);
    });
  }

  // Product data + tabs
  var products = [
    {
      id: "garcinia",
      tab: "가르시니아 900",
      tags: ["#매일2정", "#가르시니아777mg", "#체지방CUT"],
      name: "Calori-et 가르시니아 900",
      desc: "까다롭게 고른 가르시니아 캄보지아 추출물로 매일의 루틴에 가볍게 더하는 웰니스 케어.",
      price: "32,000원",
      old: "40,000원",
      visual: "linear-gradient(150deg,#ed6618,#FFFFFF)",
      img: "bottle3.png", // 수정 ⭐ 제품 이미지 경로
      link: "#", // 수정 ⭐ 이미지 클릭 시 이동할 주소
    },
    {
      id: "collagen",
      tab: "콜라겐 밸런스",
      tags: ["#매일1포", "#저분자콜라겐", "#피부탄력"],
      name: "Calori-et 콜라겐 밸런스",
      desc: "저분자 피쉬 콜라겐과 비타민C를 더해 매일 마시는 피부 탄력 밸런스.",
      price: "29,000원",
      old: "36,000원",
      visual: "linear-gradient(150deg,#5558eb,#FFFFFF)",
      img: "bottle4.png", // 수정 ⭐
      link: "#", // 수정 ⭐
    },
    {
      id: "detox",
      tab: "그린 디톡스",
      tags: ["#매일1스틱", "#식이섬유", "#가벼운속"],
      name: "Calori-et 그린 디톡스",
      desc: "클로렐라와 식이섬유를 담아 속이 편안한 하루를 만드는 그린 디톡스.",
      price: "27,000원",
      old: "34,000원",
      visual: "linear-gradient(150deg,#63b063,#FFFFFF)",
      img: "bottle5.png", // 수정 ⭐
      link: "#", // 수정 ⭐
    },
  ];

  var tabsEl = document.getElementById("tabs");
  var cardEl = document.getElementById("prod-card");

  function renderCard(p) {
    cardEl.innerHTML =
      '<div class="prod-visual" style="background:' +
      p.visual +
      ';">' +
      // 수정 ⭐ 병 플레이스홀더 ➡️ a + img 태그로 교체
      '<a href="' +
      p.link +
      '" class="prod-link">' +
      '<img class="prod-img" src="' +
      p.img +
      '" alt="' +
      p.name +
      '" loading="lazy" />' +
      "</a>" +
      "</div>" +
      '<div class="prod-info">' +
      '<div class="tags">' +
      p.tags
        .map(function (t) {
          return '<span class="tag">' + t + "</span>";
        })
        .join("") +
      "</div>" +
      "<h3>" +
      p.name +
      "</h3>" +
      '<p class="desc">' +
      p.desc +
      "</p>" +
      '<div class="price-row"><span class="price">' +
      p.price +
      '</span><span class="price-old">' +
      p.old +
      "</span></div>" +
      '<div class="prod-actions">' +
      // 수정 ⭐ button ➡️ a 태그로 교체 (새 탭으로 상세페이지 열기)
      '<a class="btn btn-primary" href="detail.html?id=' +
      p.id +
      '" target="_blank" rel="noopener">자세히 보기</a>' +
      '<button class="btn btn-outline" aria-label="장바구니에 담기">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L22 7H6"></path><circle cx="9" cy="21" r="1.4"></circle><circle cx="18" cy="21" r="1.4"></circle></svg>' +
      "</button>" +
      "</div>" +
      "</div>";
  }

  function renderTabs(activeId) {
    tabsEl.innerHTML = products
      .map(function (p) {
        return (
          '<button class="tab" role="tab" data-id="' +
          p.id +
          '" aria-selected="' +
          (p.id === activeId) +
          '">' +
          p.tab +
          "</button>"
        );
      })
      .join("");
    tabsEl.querySelectorAll(".tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        renderTabs(id);
        renderCard(
          products.filter(function (p) {
            return p.id === id;
          })[0],
        );
      });
    });
  }

  renderTabs(products[0].id);
  renderCard(products[0]);

  // Reviews
  var reviews = [
    {
      text: "억지로 참는 다이어트가 아니라 자연스럽게 습관이 됐어요. 속이 편안해요!",
      name: "이**님",
      bg: "linear-gradient(150deg,#F4CDA0,#FBE6CB)",
      img: "04.png", // 추가 ⭐ 후기 이미지 경로
    },
    {
      text: "매일 2정씩 챙기기 정말 간편하고, 무엇보다 부담 없는 사이즈가 좋아요.",
      name: "박**님",
      bg: "linear-gradient(150deg,#DCE1F5,#B9C4EE)",
      img: "08.png", // 추가 ⭐ 후기 이미지 경로
    },
    {
      text: "패키지 디자인도 예쁘고 선물하기에도 좋았어요. 재구매 의사 있습니다.",
      name: "최**님",
      bg: "linear-gradient(150deg,#F7DDBC,#F4CDA0)",
      img: "06.png", // 추가 ⭐ 후기 이미지 경로
    },
    {
      text: "가벼운 몸과 마음, 두 가지를 다 챙기는 느낌이라 만족스러워요.",
      name: "정**님",
      bg: "linear-gradient(150deg,#FBE6CB,#FFFFFF)",
      img: "07.png", // 추가 ⭐ 후기 이미지 경로
    },
    {
      text: "맛과 향이 부담스럽지 않아서 꾸준히 먹기 좋아요.",
      name: "한**님",
      bg: "linear-gradient(150deg,#DCE1F5,#FFFFFF)",
      img: "05.png", // 추가 ⭐ 후기 이미지 경로
    },
  ];
  var track = document.getElementById("review-track");
  track.innerHTML = reviews
    .map(function (r) {
      return (
        '<div class="review-card">' +
        // 수정 ⭐ 그라디언트 div ➡️ img 태그로 교체 (bg는 이미지 로딩 전 배경색으로 사용)
        '<img class="review-swatch" src="' +
        r.img +
        '" alt="' +
        r.name +
        ' 후기 이미지" loading="lazy" style="background:' +
        r.bg +
        ';" />' +
        '<div class="stars">★★★★★</div>' +
        '<p class="review-text">' +
        r.text +
        "</p>" +
        '<span class="review-name">' +
        r.name +
        "</span>" +
        "</div>"
      );
    })
    .join("");

  // 스크롤 페이드인 효과 (내렸다 올렸다 할 때마다 반복)
  var fadeTargets = document.querySelectorAll(
    ".phil-card, .prod-head, .prod-card, .mag-card, .review-card, .section-head",
  );
  fadeTargets.forEach(function (el) {
    el.classList.add("fade-in");
  });

  if ("IntersectionObserver" in window) {
    var fadeObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    fadeTargets.forEach(function (el) {
      fadeObs.observe(el);
    });
  } else {
    fadeTargets.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // 병 이미지 확대 강조 효과 ⭐ 추가 (진입 시 + 스크롤 내렸다 올릴 때마다 반복)
  var bottleImg = document.querySelector(".bottle img");
  if (bottleImg) {
    bottleImg.classList.add("img-zoom");
    if ("IntersectionObserver" in window) {
      var zoomObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            entry.target.classList.toggle("zoomed", entry.isIntersecting);
          });
        },
        { threshold: 0.2 },
      );
      zoomObs.observe(bottleImg);
    } else {
      bottleImg.classList.add("zoomed");
    }
  }
})();