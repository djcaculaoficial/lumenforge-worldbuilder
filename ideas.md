# Lumenforge — Direção de Design

## Três direções possíveis

| Theme Name | Very Brief Intro | Probability |
| --- | --- | --- |
| **Mesa de Encadernação** | Um ambiente de autoria que parece uma bancada editorial: papel, tinta, guias de corte e materiais de arquivo. Privilegia clareza tátil e concentração narrativa. | 0.07 |
| **Lanterna de Câmara** | Um estúdio cinematográfico noturno, com planos de cenário iluminados por uma fonte âmbar, controlos técnicos precisos e uma apresentação editorial. | 0.04 |
| **Estação de Sinal** | Uma consola técnica de arquitetura sonora, com camadas de radar e estados luminosos. Tem uma energia operacional mais abstrata e sistémica. | 0.09 |

## Direção escolhida: Lanterna de Câmara

### Design Movement

**Cinematic editorial tooling**, inspirado por mesas de storyboard analógicas, interfaces de composição visual e cadernos de direção de arte. O produto é um espaço de criação, não um painel administrativo: a sala criada ocupa o centro e as decisões editoriais orbitam o seu enquadramento.

### Core Principles

1. **A cena é a autoridade.** O viewport de autoria deve ser visualmente dominante e manter a composição da sala sempre legível.
2. **Técnico, mas humano.** Dados, estados e cronologias são comunicados com precisão, ao lado de marcas visuais quentes que sugerem uma ferramenta criativa.
3. **Profundidade contida.** Painéis, guias e camadas criam hierarquia por sobreposição e textura subtil, sem recorrer a ornamento gratuito.
4. **Feedback narrativo imediato.** Alterações relevantes mostram reflexos visuais no preview ou no estado de compilação, em vez de deixarem a intenção escondida em formulários.

### Color Philosophy

O fundo azul-noite quase preto representa a sala de montagem e reduz fadiga visual. Marfim quente traz legibilidade editorial, enquanto o **âmbar-fósforo** dá identidade a ações, seleções e energia criativa. Verde névoa e coral oxidado distinguem estados válidos, pontos de atenção e elementos da história. A paleta deve lembrar uma lanterna sobre papel pintado, não uma consola sci-fi com néon.

### Layout Paradigm

Uma **mesa de direção** assimétrica: uma faixa de navegação vertical estreita conduz a ferramenta; o espaço central é uma prancheta de cena; uma coluna de inspeção reúne propriedades; e a cronologia forma uma faixa contínua em baixo. A estrutura responde como um atelier, não como uma grelha uniforme de cartões.

### Signature Elements

1. **Linhas de registo** verticais e marcas de enquadramento aparecem como um sistema visual em painéis e no viewport.
2. **Selo de estado** em forma de cápsula angular associa edição, compilação e preview a uma linguagem única.
3. **Vitrais procedurais** — recortes geométricos, neblina e luzes distantes, todos desenhados por CSS/SVG no próprio produto — dão identidade ao mundo criado.

### Interaction Philosophy

Seleção é explícita e contextual, com destaques de enquadramento e ferramentas que revelam uma intenção de cada vez. Ações de alto impacto, como exportar e iniciar preview, recebem confirmação imediata através de uma alteração clara do estado do estúdio; interações recorrentes permanecem rápidas e discretas.

### Animation

Os painéis usam transições de opacidade e deslocação de até 220 ms, com easing rápido e tangível. O ambiente procedural tem micro-movimento lento — névoa, grão e partículas luminosas — apenas quando a preferência do sistema permite movimento. A cronologia e os controlos respondem instantaneamente a teclado; nada de animações longas em ferramentas de precisão.

### Typography System

Usar pilha local de sistema para cumprir o requisito sem recursos externos. A marca e os títulos usam `Georgia, 'Times New Roman', serif` em peso alto para uma voz de cinema editorial; dados, propriedades e código usam `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`; a interface corrente usa `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`. Títulos são compactos e expressivos; metadados são pequenos, em caixa alta e com espaçamento amplo.

### Brand Essence

**Lumenforge é uma oficina Lua-first para autores criarem aventuras narrativas 2D com direção, lógica e ritmo no mesmo enquadramento.**

Personalidade: **cinemática, precisa, artesanal**.

### Brand Voice

A voz é orientada à ação criativa, concreta e sem jargão promocional. CTAs descrevem a consequência; microcopy explica o estado do projeto com serenidade.

> “Enquadra a cena antes de escrever o destino.”

> “A sequência está pronta para ganhar movimento.”

### Wordmark & Logo

O logótipo é um monograma geométrico de **L** e **F** formado por duas janelas de luz sobrepostas, desenhado em SVG inline e sem texto. O wordmark conjuga um serif editorial com espaçamento de letreiros de cinema. O símbolo aparece grande na barra lateral e na marca do preview, funcionando também como favicon.

### Signature Brand Color

**Âmbar-fósforo — `#F4B45B`**. Esta cor identifica seleção, criação e o “sinal de vida” do projeto.

## Style Decisions

Todos os cenários, ícones de mundo, texturas e elementos decorativos serão **procedurais, construídos no próprio código** com CSS, SVG e dados locais. A aplicação não deve depender de imagens, fontes, APIs, bibliotecas de conteúdo ou recursos externos em tempo de execução.

O viewport de autoria mantém-se como a âncora visual do estúdio; a cronologia corre de forma contínua sob a cena. Marcas de enquadramento, linhas de registo, selos angulares e o âmbar-fósforo compõem um sistema recorrente de direção cinematográfica.

## Redesign Visual 0.5: Sala de Projeção Viva

### Direção escolhida

**Sala de Projeção Viva** aprofunda a Lanterna de Câmara: a aplicação passa a parecer uma sala de projeção em funcionamento, onde uma película luminosa atravessa a mesa de direção e transforma cada workspace numa variação da mesma arquitetura. O resultado deve ser calmo, tátil e cinematográfico — não um painel genérico com cartões escuros.

### Princípios de composição

1. **O estúdio é um enquadramento.** A barra superior torna-se uma faixa de projeção; o rail passa a ser uma tira perfurada de filme; e o conteúdo central assenta numa superfície editorial com margens e hierarquia mais generosas.
2. **Luz como feedback.** O âmbar-fósforo tem um campo de luz subtil, limitado a seleção, criação e reprodução. Superfícies passivas usam azul-petróleo, ardósia e marfim amortecido, sem brilho excessivo.
3. **Textura sem ficheiros.** Grão, vinheta, reflexo de celuloide, linhas de registo, brilho de projector, recortes e poeira luminosa são todos gerados por gradientes, pseudo-elementos e SVG/CSS locais.
4. **Movimento com intenção.** Mudanças de workspace revelam o conteúdo como uma folha que entra na mesa; controlos respondem de imediato; e apenas os elementos ambientais recebem animação lenta, desativada por `prefers-reduced-motion`.

### Layout paradigm

A interface deixa de depender de superfícies uniformes. Um **palco com bastidores** usa uma coluna lateral densa mas clara, uma cabeça de página editorial assimétrica, um centro grande com área de trabalho iluminada, e uma faixa de telemetria que parece uma legendagem técnica. Em modo estreito, o rail comprime para símbolos e as áreas secundárias passam para baixo do trabalho principal.

### Sistema cromático e tipográfico

O fundo é azul-noite profundo (`#090F1B`), elevado por painéis de petróleo (`#101C2E`) e papel nocturno (`#18263A`). O marfim (`#F6EEDA`) sustenta títulos, o âmbar-fósforo (`#F4B45B`) assinala intenção, e o verde-sálvia (`#9FC5AE`) confirma estados saudáveis. Títulos continuam em Georgia local; dados em monospace local; interface corrente em system-ui. Nenhum recurso de imagem ou fonte externa é necessário.

### Contrato de animação

Entradas de workspace usam `opacity` e `translateY` até 180 ms, com escalonamento discreto de secções. Botões reduzem para 0.97 ao clicar e projectam uma luz curta no hover. O rail evidencia a ferramenta activa por uma guia vertical em vez de uma cápsula arredondada. O ambiente recebe grão/varrimento de projector em baixa opacidade apenas quando movimento reduzido não é solicitado.

## Expansão 0.2: A Oficina Editável

O estúdio deixa de tratar o Observatório como uma demonstração fixa. A direção “Lanterna de Câmara” passa a ser uma **oficina de aventura editável**: cada clique deve alterar dados persistentes do projeto, e o preview deve interpretar esses dados.

O mundo visual adopta uma gramática de teatro de papel e folclore sombrio original — recortes, névoa, portas, janelas, lâmpadas, personagens, bilhetes e plantas — sem reproduzir personagens, cenários, diálogos ou qualquer outro conteúdo de obras externas. O objetivo é permitir aventuras narrativas ternas, estranhas e guiadas por escolhas, inteiramente com elementos procedurais locais.

### Contrato de Autoria

1. Um projeto vazio pode receber título, premissa e a sua primeira sala.
2. Uma sala pode receber elementos procedurais com posição, escala, cor, camada, visibilidade, rótulo e interação próprios.
3. O criador pode criar nós de diálogo, escolha e consequência, editar texto, ligar destinos e aplicar efeitos de estado suportados.
4. Variáveis booleanas, inteiras e de texto podem ser declaradas e usadas por condições e efeitos básicos.
5. O preview percorre salas, hotspots, texto, escolhas e os efeitos de estado presentes no projeto guardado.
6. A primeira utilização é guiada por uma sequência opcional que pode ser saltada ou retomada.
