document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-list');
    const navLinks = document.querySelectorAll('.main-nav a');
    const paginationLinks = document.querySelectorAll('.page-link');
    const prevPageBtn = document.querySelector('.prev-page');
    const nextPageBtn = document.querySelector('.next-page');
    const cartSpan = document.querySelector('.cart span');

    const productsPerPage = 12;
    let currentPage = 1;
    let currentCategory = 'preventa';

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(product, quantity = 1) {
        let cart = getCart();
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity });
        }
        saveCart(cart);
    }

    function updateCartCount() {
        const cart = getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartSpan) {
            cartSpan.textContent = totalItems;
        }
    }

    function renderProducts(category, page) {
        const products = allProducts[category];
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const productsToShow = products.slice(start, end);

        productGrid.innerHTML = '';
        if (productsToShow.length === 0) {
            productGrid.innerHTML = '<p style="text-align: center; width: 100%;">No hay productos en esta categoría.</p>';
            updatePagination(category, page);
            return;
        }

        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productLink = document.createElement('a');
            productLink.href = `product-page.html?id=${product.id}`;

            productLink.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            `;

            if (product.sale) {
                productCard.classList.add('sale');
                const saleBadge = document.createElement('span');
                saleBadge.classList.add('sale-badge');
                saleBadge.textContent = 'SALE';
                productCard.appendChild(saleBadge);
            }

            productCard.appendChild(productLink);
            productGrid.appendChild(productCard);
        });

        updatePagination(category, page);
    }

    function updatePagination(category, page) {
        const totalProducts = allProducts[category].length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        paginationLinks.forEach(link => {
            const pageNum = parseInt(link.dataset.page);
            link.classList.toggle('active', pageNum === page);
            link.style.display = pageNum <= totalPages ? 'inline-block' : 'none';
        });

        prevPageBtn.style.visibility = page > 1 ? 'visible' : 'hidden';
        nextPageBtn.style.visibility = page < totalPages ? 'visible' : 'hidden';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentCategory = e.target.dataset.category;
            currentPage = 1;
            renderProducts(currentCategory, currentPage);
            
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    paginationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = parseInt(e.target.dataset.page);
            renderProducts(currentCategory, currentPage);
        });
    });
    
    prevPageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderProducts(currentCategory, currentPage);
        }
    });

    nextPageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const totalProducts = allProducts[currentCategory].length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts(currentCategory, currentPage);
        }
    });

    renderProducts(currentCategory, currentPage);
    document.querySelector('.main-nav a[data-category="preventa"]').classList.add('active');
    updateCartCount(); 
});