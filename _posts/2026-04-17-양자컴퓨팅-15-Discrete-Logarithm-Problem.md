---
title: 양자 컴퓨팅 15 - Discrete Logarithm Problem(DLP)
date: 2026-04-17 16:00:00 +0900
categories: [컴퓨터공학, 양자컴퓨팅]
tags: [quantum computing, quantum algorithm]
author: rachihyeon 
description: 이산 로그 문제란 무엇이며, 이산 로그 문제를 해결하는 방법 중 하나인 쇼어 알고리즘을 사용하는 방식에 대해서 다룬다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지지난 포스트](/posts/양자컴퓨팅-13-Quantum-Algorithm-Shor/)와 [지난 포스트](/posts/양자컴퓨팅-14-Quantum-Algorithm-Shor_Appendix/)에선는 쇼어 알고리즘에 대해서 자세히 알아봤다.
<br>
이번 포스트에서는 쇼어 알고리즘을 이용하여 이산 로그 문제를 해결하는 방법에 대해서 다룬다. 

<br>
<br>
<br>

## 1. Discrete Logarithm Problem(DLP)

이산 로그 문제란, $$g^t\equiv h\ (\mbox{mod }N)$$라는 식에서 $$g,\ h$$가 주어졌을 때, $$t$$를 찾는 문제이다.

일반 실수 전체에 대한 로그 문제였다면 손쉽게 계산해낼 수 있지만, $$N$$가 충분히 크다면 고전적인 컴퓨터로는 풀기 어려운 문제이다.

문제를 다시 써보면 아래와 같이 써볼 수 있다.

$$a,\ b\equiv a^t\ (\mbox{mod }N)$$이면, 적당한 함수 $$f(x,y)=a^xb^{-y} \mbox{ mod }N$$를 생각해볼 수 있다.

$$b\equiv a^t\ (\mbox{mod }N)$$이니,  $$f(x,y)=a^xa^{-ty} = a^{x-ty} \mbox{ mod }N$$이다. 따라서 $$f$$의 함숫값은 $$x-ty$$에 의존한다.

따라서, $$f(x_0,\ y_0)=C \mbox{ mod }N$$라면, $$x-ty=x_0-ty_0$$를 만족하는 모든 $$(x,\ y)$$에 대해서도 $$f=C$$이다.

이걸 정리해보면, $$x=x_0+kt,\quad y=y_0+k\quad (k\in \mathbb{Z})$$이고, 이게 의미하는 바는, $$f$$가 2차원 공간에서 방향벡터 $$(t,\ 1)$$을 따르는 주기함수라는 것이다.

일반적으로, 법 $$N$$에 대한 $$a$$의 위수가 $$r$$이라고 했을 때, $$x-ty\equiv x_0-ty_0 (\mbox{mod }r)$$인 점 모든 곳에서 $$f$$가 같은 주기함수라는 것을 알 수 있고,

$$x\equiv c+ty (\mbox{mod }r)$$($$c$$는 적당한 상수)라고 하면, $$x$$가 $$r$$씩 늘어도 식은 성립하고, $$x$$가 $$t$$만큼 늘었을 때, $$y$$가 1만큼 증가해도 식은 성립한다. 

따라서, 이 식은 2차원 격자의 형태를 나타내며, 이 격자 공간 상의 임의의 점은 $$\left(\begin{array}{c} x \\ y \end{array} \right) = \left(\begin{array}{c} x_0 \\ y_0 \end{array} \right) + \lambda_1 \left(\begin{array}{c} r \\ 0 \end{array} \right) + \lambda_2 \left(\begin{array}{c} t \\ 1 \end{array} \right),\quad \lambda_1,\ \lambda_2 \in \mathbb{Z}$$로 표현된다.

이 주기적인 성질을 사용하여 위수를 추출하는 방법을 우리는 [지지난 포스트의 쇼어 알고리즘](/posts/양자컴퓨팅-13-Quantum-Algorithm-Shor/)에서 알아봤다. 

양자 푸리에 변환을 사용하면 이 관계식에서 이산 로그 값 $$t$$를 얻어낼 수 있게 된다.

<br>
<br>

## 2. Solving DLP with Shor's algorithm

이번 섹션에서는 쇼어 알고리즘을 이용하여 DLP문제를 해결하는 보다 자세한 과정을 소개하고자 한다.

우선 0으로 초기화된 n-qubits레지스터와 0으로 초기화된 레지스터 총 3개의 레지스터를 준비한다.

$$|0\rangle ^{\otimes n}|0\rangle^{\otimes n}|0\rangle$$

앞의 두 레지스터에 $$H^{\otimes n}$$를 적용하고 마지막 레지스터에 $$f$$를 적용하는 함수 오라클 게이트를 적용한다.

$$\frac{1}{2^n}\sum_{x \in \{ 0,\ 1 \}^n}\sum_{y \in \{ 0,\ 1 \}^n}|x\rangle|y\rangle|a^xb^{-y}\rangle$$

이렇게 되면 세 개의 레지스터간에 얽힘이 생기게 된다. 이후 세 번째 레지스터를 측정하면 큐비트의 상태는 아래와 같이 변한다.

$$|\psi \rangle := \frac{1}{M}\sum_{x-ty\equiv c (\mbox{mod }r)}|x\rangle|y\rangle$$

>아까 이전 섹션에서 말했던 $$f$$의 주기성 때문에 시그마의 아래 첨자가 위 식처럼 나타나게 된다.
{: .prompt-info}

그리고 이 결과의 두 레지스터에 각각 양자 푸리에 변환(QFT)을 취해주면,

$$|\Psi\rangle := \mbox{QFT}\otimes \mbox{QFT}|\psi\rangle = \frac{1}{M}\sum_{(x,\ y)}\left( \frac{1}{\sqrt{N}}\sum_{k_1 \in \{ 0,\ 1 \}^n}e^{2\pi i x k_1/N}|k_1\rangle \right) \left( \frac{1}{\sqrt{N}}\sum_{k_2 \in \{ 0,\ 1 \}^n}e^{2\pi i y k_2/N}|k_2\rangle \right) $$

위 결과의 식을 보기 편하게 변형해주면,

$$ = \frac{1}{MN}\sum_{k_1,\ k_2} \left( \sum_{x-ty\equiv c (\mbox{mod }r)} e^{2\pi i(xk_1+yk_2)/N} \right) |k_1\rangle |k_2\rangle$$

한편, 이전 섹션에서 $$f$$의 값이 같게 되는 격자점은 $$\left(\begin{array}{c} x \\ y \end{array} \right) = \left(\begin{array}{c} x_0 \\ y_0 \end{array} \right) + \lambda_1 \left(\begin{array}{c} r \\ 0 \end{array} \right) + \lambda_2 \left(\begin{array}{c} t \\ 1 \end{array} \right),\quad \lambda_1,\ \lambda_2 \in \mathbb{Z}$$과 같은 식으로 표현된다고 했다.

따라서, $$x=x_0+r\lambda_1+t\lambda_2,\quad y=y_0+\lambda_2$$를 대입해서 양자 푸리에 변환의 진폭 식을 써보면,

$$A(k1​,k2​):=\sum_{x-ty\equiv c (\mbox{mod }r)} e^{2\pi i(xk_1+yk_2)/N} = \sum_{\lambda_1,\ \lambda_2} e^{2\pi i((x_0+r\lambda_1+t\lambda_2)k_1+(y_0+\lambda_2)k_2)/N}$$

$$\lambda_1$$과 $$\lambda_2$$에 대한 식 각각을 분리해보면,

$$= e^{2\pi i(x_0k_1+y_0k_2)/N}\cdot \sum_{\lambda_1} e^{2\pi i r \lambda_1 k_1/N} \cdot \sum_{\lambda_2} e^{2\pi i \lambda_2 (tk_1+k_2)/N}$$

$$\lambda$$에 대한 각 식은 등비수열의 부분합이므로, $$\lambda_1$$에 대한 식은 공비가 $$e^{2\pi i r k_1/N}$$이고, $$\lambda_2$$에 대한 식은 공비가 $$e^{2\pi i r (tk_1+k_2)/N}$$이다.

따라서, $$e^{2\pi i r k_1/N} = 1$$이면 즉, $$r k_1/N\in \mathbb{Z}$$이면 $$\lambda_1$$에 대한 식은 0이 아닌 어떤 값을 갖게 되기 때문에 측정이 가능한 경우가 된다.

또한, $$e^{2\pi i r (tk_1+k_2)/N} = 1$$이면 즉, $$(tk_1+k_2)/N \in \mathbb{Z}$$이면 $$\lambda_2$$에 대한 식은 0이 아닌 어떤 값을 갖게 되기 때문에 측정 가능한 경우가 된다.

>정확하게 말하자면, $$x=x_0+r\lambda_1+t\lambda_2,\quad y=y_0+\lambda_2$$로부터 $$\lambda_1 \in \{0,...,N/r-1 \}$$이고, $$\lambda_2 \in \{0,...,N-1 \}$$라는 범위를 얻으니,
>
>$$\sum_{\lambda_1} e^{2\pi i r \lambda_1 k_1/N} = \left\{ \begin{array}{lcl} N/r & rk_1/N \in \mathbb{Z} \\ \frac{1-(e^{2 \pi i r k_1 / N})^{N/r}}{1-e^{2 \pi i r k_1 / N}}=0 & rk_1/N \not\in \mathbb{Z} \end{array}\right.$$
>
>$$\sum_{\lambda_2} e^{2\pi i \lambda_2 (tk_1+k_2)/N} = \left\{ \begin{array}{lcl} N & (tk_1+k_2)/N \in \mathbb{Z} \\ \frac{1-(e^{2\pi i (tk_1+k_2)/N})^{N}}{1-e^{2\pi i (tk_1+k_2)/N}}=0 & (tk_1+k_2)/N \not\in \mathbb{Z} \end{array}\right.$$
>
>의 식으로 표현된다.
{: .prompt-info}

<br>
이제 우리는 이 $$|\Psi\rangle$$를 측정하면 $$rk_1/N = j_1 \in \mathbb{Z}$$를 만족하는 $$|k_1\rangle$$과 $$(tk_1+k_2)/N = j_2 \in \mathbb{Z}$$를 만족하는 $$|k_2\rangle$$를 얻을 수 있다.

$$k_1=j_1N/r$$이니, 

$$j_2=\frac{tk_1+k_2}{N}=\frac{tj_1N/r+k_2}{N}=\frac{tj_1}{r} + \frac{k_2}{N}\ \Rightarrow \ \frac{tj_1}{r} = j_2 - \frac{k_2}{N}$$

식을 변형하면,

$$tj_1 = j_2r-\frac{k_2r}{N}$$

인데, [지난 포스트](/posts/양자컴퓨팅-14-Quantum-Algorithm-Shor_Appendix/)에서 연분수 근사 정리를 이용하여 어떤 수의 수렴 연분수를 찾는 방법을 알아봤다. 이번에도 이 방법을 사용하여 $$\frac{k_2}{N}\approx \frac{u}{r}$$인 정수 $$u$$와 $$r$$을 찾을 수 있다.

위 정리로부터,

$$tj_1 = j_2r-\frac{k_2r}{N}=j_2r-u\ (u \in \mathbb{Z})\ \Rightarrow \ tj_1\equiv -u\ (\mbox{mod }r) \ \Rightarrow \ t \equiv -u \cdot j_1^{-1}\ (\mbox{mod }r)$$

라는 식이 만족하니 우리는 이산 로그값 $$t$$를 구할 수 있게된다.

하지만 중요한 것이 하나 있다. 바로 법 $$r$$에 대해 $$j_1$$의 모듈러 역원이 있어야 한다는 것이다. 모듈러 역원의 존재성과의 필요충분조건은 $$gcd(r, j_1)=1$$인 것인데, 이게 아닐 수 있다는 점을 고려해야한다.

$$j \in {0, ..., r-1}$$이니 $$gcd(r, j_1)=1$$를 만족하는 $$j_1$$의 개수는 아래와 같은 식으로 주어진다.

$$\phi(r)=r\prod_{p|r}\left(1-\frac{1}{p} \right)$$

따라서 이 알고리즘의 성공 확률은 아래와 같이 계산된다.

$$P(gcd(r, j_1)=1)=\frac{\phi(r)}{r-1}\approx \prod_{p|r}\left(1-\frac{1}{p} \right)$$

최악의 경우는 $$r=2^k$$꼴인 경우에 $$P=\frac{1}{2}$$이고, 일반적인 경우에 소수 정리에 따라 $$P\sim \frac{C}{\log r}$$을 따른다.

위 수식으로부터, 이산 로그 문제를 해결하는 알고리즘을 $$O(\log r)$$회 정도 시행하면 거의 확실하게 답을 얻어낼 수 있다는 것을 알 수 있다.

>전체적인 알고리즘의 시간 복잡도는 $$O((\log p)^3)$$정도가 된다. $$p\approx 2^n$$이니, 다항시간 알고리즘이 된다.
{: .prompt-info}

<br>

>여담이지만, $$|\psi\rangle$$과 $$|\Psi\rangle$$의 어떤 관계를 알아낼 수가 있는데 유도과정은 생략하고
><br>
>$$|\psi\rangle$$가 만드는 격자 공간의 쌍대 격자 공간은 $$|\Psi\rangle$$의 격자 공간과 동형이라는 것을 유도할 수 있다.
{: .prompt-tip}

<br>
<br>

후기) 이번 포스트에서는 고전적인 컴퓨터로는 지수적인 시간이 필요해 해결이 어려운 이산 로그 문제를 양자 컴퓨팅 알고리즘으로 해결하는 방법을 알아봤습니다. 수식이 엄청 길고 많아서 어려운 것처럼 보이지만 실제 알고리즘은 아주 간단하게 얻어낼 수 있습니다. 이제까지는 고전적인 컴퓨팅의 어려운 문제를 양자 컴퓨터로 쉽게 해결하는 방법에 대해서 알아봤는데 앞으로는 양자 컴퓨터를 이용한 암호, 그리고 양자 컴퓨팅 이후의 암호화 방법론에 대해서 알아보도록 하겠습니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***