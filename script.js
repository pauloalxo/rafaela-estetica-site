// ================================
// 1) Rolagem suave nos links do menu
// ================================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const alvo = document.querySelector(href);
    if (!alvo) return;

    e.preventDefault();
    alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ================================
// 2) Destacar link ativo do menu conforme a seção visível
// Requer que suas seções tenham id: #inicio, #sobre, #tratamentos, #contato
// ================================
const secoes = Array.from(document.querySelectorAll("section[id], main[id]"))
  // evita pegar coisas que não sejam parte do layout
  .filter((el) => el.id);

const linksMenu = Array.from(document.querySelectorAll(".menu a[href^='#']"));

function atualizarMenuAtivo() {
  let idAtual = "";

  // posição de referência no topo (ajuste se tiver header alto)
  const yRef = 130;

  secoes.forEach((sec) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= yRef && rect.bottom >= yRef) {
      idAtual = sec.id;
    }
  });

  linksMenu.forEach((a) => {
    const hrefId = a.getAttribute("href")?.slice(1); // tira o #
    a.classList.toggle("is-active", hrefId === idAtual);
  });
}

window.addEventListener("load", atualizarMenuAtivo);
window.addEventListener("scroll", atualizarMenuAtivo);

// ================================
// 3) WhatsApp: muda a mensagem do botão flutuante conforme a seção
// (se você não quiser isso, pode apagar esse bloco)
// ================================
const wppFloat = document.querySelector(".wpp-float");
if (wppFloat) {
  const numero = "5511977641450";

  const mensagens = {
    inicio: "Olá! Vim pelo site e quero agendar uma avaliação.",
    sobre: "Olá! Vim pelo site e gostaria de saber mais sobre a clínica e o atendimento.",
    tratamentos: "Olá! Vim pelo site e tenho interesse em um procedimento. Pode me passar mais informações?",
    contato: "Olá! Vim pelo site e quero agendar uma avaliação. Qual horário disponível?",
  };

  function setWppMsg(id) {
    const msg = mensagens[id] || mensagens.inicio;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    wppFloat.setAttribute("href", url);
  }

  // seta inicial
  setWppMsg("inicio");

  // atualiza conforme a seção ativa (usa a mesma lógica do menu)
  function atualizarWppPorSecao() {
    let idAtual = "inicio";
    const yRef = 130;

    secoes.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= yRef && rect.bottom >= yRef) {
        idAtual = sec.id;
      }
    });

    setWppMsg(idAtual);
  }

  window.addEventListener("load", atualizarWppPorSecao);
  window.addEventListener("scroll", atualizarWppPorSecao);
}
function voltarProcedimentos(event) {

  event.preventDefault();

  if (window.opener) {
    window.opener.focus(); // volta para aba principal
    window.close(); // fecha a aba atual
  } else {
    window.location.href = "estetica-facial.html";
  }

}