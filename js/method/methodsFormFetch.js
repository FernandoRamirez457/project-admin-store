export async function methodProdutsWorldwide(dados, method) {
  const url = "http://localhost/loja/Controller/produto.php";

  const formData = new FormData();
  formData.append("method", method); // Adiciona o método ao FormData

  // Adiciona os outros dados do formulário
  for (const key in dados) {
    formData.append(key, dados[key]);
  }

  const response = await fetch(url, {
    method: 'POST', // Sempre usando POST
    body: formData, // Envia o FormData que inclui o método e a imagem
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.statusText}`);
  }

  return await response.json(); // Retorna a resposta JSON do servidor
}
