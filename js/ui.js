export const renderListaContatos = (contatos) => {
  const tbody = document.getElementById("listaContatos");
  tbody.innerHTML = "";

  if (contatos.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td colspan="6" class="text-center text-muted">
        Nenhum contato encontrado.
      </td>
    `;
    tbody.appendChild(tr);
    return;
  }

  const formatarTelefone = (telefone) => {
    telefone = telefone.replace(/\D/g, "");
    if (telefone.length === 11) {
      return `(${telefone.slice(0, 2)}) ${telefone.slice(
        2,
        7
      )}-${telefone.slice(7)}`;
    } else if (telefone.length === 10) {
      return `(${telefone.slice(0, 2)}) ${telefone.slice(
        2,
        6
      )}-${telefone.slice(6)}`;
    } else {
      return telefone; // fallback se não tiver o tamanho esperado
    }
  };

  contatos.forEach((c) => {
    const tr = document.createElement("tr");
    const telefoneFormatado = formatarTelefone(c.telefone);
    tr.innerHTML = `
    <td>${c.nome}</td>
    <td>${telefoneFormatado}</td>
    <td>${c.email}</td>
    <td>${c.cidade} / ${c.estado}</td>
    <td>${c.categoria}</td>
    <td>
      <button class="btn btn-sm btn-warning btn-editar" data-id="${c.id}">
        <img src="./assets/edit.svg" alt="Editar">
      </button>
      <button class="btn btn-sm btn-danger btn-excluir" data-id="${c.id}" data-bs-toggle="modal" data-bs-target="#modalNewRegisterDelete">
        <img src="./assets/trash.svg" alt="Excluir">
      </button>
    </td>
  `;
    tbody.appendChild(tr);
  });
};

export const limparFormulario = () => {
  document.getElementById("formContato").reset();
  document.getElementById("formContato").removeAttribute("data-id");
};

export const preencherFormulario = (contato) => {
  document.getElementById("nome").value = contato.nome;
  document.getElementById("telefone").value = contato.telefone;
  document.getElementById("cidade").value = contato.cidade;
  document.getElementById("estado").value = contato.estado;
  document.getElementById("email").value = contato.email;
  document.getElementById("categoria").value = contato.categoria;
};
