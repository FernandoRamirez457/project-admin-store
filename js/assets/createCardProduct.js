export function createProductCard(data) {
  // Criação da estrutura base do card do produto
  const productBase = document.createElement("div");
  productBase.className = "product-base";
  productBase.id = data.id;

  // Estrutura do produto
  const product = document.createElement("div");
  product.className = "product";

  const img = document.createElement("img");
  img.src = data.imagemURL || ""; // Verifica se imageUrl está definido
  img.alt = data.nome || "Produto"; // Define um alt padrão

  const hr = document.createElement("hr");

  const h1 = document.createElement("h1");
  h1.textContent = data.nome || "Nome do Produto"; // Nome padrão caso não tenha valor

  const priceTag = document.createElement("p");
  priceTag.textContent = `R$ ${data.preco || "0,00"}`; // Preço padrão

  const statusDiv = document.createElement("div");
  statusDiv.className = "status";

  const statusText = document.createElement("p");
  statusText.textContent = data.status || "Indisponível"; // Status padrão

  // Adicionando os elementos ao div do produto
  statusDiv.appendChild(statusText);
  product.append(img, hr, h1, priceTag, statusDiv);

  // Botões de ação
  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";

  // Função auxiliar para criar botões
  const createButton = (className, id, iconClass) => {
    const button = document.createElement("button");
    button.className = className;
    button.id = id;
    button.innerHTML = `<i class="${iconClass}" style="color: #ffffff;"></i>`;
    return button;
  };

  const btnDelete = createButton("btn-action btndelete DELETE", data.id, "fa-solid fa-trash");
  const btnPut = createButton("btn-action btnput PUT", data.id, "fa-solid fa-pen");
  const btnPatch = createButton("btn-action btnpatch PATCH", data.id, "fa-solid fa-pen-to-square");

  // Adicionando os botões ao grupo de botões
  btnGroup.append(btnDelete, btnPut, btnPatch);

  // Adicionando o produto e os botões à estrutura base
  productBase.append(product, btnGroup);

  return productBase;
}
