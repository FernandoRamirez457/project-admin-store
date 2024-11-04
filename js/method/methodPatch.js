export async function methodProductPatch(dados) {
  const url = "http://localhost/loja/Controller/produto.php";

  const formData = new FormData();
  formData.append("method", "PATCH");

  for (const key in dados) {
    formData.append(key, dados[key]);
  }

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.statusText}`);
  }

  return await response.json();
}
