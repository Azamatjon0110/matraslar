const elOverlay = document.querySelector('.overlay');
const elHamburgeMenubtn = document.querySelector('.header__hamburger');
const elHeader = document.querySelector('header');
const elBody = document.querySelector('body');
const elHeaderBtn = elHeader.querySelector('.header__btn');
const elHeaderTabletBtn = elHeader.querySelector('.header__btn--active');
let isActive = 'Barchasi';
const elHeaderOrderModal = elHeader.querySelector('.header__order-modal');
const elHeaderOrderSuccessModal = elHeader.querySelector(
	'.header__order-success'
);
const elHeaderOrderSuccessModalBtn = elHeader.querySelector(
	'.header__order-success-btn'
);
const elForm = elHeader.querySelector('.header__order-form');
const elFormInputName = elForm.querySelector('#userName');
const elFormInputTel = elForm.querySelector('#userNumber');
const elFormSelect = elForm.querySelector('#userCategory');
const elFormDecrementButton = elForm.querySelector(
	'.header__order-count-decrement'
);
let elFormProductCount = elForm.querySelector('#userProductCount');
const elFormIncrementButton = elForm.querySelector(
	'.header__order-count-increment'
);
const elCategoryLinksList = document.querySelector('.products_linsk-list');
const elProducts = document.querySelector('.products__main-box');
const elDiscountTitle = document.querySelector('.discount_title');
const elDiscounts = document.querySelector('.discount_main-box');
const elInterestingWrap = document.querySelector('.interesting__main-wrap');
const elInterestingForm = document.querySelector('.interesting__form');
const elFormInterestingInput = elInterestingForm.querySelector(
	'.interesting__input'
);
let elFormInterestingError = document.querySelector('.interesting__error');
const elInterestingSuccess = document.querySelector('.interesting__success');
const elTemplate = document.querySelector('#categories').content;
const elProductsTemplate = document.querySelector('#products').content;
const elDiscountProductsTemplate = document.querySelector('#discounts').content;
const discountFragment = document.createDocumentFragment();
const fragment = document.createDocumentFragment();
const addressWrapper = document.querySelector('.addressWrapper');
const heroCarouselWrapper = document.querySelector('.heroCarouselWrapper');
const elLoaderTxt = document.querySelectorAll('.loader-text');
const elSecondAppBox = document.querySelector('.aapp');
// const cancelSecondApp = elSecondAppBox.querySelector('.btn-cancel');
// const trySecondApp = elSecondAppBox.querySelector('.btn-done');
let count = 1;

const reservedImages = [
	'http://sc04.alicdn.com/kf/Hd2f7888d22804ac0a50c0551d535fb2ek.jpg',
	'https://static-uc.olist.ng/upload/20191106/bzaen6qxiwx.jpg',
	'https://www.shutterstock.com/image-photo/comfortable-bed-new-mattress-room-260nw-1333930100.jpg',
	'https://m.media-amazon.com/images/S/aplus-media-library-service-media/cc88c37a-8c08-488f-a412-c7631ff6bec9.__CR0,343,1000,619_PT0_SX970_V1___.jpg',
];

/* HEADER FUNCTIONS START */

const orderModal = () => {
	return elHeaderOrderModal.classList.toggle('hide');
};

elHamburgeMenubtn.addEventListener('click', () => {
	elBody.classList.toggle('sitenav__list-on');
	elBody.classList.toggle('overflow');
});

elHeaderBtn.addEventListener('click', () => {
	elBody.classList.toggle('sitenav__list-on');
	orderModal();
	elOverlay.classList.remove('hide');
});

elHeaderTabletBtn.addEventListener('click', () => {
	orderModal();
	elOverlay.classList.remove('hide');
});

elHeaderOrderModal.addEventListener('click', (evt) => {
	if (evt.target.matches('.form-close')) {
		orderModal();
		elOverlay.classList.add('hide');
	}
});

const increment = () => {
	count += 1;
	elFormDecrementButton.removeAttribute('disabled');
	return (elFormProductCount.textContent = count);
};

const decrement = () => {
	if (elFormProductCount > 1 || count > 1) {
		count -= 1;
		return (elFormProductCount.textContent = count);
	}

	if (elFormProductCount <= 1 || count <= 1) {
		elFormDecrementButton.setAttribute('disabled', 'button');
	}
};

elFormIncrementButton.addEventListener('click', () => {
	increment();
});

elFormDecrementButton.addEventListener('click', () => {
	decrement();
});

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const userValues = {
		name: elFormInputName.value,
		number: elFormInputTel.value,
		productName: elFormSelect.value,
		count: elFormProductCount.textContent,
	};
	axios
		.post('http://localhost:1212/api/orders', userValues)
		.then((res) => {
			if (res.status >= 200 && res.status < 210) {
				elHeaderOrderSuccessModal.classList.toggle('hide');
			}
		})
		.catch((error) => {
			Toastify({
				text: error.response.data.message,
				duration: 5000,
				close: true,
				position: 'right', // `left`, `center` or `right`
				backgroundColor: 'red',
				stopOnFocus: true, // Prevents dismissing of toast on hover
				onClick: function () {}, // Callback after click
			}).showToast();
		});
});

elHeaderOrderSuccessModalBtn.addEventListener('click', (evt) => {
	elHeaderOrderSuccessModal.classList.toggle('hide');
	orderModal();
	elOverlay.classList.add('hide');
	(elFormInputName.value = ''),
		(elFormInputTel.value = ''),
		elFormSelect.value,
		(elFormProductCount.textContent = count);
});

/* HEADER FUNCTIONS END */

/* SECOND APP SHOW BOX START */

const showSecondApp = () => {
	setTimeout(() => {
		elSecondAppBox.classList.remove('hide');
		elOverlay.classList.remove('hide');

		elSecondAppBox.addEventListener('click', (evt) => {
			if (evt.target.textContent === cancelSecondApp.innerHTML) {
				elOverlay.classList.add('hide');
				closeBox();
			}
		});
	}, 7000);
};
const closeBox = () => {
	return elSecondAppBox.classList.add('hide');
};

/* SECOND APP SHOW BOX END */

/* HERO FUNCTIONS START */

// async function getHeroCarousels() {
// 	axios
// 		.get(`http://localhost:1212/api/carousel`)
// 		.then((res) => {
// 			if (res.status >= 200 && res.status < 210) {
// 				showSecondApp();
// 				res.data.forEach((item, i) => {
// 					heroCarouselWrapper.innerHTML = '';
// 					let box = document.createElement('div');
// 					box.classList.add('swiper-slide');
// 					box.innerHTML = `
// 					<div class="swip">
// 					<div class="swip_left">
// 						<h2 class="swip_title">${item.title}</h2>
// 						<a class="category__btn" href="#bottom">Kategoriyalar</a>
// 					</div>
// 					<div class="swip_right">
// 						<img
// 						src=${baseImgUrl}/carousel/${item.image}
// 						alt="${item.title}"
// 						/>
// 					</div>
// 				</div>
// 					`;
// 					fragment.appendChild(box);
// 				});
// 				heroCarouselWrapper.appendChild(fragment);

// 				//* Hero swiper start */
// 				const swiper = new Swiper('.mySwiper', {
// 					pagination: {
// 						el: '.hero__pagination',
// 						clickable: true,
// 						type: 'progressbar',
// 					},
// 					navigation: {
// 						nextEl: '.swiper-button-next',
// 						prevEl: '.swiper-button-prev',
// 					},
// 					autoplay: {
// 						delay: 3500,
// 						disableOnInteraction: false,
// 					},
// 					loop: true,
// 					watchSlidesProgress: true,
// 				});
// 				// /* Hero swiper end */
// 			}
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// }

// getHeroCarousels();

/* HERO FUNCTIONS END */
/* RENDER PRODUCTS CATEGORIES FUNCTION START */

async function getCategories() {
	try {
		const res = await fetch(`http://localhost:1212/api/products`);
		const data = await res.json();
		data?.categories?.forEach((category) => {
			elCategoryLinksList.innerHTML = '';
			const cloned = elTemplate.cloneNode(true);
			cloned.querySelector('.products_links-link').textContent =
				category.category;
			let active = cloned.querySelector('.products_links-link');
			if (active.innerHTML == isActive) {
				active.classList.add('products_links-link--active');
			} else {
				active.classList.remove('products_links-link--active');
			}
			fragment.appendChild(cloned);
		});
		elCategoryLinksList.appendChild(fragment);
	} catch {
		console.log(error);
	}
}

getCategories();

/* RENDER PRODUCTS CATEGORIES FUNCTION END */
const elTechSwiperWrap = document.querySelector('.techWrapper');
let slidesPerVieww = 1,
	spaceBetweenn = 2,
	centered = true;

/* TECHNOLOGY SWIPER FUNCTION START */

const renderTechSwiper = async () => {
	try {
		const res = await fetch(`http://localhost:1212/api/technology`);
		const data = await res.json();
		data?.forEach((item) => {
			elTechSwiperWrap.innerHTML = '';
			let box = document.createElement('div');
			box.classList.add('swiper-slide');
			box.innerHTML = `
			<h3 class="swiper-title techSwiper-title">${item.name}</h3>
			<div class="video">
					<a class="video__link" href="https://youtu.be/${item.link}" target="blank">
						<picture>
							<source
								class="source"
								srcset="
								 https://i.ytimg.com/vi_webp/${item.thumbnail}/maxresdefault.webp
								"
								type="image/webp"
							/>
							<img
								class="video__media"
								src="https://i.ytimg.com/vi/${item.thumbnail}/maxresdefault.jpg"
							/>
						</picture>
					</a>
					<button class="video__button" aria-label="Play video">
						<svg
							width="50"
							height="50"
							viewBox="0 0 50 50"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="25" cy="25" r="25" fill="#01384D" />
							<path
								class="video__button-shape"
								d="M31.0001 23.1581C32.3335 23.9279 33.0001 24.3128 33.0001 24.8902C33.0001 25.4675 32.3335 25.8524 31.0001 26.6222L22.0001 31.8184C20.6668 32.5882 20.0001 32.9731 19.5001 32.6844C19.0001 32.3958 19.0001 31.626 19.0001 30.0864V19.694C19.0001 18.1544 19.0001 17.3846 19.5001 17.096C20.0001 16.8073 20.6668 17.1922 22.0001 17.962L31.0001 23.1581Z"
								fill="white"
							/>
						</svg>
					</button>
				</div>
				<p class="swiper-description techDesc">${item?.description}</p>`;
			fragment.appendChild(box);
		});
		elTechSwiperWrap.appendChild(fragment);
	} catch (error) {
		console.log(error);
	}
};

renderTechSwiper();

let techSwiper = new Swiper('.techSwiper', {
	pagination: {
		clickable: true,
	},
	autoplay: {
		delay: 2500,
		pauseOnMouseEnter: true,
		disableOnInteraction: false,
	},
	slidesPerView: 3,
	loop: true,
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 50,
		},
	},
});

/* RENDER PRODUCTS FUNCTION START */

async function getProducts() {
	try {
		const res = await fetch('http://localhost:1212/api/products');
		const data = await res.json();
		if (res.status >= 200 && res.status < 210) {
			let products = data.products;
			products?.forEach((product, i) => {
				elProducts.innerHTML = '';
				elDiscounts.innerHTML = '';
				let option = document.createElement('option');
				option.textContent = product.name;
				option.value = product.name;
				elFormSelect.appendChild(option);
				let images = product.product_images
					.replaceAll('[', '')
					.replaceAll(']', '')
					.replaceAll('"', '')
					.split(',');
				console.log(images);
				const cloned = elProductsTemplate.cloneNode(!0);
				cloned.querySelector('.products__zoom-btn').dataset.productIndex =
					product.id;
				cloned
					.querySelector('.products__zoom-btn')
					.addEventListener('click', (evt) => {
						getSingleProduct(evt.target.dataset.productIndex, products);
					});
				cloned.querySelector('.products_category_type').textContent =
					product.category;
				cloned.querySelector('.products__imgg').src =
					`./images/${images[0]} ` || reservedImages[i];
				cloned.querySelector('.products_right-title').textContent =
					product?.name;
				cloned.querySelector('.weight').textContent = product.weight;
				cloned.querySelector('.warranty').textContent = product.warranty;
				cloned.querySelector('.size').textContent = product.size;
				cloned.querySelector('.capacity').textContent = product.capacity;
				cloned.querySelector('.new').textContent =
					product.status !== '0' ? 'YANGI MAHSULOT' : '';
				product.status !== '0'
					? cloned.querySelector('.new').classList.add('products_new-btn')
					: '';
				cloned.querySelector('.products_right-desc').textContent = product.body;
				cloned.querySelector('.products_right-price-value').textContent =
					product.cost;

				fragment.appendChild(cloned);
			});

			let discountData = data?.products.filter(
				(item) => item.new_cost !== null
			);
			discountData.forEach((item, i) => {
				elDiscountTitle.classList.remove('hide');
				const clonedDiscount = elDiscountProductsTemplate.cloneNode(!0);
				clonedDiscount.querySelector('.products__imgg').src = `./images/${
					item.product_images
						.replaceAll('[', '')
						.replaceAll(']', '')
						.replaceAll('"', '')
						.split(',')[0]
				}`;
				clonedDiscount.querySelector('.products__zoom-img').src = `./images/${
					item.product_images
						.replaceAll('[', '')
						.replaceAll(']', '')
						.replaceAll('"', '')
						.split(',')[0]
				}`;

				clonedDiscount.querySelector('.products_right-title').textContent =
					item?.name;
				clonedDiscount.querySelector('.products_right-desc').textContent =
					item.body;
				clonedDiscount.querySelector('.weight').textContent = item.weight;
				clonedDiscount.querySelector('.warranty').textContent = item.warranty;
				clonedDiscount.querySelector('.size').textContent = item.size;
				clonedDiscount.querySelector('.capacity').textContent = item.capacity;
				clonedDiscount.querySelector('.old_price').textContent = item.cost;
				clonedDiscount.querySelector('.new_price').textContent = item.new_cost;
				discountFragment.appendChild(clonedDiscount);
			});
			elProducts.appendChild(fragment);
			elDiscounts.appendChild(discountFragment);
			readyAllEvents();
		}
	} catch (e) {
		console.error(e);
	}
}

getProducts();

/* RENDER PRODUCTS FUNCTION START */

/* PRODUCTS ALL EVENTS FUNCTIONS START */

async function readyAllEvents() {
	const elProductsZoombtn = document.querySelectorAll('.products__zoom-btn');
	const elProductsZoomSelected = document.querySelector(
		'.products__zoom-selected-box'
	);
	const elProductsZoomSelectedImg = document.querySelector(
		'.products__zoom-selected'
	);
	const elProductsZoomItem = document.querySelectorAll('.products__zoom-item');
	const elProductsZommImg = document.querySelectorAll('.products__zoom-img');
	const elProductsZommCloseBtn = document.querySelector(
		'.products__zoom-close'
	);
	const elProductsRightOrderBtn = document.querySelectorAll(
		'.products_right-order'
	);
	const elOverlay = document.querySelector('.overlay');
	const elProductsItem = document.getElementsByClassName('prod_item');

	const elCategoryLinks = document.querySelectorAll('.products_links-link');

	//Product zoom btn event
	elProductsZoombtn.forEach((item) => {
		item.addEventListener('click', (evt) => {
			elProductsZoomSelected.classList.remove('hide');
			elOverlay.classList.remove('hide');
		});
	});

	elProductsZommCloseBtn.addEventListener('click', () => {
		elProductsZoomSelected.classList.add('hide');
		elOverlay.classList.add('hide');
	});

	//Render selected product images
	elProductsZommImg.forEach((img) => {
		img.addEventListener('click', (evt) => {
			elProductsZoomSelectedImg.src = evt.target.src;
			elProductsZoomItem.forEach((item) => {
				item.classList.remove('mod');
			});
			img.parentElement.classList.add('mod');
		});
	});

	//Product order
	elProductsRightOrderBtn.forEach((item) => {
		item.addEventListener('click', () => {
			elOverlay.classList.toggle('hide');
			orderModal();
		});
	});

	const test = () => {
		elCategoryLinks.forEach((link) => {
			if (link.innerHTML == isActive) {
				link.classList.add('products_links-link--active');
			} else {
				link.classList.remove('products_links-link--active');
			}
		});
	};

	//Add active link selected link
	elCategoryLinksList.addEventListener('click', (evt) => {
		evt.preventDefault();
		const targeted = evt.target;
		if (targeted.matches('.products_links-link')) {
			if (targeted.textContent !== 'Barchasi') {
				isActive = targeted.innerHTML;
				test();
				sortingContent('products_category_type', evt);
			} else {
				AllContent();
			}
		}
	});

	function AllContent() {
		for (let i = 0; i < elProductsItem.length; i++) {
			elProductsItem[i].style.display = 'block';
		}
	}

	//Sort products by categories
	function sortingContent(element, evennt) {
		for (let i = 0; i < elProductsItem.length; i++) {
			const titles =
				elProductsItem[i].getElementsByClassName(element)[0].innerHTML;
			let res = titles.match(evennt.target.textContent);
			if (res) {
				elProductsItem[i].style.display = 'block';
			} else {
				elProductsItem[i].style.display = 'none';
			}
		}
	}
}
/* PRODUCTS ALL EVENTS FUNCTIONS END */

// Single product nested images
const getSingleProduct = (id, data) => {
	const img = document.querySelector('.products__zoom-selected');
	const imgs = document.querySelectorAll('.products__zoom-img');
	const findedData = data.find((item) => item.id === Number(id));
	let images = findedData.product_images
		.replaceAll('[', '')
		.replaceAll(']', '')
		.replaceAll('"', '')
		.split(',');
	img.src = `./images/${images[0]}`;
	// img.src = `./images/${images[0]}`

	images.forEach((img, i) => {
		imgs[i].src = `./images/${img}`;
	});
};

/* ADDRESS SWIPER FUNCTION START */

const addressSwiper = new Swiper('.addressSwiper', {
	pagination: {
		clickable: true,
	},
	autoplay: {
		delay: 7500,
	},
});

/* Address swiper end */

const renderAddressSwiper = async () => {
	try {
		const res = await fetch(`http://localhost:1212/api/address`);
		const data = await res.json();
		data?.forEach((item, i) => {
			addressWrapper.innerHTML = '';
			let box = document.createElement('div');
			box.classList.add('swiper-slide');
			box.innerHTML = `
							<div class="address__swiper-left">
								<h2 class="address__title">Manzilimiz</h2>
								<div class="address__box">
									<h3 class="address__location">
										${item.location}
									</h3>
									<p class="address__destination">
										${item.destination}
									</p>
									<a class="address__geolocation" href="https://www.google.com/maps/search/${
										item.location
									}" target=_blank>Geolokatsiya</a>
								</div>
							</div>
							<div class="address__swiper-right">

								<div class="swiper addressSwiperInner">
									<div class="swiper-wrapper">
										<div class="swiper-slide addressSlide">
											<img
											src=http://localhost:1212/address/${
												item?.images
													.replaceAll('[', '')
													.replaceAll(']', '')
													.replaceAll('"', '')
													.split(',')[0]
											}
											alt=""
											/>
										</div>
										<div class="swiper-slide addressSlide">
											<img
											src=http://localhost:1212/address/${
												item?.images
													.replaceAll('[', '')
													.replaceAll(']', '')
													.replaceAll('"', '')
													.split(',')[1]
											}
											alt=""
											/>
										</div>
										<div class="swiper-slide addressSlide">
											<img
											src=http://localhost:1212/address/${
												item?.images
													.replaceAll('[', '')
													.replaceAll(']', '')
													.replaceAll('"', '')
													.split(',')[2]
											}
											alt=""
											/>
										</div>

									</div>
									<div
									class="address__pagination"
									></div>
								</div>
							</div>
						`;
			fragment.appendChild(box);
		});
		addressWrapper.appendChild(fragment);

		const addressSwiperInner = new Swiper('.addressSwiperInner', {
			pagination: {
				el: '.address__pagination',
				clickable: true,
				type: 'progressbar',
			},
			autoplay: {
				delay: 2000,
			},
			loop: true,
			observer: true,
			observeParents: true,
			watchSlidesProgress: true,
		});
	} catch (error) {
		console.log(error);
	}
};

renderAddressSwiper();

/* Address inner swiper end */

const showSuccessApellation = () => {
	elInterestingWrap.classList.toggle('hide');
	elInterestingSuccess.classList.toggle('hide');
	setTimeout(() => {
		elInterestingSuccess.classList.toggle('hide');
		elInterestingWrap.classList.toggle('hide');
	}, 2500);
};

elInterestingForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	let inputNumberValue = elFormInterestingInput.value;
	let data = {
		number: inputNumberValue,
	};
	axios
		.post(`http://localhost:1212/api/contact`, data)
		.then((res) => {
			if (res.status >= 200 && res.status < 210) {
				showSuccessApellation();
				elFormInterestingInput.value = '';
			}
		})
		.catch((error) => {
			console.log(error);
		});
});

/* ADDRESS SWIPER FUNCTION END */

// doubleLetters

let words = ["O'", "G'", 'Sh', 'Ch'];

// fakeData

let me = [
	{
		first_name: 'Shahobiddin',
		last_name: 'Faxritdinov',
	},
];

// DoubleLetter generate

let firstDoubleLetter = me[0]?.first_name
	?.charAt(0)
	?.concat(me[0]?.first_name?.charAt(1));
let lastDoubleLetter = me[0]?.last_name
	?.charAt(0)
	?.concat(me[0]?.last_name?.charAt(1));
// console.log(lastDoubleLetter)

let fN, lN;

// If data pending avoid null or NaN in span innerHTML

try {
	fN = me[0]?.first_name ? me[0]?.first_name?.charAt(0) : '';
	lN = me[0]?.last_name ? me[0]?.last_name?.charAt(0) : '';
} catch {}

// Check and assignment user first/last name to doubleLetter

words.forEach((word) => {
	if (word === firstDoubleLetter) {
		fN = word;
	}

	if (word === lastDoubleLetter) {
		lN = word;
	}
});
