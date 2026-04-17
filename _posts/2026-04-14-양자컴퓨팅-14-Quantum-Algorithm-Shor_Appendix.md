---
title: 양자 컴퓨팅 14 - Quantum Algorithm(Shor's algorithm)-Appendix
date: 2026-04-14 23:00:00 +0900
categories: [컴퓨터공학, 양자컴퓨팅]
tags: [quantum computing, quantum algorithm]
author: rachihyeon 
description: 쇼어 알고리즘에서 언급했던 실패 확률의 도출과정, 쇼어 알고리즘에서 a의 위수인 r을 얻어내는 방법을 다룹니다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-13-Quantum-Algorithm-Shor/)에서는 소인수 분해 알고리즘인 쇼어 알고리즘에 대해서 알아봤다. 쇼어 알고리즘을 다루는 과정에서 포스트의 핵심에서 벗어난 이야기지만 참고하면 도움이 될 내용을 이번 포스트에서 다루도록 한다.

<br>
<br>
<br>

## 1. 쇼어 알고리즘의 실패 확률

[쇼어 알고리즘](/posts/양자컴퓨팅-13-Quantum-Algorithm-Shor/#1-shors-algorithm쇼어-알고리즘)을 다시 써보면,

$$N=p\cdot q$$이라고 하자.

$$1.$$ $$gcd(a, N)=1$$를 만족하는 $$a \in (0, N)$$를 임의로 하나 뽑는다.(테스트를 통해 찾을 때까지 반복)

$$2.$$ 법 $$N$$에 대한 $$a$$의 위수 $$r$$를 찾는다. <span style = "color : red">(이 부분이 쇼어 알고리즘의 핵심이 되는 양자 컴퓨팅으로 해결됨.)</span>

$$3.$$ $$2$$번 에서 찾은 $$r$$이 짝수가 될 때까지 $$1$$번과 $$2$$번을 반복한다.

$$4.$$ $$r$$이 짝수라면, $$a^r-1 \equiv (a^{r/2} - 1)(a^{r/2} + 1) \equiv 0 (mod\ N)$$로 표현 가능하다.

$$5.$$ $$a^{r/2} - 1\not\equiv 0(mod\ N)$$이기 때문에, $$gcd(a^{r/2}-1, N)=1\ \mathrm{or}\ p\ \mathrm{or}\ q$$이다.

$$6.$$ $$gcd(a^{r/2}-1, N)\neq 1$$이면, $$N$$의 인수인 $$p$$ 또는 $$q$$를 찾은 것이니 알고리즘 종료. 하지만, $$gcd(a^{r/2}-1, N)=1$$이면, $$1$$번으로 돌아가 다시 알고리즘 시행.

<br>
위 과정속에서 실패하는 경우는 두 가지이다.

- 첫 번째, $$r$$이 홀수
- 두 번째, $$a^{r/2}\equiv -1\ (mod\ N)$$

---

<span style="color : orange; font-size : 24px;">1단계</span>
<br>
우선 $$N$$이 합성수이므로, $$N=p_1^{e_1}\cdots p_k^{e_k}$$라고 쓸 수 있고,
<br>
중국인의 나머지 정리(CRT)에 의해, $$\mathbb{Z}_N^*\cong \mathbb{Z}_{p_1^{e_1}}^* \times \cdots \times \mathbb{Z}_{p_k^{e_k}}^*$$
<br>
따라서 $$a$$를 랜덤하게 고르는 것은 각 성분을 독립적으로 랜덤하게 고르는 것과 동치이다.

---

<span style="color : orange; font-size : 24px;">2단계</span>
<br>
그리고 $$r_i$$를 법 $$p_i^{e_i}$$에서의 $$a$$의 위수라고 하고 $$r$$을 법 $$N$$에서의 $$a$$의 위수라고 하자.

$$l=\mbox{lcm}(r_1, \cdots , r_k)$$로 놓으면, $$l$$은 $$r_i (\ i \in \{ 1, \cdots ,\ k \} )$$의 배수이므로 $$a^l\equiv 1 (\ mod\ p_i^{e_i})$$

$$gcd(p_i^{e_i}, p_j^{e_j})=1 \mbox{when }i=\neq j$$이니 중국인의 나머지 정리로부터 $$a^l\equiv 1 (\ mod\ N)$$가 성립한다. 
<br>
따라서 $$r\leq l = \mbox{lcm}(r_1, \cdots , r_k)$$

한편, $$r$$은 $$a^r\equiv 1 (\ mod\ N)$$를 만족하는 가장 작은 값이므로, $$a^r\equiv 1 (\ mod\ p_i^{e_i})$$이니,
<br>
위수의 정의에 따라서, $$r_i | r \ (\ i \in \{ 1, \cdots ,\ k \} )$$이고 최소공배수의 정의에 따라 $$\mbox{lcm}(r_1, \cdots , r_k) | r$$가 만족한다.
<br>
즉, $$r\geq \mbox{lcm}(r_1, \cdots , r_k)$$

$$r\leq l = \mbox{lcm}(r_1, \cdots , r_k)$$이고, $$r\geq \mbox{lcm}(r_1, \cdots , r_k)$$이니 $$r=\mbox{lcm}(r_1, \cdots , r_k)$$이다.

---

<span style="color : orange; font-size : 24px;">3단계</span>
<br>
각 위수를 2의 거듭제곱과 홀수의 곱으로 표현한다.

$$r_i=2^{s_i}\times m_i\ (s_i\mbox{는 음이 아닌 정수, }m_i \mbox{는 홀수})$$라고 쓸 수 있으니,

$$r=\mbox{lcm}(r_1, \cdots , r_k) = 2^{\mbox{max}(s_i | i \in \{1,\ \cdots ,\ k  \})} \times M$$
<br>라고 쓸 수 있다.

- 실패 조건 1.
<br>
이제 위에서 언급한 실패의 경우의 표현을 다르게 바꾼다.
<br>
$$r$$이 홀수라는 것은 $$\mbox{max}(s_i | i \in \{1,\ \cdots ,\ k  \})=0 \Leftrightarrow \forall i,\ s_i=0$$

<br>

- 실패 조건 2.
<br>
$$a^{r/2}\equiv -1\ (mod\ N)$$라는 것은 일단 $$r$$가 짝수라는 것이니 $$\mbox{max}(s_i | i \in \{1,\ \cdots ,\ k  \}) \geq 1$$이어야 하고,
<br>
중국인의 나머지 정리에 의해 $$a^{r/2}\equiv -1\ (mod\ p_i^{e_i})$$이다. 그리고 이것은 $$s_1=s_2=\cdots =s_k$$와 동치이다.

증명)<br>
$$1.$$ $$a^{r/2}\equiv -1\ (mod\ N) \Rightarrow s_1=s_2=\cdots =s_k $$<br>

CRT에 의해, $$a^{r/2}\equiv -1\ (mod\ N) \Leftrightarrow a^{r/2}\equiv -1\ (mod\ p_i^{e_i})$$이고
<br>
$$r=2^{\mbox{max}(s_i | i \in \{1,\ \cdots ,\ k  \})}\times M \Rightarrow r/2 = 2^{\mbox{max}(s_i | i \in \{1,\ \cdots ,\ k  \}) - 1}\times M$$이다.

법 $$p_i^{e_i}$$에서, $$(a^{r/2})^2\equiv 1$$이니, 법 $$p_i^{e_i}$$에서 $$a^{r/2}$$의 위수는 2이다.
<br>
이는 $$r_i \nmid \frac{r}{2}$$이고, $$r_i | r$$를 의미한다.
<br>
($$r_i | \frac{r}{2}\mbox{라면, }a^{r/2}\equiv 1 \mbox{ 이 되어버리니 가정에 모순이다.}$$)

<br>
한편, $$r_i=2^{s_i}\times m_i$$이고, $$r=2^{s}\times M$$이므로 $$r_i | r$$이지만, $$r_i \nmid \frac{r}{2}$$이다.
<br>
이는 $$s_i=\mbox{max}(s_i | i \in \{1,\ \cdots ,\ k  \})$$라는 것을 의미하고 $$s_1=s_2=\cdots =s_k$$과 동치이다.

<br>

$$2.$$ $$a^{r/2}\equiv -1\ (mod\ N) \Leftarrow s_1=s_2=\cdots =s_k $$<br>

$$s_i=s$$라고 하면, $$r=2^s \times M \Rightarrow a^{r/2}=a^{2^{s-1}\times M}$$

$$(a^{r/2})^2 = a^r \equiv 1\ (mod\ p_i^{e_i})$$이므로, $$a^{r/2}$$은 $$x^2 \equiv 1\ (mod\ p_i^{e_i})$$의 해이다.

따라서 가능한 경우는 $$x \equiv 1\ (mod\ p_i^{e_i})$$ 또는 $$x \equiv -1\ (mod\ p_i^{e_i})$$이다.
<br>
그런데 $$x \equiv 1\ (mod\ p_i^{e_i})$$라면, $$r_p | \frac{r}{2}$$이므로 $$2^s\times m_i | 2^{s-1} \times M$$ 좌변의 2의 승수가 더 크기 때문에 불가능하다.

따라서, $$a^{r/2} = x \equiv -1\ (mod\ p_i^{e_i})$$

최종적으로, CRT에 의해 $$a^{r/2} \equiv -1\ (mod\ N)$$

실패 조건 2를 다시 써보면, $$a^{r/2}\equiv -1\ (mod\ N) \Leftrightarrow s_1=s_2=\cdots =s_k $$이니 $$s_1=s_2=\cdots =s_k \geq 1$$라고 쓸 수 있다.

두 조건을 합쳐서 생각해보면, $$s_1=s_2=\cdots =s_k$$인 경우가 모든 실패 가능한 경우와 동치인 것을 알 수 있다.

---

<span style="color : orange; font-size : 24px;">4단계</span>
<br>
따라서 우리가 구해야 할 것은 우리가 선택한 각 수의 2의 승수가 모두 같은 경우이다. ($$s_1=s_2=\cdots =s_k$$)

$$\mathbb{Z}_{p_i^{e_i}}^*$$는 순환군이고 크기는 $$p_i^{e_i}-1$$이다. $$p_i^{e_i}-1$$의 2의 지수를 $$u$$라고 하면, $$p_i^{e_i}-1 = 2^u \times m_u$$가 된다.

따라서 $$P(s_i=0)=\frac{1}{2}, \quad P(s_i=1)=\frac{1}{4}, \quad \cdots , P(s_i=u)=\frac{1}{2^u}$$

임의의 $$s_i$$를 선택하는 것은 독립사건이므로 

$$
\begin{align}
P(s_1=s_2=\cdots =s_k) &= \sum_{z=0}^{min(\log{p_i^{e_i}} | i \in \{ 1, ..., k \})} P(s_1=z)\cdot ... \cdot P(s_k=z) \notag \\
&= \sum_{z=0}^{min(\log{p_i^{e_i}} | i \in \{ 1, ..., k \})} \left(\frac{1}{2} \right)^{z+1}  \cdot ... \cdot \left(\frac{1}{2} \right)^{z+1} \notag  \\
&= \sum_{z=0}^{min(\log{p_i^{e_i}} | i \in \{ 1, ..., k \})} \left(\frac{1}{2^k} \right)^{z+1} \notag  \\
&< \sum_{z=0}^{\infty} \left(\frac{1}{2^k} \right)^{z+1} \notag  \\
&= \left(\frac{1/2^k}{1-{1/2^k}} \right) = \left(\frac{1}{2^k - 1} \right) \notag 
\end{align}
$$

k=2만 되더라도 확률이 1/3정도로 낮기 때문에 몇 번의 시도면 금방 알고리즘 실행에 성공할 것을 알 수 있다.

<br>
<br>

## 2. 쇼어 알고리즘에서 위수 r 찾기

우리는 이전에 쇼어 알고리즘에서 법 $$N$$에 대한 $$a$$의 위수 $$r$$을 찾아내야 한다고 했다.

그때 계산했던 수식에 따르면, ([이전포스트 참고](/posts/양자컴퓨팅-13-Quantum-Algorithm-Shor/#3-shors-algorithm-with-qft))

$$x$$을 얻게 되고 $$\frac{x}{2^n}\approx \frac{k}{r}$$를 만족하다고 했다.

우리가 아는 것은 $$x$$와 $$2^n$$이다. 사실상 부정방정식과 같은데, 여기서 우리는 하나의 정리를 사용해 $$r$$을 찾는다.

>Theorem.<br>
>If $$|\frac{x}{2^n}-\frac{k}{r}|\leq \frac{1}{2r^2} \mbox{ and } r<2^n$$, then $$\frac{k}{r}$$은 $$\frac{x}{2^n}$$의 수렴 연분수이다.
{: .prompt-info}

증명은 아래 문서 참고<br>
[Quantum Computation and Quantum Information, 637p참고](https://profmcruz.wordpress.com/wp-content/uploads/2017/08/quantum-computation-and-quantum-information-nielsen-chuang.pdf)<br>
[Dirichlet's approximation theorem](https://en.wikipedia.org/wiki/Dirichlet's_approximation_theorem)

위 정리를 기반으로, 구체적인 숫자를 예시로 들어 위수 $$r$$을 찾아보겠다.

$$n=9$$이고, $$x=213$$으로 측정됐다고 하자. 실제 $$\frac{k}{x}=\frac{5}{12}$$라고 할 때,

$$\frac{213}{512}=\frac{1}{2+\frac{86}{213}}=\frac{1}{2+\frac{1}{2+\frac{41}{86}}} = \frac{1}{2+\frac{1}{2+\frac{1}{2+\frac{1}{41}}}} = \frac{1}{2+\frac{1}{2+\frac{1}{2+\frac{1}{10+\frac{1}{4}}}}} $$

위 분수식처럼 수렴 연분수가 나타나고 각 항을 기약분수 형태로 나타내면

$$\frac{1}{2},\quad \frac{2}{5},\quad \frac{5}{12},\quad \frac{52}{125},\quad \frac{213}{512}$$

로 나타나는데, 이중 세 번째 분수에 정확하게 나타나는 것을 볼 수 있다.

실제 문제상황에서는 어떤 기약분수가 우리가 원하는 결과인지를 바로 알 수 없기 떄문에, 검증과정을 거쳐야 하는데 그 과정은 고전적인 컴퓨터로도 금방 해결할 수 있는 문제이기 때문에 $$O(n)$$정도면 해결 가능하다.

<br>
<br>

후기) 이번 포스트에서는 쇼어 알고리즘의 이해에 도움이 되는 것들을 다뤄봤습니다. 사실 실패 확률의 계산 단계는 어디선가 가져온 것이 아니고 제가 계산해낸 것이기 때문에 과정에 오류가 있을 순 있지만 결과는 동일합니다. 그리고 위수 r을 찾는 과정은 링크로 첨부한 문서들을 확인하면 이해하기 쉽게 설명되어 있습니다. 사실 증명과정을 다시 써볼까 했지만, 정보를 찾는 과정에서 첨부한 문서들을 찾았고 해당 문서에 잘 설명되어있어서 첨부로 대체하였습니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***