---
title: 양자 컴퓨팅 4 - Reversible Gate
date: 2026-02-09 00:00:00 +0900
categories: [양자컴퓨팅, Reversible Gate]
tags: [quantum computing, reversible gate, cnot gate, toffoli gate, fredkin gate, switch gate]
author: rachihyeon 
description: 양자 게이트를 다루기에 앞서 가역게이트에 대해 다룹니다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-3-NS-Spin-Experiment-exercises/)에서 양자의 관측에 대해서 수식으로 어떻게 해석하는 지에 대해서 다뤘다. 

이번 포스트에서는 고전적인 컴퓨터가 가진 한계인 정보 손실을 극복하는 가역 게이트에 대해 알아본다.

<br>
<br>
<br>

## 1. Reversible gate(가역 게이트)

고전적인 컴퓨터의 게이트(AND, OR, NOT 등)은 2개 이내의 입력을 받아 하나의 출력을 낸다.<br>
이것은 정보의 압축과도 같은 역할을 하기 때문에, 정보량을 정확하게 보존할 수가 없는 것이다.

예를 들어 $$x\vee y=1$$를 만족하는 $$x,\ y$$를 구하라고 하면, 가능한 답은 $$(0,\ 1),\ (1,\ 0),\ (1,\ 1)$$가 있을 것이다. 하나로 결정되지 못하는 것이다. 

이런 방식의 컴퓨터를 Non-reversible computing이라고 한다.

열역학에 따르면 에너지 손실을 피할 길이 없고, 란다우어에 따르면 정보를 지울 때 항상 주변 환경으로 빠져나가는 열이 발생한다.

위 내용들로부터 현존하는 컴퓨터들은 전부 한계가 존재한다는 사실을 알 수 있다.<br>
그렇다면 reversible gate로 컴퓨터를 구성하면 이러한 한계를 돌파할 수 있을 것이다.

왜 가역이니 비가역이니를 이야기 했냐면, 지금 다루고 있는 양자 컴퓨터의 게이트는 모두 가역 게이트이기 때문이다. 따라서 양자 컴퓨터는 이러한 고전적인 컴퓨터의 한계를 뛰어넘을 수 있는 것이다.

<br>

### 1-1. CNOT gate(Controlled NOT)

|$$x$$  |$$y$$  |$$f_1:=x$$ |$$f_2=x \oplus y$$ |
|:-----:|:-----:|:---------:|:-----------------:|
|0      |0      |0          |0                  |
|0      |1      |0          |1                  |
|1      |0      |1          |1                  |
|1      |1      |1          |0                  |

<div style="width: 300px; text-align: center;">
    <img
      src="/assets/img/post_img/quantum_computing/CNOT_gate.png"
      width="400"
      alt="CNOT gate image"
    >
</div>

CNOT게이트는 쉽게 말해 $$x$$가 $$0$$이면 게이트의 결과가 $$y$$와 동일하게 나오고 $$x$$가 $$1$$이면 게이트의 결과가 $$\lnot y$$가 나온다.

<br>

### 1-2. Toffoli gate(토폴리 게이트)

|$$x$$|$$y$$|$$z$$|$$f_1 := x$$|$$f_2 := y$$|$$f_3 := z \oplus (x \land y)$$|
|:---:|:---:|:---:|:----------:|:----------:|:-----------------------------:|
|0|0|0|0|0|0|
|0|0|1|0|0|1|
|0|1|0|0|1|0|
|0|1|1|0|1|1|
|1|0|0|1|0|0|
|1|0|1|1|0|1|
|1|1|0|1|1|1|
|1|1|1|1|1|0|

<div style="width: 300px; text-align: center;">
    <img
      src="/assets/img/post_img/quantum_computing/Toffoli_gate.png"
      width="400"
      alt="Toffoli gate image"
    >
</div>

토폴리 게이트는 $$x$$와 $$y$$가 모두 $$1$$일 때, 즉 $$x \wedge y =1$$일 때만 게이트의 결과가 $$\lnot z$$이고 그 외의 경우에 대해 $$z$$와 같은 결과를 출력하는 게이트이다.

게이트의 동작 방식을 보면 CNOT을 두 개 결합 한 것과 동일해보인다. 그래서 CCNOT(Controlled CNOT)으로도 불린다.

또한 토폴리 게이트는 NAND게이트를 구현할 수 있기 때문에 <span style="color:red">범용 가역 게이트</span>라고 한다.

>$$\mathrm{NAND}(x,\ y)=T(x,\ y,\ 1) := (x,\ y,\ (x\wedge y)\oplus z$$로 NAND를 구현 가능하다.
>$$\mathrm{fan\_ out}(x)=T(x,1,0):=(x,1,x)$$로 1개의 input을 2개로 확장할 수 있다.
{: .prompt-tip}

>범용 게이트(Universal gate)란 NOT, AND, OR, XOR를 구현할 수 있는 게이트를 말한다. NAND는 NOT, AND, OR, XOR모두를 구현할 수 있다.
{: .prompt-info}

<br>

### 1-2. Fredkin gate(프레드킨 게이트)

|$$x$$|$$y$$|$$z$$|$$f_1 := x$$|$$f_2$$|$$f_3$$|
|:---:|:---:|:---:|:---------:|:-----:|:-----:|
|0|0|0|0|0|0|
|0|0|1|0|0|1|
|0|1|0|0|1|0|
|0|1|1|0|1|1|
|1|0|0|1|0|0|
|1|0|1|1|1|0|
|1|1|0|1|0|1|
|1|1|1|1|1|1|

<div style="width: 300px; text-align: center;">
    <img
      src="/assets/img/post_img/quantum_computing/Fredkin_gate.png"
      width="400"
      alt="Fredkin gate image"
    >
</div>

프레드킨 게이트는 $$x$$가 $$1$$일 때는 $$y$$와 $$z$$의 값을 서로 바꿔 출력하고 $$x$$가 $$0$$일 때는 그대로 출력하는 게이트이다. 

따라서 CSWAP(Controlled SWAP)이라고도 불린다.

>프레드킨 게이트 역시 NOT, AND, fan_out을 구현할 수 있기 때문에 범용 게이트이다.
{: .prompt-tip}

>프레드킨 게이트의 특징으로는 input의 1의 개수와 output의 1의 개수가 동일하다는 것이 있다.
{: .prompt-info}

<br>
<br>

## 2. Billiard-ball Computer(당구공 컴퓨터)

우리는 아래의 두 가지 운동법칙을 갖고 당구공을 전기신호에 비유하여 논리 회로를 설명해낼 수 있다.

>법칙 1. 당구공은 **충돌**이 발생하기 전까지 속도가 변하지 않는다.<br>
>법칙 2. 두 당구공이 **충돌**하면 방향이 변한다.(단, 속력은 변하지 않는다.)
{: .prompt-info}

예를 들어, 입력 1의 값에 따라 입력 2의 값이 출력되는지 아닌지를 결정하는 switch gate는 아래 그림과 같이 구현될 수 있다.

<div style="text-align: center;">
    <img
      src="/assets/img/post_img/quantum_computing/Billiard_switch_gate.png"
      alt="Billiard switch gate image"
    >
</div>

<br>

아까 [Fredkin gate](/posts/양자컴퓨팅-4-Reversible-Gate/#1-2-fredkin-gate프레드킨-게이트)는 CSWAP게이트로 불린다고 했었다.

위 이미지의 switch게이트를 적절히 결합하여 프레드킨 게이트를 구현할 수도 있다. 아래 그림이 그 회로도이다.

<div style="width: 400px; text-align: center;">
    <img
      src="/assets/img/post_img/quantum_computing/Billiard_fredkin_gate.png"
      width="400"
      alt="Billiard Fredkin gate image"
    >
</div>

아까 말했다시피 프레드킨 게이트는 범용게이트이다. 따라서 당구공 회로도로 컴퓨터를 구현할 수도 있다는 것을 알 수 있다.

<br>
<br>

후기) 정말 오랜만에 블로그 포스트를 작성하게 되었습니다. 작년에는 좀 바빴지만 이번 년도에는 시간을 좀 더 내어 써보겠습니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***