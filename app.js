
document.addEventListener('DOMContentLoaded', function() {
    const produtosLista = document.getElementById('produtos-lista');
    const pagination = document.getElementById('pagination');
    const categoryLinks = document.querySelectorAll('.category-link');
    const categoriaSelect = document.getElementById('categoriaSelect'); // Dropdown para categoria
    const applyFiltersButton = document.getElementById('apply-filters');
    const removeFiltersButton = document.getElementById('remove-filters'); 
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    let currentPage = 1;
    let totalPages = 1;
    let currentCategory = ''; 
    let filters = {}; 

    // Função para buscar produtos pela categoria
    function buscarProdutosPorCategoria(page = 1) {
        let apiUrl = `https://api.mercadolibre.com/sites/MLB/search?seller_id=178701040&offset=${(page - 1) * 50}&limit=50`;

        // Adiciona a categoria atual à URL da API, se houver uma categoria selecionada
        if (currentCategory) {
            apiUrl += `&q=${currentCategory}`;
        }

        // Adiciona os filtros de preço, se aplicados
        if (filters.price) {
            if (filters.price === '3500-INF') {
                apiUrl += `&price=3500-*`; 
            } else {
                apiUrl += `&price=${filters.price}`;
            }
        }

        // Mostra mensagem de carregamento
        produtosLista.innerHTML = '<p>Carregando produtos...</p>';

        // Busca produtos da API e exibe no site
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const produtos = data.results;
                totalPages = Math.ceil(data.paging.total / 50);
                if (produtos.length > 0) {
                    exibirProdutos(produtos);
                    gerarPaginacao();
                } else {
                    produtosLista.innerHTML = '<p>Nenhum produto encontrado.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                produtosLista.innerHTML = '<p>Ocorreu um erro ao carregar os produtos. Tente novamente mais tarde.</p>';
            });
    }

    // Função para exibir os produtos
    function exibirProdutos(produtos) {
        produtosLista.innerHTML = '';
        produtos.forEach(produto => {
            const produtoElement = document.createElement('div');
            produtoElement.classList.add('produto', 'col-md-4');

            const imgUrl = produto.thumbnail.replace('I.jpg', 'B.jpg');

            produtoElement.innerHTML = 
                `<img loading="lazy" src="${imgUrl}" alt="${produto.title}">
                <h3>${produto.title}</h3>
                <p>R$ ${produto.price.toFixed(2)}</p>
                <a href="${produto.permalink}" class="btn btn-primary" target="_blank">Comprar pelo Mercado Shops</a>`;
            produtosLista.appendChild(produtoElement);
        });
    }

    // Função para gerar a paginação
    function gerarPaginacao() {
        pagination.innerHTML = '';
        let paginationHTML = '';

        for (let i = 1; i <= Math.min(10, totalPages); i++) {
            paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                                <a class="page-link" href="#">${i}</a></li>`;
        }

        if (currentPage < totalPages) {
            paginationHTML += `<li class="page-item">
                                    <a class="page-link" href="#">Seguinte</a>
                                </li>`;
        }

        pagination.innerHTML = paginationHTML;

        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const selectedPage = parseInt(this.innerText);

                if (isNaN(selectedPage)) {
                    currentPage++;
                } else {
                    currentPage = selectedPage;
                }

                buscarProdutosPorCategoria(currentPage);
            });
        });
    }

    // Aplicar filtros ao clicar no botão de aplicar
    applyFiltersButton.addEventListener('click', function() {
        const selectedPrice = document.querySelector('input[name="price"]:checked');
        filters.price = selectedPrice ? selectedPrice.value : "";

        currentPage = 1;
        buscarProdutosPorCategoria(currentPage);
    });

    // Remover filtros ao clicar no botão de remover
    removeFiltersButton.addEventListener('click', function() {
        filters = {}; 
        currentCategory = ''; 
        currentPage = 1;

        // Desmarca todos os filtros de preço
        document.querySelectorAll('input[name="price"]').forEach(input => {
            input.checked = false;
        });

        buscarProdutosPorCategoria(currentPage);
    });

    // Evento de clique nos links de categoria (menu superior)
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            currentCategory = this.getAttribute('data-category');
            currentPage = 1;
            buscarProdutosPorCategoria(currentPage);
        });
    });

    // Filtro de categoria pelo dropdown
    categoriaSelect.addEventListener('change', function() {
        currentCategory = this.value;
        currentPage = 1;
        buscarProdutosPorCategoria(currentPage);
    });

    // Função para busca manual
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        currentCategory = searchInput.value.trim();
        currentPage = 1;
        buscarProdutosPorCategoria(currentPage);
    });

    // Carrega produtos da categoria padrão ao iniciar a página
    buscarProdutosPorCategoria();
});
document.addEventListener('DOMContentLoaded', function() {
    const produtosLista = document.getElementById('produtos-lista');
    const pagination = document.getElementById('pagination');
    const categoryLinks = document.querySelectorAll('.category-link');
    const applyFiltersButton = document.getElementById('apply-filters');
    const removeFiltersButton = document.getElementById('remove-filters');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    let currentPage = 1;
    let totalPages = 1;
    let currentCategory = ''; 
    let filters = {}; 

    // Função para buscar produtos pela categoria
    function buscarProdutosPorCategoria(page = 1) {
        let apiUrl = `https://api.mercadolibre.com/sites/MLB/search?seller_id=178701040&offset=${(page - 1) * 50}&limit=50`;

        // Adiciona a categoria atual à URL da API, se houver uma categoria selecionada
        if (currentCategory) {
            apiUrl += `&q=${currentCategory}`;
        }

        // Adiciona os filtros de preço, se aplicados
        if (filters.price) {
            if (filters.price === '3500-INF') {
                apiUrl += `&price=3500-*`; 
            } else {
                apiUrl += `&price=${filters.price}`;
            }
        }

        // Mostra mensagem de carregamento
        produtosLista.innerHTML = '<p>Carregando produtos...</p>';

        // Busca produtos da API e exibe no site
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const produtos = data.results;
                totalPages = Math.ceil(data.paging.total / 50);
                if (produtos.length > 0) {
                    exibirProdutos(produtos);
                    gerarPaginacao();
                } else {
                    produtosLista.innerHTML = '<p>Nenhum produto encontrado.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                produtosLista.innerHTML = '<p>Ocorreu um erro ao carregar os produtos. Tente novamente mais tarde.</p>';
            });
    }

    // Função para exibir os produtos
    function exibirProdutos(produtos) {
        produtosLista.innerHTML = '';
        produtos.forEach(produto => {
            const produtoElement = document.createElement('div');
            produtoElement.classList.add('produto', 'col-md-4');

            const imgUrl = produto.thumbnail.replace('I.jpg', 'B.jpg');

            produtoElement.innerHTML = 
                `<img loading="lazy" src="${imgUrl}" alt="${produto.title}">
                <h3>${produto.title}</h3>
                <p>R$ ${produto.price.toFixed(2)}</p>
                <a href="${produto.permalink}" class="btn btn-primary" target="_blank">Comprar pelo Mercado Shops</a>`;
            produtosLista.appendChild(produtoElement);
        });
    }

    // Função para gerar a paginação
    function gerarPaginacao() {
        pagination.innerHTML = '';
        let paginationHTML = '';

        for (let i = 1; i <= Math.min(10, totalPages); i++) {
            paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                                <a class="page-link" href="#">${i}</a></li>`;
        }

        if (currentPage < totalPages) {
            paginationHTML += `<li class="page-item">
                                    <a class="page-link" href="#">Seguinte</a>
                                </li>`;
        }

        pagination.innerHTML = paginationHTML;

        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const selectedPage = parseInt(this.innerText);

                if (isNaN(selectedPage)) {
                    currentPage++;
                } else {
                    currentPage = selectedPage;
                }

                buscarProdutosPorCategoria(currentPage);
            });
        });
    }

    // Aplicar filtros ao clicar no botão de aplicar
    applyFiltersButton.addEventListener('click', function() {
        const selectedPrice = document.querySelector('input[name="price"]:checked');
        filters.price = selectedPrice ? selectedPrice.value : "";

        currentPage = 1;
        buscarProdutosPorCategoria(currentPage);
    });

    // Remover filtros ao clicar no botão de remover
    removeFiltersButton.addEventListener('click', function() {
        filters = {}; 
        currentCategory = ''; 
        currentPage = 1;

        // Desmarca todos os filtros de preço
        document.querySelectorAll('input[name="price"]').forEach(input => {
            input.checked = false;
        });

        buscarProdutosPorCategoria(currentPage);
    });

    // Função para busca manual
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        currentCategory = searchInput.value.trim();
        currentPage = 1;
        buscarProdutosPorCategoria(currentPage);
    });

    // Carrega produtos da categoria padrão ao iniciar a página
    buscarProdutosPorCategoria();
});
