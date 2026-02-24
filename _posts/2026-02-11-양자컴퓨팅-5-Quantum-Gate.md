---
title: 양자 컴퓨팅 5 - Qubit, Quantum Gate
date: 2026-02-11 12:00:00 +0900
categories: [양자컴퓨팅, Quantum Gate]
tags: [quantum computing, quantum gate, qubit, superposition]
author: rachihyeon 
description: 양자 컴퓨터를 구성하는 정보 단위인 큐비트와 양자 게이트에 대해 다룹니다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-4-Reversible-Gate/)에서는 고전적인 컴퓨터의 한계를 극복할 수 있는 가역게이트에 대해 다뤘다. 

이번 포스트에서는 양자 컴퓨터의 정보 단위인 큐비트에 대해서 알아보고 그 큐비트를 표현하는 방법, 그리고 이 큐비트의 상태를 변환해주는 양자 게이트에 대해 다룰 예정이다.

<br>
<br>
<br>

## 1. Qubits(큐비트)

하나의 양자에는 두 가지 관찰가능한 상태가 있다. 하나는 바닥 상태(Ground state)이고 다른 하나는 들뜬 상태(Excited state)이다.<br>
이 둘을 각각 $$|0>,\ \ |1>$$로 두면, 큐비트 상태는 이 둘이 중첩된 상태인 
$$
\begin{pmatrix} 
\alpha  \\
\beta   \\
\end{pmatrix}
$$
로 표현 가능하다.

양자 컴퓨팅이란 이 큐비트를 사용해 계산하는 것을 말한다.

<br>
<br>

## 2. Bloch sphere(블로흐 구면)

위에서 큐비트의 상태가 
$$
\begin{pmatrix} 
\alpha  \\
\beta   \\
\end{pmatrix}
\in
\mathbb{C}
,\ |\alpha |^2+|\beta |^2=1 \\
$$
라고 하였다.

이는 2차원 상의 원소이기 때문에, 우선 1차원의 예시부터 생각해보는 것이 도움이 될 것이다.

만약 큐비트 상태가 1차원 상의 원소라면, 큐비트는 
$$
z
\in
\mathbb{C}
,\ |z|^2=1 \\
$$
라고 표현될 것이고 간단하게 복소평면 상에서 아래의 그림처럼 표현 가능하다.<br>

![1D Bloch](/assets/img/post_img/quantum_computing/1D_bloch_graph.png)

이미 z의 크기가 1로 정해져 있으니 z는 $$\theta$$로 매개변수화 할 수 있다. ($$z=\cos \theta + i\sin \theta = e^{i\theta}$$)

추가로 하나의 정리를 소개한다.

>크기가 1인 복소수 $$c$$에 대해서 두 상태 $$\begin{pmatrix} \alpha _1  \\\beta _1   \\\end{pmatrix}, \\ \begin{pmatrix} \alpha _2  \\\beta _2   \\\end{pmatrix}$$가 $$\begin{pmatrix} \alpha _2  \\\beta _2   \\\end{pmatrix}=c\begin{pmatrix} \alpha _1  \\\beta _1   \\\end{pmatrix}$$를 만족하면 두 상태 각각의 관측 확률 분포는 같다.
{: .prompt-tip}

>증명. <br>
>양자 상태를 측정하는 임의의 기저 $$\overrightarrow{b}$$에 대해 $$|<\begin{pmatrix} \alpha _2  \\\beta _2   \\\end{pmatrix},\overrightarrow{b}>|^2 = |<c \begin{pmatrix} \alpha _1  \\\beta _1   \\\end{pmatrix},\overrightarrow{b}>|^2 = |c|^2 \cdot |<\begin{pmatrix} \alpha _1  \\\beta _1   \\\end{pmatrix},\overrightarrow{b}>|^2$$ 이므로 임의의 기저에대해서 두 상태의 관측 확률 분포는 같다.
{: .prompt-info}

<br>
위 정리로부터 $$|0> := \begin{pmatrix} 1 \\ 0 \\ \end{pmatrix}$$는 $$\begin{pmatrix} i \\ 0 \\ \end{pmatrix}$$와 동일하고 $$\begin{pmatrix} -i \\ 0 \\ \end{pmatrix}$$와도 동일하다는 사실을 알 수 있다.

<br>
자 이제는 2차원으로 확장해보자. 

<br>
큐비트는 $$\begin{pmatrix} \alpha  \\\beta   \\\end{pmatrix} = \alpha |0> + \beta |1> \in \mathbb{C}^2,\ |\alpha |^2+|\beta |^2=1 \\$$이다.
<br>
즉, $$\alpha$$와 $$\beta$$는 $$|0>$$과 $$|1>$$의 중첩정도를 말한다. 
<br>
크기가 1이 되도록 만들어 질 테니 적당한 각도변수 $$\theta$$에 대해서 표현 가능할 것이다. 
<br>
하지만, 양자는 파동의 성질도 갖고 있기 때문에 큐비트들도 서로간에 간섭을 받을 수 있다. 이 영향이 위상 차이로부터 발생하니 이를 고려해야 한다. 
<br>
그래서 $$|1>$$부분에 $$e^{i\varphi} := \cos{\varphi} + i\sin{\varphi}$$를 곱하여,
<br>
임의의 큐비트 상태를 $$|\Psi > = \cos{\frac{\theta}{2}}|0> + e^{i\varphi}\sin{\frac{\theta}{2}}|1>$$와 같이 표현할 수 있다.

이때, $$0\leq \theta \leq \pi$$, $$0\leq \varphi \leq 2\pi$$이다.

이를 구면좌표계에 표현하는 것이 블로흐 구면이 된다.

특수각 상황에 대해서 좌표축을 설정해주면 아래의 그림과 같이 구면을 얻을 수 있다.

<div style="width: 500px; text-align: center;">
    <img
      src="/assets/img/post_img/quantum_computing/2D_bloch_graph.png"
      width="400"
      alt="Toffoli gate image"
    >
</div>

><br>
>+X축은 $$|+> = \frac{|0> + |1>}{\sqrt{2}}$$, -X축은 $$|-> = \frac{|0> - |1>}{\sqrt{2}}$$, +Y축은 $$|+i> = \frac{|0> + i|1>}{\sqrt{2}}$$, -Y축은 $$|-i> = \frac{|0> - i|1>}{\sqrt{2}}$$, +Z축은 $$|0>$$, -Z축은 $$|1>$$이다.
{: .prompt-info}

<br>

## 2-1. Bits VS Qubits

고전적인 컴퓨터의 비트(Bits)는 0 또는 1의 상태를 갖기 때문에 N비트는 $$2^N$$만큼의 상태만 나타낼 수 있고 연산은 한 번에 한 번만 가능하다.
<br>
하지만 양자 컴퓨터의 큐비트(Qubits)는 관측 후에 0 또는 1의 상태로 붕괴하고 그 전까지는 중첩된 상태를 갖는다. 따라서 N큐비트는 $$2^N$$개의 중첩된 상태를 갖기 때문에 한 번에 $$2^N$$번의 연산을 하는 것과 동일한 연산을 진행할 수 있다.

<br>
<br>

## 3. Quantum Gate(양자 게이트)

닫힌계에서의 양자 상태의 모든 변화는 확률이 보존되는 선형변환이기 때문에 유니터리 연산으로 표현된다.

유니터리 행렬의 정의($$A^{\dagger}A=I$$)로부터 유니터리 연산자는 정칙이기 때문에 **모든 양자 게이트는 가역 게이트**임을 알 수 있다.

<br>

### 3-1. X gate

X게이트는 $$X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \\ \end{pmatrix}$$로 정의된다. 

$$\begin{pmatrix} 0 & 1 \\ 1 & 0 \\ \end{pmatrix} \begin{pmatrix} \alpha \\ \beta \\ \end{pmatrix} = \begin{pmatrix} \beta \\ \alpha \\ \end{pmatrix}$$이므로 두 번 X게이트를 통과시키면 원상태로 돌아온다.
<br>
$$ |0>$$이나 $$ |1>$$을 X게이트의 입력으로 쓰면 서로 뒤바뀌기에 고전적인 컴퓨터의 NOT게이트와 동일한 결과를 얻을 수 있다.

이 게이트는 X축으로 180도 만큼 회전한 것과 동일한 결과를 나타내기 때문에 X게이트이다.

<br>

### 3-2. Y gate

Y게이트는 $$Y = \begin{pmatrix} 0 & -i \\ i & 0 \\ \end{pmatrix}$$로 정의된다. 

$$
\begin{align}
&Y|0> = \begin{pmatrix} 0 & -i \\ i & 0 \\ \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ \end{pmatrix} = \begin{pmatrix} 0 \\ i \\ \end{pmatrix} = i|1> \notag \\

&Y|1> = \begin{pmatrix} 0 & -i \\ i & 0 \\ \end{pmatrix} \begin{pmatrix} 0 \\ 1 \\ \end{pmatrix} = \begin{pmatrix} -i \\ 0 \\ \end{pmatrix} = -i|0> \notag \\

&Y(\alpha |0> + \beta |1>) = \alpha Y|0> + \beta Y|1> = i\alpha |1> -i\beta |0> \notag \\
\end{align}
$$

이 게이트는 Y축으로 180도 만큼 회전한 것과 동일한 결과를 나타내기 때문에 Y게이트이다.

<br>

### 3-3. Z gate

Z게이트는 $$Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \\ \end{pmatrix}$$로 정의된다. 

$$
\begin{align}
&Z|0> = \begin{pmatrix} 1 & 0 \\ 0 & -1 \\ \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ \end{pmatrix} = |0> \notag \\

&Z|1> = \begin{pmatrix} 1 & 0 \\ 0 & -1 \\ \end{pmatrix} \begin{pmatrix} 0 \\ 1 \\ \end{pmatrix} = \begin{pmatrix} 0 \\ -1 \\ \end{pmatrix} = -|1> \notag \\

&Z(\alpha |0> + \beta |1>) = \alpha Z|0> + \beta Z|1> = \alpha |0> - \beta |1> \notag \\
\end{align}
$$

이 게이트는 Z축으로 180도 만큼 회전한 것과 동일한 결과를 나타내기 때문에 Z게이트이다.

<br>

### 3-4. $$\sqrt{\mathrm{NOT}}$$ gate

$$\sqrt{\mathrm{NOT}}$$게이트는 $$\sqrt{\mathrm{NOT}} = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & -1 \\ 1 & 1 \\ \end{pmatrix}$$로 정의된다. 

이 게이트를 두 번 통과하면 NOT게이트인 X게이트와 동일한 결과를 얻기 때문에 root를 사용하여 $$\sqrt{\mathrm{NOT}}$$게이트라고 부른다.

$$
\begin{align}

&\sqrt{\mathrm{NOT}}|0> = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & -1 \\ 1 & 1 \\ \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ \end{pmatrix} = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ 1 \\ \end{pmatrix} = \frac{1}{\sqrt{2}}(\begin{pmatrix} 1 \\ 0 \\ \end{pmatrix} + \begin{pmatrix} 0 \\ 1 \\ \end{pmatrix}) = \frac{1}{\sqrt{2}}(|0> + |1>)  \notag \\

&\sqrt{\mathrm{NOT}}|1> = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & -1 \\ 1 & 1 \\ \end{pmatrix} \begin{pmatrix} 0 \\ 1 \\ \end{pmatrix} = \frac{1}{\sqrt{2}} \begin{pmatrix} -1 \\ 1 \\ \end{pmatrix} = \frac{1}{\sqrt{2}}(\begin{pmatrix} 0 \\ 1 \\ \end{pmatrix} - \begin{pmatrix} 1 \\ 0 \\ \end{pmatrix}) = \frac{1}{\sqrt{2}}(|1> - |0>)  \notag \\

\end{align}
$$

<br>

### 3-5. S gate, T gate

S게이트는 $$S = \begin{pmatrix} 1 & 0 \\ 0 & i \\ \end{pmatrix}$$로 정의되고, 
<br>
T게이트는 $$T = \begin{pmatrix} 1 & 0 \\ 0 & \mathrm{exp}(\frac{i\pi}{4}) \\ \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & \frac{1 + i}{\sqrt{2}} \\ \end{pmatrix}$$로 정의된다.

이 게이트들은 아래의 관계를 갖는다.

>$$S^2 = Z$$를 만족하고 $$T^2 = S$$를 만족한다.
{: .prompt-info}

<br>

### 3-6. Hadamard gate

H게이트는 $$H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \\ \end{pmatrix}$$로 정의된다.
<br>
H게이트는 기저상태인 $$|0>$$, $$|1>$$를 중첩상태로 변환한다.

$$
\begin{align}

&H|0> = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \\ \end{pmatrix} \begin{pmatrix} 1 \\ 0 \\ \end{pmatrix} = \frac{|0> + (-1)^0 |1>}{\sqrt{2}} = \frac{|0> + |1>}{2} = |+> \notag \\

&H|1> = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \\ \end{pmatrix} \begin{pmatrix} 0 \\ 1 \\ \end{pmatrix} = \frac{|0> + (-1)^1 |1>}{\sqrt{2}} = \frac{|0> - |1>}{2} = |-> \notag \\

\end{align}
$$

N개의 큐비트의 상태를 중첩시키려면 N개의 H게이트에 통과시키면 된다.

<br>

### 3-7. CNOT gate

우리는 [이전 포스트](/posts/양자컴퓨팅-4-Reversible-Gate/#1-1-cnot-gatecontrolled-not)에서 CNOT게이트에 대해 알아봤었다. 양자컴퓨터에서도 CNOT게이트가 있다.

다음 포스트에서 다룰 내용이지만 미리 소개하자면 양자역학에는 **얽힘(Entanglement)**라는 것이 있다. 두 개 이상의 양자가 서로 얽혀 있어 각각의 관척에 따라 다른쪽의 상태가 동시에 결정되는 것이다.

CNOT게이트를 사용하면 이 얽힌 상태의 큐비트를 만들 수 있다.
<br>
Control큐비트가 $$\alpha |0> + \beta |1>$$이고 target큐비트가 $$|0>$$이면 CNOT게이트의 결과가 $$\alpha |0>|0> + \beta |1>|1>$$이 된다.

이 상태가 얽힌 상태 중 한 가지이고 이에 대해서는 다음 포스트에서 다루겠다.

<br>

### 3-8. Controlled-U gate

Controlled-U게이트는 임의의 유니터리 행렬(U)에 대한 controlled 버전이다.

이게 무슨 말이냐면, 아래의 그림을 보면 쉽게 이해할 수 있을 것이다.

<div style="display:grid; grid-template-columns:repeat(2,1fr); gap:8px;">
  <img src="/assets/img/post_img/quantum_computing/Controlled_U_gate_a.png" alt="Controlled-U 게이트 이미지 a" style="width:100%; height:180px; object-fit:contain; background:rgb(26, 26, 30); margin:0;">
  <img src="/assets/img/post_img/quantum_computing/Controlled_U_gate_b.png" alt="Controlled-U 게이트 이미지 b" style="width:100%; height:180px; object-fit:contain; background:rgb(26, 26, 30); margin:0;">
</div>
<br>
Control비트가 $$|0>$$이면 target큐비트는 그대로 출력되고 control비트가 $$|1>$$이면 target큐비트에 행렬U를 곱하여 출력한다.

이때 이 유니터리 행렬 U는 X게이트가 될 수도 있고, Y, Z도 될 수 있다.

<br>
<br>

## 4. Quantum logic circuit

양자 게이트로 회로를 구성하면 그게 양자 논리회로가 되는 것이다. 

이때 가장 중요한 것이 범용 게이트라는 개념이다. 왜냐하면 하드웨어를 설계할 때 게이트의 수를 줄이는 것 또한 비용 문제이지만 게이트의 종류를 적게 하는 것도 중요하기 때문에 범용게이트를 사용하여 여러 게이트를 구현해 사용하는 것이다.

그렇다면 양자 논리 회로를 구성할 때도 범용 게이트를 사용하는 것이 필연적이다. 어떤 게이트 집합이 범용 게이트가 될 수 있는지를 따져보아야 한다.

하지만 이것은 쉬운 일이 아니다. 
<br>
왜냐하면 첫 번째, 양자 상태와 그 연산은 복소수 체(field) 위에서 정의되기 때문에 무한히 많은 상태와 변환이 존재한다.
두 번째, 기존의 불리언(boolean) 연산과는 다른 체계를 사용한다. 
세 번째, 실수를 사용해야 하나, 유리수나 정수로 근사하여 계산해야하는 문제가 있다.

우선 정의부터 다시 해보겠다.

>Universality in Quantum computation <br>
>어떤 게이트 집합 A의 원소들로 구성된 회로를 사용해서 임의의 1큐비트 게이트가 임의의 정확도로 근사된다면, 게이트 집합 A는 1큐비트 게이트에 대해 범용성을 갖는다고 말한다.
{: .prompt-info}

정의 자체가 조금 난해한데, **임의의 정확도**에 대해서 설명하자면, 쉽게 말해 실제와 이론 사이의 오차를 원하는 만큼 줄여낼 수 있다면 임의의 정확도를 맞출 수 있다는 것이다. 현실 세계 속의 실제 양자 컴퓨터도 하드웨어 노이즈, 측정 오차 등이 존재하기 때문에 임의의 오차 내에서는 범용성을 인정한다는 말이다.

수식으로 써서 이해를 돕겠다.
<br>
유한한 게이트 집합의 원소로 이루어진 게이트 열 $$V$$에 대해 $$\forall \varepsilon > 0, \forall U \in SU(2), \exists V s.t. ||U-V|| < \varepsilon$$

그리고 이 정의로부터 아래 두 개의 정리를 얻을 수 있다.

>Thm1. 두 개의 1큐비트 게이트 집합 중에는 1큐비트에 대해 범용성을 갖는 집합이 존재한다.<br>
>Proof. 임의의 1큐비트 유니터리 연산자는 블로흐 구면 상의 회전으로 표현된다. 따라서 임의의 1큐비트 게이트를 근사하려면 임의 각도에 대해 회전시킬 수 있으면 된다. <br>
>예를 들어, {H, T}게이트 집합을 보자. T는 Z축을 기준으로한 회전임을 알고, HTH는 X축 회전이다. 따라서 이들로 조밀한 회전 부분군을 만들 수 있다. 따라서 두 게이트만으로 임의의 1큐비트 게이트를 원하는 정확도로 근사 가능하다.<br>
>자세한 내용은 Solovay–Kitaev 정리를 참고
{: .prompt-info}

>Thm2. CNOT게이트와 범용 1큐비트 게이트로 임의의 n큐비트 계산을 근사할 수 있다.<br>
>Proof. 임의의 n큐비트 유니터리는 2큐비트 유니터리의 곱으로 분해할 수 있다. 그리고 임의의 2큐비트 유니터리는 1큐비트 유니터리와 CNOT으로 분해할 수 있다. 따라서 CNOT게이트와 범용 1큐비트 게이트로 임의의 n큐비트 계산을 근사할 수 있다.<br>
>자세한 내용은 KAK분해를 참고
{: .prompt-info}

<br>

### 4-1. No-cloning theorem

고전적인 컴퓨터에서는 fan-out이라는 것이 있다. 양자 컴퓨터에서는 이 fan-out게이트를 구현할 수 있을까?

<br>
CNOT게이트의 target위치에 $$|0>$$를 넣으면 control 양자 상태를 복제할 수 있다. 하지만 $$|+>$$는 어떨까? 또 임의의 상태 $$|c>$$는 어떨까?

CNOT으로는 힘들다. 그렇다면 그 복제 게이트의 존재성에 대해서 알아봐야 한다.

존재성에 대해 알아보기 위해 귀류법을 사용하겠다.
<br>
임의의 양자 상태를 복제할 수 있는 게이트 $$G$$가 있다고 가정하자. $$G$$는 양자 게이트이므로 유니터리 행렬로 표현 가능하고 이는 선형 연산자이다. 하지만 선형연산자로 $$|+>$$를 복제할 수 있다면 $$|0>$$를 복제할 수 없고 $$|0>$$를 복제할 수 있다면 $$|+>$$를 복제할수 없다. 따라서 가정에 모순이므로 양자 상태를 복제할 수 있는 게이트는 존재하지 않는다.

>자세한 증명은 생략하였으나 어렵지 않게 증명할 수 있다.
{: .prompt-info}

<br>
<br>

후기) 이번엔 큐비트와 양자 게이트의 종류 그리고 그 밖의 정리들을 알아보았습니다. 아직까지는 그렇게 어려운 내용을 다루는 것이 아니라 할 만 하다고 생각이 듭니다.(물론 양자역학을 이해하지는 못했지만 말입니다.) 다음 포스트는 아마 양자 얽힘에 관련된 내용일 것 같습니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***