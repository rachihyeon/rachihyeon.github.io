---
title: 양자 컴퓨팅 12 - Quantum Algorithm(Grover's algorithm)
date: 2026-04-11 12:00:00 +0900
categories: [컴퓨터공학, 양자컴퓨팅]
tags: [quantum computing, quantum algorithm]
author: rachihyeon 
description: 양자 알고리즘 중 탐색 알고리즘인 그로버(Grover) 알고리즘에 대해서 알아본다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-11-Quantum-Algorithm-Simon/)에서는 N-큐비트 H게이트 변환을 알아보고 이를 사용해서 도이치-조사 알고리즘과 사이먼 알고리즘을 유도했다. 이 알고리즘들은 기존의 고전적인 방법에 비해 매우 효율적인 방법을 제시한다는 의의가 있다.
<br>
이번에는 또다른 알고리즘인 그로버 알고리즘을 알아보도록 한다.

<br>
<br>
<br>

## 1. Search Problem(탐색 문제)

정렬되지 않은 N개의 원소로 이루어진 리스트가 있다고 하자.
<br>
이 리스트에서 우리가 찾고자 하는 원소를 찾기 위해서는 몇 번의 확인이 필요한가?

고전적인 방식에서는 최소 1회(처음 확인한 원소가 찾고자 한 원소인 경우) 최대 99회(마지막 남은 하나가 찾고자 하는 원소인 경우)의 확인이 필요할 것이다.
<br>
따라서 이 방식의 복잡도는 $$\Omega (N)$$이 될 것이다.

하지만 이번 포스트에서 다룰 그로버 알고리즘은 양자를 이용하여 이 탐색 문제를 $$O(\sqrt{N})$$의 확인만으로 해결할 수 있는 방법이다.

문제를 단순화하여 다시 써보면 아래와 같다.

>함수(오라클) $$f:\{ 0,\ 1 \}^n \rightarrow \{ 0,\ 1 \}$$가 "$$f(x)=1$$ for one $$x\in \{ 0,\ 1 \}^n$$ 그리고 $$f(x)=0$$ otherwise"를 만족할 때,
>$$f(x)=1$$을 만족하는 $$x$$를 찾기 위해서는 얼마나 많은 질의(확인)이 필요한가?
{: .prompt-info}

<br>
<br>

## 2. Grover's algorithm (n=2)

우선 아래 그림과 같은 게이트 F를 도입한다.

![Grover algorithm F](/assets/img/post_img/quantum_computing/Grover-algorithm-f.png)

그리고 설명과 유도과정의 계산을 간단한 경우에 대해서 보이기 위해 n=2인 경우를 정하여 아래와 같이 회로를 구성한다.

![Grover algorithm circuit n=2](/assets/img/post_img/quantum_computing/Grover-algorithm-circuit-2.png)

그림을 보면 알겠지만 첫 번째 레지스터의 큐비트는 전부 0으로 초기화 하고 두 번째 레지스터의 큐비트는 1로 초기화 하고 시작한다.

<br>
첫 번째 레지스터에 H게이트를 통과시키면, $$H^{\otimes n}|0...0> = \frac{1}{\sqrt{2^n}} \sum_{z\in \{ 0,\ 1 \}^n}|z> = \frac{1}{2} (|00>+|01>+|10>+|11>) (\because n=2)$$ 
<br>
두 번째 레지스터에 H게이트를 통과시키면, $$H|1> = \frac{|0>-|1>}{\sqrt{2}}$$

<br>
상황을 조금 더 구체적으로 만들기 위해서 $$f(0, 1)=1$$이고 그 밖의 점에서 $$f=0$$이라고 해보자. $$F(|x_0x_1>|y>)=|x_0x_1>|y\oplus f(x_0,x_1)>$$이기 때문에,
<br>
두 번째 항만 $$F(\frac{1}{2\sqrt{2}}|01>\otimes (|0>-|1>)) = \frac{1}{2\sqrt{2}}|01>\otimes (|1>-|0>) = -\frac{1}{2\sqrt{2}}|01>\otimes (|0>-|1>)$$가 되고,
<br>
나머지 항은 그대로가 된다. F게이트 이후의 큐비트를 정리해서 써보면,
<br>
$$\frac{1}{2}(|00>-|01>+|10>+|11>)\otimes \frac{1}{\sqrt{2}}(|0>-|1>)$$이다.

따라서 첫 번째 레지스터의 큐비트 상태는 $$\frac{1}{2}(|00>-|01>+|10>+|11>)$$가 되고, 이를 
$$
A = \frac{1}{2}
\begin{bmatrix}
-1 &  1 &  1 &  1 \\
 1 & -1 &  1 &  1 \\
 1 &  1 & -1 &  1 \\
 1 &  1 &  1 & -1 \\
\end{bmatrix}
$$
에 통과시키면 
$$
\begin{pmatrix}
0 \\
1 \\
0 \\
0 \\
\end{pmatrix}
=|01>
$$
을 얻게 되고 이것이 $$f(01) = 1$$을 의미하게 된다.

n=2인 경우에 대해서 그로버 알고리즘의 동작을 알아봤다. 하지만, $$n\geq 3$$인 경우에 $$A$$와 닮음 행렬인 $$A'$$를 얻어내는 것이 매우 어려워진다. 따라서 일반적인 경우에 대해서는 새로운 방법을 도입할 필요가 있다.

<br>
<br>

## 3. Grover's algorithm (General case)

그로버 알고리즘의 핵심은 바로 <span style = "color : red">**반사**</span>이다.

$$1.$$ 우선 알아보기 쉽게 n=3인 경우에 대해서 알아보자. H게이트를 통해 중첩시킨 큐비트 상태를 수직선 상에 그 관측 확률을 표현한다.

![Grover step 1](/assets/img/post_img/quantum_computing/Grover-step-1.png)

$$2.$$ 이후 F게이트를 통과한 이후 그림은 아래와 같아진다.(특정한 경우를 표현하기 위해 $$f(100) = 1$$을 설정.)

![Grover step 2](/assets/img/post_img/quantum_computing/Grover-step-2.png)

$$3.$$ 그리고 이 average를 기준으로 각각의 확률을 대칭변환한다.

![Grover step 3](/assets/img/post_img/quantum_computing/Grover-step-3.png)

이 과정을 거치지 $$x=100$$인 점에서의 확률이 매우 높아졌다.

이후 $$2$$, $$3$$의 과정(뒤집고 대칭변환하고)을 반복하면 된다.

![Grover step 4](/assets/img/post_img/quantum_computing/Grover-step-4.png)

![Grover step 5](/assets/img/post_img/quantum_computing/Grover-step-5.png)

n=3인 경우에 대해서 정성적인 방법으로 그로버 알고리즘에 대해서 알아봤다.

<br>

### 3-1. Reflection operator

하지만 일반적인 경우에 대해서 정량적인 해석을 하기 위해서는 이 대칭변환(반사) 연산자가 반드시 필요하다.
<br>
따라서 벡터공간 $$V$$내의 단위 벡터 $$|w>$$에 대한 반사 연산자 $$\mbox{Ref}_{|w>} : V \rightarrow V$$는 다음과 같이 정의된다.

$$\mbox{for } |v> \in V, \mbox{Ref}_{|w>}(|v>):=2|w><w|v>-|v>$$<br>
![Reflection graph](/assets/img/post_img/quantum_computing/Reflection-graph.png)

<br>
간단하게 반사 연산자는 $$\mbox{Ref}_{|w>} = 2|w><w|-I$$로 쓸 수 있다.

자 이제, 일반적인 경우에 대해서 수식을 전개해보겠다.

우선 $$f(x_0) = 1$$을 만족한다 하자.

<br>
첫 번째 레지스터에 H게이트를 통과시켰으니 $$|\psi> := H^{\otimes n}|0...0> = \frac{1}{\sqrt{2^n}} \sum_{z\in \{ 0,\ 1 \}^n}|z>$$

<br>
F게이트에 통과시키면, $$F(|\psi>) = \frac{1}{\sqrt{2^n}} \sum_{z\neq x_0}|z> - \frac{1}{\sqrt{2^n}}|x_0> = |\psi> - \frac{2}{\sqrt{2^n}}|x_0>$$

<br>
이후 반사 연산자를 적용하면, 

$$
\begin{align}
\mbox{Ref}_{|\psi>}(|\psi> - \frac{2}{\sqrt{2^n}}|x_0>) &= (2|\psi><\psi|-I)(|\psi> - \frac{2}{\sqrt{2^n}}|x_0>) \notag \\
&= 2|\psi> - \frac{4}{2^n}|\psi>-|\psi>+\frac{2}{\sqrt{2^n}}|x_0> \notag \\
&= \frac{2^n-4}{2^n}|\psi> + \frac{2}{\sqrt{2^n}}|x_0> \notag \\
&= \frac{2^n-4}{2^n\sqrt{2^n}}\sum_{z\neq x_0}|z> + \frac{3\cdot 2^n - 4}{2^n\sqrt{2^n}}|x_0>  \notag \\
\end{align}
$$<br>
가 되고, 이 과정을 반복하는 것이 그로버 알고리즘이다.

<br>
<br>

## 4. Complexity

아까 위에서 언급했었지만, 그로버 알고리즘의 복잡도는 $$\Theta(\sqrt{N})$$이다. 이것이 어떻게 가능한 것인지 알아보도록 하자.

$$N=2^n, f : \{ 0,\ 1 \}^n \rightarrow \{ 0,\ 1 \}$$인 경우에 대해서,
<br>
$$|\psi>=\frac{1}{N}|w>+\sqrt{\frac{N-1}{N}}|\psi_{bad}>$$ where $$f(|w>)=|1>$$라고 하면, $$\sin \theta = \frac{1}{\sqrt{N}}$$를 만족하는 적당한 $$\theta$$에 대해서 <br>
$$|\psi>=\sin \theta |w> + \cos \theta|\psi_{bad}>$$라고 표현 가능하고, 이에 대한 직교벡터<br>
$$|\overline{\psi}> = \cos \theta |w> - \sin \theta|\psi_{bad}>$$를 두면

$$
\begin{align}
&|w>&=\sin \theta |\psi> + \cos \theta|\overline{\psi}> \notag \\
&|\psi_{bad}>&=\cos \theta |\psi> - \sin \theta|\overline{\psi}> \notag \\
\end{align}
$$
라고 할 수 있다.

<br>

그로버 알고리즘을 사용하면,
<br>
$$|\psi>=\sin \theta |w> + \cos \theta|\psi_{bad}>$$에 F게이트를 통과시켜 <br>
$$U_f|\psi>=-\sin \theta |w> + \cos \theta|\psi_{bad}> = \cos (2\theta) |\psi> - \sin (2\theta)|\overline{\psi}>$$가 되고 반사 연산자를 적용하면,<br>
$$|\psi> \rightarrow |\psi>$$가 되고, $$|\psi>^{\perp} \rightarrow -|\psi>^{\perp}$$이니

<br>
$$\mbox{Ref}_{|\psi>}(\cos (2\theta) |\psi> - \sin (2\theta)|\overline{\psi}>) = \cos (2\theta) |\psi> + \sin (2\theta)|\overline{\psi}> = \sin (3\theta) |w> + \cos (3\theta)|\psi_{bad}>$$
<br>
따라서 $$\mbox{Ref}_{|\psi>}U_f|\psi> : \sin \theta |w> + \cos \theta|\psi_{bad}> \rightarrow \sin (3\theta) |w> + \cos (3\theta)|\psi_{bad}>$$

<br>
귀납법을 사용하면 $$(\mbox{Ref}_{|\psi>}U_f)^k|\psi> : \sin \theta |w> + \cos \theta|\psi_{bad}> \rightarrow \sin (\textcolor{red}{(2k+1)}\theta) |w> + \cos (\textcolor{red}{(2k+1)}\theta)|\psi_{bad}>$$<br>
라는 것을 알 수 있다.

<br>
우리가 궁금한 것은 $$|w>$$의 측정이니까. $$\sin ((2k+1)\theta) \rightarrow 1$$이기를 바란다. 이는 $$(2k+1)\theta \rightarrow \frac{\pi}{2}$$와 동치이다.

따라서 점근적으로 $$k\approx \frac{\pi}{4\theta}-\frac{1}{2} \approx \frac{\pi}{4}\sqrt{N}$$

>왜냐하면, N이 충분히 크면 $$\theta$$의 값은 0에 가까워진다. 이 경우 $$\theta \approx \sin \theta$$가 되기 때문이다.
{: .prompt-info}

따라서 그로버 알고리즘의 복잡도는 $$\Theta(\sqrt{N})$$라는 것을 알 수 있다.

<br>
<br>

## 5. Usage in cryptography

이 그로버 알고리즘은 데이터베이스에서 어떤 데이터를 찾아내는 데에 사용될 수도 있지만 암호학에서 비밀키를 찾아내는 용도로도 사용 가능하다. 
<br>

비밀키를 통해 인코딩한 암호문이 있을 때 암호문과 적당한 x를 갖고 디코딩 연산을 한 평문을 $$\Theta(\sqrt{N})$$시간 안에 찾아낼 수 있는 방법을 사용 가능하다.
<br> 

고전적인 방법보다 제곱 스케일로 속도가 향상되었기 때문에 비밀키의 크기를 두 배 하면 양자 컴퓨팅 상황에서도 일단은 안전한 암호가 될 것이라고 알려져 있다.

<br>
<br>

후기)이번 포스트에서는 그로버 알고리즘에 대해서 알아봤습니다. 수식도 많고 내용 자체가 복잡하다 보니 이것저것 생각해야할 것이 많은 주제였습니다. 추상적인 스케일에서 하는 것이 아닌 n=2인 작은 경우에 대해서 차근차근 해본다면 이해하는데 도움이 될 것이라고 생각합니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***