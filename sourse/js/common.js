let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";

		// Fancybox.bind(link , {
				// arrows: false,
				// infobar: false,
				// touch: false,
				// type: 'inline',
				// autoFocus: false,
				// keyboard: {
				// 		CLOSE: "Закрыть",
				// 		NEXT: "Вперед",
				// 		PREV: "Назад",
				// 		// PLAY_START: "Start slideshow",
						// PLAY_STOP: "Pause slideshow",
						// FULL_SCREEN: "Full screen",
						// THUMBS: "Thumbnails",
						// DOWNLOAD: "Download",
						// SHARE: "Share",
						// ZOOM: "Zoom"
					// }, 
				// beforeLoad: function () {
				// 	root.style.setProperty('--spacing-end', scrollWidth + 'px');
				// },
				// afterClose: function () {
				// 	root.style.setProperty('--spacing-end', null);
				// },

		// });

		// $(link).fancybox({
		// });

		$(".modal-close-js").click(function () {
			fancybox.close();
		})
		// fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed")); 
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed")); 
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			if (!container || link) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		const tabs = document.querySelectorAll(tab);
		const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		tabs.forEach(element => {
			let tabs = element;
			const tabsCaption = tabs.querySelector(".tabs__caption");
			const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn--js");
			const tabsWrap = tabs.querySelector(".tabs__wrap");
			const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			const random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach((el, index) => {
				const data = `tab-content-${random}-${index}`;
				el.dataset.tabBtn = data;
				const content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;

				const active = content.classList.contains('active') ? 'active' : '';
				// console.log(el.innerHTML);
				content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
			})


			tabs.addEventListener('click', function (element) {
				const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
				if (!btn) return;
				const data = btn.dataset.tabBtn;
				const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
				const content = this.querySelectorAll(`[data-tab-content]`);
				tabsAllBtn.forEach(element => {
					element.dataset.tabBtn == data
						? element.classList.add('active')
						: element.classList.remove('active')
				});
				content.forEach(element => {
					element.dataset.tabContent == data
						? (element.classList.add('active'), element.previousSibling.classList.add('active'))
						: element.classList.remove('active')
				});
			})
		})

		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+99(999)999-99-99").mask(InputTel);
	},
	 
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() { 
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask(); 
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	$('.sitebar__category--js').on('click', function() {
		$(this).parents('.sitebar').find('.sitebar__sitebarWrap').addClass('active');
		$(this).parents('body').addClass('fixed');
	})

	$('.sitebar__closeBtn--js').on('click', function() {
		$(this).parents('.sitebar__sitebarWrap').removeClass('active');
		$(this).parents('body').removeClass('fixed');
	})


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();

	fixedStip();
	function fixedStip(){
		let fixedStrip = document.querySelector('.scroll-top');
		if(!fixedStrip) return

		window.addEventListener("scroll", toggleFixedStrip.bind(undefined, fixedStrip), {passive:  true});
		toggleFixedStrip(fixedStrip);

		$(fixedStrip).click(function (){
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}
	function toggleFixedStrip(fixedStrip){
		if (window.scrollY > calcVh(10)){
			$(fixedStrip).addClass('active');
		}
		else{
			$(fixedStrip).removeClass('active');
		}
	}
	function calcVh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	}


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sReviews__slider--js', {
		slidesPerView: 1,
		spaceBetween: 30,
		slideToClickedSlide: true,
		freeModeMomentum: true,
		autoHeight: true,
		loop: true,
		pagination: {
			el: '.sReviews .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	const headerSlider = new Swiper('.headerBlog__slider--js', {
		slidesPerView: 1,
		spaceBetween: 30,
		slideToClickedSlide: true,
		freeModeMomentum: true,
		loop: true,
		pagination: {
			el: '.headerBlog .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		
		autoplay: {
			delay: 4000,
		},
	});


	var casesThumbSlider = new Swiper(".sCases__sliderThumb--js", {
		spaceBetween: 0,
		slidesPerView: 'auto',
		freeMode: true,
		watchSlidesVisibility: true,
	});

	var casesSlider = new Swiper(".sCases__slider--js", {
		spaceBetween: 0,
		pagination: {
			el: '.sCases .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		thumbs: {
			swiper: casesThumbSlider,
		},
	});

	const sCasesSlided = new Swiper('.sCasesSlidedr__slider--js', {
		slidesPerView: 1,
		loop: true,
		loopFillGroupWithBlank: true,
		slideToClickedSlide: true,
		freeModeMomentum: true,
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			}
		},
		navigation: {
			nextEl: '.sCasesSlidedr .swiper-button-next',
			prevEl: '.sCasesSlidedr .swiper-button-prev',
		},
	});
	
	const mastersSlider = new Swiper('.sServises__slider--js', {
		slidesPerView: 1,
		watchOverflow: true,
		spaceBetween: 0,
		breakpoints: {
			768: {
				slidesPerView: 2,
				slidesPerColumn: 2,
			}
		},
		pagination: {
			el: '.sServises .swiper-pagination',
			type: 'bullets',
			clickable: true,

		},
	});

	const instrumentsSlider = new Swiper('.sInstruments__slider--js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 0,
		pagination: {
			el: '.sServises .swiper-pagination',
			type: 'bullets',
			clickable: true,

		},
	});

	const officeSlider = new Swiper('.sOffice__slider--js', {
		slidesPerView: 2,
		watchOverflow: true,
		loop: true,
		spaceBetween: 20,
		breakpoints: {
			768: {
				slidesPerView: 3,
				spaceBetween: 80,
			},
		},
		pagination: {
			el: '.sOffice .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},

		autoplay: {
			delay: 4000,
		},
	});


	function makeDDGroup(qSelecorts){
		for (let parentSelect of qSelecorts){
			let parent = document.querySelector(parentSelect);
			if (parent){
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.accardion__header--js');
				$(ChildHeads).click(function (){
					let clickedHead = this;
					$(ChildHeads).each(function (){
						if (this === clickedHead){
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.accardion__content--js').slideToggle(function (){
								$(this).toggleClass('active');
							});
						}
						else{
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.accardion__content--js').slideUp(function (){
								$(this).removeClass('active');
							});
						}
					});
				});
			}
		}
	}
	makeDDGroup(['.accardion', '.dd-price-js']);


	$(".sClients__btn").click(function(){
		let item = $(".sClients__col");
		if(item.is(":hidden")) {
			$(".sClients__col:hidden").fadeIn();

		}
		$(this).hide();
	})


	function load_more_case_folders() {
		var case_folders = $('.case-nav-folder div'), cl_count = 0;
		$('.js-show-more-cases').click(function () {
			cl_count += 4;
			for (var i = cl_count; i < cl_count + 4; i++) {
				if (i < case_folders.length) case_folders[i].style.display = 'block';
				if (i == case_folders.length - 1) $(this).hide();
			}
		});
	}

	load_more_case_folders();

	const caseSlider = new Swiper('.case-filter__slider--js', {
		slidesPerView: 'auto',
	});

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }