/*
 * CursosHub — dados do questionário e dos cursos.
 *
 * Para adicionar um curso, copie um objeto da lista `courses` e ajuste:
 *  - tags: valores (campo `v`) das opções das perguntas que combinam com o curso;
 *  - why:  frase mostrada em "Por que apareceu?" para cada tag (opcional);
 *  - research / ask: dicas personalizadas de pesquisa e perguntas para um profissional.
 *
 * Valores válidos para `tags`:
 *  interest:    tech, people, business, science, creative, practical
 *  strength:    logic, empathy, ideas, organize, hands
 *  environment: computer, team, lab, dynamic, studio
 *  priority:    income, impact, freedom, creation, security, variety
 *  study:       projects, theory, mix, peoplelearn
 */
const CURSOSHUB = {

  // Peso de cada pergunta na pontuação. Um mesmo valor escolhido em mais de
  // uma pergunta conta uma única vez, com o maior peso entre elas.
  // As perguntas sobre a faculdade (inst_type, method, state) têm peso 0: não mudam
  // os cursos sugeridos, só a ordem das faculdades dentro de cada curso.
  weights: { interest: 4, focus: 3, strength: 3, environment: 2, priority: 2, study: 1, inst_type: 0, method: 0, state: 0 },

  questions: [
    {
      id: 'interest', label: 'O que te chama atenção',
      title: 'Qual tipo de atividade parece mais interessante?',
      desc: 'Escolha até duas opções. Não precisa pensar no que você já sabe fazer — vale o que desperta curiosidade.',
      multi: true,
      options: [
        { v: 'tech', e: '⌘', t: 'Criar com tecnologia', d: 'Aplicativos, sites, jogos e soluções digitais.' },
        { v: 'people', e: '♡', t: 'Ajudar e entender pessoas', d: 'Ensinar, cuidar, ouvir e melhorar vidas.' },
        { v: 'business', e: '↗', t: 'Tocar ideias e negócios', d: 'Planejar projetos, liderar e empreender.' },
        { v: 'science', e: '◉', t: 'Investigar e descobrir', d: 'Pesquisar, testar hipóteses e entender como as coisas funcionam.' },
        { v: 'creative', e: '✳', t: 'Criar e comunicar', d: 'Design, arte, conteúdo, escrita e expressão.' },
        { v: 'practical', e: '⚙', t: 'Construir coisas práticas', d: 'Resolver problemas concretos, equipamentos e processos.' }
      ]
    },
    {
      id: 'strength', label: 'Seu jeito de pensar',
      title: 'Quando aparece um problema, você costuma…',
      desc: 'Pense no que parece mais natural para você, mesmo que varie de situação para situação.',
      multi: false,
      options: [
        { v: 'logic', e: '⌘', t: 'Quebrar em partes e encontrar padrões', d: 'Gosto de lógica, dados e descobrir por que algo acontece.' },
        { v: 'empathy', e: '☻', t: 'Conversar e entender as pessoas', d: 'Escuto, observo necessidades e penso em como ajudar.' },
        { v: 'ideas', e: '✦', t: 'Imaginar várias soluções diferentes', d: 'Gosto de criatividade, visual e novas possibilidades.' },
        { v: 'organize', e: '▤', t: 'Organizar etapas e fazer acontecer', d: 'Planejo, coordeno e acompanho até ficar pronto.' },
        { v: 'hands', e: '⚒', t: 'Experimentar na prática', d: 'Prefiro testar, montar e aprender fazendo.' }
      ]
    },
    {
      id: 'environment', label: 'Seu ambiente ideal',
      title: 'Em qual ambiente você se imagina trabalhando?',
      desc: 'Não é uma decisão definitiva. É só uma pista sobre o tipo de rotina que combina com você.',
      multi: false,
      options: [
        { v: 'computer', e: '▣', t: 'Computador e ferramentas digitais', d: 'Criando, programando, analisando ou projetando.' },
        { v: 'team', e: '♧', t: 'Em equipe, com bastante conversa', d: 'Pessoas, colaboração, orientação e negociação.' },
        { v: 'lab', e: '⚗', t: 'Laboratório, pesquisa ou campo', d: 'Investigações, experimentos e observação.' },
        { v: 'dynamic', e: '↗', t: 'Uma rotina variada e mão na massa', d: 'Projetos, operações, equipamentos e situações reais.' },
        { v: 'studio', e: '✳', t: 'Um espaço criativo', d: 'Conceitos, imagens, comunicação e criação.' }
      ]
    },
    {
      id: 'priority', label: 'O que pesa na escolha',
      title: 'O que mais importa para você em uma carreira?',
      desc: 'Escolha até duas prioridades. Não existe resposta certa — elas só ajudam a direcionar as sugestões.',
      multi: true,
      options: [
        { v: 'income', e: '$', t: 'Boa perspectiva financeira', d: 'Quero construir estabilidade e crescer profissionalmente.' },
        { v: 'impact', e: '♡', t: 'Fazer diferença na vida de alguém', d: 'Quero sentir que meu trabalho tem propósito.' },
        { v: 'freedom', e: '⌁', t: 'Flexibilidade e autonomia', d: 'Valorizo liberdade para organizar meu trabalho.' },
        { v: 'creation', e: '✦', t: 'Criar e aprender sempre', d: 'Quero desafios e espaço para desenvolver ideias.' },
        { v: 'security', e: '▣', t: 'Estabilidade e previsibilidade', d: 'Prefiro uma trajetória mais estruturada.' },
        { v: 'variety', e: '⟳', t: 'Variedade de caminhos', d: 'Quero poder atuar em áreas diferentes.' }
      ]
    },
    {
      id: 'study', label: 'Como você aprende',
      title: 'Que tipo de aprendizado mais combina com você?',
      desc: 'Isso ajuda a pensar também no formato de formação que vale a pena pesquisar.',
      multi: false,
      options: [
        { v: 'projects', e: '⚒', t: 'Projetos e desafios reais', d: 'Aprendo melhor criando algo e testando ideias.' },
        { v: 'theory', e: '▤', t: 'Teoria e estudo aprofundado', d: 'Gosto de entender conceitos antes de aplicar.' },
        { v: 'mix', e: '⟳', t: 'Um equilíbrio entre os dois', d: 'Quero base teórica e oportunidade de praticar.' },
        { v: 'peoplelearn', e: '☻', t: 'Discussões e troca com pessoas', d: 'Aprendo conversando, explicando e colaborando.' }
      ]
    },
    {
      id: 'inst_type', label: 'Sobre a faculdade · Tipo',
      title: 'Você prefere estudar em faculdade pública ou privada?',
      desc: 'Isso muda o tipo de acesso e de ajuda financeira. Públicas são gratuitas e o ingresso é por processo seletivo. Privadas cobram mensalidade, mas costumam ter bolsas e financiamento. É só uma preferência: nenhuma opção é excluída.',
      multi: false,
      options: [
        { v: 'type_public', e: '⌂', t: 'Pública', d: 'Gratuita, com ingresso por vestibular ou Sisu.' },
        { v: 'type_private', e: '▣', t: 'Privada', d: 'Com mensalidade e possibilidade de bolsas ou financiamento.' },
        { v: 'type_any', e: '⟳', t: 'Tanto faz', d: 'Quero ver as duas e comparar.' }
      ]
    },
    {
      id: 'method', label: 'Sobre a faculdade · Metodologia',
      title: 'Que jeito de ensinar combina mais com você?',
      desc: 'Só algumas faculdades têm o método confirmado nas fontes que consultamos. As outras aparecem como “método não confirmado”.',
      multi: false,
      options: [
        { v: 'm_proj', e: '⚒', t: 'Projetos e problemas reais', d: 'Aprender fazendo, em grupo, com desafios de empresas e da sociedade.' },
        { v: 'm_theory', e: '▤', t: 'Aulas, teoria e pesquisa', d: 'Estudo aprofundado, laboratórios e iniciação científica.' },
        { v: 'm_mix', e: '✦', t: 'Uma mistura dos dois', d: 'Base teórica com bastante prática.' },
        { v: 'm_any', e: '⟳', t: 'Tanto faz', d: 'Ainda não sei ou não é o mais importante.' }
      ]
    },
    {
      id: 'state', label: 'Sobre a faculdade · Lugar',
      title: 'Em qual estado você mora ou gostaria de estudar?',
      desc: 'Não exclui nenhuma faculdade: só coloca as do seu estado um pouco à frente. Se não importa, escolha “Tanto faz”.',
      multi: false,
      kind: 'select',
      selectLabel: 'Estado',
      options: [
        { v: 'any', t: 'Tanto faz' },
        { v: 'AC', t: 'Acre' }, { v: 'AL', t: 'Alagoas' }, { v: 'AP', t: 'Amapá' }, { v: 'AM', t: 'Amazonas' },
        { v: 'BA', t: 'Bahia' }, { v: 'CE', t: 'Ceará' }, { v: 'DF', t: 'Distrito Federal' }, { v: 'ES', t: 'Espírito Santo' },
        { v: 'GO', t: 'Goiás' }, { v: 'MA', t: 'Maranhão' }, { v: 'MT', t: 'Mato Grosso' }, { v: 'MS', t: 'Mato Grosso do Sul' },
        { v: 'MG', t: 'Minas Gerais' }, { v: 'PA', t: 'Pará' }, { v: 'PB', t: 'Paraíba' }, { v: 'PR', t: 'Paraná' },
        { v: 'PE', t: 'Pernambuco' }, { v: 'PI', t: 'Piauí' }, { v: 'RJ', t: 'Rio de Janeiro' }, { v: 'RN', t: 'Rio Grande do Norte' },
        { v: 'RS', t: 'Rio Grande do Sul' }, { v: 'RO', t: 'Rondônia' }, { v: 'RR', t: 'Roraima' }, { v: 'SC', t: 'Santa Catarina' },
        { v: 'SP', t: 'São Paulo' }, { v: 'SE', t: 'Sergipe' }, { v: 'TO', t: 'Tocantins' }
      ]
    }
  ],

  // Opções da pergunta "Vamos afunilar", que mudam conforme os interesses escolhidos.
  focusByInterest: {
    tech: [
      { v: 'logic', e: '⌘', t: 'Lógica e programação', d: 'Criar sistemas, aplicativos e resolver desafios.' },
      { v: 'science', e: '◉', t: 'Dados e inteligência artificial', d: 'Encontrar padrões e construir soluções inteligentes.' },
      { v: 'creative', e: '✳', t: 'Experiência e design digital', d: 'Pensar em interfaces e produtos fáceis de usar.' },
      { v: 'practical', e: '⚙', t: 'Tecnologia aplicada', d: 'Automação, dispositivos e problemas do mundo real.' }
    ],
    people: [
      { v: 'empathy', e: '♡', t: 'Comportamento e bem-estar', d: 'Entender necessidades e apoiar pessoas.' },
      { v: 'organize', e: '▤', t: 'Educação e desenvolvimento', d: 'Ajudar pessoas a aprender e evoluir.' },
      { v: 'science', e: '◉', t: 'Pesquisa sobre pessoas', d: 'Investigar comportamento e sociedade.' },
      { v: 'business', e: '↗', t: 'Pessoas nas organizações', d: 'Trabalhar com equipes, cultura e desenvolvimento.' }
    ],
    business: [
      { v: 'organize', e: '▤', t: 'Gestão e operações', d: 'Organizar recursos, processos e projetos.' },
      { v: 'logic', e: '⌘', t: 'Estratégia e análise', d: 'Usar dados e raciocínio para decidir.' },
      { v: 'creative', e: '✳', t: 'Marcas e comunicação', d: 'Criar ideias e conectar produtos a públicos.' },
      { v: 'people', e: '♡', t: 'Liderança e pessoas', d: 'Colaborar, negociar e desenvolver equipes.' }
    ],
    science: [
      { v: 'logic', e: '⌘', t: 'Modelos e números', d: 'Usar lógica, matemática e análise.' },
      { v: 'practical', e: '⚙', t: 'Experimentos e aplicações', d: 'Testar hipóteses e construir soluções.' },
      { v: 'tech', e: '⌬', t: 'Computação e novas tecnologias', d: 'Investigar dados, software e IA.' },
      { v: 'people', e: '♡', t: 'Saúde e sociedade', d: 'Pesquisar questões ligadas à vida e às pessoas.' }
    ],
    creative: [
      { v: 'ideas', e: '✦', t: 'Ideias e conceitos', d: 'Imaginar possibilidades e experimentar caminhos.' },
      { v: 'people', e: '♡', t: 'Histórias e pessoas', d: 'Comunicar, entender públicos e criar conexões.' },
      { v: 'business', e: '↗', t: 'Criatividade com estratégia', d: 'Unir criação, marcas e objetivos.' },
      { v: 'tech', e: '⌘', t: 'Criação digital', d: 'Projetar experiências para sites e aplicativos.' }
    ],
    practical: [
      { v: 'hands', e: '⚒', t: 'Construir e testar', d: 'Aprender fazendo e trabalhando com soluções reais.' },
      { v: 'logic', e: '⌘', t: 'Diagnosticar problemas', d: 'Entender causas e melhorar sistemas.' },
      { v: 'organize', e: '▤', t: 'Melhorar processos', d: 'Planejar etapas e tornar o trabalho mais eficiente.' },
      { v: 'science', e: '◉', t: 'Investigar como funciona', d: 'Observar, medir e testar explicações.' }
    ]
  },

  courses: [
    {
      name: 'Análise e Desenvolvimento de Sistemas', icon: '⌘',
      desc: 'Criação e manutenção de sistemas, aplicações e soluções digitais. Formação tecnológica com foco aplicado.',
      tags: ['tech', 'logic', 'computer', 'projects', 'mix', 'income', 'creation', 'variety'],
      areas: 'Desenvolvimento web, software, QA e análise de sistemas.',
      why: {
        tech: 'Você demonstrou interesse em criar com tecnologia',
        logic: 'seu jeito lógico de resolver problemas combina com análise de sistemas',
        computer: 'você se imagina trabalhando com ferramentas digitais'
      },
      research: 'Veja quanta programação e quantos projetos práticos aparecem já nos primeiros semestres, e se a faculdade tem estágio ou projeto integrador.',
      ask: ['O que você faz em um dia comum de trabalho: mais escrever código, mais conversar com clientes ou mais corrigir problemas?', 'O que a faculdade ensinou que você realmente usa, e o que precisou aprender por conta própria?']
    },
    {
      name: 'Ciência da Computação', icon: '⌬',
      desc: 'Computação em profundidade: algoritmos, programação, sistemas e fundamentos que sustentam novas tecnologias.',
      tags: ['tech', 'science', 'logic', 'computer', 'theory', 'creation', 'income'],
      areas: 'Software, inteligência artificial, pesquisa e computação.',
      why: {
        tech: 'você tem curiosidade por tecnologia',
        science: 'você gosta de investigar como as coisas funcionam',
        logic: 'seu perfil analítico pode combinar com algoritmos e computação'
      },
      research: 'Compare quanto de matemática e teoria (algoritmos, estruturas de dados) aparece na grade e se há iniciação científica ou projetos de pesquisa.',
      ask: ['Quanta matemática você usa no dia a dia da profissão?', 'Qual a diferença, na prática, entre quem estudou Ciência da Computação e quem fez um curso tecnológico?']
    },
    {
      name: 'Ciência de Dados', icon: '◉',
      desc: 'Uso de estatística, programação e análise para encontrar padrões e apoiar decisões com dados.',
      tags: ['tech', 'science', 'logic', 'computer', 'lab', 'income', 'theory', 'variety'],
      areas: 'Análise de dados, BI, modelagem e ciência de dados.',
      why: {
        science: 'você se interessa por investigação',
        logic: 'seu jeito de procurar padrões é relevante para analisar dados',
        income: 'você valoriza perspectivas de crescimento profissional'
      },
      research: 'Olhe o peso de estatística e programação na grade e procure exemplos de projetos com dados reais que os estudantes costumam fazer.',
      ask: ['Quanto do seu tempo é limpar e organizar dados e quanto é analisar?', 'Que tipo de pergunta de negócio ou de pesquisa você ajuda a responder?']
    },
    {
      name: 'Sistemas de Informação', icon: '▤',
      desc: 'Combina tecnologia, processos e necessidades de organizações para construir soluções úteis.',
      tags: ['tech', 'business', 'logic', 'organize', 'computer', 'team', 'projects', 'mix', 'income', 'variety'],
      areas: 'Análise de negócios, sistemas, produto e gestão de TI.',
      why: {
        business: 'você se interessa por negócios e soluções',
        organize: 'você gosta de organizar etapas e fazer acontecer',
        tech: 'você quer usar tecnologia para resolver problemas'
      },
      research: 'Veja como a grade divide disciplinas de tecnologia e de gestão, e se há projetos feitos com empresas reais.',
      ask: ['Você trabalha mais com a parte técnica ou mais com a ponte entre tecnologia e negócio?', 'Que tipo de empresa contrata esse perfil na sua região?']
    },
    {
      name: 'Administração', icon: '↗',
      desc: 'Gestão de organizações, estratégia, pessoas, operações, finanças e empreendedorismo.',
      tags: ['business', 'people', 'organize', 'team', 'income', 'security', 'variety', 'freedom', 'mix'],
      areas: 'Gestão, finanças, operações, RH e empreendedorismo.',
      why: {
        business: 'você se interessa por negócios',
        organize: 'seu perfil organizado pode ajudar na gestão',
        team: 'você se imagina colaborando e tomando decisões com outras pessoas',
        freedom: 'você valoriza autonomia, e a área permite caminhos como empreender'
      },
      research: 'Procure em quais áreas o curso permite se aprofundar (finanças, pessoas, operações) e se há empresa júnior ou projetos de consultoria.',
      ask: ['Como foi escolher a área em que você atua dentro da Administração?', 'O que você faria diferente na sua escolha de estágio ou primeiro emprego?']
    },
    {
      name: 'Design', icon: '✳',
      desc: 'Pesquisa e criação de experiências, produtos e comunicação visual centradas nas necessidades das pessoas.',
      tags: ['creative', 'ideas', 'studio', 'creation', 'projects', 'impact', 'freedom'],
      areas: 'Design gráfico, UX/UI, produto e comunicação visual.',
      why: {
        creative: 'você se interessa por criação e comunicação',
        ideas: 'você gosta de imaginar diferentes soluções',
        studio: 'um ambiente criativo chamou sua atenção',
        freedom: 'você valoriza autonomia, algo comum em carreiras criativas'
      },
      research: 'Veja portfólios de estudantes e egressos da instituição e confira se a grade cobre processo de projeto, não só ferramentas.',
      ask: ['Como você montou seu portfólio e o que as pessoas olham nele?', 'Como é lidar com feedback e prazos de clientes no seu dia a dia?']
    },
    {
      name: 'Psicologia', icon: '♡',
      desc: 'Estudo do comportamento e dos processos mentais, com atuação em diferentes contextos e áreas.',
      tags: ['people', 'empathy', 'team', 'impact', 'peoplelearn', 'theory', 'freedom'],
      areas: 'Clínica, organizações, educação e pesquisa.',
      why: {
        people: 'você se interessa por compreender pessoas',
        empathy: 'seu jeito de ouvir e entender necessidades pode combinar',
        impact: 'você valoriza contribuir para a vida de outras pessoas'
      },
      research: 'Veja quais abordagens teóricas a grade apresenta, quando começam os estágios e quais áreas de atuação o curso destaca.',
      ask: ['Como você lida emocionalmente com o peso das histórias que ouve?', 'Quais caminhos além da clínica você conhece dentro da profissão?']
    },
    {
      name: 'Pedagogia', icon: '✎',
      desc: 'Estudo dos processos de ensino e aprendizagem, desenvolvimento e práticas educativas.',
      tags: ['people', 'empathy', 'team', 'impact', 'peoplelearn', 'security', 'mix'],
      areas: 'Educação, coordenação pedagógica e projetos educacionais.',
      why: {
        people: 'você demonstrou interesse por pessoas',
        peoplelearn: 'você valoriza a troca de conhecimentos',
        impact: 'você quer que seu trabalho tenha propósito'
      },
      research: 'Confira quando começam os estágios em escolas e quais campos além da sala de aula (coordenação, projetos, educação não escolar) o curso aborda.',
      ask: ['O que mais te motiva e o que mais cansa na rotina de ensinar?', 'Que caminhos existem além de lecionar com a formação em Pedagogia?']
    },
    {
      name: 'Engenharia de Produção', icon: '⚙',
      desc: 'Melhoria de processos, sistemas produtivos, qualidade, logística e uso eficiente de recursos.',
      tags: ['practical', 'organize', 'logic', 'dynamic', 'business', 'income', 'variety', 'mix'],
      areas: 'Processos, qualidade, logística, operações e projetos.',
      why: {
        practical: 'você gosta de resolver problemas concretos',
        organize: 'você prefere organizar etapas e acompanhar resultados',
        dynamic: 'você quer uma rotina variada e prática'
      },
      research: 'Veja o equilíbrio entre cálculo, estatística e gestão na grade e se a instituição tem projetos ou estágios em indústrias e serviços.',
      ask: ['Em que tipo de empresa você trabalha e como é a rotina fora do escritório?', 'Quais conhecimentos de exatas você mais usa de fato?']
    },
    {
      name: 'Engenharia Elétrica', icon: 'ϟ',
      desc: 'Estudo e desenvolvimento de sistemas elétricos, energia, eletrônica e automação.',
      tags: ['practical', 'science', 'hands', 'lab', 'dynamic', 'theory', 'mix'],
      areas: 'Energia, eletrônica, automação e sistemas elétricos.',
      why: {
        practical: 'você se interessa por soluções concretas',
        hands: 'você prefere experimentar na prática',
        science: 'você gosta de investigar como sistemas funcionam'
      },
      research: 'Confira quantas aulas de laboratório existem e quais ênfases (energia, eletrônica, automação) a instituição oferece.',
      ask: ['Qual ênfase você escolheu e por quê?', 'Como é dividido seu tempo entre projeto, campo e relatórios?']
    },
    {
      name: 'Marketing', icon: '↗',
      desc: 'Entendimento de públicos, estratégia de marca, comunicação, conteúdo e comportamento de consumo.',
      tags: ['business', 'creative', 'ideas', 'team', 'studio', 'income', 'variety', 'freedom'],
      areas: 'Estratégia, conteúdo, pesquisa de mercado e comunicação.',
      why: {
        creative: 'você gosta de criar e comunicar',
        business: 'você se interessa por estratégia e negócios',
        team: 'você se imagina trabalhando com pessoas'
      },
      research: 'Veja se a grade mistura criação com análise de dados e pesquisa, e compare cursos de graduação com formações tecnológicas da área.',
      ask: ['Quanto do seu trabalho é criativo e quanto é análise de números?', 'Como você acompanha as mudanças de plataformas e ferramentas?']
    },
    {
      name: 'Enfermagem', icon: '✚',
      desc: 'Cuidado à saúde, acompanhamento de pacientes e atuação em equipes e serviços de saúde.',
      tags: ['people', 'empathy', 'practical', 'hands', 'team', 'impact', 'dynamic', 'mix'],
      areas: 'Hospitais, atenção básica, clínicas e saúde coletiva.',
      why: {
        people: 'você se interessa por ajudar pessoas',
        empathy: 'seu foco em compreender necessidades pode ser relevante',
        hands: 'você valoriza aprender e agir na prática'
      },
      research: 'Veja quando começam os estágios, onde eles acontecem (hospital, unidade básica) e quais áreas de atuação a instituição destaca.',
      ask: ['Como são os turnos e a carga física e emocional da rotina?', 'Quais áreas de especialização existem e como você escolheu a sua?']
    },
    {
      name: 'Direito', icon: '⚖',
      desc: 'Estudo das leis, da justiça e da organização da sociedade, com foco em argumentar, interpretar normas e resolver conflitos.',
      tags: ['business', 'people', 'logic', 'organize', 'team', 'income', 'security', 'theory', 'variety', 'mix'],
      areas: 'Advocacia, carreiras públicas, consultoria jurídica e empresas.',
      why: {
        logic: 'seu raciocínio analítico combina com interpretar e argumentar',
        organize: 'você gosta de organizar etapas e acompanhar um caso até o fim',
        security: 'você valoriza uma trajetória estruturada, como as carreiras públicas da área'
      },
      research: 'Veja a grade de disciplinas, se há núcleo de prática jurídica e quais caminhos (advocacia, concursos, empresas) a instituição apresenta.',
      ask: ['Como é a rotina de leitura e escrita no seu trabalho?', 'O que muda entre advogar, trabalhar em empresa e seguir carreira pública?']
    },
    {
      name: 'Medicina', icon: '⚕',
      desc: 'Formação para o cuidado da saúde, com estudo do corpo humano, diagnóstico, tratamento e prevenção de doenças.',
      tags: ['science', 'people', 'empathy', 'lab', 'dynamic', 'impact', 'income', 'theory', 'hands', 'mix'],
      areas: 'Hospitais, clínicas, saúde pública, pesquisa e especialidades médicas.',
      why: {
        science: 'você gosta de investigar como as coisas funcionam',
        empathy: 'seu jeito de ouvir pode ser relevante no cuidado com pacientes',
        impact: 'você quer que seu trabalho faça diferença na vida de alguém'
      },
      research: 'Procure como é a divisão entre ciclo básico, clínico e internato, e quanto tempo de formação e de especialização a carreira costuma exigir.',
      ask: ['Como você lida com a carga de estudo e com decisões difíceis no dia a dia?', 'Como foi escolher a especialidade e o que você não sabia antes?']
    },
    {
      name: 'Arquitetura e Urbanismo', icon: '⌂',
      desc: 'Projeto de edifícios, espaços e cidades, unindo criatividade, técnica construtiva e estudo de como as pessoas vivem.',
      tags: ['creative', 'practical', 'ideas', 'studio', 'creation', 'projects', 'impact', 'freedom', 'mix'],
      areas: 'Projetos de edificações, interiores, urbanismo e restauro.',
      why: {
        creative: 'você se interessa por criar e comunicar ideias',
        ideas: 'você gosta de imaginar diferentes soluções',
        studio: 'um ambiente criativo chamou sua atenção'
      },
      research: 'Veja o peso de ateliês de projeto, desenho e disciplinas técnicas na grade e como é o portfólio de trabalhos dos estudantes.',
      ask: ['Como equilibrar criatividade com normas, custos e prazos de obra?', 'Qual a diferença entre trabalhar em escritório e como autônomo?']
    },
    {
      name: 'Ciências Contábeis', icon: '∑',
      desc: 'Registro, análise e interpretação das informações financeiras de pessoas e organizações, além de tributos e auditoria.',
      tags: ['business', 'logic', 'organize', 'computer', 'income', 'security', 'theory', 'freedom'],
      areas: 'Contabilidade, auditoria, perícia, área fiscal e consultoria.',
      why: {
        logic: 'seu jeito de organizar informações e achar padrões combina com análise contábil',
        organize: 'você gosta de organizar etapas e fazer acontecer',
        security: 'você valoriza previsibilidade na carreira'
      },
      research: 'Confira se a grade cobre contabilidade, tributos e auditoria, e se a instituição orienta para o exame de suficiência do conselho profissional.',
      ask: ['Quais tarefas se repetem e quais exigem análise de verdade?', 'Como é trabalhar em escritório, em empresa e como autônomo?']
    },
    {
      name: 'Letras', icon: '❝',
      desc: 'Estudo da língua, da literatura e da linguagem, com foco em leitura, escrita, análise de textos e ensino.',
      tags: ['creative', 'people', 'ideas', 'studio', 'peoplelearn', 'theory', 'impact', 'freedom'],
      areas: 'Ensino, revisão e edição, tradução, produção de conteúdo e pesquisa.',
      why: {
        creative: 'você gosta de escrever, ler e se expressar',
        peoplelearn: 'você aprende bem com discussão e troca de ideias',
        ideas: 'você gosta de explorar diferentes pontos de vista'
      },
      research: 'Veja se o curso é de licenciatura ou bacharelado, quais línguas e literaturas são oferecidas e se há práticas de ensino ou de edição.',
      ask: ['Em que você trabalha hoje e como a formação em Letras ajudou?', 'Quais habilidades além da escrita o mercado pede nesse caminho?']
    },
    {
      name: 'Educação Física', icon: '⚑',
      desc: 'Estudo do movimento humano, esporte, saúde e atividade física, com atuação em ensino, treinamento e promoção de bem-estar.',
      tags: ['people', 'practical', 'hands', 'dynamic', 'team', 'impact', 'projects', 'peoplelearn', 'mix', 'freedom'],
      areas: 'Escolas, academias, treinamento esportivo, saúde e lazer.',
      why: {
        people: 'você se interessa por ajudar e orientar pessoas',
        hands: 'você aprende fazendo e experimentando',
        dynamic: 'você quer uma rotina variada e dinâmica'
      },
      research: 'Veja se a opção é licenciatura (escola) ou bacharelado (academias, clubes, saúde) e quanta prática a grade inclui.',
      ask: ['Como é montar sua rotina de aulas, treinos e atendimento?', 'Que caminhos existem além de academia e escola?']
    },
    {
      name: 'Nutrição', icon: '◐',
      desc: 'Estudo da alimentação e dos nutrientes, com foco em saúde, prevenção de doenças e orientação alimentar.',
      tags: ['science', 'people', 'empathy', 'lab', 'impact', 'income', 'theory', 'mix', 'freedom'],
      areas: 'Consultório, hospitais, alimentação coletiva, esporte e indústria de alimentos.',
      why: {
        science: 'você gosta de investigar como as coisas funcionam',
        people: 'você se interessa por ajudar pessoas',
        impact: 'você valoriza fazer diferença na vida de alguém'
      },
      research: 'Veja as áreas em que a grade se aprofunda (clínica, coletiva, esportiva) e quais estágios a instituição oferece.',
      ask: ['Como é atender pessoas com objetivos e hábitos muito diferentes?', 'Quais áreas de atuação você vê crescendo?']
    },
    {
      name: 'Jornalismo', icon: '✉',
      desc: 'Apuração, produção e análise de informação para diferentes mídias, com atenção à ética, à linguagem e ao interesse público.',
      tags: ['creative', 'people', 'ideas', 'dynamic', 'team', 'variety', 'freedom', 'peoplelearn', 'projects'],
      areas: 'Redações, assessoria de imprensa, produção de conteúdo, rádio, TV e mídias digitais.',
      why: {
        creative: 'você gosta de criar e comunicar',
        people: 'você se interessa por ouvir e entender pessoas',
        variety: 'você valoriza variedade de caminhos'
      },
      research: 'Veja quais laboratórios (rádio, TV, mídias digitais) a faculdade tem e se os estudantes produzem trabalhos publicados.',
      ask: ['Como é a rotina de apuração e de prazos no seu trabalho?', 'Como o mercado mudou desde que você começou?']
    },
    {
      name: 'Engenharia Civil', icon: '▦',
      desc: 'Planejamento, projeto e execução de obras e infraestrutura, como edificações, estradas, saneamento e estruturas.',
      tags: ['practical', 'logic', 'organize', 'dynamic', 'hands', 'income', 'security', 'projects', 'mix', 'variety'],
      areas: 'Construção civil, projetos estruturais, infraestrutura e gestão de obras.',
      why: {
        practical: 'você gosta de construir coisas práticas',
        organize: 'você prefere organizar etapas e acompanhar resultados',
        hands: 'você aprende melhor experimentando'
      },
      research: 'Confira o peso de cálculo e física no início da grade, o número de aulas práticas e laboratórios e as ênfases oferecidas.',
      ask: ['Quanto do seu tempo é no escritório e quanto é em obra?', 'Quais conhecimentos de exatas você mais usa?']
    },
    {
      name: 'Ciências Biológicas', icon: '❀',
      desc: 'Estudo dos seres vivos e do ambiente, da genética à ecologia, com atuação em pesquisa, saúde, meio ambiente e educação.',
      tags: ['science', 'people', 'lab', 'logic', 'theory', 'creation', 'impact', 'variety', 'practical'],
      areas: 'Pesquisa, meio ambiente, laboratórios, biotecnologia e ensino.',
      why: {
        science: 'você gosta de investigar e entender como a vida funciona',
        lab: 'você se imagina em laboratório ou em campo',
        theory: 'você aprecia estudo aprofundado'
      },
      research: 'Veja se o curso é bacharelado ou licenciatura, quais áreas (genética, ecologia, microbiologia) têm destaque e se há iniciação científica.',
      ask: ['Como é a rotina entre laboratório, campo e escrita de relatórios?', 'Quais caminhos existem fora da pesquisa acadêmica?']
    }
  ]
};
