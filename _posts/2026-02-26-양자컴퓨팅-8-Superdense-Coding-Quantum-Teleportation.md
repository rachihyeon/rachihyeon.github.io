---
title: 양자 컴퓨팅 8 - Superdense Coding and Quantum Teleportation 
date: 2026-02-26 00:00:00 +0900
categories: [양자컴퓨팅, Applications of Entanglement]
tags: [quantum computing, superdense coding, quantum teleportation, ]
author: rachihyeon 
description: 양자 얽힘을 이용한 초고밀도 코딩과 양자 순간이동에 대해서 다룹니다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-7-Quantum-Key-Distribution/)에서는 양자의 성질을 이용한 키 분배 알고리즘을 알아보았다. 이번엔 이 양자 성질 중 얽힘을 이용하여 1큐비트로 2비트의 정보를 보내는 초고밀도 코딩과 발신자로부터 수신자의 위치가 멀리 떨어져 있는 경우에도 순식간에 양자 정보를 전달하는 양자 순간이동에 대해서 알아보겠다.

<br>
<br>
<br>

## 1. Superdense coding(초고밀도 코딩)

초고밀도 코딩이란 얽혀있는 2큐비트 중 1개를 보냄으로서 2비트의 정보를 보내는 것을 말한다.
<br>
그 방식은 아래 네 단계로 진행된다.

$$1$$. 엘리스와 밥은 얽힌 두 큐비트를 하나씩 나눠 갖는다.

>여기선 편하게 설명하기 위해 $$\frac{1}{\sqrt{2}}(|00>+|11>)$$큐비트를 사용하지만, 사실 임의의 얽힌 두 큐비트를 사용하든 상관없다. 
>하지만, 다른 상태의 큐비트를 사용하게 되면 그에 맞게 회로를 재구성해야한다.(아래의 양자 순간이동에서도 동일하다.)
{: .prompt-warning}

<br>

$$2$$. 엘리스는 보내고 싶은 2비트의 정보에 맞게, 갖고 있는 큐비트를 적절한 게이트에 통과시킨다.

>$$00$$을 보내고 싶으면, $$I := \begin{pmatrix}1&0 \\ 0&1 \end{pmatrix}$$를 사용하여 얽힌 큐비트의 상태를 
>$$\frac{1}{\sqrt{2}}(|00> + |11>)$$로 바꾼다.<br>
>$$01$$을 보내고 싶으면, $$X := \begin{pmatrix}0&1 \\ 1&0 \end{pmatrix}$$를 사용하여 얽힌 큐비트의 상태를 
>$$\frac{1}{\sqrt{2}}(|10> + |10>)$$로 바꾼다.<br>
>$$10$$을 보내고 싶으면, $$Z := \begin{pmatrix}1&0 \\ 0&-1 \end{pmatrix}$$를 사용하여 얽힌 큐비트의 상태를 
>$$\frac{1}{\sqrt{2}}(|00> - |11>)$$로 바꾼다.<br>
>$$11$$을 보내고 싶으면, $$Y' := \begin{pmatrix}0&1 \\ -1&0 \end{pmatrix}$$를 사용하여 얽힌 큐비트의 상태를 
>$$-\frac{1}{\sqrt{2}}(|10> + |10>)$$로 바꾼다.
{: .prompt-info}

>11을 보낼 때 사용하는 게이트는 $$Y$$가 아니고 복소수를 실수화한 뒤 전치한 $$Y'$$게이트임을 유의하라.
{: .prompt-warning}

<br>

$$3$$. 엘리스는 본인의 큐비트를 밥에게 보낸다.

<br>

$$4$$. 밥은 앨리스와 본인의 큐비트를 역 벨의 회로(reverse bell's circuit)에 통과시켜 엘리스가 전달하고자 하는 2비트 정보를 확인한다.

>$$\frac{1}{\sqrt{2}}(|00> + |11>)$$를 역 벨의 회로에 통과시키면 $$|00>$$를 얻는다.
><br>
>$$\frac{1}{\sqrt{2}}(|10> + |10>)$$를 역 벨의 회로에 통과시키면 $$|01>$$를 얻는다.
><br>
>$$\frac{1}{\sqrt{2}}(|00> - |11>)$$를 역 벨의 회로에 통과시키면 $$|10>$$를 얻는다.
><br>
>$$-\frac{1}{\sqrt{2}}(|10> + |10>)$$를 역 벨의 회로에 통과시키면 $$|11>$$를 얻는다.
{: .prompt-info}

초고밀도 코딩의 과정을 간단하게 아래 그림처럼 표현할 수 있다.

![Superdense coding](/assets/img/post_img/quantum_computing/Superdense_coding.png)

그림을 보면 엘리스의 큐비트 부분에 X게이트와 Z게이트의 사용여부를 결정하는 $$b_1b_2$$비트가 보이는데 이게 엘리스가 보내고자 하는 비트이다.
<br>
>추가로 $$Y' = ZX$$, $$Z = Y'X$$, $$X = ZY'$$인 사실을 알고 있으면 이해가 쉽다.
{: .prompt-tip}

결과적으로 미리 얽힌 큐비트를 공유한 상태에서 1큐비트를 보내면 2비트 만큼의 정보를 보낼 수 있게 된다.

이것에는 하나의 큰 가정이 필요한데, 바로 1큐비트를 보내는 것이 1비트를 보내는 것 만큼 쉬워야 한다는 것이다.

그렇게 된다면 큐비트 채널의 대역폭이 기존 비트의 대역폭보다 두 배 정도 크게 된다.

<br>
<br>

## 2. Quantum Teleportation(양자 순간이동)

양자 순간이동은 초고밀도 코딩과 반대되는 기술이다. 즉, 2비트를 보내는 것으로 1큐비트 정보를 보내는 것이다.
<br>
그 방식은 아래의 다섯 단계로 진행된다.
<br>
<br>
$$1$$. 엘리스와 밥은 얽힌 두 큐비트를 하나씩 나눠 갖는다. (초고밀도 코딩에서와 동일하게 $$\frac{1}{\sqrt{2}}(|00>+|11>)$$사용)

<br>
$$2$$. $$a|0>+b|1>$$라는 상태의 큐비트를 전송하기 위해 엘리스는 이 큐비트와 밥과 나눠 가진 얽힌 큐비트를 역 벨의 회로에 통과시킨다. 

그림으로 보면 아래와 같다.

![Quantum teleportation alice](/assets/img/post_img/quantum_computing/Quantum_teleportation_alice.png)

수식으로 계산해보면 아래와 같다.

우선 두 큐비트를 한 번에 계산하기 위해 텐서곱한다.
<br>
$$
(a|0>+b|1>)\otimes (\frac{1}{\sqrt{2}}|00>+\frac{1}{\sqrt{2}}|11>) = \frac{a}{\sqrt{2}}|000> + \frac{a}{\sqrt{2}}|011> + \frac{b}{\sqrt{2}}|100> + \frac{b}{\sqrt{2}}|111>
$$

<br>
앞의 두 큐비트에 대해서 CNOT게이트 계산.
<br>
$$
CNOT_{1,2}(\frac{a}{\sqrt{2}}|000> + \frac{a}{\sqrt{2}}|011> + \frac{b}{\sqrt{2}}|\textcolor{red}{10} 0> + \frac{b}{\sqrt{2}}|\textcolor{red}{11} 1>) = \frac{a}{\sqrt{2}}|000> + \frac{a}{\sqrt{2}}|011> + \frac{b}{\sqrt{2}}|\textcolor{red}{11} 0> + \frac{b}{\sqrt{2}}|\textcolor{red}{10} 1>
$$
<br>
$$
=|0>\otimes (\frac{a}{\sqrt{2}}|00> + \frac{a}{\sqrt{2}}|11>) + |1>\otimes (\frac{b}{\sqrt{2}}|10> + \frac{b}{\sqrt{2}}|01>)
$$

<br>
첫 번째 큐비트에 대해 Hadamard게이트 계산.
<br>
$$
\begin{align}
&H_{1}(|\textcolor{red}{0} >\otimes (\frac{a}{\sqrt{2}}|00> + \frac{a}{\sqrt{2}}|11>) + |\textcolor{red}{1} >\otimes (\frac{b}{\sqrt{2}}|10> + \frac{b}{\sqrt{2}}|01>)) \\
&= (\frac{1}{\sqrt{2}}|0> + \frac{1}{\sqrt{2}}|1>)\otimes ((\frac{a}{\sqrt{2}}|00> + \frac{a}{\sqrt{2}}|11>)) + (\frac{1}{\sqrt{2}}|0> - \frac{1}{\sqrt{2}}|1>)\otimes (\frac{b}{\sqrt{2}}|10> + \frac{b}{\sqrt{2}}|01>)) \\
\end{align}
$$

<br>
정리하면, 
<br>
$$
\frac{1}{2}|00>\otimes (a|0>+b|1>) + \frac{1}{2}|01>\otimes (a|1>+b|0>) + \frac{1}{2}|10>\otimes (a|0>-b|1>) + \frac{1}{2}|11>\otimes (a|1>-b|0>)
$$

<br>
$$3$$. 엘리스는 이 큐비트를 측정하여 밥의 큐비트 상태를 선택한다.

<br>
$$4$$. 엘리스는 이 측정 결과를 밥에게 전송한다. ($$00$$ or $$01$$ or $$10$$ or $$11$$)

<br>
$$5$$. 밥은 자신의 큐비트를 엘리스의 비트 정보에 맞게 특정 게이트에 통과시킨다. 

>$$00$$이면 $$I$$게이트<br>
>$$01$$이면 $$X$$게이트<br>
>$$10$$이면 $$Z$$게이트<br>
>$$11$$이면 $$Y'$$게이트
{: .prompt-info}

<br>
예를 들어, 엘리스가 $$10$$을 보내면 밥은 $$Z$$게이트를 사용할 것이다. $$Z(a|0>-b|1>) = a|0>+b|1>$$이니 성공적으로 엘리스의 큐비트 정보를 전달받는다.

양자 순간이동의 과정을 간단하게 아래 그림처럼 표현할 수 있다.

![Quantum teleportation](/assets/img/post_img/quantum_computing/Quantum_teleportation_circuit.png)

이 양자 순간이동의 방법을 보면 알겠지만 실제로 엘리스가 밥에게 보내는 정보는 2비트의 정보이다. 즉, 고전적인 채널을 통해 큐비트 정보를 보낼 수 있는 것이다.(물론 얽힌 큐비트가 사전에 나눠져 있어야 한다.)

<br>
<br>

정리하자면, 초고밀도 코딩은 (얽힌 큐비트) + 1큐비트 -> 2비트 정보 전달이고, <br>
양자 순간이동은 (얽힌 큐비트) + 2비트 -> 1큐비트 정보 전달이다.

<br>
<br>

후기) 요즘 하루에 한 포스트씩 하고 있는데, 올 해 안에 다섯 가지의 주제에 대해서 마무리하는 걸 목표로 하고 있어서 열씸히 달리는 중입니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***