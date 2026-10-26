/*
 * CursosHub — instituições de ensino superior.
 *
 * Regras deste arquivo:
 *  - Só entra o que apareceu em uma fonte consultada. Cada instituição lista suas fontes com data.
 *  - Quando um dado NÃO foi encontrado (ex.: nota do MEC, metodologia), o campo fica vazio ou
 *    marcado como "não confirmado". Nada é estimado.
 *  - As listas de cursos mostram só os cursos que o guia conhece (nomes iguais aos de data.js).
 *    Elas podem estar incompletas ou desatualizadas: confirme sempre no e-MEC e no site da instituição.
 *  - Edital, mensalidade e bolsas mudam todo semestre. A data de cada fonte aparece na tela.
 *
 * Campos:
 *  type: 'public' | 'private'      states: UFs onde a instituição tem campus relevante
 *  quality.igc: faixa 1–5 do MEC/INEP (null = não localizada)   quality.value: IGC contínuo (opcional)
 *  method.tags: 'm_proj' (projetos) | 'm_theory' (aulas e estudo aprofundado) | 'm_mix'
 *  method.verified: true só quando a própria fonte descreve o método
 *  scholarships.own: a instituição tem programa próprio de bolsas? (relevante para privadas)
 */
const INSTITUTIONS_VERIFIED_AT = '2026-10-23';

const INSTITUTIONS = [
  /* ---------------------------------------------------------------- PÚBLICAS */
  {
    id: 'usp',
    name: 'Universidade de São Paulo (USP)',
    short: 'USP',
    type: 'public',
    city: 'São Paulo e interior (SP)',
    states: ['SP'],
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Nutrição', 'Pedagogia', 'Letras', 'Educação Física', 'Jornalismo', 'Design', 'Arquitetura e Urbanismo', 'Administração', 'Ciências Contábeis', 'Ciências Biológicas', 'Ciência da Computação', 'Sistemas de Informação', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção'],
    quality: { igc: null, text: 'Não participa do Enade, por isso não entra no ranking do IGC e não dá para comparar por essa nota.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: aulas, laboratórios e iniciação científica. O método varia bastante de curso para curso; não confirmamos por curso.' },
    strengths: [
      'Gratuita e com uma das listas de cursos mais amplas deste guia (segundo a lista consultada, de 2022).',
      'Ingresso pela Fuvest.'
    ],
    cautions: [
      'Sem IGC para comparar com as outras instituições.',
      'Os cursos mais procurados costumam ser muito disputados no processo seletivo.',
      'Os cursos ficam em campi diferentes; confirme onde o seu é oferecido.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Veja no edital as vagas reservadas (cotas) e o apoio estudantil, como moradia, alimentação e auxílios.']
    },
    sources: [
      { t: 'Lista de cursos da USP (Guia da Carreira, 25/05/2022)', url: 'https://www.guiadacarreira.com.br/blog/conheca-a-lista-de-cursos-oferecidos-pela-usp' },
      { t: 'IGC 2022: a USP não participa do Enade (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },
  {
    id: 'unicamp',
    name: 'Universidade Estadual de Campinas (Unicamp)',
    short: 'Unicamp',
    type: 'public',
    city: 'Campinas e Limeira (SP)',
    states: ['SP'],
    courses: ['Medicina', 'Arquitetura e Urbanismo', 'Ciência da Computação', 'Ciências Biológicas', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção', 'Sistemas de Informação'],
    quality: { igc: 5, value: 4.595, year: 2022, text: 'IGC 5 (4,595) no ciclo de 2022, o 10º maior índice da lista dos 50 melhores.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa, com forte presença de laboratórios e iniciação científica. Não confirmamos o método por curso.' },
    strengths: [
      'IGC 5 (4,595) em 2022, entre as maiores notas da lista do MEC.',
      'Gratuita. Oferece 69 cursos de graduação e 2.530 vagas no vestibular 2026.'
    ],
    cautions: [
      'Concorrência muito alta: no vestibular 2026 foram 242 candidatos por vaga em Medicina, 67 em Arquitetura e Urbanismo e 65 em Ciência da Computação.',
      'A lista de cursos aqui é parcial: só aparecem os que constavam nas fontes consultadas. Confirme se o seu é oferecido.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Ingresso por vestibular próprio. Veja no manual do candidato as vagas reservadas e o apoio estudantil.']
    },
    sources: [
      { t: 'Carreiras mais procuradas na Unicamp 2026 (CNN Brasil, 22/09/2025)', url: 'https://www.cnnbrasil.com.br/educacao/unicamp-2026-confira-as-dez-carreiras-mais-procuradas-no-vestibular/' },
      { t: 'Boletim PRG 03/2026 (Unicamp)', url: 'https://www.prg.unicamp.br/wp-content/uploads/sites/42/2026/04/Boletim-PRG-03-2026.pdf' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },
  {
    id: 'ufmg',
    name: 'Universidade Federal de Minas Gerais (UFMG)',
    short: 'UFMG',
    type: 'public',
    city: 'Belo Horizonte (MG)',
    states: ['MG'],
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Nutrição', 'Pedagogia', 'Letras', 'Educação Física', 'Jornalismo', 'Design', 'Arquitetura e Urbanismo', 'Administração', 'Ciências Contábeis', 'Ciências Biológicas', 'Ciência da Computação', 'Sistemas de Informação', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção'],
    quality: { igc: 5, value: 4.417, year: 2022, text: 'IGC 5 (4,417) em 2022. Segundo a própria UFMG, ela tem nota máxima em todos os ciclos desde 2007.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: ensino, pesquisa e extensão. Não confirmamos o método por curso.' },
    strengths: [
      'Nota máxima (5) no IGC em todos os ciclos desde 2007, segundo a universidade (divulgação de abril/2025).',
      'Foi a segunda colocada entre as federais no resultado divulgado em 2025.',
      'Gratuita.'
    ],
    cautions: [
      'A lista de cursos vem de uma fonte de 2018; confirme no e-MEC e no site da UFMG.',
      'Ingresso por processo seletivo competitivo e com vagas limitadas.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Veja no edital do processo seletivo as vagas reservadas (cotas) e o apoio estudantil.']
    },
    sources: [
      { t: 'UFMG mantém nota máxima no IGC (UFMG, 17/04/2025)', url: 'https://www.ufmg.br/comunicacao/assessoria-de-imprensa/releases/institucional/ufmg-mantem-nota-maxima-no-indice-geral-de-cursos/' },
      { t: 'Cursos da UFMG (Guia da Carreira, 06/07/2018)', url: 'https://www.guiadacarreira.com.br/blog/ufmg-cursos' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },
  {
    id: 'ufrgs',
    name: 'Universidade Federal do Rio Grande do Sul (UFRGS)',
    short: 'UFRGS',
    type: 'public',
    city: 'Porto Alegre (RS)',
    states: ['RS'],
    courses: ['Medicina', 'Psicologia', 'Enfermagem', 'Nutrição', 'Pedagogia', 'Letras', 'Educação Física', 'Jornalismo', 'Arquitetura e Urbanismo', 'Administração', 'Ciências Contábeis', 'Ciências Biológicas', 'Ciência da Computação', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção'],
    quality: { igc: 5, value: 4.432, year: 2022, text: 'IGC 5 (4,432) no ciclo de 2022.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: ensino, pesquisa e extensão. Não confirmamos o método por curso.' },
    strengths: [
      'IGC 5 (4,432) em 2022.',
      'Gratuita e com ampla lista de cursos.'
    ],
    cautions: [
      'A lista de cursos vem de uma fonte de 2021, atualizada em 2023; confirme no site da UFRGS.',
      'Direito e Design aparecem com outros nomes na fonte consultada, então não os incluímos aqui.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Veja no edital as vagas reservadas (cotas) e o apoio estudantil.']
    },
    sources: [
      { t: 'Cursos da UFRGS (Estratégia, atualizado em 30/06/2023)', url: 'https://vestibulares.estrategia.com/portal/enem-e-vestibulares/vestibulares/cursos-ufrgs/' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },

  {
    id: 'ufsc',
    name: 'Universidade Federal de Santa Catarina (UFSC)',
    short: 'UFSC',
    type: 'public',
    city: 'Florianópolis (SC) e outros campi',
    states: ['SC'],
    verifiedAt: '2026-10-24',
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Nutrição', 'Letras', 'Educação Física', 'Jornalismo', 'Design'],
    quality: { igc: 5, value: 4.349, year: 2022, text: 'IGC 5 (4,349) no ciclo de 2022.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: ensino, pesquisa e extensão. Não confirmamos o método por curso.' },
    strengths: [
      'IGC 5 (4,349) em 2022.',
      'Gratuita, com cursos em Florianópolis e em outros campi.'
    ],
    cautions: [
      'A lista de cursos vem de uma fonte de 2021 e é parcial: cursos de outras áreas podem existir e não aparecer aqui.',
      'Medicina é oferecida em Florianópolis e em Araranguá; confirme em qual campus fica a vaga que você quer.',
      'Ingresso por processo seletivo competitivo e com vagas limitadas.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Veja no edital as vagas reservadas (cotas) e o apoio estudantil.']
    },
    sources: [
      { t: 'Cursos da UFSC (Estratégia, atualizado em 18/08/2021)', url: 'https://vestibulares.estrategia.com/portal/enem-e-vestibulares/vestibulares/ufsc-cursos/' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },
  {
    id: 'unb',
    name: 'Universidade de Brasília (UnB)',
    short: 'UnB',
    type: 'public',
    city: 'Brasília (DF)',
    states: ['DF'],
    verifiedAt: '2026-10-24',
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Nutrição', 'Pedagogia', 'Letras', 'Educação Física', 'Design', 'Arquitetura e Urbanismo', 'Administração', 'Ciências Contábeis', 'Ciências Biológicas', 'Ciência da Computação', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção'],
    quality: { igc: 5, value: 4.179, year: 2022, text: 'IGC 5 (4,179) no ciclo de 2022.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: ensino, pesquisa e extensão. Não confirmamos o método por curso.' },
    strengths: [
      'IGC 5 (4,179) em 2022.',
      'Gratuita e com ampla lista de cursos.'
    ],
    cautions: [
      'A lista de cursos vem de uma fonte de 2018; confirme no e-MEC e no site da UnB.',
      'Jornalismo e Sistemas de Informação não aparecem na lista consultada, mas isso pode ser limitação da fonte.',
      'Ingresso por processo seletivo competitivo e com vagas limitadas.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Veja no edital as vagas reservadas (cotas) e o apoio estudantil.']
    },
    sources: [
      { t: 'Cursos da UnB (Guia da Carreira, 28/07/2018)', url: 'https://www.guiadacarreira.com.br/blog/unb-cursos' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },
  {
    id: 'ufpr',
    name: 'Universidade Federal do Paraná (UFPR)',
    short: 'UFPR',
    type: 'public',
    city: 'Curitiba (PR) e outros campi',
    states: ['PR'],
    verifiedAt: '2026-10-24',
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Nutrição', 'Pedagogia', 'Letras', 'Educação Física', 'Jornalismo', 'Arquitetura e Urbanismo', 'Ciências Contábeis', 'Ciências Biológicas', 'Ciência da Computação', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção', 'Análise e Desenvolvimento de Sistemas'],
    quality: { igc: 5, value: 4.154, year: 2022, text: 'IGC 5 (4,154) no ciclo de 2022.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: ensino, pesquisa e extensão. Não confirmamos o método por curso.' },
    strengths: [
      'IGC 5 (4,154) em 2022.',
      'Gratuita, e é uma das poucas opções públicas deste guia com Análise e Desenvolvimento de Sistemas (curso tecnológico).'
    ],
    cautions: [
      'A lista de cursos é de outubro de 2023; confirme no site da UFPR.',
      'Na fonte, Administração aparece só como Administração Pública, e Design como Design de Produto e Design Gráfico, então não os incluímos.',
      'Ingresso por processo seletivo competitivo e com vagas limitadas.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Veja no edital as vagas reservadas (cotas) e o apoio estudantil.']
    },
    sources: [
      { t: 'Cursos da UFPR (Estratégia, atualizado em 06/10/2023)', url: 'https://vestibulares.estrategia.com/portal/enem-e-vestibulares/vestibulares/cursos-ufpr/' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },

  {
    id: 'ufrj',
    name: 'Universidade Federal do Rio de Janeiro (UFRJ)',
    short: 'UFRJ',
    type: 'public',
    city: 'Rio de Janeiro (RJ)',
    states: ['RJ'],
    verifiedAt: '2026-10-25',
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Nutrição', 'Pedagogia', 'Letras', 'Educação Física', 'Arquitetura e Urbanismo', 'Administração', 'Ciências Contábeis', 'Ciências Biológicas', 'Ciência da Computação', 'Engenharia de Produção'],
    quality: { igc: 5, value: 4.208, year: 2022, text: 'IGC 5 (4,208) no ciclo de 2022.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: ensino, pesquisa e extensão. Não confirmamos o método por curso.' },
    strengths: [
      'IGC 5 (4,208) em 2022.',
      'Gratuita e com ampla lista de cursos.'
    ],
    cautions: [
      'A lista de cursos vem de uma fonte de 2021, atualizada em 2022; confirme no site da UFRJ.',
      'Jornalismo, Design, Sistemas de Informação e as engenharias Civil e Elétrica não aparecem na fonte (Design aparece só como Comunicação Visual Design e Desenho Industrial), mas isso pode ser limitação dela.',
      'Ingresso por processo seletivo competitivo e com vagas limitadas.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Veja no edital as vagas reservadas (cotas) e o apoio estudantil.']
    },
    sources: [
      { t: 'UFRJ: como entrar, cursos e mais (Estratégia, atualizado em 22/09/2022)', url: 'https://vestibulares.estrategia.com/portal/enem-e-vestibulares/vestibulares/ufrj/' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },
  {
    id: 'ufpe',
    name: 'Universidade Federal de Pernambuco (UFPE)',
    short: 'UFPE',
    type: 'public',
    city: 'Recife (PE) e outros campi',
    states: ['PE'],
    verifiedAt: '2026-10-25',
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Nutrição', 'Pedagogia', 'Letras', 'Educação Física', 'Jornalismo', 'Design', 'Arquitetura e Urbanismo', 'Administração', 'Ciências Contábeis', 'Ciências Biológicas', 'Ciência da Computação', 'Sistemas de Informação', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção'],
    quality: { igc: 5, value: 4.033, year: 2022, text: 'IGC 5 (4,033) no ciclo de 2022.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: ensino, pesquisa e extensão. Não confirmamos o método por curso.' },
    strengths: [
      'IGC 5 (4,033) em 2022.',
      'Gratuita, com cerca de 100 cursos de graduação e cerca de 7 mil vagas pelo Sisu (página de janeiro de 2026).',
      'Uma das opções do Nordeste com lista de cursos atualizada em 2026.'
    ],
    cautions: [
      'Alguns cursos ficam em outros campi (como o do Sertão); confirme onde fica o seu.',
      'Ingresso pelo Sisu, com notas de corte que variam muito por curso.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Ingresso pelo Sisu. Veja no edital as vagas reservadas (cotas) e o apoio estudantil.']
    },
    sources: [
      { t: 'UFPE: Sisu, cursos e vagas (Estratégia, atualizado em 12/01/2026)', url: 'https://vestibulares.estrategia.com/portal/enem-e-vestibulares/ufpe-sisu-cursos-vagas-como-ingressar-e-muito-mais' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },
  {
    id: 'ufc',
    name: 'Universidade Federal do Ceará (UFC)',
    short: 'UFC',
    type: 'public',
    city: 'Fortaleza (CE) e outros campi',
    states: ['CE'],
    verifiedAt: '2026-10-25',
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Pedagogia', 'Letras', 'Educação Física', 'Jornalismo', 'Design', 'Arquitetura e Urbanismo', 'Administração', 'Ciências Contábeis', 'Ciências Biológicas', 'Ciência da Computação', 'Sistemas de Informação', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção', 'Ciência de Dados'],
    quality: { igc: null, text: 'Nota do MEC (IGC) não localizada nas listas consultadas (a UFC não está entre os 50 maiores índices de 2022 na fonte usada).' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: ensino, pesquisa e extensão. Não confirmamos o método por curso.' },
    strengths: [
      'Gratuita, com ampla lista de cursos atualizada em janeiro de 2026, incluindo Ciência de Dados.',
      'Uma das poucas opções públicas deste guia com Ciência de Dados.'
    ],
    cautions: [
      'Nota do MEC não localizada, então não dá para comparar por esse índice.',
      'Nutrição não aparece na lista consultada.',
      'Ingresso pelo Sisu, com notas de corte que variam muito por curso.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Veja no edital as vagas reservadas (cotas) e o apoio estudantil.']
    },
    sources: [
      { t: 'UFC: Sisu, cursos e vagas (Estratégia, atualizado em 12/01/2026)', url: 'https://vestibulares.estrategia.com/portal/enem-e-vestibulares/ufc-sisu-cursos-vagas-como-ingressar-e-muito-mais/' }
    ]
  },
  {
    id: 'ufba',
    name: 'Universidade Federal da Bahia (UFBA)',
    short: 'UFBA',
    type: 'public',
    city: 'Salvador (BA)',
    states: ['BA'],
    verifiedAt: '2026-10-25',
    courses: ['Medicina', 'Administração'],
    quality: { igc: 5, value: 4.093, year: 2022, text: 'IGC 5 (4,093) no ciclo de 2022.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: ensino, pesquisa e extensão. Não confirmamos o método por curso.' },
    strengths: [
      'IGC 5 (4,093) em 2022.',
      'Gratuita e com cerca de 140 cursos de graduação, segundo uma das fontes.'
    ],
    cautions: [
      'A lista aqui é muito parcial: só Medicina e Administração apareceram de forma explícita nas fontes consultadas. A UFBA oferece muito mais cursos; confirme o seu no site.',
      'As fontes não trazem data de atualização.',
      'Ingresso por processo seletivo competitivo e com vagas limitadas.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Veja no edital as vagas reservadas (cotas) e o apoio estudantil.']
    },
    sources: [
      { t: 'UFBA: notas de corte e cursos (Guia da Carreira, sem data visível)', url: 'https://www.guiadacarreira.com.br/faculdades/ufba-universidade-federal-da-bahia' },
      { t: 'UFBA (Quero Bolsa, sem data visível)', url: 'https://querobolsa.com.br/ufba-universidade-federal-da-bahia/guia-da-faculdade' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },
  {
    id: 'unesp',
    name: 'Universidade Estadual Paulista (Unesp)',
    short: 'Unesp',
    type: 'public',
    city: 'Vários campi no interior de SP',
    states: ['SP'],
    verifiedAt: '2026-10-25',
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Nutrição', 'Pedagogia', 'Letras', 'Educação Física', 'Jornalismo', 'Design', 'Arquitetura e Urbanismo', 'Administração', 'Ciências Biológicas', 'Ciência da Computação', 'Sistemas de Informação', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção'],
    quality: { igc: 5, value: 4.227, year: 2022, text: 'IGC 5 (4,227) no ciclo de 2022.' },
    method: { tags: ['m_theory'], verified: false, text: 'Universidade de pesquisa: ensino, pesquisa e extensão. Não confirmamos o método por curso.' },
    strengths: [
      'IGC 5 (4,227) em 2022.',
      'Gratuita, com campi espalhados pelo interior de São Paulo, o que dá opções fora da capital.'
    ],
    cautions: [
      'Cada curso fica em campi específicos (por exemplo, Medicina em Botucatu e Direito em Franca); confirme a cidade antes de decidir.',
      'A lista de cursos vem de uma fonte de 2021; confirme no site da Unesp.',
      'Ciências Contábeis não aparece na fonte consultada.'
    ],
    scholarships: {
      headline: 'Gratuita',
      items: ['Veja no edital as vagas reservadas (cotas) e o apoio estudantil.']
    },
    sources: [
      { t: 'Cursos da Unesp (Estratégia, atualizado em 18/08/2021)', url: 'https://vestibulares.estrategia.com/portal/enem-e-vestibulares/vestibulares/unesp-cursos/' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },

  /* ---------------------------------------------------------------- PRIVADAS */
  {
    id: 'insper',
    name: 'Insper',
    short: 'Insper',
    type: 'private',
    city: 'São Paulo (SP)',
    states: ['SP'],
    courses: ['Administração', 'Direito', 'Ciência da Computação', 'Engenharia de Produção'],
    quality: { igc: null, text: 'Nota do MEC (IGC) não localizada nas listas consultadas. A página oficial de Economia informa acreditação AACSB.' },
    method: { tags: ['m_proj'], verified: false, text: 'Não confirmamos o método nas páginas consultadas. Costuma ser descrito como ensino com projetos e atividades práticas; confirme com a instituição.' },
    strengths: [
      'Foco em negócios, direito e tecnologia, com 8 cursos de graduação: Administração, Economia, Direito, Ciência da Computação, e as engenharias Mecânica, Mecatrônica, de Computação e de Produção.',
      'Cinco formas de ingresso (2026/2): vestibular próprio, Enem, SAT, Bacharelado Internacional e seleção olímpica.',
      'Acreditação internacional AACSB informada na página do curso de Economia.'
    ],
    cautions: [
      'Poucos cursos: não há saúde, humanas ou artes.',
      'As bolsas parciais podem ser restituíveis. Uma fonte de março/2026 diz que o valor é pago após um ano de formado, mas uma notícia do próprio Insper (sem data) fala em fim da restituição. Confirme no edital atual.',
      'A mensalidade não aparece nas fontes consultadas. A taxa de inscrição era de R$ 380, com possibilidade de isenção.'
    ],
    scholarships: {
      own: true,
      headline: 'Tem programa de bolsas',
      items: [
        'Bolsa integral para quem atender aos requisitos, como renda familiar de até 2 salários mínimos por pessoa.',
        'Bolsas parciais de 30% a 80% da mensalidade, de acordo com renda e patrimônio da família.'
      ]
    },
    sources: [
      { t: 'Insper oferece 490 vagas no vestibular 2026/2 (Estratégia, 14/03/2026, atualizado em 25/03/2026)', url: 'https://portal.estrategia.com/vestibular-e-enem/vestibulares/insper-oferece-490-vagas-no-vestibular-2026-2/' },
      { t: 'Graduação em Economia (Insper)', url: 'https://www.insper.edu.br/graduacao/economia/' },
      { t: 'Insper reformula programa de bolsas (Insper, sem data visível)', url: 'https://www.insper.edu.br/pt/conteudos/acontece-no-insper/insper-reformula-programa-de-bolsas-e-amplia-acesso-ao-ensino-superior' }
    ]
  },
  {
    id: 'inteli',
    name: 'Inteli — Instituto de Tecnologia e Liderança',
    short: 'Inteli',
    type: 'private',
    city: 'São Paulo (SP)',
    states: ['SP'],
    courses: ['Ciência da Computação', 'Sistemas de Informação', 'Administração'],
    quality: { igc: null, text: 'Instituição recente (aulas desde 2022). Nota do MEC (IGC) não localizada.' },
    method: { tags: ['m_proj'], verified: true, text: 'Ensino 100% baseado em projetos em grupo, com demandas reais de empresas, ONGs e governos (reportagem de 2021). A carga se divide em projetos, autoestudo e atividades instrucionais.' },
    strengths: [
      'Método 100% baseado em projetos em grupo.',
      'Programa de bolsas com proporção mínima: 1 bolsa integral para cada 4 alunos pagantes (edital 2027, de 05/08/2026).',
      'Bolsa integral para renda familiar per capita de até 1,5 salário mínimo e parcial de 50% até 3 salários mínimos.'
    ],
    cautions: [
      'Curso 100% presencial em São Paulo e com dedicação integral nos 2 primeiros anos, o que dificulta trabalhar nesse período.',
      'Instituição recente, com pouco histórico de avaliação oficial.',
      'Só 5 cursos (Administração/ADM Tech, Ciência da Computação, Engenharia de Computação, Engenharia de Software e Sistemas de Informação), todos de tecnologia e gestão.',
      'A mensalidade de quem paga não consta no edital. Em 2021 era R$ 5.500 por mês; pode ter mudado.'
    ],
    scholarships: {
      own: true,
      headline: 'Tem programa de bolsas',
      items: [
        '1 bolsa integral (100%) para cada 4 alunos pagantes, no mínimo; ou 1 bolsa parcial de 50% para cada 9 pagantes.',
        'Também podem ser dadas bolsas de 100%, 75%, 50% ou 25% a quem comprovar necessidade financeira.',
        'Pelo edital, é preciso morar em São Paulo e não ter outra graduação.'
      ]
    },
    sources: [
      { t: 'Edital do Programa de Bolsas, Graduação 2027 (Inteli, 05/08/2026)', url: 'https://web.inteli.edu.br/hubfs/Gradua%C3%A7%C3%A3o/2027_Bolsas_Edital_Processo_Seletivo_Gradua%C3%A7%C3%A3o_Inteli.pdf' },
      { t: 'Inteli vai oferecer a primeira graduação 100% baseada em projetos (Canaltech, 27/10/2021)', url: 'https://canaltech.com.br/cursos/inteli-vai-oferecer-primeira-graduacao-100-baseada-em-projetos-no-brasil-200134/' }
    ]
  },
  {
    id: 'fgv',
    name: 'FGV — Fundação Getulio Vargas',
    short: 'FGV',
    type: 'private',
    city: 'São Paulo (SP) e Rio de Janeiro (RJ)',
    states: ['SP', 'RJ'],
    courses: ['Administração', 'Direito', 'Ciência de Dados'],
    quality: { igc: 5, value: 4.367, year: 2022, text: 'Várias escolas com IGC 5 em 2022, entre elas FGV EAESP (4,367), FGV Direito SP (4,383) e FGV Direito Rio (4,620).' },
    method: { tags: [], verified: false, text: 'Não confirmamos o método de ensino nas páginas consultadas.' },
    strengths: [
      'Escolas com IGC 5 em 2022, incluindo as de Administração (EAESP) e Direito (SP e Rio).',
      'Bolsas por mérito de 100% a 40% (edital 2026 da escola de Economia) e Bolsa Extraordinária integral em parceria com o ISMART.',
      'Opção de bolsa restituível de 20% a 100% da mensalidade, devolvida sem juros.'
    ],
    cautions: [
      'Poucas áreas: negócios, economia, direito, relações internacionais, ciências sociais e matemática aplicada.',
      'A bolsa por mérito vale para os primeiros colocados e exige bom desempenho para manter. Na escola de Economia, ficar entre os 25 melhores da turma a cada semestre.',
      'A bolsa restituível exige fiador com renda de 3 vezes a mensalidade.',
      'As regras variam por escola. Os números detalhados aqui vêm do edital de Economia (EESP) de 2026; confira o edital do seu curso.',
      'O curso de Ciência de Dados e IA aparece na escola de Matemática Aplicada (fonte de 2020); confirme se segue sendo oferecido.'
    ],
    scholarships: {
      own: true,
      headline: 'Tem programa de bolsas',
      items: [
        'Mérito: no edital 2026 de Economia, 15 bolsas por vestibular, de 100% a 40%.',
        'Bolsa Extraordinária: 10 bolsas integrais para quem cursou o ensino médio em escola pública ou como bolsista integral em escola privada (parceria com o ISMART).',
        'Restituível: de 20% a 100% da mensalidade, com devolução corrigida pelo IPC-DI. A resposta saiu até 13/02/2026 naquele edital.'
      ]
    },
    sources: [
      { t: 'Edital de bolsas, ingressantes 2026, Economia (FGV EESP)', url: 'https://vestibular.fgv.br/sites/default/files/upload/cge-informativo-1-2026-ingressantes.pdf' },
      { t: 'Escolas de graduação da FGV oferecem bolsas (Monitor Mercantil, 28/09/2020)', url: 'https://monitormercantil.com.br/escolas-de-graduacao-da-fgv-oferecem-bolsas-de-estudo/' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },
  {
    id: 'mackenzie',
    name: 'Universidade Presbiteriana Mackenzie',
    short: 'Mackenzie',
    type: 'private',
    city: 'São Paulo, Alphaville e Campinas (SP)',
    states: ['SP'],
    courses: ['Análise e Desenvolvimento de Sistemas', 'Administração', 'Arquitetura e Urbanismo', 'Ciências Biológicas', 'Ciência da Computação', 'Ciências Contábeis', 'Direito', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção', 'Jornalismo', 'Letras', 'Marketing', 'Medicina', 'Nutrição', 'Pedagogia', 'Psicologia', 'Sistemas de Informação'],
    quality: { igc: null, text: 'Nota do MEC (IGC) não localizada nas listas consultadas.' },
    method: { tags: [], verified: false, text: 'Não confirmamos o método de ensino nas páginas consultadas.' },
    strengths: [
      'Muita variedade: 30 cursos presenciais e 13 a distância.',
      'Participa do ProUni, com bolsas integrais e parciais, em São Paulo (Higienópolis e Alphaville), Campinas e na modalidade a distância.',
      'Mensalidades bem diferentes por modalidade: a distância entre R$ 404 e R$ 438 e presencial entre R$ 1.766 e R$ 6.689 (valores aproximados).'
    ],
    cautions: [
      'A mensalidade presencial varia muito de um curso para outro; confira o valor do seu.',
      'Marketing e Análise e Desenvolvimento de Sistemas aparecem apenas como tecnologia a distância.',
      'A bolsa socioeconômica própria segue um normativo (2022) sem percentual fixo. Procure o edital semestral "Bolsa Mackenzie pra você".',
      'Nota oficial (IGC) não localizada, e a lista de cursos e valores vem de uma página sem data visível.'
    ],
    scholarships: {
      own: true,
      headline: 'Tem programa de bolsas',
      items: [
        'ProUni: nota mínima de 450 no Enem, renda de até 1,5 salário mínimo por pessoa para a bolsa integral, e ensino médio em escola pública ou como bolsista integral.',
        'Bolsa de Estudo socioeconômica, pelo Normativo de Bolsas (05/07/2022), sujeita às bolsas disponíveis.',
        'Editais semestrais próprios, como o "Bolsa Mackenzie pra você" (editais de 2024 e 2025 localizados).'
      ]
    },
    sources: [
      { t: 'Cursos, mensalidades e ProUni da Mackenzie (Guia da Carreira, sem data visível)', url: 'https://www.guiadacarreira.com.br/blog/mackenzie-cursos' },
      { t: 'Normativo de Bolsas de Estudo (Mackenzie, 05/07/2022)', url: 'https://www.mackenzie.br/fileadmin/user_upload/Normativo_de_Bolsas_de_Estudo.pdf' },
      { t: 'Edital ProUni 2026.01 (Mackenzie)', url: 'https://www.mackenzie.br/fileadmin/ARQUIVOS/Public/top/setor-bolsas/ARQUIVOS/EDITAL_GERSF_001.2026_-_Prouni_2026.01_link_corrigido.pdf' }
    ]
  },
  {
    id: 'pucrs',
    name: 'Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)',
    short: 'PUCRS',
    type: 'private',
    city: 'Porto Alegre (RS)',
    states: ['RS'],
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Nutrição', 'Pedagogia', 'Letras', 'Educação Física', 'Jornalismo', 'Arquitetura e Urbanismo', 'Administração', 'Ciências Contábeis', 'Ciências Biológicas', 'Ciência da Computação', 'Sistemas de Informação', 'Engenharia Civil', 'Engenharia Elétrica', 'Engenharia de Produção'],
    quality: { igc: 5, year: 2022, text: 'IGC 5 em 2022, na lista das 32 instituições privadas com nota máxima (valor contínuo não informado).' },
    method: { tags: [], verified: false, text: 'Não confirmamos o método de ensino nas páginas consultadas.' },
    strengths: [
      'IGC 5 em 2022, entre as 32 instituições privadas com nota máxima.',
      'Ampla lista de cursos, incluindo vários da área da saúde.',
      'Bolsas próprias além do ProUni: Licenciatura (40%, e 30% em Educação Física), Mérito (integral para o primeiro colocado de cada curso), Diplomados (25%) e Desconto Familiar (12%).'
    ],
    cautions: [
      'As informações de bolsas e cursos vêm de uma página publicada em 2014 e atualizada em 2021. Confirme tudo no site da PUCRS antes de decidir.',
      'Design e Ciência de Dados não aparecem na lista consultada.',
      'Financiamentos próprios citados (PROED e CREDPUC) e o Fies dependem de aprovação; veja as condições atuais.'
    ],
    scholarships: {
      own: true,
      headline: 'Tem programa de bolsas',
      items: [
        'ProUni, com bolsas integrais e parciais.',
        'Bolsas próprias: Licenciatura, Mérito, Diplomados e Desconto Familiar (valores de 2021, a confirmar).',
        'Financiamento: PROED, CREDPUC (50% de crédito sobre as mensalidades) e Fies.'
      ]
    },
    sources: [
      { t: 'Vestibular PUCRS: saiba tudo (Blog do Enem, 2014, atualizado em 2021)', url: 'https://blogdoenem.com.br/?p=29404' },
      { t: 'As melhores IES privadas do Brasil, segundo o Inep (Fundacred, IGC 2022)', url: 'https://instituicao.fundacred.org.br/news/as-melhores-ies-privadas-do-brasil-segundo-o-inep' }
    ]
  },
  {
    id: 'pucsp',
    name: 'Pontifícia Universidade Católica de São Paulo (PUC-SP)',
    short: 'PUC-SP',
    type: 'private',
    city: 'São Paulo e Sorocaba (SP)',
    states: ['SP'],
    verifiedAt: '2026-10-24',
    courses: ['Medicina', 'Direito', 'Psicologia', 'Enfermagem', 'Pedagogia', 'Letras', 'Jornalismo', 'Administração', 'Ciências Contábeis', 'Ciência da Computação'],
    quality: { igc: 5, year: 2022, text: 'IGC 5 em 2022, na lista das 32 instituições privadas com nota máxima (valor contínuo não informado).' },
    method: { tags: [], verified: false, text: 'Não confirmamos o método de ensino nas páginas consultadas.' },
    strengths: [
      'IGC 5 em 2022, entre as 32 instituições privadas com nota máxima.',
      'Edital de bolsas de 2026 com 42 bolsas integrais para ingressantes (renda familiar per capita de até 1,5 salário mínimo).',
      'Também participa do ProUni e tem bolsa de mérito acadêmico.'
    ],
    cautions: [
      'As bolsas FUNDASP dependem da classificação no processo seletivo de verão (ou da nota do Enem, no processo complementar).',
      'Bolsa parcial de 50% só é dada se sobrarem bolsas integrais, e apenas a ingressantes do processo seletivo de verão.',
      'Não incluímos aqui outros cursos que a fonte lista (como as engenharias e Sistemas de Informação), porque não conseguimos confirmá-los. Confirme no site da PUC-SP.',
      'A lista de cursos e a bolsa de mérito vêm de uma página publicada em 2014 e atualizada em 2020.'
    ],
    scholarships: {
      own: true,
      headline: 'Tem programa de bolsas',
      items: [
        'Bolsas FUNDASP (edital do 1º semestre de 2026): 42 integrais (30% delas para pretos, pardos e indígenas), para renda familiar per capita de até 1,5 salário mínimo (R$ 2.431,50).',
        'Bolsa parcial de 50% para renda de até 3 salários mínimos (R$ 4.863,00), concedida se sobrarem bolsas integrais.',
        'ProUni e Fies. Bolsa Mérito Acadêmico: integral ao 1º colocado do vestibular de verão em cada campus (fonte de 2020, a confirmar).'
      ]
    },
    sources: [
      { t: 'Edital de bolsas FUNDASP, graduação, ingressantes 1º semestre de 2026', url: 'https://fundasp.org.br/publicacoes/editais/arquivos/2026/edital-de-bolsas-fundasp-graduacao-1deg-semestre-2026-alunos-ingressantes.pdf' },
      { t: 'Vestibular PUC-SP: saiba tudo (Blog do Enem, 2014, atualizado em 18/11/2020)', url: 'https://blogdoenem.com.br/vestibular-puc-sp-saiba-tudo/' },
      { t: 'As melhores IES privadas do Brasil, segundo o Inep (Fundacred, IGC 2022)', url: 'https://instituicao.fundacred.org.br/news/as-melhores-ies-privadas-do-brasil-segundo-o-inep' }
    ]
  },
  {
    id: 'pucrio',
    name: 'Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio)',
    short: 'PUC-Rio',
    type: 'private',
    city: 'Rio de Janeiro (RJ)',
    states: ['RJ'],
    verifiedAt: '2026-10-24',
    courses: ['Administração', 'Arquitetura e Urbanismo', 'Ciência da Computação', 'Design', 'Letras'],
    quality: { igc: 5, value: 4.006, year: 2022, text: 'IGC 5 (4,006) em 2022, na lista dos 50 maiores índices e entre as privadas com nota máxima.' },
    method: { tags: [], verified: false, text: 'Não confirmamos o método de ensino nas páginas consultadas.' },
    strengths: [
      'IGC 5 (4,006) em 2022.',
      'Cerca de 33 cursos de graduação, segundo uma fonte de 2021.',
      'Participa do ProUni e, segundo uma matéria de 2016, tem bolsas de mérito, monitoria, iniciação científica e filantrópicas.'
    ],
    cautions: [
      'A lista de cursos é parcial: só aparecem os que constavam na página consultada. Outros cursos (como Direito e Psicologia) podem existir; confira no site da PUC-Rio.',
      'Não encontramos o edital atual de bolsas, nem percentuais; os tipos de bolsa vêm de uma matéria de 2016.',
      'Valores de mensalidade não constam nas fontes consultadas.'
    ],
    scholarships: {
      own: true,
      headline: 'Tem programa de bolsas',
      items: [
        'ProUni, com bolsas integrais e parciais.',
        'Bolsas próprias citadas em matéria de 2016: mérito (vestibular ou Enem), monitoria, iniciação científica, filantrópicas e financiamento para baixa renda. Percentuais não informados.'
      ]
    },
    sources: [
      { t: 'Cursos da PUC-Rio (Quero Bolsa, sem data visível)', url: 'https://querobolsa.com.br/puc-rio/guia-da-faculdade' },
      { t: 'Formas de conseguir bolsas (Na Prática, 25/10/2016, atualizada em 2025)', url: 'https://napratica.org.br/bolsas-para-faculdade' },
      { t: 'IGC 2022: os 50 maiores (Quero Bolsa)', url: 'https://querobolsa.com.br/revista/50-melhores-faculdades-do-brasil-segundo-o-mec' }
    ]
  },
  {
    id: 'espm',
    name: 'ESPM — Escola Superior de Propaganda e Marketing',
    short: 'ESPM',
    type: 'private',
    city: 'São Paulo, Rio de Janeiro, Porto Alegre e Florianópolis',
    states: ['SP', 'RJ', 'RS', 'SC'],
    verifiedAt: '2026-10-24',
    courses: ['Administração', 'Design', 'Jornalismo'],
    quality: { igc: null, text: 'Nota do MEC (IGC) não localizada nas listas consultadas.' },
    method: { tags: [], verified: false, text: 'Não confirmamos o método de ensino nas páginas consultadas.' },
    strengths: [
      'Foco em comunicação, negócios e design, com 8 campi (4 em São Paulo, 2 no Rio de Janeiro, 1 em Porto Alegre e 1 em Florianópolis).',
      'Bolsa de Estudos ESPM de 50% ou 100%, sem devolução, por renda e classificação (edital do 2º semestre de 2026).',
      'Bolsa Enem de 100% para renda per capita de até 1,5 salário mínimo.'
    ],
    cautions: [
      'Poucos cursos neste guia (Administração, Design e Jornalismo). Marketing aparece só como MBA e curso a distância, não como graduação.',
      'A bolsa parcial de 30%, 50% ou 70% é restituível: exige fiador e a devolução é feita após a formatura, sem juros, com correção pelo IPCA.',
      'A mensalidade média citada (cerca de R$ 4.000) vem de uma página de 2019 e pode ter mudado.',
      'A lista de cursos vem da mesma página de 2019; confirme no site da ESPM.',
      'Nota oficial (IGC) não localizada.'
    ],
    scholarships: {
      own: true,
      headline: 'Tem programa de bolsas',
      items: [
        'Bolsa de Estudos ESPM: 100% para renda per capita de até 1,5 salário mínimo e 50% de 1,5 a 3 salários mínimos; considera também a classificação no vestibular. Sem devolução.',
        'Bolsa do processo seletivo Enem: 100%, para renda per capita de até 1,5 salário mínimo e conforme a nota no Enem.',
        'Bolsa Parcial Restituível: 30%, 50% ou 70%, para renda familiar per capita de 2 a 5 salários mínimos, com fiador.'
      ]
    },
    sources: [
      { t: 'FAQ de bolsas para calouros, bacharelado, 2026.2 (ESPM)', url: 'https://www.espm.br/wp-content/uploads/FAQ-Bolsas-para-calouros-BACHARELADO-26-2-Documento-Final.pdf' },
      { t: 'Cursos da ESPM (Guia da Carreira, 26/09/2019)', url: 'https://www.guiadacarreira.com.br/blog/espm-cursos' }
    ]
  },
  {
    id: 'maua',
    name: 'Instituto Mauá de Tecnologia (IMT)',
    short: 'Mauá',
    type: 'private',
    city: 'São Caetano do Sul e São Paulo (SP)',
    states: ['SP'],
    verifiedAt: '2026-10-25',
    courses: ['Administração', 'Design', 'Arquitetura e Urbanismo', 'Ciência da Computação', 'Sistemas de Informação', 'Análise e Desenvolvimento de Sistemas', 'Ciência de Dados'],
    quality: { igc: null, text: 'Nota do MEC (IGC) não localizada nas listas consultadas.' },
    method: { tags: ['m_proj'], verified: false, text: 'A matéria consultada diz apenas que Ciência da Computação e Sistemas de Informação, em São Paulo, incluem integração a projetos em laboratórios do IMT, e que o curso de ADS tem carga horária híbrida.' },
    strengths: [
      'Além de engenharias, tem cursos de computação e dados: Ciência da Computação, Sistemas de Informação, ADS e Inteligência Artificial e Ciência de Dados.',
      'Programa de Excelência Acadêmica (vestibular de verão 2026): até 50 bolsas, sendo 10 integrais e 40 de 50%.',
      'Em Ciência da Computação e Sistemas de Informação (campus São Paulo), há integração com projetos em laboratórios.'
    ],
    cautions: [
      'Essas bolsas são por nota: prova com nota final de 7,0 ou mais, ou Enem com 700 pontos ou mais. O edital não menciona renda.',
      'Quem entra por transferência ou já tem diploma de ensino superior não concorre a essas bolsas.',
      'Oferece engenharias, que não incluímos aqui porque a fonte não detalha quais; confirme no site.',
      'Valores de mensalidade não constam nas fontes consultadas, e não há IGC localizado.'
    ],
    scholarships: {
      own: true,
      headline: 'Tem programa de bolsas',
      items: [
        'Programa de Excelência Acadêmica (edital 12/2025): 10 bolsas integrais e 40 de 50%, por nota. Sem menção a devolução no edital.',
        'O Mauá publica outros editais de bolsas; consulte o site para os vigentes.'
      ]
    },
    sources: [
      { t: 'Edital 12/2025, Programa de Excelência Acadêmica, vestibular de verão 2026 (Mauá)', url: 'https://maua.br/img/upload/bolsas-de-estudo-do-programa-de-excelencia-academica-para-ingressantes-pelo-vestibular-de-verao-2026-1757715817.pdf' },
      { t: 'Instituto Mauá de Tecnologia tem inscrições abertas para 2026 (CNN Brasil, 09/09/2025)', url: 'https://www.cnnbrasil.com.br/educacao/instituto-maua-de-tecnologia-tem-inscricoes-abertas-para-ingresso-em-2026/' }
    ]
  },
  {
    id: 'einstein',
    name: 'Faculdade Israelita de Ciências da Saúde Albert Einstein',
    short: 'Einstein',
    type: 'private',
    city: 'São Paulo (SP)',
    states: ['SP'],
    verifiedAt: '2026-10-25',
    courses: ['Medicina', 'Enfermagem', 'Psicologia', 'Administração', 'Nutrição'],
    quality: { igc: null, text: 'Nota do MEC (IGC) não localizada nas listas consultadas.' },
    method: { tags: [], verified: false, text: 'Não confirmamos o método de ensino nas páginas consultadas.' },
    strengths: [
      'Foco em saúde: 660 vagas em 8 cursos (vestibular 2026), com Medicina (120 vagas), Enfermagem (160), Psicologia (60), Nutrição (60), Administração (70) e outros.',
      'Medicina inclui as Múltiplas Minientrevistas (MME) como segunda fase da seleção.',
      'Aceita prova própria, nota do Enem de 2023 ou 2024 e currículos internacionais (IB e Abitur).'
    ],
    cautions: [
      'Não encontramos informações de bolsas nem de mensalidade nas fontes consultadas. Consulte o manual do candidato e o site antes de decidir.',
      'Taxa de inscrição de R$ 250 em Medicina e R$ 174 nos demais cursos, sem previsão de isenção (vestibular 2026).',
      'Poucos cursos, quase todos de saúde. Nota oficial (IGC) não localizada.'
    ],
    scholarships: {
      own: false,
      headline: 'Sem programa próprio de bolsas confirmado',
      items: [
        'As fontes consultadas não trazem bolsas, mensalidade nem financiamento. Isso não prova que não existam: consulte o manual do candidato e o site da faculdade.'
      ]
    },
    sources: [
      { t: 'Vestibular Albert Einstein 2026: edital (Estratégia, 15/07/2025, atualizado em 25/08/2025)', url: 'https://portal.estrategia.com/vestibular-e-enem/vestibulares/vestibular-albert-einstein-2026-saiba-tudo-sobre-o-edital/' }
    ]
  }
];

/* Programas oficiais do governo, citados quando a pessoa pergunta por bolsas em instituições privadas. */
const GOV_PROGRAMS = [
  { name: 'ProUni', desc: 'Bolsas integrais e de 50% em instituições privadas, para quem tem boa nota no Enem e renda baixa.' },
  { name: 'Fies', desc: 'Financiamento estudantil: não é bolsa, é um empréstimo com juros baixos que se paga depois.' },
  { name: 'Sisu', desc: 'Vagas em instituições públicas usando a nota do Enem, com reserva de vagas por cotas.' }
];
