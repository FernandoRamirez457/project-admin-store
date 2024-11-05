document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar ul li a");
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const header = document.querySelector("header");
    const sidebarLogoContainer = document.querySelector(".sidebar .logo"); // Seleciona o contêiner da logo

    // Adiciona evento de clique para os links da sidebar
    links.forEach((link) => {
        link.addEventListener("click", function () {
            links.forEach((item) => item.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Adiciona evento de clique para o botão de alternância do menu
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("visible");

        // Atualiza a visibilidade do contêiner da logo com base na largura da tela
        updateSidebarLogoVisibility();
    });

    // Função para controlar a visibilidade do cabeçalho e da logo
    const handleHeaderVisibility = () => {
        if (window.innerWidth < 1300) {
            header.classList.add("hidden"); // Esconde o header em telas pequenas
            sidebar.classList.remove("visible"); // Reseta a sidebar
        } else {
            header.classList.remove("hidden"); // Mostra o header em telas grandes
        }
        updateSidebarLogoVisibility(); // Garante que o contêiner da logo está oculto quando necessário
    };

    // Função para ocultar o contêiner da logo em telas pequenas
    const updateSidebarLogoVisibility = () => {
        if (window.innerWidth < 1300) {
            sidebarLogoContainer.style.display = "none"; // Esconde o contêiner da logo
        } else {
            sidebarLogoContainer.style.display = "flex"; // Mostra o contêiner da logo
        }
    };

    handleHeaderVisibility(); // Chama a função ao carregar a página

    // Adiciona evento de redimensionamento da janela
    window.addEventListener("resize", handleHeaderVisibility);
});
