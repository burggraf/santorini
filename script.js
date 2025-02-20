document.addEventListener('DOMContentLoaded', () => {
	// Full gallery data with descriptions
	const allGalleryImages = [
		{ id: 1, desc: 'Living Room & Dining Room with access to the oversized wrap around balcony' },
		{ id: 2, desc: 'Huge balcony meeting/work space directly overlooking the Pacific Ocean' },
		{ id: 3, desc: 'Bonus hall sitting area with high speed Internet and UPS backup' },
		{ id: 4, desc: 'Huge fully-stocked kitchen area with tons of counter space' },
		{
			id: 5,
			desc: 'Grand kitchen with everything including dishwasher, oven, and RO water system',
		},
		{ id: 6, desc: 'Great 5-burner stove built into the island with ocean view' },
		{ id: 7, desc: 'Large kitchen perfect for entertaining or morning coffee' },
		{ id: 8, desc: 'Comfortable dining table with spectacular ocean view' },
		{ id: 9, desc: 'Indoor dining area seats 8' },
		{ id: 10, desc: 'Extra large primary bedroom with king bed and en suite bathroom' },
		{ id: 11, desc: 'Second bedroom with custom-crafted queen bed and pull-out twins' },
		{ id: 12, desc: 'Great private storage space in every room' },
		{ id: 13, desc: 'The 3rd bedroom has a queen bed and private workspace' },
		{ id: 15, desc: 'Cute yet ample-sized guest bathroom off main entryway' },
		{ id: 16, desc: '' },
		{ id: 17, desc: '' },
		{ id: 18, desc: 'Laundry room with full washer & dryer and utility bathroom' },
		{ id: 19, desc: 'Full outdoor kitchen cooking area with ocean views' },
		{ id: 20, desc: 'Beautiful Santorini Building with modern architecture' },
		{ id: 21, desc: 'The Santorini Building' },
		{ id: 22, desc: '24/7 security with doorman and crew' },
		{ id: 23, desc: 'Private balcony view of jacuzzi, infinity pool, and playground' },
		{ id: 24, desc: 'View of Murciélago Beach from the beach elevator' },
		{ id: 25, desc: 'Beautiful infinity pool with lounge area' },
		{ id: 26, desc: 'Swim up to the infinity edge and look out over the beach' },
		{ id: 27, desc: 'Beautifully decorated, large entry/hall way' },
		{ id: 28, desc: 'The oversized entry space gives a nice open feel' },
		{ id: 29, desc: 'BBQ area with ocean and kite surfer views' },
		{ id: 30, desc: 'Newly remodeled BBQ area with outdoor dining' },
		{ id: 31, desc: 'Working outside on the balcony couches? This is your view!' },
		{ id: 32, desc: 'Beach elevator with clean-up room and playground view' },
		{ id: 33, desc: 'View of the building from the beach' },
		{ id: 34, desc: 'Spectacular sunset views' },
		{ id: 35, desc: 'Beautiful sunset photo opportunities daily' },
		{ id: 36, desc: 'Always have your camera ready at the beach' },
		{ id: 37, desc: 'Mall Del Pacifico just 3-5 minutes away' },
	]

	// Featured images for main gallery view
	const featuredImages = [
		{ id: 26, desc: 'Swim up to the infinity edge and look out over the beach' },
		{ id: 31, desc: 'Working outside on the balcony couches? This is your view!' },
		{ id: 1, desc: 'Living Room & Dining Room with access to the oversized wrap around balcony' },
		{ id: 4, desc: 'Huge fully-stocked kitchen area with tons of counter space' },
		{ id: 10, desc: 'Extra large primary bedroom with king bed' },
		{ id: 19, desc: 'Full outdoor kitchen cooking area with ocean views' },
		{ id: 34, desc: 'Spectacular sunset views' },
		{ id: 23, desc: 'Private balcony view of the jacuzzi, infinity pool, and playground' },
		{ id: 20, desc: 'Beautiful Santorini Building with modern architecture' },
		{ id: 11, desc: 'Second bedroom with custom-crafted queen bed and pull-out twins' },
		{ id: 13, desc: 'Great private workspace & TV' },
		{ id: 29, desc: 'BBQ area with ocean views' },
	]

	let currentGalleryImages = featuredImages
	let isShowingAll = false

	// Initialize gallery
	const galleryGrid = document.querySelector('.gallery-grid')
	let currentImageIndex = 0

	function updateGallery() {
		galleryGrid.innerHTML = ''
		currentGalleryImages.forEach((img, index) => {
			const galleryItem = document.createElement('div')
			galleryItem.className = 'gallery-item'
			galleryItem.innerHTML = `
                <img src="images/${img.id.toString().padStart(2, '0')}.jpeg" 
                     alt="${img.desc}"
                     loading="lazy">
            `
			galleryItem.addEventListener('click', () => openModal(index))
			galleryGrid.appendChild(galleryItem)
		})
	}

	// Add "View All Photos" button
	const gallerySection = document.querySelector('#gallery .container')
	const viewAllButton = document.createElement('button')
	viewAllButton.className = 'cta-button view-all-btn'
	viewAllButton.textContent = 'View All Photos'
	viewAllButton.style.margin = '2rem auto'
	viewAllButton.style.display = 'block'

	viewAllButton.addEventListener('click', () => {
		isShowingAll = !isShowingAll
		currentGalleryImages = isShowingAll ? allGalleryImages : featuredImages
		viewAllButton.textContent = isShowingAll ? 'Show Featured Photos' : 'View All Photos'
		updateGallery()
	})

	gallerySection.appendChild(viewAllButton)

	// Initial gallery setup
	updateGallery()

	// Modal functionality
	const modal = document.getElementById('gallery-modal')
	const modalImg = document.getElementById('modal-image')
	const modalCaption = document.querySelector('.modal-caption')
	const closeModal = document.querySelector('.close-modal')
	const prevButton = document.querySelector('.modal-prev')
	const nextButton = document.querySelector('.modal-next')

	function openModal(index) {
		currentImageIndex = index
		updateModalImage()
		modal.style.display = 'block'
		document.body.style.overflow = 'hidden'
	}

	function updateModalImage() {
		const img = currentGalleryImages[currentImageIndex]
		modalImg.src = `images/${img.id.toString().padStart(2, '0')}.jpeg`
		modalCaption.textContent = img.desc
	}

	function closeModalHandler() {
		modal.style.display = 'none'
		document.body.style.overflow = 'auto'
	}

	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length
		updateModalImage()
	}

	function prevImage() {
		currentImageIndex =
			(currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length
		updateModalImage()
	}

	closeModal.addEventListener('click', closeModalHandler)
	prevButton.addEventListener('click', prevImage)
	nextButton.addEventListener('click', nextImage)

	// Keyboard navigation for modal
	document.addEventListener('keydown', (e) => {
		if (modal.style.display === 'block') {
			if (e.key === 'Escape') closeModalHandler()
			if (e.key === 'ArrowRight') nextImage()
			if (e.key === 'ArrowLeft') prevImage()
		}
	})

	// Form submission
	const form = document.getElementById('inquiry-form')
	form.addEventListener('submit', (e) => {
		e.preventDefault()

		// Collect form data
		const formData = {
			name: form.name.value,
			email: form.email.value,
			dates: form.dates.value,
			message: form.message.value,
		}

		// Here you would typically send this data to a server
		// For now, we'll just show a success message
		alert('Thank you for your inquiry! We will contact you soon.')
		form.reset()
	})

	// Smooth scroll for navigation links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault()
			const target = document.querySelector(this.getAttribute('href'))
			if (target) {
				const navHeight = document.querySelector('.navbar').offsetHeight
				const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
				window.scrollTo({
					top: targetPosition - navHeight,
					behavior: 'smooth',
				})
			}
		})
	})

	// Navbar scroll behavior
	let lastScroll = 0
	const navbar = document.querySelector('.navbar')

	window.addEventListener('scroll', () => {
		const currentScroll = window.pageYOffset

		if (currentScroll <= 0) {
			navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'
			return
		}

		if (currentScroll > lastScroll && currentScroll > 50) {
			// Scrolling down & past the navbar
			navbar.style.transform = 'translateY(-100%)'
		} else {
			// Scrolling up
			navbar.style.transform = 'translateY(0)'
			navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'
		}

		lastScroll = currentScroll
	})
})
