import {
  getContatos,
  getContato,
  createContato,
  updateContato,
  deleteContato,
} from "./api.js";

import {
  renderListaContatos,
  limparFormulario,
  preencherFormulario,
} from "./ui.js";

const atualizarLista = async () => {
  const contatos = await getContatos();
  renderListaContatos(contatos);
};

document.addEventListener("DOMContentLoaded", async () => {
  await atualizarLista();

  const modalCadastro = document.getElementById("modalNewRegister");

  // Ao abrir o modal, define título e texto do botão de acordo com o contexto
  modalCadastro.addEventListener("show.bs.modal", () => {
    const id = document.getElementById("formContato").getAttribute("data-id");
    const btn = document.getElementById("btnSubmitForm");
    const titulo = document.getElementById("tituloModalContato");

    if (!id) {
      btn.innerText = "Cadastrar";
      titulo.innerText = "Criar novo cadastro";
    }
  });

  document.body.addEventListener("click", async (e) => {
    const editBtn = e.target.closest(".btn-editar");
    const deleteBtn = e.target.closest(".btn-excluir");

    if (editBtn) {
      const id = editBtn.dataset.id;
      const contato = await getContato(id);
      preencherFormulario(contato);
      document.getElementById("formContato").setAttribute("data-id", id);

      // Atualiza modal para modo de edição
      document.getElementById("btnSubmitForm").innerText = "Editar";
      document.getElementById("tituloModalContato").innerText =
        "Editar contato";

      new bootstrap.Modal(modalCadastro).show();
    }

    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      document
        .getElementById("btnConfirmarExclusao")
        .setAttribute("data-id", id);
    }
  });
});

document.getElementById("formContato").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const id = form.getAttribute("data-id");

  const data = {
    nome: document.getElementById("nome").value.trim(),
    telefone: document.getElementById("telefone").value.replace(/\D/g, ""),
    cidade: document.getElementById("cidade").value.trim(),
    estado: document.getElementById("estado").value.trim().toUpperCase(),
    email: document.getElementById("email").value.trim(),
    categoria: document.getElementById("categoria").value,
  };

  ["nome", "telefone", "cidade", "estado", "email", "categoria"].forEach(
    (campo) => {
      const input = document.getElementById(campo);
      input.classList.remove("is-invalid");
      const feedback = document.getElementById(`erro-${campo}`);
      if (feedback) feedback.innerText = "";
    }
  );

  const setErro = (campo, mensagem) => {
    const input = document.getElementById(campo);
    input.classList.add("is-invalid");
    const feedback = document.getElementById(`erro-${campo}`);
    if (feedback) feedback.innerText = mensagem;
  };

  let temErro = false;

  if (!data.nome) {
    setErro("nome", "Nome é obrigatório");
    temErro = true;
  }

  if (!data.telefone) {
    setErro("telefone", "Telefone é obrigatório");
    temErro = true;
  } else if (!/^\d{10,11}$/.test(data.telefone)) {
    setErro("telefone", "Telefone inválido");
    temErro = true;
  }

  if (!data.cidade) {
    setErro("cidade", "Cidade é obrigatória");
    temErro = true;
  }

  if (!/^[A-Z]{2}$/.test(data.estado)) {
    setErro("estado", "Estado inválido (use sigla)");
    temErro = true;
  }

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
    setErro("email", "Email inválido");
    temErro = true;
  }

  if (!data.categoria) {
    setErro("categoria", "Categoria é obrigatória");
    temErro = true;
  }

  if (temErro) return;

  try {
    if (id) {
      await updateContato(id, data);
    } else {
      await createContato(data);
    }

    await atualizarLista();
    limparFormulario();
    form.removeAttribute("data-id");

    bootstrap.Modal.getInstance(
      document.getElementById("modalNewRegister")
    ).hide();

    const modalSucesso = document.getElementById("modalNewRegisterSucess");
    const tituloSucesso = modalSucesso.querySelector(".modal-title");

    tituloSucesso.innerText = id
      ? "Contato atualizado com sucesso!"
      : "Contato cadastrado com sucesso!";

    new bootstrap.Modal(modalSucesso).show();
  } catch (error) {
    const response = await error?.response?.json?.();
    const mensagens = response?.erros || ["Erro ao salvar contato"];
    alert("Erros:\n" + mensagens.join("\n"));
  }
});

document
  .getElementById("btnConfirmarExclusao")
  .addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    await deleteContato(id);
    await atualizarLista();

    bootstrap.Modal.getInstance(
      document.getElementById("modalNewRegisterDelete")
    ).hide();
  });
