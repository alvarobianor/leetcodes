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
 *  ✦ Exemplo resolvido — dígitos {1, 2, 3}:
 *    Passo 1: ordene os dígitos em ordem crescente → [1, 2, 3] → número 123 (mínimo)
 *    Passo 2: liste todas as permutações em ordem crescente:
 *      123 → 132 → 213 → 231 → 312 → 321
 *    Passo 3: próxima permutação de 213 → 231  ✓
 *    Passo 4: próxima permutação de 321 → NÃO EXISTE (321 é o máximo, todos
 *             dígitos em ordem decrescente, não há como aumentar)  → retorno: -1
 *
 *  ✦ Agora você — dígitos {1, 3, 2}:
 *    a) Liste todas as permutações em ordem lexicográfica crescente.
 *    b) Qual é a próxima permutação de 312?
 *    c) Qual é a próxima permutação de 321?
 *
 *  Exercício 1.2:
 *    Para os dígitos {1, 1, 2}, quantas permutações DISTINTAS existem?
 *    (Dica: quando há elementos repetidos, a fórmula muda. Pesquise sobre
 *    "permutações com repetição".)
 *
 *  ✦ Exemplo resolvido — dígitos {1, 1, 3}:
 *    Total sem repetição: 3! = 6
 *    Como o dígito 1 aparece 2 vezes, dividimos pelas repetições: 3! / 2! = 3
 *    As 3 permutações distintas são: 113, 131, 311
 *
 *  ✦ Agora você — dígitos {2, 2, 5}:
 *    a) Quantas permutações distintas existem?
 *    b) Liste-as em ordem lexicográfica crescente.
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
 *  ✦ Exemplo resolvido — n = 2341, dígitos [2, 3, 4, 1]:
 *    Varremos da direita para a esquerda comparando pares vizinhos:
 *      índice 3→2: arr[3]=1, arr[2]=4  → 4 > 1 → ainda decrescente, continua
 *      índice 2→1: arr[2]=4, arr[1]=3  → 4 > 3 → ainda decrescente, continua
 *      índice 1→0: arr[1]=3, arr[0]=2  → 3 > 2 → PARA! arr[0]=2 é o pivot
 *    Sufixo decrescente: [3, 4, 1]  |  Pivot: 2 (índice 0)
 *    Como o pivot existe (índice 0 ≠ -1), há próxima permutação.
 *
 *  ✦ Agora você — identifique pivot e sufixo em:
 *      a) n = 4132  → dígitos: [4, 1, 3, 2]
 *      b) n = 76431 → dígitos: [7, 6, 4, 3, 1]
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
 *  ✦ Exemplo resolvido — n = 2314, dígitos [2, 3, 1, 4]:
 *    a) Pivot: varremos da direita → arr[3]=4 > arr[2]=1? sim, decrescente
 *                                  → arr[2]=1 > arr[1]=3? NÃO (1 < 3) → PARA
 *       Pivot = arr[1] = 3 (índice 1)
 *    b) Sufixo após pivot: [1, 4]. Queremos o menor elemento > 3.
 *       4 > 3 ✓  |  1 > 3 ✗  → substituir pelo 4 (índice 3)
 *    c) Swap: [2, 4, 1, 3]  → sufixo após pivot: [1, 3] já está crescente
 *       (reverter [1,3] → continua [1,3])
 *    d) Número formado: 2413  ✓  (confirme: 2413 > 2314 e usa os mesmos dígitos)
 *
 *  ✦ Agora você — n = 1432, dígitos [1, 4, 3, 2]:
 *      a) Qual é o pivot e seu índice?
 *      b) Qual elemento do sufixo troca com o pivot?
 *      c) Qual número é formado no final?
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
 *  ✦ Exemplo resolvido — raciocínio por contradição:
 *    Suponha que o sufixo NÃO estivesse em ordem decrescente.
 *    Isso significaria que existem dois elementos consecutivos no sufixo
 *    tais que arr[i] < arr[i+1] (ordem crescente).
 *    Mas nossa varredura para encontrar o pivot para EXATAMENTE quando
 *    encontra um par (pivot, próximo) onde pivot < próximo.
 *    Se o sufixo tivesse um par crescente, a varredura teria parado ali,
 *    e o pivot seria um elemento DENTRO do sufixo — contradição!
 *    Logo, o sufixo após o pivot é SEMPRE decrescente. ✓
 *
 *  ✦ Agora você:
 *    Escreva um argumento semelhante para provar que o pivot é SEMPRE
 *    o elemento mais à DIREITA que é menor que seu vizinho da direita.
 *    Por que não poderia existir um pivot mais à esquerda também?
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
 *  ✦ Exemplo resolvido — n = 31524, dígitos [3, 1, 5, 2, 4]:
 *    a) Varredura direita→esquerda: arr[4]=4 > arr[3]=2? sim | arr[3]=2 > arr[2]=5? não
 *       Pivot = arr[2] = 5 (índice 2). Sufixo: [2, 4]
 *    b) Percorremos sufixo da direita: arr[4]=4 > 5? NÃO | arr[3]=2 > 5? NÃO
 *       Nenhum elemento no sufixo é maior que 5 → a solução teria que
 *       buscar mais à esquerda. Pivot real: varredura continua até
 *       arr[1]=1 < arr[0]=3? NÃO. Pivot = arr[0]=3 (índice 0).
 *       Sufixo: [1, 5, 2, 4]. Menor elemento > 3 da direita: 4 (índice 4).
 *    c) Swap índices 0 e 4: [4, 1, 5, 2, 3]. Reverte sufixo [1,4]: [3,2,5,1]
 *       Array final: [4, 3, 2, 5, 1] → 43251
 *    d) Número formado: 43251  (confirme: 43251 > 31524 ✓)
 *
 *  ✦ Agora você — n = 21543, dígitos [2, 1, 5, 4, 3]:
 *      a) Encontre o pivot e o sufixo decrescente.
 *      b) Qual elemento do sufixo troca com o pivot?
 *      c) Qual é o número final após reverter o sufixo?
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
 *  ✦ Exemplo resolvido — número com 4 dígitos:
 *    Abordagem força bruta: gerar todas as permutações = 4! = 24 permutações.
 *    Para cada permutação, compara com n → 24 comparações, ordenar: O(4! * 4)
 *    Abordagem pivot: 3 varreduras lineares de no máximo 4 elementos = ~12 op.
 *    Com 10 dígitos:
 *      Força bruta: 10! = 3.628.800 permutações geradas
 *      Pivot:       ≈3 * 10 = 30 operações
 *    Razão: 3.628.800 / 30 = 120.960x mais lento por força bruta!
 *
 *  ✦ Agora você:
 *    Calcule a diferença para um número de 13 dígitos.
 *    Quantas permutações teriam que ser geradas? Quantas operações o
 *    algoritmo pivot faria? Qual é a razão entre os dois?
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
 *  ✦ Exemplo resolvido — n = 321 (todos dígitos decrescentes):
 *    Varredura: 1 < 2 < 3, nunca encontra pivot → pivot = -1
 *    Comportamento esperado: retornar -1 (não existe próxima permutação)
 *    Código: if (pivotIndex === -1) return -1;
 *
 *    n = 7 (1 dígito): só existe uma permutação de 1 elemento → retorno -1
 *    Código: if (digits.length === 1) return -1;
 *
 *    n = 2147483640 (próxima permutação = 2147483640+ algo > 2^31-1):
 *    Código: if (result > 2147483647) return -1;
 *
 *    n = 1122: pivot = arr[1]=1 (pois arr[2]=2 > arr[1]=1). Substituto
 *    no sufixo: menor elemento > 1 → arr[3]=2. Swap → [1,2,1,2]. Reverte
 *    sufixo → [1,2,1,2] = 1212. Retorno: 1212  ✓
 *
 *  ✦ Agora você — analise estes casos e diga o que deve retornar:
 *      a) n = 10  (dígitos [1, 0])
 *      b) n = 1999999999  (verifique se a próxima permutação cabe em 32 bits)
 *      c) n = 2211  (dígitos repetidos [2, 2, 1, 1])
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
 *  ✦ Exemplo resolvido — nums = [1, 3, 2]:
 *    Passo 1 (pivot): arr[2]=2 > arr[1]=3? Não. arr[1]=3 > arr[0]=1? Sim → pivot=arr[0]=1
 *    Passo 2 (substituto): sufixo [3,2], menor elemento > 1 da direita = 2 (índice 2)
 *    Passo 3 (swap): [2, 3, 1]
 *    Passo 4 (reverter sufixo [3,1]): [2, 1, 3]
 *    Resultado: [2, 1, 3]  (próxima permutação de [1,3,2] ✓)
 *
 *  ✦ Agora você — aplique o mesmo processo a:
 *      a) nums = [3, 2, 1]  (caso especial: maior permutação, retorna a menor)
 *      b) nums = [1, 1, 5]
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
 *  ✦ Exemplo resolvido — permutações de {1,2,3,4} que começam com 1:
 *    O primeiro dígito está fixo (= 1). Restam 3 dígitos livres: {2,3,4}
 *    Número de arranjos dos 3 restantes = 3! = 6
 *    Permutações: 1234, 1243, 1324, 1342, 1423, 1432  (6 no total ✓)
 *
 *  ✦ Agora você:
 *    Quantas permutações de {1,2,3,4,5} começam com o dígito 3?
 *    E quantas começam com "3, 1" (dois dígitos fixos)?
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
 *  ✦ Exemplo resolvido — permutação anterior de n = 2143:
 *    Para a anterior, queremos o MAIOR número MENOR que n.
 *    Passo 1: varremos da direita buscando um par CRESCENTE (ao invés de decrescente)
 *      arr[3]=3 < arr[2]=4? Sim → pivot é arr[2]=4 (índice 2)
 *    Passo 2: no sufixo [3], o maior elemento MENOR que 4 é o próprio 3 (índice 3)
 *    Passo 3: swap → [2, 1, 3, 4]
 *    Passo 4: reverter sufixo após pivot: [4] → [4] (1 elemento, sem mudança)
 *    Resultado: 2134 (anterior de 2143 ✓)
 *
 *  ✦ Agora você — encontre a permutação anterior de:
 *      a) n = 3121
 *      b) n = 1234  (caso especial: já é a menor permutação)
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
 *  ✦ Exemplo resolvido — n = 1342, dígitos [1, 3, 4, 2]:
 *    Pivot correto (mais à direita): índice 1 (valor 3)
 *    Troca 3 por 4: [1, 4, 3, 2] → reverte sufixo → [1, 4, 2, 3] = 1423
 *    Se usdássemos o pivot mais à ESQUERDA (índice 0, valor 1):
 *    Menor elemento > 1 no sufixo = 2 → swap → [2, 3, 4, 1] → reverte → 2134
 *    2134 > 1342 ✓, mas 1423 < 2134 → o pivot à direita dá o MENOR resultado!
 *
 *  ✦ Agora você — n = 2413:
 *    Compare os resultados usando pivot à direita vs pivot à esquerda.
 *    Qual é o correto e por quê?
 *
 *  Exercício 6.2:
 *    Após encontrar o pivot, por que trocamos pelo menor elemento do sufixo
 *    que é maior que o pivot, e não simplesmente pelo maior elemento do sufixo?
 *    Qual seria o impacto na corretude e na otimalidade?
 *
 *  ✦ Exemplo resolvido — n = 1243, dígitos [1, 2, 4, 3]:
 *    Pivot = arr[1]=2 (índice 1). Sufixo decrescente: [4, 3].
 *    Menor elemento > 2: 3 (índice 3). Swap → [1, 3, 4, 2]. Reverte sufixo → [1, 3, 2, 4] = 1324
 *    Se usássemos o MAIOR elemento (4, índice 2): swap → [1, 4, 2, 3]. Reverte → [1, 4, 2, 3] = 1423
 *    1324 < 1423, então o menor substituto produz o resultado MENOR (correto!) ✓
 *
 *  ✦ Agora você — n = 3154, dígitos [3, 1, 5, 4]:
 *    Compare os resultados: trocar o pivot pelo menor vs pelo maior elemento do sufixo.
 *    Qual número é formado em cada caso? Qual é o correto?
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
 *  ✦ Exemplo resolvido (Nível 1) — n = 132:
 *    Dígitos: [1, 3, 2].
 *    Pivot: arr[2]=2 < arr[1]=3 → pivot = arr[1]=3 (índice 1)
 *    Sufixo: [2]. Menor > 3? Nenhum. Então pivot = arr[0]=1, sufixo=[3,2].
 *    Menor > 1 da direita: 2 (índice 2). Swap → [2, 3, 1]. Reverte sufixo → [2, 1, 3] = 213
 *    Retorno: 213  ✓ (213 > 132, mesmos dígitos)
 *
 *  ✦ Agora você (Nível 1): resolva manualmente n = 4132.
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
 *  ✦ Exemplo resolvido (Nível 2a) — extraindo dígitos:
 *    // Abordagem com string (simples):
 *    function extractDigits(n: number): number[] {
 *      return n.toString().split('').map(Number);
 *    }
 *    // Abordagem matemática (sem string, mais rápido):
 *    function extractDigitsMath(n: number): number[] {
 *      const digits: number[] = [];
 *      while (n > 0) { digits.unshift(n % 10); n = Math.floor(n / 10); }
 *      return digits;
 *    }
 *
 *  ✦ Agora você (Nível 2b): implemente `findPivot(digits: number[]): number`.
 *    Lembre-se: varredura da direita para esquerda, retorna -1 se não existir.
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
 *  ✦ Exemplo resolvido (Nível 3c) — por que ordenar não é suficiente:
 *    n = 132. Menor permutação com mesmos dígitos = 123 < 132. Não funciona.
 *    n = 120. Menor permutação = 012 = 12 (leva zero à frente). Não funciona.
 *    Ordenar só funciona quando a próxima permutação é exatamente a
 *    permutação mínima, ou seja, quando n está na permutação máxima.
 *    Em geral, é uma abordagem INCORRETA para o problema.
 *
 *  ✦ Agora você (Nível 3a): teste sua solução atual com n = 1221.
 *    O resultado esperado é 2112. Sua solução retorna esse valor?
 *
 *  Nível 4 — Prova de correção:
 *    a) Argumente formalmente por que o algoritmo do pivot SEMPRE produz a
 *       menor permutação maior que a atual (quando ela existe).
 *    b) Argumente por que reverter o sufixo, após a troca com o pivot, é
 *       equivalente a ordená-lo em ordem crescente.
 *
 *  ✦ Exemplo resolvido (Nível 4b) — por que reverter = ordenar crescente:
 *    Provamos no Cap. 3 que o sufixo está SEMPRE em ordem decrescente.
 *    Um array decrescente é o REVERSO de um array crescente.
 *    Logo, reverter um array decrescente produz um array crescente. ✓
 *    Exemplo: sufixo [5, 3, 2, 1] (decrescente) → reverter → [1, 2, 3, 5] (crescente)
 *
 *  ✦ Agora você (Nível 4a):
 *    Escreva 3-4 sentenças argumentando por que a troca do pivot com o
 *    menor substituto, seguida da reversão do sufixo, SEMPRE gera a
 *    MENOR permutação possível que ainda é maior que a original.
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
