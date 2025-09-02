---
title: 017-양자 컴퓨팅 N/S Spin Experiment Exercises
date: 2025-08-29 00:00:00 +0900
categories: [양자컴퓨팅, N/S Spin Experiment Exercise]
tags: [quantum computing, stern–gerlach experiment, 슈테른-게를라흐 실험, quantum state, 양자 상태, pure state, 순수 상태, mixed state, 혼합 상태, observation]
author: rachihyeon 
description: 양자 역학의 증거가 되는 실험 Stern–Gerlach experiment의 결과를 수식으로 이해해봅니다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

이번 포스트에서는 [지난 포스트](/posts/016-양자컴퓨팅-NS-Spin-Experiment/)에서 다뤘던 슈테른 게를라흐 실험의 결과를 수식으로 해석해본다.

크게 아래 두 가지 내용을 다룰 예정이다.
1. 양자 상태를 어떻게 정의하고 해석하는지
2. 실험의 결과를 양자 공리를 통해 어떻게 해석하는지(NS spin experiment, 편광판 실험)

<br>
<br>
<br>

## 1. 양자 상태(Quantum State)

양자 상태란, 어떤 물리계(입자, 광자, 원자 등)가 가질 수 있는 모든 정보를 담고 있는 수학적 표현으로, 복소수 힐베르트 공간의 벡터(또는 밀도 연산자)로 나타난다.

말이 좀 어려운데 쉽게 예시를 들어 말해보자면, 슈테른-게를라흐 실험에서 N의 상태를 0, S의 상태를 1이라고 수량화 하면, 이 0과 1로 은 원자 빔(전자든 광자든 상관없음)의 상태를 수량화하여 나타낸 것을 말함.

구체적으로 Spin N = 
$$
\begin{pmatrix}
1 \\
0 \\
\end{pmatrix}
\quad
$$
Spin S = 
$$
\begin{pmatrix}
0 \\
1 \\
\end{pmatrix}
\quad
$$
임의의 상태 =
$$
\begin{pmatrix}
c_1 \\
c_2 \\
\end{pmatrix}
\quad , c_1^2 + c_2^2 = 1
$$
로 쓸 수 있겠다.

양자 상태의 표현 방식은 크게 두 가지가 있다.

<br>

### 1-1. 순수 상태(Pure State)

순수 상태는 양자 상태가 하나의 벡터로 표현되는 경우를 말한다.

직교하는 상태들의 중첩으로 표현 가능하다.

예를 들어, $$\vert \psi > = \sum _{i}^{} p_i|\phi _{i}>$$이런 식으로 표현 가능하다. 
여기서 $$\|p_i\|=1$$를 만족한다.

<br>

### 1-2. 혼합 상태(Mixed State)

혼합 상태는 양자 상태가 직교하지 않는 파동함수들로 중첩된 경우를 말한다.

순수 상태와는 조금 달리 표현된다.

$$\sum _{i}^{n} p_i|\psi _i>$$이고 
$$\sum _{i}^{n} p_i = 1$$을 만족한다.

>이번 주제가 양자컴퓨팅인 만큼 0과 1의 상태만 구분하면 되기 때문에 순수 상태만을 사용하여 포스팅을 할 예정이다.
{: .prompt-info}

<br>
<br>

## 2. 양자 상태의 관측(Observation)

<span style = "color : red;">양자 상태의 관측</span>은 정규 직교 기저와 **일치**한다.<br>
이게 무슨 말이냐면, 양자 상태가 
$$
\begin{pmatrix}
1 \\
0 \\
\end{pmatrix}
, \  
\begin{pmatrix}
0 \\
1 \\
\end{pmatrix}
\quad
$$
이렇게 두 개의 벡터의 선형결합으로 표현된다는 것은 이 양자의 측정결과가 반드시 이 둘 중 하나라는 것이다.

<span style = "color : red;">관측의 확률 분포</span>는 정규 직교 기저의 선형결합의 계수로 **결정**된다.<br>
예를 들어 설명해보자면,<br>
양자 상태를 나타내는 정규 직교 기저가 $$\{|b_1>,\ \ |b_2> \}$$일때,
양자 상태가 
$$
\begin{pmatrix}
c_1 \\
c_2 \\
\end{pmatrix}
$$
라면,
$$
\begin{pmatrix}
c_1 \\
c_2 \\
\end{pmatrix}
=p_1|b_1> + p_2|b_2>
$$
로 표현 가능하고 여기서 $$|b_1>$$이 관측될 확률은 $$p_1^2$$로 결정되고 $$|b_2>$$이 관측될 확률은 $$p_2^2$$로 결정된다는 것이다.

<br>
<br>

## 3. NS spin 해석

우선 계산의 단순화를 위해 
Spin N = 
$$
|b_1> = 
\begin{pmatrix}
1 \\
0 \\
\end{pmatrix}
, 
$$
Spin S = 
$$
|b_2> = 
\begin{pmatrix}
0 \\
1 \\
\end{pmatrix}
\quad
$$
라고 두겠다. 두 벡터는 정규 직교 기저를 이룬다. <br>
임의 상태의 양자 
$$
\begin{pmatrix}
c_1 \\
c_2 \\
\end{pmatrix}
$$
를 N-S자기장에 통과시키면 
$$
\begin{pmatrix}
c_1 \\
c_2 \\
\end{pmatrix}
=c_1|b_1> + c_2|b_2>
$$
관계식에 의해 N에서 관측될 확률이 $$c_1^2$$, S에서 관측될 확률이 $$c_2^2$$가 된다.

<br>

### 3-1. NS-EW 해석

NS 자기장을 통과한 뒤 N의 뒤에 EW자기장을 뒀으니 입력되는 은 원자 빔의 상태는 N spin상태이다.
![N/S - W/E](/assets/img/post_img/quantum_computing/NS_WE_focus.png)
이제 EW자기장의 정규 직교 기저를 정해야 한다.<br>
NS 자기장과 EW자기장의 각도가 90도이니 90만큼 기저 벡터를 회전하면 될 것 같지만 실제로는 **그렇지 않다.** 왜냐하면 NS 자기장의 기저 벡터의 각도가 90도이기 때문이다. NS라고 하면 180도여야 하지만 90도로 되었기 때문에 <span style = "color : red;">1/2배</span> 하여 각도 계산을 해야한다.<br>
따라서 시계방향으로 90 차이이니 시계방향으로 45도 회전한 기저 벡터가 EW 정규 직교 기저가 된다.

EW 정규 직교 기저가 다음과 같으니, 

$$
|B_1> = 
\begin{pmatrix}
\frac{1}{\sqrt{2}} \\
-\frac{1}{\sqrt{2}} \\
\end{pmatrix}
, \ \ 
|B_2> = 
\begin{pmatrix}
\frac{1}{\sqrt{2}} \\
\frac{1}{\sqrt{2}} \\
\end{pmatrix}
$$

이고,

$$
\begin{pmatrix}
1 \\
0 \\
\end{pmatrix}
=p_1|B_1> + p_2|B_2>
$$
관계식이 성립한다. <br>
이로부터 $$p_1^2 = p_2^2 = 0.5$$라는 결과를 얻을 수 있다.

위 확률의 결과는 NS자기장을 통과하여 N에서 나온 은 원자 빔이라도 EW자기장을 통과했을 때 둘 중 한 곳에서 동일한 확률로 발견될 수 있다는 것을 의미한다.

<br>

### 3-2. NS-EW-NS 해석

NS-EW 자기장을 통과한 원자 중 E의 뒤에 다시 NS 자기장을 두었을 때 S쪽에서 관측이 되는지 이론적으로 확인해본다.
![N/S - W/E - N/S](/assets/img/post_img/quantum_computing/NS_WE_NS_focus.png)
E위치의 뒤에 NS자기장을 두었으니 NS자기장을 통과할 은 원자의 상태는 $$|B_1>$$이다.<br>
NS 자기장은 아까 처음에서 했던 정규 직교 기저 $$b_1,\ b_2$$를 사용하면 된다. 

수식을 세우면, 
$$
|B_1> = 
\begin{pmatrix}
\frac{1}{\sqrt{2}} \\
-\frac{1}{\sqrt{2}} \\
\end{pmatrix}
= q_1|b_1> + q_2|b_2>
$$
이다. <br>
이로부터 계산을 해보면 $$q_1^2 = q_2^2 = 0.5$$라는 결과를 얻을 수 있다.

위 확률의 결과는 NS-EW자기장을 통과하여 N-E에서 나온 은 원자 빔이라도 NS자기장을 통과했을 때 N, S 둘 중 한 곳에서 동일한 확률로 발견될 수 있다는 것을 의미한다.

>이 세 가지 관찰의 과정 속에서 굳이 NS자기장을 90도 회전할 필요는 없다. 60도만 회전시키더라도 마지막 NS자기장을 통과할 뒤 S에서 관측될 수 있다.
{: .prompt-tip}

<br>
<br>

## 4. 편광판 해석

빛은 광자로 구성되어 있기 때문에 양자 메커니즘에 의해 해석될 수 있다. 또한 편광 필름은 특정 진동방향의 광자만 통과시키고 그 외는 막아버린다.<br>
떄문에 편관판 현상의 해석은 NS spin문제와 거의 비슷하게 해결할 수 있다.<br>
편광판의 기울기에 따라 아래와 같이 정규 직교 기저를 설정할 수 있다.
<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px;">
  <img src="/assets/img/post_img/quantum_computing/x_axis_polarization_film.png" style="width:100%; height:180px; object-fit:contain; background:rgb(26, 26, 30); margin:0;">
  <img src="/assets/img/post_img/quantum_computing/y_axis_polarization_film.png" style="width:100%; height:180px; object-fit:contain; background:rgb(26, 26, 30); margin:0;">
  <img src="/assets/img/post_img/quantum_computing/theta_axis_polarization_film.png" style="width:100%; height:180px; object-fit:contain; background:rgb(26, 26, 30); margin:0;">
</div>
이하 실험 해석의 간소화를 위해 위 편광판을 순서대로 1번, 2번, 3번으로 부르겠다.

**실험 1.**

Q. 두 개의 직교하는 편광판을 연속해서 놨을 때(예를들어, 1-2번 순) 어떤결과가 나오는가?<br>
A. 임의의 입력 광자의 상태는 
$$
\begin{pmatrix}
p_1 \\
p_2 \\
\end{pmatrix}
$$
라고 둘 수 있고, 1-2번 상황이라고 가정했을 때 1번 편광판을 지나는 순간 $$p_2^2$$의 확률로 입력 광자가 
$$
\begin{pmatrix}
0 \\
1 \\
\end{pmatrix}
$$
상태로 관측된다. 이후 2번 편광판을 두면 
$$
\begin{pmatrix}
0 \\
1 \\
\end{pmatrix}
$$
상태는 통과할 수 없기 때문에 광자는 1-2편광판을 통과할 수 없음. 따라서 빛이 투과되지 못해 보이지 않음.<br>
>물론 $$p_2$$는 0일 수도 있다. 하지만 첫 번째 편광판을 통과하지 못한 광자는 두 번째 편광판에 어차피 도달하지 못하기 때문에 해석은 바뀌지 않는다.
{: .prompt-info}

<br>

**실험 2.**

Q. 두 개의 직교하는 편광판을 양 끝에 두고 그 가운데에 기울기를 달리한 편광판을 두면(예를들어 1-3-2순) 어떤결과가 나오는가?<br>
A. 임의의 입력 광자의 상태는 
$$
\begin{pmatrix}
p_1 \\
p_2 \\
\end{pmatrix}
$$
라고 둘 수 있고, 1-3-2번 상황이라고 가정했을 때 1번 편광판을 지나는 순간 $$p_2^2$$의 확률로 입력 광자가 
$$
\begin{pmatrix}
0 \\
1 \\
\end{pmatrix}
$$
상태로 관측된다. 이후 3번 편광판을 두면 $$\cos ^2\theta$$의 확률로 
$$
\begin{pmatrix}
\sin{\theta} \\
\cos{\theta} \\
\end{pmatrix}
$$
상태의 광자가 통과한다. 마지막으로 2번 편광판을 뒤에 둬 광자를 통과시키면, $$\sin ^2\theta$$의 확률로 
$$
\begin{pmatrix}
1 \\
0 \\
\end{pmatrix}
$$
상태의 광자가 통과한다. 따라서 이 경우 세 편광판을 모두 통과하는 광자가 존재해 빛이 투과할 수 있다.<br>
추가로, 최종적으로 투과하는 광자의 비율을 계산해 볼 수 있는데 각 편광판을 투과할 확률을 곱해보면 된다. <br>
$$투과비율 = p_2^2\cos ^2\theta \sin ^2\theta$$

<br>
<br>

## 5. 부록

아까 [양자 상태의 관측 파트](/posts/017-양자컴퓨팅-NS-Spin-Experiment-exercises/#2-양자-상태의-관측observation)에서 
$$
\begin{pmatrix}
c_1 \\
c_2 \\
\end{pmatrix}
=p_1|b_1> + p_2|b_2>
$$
이 표현의 확률 측도가 1임을 보일 수 있는데 증명은 아래와 같다.

$$
\begin{align}
    &양변에\ <b_1|를\ 내적하면, \notag \\
    &<b_1|
    \begin{pmatrix}
    c_1 \\
    c_2 \\
    \end{pmatrix}
    =p_1<b_1|b_1> + p_2<b_1|b_2> \notag \\
    \Rightarrow 
    &<b_1|
    \begin{pmatrix}
    c_1 \\
    c_2 \\
    \end{pmatrix}
    =p_1 \times 1 + p_2 \times 0 = p_1 \tag{1} \\
    \notag \\
    &양변에\ <b_2|를\ 내적하면, \notag \\
    &<b_2|
    \begin{pmatrix}
    c_1 \\
    c_2 \\
    \end{pmatrix}
    =p_1<b_2|b_1> + p_2<b_2|b_2> \notag \\
    \Rightarrow 
    &<b_2|
    \begin{pmatrix}
    c_1 \\
    c_2 \\
    \end{pmatrix}
    =p_1 \times 0 + p_2 \times 1 = p_2 \tag{2} \\
    \notag \\
    &(1),\ (2)로\ 부터\ 아래가\ 성립 \notag \\
    p_1^2 + p_2^2 &= 
    <b_1|
    \begin{pmatrix}
    c_1 \\
    c_2 \\
    \end{pmatrix}
    \begin{pmatrix}
    c_1 & c_2
    \end{pmatrix}
    |b_1> + 
    <b_2|
    \begin{pmatrix}
    c_1 \\
    c_2 \\
    \end{pmatrix}
    \begin{pmatrix}
    c_1 & c_2
    \end{pmatrix}
    |b_2> \notag \\
    &=(c_1^2 + c_2^2)<b_1|b_1> + (c_1^2 + c_2^2)<b_2|b_2> \notag \\ 
    &=1 \times 1 + 1 \times 1 = 1 \notag \\
    \notag \\
    & \therefore p_1^2 + p_2^2 = 1 \notag

\end{align}
$$

>양자 상태를 나타내는 모든 대수 상태는 일반적으로 **복소수** 범위에서 논해진다.
{: .prompt-info}

<br>
<br>

후기) 이번 포스트에서는 지난 포스트에서 정성적으로 다뤘던 NS Spin실험을 양자 공리를 기반하여 해석해봤습니다. 계산 자체가 어렵지는 않아서 간단한 벡터의 내적 개념으로도 이해할 수 있도록 정리해봤습니다. 다음 포스트는 양자 컴퓨터를 구성하는 양자 게이트 내용입니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***