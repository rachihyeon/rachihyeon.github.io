---
title: 양자 컴퓨팅 6 - Entanglements
date: 2026-02-24 12:00:00 +0900
categories: [양자컴퓨팅, Entanglement]
tags: [quantum computing, entanglement, bell's circuit, superposition, tensor product, hidden variable]
author: rachihyeon 
description: 양자 역학에서의 얽힘이란 무엇이고 게이트를 사용하여 얽힌 상태를 만드는 방법을 알아보고 벨의 회로 벨의 실험을 알아본다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-5-Quantum-Gate/)에서는 양자 컴퓨터의 정보 단위인 큐비트에 대해 알아보았고 이 큐비트의 상태를 변화시키는 양자 게이트에 대해 알아봤다. 

이 양자 게이트를 이용하면 얽힌 상태의 양자를 만들 수 있다. 하지만 이론상에서만 존재한다고 하면 실제로 이용할 수는 없을 것이다. 이에 벨이 증명한 실험을 소개한다.

<br>
<br>
<br>

## 1. Bell's circuit(벨의 회로)

벨의 회로는 2큐비트 게이트로 첫 번째 큐비트에 아다마르 게이트를 적용하고 그 뒤에 CNOT게이트를 적용한 게이트이다. 
<br>
$$|00>$$큐비트를 입력으로 한 벨의 회로는 아래 그림과 같다.

![Bell's circuit](/assets/img/post_img/quantum_computing/Bells_circuit.png){: width="700" }

추가로 그 밖의 기저로 벨의 회로에 통과시키면 아래의 결과를 얻을 수 있다.

<br>
$$
\begin{align}
&B(|00>) = \frac{1}{\sqrt{2}}(|00> + |11>) \notag \\
&B(|01>) = \frac{1}{\sqrt{2}}(|01> + |10>) \notag \\
&B(|10>) = \frac{1}{\sqrt{2}}(|00> - |11>) \notag \\
&B(|11>) = \frac{1}{\sqrt{2}}(|01> - |10>) \notag \\
\end{align}
$$

벨의 회로는 Hadamard + CNOT이라고 했다. 그런데 CNOT + CNOT은 Identity이며, Hadamard + Hadamard도 Identity다.

이 성질을 이용하여 벨의 회로를 뒤집어 원상태로 되돌릴 수 있다. 

이 뒤집힌 회로를 Reverse Bell's Circuit이라 부른다.

<br>
<br>

## 2. Superposition(중첩)

<br>
1큐비트는 두 개의 상태 $$|0>$$, $$|1>$$가 중첩된 상태로 표현된다. 
<br>
예를 들어, $$\begin{pmatrix} \alpha \\ \beta \end{pmatrix}$$로 표현된 양자 상태는 $$|0>$$으로 측정될 확률이 $$\alpha ^2$$이고 $$|1>$$로 측정될 확률이 $$\beta ^2$$인 것이다.
<br>
2큐비트는 네 개의 상태 $$|00>$$, $$|01>$$, $$|10>$$, $$|11>$$의 중첩으로 표현되고,

n큐비트는 $$2^n$$개의 상태의 중첩으로 표현된다.

그렇다면 n큐비트 역시 적당한 벡터 혹은 행렬로 표현 되어야 계산될 수 있다.

이때 사용되는 것이 텐서곱(Tensor Product)이다.

<br>

### 2-1. Tensor Product(텐서곱)

두 큐비트 상태 $$u := \begin{pmatrix} u_0 \\ u_1 \end{pmatrix}$$, $$v := \begin{pmatrix} v_0 \\ v_1 \end{pmatrix}$$에 대해서

이 둘의 텐서곱 $$u\otimes v := \begin{pmatrix} u_0 \cdot \begin{pmatrix} v_0 \\ v_1 \end{pmatrix} \\ u_1 \cdot \begin{pmatrix} v_0 \\ v_1 \end{pmatrix} \end{pmatrix} = \begin{pmatrix} u_0v_0 \\ u_0v_1 \\ u_1v_0 \\ u_1v_1 \end{pmatrix}$$
로 정의된다.

이 연산을 계속하여 n큐비트 상태를 벡터로 표현할 수 있다. 

><br>
>디렉 표기법에 따라서 $$|0>\otimes |1> \Rightarrow |01>$$, $$|0>\otimes |1>\otimes |0> \Rightarrow |010>$$이런 식으로 표현한다.
{: .prompt-info}

### 2-2. 텐서곱의 성질

여기서는 텐서곱의 몇 가지 성질을 소개한다.

<br>
$$
u \in \mathbb{C}^n,\ v \in \mathbb{C}^m \Rightarrow u\otimes v \in \mathbb{C}^{nm} \notag \\
$$
<br>
$$
\mathrm{for\ scalars}\quad s\ \&\ t\ ,\ su\otimes tv = (st)u\otimes v = u\otimes (st)v \notag \\
$$
<br>
$$
(u\otimes v)\otimes w = u\otimes (v\otimes w) \notag \\
$$
<br>
$$
(u+v)\otimes w = u\otimes w + v\otimes w \notag \\
$$
<br>
$$
u\otimes (v + w) = u\otimes v + u\otimes w \notag \\
$$
<br>
$$
u\otimes v \neq v\otimes u \notag \\
$$

<br>

### 2-3. Kronecker product(크로네커 곱, 행렬의 텐서곱)

위에서는 벡터 형태의 텐서곱을 이야기했다. 이번엔 행렬로 확장하여 텐서곱을 알아보자.
<br>
행렬 
$$
A = 
\begin{pmatrix} 
a_{1,1} & \cdots & a_{1,m} \\ 
\vdots  & \ddots & \vdots  \\
a_{n,1} & \cdots & a_{n,m} \\
\end{pmatrix}
$$와 $$p\times q$$행렬 $$B$$에 대해서 
<br>
두 행렬의 텐서곱 
$$
A\otimes B = 
\begin{pmatrix} 
a_{1,1}B & \cdots & a_{1,m}B \\ 
\vdots   & \ddots & \vdots   \\
a_{n,1}B & \cdots & a_{n,m}B \\
\end{pmatrix}
=
\begin{pmatrix} 
a_{1,1}b_{1,1} & \cdots & a_{1,1}b_{1,q} & \cdots & \cdots & a_{1,m}b_{1,1} & \cdots & a_{1,m}b_{1,q} \\ 
\vdots         & \ddots & \vdots         &        &        & \vdots         & \ddots & \vdots         \\
a_{1,1}b_{p,1} & \cdots & a_{1,1}b_{p,q} & \cdots & \cdots & a_{1,m}b_{p,1} & \cdots & a_{1,m}b_{p,q} \\
\vdots         &        & \vdots         &        &        & \vdots         &        & \vdots         \\
\vdots         &        & \vdots         &        &        & \vdots         &        & \vdots         \\
a_{n,1}b_{1,1} & \cdots & a_{n,1}b_{1,q} & \cdots & \cdots & a_{n,m}b_{1,1} & \cdots & a_{n,m}b_{1,q} \\ 
\vdots         & \ddots & \vdots               &  &        & \vdots         & \ddots & \vdots         \\
a_{n,1}b_{p,1} & \cdots & a_{n,1}b_{p,q} & \cdots & \cdots & a_{n,m}b_{p,1} & \cdots & a_{n,m}b_{p,q} \\
\end{pmatrix}
$$
이다.

이 행렬 텐서곱에 대해서도 [위의 텐서곱](/posts/양자컴퓨팅-6-Entanglement/#2-2-텐서곱의-성질)의 성질을 만족한다.

>1.$$(A\otimes B)(u\otimes v) = Au\otimes Bv$$<br>
>2.$$(A\otimes B)(C\otimes D) = AC\otimes BD$$ 
{: .prompt-info}

1번 성질을 말로 풀어 설명해보자면, 큐비트가 $$u$$, $$v$$인 양자 상태를 $$A$$, $$B$$게이트에 동시에 통과시키는 것은 $$u$$, $$v$$를 각각 $$A$$, $$B$$에 통과시킨 결과와 동일하다는 것이다.

2번 성질은 2큐비트 게이트를 두 번 통과 시키는 것은 각각을 분해하여 순차적으로 통과시킨 것과 동일하다는 것이다.

<br>
<br>

## 3. Entanglement(얽힘)

양자를 동전에 비유하여 표현해보자.
<br>
동전의 앞, 뒤를 각각 $$|0>$$, $$|1>$$이라 두면, 첫 번째 동전은 $$p_1|0> + q_1|1>$$, 두 번째 동전은 $$p_2|0> + q_2|1>$$라고 쓸 수 있을 것이다.
<br>
만약 두 동전이 독립이라면, 두 동전의 상태 벡터는 $$(p_1|0> + q_1|1>)\otimes (p_2|0> + q_2|1>) = p_1p_2|00> + p_1q_2|01> + q_1p_2|10> + q_1q_2|11>$$
이다.

하지만 두 큐비트가 독립이 아닌 경우가 있을 것이다. 이 경우에 두 큐비트는 얽혀있다고 한다.
<br>
수식으로 써보자면, $$(p_1|0> + q_1|1>)\otimes (p_2|0> + q_2|1>)$$와 같은 형태로 표현될 수 없다는 것이다.

<br>
예를 들어, [벨의 회로](/posts/양자컴퓨팅-6-Entanglement/#1-bells-circuit벨의-회로)에 $$|00>$$큐비트를 통과시키면 $$\frac{1}{\sqrt{2}}(|00> + |11>)$$가 된다고 했다. 
<br>
이는 위의 형태로 분해 불가능하기 때문에 얽혀있는 상태로 만든 것이다.

<br>
원래 2큐비트가 있다고 하면 둘을 각각 측정할 수 있다. 하지만 이 **얽힘**이 적용된 2큐비트의 경우엔 둘 중 하나의 큐비트를 측정하는 순간 다른 하나의 큐비트의 상태가 결정된다.(얼마나 멀리 있든 상관없이)

<br>
예시를 들어 설명해보자면, $$\frac{1}{\sqrt{2}}(|00> + |11>)$$이런 2큐비트가 있다고 해보자. 이때 두 큐비트 간의 거리가 1광년을 넘어간다고 했을 때 조차도 한 쪽에서 큐비트를 측정하여 0이라는 결과를 얻어낸 순간 다른쪽의 큐비트가 0으로 결정되어 버린다는 것이다.
<br>
얼핏 보면, 정보 전달의 속도가 빛보다 빠른 것처럼 보일 수는 있으나 사실은 그렇지 않다. 왜냐하면, 이 얽힌 큐비트 간의 관계는 하나의 계 안에 있는 것으로 어떠한 정보전달이 존재하지 않고 상호작용만 하는 것이기 때문이다.

<br>
<br>

## 4. Bell's Experiment(벨의 실험) - Copenhagen interpretation(코펜하겐 해석)

위에서 양자 상태의 얽힘에 관하여 이야기를 했지만, 이것은 주류 해석을 소개한 것이고 이에 반박하는 논리들이 있다. 가령, 이 상호작용은 거리에 반비례하는 관계를 갖고 있다든지, 아직 찾지 못한 숨은 변수가 존재한다든지 말이다.

이에 반박하는 코펜하겐의 해석을 뒷받침하는 실험이 하나 있다. 이게 벨의 실험이다.

<br>

벨의 실험의 아이디어는 이것이다.<br>
만약 $$\frac{1}{\sqrt{2}}(|00> + |11>)$$상태의 2큐비트를 $${|00>,\ |11>}$$와 다른 기저로 측정하면 어떻게 될 것인가이다.

실험내용은 아래의 세 단계를 반복하는 것으로 한다.
<br>
>1. 얽힌 두 큐비트를 두 곳에 나눈다.<br>
>2. 세 개의 정규직교기저를 설정한다.<br>
>3. 두 관찰자는 각각의 큐비트를 위에서 결정한 세 정규직교기저 중 하나를 선택하여 측정한다.
{: .prompt-info}

<br>

### 4-1. Exercise

얽힌 두 큐비트를 나눈 인물은 엘리스(Alice)와 밥(Bob)이라고 하자.

우리가 선택한 세 정규직교기저는 아래 그림과 같으며 순서대로 1, 2, 3번 기저라고 하자.<br>
또한, 그림의 파란 벡터가 0으로 기록되고 오렌지 벡터가 1로 기록된다고 정하자.

![Orthonomal basis](/assets/img/post_img/quantum_computing/Bells_orthonomal_basis.png)

#### 4-1-1. Case #1

엘리스와 밥이 같은 기저로 측정한 경우, 둘의 기록은 같을 것이다. (0이든 1이든)

#### 4-1-2. Case #2

엘리스와 밥이 다른 기저로 측정한 경우엔,

우선 엘리스가 2번 기저를 사용하여 측정했다고 한다면, 2번 기저의 벡터 중 하나로 기록될 것이다. 
<br>
그 뒤에, 밥이 3번 기저를 갖고 측정한다 하면, 3번 기저 벡터 중 엘리스가 기록한 것과 동일한 색의 벡터가 측정될 확률이 1/4, 그 반대가 3/4가 된다. 하지만 얽힘 현상 때문에 1/4이 될 수 밖에 없다.

그 밖의 1-3조합, 3-2조합 등의 모든 경우에 대해서도 이와 동일한 결과를 얻게 된다.

따라서 엘리스와 밥이 같은 상태의 양자를 측정하게 될 확률은 $$\frac{1}{3} \times 1 + \frac{2}{3} \times \frac{1}{4} = \frac{1}{2}$$

<br>

### 4-2. Hidden variable(숨은 변수 이론)

숨은 변수 이론에 따르면 모든 양자 상태는 사전에 결정되어있고 측정은 이 결정된 양자 상태를 확인하는 것이다.

세 가지 기저로 측정했을 때 각각 0과 1이 있으니 가능한 총 경우는 8가지(000, 001, 010, ..., 111)일 것이고, 

두 사람이 측정하니 (첫 번째 사람이 측정하는 기저, 두 번째 사람이 측정하는 기저)로 표현한다면, (a, a), (a, b)... (c, c)로 측정의 경우를 나눌 수 있을 것이다.

따라서 000의 경우를 (a, a)로 측정한 결과의 경우 둘 다 0이니 **참**<br>
001의 경우를 (a, c)로 측정한 경우 전자는 0이지만, 후자는 1이니 **거짓**<br>
이런 식으로 8가지의 경우에 대해 9가지 측정 방식을 모두 결정해보면 아래 그림처럼 결과가 나온다.

![Hidden Variable table](/assets/img/post_img/quantum_computing/Hidden_variable_table.png)

위 표를 보면 알겠지만 임의의 양자 상태에 대해서 두 사람이 측정한 값이 같은 경우는 적어도 5개 이상이다. 즉, 측정된 두 양자 상태가 같을 확률은 적어도 $$5/9$$이상이다.

## 5. 벨의 실험 결과

위 모든 내용에 따르면 코펜하겐 해석에서는 벨의 실험 결과 상 두 사람이 동일한  확률이 $$1/2$$이고, <br>
숨은 변수 이론에 따르면 벨의 실험 결과는 $$5/9$$이상이 되어야 한다.

하지만 1972년 J. Clauser, S. Freedman에 따르면 실험 결과가 $$1/2$$로 나타났다. ([논문 참고 링크](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.28.938))

이는 양자역학은 전통적인 물리법칙으로 해석할 수 없고 중첩이라는 상태, 얽힘이라는 상태가 존재할 수 있음을 말한다.

<br>
<br>

후기) 이번에는 양자역학에서의 얽힘이란 무엇인가에 대해서 알아보았다. 숨은 변수 이론의 표를 해석하는 것이 조금 어려웠지만 최선을 다해서 설명했습니다. 다음 포스트는 이 얽힘을 이용한 보안성을 가진 정보 전달 방법에 대해서 알아보도록 하겠습니다. 읽어주셔서 감사합니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***