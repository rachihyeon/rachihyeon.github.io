---
title: 양자 컴퓨팅 13 - Quantum Algorithm(Shor's algorithm)
date: 2026-04-12 00:30:00 +0900
categories: [컴퓨터공학, 양자컴퓨팅]
tags: [quantum computing, quantum algorithm]
author: rachihyeon 
description: 소인수 분해 문제를 양자 컴퓨터를 사용해서 효율적으로 해결하는 알고리즘인 쇼어 알고리즘에 대해서 알아보고 그 내부 알고리즘인 양자 푸리에 변환에 대해서 다룬다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-12-Quantum-Algorithm-Grover/)에서는 여러 데이터 속에서 특정한 값을 찾아내는 탐색 알고리즘인 그로버 알고리즘에 대해서 알아봤다. 이번 포스트에서는 소인수 분해 문제를 양자 컴퓨터로 해결하는 쇼어 알고리즘에 대해서 알아보고자 한다.

주어진 n-bits 정수인 $$N$$이 $$p\cdot q$$꼴로 분해 가능하다면 이 $$p$$와 $$q$$를 어떻게 찾아낼 것인가. 이것이 바로 소인수 분해 문제이다.

가장 효율적이라고 알려진 알고리즘조차 $$\Omega(e^{n^{1/3}(\log n)^{2/3}})$$의 복잡도를 가진다.
<br>
예를 들어, n=829이면 2700년 정도가 걸리고 n=2048이면 $$2700\cdot 2^{20}$$년보다 더 걸린다.

하지만, 쇼어 알고리즘을 사용한다면 $$O(n^2\ln\ln n)$$정도로 문제를 해결할 수 있다. n=2048이더라도 0.02일 정도면 해결 가능하게 된다.

<br>
<br>
<br>

## 1. Shor's algorithm(쇼어 알고리즘)

쇼어 알고리즘의 아이디어는 아래와 같다.

$$N=p\cdot q$$이라고 하자.

$$1.$$ $$gcd(a, N)=1$$를 만족하는 $$a \in (0, N)$$를 임의로 하나 뽑는다.(테스트를 통해 찾을 때까지 반복)

$$2.$$ 법 $$N$$에 대한 $$a$$의 위수 $$r$$를 찾는다. <span style = "color : red">(이 부분이 쇼어 알고리즘의 핵심이 되는 양자 컴퓨팅으로 해결됨.)</span>

$$3.$$ $$2$$번 에서 찾은 $$r$$이 짝수가 될 때까지 $$1$$번과 $$2$$번을 반복한다.

$$4.$$ $$r$$이 짝수라면, $$a^r-1 \equiv (a^{r/2} - 1)(a^{r/2} + 1) \equiv 0 (mod\ N)$$로 표현 가능하다.

$$5.$$ $$a^{r/2} - 1\not\equiv 0(mod\ N)$$이기 때문에, $$gcd(a^{r/2}-1, N)=1\ \mathrm{or}\ p\ \mathrm{or}\ q$$이다.

$$6.$$ $$gcd(a^{r/2}-1, N)\neq 1$$이면, $$N$$의 인수인 $$p$$ 또는 $$q$$를 찾은 것이니 알고리즘 종료. 하지만, $$gcd(a^{r/2}-1, N)=1$$이면, $$1$$번으로 돌아가 다시 알고리즘 시행.

>$$5$$번에서 $$gcd(a^{r/2}-1, N)=N=pq$$인 가능성은 제외했는데,<br>
>이 이유는 $$gcd(a^{r/2}-1, N)=N=pq\equiv 0(mod\ N)$$이기 때문에, $$a^{r/2} \equiv 1(mod\ N)$$이 성립한다. <br>
>이는 $$r$$이 $$mod\ N$$에 대한 $$a$$의 위수라는 사실에 모순이기 때문에 제외가능하다.
{: .prompt-info}

>쇼어 알고리즘을 보면 알겠지만 $$a$$를 선택하는 것과 위수 $$r$$이 짝수가 되어야 한다는 무작위성 요소가 존재한다. <br>
>그렇다보니 알고리즘의 비효율성에 대한 이야기를 안할 수가 없는데, <br>
>사실 랜덤하게 고른 $$a$$가 $$r$$은 홀수, $$a^{r/2}\equiv -1(mod\ N)$$을 만족할 확률은 $$1/2$$이하이기 때문에 몇 번만 해보더라도 충분히 이 조건을 만족하는 $$a$$를 찾을 수 있게 된다.<br>
>**이 확률에 대한 이야기는 이번 포스트에서 다루는 것이 아닌 *<u>쇼어 알고리즘의 부록 포스팅</u>*에서 다룰 예정이다.**
{: .prompt-tip}

<br>
<br>

## 2. Quantum Fourier Transform(양자 푸리에 변환)

푸리에 변환이라는 것이 있다. 간단하게 말하자면 임의의 곡선(1차원을 말할 때)을 삼각함수 혹은 지수함수의 일차 결합으로 변환하는 것을 말한다.

자연계에서는 어떤 곡선들이 전부 매끄럽고 연속적이니 푸리에 변환을 사용해서 해석하지만, 컴퓨터 내의 신호들은 전부 이산적인 값을 갖기 때문에 푸리에 변환을 바로 적용할 수는 없다.

그래서 약간 변형한 것이 이산 푸리에 변환이다. 적분식을 부분합으로 바꾸어 표현되는 방식을 사용한다.

보통 여기서 사용되는(고전적인 방식의) 푸리에 변환의 복잡도를 보면 보통 $$\Theta(N^2)$$, 개선된 고속 변환 알고리즘에서는 $$\Theta(N\log N)$$정도가 된다.

이번 섹션에서 언급하는 양자 푸리에 변환은 $$\Theta((\log N)^2)$$정도로 매우 효율적인 방법이다.

우리는 [지난 사이먼 알고리즘](/posts/양자컴퓨팅-11-Quantum-Algorithm-Simon/#1-n-qubits-hadamard-transform)에서 n-quvits 아다마르 변환에 대해서 알아봤는데 양자 푸리에 변환은 이 변환의 일반형이라고 볼 수 있다.

$$H^{\otimes n}|x>=\frac{1}{\sqrt{2^n}}\sum_{z\in\{ 0,\ 1 \}^n}(-1)^{x\cdot z}|z>$$

$$\mathrm{QFT}_{2^n}(|x>)=\frac{1}{\sqrt{2^n}}\sum_{z\in\{ 0,\ 1 \}^n}e^{2\pi i \cdot \frac{x}{2^n}\cdot z}|z>$$

변환 회로도는 아래와 같이 그려볼 수 있다.

![QFT citcuit](/assets/img/post_img/quantum_computing/QFT_circuit.png)

위 회로에서 보다시피, 

$$\mathrm{QFT}_{2^n}(|x>) = \left( \frac{|0>+e^{2\pi i (2^{n-1}\omega)}|1>}{\sqrt{2}}  \right)\otimes \left(\frac{|0>+e^{2\pi i (2^{n-2}\omega)}|1>}{\sqrt{2}} \right)\otimes ... \otimes \left( \frac{|0>+e^{2\pi i (\omega)}|1>}{\sqrt{2}}  \right)$$

로 표현된다.

이때 $$\omega = 0.x_1x_2...x_n = \frac{x_1}{2}+\frac{x_2}{2^2}+...+\frac{x_n}{2^n}$$이고, $$R_k=\left[ \begin{array}{cc} 1 & 0 \\ 0 & e^{\frac{2\pi i}{2^k}}\end{array} \right]$$이다.

>푸리에 역변환도 있다시피 양자 푸리에 역변환도 있다. $$R_k^{-1}$$을 사용하여 게이트를 만들면 된다.
{: .prompt-info}

자 이번에는 이 양자 푸리에 변환을 주기성을 갖는 상태에 적용을 해보자. 
<br>
우선 이 주기성을 갖는 큐비트를 다음과 같이 정의한다.

$$|\phi_{r,b}> := \frac{1}{\sqrt{m}}\sum_{z=0}^{m-1}|zr+b>, \quad b \in {0,1,...,r-1}$$

>$$rm=2^n$$이고, 주기가 $$r$$이라는 뜻이다.
{: .prompt-info}

그리고 이 큐비트를 양자 푸리에 변환하면,

$$
\begin{align}
\mathrm{QFT}&_{rm}|\phi_{r,b}> \notag \\
&= \mathrm{QFT}_{rm}\frac{1}{\sqrt{m}}\sum_{z=0}^{m-1}|zr+b> \notag \\
&= \frac{1}{\sqrt{mr}}\frac{1}{\sqrt{m}}\sum_{y=0}^{mr-1}\sum_{z=0}^{m-1} e^{2\pi i \cdot \frac{(zr+b)}{mr}\cdot y} |y> \notag \\
&= \frac{1}{\sqrt{mr}}\frac{1}{\sqrt{m}}\sum_{y=0}^{mr-1} e^{\frac{2\pi}{mr}by} \sum_{z=0}^{m-1} e^{2\pi i \cdot \frac{z}{m}\cdot y} |y> \notag \\
\end{align}
$$

인데, 

$$\sum_{z=0}^{m-1} e^{\frac{2\pi \theta }{m}zi}=\left\{ \begin{array}{rcl} \frac{1-e^{\frac{2\pi \theta i}{m}m}}{1-e^{\frac{2\pi \theta i}{m}}} = 0 & \mbox{if} & 1\ne e^{\frac{2\pi \theta i}{m}} \mbox{ i.e. } \theta \ne mk \mbox{ for any }k \in \mathbb{Z} \\ m & \mbox{if} & 1= e^{\frac{2\pi \theta i}{m}} \mbox{ i.e. } \theta = mk \mbox{ for any }k \in \mathbb{Z} \end{array} \right.$$

로부터 

$$\sum_{z=0}^{m-1} e^{2\pi i \cdot \frac{z}{m}\cdot y} |y> = \left\{ \begin{array}{rcl} m|y> & \mbox{if} & y=mk \\ 0|y> & \mbox{if} & y\ne mk \end{array} \right.$$

이기 때문에, 최종적으로

$$
\begin{align}
\mathrm{QFT}&_{rm}|\phi_{r,b}> \notag \\
&= \frac{1}{\sqrt{mr}}\frac{1}{\sqrt{m}}\sum_{y=0,\ y=mk}^{mr-1} e^{\frac{2\pi}{mr}by} m|y> \notag \\
&= \frac{1}{\sqrt{r}}\sum_{k=0}^{r-1} e^{\frac{2\pi ib}{r}k}|mk> \notag \\
\end{align}
$$

를 얻게된다.

<br>
따라서 변환된 큐비트를 측정하면 $$|mk>$$가 측정될 것이고 $$mk/mr=k/r$$이기 때문에, $$r$$을 얻어낼 수 있게 된다.

<br>
하지만, 실제 자연계에서는 어떤 큐비트가 주기성을 갖는다는 사실을 알기 어렵기 때문에 일반적인 큐비트 $$|x>$$를 갖고 변환을 시도한다. 

<br>
그 결과로 변환된 큐비트는 $$\mathrm{QFT}_{2^n}|\phi_{r,b}> = \sum_i b_i|y_i> + \sum_i c_i|y'_i>$$의 형태로 얻어지고 앞의 항이 **주 신호**이고, 뒤의 항이 **노이즈**로 해석된다.

<br>
주 신호로부터 측정된 큐비트인 $$|y_i>$$는 $$y_i/2^n\approx k/r$$이 가능하기 때문에, $$r$$을 찾아낼 수 있다.

>이 $$r$$을 찾아낸다는 게 또 쉽지 않은 일인데, **이 내용에 대해서는 *<u>쇼어 알고리즘의 부록 포스팅</u>*에서 다루도록 하겠다.**
{: .prompt-tip}

<br>
<br>

## 3. Shor's algorithm with QFT

다시 쇼어 알고리즘으로 돌아와서 쇼어 알고리즘에서 양자 푸리에 변환을 어떻게 적용하는지에 대해서 알아보도록 하자.

<br>
$$1.$$ 우선 $$|\psi_0>=\sum_{x=0}^{2^n-1}\frac{1}{\sqrt{2^n}}|x>|1>$$를 준비한다.

<br>
$$2. $$ $$gcd(a,N)=1$$를 만족하는 $$a$$에 대해서 $$cU_x^a:|x>|y>\rightarrow |x>|ya^x\ mod\ N>$$게이트를 이용하여 $$|\psi_1>=\sum_{x=0}^{2^n-1}\frac{1}{\sqrt{2^n}}|x>|a^x\ mod\ N>$$를 만든다.
<br>

$$a^{zr+b}\equiv a^b\ (mod\ N)$$로 부터($$r$$은 법 $$N$$에서 $$a$$의 위수), 
<br>
$$|\psi_1>=\frac{1}{\sqrt{r}}\sum_{b=0}^{r-1} (\frac{1}{\sqrt{m}}\sum_{z=0}^{m-1}|zr+b>)|a^b\ mod\ N> \mbox{ where } (m-1)r+b\leq 2^n-1 < mr+b$$

<br>
$$3.$$ 이 상태에서 후자의 큐비트를 측정하면 $$|a^b\ mod\ N>$$를 얻게 되고, 전자의 큐비트는 $$|\phi_{r,b}>:=\frac{1}{\sqrt{m}}\sum_{z=0}^{m-1}|zr+b>$$

<span style="color : orange; font-size : 30px;">여기서부터 핵심</span>
<br>
$$4.$$ 이 큐비트에 $$\mathrm{QFT}$$를 취해주면 $$\mathrm{QFT}_{2^n}|\phi_{r,b}> = \sum_i b_i|y_i> + \sum_i c_i|y'_i>$$를 얻게되고, 
<br>
측정을 통해 $$\frac{y_i}{2^n}\approx \frac{k}{r} \mbox{ for some }k \in \mathbb{Z}$$를 만족하는 $$y_i$$를 얻는다.

<br>
$$5.$$ 최종적으로 $$a$$의 위수인 $$r$$를 얻어낸다.

$$N=pq$$를 소인수분해 하는 쇼어 알고리즘의 회로도는 아래 그림과 같다.

![Shor's algorithm circuit](/assets/img/post_img/quantum_computing/Shor_circuit.png)

회로도를 보면 알겠지만 필요한 큐비트는 $$2^n\geq N$$를 만족하는 수준의 $$2n$$개고

계산 복잡도는 $$O((\log N)^2 \log( \log N) \log( \log( \log N)))$$이다.


>추가적으로, 본 포스트에서는 $$N=pq$$인 상황만을 이야기 했지만 굳이 두 소수만의 곱으로 이루어져 있을 필요는 없다. 어차피 쇼어 알고리즘은 합성수에서 두 인수를 분리해내는 도구이기 때문에, 재귀적으로 시도한다면 거듭제곱만 잘판단해낸다면 문제없이 사용 가능하다.
{: .pronpt-info}

<br>
<br>

후기)이번 포스트에서는 쇼어 알고리즘에 대해서 알아봤습니다. 푸리에 변환을 양자에서 적용하는 부분부터 다뤘기 때문에 내용이 갑자기 붕 뜬 느낌이 있을 수 있지만 최대한 자세히 기술하려고 노력했습니다. 그리고, 이 알고리즘은 이산 로그 문제를 해결하는데도 크게 효율적인데 이에 대해서는 다음번에 다루도록 하겠습니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***