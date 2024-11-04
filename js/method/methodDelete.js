export async function methodProductDelete(id) {
    const url = "http://localhost/loja/Controller/produto.php";
  
    const formData = new FormData();
    formData.append("method", "DELETE"); // Indica que é uma operação de DELETE
    formData.append("id", id); // Adiciona o ID do produto
  
    const response = await fetch(url, {
      method: "POST", // Usamos POST para compatibilidade com o PHP
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }
  
    return await response.json();
  }
  