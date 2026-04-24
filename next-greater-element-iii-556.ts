// Given a positive integer n, find the smallest integer which has exactly the same digits existing in the integer n and is greater in value than n. If no such positive integer exists, return -1.

// Note that the returned integer should fit in 32-bit integer, if there is a valid answer but it does not fit in 32-bit integer, return -1.

// Example 1:

// Input: n = 12
// Output: 21
// Example 2:

// Input: n = 21
// Output: -1

// Constraints:

// 1 <= n <= 231 - 1

function nextGreaterElement(n: number): number {
  if (n <= 9 || n > 2 ** 31 - 1) return -1;

  let iterator = n;

  const list: number[] = [];

  while (iterator > 0) {
    const number = iterator % 10;
    list.push(number);
    iterator = Math.floor(iterator / 10);
  }

  let sortedList = list.sort((a, b) => a - b);

  while (sortedList[0] == 0) {
    const first = sortedList[0];

    sortedList = [...sortedList.slice(1, sortedList.length), first];
  }

  let result = parseInt([...sortedList].join(""));
  console.log("result -> ", result);

  if (result < n) {
    return -1;
  }

  if (result === n) {
    let last = sortedList.pop();
    let index = sortedList.length - 1;

    while (index >= 0 && last != undefined) {
      if (sortedList[index] < last) {
        return parseInt(
          [
            ...sortedList.slice(0, index),
            last,
            ...sortedList.slice(index, sortedList.length),
          ].join(""),
        );
      }
      index--;
    }
    return -1;
  }

  return result;
}

const n = 230241;

console.log(
  `number -> ${n} nextGreaterElement ->${nextGreaterElement(n)} expected -> ${230412}`,
);

// const lll = [0, 1, 2, 3, 4, 5, 6, 7];
// const number = lll.pop();

// console.log([...lll.slice(0, 3), number, ...lll.slice(3, lll.length)]);

/*
 * ============================================================================
 *  ARTIGO EDUCACIONAL — PROFESSOR: PRÓXIMA MAIOR PERMUTAÇÃO E SEUS FUNDAMENTOS
 *  Disciplina: Algoritmos e Estruturas de Dados
 *  Problema de referência: LeetCode 556 — Next Greater Element III
 * ============================================================================
 *
 *  "A matemática não mente. É com ela que aprendemos a enxergar a ordem
 *   escondida no aparente caos dos números." — adaptado de Henri Poincaré
 *
 * ----------------------------------------------------------------------------
 *  INTRODUÇÃO
 * ----------------------------------------------------------------------------
 *
 *  Bem-vindo(a) a um dos problemas mais elegantes da computação combinatória.
 *  O enunciado parece simples à primeira vista: dado um inteiro positivo `n`,
 *  encontre o MENOR inteiro que contenha exatamente os mesmos dígitos de `n`
 *  e seja MAIOR do que ele. Porém, por trás dessa simplicidade se esconde um
 *  tema rico que permeia desde a teoria dos grupos até a otimização de
 *  algoritmos de busca.
 *
 *  Antes de tentar resolver o problema diretamente, precisamos construir uma
 *  base sólida de conceitos. Este artigo guiará você por essa jornada, etapa
 *  por etapa, sem revelar a solução — apenas abrindo as portas certas para
 *  que você mesmo(a) as atravesse.
 *
 * ----------------------------------------------------------------------------
 *  CAPÍTULO 1 — PERMUTAÇÕES: A LINGUAGEM DO PROBLEMA
 * ----------------------------------------------------------------------------
 *
 *  1.1 O que é uma permutação?
 *
 *  Em matemática combinatória, uma PERMUTAÇÃO de um conjunto é um arranjo
 *  ordenado de todos os seus elementos. Para um conjunto com `k` elementos
 *  distintos, existem k! (k fatorial) permutações possíveis.
 *
 *  Exemplo: para o conjunto {1, 2, 3}, temos 3! = 6 permutações:
 *    [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]
 *
 *  Quando traduzimos dígitos em números, perceba que cada permutação dos
 *  dígitos corresponde a um número diferente. Para os dígitos {1, 2, 3}:
 *    123, 132, 213, 231, 312, 321
 *
 *  O problema pede essencialmente: dada a permutação atual dos dígitos de `n`,
 *  qual é a PRÓXIMA permutação em ordem lexicográfica crescente?
 *
 *  1.2 Ordem lexicográfica
 *
 *  A ordem lexicográfica é uma generalização da ordem alfabética para
 *  sequências. Para sequências de dígitos, ela equivale à ordem numérica
 *  crescente dos números formados.
 *
 *  Imagine um dicionário de permutações de dígitos. As permutações são
 *  listadas da menor (dígitos em ordem crescente) até a maior (dígitos em
 *  ordem decrescente). O problema é: dado que você está numa página desse
 *  dicionário, encontre a próxima página.
 *
 *  Exercício 1.1:
 *    Liste todas as permutações dos dígitos {2, 1, 3} em ordem lexicográfica
 *    crescente. Identifique qual é a "próxima permutação" de 213 e de 321.
 *
 *  Exercício 1.2:
 *    Para os dígitos {1, 1, 2}, quantas permutações DISTINTAS existem?
 *    (Dica: quando há elementos repetidos, a fórmula muda. Pesquise sobre
 *    "permutações com repetição".)
 *
 * ----------------------------------------------------------------------------
 *  CAPÍTULO 2 — A ANATOMIA DA PRÓXIMA PERMUTAÇÃO
 * ----------------------------------------------------------------------------
 *
 *  2.1 Observação fundamental
 *
 *  Observe as permutações de {1, 2, 3} na ordem lexicográfica:
 *
 *    Índice | Permutação | Número
 *      0    |  [1,2,3]   |  123
 *      1    |  [1,3,2]   |  132
 *      2    |  [2,1,3]   |  213
 *      3    |  [2,3,1]   |  231
 *      4    |  [3,1,2]   |  312
 *      5    |  [3,2,1]   |  321
 *
 *  Pergunta: se estamos na permutação [2,3,1] (índice 3), como chegamos à
 *  [3,1,2] (índice 4) de forma eficiente, sem gerar TODAS as permutações?
 *
 *  2.2 Identificando o ponto de virada (pivot)
 *
 *  Observe o sufixo de qualquer permutação. Um sufixo que está em ordem
 *  DECRESCENTE é um sufixo "esgotado" — não é possível aumentá-lo sem
 *  alterar um elemento anterior.
 *
 *  Em [2,3,1]: o sufixo [3,1] está em ordem decrescente (3 > 1).
 *  O elemento logo antes desse sufixo decrescente é o nosso PIVOT — o
 *  menor ponto de mudança para gerar uma permutação maior.
 *
 *  Exercício 2.1:
 *    Para cada número abaixo, identifique o sufixo em ordem decrescente e
 *    o elemento pivot:
 *      a) n = 1342   → dígitos: [1, 3, 4, 2]
 *      b) n = 53421  → dígitos: [5, 3, 4, 2, 1]
 *      c) n = 12543  → dígitos: [1, 2, 5, 4, 3]
 *      d) n = 54321  → dígitos: [5, 4, 3, 2, 1]
 *
 *  Qual dos casos acima NÃO possui next greater permutation? Por quê?
 *
 *  2.3 O que fazer com o pivot?
 *
 *  Uma vez identificado o pivot (vamos chamar de `p`), precisamos encontrar
 *  o menor elemento no sufixo que seja ESTRITAMENTE MAIOR do que `p`.
 *
 *  Por que isso garante a MENOR permutação maior? Porque:
 *    1. Trocar `p` pelo menor elemento maior do sufixo aumenta o número no
 *       mínimo necessário naquela posição.
 *    2. Após a troca, reorganizar o restante do sufixo em ordem CRESCENTE
 *       garante que o restante seja o menor possível.
 *
 *  Exercício 2.2:
 *    Dado n = 1342 (dígitos [1, 3, 4, 2]):
 *      a) Qual é o pivot?
 *      b) Qual elemento do sufixo deve ser trocado com o pivot?
 *      c) Após a troca, qual deve ser a ordem do sufixo?
 *      d) Qual número é formado ao final?
 *    Verifique: o resultado é a próxima permutação de 1342?
 *
 * ----------------------------------------------------------------------------
 *  CAPÍTULO 3 — INVARIANTES E PROPRIEDADES DO SUFIXO
 * ----------------------------------------------------------------------------
 *
 *  3.1 Uma propriedade poderosa
 *
 *  Preste atenção nesta propriedade: quando encontramos o pivot pelo método
 *  de varredura da direita para a esquerda (procurando onde a sequência para
 *  de ser decrescente), o sufixo à direita do pivot está SEMPRE em ordem
 *  decrescente.
 *
 *  Isso não é coincidência — é consequência direta de como o pivot é
 *  definido. E essa propriedade tem uma implicação muito importante:
 *  reverter o sufixo é suficiente para ordená-lo de forma crescente.
 *  Você não precisa de um algoritmo de ordenação O(k log k) para isso!
 *
 *  Exercício 3.1 (Prova informal):
 *    Explique com suas próprias palavras por que o sufixo após o pivot
 *    está sempre em ordem decrescente. Tente construir um contra-exemplo —
 *    você conseguirá perceber por que ele não existe.
 *
 *  3.2 Busca pelo substituto do pivot no sufixo
 *
 *  Como o sufixo está em ordem decrescente, a busca pelo "menor elemento
 *  maior que o pivot" pode ser feita de forma eficiente da direita para a
 *  esquerda, já que os menores elementos estão no final do sufixo.
 *
 *  Exercício 3.2:
 *    Para n = 53412 (dígitos [5, 3, 4, 1, 2]):
 *      a) Identifique o sufixo decrescente e o pivot.
 *      b) Percorra o sufixo da direita para a esquerda buscando o primeiro
 *         elemento estritamente maior que o pivot.
 *      c) Faça a troca e reverta o sufixo.
 *      d) Qual número é formado?
 *
 * ----------------------------------------------------------------------------
 *  CAPÍTULO 4 — COMPLEXIDADE ALGORÍTMICA
 * ----------------------------------------------------------------------------
 *
 *  4.1 Análise do algoritmo
 *
 *  O algoritmo da próxima permutação é notavelmente eficiente. Vamos analisar
 *  cada etapa:
 *
 *    Etapa 1 — Encontrar o pivot: percorremos o array da direita para a
 *    esquerda até encontrar o primeiro elemento que viola a ordem decrescente.
 *    No pior caso, percorremos o array inteiro → O(n)
 *
 *    Etapa 2 — Encontrar o substituto no sufixo: percorremos o sufixo da
 *    direita para a esquerda → O(n) no pior caso.
 *
 *    Etapa 3 — Reversão do sufixo: percorremos metade do sufixo → O(n).
 *
 *    Complexidade total: O(n), onde n é o número de dígitos.
 *    Memória extra: O(n) para o array de dígitos.
 *
 *  Exercício 4.1:
 *    Compare a abordagem de:
 *      a) Gerar TODAS as permutações e encontrar a próxima → qual é a
 *         complexidade? Por que isso seria inviável para números grandes?
 *      b) O algoritmo de pivot descrito acima → O(n).
 *    Para um número com 10 dígitos, qual é a diferença em número de
 *    operações entre as duas abordagens?
 *
 *  4.2 Casos especiais
 *
 *  Toda implementação robusta deve tratar os casos extremos. Para este
 *  problema, reflita sobre:
 *
 *    - O que acontece quando `n` está na ÚLTIMA permutação (todos os dígitos
 *      em ordem decrescente)? Ex: n = 321
 *    - O que acontece com números de 1 dígito? Ex: n = 7
 *    - O que acontece quando a próxima permutação excede 2^31 - 1 = 2147483647?
 *    - O que acontece com dígitos repetidos? Ex: n = 1122
 *
 *  Exercício 4.2:
 *    Para cada caso especial acima, descreva qual comportamento o algoritmo
 *    deve ter e como você garantiria isso no código.
 *
 * ----------------------------------------------------------------------------
 *  CAPÍTULO 5 — VARIAÇÕES E PROBLEMAS RELACIONADOS
 * ----------------------------------------------------------------------------
 *
 *  5.1 Próxima permutação (LeetCode 31)
 *
 *  O problema "Next Permutation" opera diretamente sobre arrays de inteiros,
 *  sem a restrição de 32 bits. É o problema "pai" deste que estamos resolvendo.
 *  Dominar o LeetCode 31 é um prerequisito natural para o 556.
 *
 *  Exercício 5.1:
 *    Implemente uma função `nextPermutation(nums: number[]): void` que modifica
 *    o array IN-PLACE para conter a próxima permutação lexicográfica.
 *    Se o array já está na maior permutação, reorganize-o para a menor.
 *
 *  5.2 K-ésima permutação (LeetCode 60)
 *
 *  Dado `n` e `k`, encontre a k-ésima permutação dos dígitos 1..n.
 *  Este problema usa o "sistema fatorial de numeração" para pular diretamente
 *  para a permutação desejada sem gerar todas as anteriores.
 *
 *  Exercício 5.2 (conceitual):
 *    Quantas permutações de 4 dígitos existem que começam com o dígito 2?
 *    E com o dígito 3? Use raciocínio combinatório, sem código.
 *
 *  5.3 Permutação anterior
 *
 *  O algoritmo da próxima permutação pode ser espelhado para encontrar a
 *  permutação ANTERIOR — o maior número menor que `n` com os mesmos dígitos.
 *
 *  Exercício 5.3:
 *    Adapte o raciocínio visto até agora para a permutação anterior.
 *    Quais etapas mudam de direção? Quais permanecem as mesmas?
 *
 * ----------------------------------------------------------------------------
 *  CAPÍTULO 6 — RACIOCÍNIO GULOSO (GREEDY) NA PRÁTICA
 * ----------------------------------------------------------------------------
 *
 *  6.1 O que é um algoritmo guloso?
 *
 *  Um algoritmo guloso faz a escolha localmente ótima em cada etapa, esperando
 *  que isso leve a uma solução globalmente ótima. Nem sempre funciona — mas
 *  quando funciona, é elegante e eficiente.
 *
 *  O algoritmo da próxima permutação é essencialmente guloso:
 *    - Identifica o ponto mais à direita possível para fazer uma mudança.
 *    - Faz a menor mudança possível naquele ponto (troca pelo menor substituto).
 *    - Minimiza o restante (reverte o sufixo).
 *
 *  Cada decisão é "localmente mínima", e o resultado é "globalmente mínimo".
 *
 *  Exercício 6.1:
 *    Por que o algoritmo procura o pivot mais à DIREITA possível (e não à
 *    esquerda)? O que aconteceria se procurássemos à esquerda?
 *    Elabore um exemplo concreto para ilustrar sua resposta.
 *
 *  Exercício 6.2:
 *    Após encontrar o pivot, por que trocamos pelo menor elemento do sufixo
 *    que é maior que o pivot, e não simplesmente pelo maior elemento do sufixo?
 *    Qual seria o impacto na corretude e na otimalidade?
 *
 * ----------------------------------------------------------------------------
 *  CAPÍTULO 7 — DESAFIOS PARA CONSOLIDAR O APRENDIZADO
 * ----------------------------------------------------------------------------
 *
 *  Os exercícios a seguir aumentam progressivamente em dificuldade. Tente
 *  resolvê-los sem olhar para código externo primeiro.
 *
 *  Nível 1 — Compreensão:
 *    a) Dado n = 230241, encontre manualmente a próxima permutação passo a passo.
 *    b) Dado n = 999, qual é o retorno esperado?
 *    c) Dado n = 100, qual é o retorno esperado?
 *
 *  Nível 2 — Implementação incremental:
 *    a) Escreva uma função que apenas extrai os dígitos de `n` em um array.
 *    b) Escreva uma função que recebe um array de dígitos e encontra o índice
 *       do pivot (retorna -1 se não houver pivot).
 *    c) Escreva uma função que, dado o array de dígitos e o índice do pivot,
 *       encontra o índice do melhor substituto no sufixo.
 *    d) Escreva uma função que reverte um subarray entre dois índices.
 *    e) Componha as quatro funções acima para resolver o problema completo.
 *
 *  Nível 3 — Análise crítica:
 *    a) Revise sua solução atual neste arquivo. Ela lida corretamente com
 *       dígitos repetidos? Teste com n = 1122 (esperado: 1212).
 *    b) Sua solução lida com o caso n = 230241 corretamente?
 *       (Esperado: 230412)
 *    c) Existe algum caso em que ordenar os dígitos e verificar se o menor
 *       número formado é maior que `n` funcionaria como solução completa?
 *       Por que sim ou por que não?
 *
 *  Nível 4 — Prova de correção:
 *    a) Argumente formalmente por que o algoritmo do pivot SEMPRE produz a
 *       menor permutação maior que a atual (quando ela existe).
 *    b) Argumente por que reverter o sufixo, após a troca com o pivot, é
 *       equivalente a ordená-lo em ordem crescente.
 *
 * ----------------------------------------------------------------------------
 *  REFLEXÃO FINAL
 * ----------------------------------------------------------------------------
 *
 *  Este problema é um microcosmo da beleza dos algoritmos: um enunciado
 *  simples, uma solução que parece mágica na primeira vez que você entende,
 *  e uma riqueza de conceitos subjacentes que se aplicam a dezenas de outros
 *  problemas.
 *
 *  Quando você finalmente implementar a solução correta por conta própria,
 *  perceberá que o algoritmo é apenas a formalização de algo que a intuição
 *  matemática já sugeria: "mexa o mínimo necessário, do ponto certo, da
 *  forma mais conservadora possível."
 *
 *  Essa é a essência do pensamento algorítmico.
 *
 *  Boa sorte — e lembre-se: o aprendizado acontece exatamente no momento
 *  em que você fica travado(a) e insiste mesmo assim.
 *
 * ============================================================================
 *  REFERÊNCIAS PARA APROFUNDAMENTO
 * ============================================================================
 *
 *  - Knuth, D. E. — "The Art of Computer Programming, Vol. 4A: Combinatorial
 *    Algorithms" — Seção 7.2.1.2 (Generating all permutations)
 *  - Sedgewick, R. & Wayne, K. — "Algorithms, 4th Edition" — Cap. sobre
 *    ordenação e rearranjos
 *  - LeetCode 31  — Next Permutation (problema base)
 *  - LeetCode 46  — Permutations (geração de todas as permutações)
 *  - LeetCode 60  — Permutation Sequence (k-ésima permutação)
 *  - LeetCode 556 — Next Greater Element III (este problema)
 *
 * ============================================================================
 */
