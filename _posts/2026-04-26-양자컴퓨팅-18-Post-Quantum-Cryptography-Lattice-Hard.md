---
title: 양자 컴퓨팅 18 - Post Quantum Cryptography(양자 내성 암호)-Lattice Hard Problem
date: 2026-04-26 02:00:00 +0900
categories: [컴퓨터공학, 양자컴퓨팅]
tags: [quantum computing, quantum cryptography]
author: rachihyeon 
description: 지난 포스트에 이어 격자 난해 문제를 해결하는 알고리즘인 바바이 알고리즘에 대해서 다루고 격자 난해 문제를 암호 시스템에 어떻게 적용하는지에 대해 다룬다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-17-Post-Quantum-Cryptography-Lattice/)에서는 양자 컴퓨팅 시대에도 암호 시스템을 잘 유지할 수 있는 양자 내성 암호 중 격자에 대해서 알아봤다.

격자란 무엇이고 이 격자를 기반으로한 난해 문제들을 이해하기 위한 개념들과 정리들을 다뤘는데, 이번 포스트에서는 난해 문제를 해결하는 알고리즘 중 하나인 babai알고리즘에 대해서 알아보도록 하겠다.

추가적으로 다른 격자 난해 문제 두 개를 소개하고 이를 이용하여 기존 암호 시스템에 어떻게 적용하는지에 대해서도 다룸으로서 이번 포스팅을 마무리 하도록 하겠다.

<br>
<br>
<br>

## 1. Babai's nearest plane algorithm

[지난 포스트에서 다뤘던 격자 난해 문제들](/posts/양자컴퓨팅-17-Post-Quantum-Cryptography-Lattice/#5-lattice-hard-problems) 중에서 CVP와 SVP를 푸는 알고리즘을 소개하고자 한다.

문제를 자세히 들여다 보면 SVP는 CVP의 특별한 경우라는 것을 알 수 있다. 그래서 위 링크에도 언급했다시피 CVP문제를 해결할 수 있다면 SVP문제를 해결할 수 있다.

그렇기 때문에 일반적인 케이스(더 정확히는 CVP$$_{\gamma}$$)에 대해서 문제를 해결하는 알고리즘을 소개하도록 하겠다.

>후술 하겠지만 여기서 소개하는 알고리즘은 그리디 알고리즘이기 때문에 최적해를 보장하지 않는다.
{: .prompt-info}

Babai's nearest plane algorithm(이하 바바이 알고리즘)에서 해결하고자 하는 목표는 다음과 같다.

- Goal : 주어진 격자의 기저 $$B=[ b_1,\ b_2,\ ...,\ b_n ]$$와 벡터 $$\overrightarrow{t} \notin \mathcal{L}(B)$$에 대해서 $$\overrightarrow{t}$$와 가장 가까운 격자점 $$\overrightarrow{v} \in \mathcal{L}(B)$$을 근사적으로 찾는다.

- Method : $$b_n$$부터 시작하여, 초평면의 부분집합 격자 $$\mathcal{L}([ b_1,\ b_2,\ ...,\ b_{n-1} ])$$들 중 벡터 $$\overrightarrow{t}$$와 제일 가까운 격자를 찾음으로써 $$b_n$$의 계수를 찾는다. (따라서 이 알고리즘은 그리디 알고리즘이다.)

- Algorithm : 
    1. $$s$$를 $$\mbox{span}(b_1,\ ...,\ b_n)$$에 사영한 $$t$$라고 하자.
    2. $$s$$에 가장 가까운 초평면 $$c\widetilde{b_n} + \mbox{span}(b_1,\ ...,\ b_{n-1})$$을 찾아 c를 얻어낸다.(이때 $$\widetilde{b_n} \perp \mbox{span}(b_1,\ ...,\ b_{n-1})$$이고, $$c$$는 정수이다.)
    3. $$s'=s-cb_n$$이라고 두고 재귀적으로 $$s'$$와 격자 $$\mathcal{L}(b_1,\ ...,\ b_{n-1})$$에 대해서 위 방법을 사용하여 얻은 격자점을 $$x'$$라고 하자.
    4. $$x=x'+cb_n$$을 반환하고 알고리즘을 종료한다.

아래의 이미지를 참고하면 이해가 쉬울 것이다.

![babai_algorithm_image](/assets/img/post_img/quantum_computing/babai_algorithm_image.png)
<br>
[이미지 출처](https://cims.nyu.edu/~regev/teaching/lattices_fall_2004/ln/cvp.pdf)

알고리즘의 형태를 보면 알겠지만 그리디 알고리즘으로 얻은 근사 해이기 때문에 최적해를 보장하지는 않는다. 그리고 이때 $$\gamma$$에 대한 정확도를 계산해볼 수가 있는데 이는 위 이미지의 출처를 참고하기 바란다.

추가로 이 알고리즘의 정확도를 높이기 위해서는 격자의 기저가 직교기저에 가까울 수록 정확도가 늘어난다. 따라서 LLL알고리즘을 이용하는 등의 방법을 사용해서 격자 기저 간의 직교성을 높이면 알고리즘의 정확도를 높일 수 있다.

<br>
<br>

## 2. Lattice Hard problems

이번 섹션은 지난 [격자 포스트의 격자 난해 문제](/양자컴퓨팅-17-Post-Quantum-Cryptography-Lattice/#5-lattice-hard-problems)에 뒤이어 또다른 격자 난해 문제를 소개한다.

<br>

### 2-1. Short integer solution problem(SIS)

SIS문제는 파라미터 $$q,\ n,\ m,\ \beta$$에 대해서 아래와 같이 정의된다.

- Definition : $$\overrightarrow{a_1},\ \overrightarrow{a_2},\ ...,\ \overrightarrow{a_m} \in \mathbb{Z}_p^n$$에 대해서, $$z_1\overrightarrow{a_1} + z_2\overrightarrow{a_2} + ... + z_m\overrightarrow{a_m} = \overrightarrow{0}(\mbox{mod }q)$$를 만족하는 영이 아닌 벡터 $$\mathbf{z}=(z_1,\ ...,\ z_m)$$중 $$0<\mathbf{z}\leq \beta$$의 작은 해를 찾는 문제.

$$m>n$$이기 때문에 위 조건을 만족하는 영공간의 원소 $$\mathbf{z}$$는 무수히 많다. 우리는 그 중 적당한 범위 내에 작은 값을 찾고자 하는 것이다.

<hr/>

문제의 정의를 보면 SVP문제와 관계성을 찾을 수 있는데, <br>
$$a_i$$벡터를 격자의 기저 벡터라고 생각해보면 $$z_1\overrightarrow{a_1} + z_2\overrightarrow{a_2} + ... + z_m\overrightarrow{a_m}$$은 격자점에 해당하고 이 격자점에서 영벡터와 가장 가까운 점을 찾는 것이기 때문에 SIS문제는 SVP문제로 환원될 수 있다.

<br>

### 2-2. Learning with Errors problem(LWE)

LWE문제는 search버전과 decision버전이 있는데 search버전부터 소개한다.

Search-LWE

- Definition : $$\overrightarrow{a_i} \in \mathbb{Z}_p^n \ (i = 1,\ ...,\ m)$$에 대해서 $$A=[a_1 \vert ... \vert a_m]$$라고 할 때, 적당한 분포에서 추출한 $$\overrightarrow{e}$$로 계산된 $$A\overrightarrow{s}+\overrightarrow{e}$$와 $$A$$가 주어졌을 때, $$\overrightarrow{s}$$를 찾는 문제.

Decision-LWE

- Definition : 임의의 벡터 $$\overrightarrow{b}$$에 대해서, $$(A, \overrightarrow{b})$$들 중 $$(A, A\overrightarrow{s}+\overrightarrow{e})$$를 결정하는 문제

<hr/>

LWE문제에 관해서 여러 흥미로운 사실들이 있는데,

- Search-LWE와 Decision-LWE문제는 동치이다. 즉, 둘 중 하나의 문제를 풀 수 있다면 다른 문제도 해결 가능하다.

>Proof<br>
>1. Search $$\rightarrow$$ Decision<br>
>임의의 벡터 $$\overrightarrow{b}$$에 대해서 $$(A, \overrightarrow{b})$$를 Search-LWE 오라클에 입력으로 넣으면 $$\overrightarrow{s^*}$$를 얻을 수 있다.<br>
>따라서 $$\overrightarrow{b}-A\overrightarrow{s^*}$$를 얻을 수 있고 이것이 $$\overrightarrow{e}$$의 후보다.<br>
>$$\Vert \overrightarrow{e^*} \Vert$$ 를 계산하여 그 값이 크면 다시 $$\overrightarrow{b}$$를 샘플링하고 작다면 올바른 $$\overrightarrow{b}=A\overrightarrow{s}+\overrightarrow{e}$$라고 할 수 있다. <br>
>따라서 Decision문제 해결
>
>2. Decision $$\rightarrow$$ Search<br>
>$$\overrightarrow{b} = A\overrightarrow{s}+\overrightarrow{e}$$ 라고 하자.(Decision-LWE오라클 사용) <br>
>임의로 샘플링한 $$v,\ r \in \mathbb{Z}_p$$에 대해서 $$\overrightarrow{a_i} \leftarrow \overrightarrow{a_i} + r$$를 대입하여 만든 $$A_{i,r}$$에 대하여 $$\overrightarrow{b_{i,r}} = A_{i,r}\overrightarrow{s}+\overrightarrow{e'} = \overrightarrow{b} - \overrightarrow{e} + rs_i + \overrightarrow{e'}$$가 성립하고(Decision-LWE오라클 사용)<br> 
>$$\overrightarrow{b'} = \overrightarrow{b}+rv$$ 를 잡아 $$\overrightarrow{b'}-\overrightarrow{b_{i,r}} = \overrightarrow{e} - \overrightarrow{e'} + r(v-s_i)$$를 얻을 수 있다.<br>
>위 식으로부터 $$v=s_i$$를 만족한다면 $$\overrightarrow{b'}-\overrightarrow{b_{i,r}} = \overrightarrow{e} - \overrightarrow{e'}$$가 되어 노름이 작을 것이고 그렇지 않다면 노름이 커 다시 샘플링을 하고 위 과정을 반복한다.<br>
>위 방법으로부터 $$s_i$$를 얻을 수 있고, $$i=1 \mbox{ to } m$$까지 반복해 $$\overrightarrow{s}$$를 역산할 수 있다.<br>
>따라서 Search문제 해결
{: .prompt-info}

- SIS문제를 해결할 수 있다면, decision-LWE문제를 해결할 수 있다.

>Proof<br>
>샘플 $$A,\ \overrightarrow{b}=A\overrightarrow{s}+\overrightarrow{e}$$이 주어졌을 때,<br>
>$$\overrightarrow{z}A=\mathbf{0}$$ 를 만족하는 작은 $$\overrightarrow{z}$$를 찾을 수 있다면(SIS문제 해결 알고리즘 사용)<br>
>$$\overrightarrow{z}\ \overrightarrow{b}=\overrightarrow{z}\ A\overrightarrow{s}+\overrightarrow{z}\ \overrightarrow{e} = \overrightarrow{z}\ \overrightarrow{e}$$ 가 만족한다. 그리고 이 값은 매우 작기 때문에 $$\overrightarrow{b}$$가 올바른 샘플인지를 구분할 수 있게 된다.
{: .prompt-info}

<br>
<br>

## 3. 격자 기반 암호학

위에서 언급한 격자 난해 문제들을 기반으로 암호 시스템을 구축할 수 있다.

SIS문제의 경우 **충돌 저항성이 있는 해시 함수 구현** 혹은 **전자 서명**에 사용될 수 있고, <br>
LWE문제는 **공개키 암호화**, **대칭키 암호화**, **완전동형암호**에 사용될 수 있다.

이번 섹션에서는 위에서 소개한 각각의 격자 난해 문제에 대해 기존의 암호 시스템에 어떻게 적용하는지에 대해 소개하겠다.

<br>

### 3-1. 해시 함수(from SIS)

해시 함수란 $$H : \{0,\ 1 \}^m \rightarrow \{0,\ 1 \}^n\ (m>n)$$의 형태의 함수를 말한다.

해시 함수를 암호 시스템에서 사용하기 위해서는 중요한 몇 가지 성질이 있는데 그 중 하나가 충돌 저항성이다.

충돌 저항성이란 $$H(x_0)=H(x_1)$$을 만족하는 $$x_0,\ x_1(\ne x_0)$$을 찾기 어려운 성질을 말한다.

<hr/>

해시 함수 $$H_A(x)=Ax\ (\mbox{mod } q)$$라고 정의하면, 이 해시 함수의 충돌 값을 찾기 위해서 적당한 $$x$$값을 잡아 아래의 계산을 할 수 있다.

$$H_A(x_0) = Ax_0\ (\mbox{mod } q)$$이고 $$H_A(x_1) = Ax_1\ (\mbox{mod } q)$$일 때, 이 두 값이 충돌이 발생했다면 다음의 방정식을 세울 수 있다.

$$H_A(x_0) = H_A(x_1)\ \Rightarrow \ Ax_0 \equiv Ax_1\ (\mbox{mod } q) \ \Rightarrow \ A(x_0-x_1) \equiv \ (\mbox{mod } q)$$

그런데 SIS문제를 해결하기 어렵다면, 위 식으로부터 $$x_0-x_1$$을 얻어낼 수 없다. <br>
따라서 충돌을 만족하는 조건을 알기 어려우니 암호 시스템이 안전하다고 할 수 있다.

<br>

### 3-2. 전자 서명(from SIS)

전자 서명이란 오로지 비밀키를 갖고 있는 사용자만이 가질 수 있는 고유한 서명을 말한다. 이 서명은 비밀키에 대응되는 공개키로 누구나 검증 가능하기 때문에 어떤 전자 데이터에의 소유권 등을 증명하는데 사용될 수 있다.

이 전자 서명 역시 SIS를 기반으로 그 유효성을 입증할 수 있다.

<hr/>

적당한 행렬 $$A \in \mathbb{Z}_q^{n\times m}$$와 법 $$q$$에서의 $$A$$의 핵(kernel)을 $$\mathcal{L}_A^{\perp}:=\{ x\in \mathbb{Z}_q^{m} \vert Ax=0\ (\mbox{mod } q) \}$$라고 할 때,

**공개키**를 $$A$$로 두고 $$\mathcal{L}_A^{\perp}$$ 중 짧은 기저를 **개인키**로 한다면, 해시와 같은 적당한 랜덤함수 $$H$$에 대해서, 

서명을 $$Ax=H(m)$$를 만족하는 **짧은 벡터** $$x$$로 하고,<br>
이에 대응되는 검증을 $$Ax=H(m)\ (\mbox{mod } q)$$인지 그리고 $$x$$가 짧은지의 2단계로 둘 수 있다.

전자 서명의 유효성은 서명을 비밀키 이외의 값으로 만들 수 있는지 없는지에 달려있다.

따라서 위 방식의 유효성은 다음과 같이 증명할 수 있다.

검증단계에서 $$Ax=H(m)\ (\mbox{mod } q)$$라고 했다. 만약에 이 암호문에 대해서 또다른 유효한 서명을 얻었다고 가정하자.<br>
($$Ax'=H(m)\ (\mbox{mod } q)$$)

그렇다면 $$A(x-x')=0\ (\mbox{mod } q)$$이다. 이것은 SIS의 문제를 해결할 수 있으며 그 값은 $$x-x'$$라는 것을 의미한다. 따라서 모순이고 유효성을 증명할 수 있다.

<br>

### 3-3. 공개키 암호화(from LWE)

공개키 암호화는 비밀키와 공개키 쌍이 존재해서 공개키로 암호화한 암호문을 비밀키로 복호화할 수 있는 암호 시스템을 말한다.

LWE를 기반으로 공개키 암호화를 할 수 있는데 그 방법은 다음과 같다.

비밀키는 $$sk := \overrightarrow{s} \in \mathbb{Z}_q^n$$, 공개키는 $$pk := (A \in \mathbb{Z}_q^{m\times n},\ \overrightarrow{b}=A\overrightarrow{s}+e\in \mathbb{Z}_q^m)$$라고 두고,

암호화는 작은 벡터 $$\overrightarrow{r}\in \mathbb{Z}_q^m$$를 샘플링하여 $$Enc(pk;\ msg \in \{0,\ 1\}) = (\overrightarrow{c_0} := \overrightarrow{r} A,\ \overrightarrow{c_1}:= \overrightarrow{r}\ \overrightarrow{b} + \frac{q}{2}m)$$로 정의하고

복호화는 $$Dec(sk;\ cipher:=(\overrightarrow{c_0},\ c_1)) = c_1 - \overrightarrow{c_0}\cdot \overrightarrow{s} = \overrightarrow{r}\ \overrightarrow{e}+\frac{q}{2}m \approx \frac{q}{2}m$$로 정의하면 된다.

이렇게 하면 $$\overrightarrow{e}$$도 작고 $$\overrightarrow{r}$$도 작기 때문에 복호화 과정에서 $$\frac{q}{2}m$$를 얻게 된다. 따라서 $$m$$을 계산해낼 수 있다.

LWE문제를 해결하기 어렵기 때문에 공개키로부터 비밀키를 알아낼 수도 없기 때문에 암호 시스템에 유효하다고 할 수 있다.

그리고 위 방식은 1비트만 암호화 가능하지만, 현대에는 여러 비트를 한 번에 암호화 하는 방식도 있다.

<br>

### 3-4. 동형 암호(from LWE)

동형암호란 암호화된 데이터를 복호화하지 않고도 암호문 상태로 연산을 수행할 수 있는 암호를 말한다.

연산의 가능한 정도에 따라서 세부 분류가 나눠지는데,

- 부분 동형 암호 : 덧셈 혹은 곱셈 중 하나의 연산만 가능한 암호

- 준 동형 암호 : 덧셈과 곱셈 모두 가능하지만 횟수의 제한이 있는 암호

- 완전 동형 암호 : 덧셈과 곱셈을 횟수 제한 없이 사용 가능한 암호

격자 난해 문제를 이용하면 동형 암호를 구현할 수 있는데 그 방법은 위의 공개키 암호화에서 사용했던 방법이 동형 암호이다.

위의 공개키 암호화에서 사용한 암호화 과정을 사용하면 $$m_1$$과 $$m_2$$를 각각 

$$Enc(pk;\ m_1) = (\overrightarrow{r_1} A,\ \overrightarrow{r_1}\ \overrightarrow{b} + \frac{q}{2}m_1)$$

$$Enc(pk;\ m_2) = (\overrightarrow{r_2} A,\ \overrightarrow{r_2}\ \overrightarrow{b} + \frac{q}{2}m_2)$$

로 암호화 할 수 있고,

$$
\begin{align}
&Enc(pk;\ m_1) + Enc(pk;\ m_2) \notag \\
&= (\overrightarrow{r_1} A + \overrightarrow{r_2} A,\ \overrightarrow{r_1}\ \overrightarrow{b} + \frac{q}{2}m_1 + \overrightarrow{r_2}\ \overrightarrow{b} + \frac{q}{2}m_2) \notag \\
&= ((\overrightarrow{r_1} + \overrightarrow{r_2}) A,\ (\overrightarrow{r_1} + \overrightarrow{r_2})\ \overrightarrow{b} + \frac{q}{2}(m_1 + m_2)) \notag \\
\end{align}
$$

가 성립하고 이를 복호화하면 $$m_1+m_2$$가 나온다.

하지만 공개키 암호화에서 써 있다시피 $$\overrightarrow{r}\ \overrightarrow{e}$$항 만큼의 오차가 발생하는데 이 오차는 덧셈을 할 수록 커진다.

따라서 곱셈의 오차 비용은 매우 크다. 따라서 여유롭게 잡아도 준 동형 암호 수준이지만, bootstrapping기법을 사용하면 이 오차를 주기적으로 줄여서 유효한 평문을 얻을 수 있게 된다.

<br>
<br>

후기) 이 포스트를 마지막으로 양자 컴퓨팅 포스트를 마무리 하도록 하겠습니다. 읽어주셔서 감사합니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***