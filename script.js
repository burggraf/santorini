document.addEventListener('DOMContentLoaded', () => {
	// Image gallery data with descriptions
	const galleryImages = [
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
		{ id: 14, desc: 'Third bedroom with queen bed and private workspace' },
		{ id: 29, desc: 'BBQ area with ocean views' },
	]

	// Initialize gallery
	const galleryGrid = document.querySelector('.gallery-grid')
	let currentImageIndex = 0

	galleryImages.forEach((img, index) => {
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
		const img = galleryImages[currentImageIndex]
		modalImg.src = `images/${img.id.toString().padStart(2, '0')}.jpeg`
		modalCaption.textContent = img.desc
	}

	function closeModalHandler() {
		modal.style.display = 'none'
		document.body.style.overflow = 'auto'
	}

	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % galleryImages.length
		updateModalImage()
	}

	function prevImage() {
		currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
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
