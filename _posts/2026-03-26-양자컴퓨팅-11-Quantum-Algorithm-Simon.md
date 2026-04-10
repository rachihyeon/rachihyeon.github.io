---
title: 양자 컴퓨팅 11 - Quantum Algorithm(Simon's algorithm)
date: 2026-03-25 17:00:00 +0900
categories: [컴퓨터공학, 양자컴퓨팅]
tags: [quantum computing, quantum algorithm]
author: rachihyeon 
description: 양자 알고리즘 중 Simon의 알고리즘에 대해서 알아보고 n큐비트 H게이트 변환을 통해 도이치-조사 알고리즘의 정량적 해석을 다룬다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-10-Quantum-Algorithm-Deutsch/)에서는 첫 번째 양자 컴퓨팅 알고리즘인 도이치 알고리즘에 대해서 알아봤다. 이번 포스트에서는 도이치 알고리즘의 일반적인 상황에 대한 알고리즘인 도이치-조사 알고리즘에 대해서 정량적으로 해석해보고, 새로운 알고리즘인 사이먼의 알고리즘을 알아보도록 한다.

<br>
<br>
<br>

## 1. N-qubits Hadamard Transform

이번에 다룰 사이먼 알고리즘과 도이치-조사 알고리즘은 n큐비트 H게이트 변환에 대한 내용이 필수적이다.

차근차근 수식으로 단계를 밟아가면서 이해해보도록 한다.

$$
\begin{align}
H^{\otimes n}|00...0> &= H|0>\otimes H|0>\otimes ... \otimes H|0> \notag \\
&=(\frac{|0>+|1>}{\sqrt{2}})\otimes (\frac{|0>+|1>}{\sqrt{2}}) \otimes ... \otimes (\frac{|0>+|1>}{\sqrt{2}}) \notag \\
&=\frac{1}{\sqrt{2^n}}\sum_{z\in\{ 0,\ 1 \}^n}|z> \notag \\
\end{align}
$$<br>

보다 일반적으로 $$x=x_0x_1...x_{n-1}\in \{ 0,\ 1 \}^n$$에 대해서,
<br>
$$H|x_0>=\frac{1}{\sqrt{2}}(|0>+(-1)^{x_0}|1>)$$이니,

$$
\begin{align}
H^{\otimes n}|x> &= H|x_0>\otimes H|x_1>\otimes ... \otimes H|x_{n-1}> \notag \\
&=(\frac{|0>+(-1)^{x_0}|1>}{\sqrt{2}})\otimes (\frac{|0>+(-1)^{x_1}|1>}{\sqrt{2}}) \otimes ... \otimes (\frac{|0>+(-1)^{x_{n-1}}|1>}{\sqrt{2}}) \notag \\
&=\frac{1}{\sqrt{2^n}}\sum_{z\in\{ 0,\ 1 \}^n}\prod_{i=0}^{n-1} (-1)^{x_i z_i}|z> \notag \\
&=\frac{1}{\sqrt{2^n}}\sum_{z\in\{ 0,\ 1 \}^n}(-1)^{x\cdot z}|z> \notag \\
\end{align}
$$<br>

<br>
<br>

## 2. Simon's algorithm(사이먼 알고리즘)

사이먼의 알고리즘은 사이먼 문제를 해결하는 해결법이다.

문제는 아래와 같다.

어떤 암호(주기)에 대하여, ($$s \in \{ 0,\ 1 \}^n$$)
<br>
$$f_s : \{ 0,\ 1 \}^n \rightarrow \{ 0,\ 1 \}^n$$가 $$y=x\oplus s \Rightarrow f_s(x)=f_s(y)$$를 만족할 때
<br> 
$$f_s$$는 일대일함수인가?($$s=0^n$$) 이대일함수인가?($$s\neq 0^n$$) 즉, $$s$$는 무엇인가?
<br>
이 답을 찾기 위해서는 얼마나 많은 질의가 필요한가?

예를 들어, $$n=2$$일 때, $$f_s(00)=f_s(11)=10,\ f_s(01)=f_s(10)=00$$라고 주어져 있다면, 
<br>
2번의 질의로는 확실하게 $$s$$를 결정하지 못하고 적어도 3번의 질의는 필요하니 답은 3이 된다.(이때, $$s=11$$)

<br>

### 2-1. Classical solution

고전적인 방법으로, 최악의 경우 $$2^{n-1}+1$$번의 질의를 하면 반드시 $$f_s(x)=f_s(y)$$를 만족하는 충돌을 발견할 수 있다.
<br>
$$y=x\oplus s \Rightarrow s=x\oplus y$$이니 $$s$$를 찾을 수 있다.

하지만 평균적인 경우라 할지라도 적어도 $$\Theta(\sqrt{2^n})$$ 만큼의 질의가 필요한 것을 알 수 있다.(자세한 내용은 [생일 역설](https://ko.wikipedia.org/wiki/%EC%83%9D%EC%9D%BC_%EB%AC%B8%EC%A0%9C) 참고)

이는 지수적인 해법이기 때문에 매우 큰 비용을 요구한다. 하지만, 사이먼의 알고리즘은 양자를 사용한 해법으로 이 비용을 크게 감소시킨 알고리즘이다.

<br>

### 2-2. Quantum solution

우선 아래와 같은 게이트를 도입한다.

![Simon's algorithm F](/assets/img/post_img/quantum_computing/Simon_algorithm_f.png)

이 그림에서 $$f_s=f$$이다.

이후 아래와 같이 회로를 구성한다.

![Simon's algorithm circuit](/assets/img/post_img/quantum_computing/Simon_algorithm_circuit.png)

<br>
$$|0>^{\otimes n} \otimes |0>^{\otimes n}$$의 첫 번째 레지스터에 $$H^{\otimes n}$$를 취하면,
<br>
$$\frac{1}{\sqrt{2^n}}\sum_{x\in\{ 0,\ 1 \}^n}|x>\otimes |0>^{\otimes n}$$이고 이 큐비트를 $$F$$게이트에 통과시키면,
<br>
$$\frac{1}{\sqrt{2^n}}\sum_{x\in\{ 0,\ 1 \}^n}|x>\otimes |f(x)> = \frac{1}{\sqrt{2^{n}}}\sum_{x\in \textcolor{red}{I} \subset \{ 0,\ 1 \}^n}(|x>+|x\oplus s>)\otimes |f(x)>$$이다. 다시 앞의 n큐비트에 H게이트를 통과시키면,

>여기서 유심히 봐야 하는 것이 $$\{ 0,\ 1 \}^n$$의 부분집합 $$I$$이다.(이때 이 부분집합 $$I$$는 $$f$$의 **치역**이다.) <br>
>$$f(x)=f(x\oplus s)$$를 만족하는 $$s$$가 존재하도록 적당한 부분집합(아마도 크기가 절반인)을 잡아, 두 번째 레지스터인 $$|f(x)>$$를 측정해 $$|x>+|x\oplus s>$$를 얻어낸다.
{: .prompt-info}

$$
\begin{align}
&H^{\otimes n}(\frac{1}{\sqrt{2}}|x>+\frac{1}{\sqrt{2}}|x\oplus s>) \notag \\
&= \frac{1}{\sqrt{2^{n+1}}}\sum_{z\in\{ 0,\ 1 \}^n}(-1)^{x\cdot z}|z> + \frac{1}{\sqrt{2^{n+1}}}\sum_{z\in\{ 0,\ 1 \}^n}(-1)^{(x\oplus s)\cdot z}|z> \notag \\
&= \frac{1}{\sqrt{2^{n+1}}}(\sum_{z\in\{ 0,\ 1 \}^n}((-1)^{x\cdot z} + (-1)^{(x\oplus s)\cdot z})|z>) \notag \\
&= \frac{1}{\sqrt{2^{n+1}}}(\sum_{z\in\{ 0,\ 1 \}^n}((-1)^{x\cdot z}(1 + (-1)^{s\cdot z}) |z>) \notag \\
&= \frac{1}{\sqrt{2^{n-1}}}\sum_{z\cdot s = 0}(-1)^{x\cdot z}|z> \notag \\
\end{align}
$$<br>

>여기서 XOR을 +와 같이 사용했는데. 어차피 1이냐 -1이냐는 결국 mod2 에 의해 결정되는 것이기 때문에 mod2와 동치인 식으로 표현해 사용했다.
{: .prompt-info}

<br>
따라서, 첫 번째 레지스터의 큐비트를 측정하면 그 $$|z>$$에 대해서 $$z\cdot s=0$$을 만족하는 식 하나를 얻게 된다.

우리가 $$i$$번째 측정을 통해 얻은 $$z$$를 $$z_i$$라고 했을 때, $$s,\ z_i \in \{0, 1 \}^n \cong F_2^n$$이고 
<br>
$$z_i\cdot s = 0$$임을 알고 있으니, 우리는 선형 독립인 $$n-1$$개의 $$z_i$$를 측정한다면 $$s$$를 얻어낼 수 있을 것이다.

>$$s$$는 $$n$$자리 2진비트이다. 따라서 n개의 선형 독립인 $$z_i$$가 필요한 것이 아닌가 의문이 들 수 있다.<br>
>히지만, 위의 수식을 갖고 생각해보자. $$\frac{1}{\sqrt{2^{n-1}}}\sum_{z\cdot s = 0}(-1)^{x\cdot z}|z>$$ <br>
>$$z\cdot s = 0$$인 $$z_i$$만 측정이 가능하다는 것이다.<br> 
>이는 측정 가능한 모든 $$z_i$$의 LSB는 $$s$$의 LSB와 보수 관계라는 것을 말한다.<br>
>따라서 자유도가 하나 낮아져 $$n-1$$개의 $$z_i$$만으로 $$s$$를 얻어낼 수 있게 되는 것이다.
{: .prompt-tip}

모든 $$z_i$$의 관측 확률은 동일하기 때문에 확률을 구해볼 수 있다.

$$Pr($$임의의 벡터 $$n+N$$개를 측정 했을 때 $$n-1$$개의 선형 독립인 벡터를 얻을 확률$$)\geq 1-(\frac{1}{2})^N$$

따라서 알고리즘의 복잡도는 $$\Theta(n)$$이고, 이정도 질의면 충분히 문제를 해결할 수 있음을 알 수 있다.
<br>
실제 $$s$$에 대한 계산은 고전적인 알고리즘을 사용해 $$\Theta(n^2)$$로 해결할 수 있다.

<br>
<br>

## 3. Deutsch-Jozsa's algorithm(도이치-조사 알고리즘)

도이치-조사 알고리즘은 [지난 포스트에서 다뤘던 도이치 알고리즘](/posts/양자컴퓨팅-10-Quantum-Algorithm-Deutsch/#2-deutschs-algorithm)의 일반화 알고리즘이라고 할 수 있다.

도이치 알고리즘과 비슷하게 아래와 같은 회로도를 구성한다.(F게이트는 도이치 알고리즘의 F와 유사하게 동작한다.)

![Deuscht-Jozsa algorithm circuit](/assets/img/post_img/quantum_computing/Deutsch_Jozsa_algorithm_circuit.png)

<br>
$$H^{\otimes n}|0...0>\otimes H|1> = \frac{1}{\sqrt{2^n}}\sum_{z\in\{ 0,\ 1 \}^n}|z>\otimes (\frac{|0>-|1>}{\sqrt{2}})$$이고,

<br>
F게이트에 통과시키면 $$\frac{1}{\sqrt{2^{n+1}}}\sum_{z\in\{ 0,\ 1 \}^n}|z>(|f(z)-|1\oplus f(z)>) = \frac{1}{\sqrt{2^{n}}}\sum_{z\in\{ 0,\ 1 \}^n}(-1)^{f(z)}|z>(\frac{|0>-|1>}{\sqrt{2}})$$이고, 첫 번째 레지스터에 H게이트를 통과시키면,

$$
\begin{align}
H&^{\otimes n}(\frac{1}{\sqrt{2^{n}}}\sum_{z\in\{ 0,\ 1 \}^n}(-1)^{f(z)}|z>) \notag \\
&= \frac{1}{\sqrt{2^{n}}}\sum_{z\in\{ 0,\ 1 \}^n}(-1)^{f(z)} H^{\otimes n}|z> \notag \\
&= \frac{1}{\sqrt{2^{n}}}\sum_{z\in\{ 0,\ 1 \}^n}(-1)^{f(z)} \frac{1}{\sqrt{2^{n}}}\sum_{y\in\{ 0,\ 1 \}^n}(-1)^{z\cdot y}|y> \notag \\
&= \frac{1}{2^{n}}\sum_{z\in\{ 0,\ 1 \}^n}\sum_{y\in\{ 0,\ 1 \}^n}(-1)^{f(z)+z\cdot y}|y> \notag \\
\end{align}
$$<br>

따라서 어떤 상태 $$k$$가 측정될 확률은 $$\Vert \frac{1}{2^n}\sum_{z\in\{ 0,\ 1 \}^n}(-1)^{f(z)+z\cdot k} \Vert ^2$$

$$k=0$$일 때, 관측 확률은 $$\Vert \frac{1}{2^n}\sum_{z\in\{ 0,\ 1 \}^n}(-1)^{f(z)} \Vert ^2$$

$$f$$가 상수 함수라면, 이 상태는 1의 확률로 측정되고, $$f$$가 균형함수라면 이 상태는 관측될 수 없으니 0의 확률로 측정된다. 따라서, 1회의 질의만으로 균형/상수 함수의 유형을 분류해낼 수 있다.

<br>
<br>

후기)이번에는 수식이 참 많습니다. 하지만 그 내용이 어렵지는 않기 때문에 천천히 읽어나간다면 이해하는데 어려움이 있지 않을 것입니다. 약간의 계산 테크닉이 필요하지만, 최대한 자세히 풀어 썼으니 도움이 되길 바랍니다. 다음 포스트는 탐색 알고리즘인 그로버 알고리즘입니다. 

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***