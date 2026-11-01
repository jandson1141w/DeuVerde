# Deu Verde

Site do projeto **Deu Verde**, desenvolvido para o **Desafio Green Tech** (Gestão Ambiental e Gestão da Tecnologia da Informação). A Deu Verde é uma empresa fictícia que usa tecnologia para facilitar a denúncia de descartes irregulares e a localização de pontos de coleta de lixo eletrônico.

O site reúne as 6 semanas do projeto: ideia, empresa, diagnóstico ambiental, legislação e prevenção, gestão ambiental e plano de ação.

## Tecnologias

HTML, CSS e JavaScript puros. Não há instalação, build nem dependências externas, então funciona direto no GitHub Pages e em qualquer navegador.

- Responsivo, com abordagem mobile first (celular, tablet e computador)
- Botão para alternar entre modo claro e escuro (a escolha fica salva no navegador; na primeira visita segue o tema do sistema)
- Cores tiradas da logo e visual inspirado na loja da Apple: topo translúcido, títulos grandes e cartões arredondados
- Menu que vira tela cheia no celular
- Acessível: navegação por teclado, link de pular para o conteúdo e respeito a "reduzir movimento"

## Estrutura

```
index.html
assets/
  css/style.css
  js/main.js
  img/
    logo.png / logo.webp     logo completa
    logo-mark.png            símbolo (pin + mapa) usado no topo
    favicon-64.png           ícone da aba do navegador
    apple-touch-icon.png     ícone ao salvar na tela inicial do celular
README.md
```

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (por exemplo, `deu-verde`).
2. Envie todos os arquivos desta pasta para a raiz do repositório (`index.html` precisa ficar na raiz).
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, selecione a branch `main` e a pasta `/ (root)`, e clique em **Save**.
5. Aguarde cerca de 1 a 2 minutos. O site ficará em `https://SEU-USUARIO.github.io/deu-verde/`.

## Como testar no computador

Abra o `index.html` com dois cliques no navegador. Se preferir um servidor local:

```
python -m http.server 8000
```

e acesse `http://localhost:8000`.

## Personalizar

- Nomes da equipe e da instituição: edite o rodapé em `index.html` (há um comentário indicando o lugar).
- Cores: ajuste as variáveis no início de `assets/css/style.css` (`--forest`, `--leaf`, `--sage` e `--paper` vêm da logo; o claro e o escuro ficam em `:root` e `:root[data-theme="dark"]`).
- Logo: troque os arquivos em `assets/img/` mantendo os mesmos nomes.

> Empresa fictícia criada para fins acadêmicos. A plataforma descrita não substitui os canais oficiais de denúncia ambiental.
