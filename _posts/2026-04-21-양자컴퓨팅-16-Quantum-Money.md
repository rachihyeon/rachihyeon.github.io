---
title: 양자 컴퓨팅 16 - Quantum Money(양자 화폐)
date: 2026-04-21 12:00:00 +0900
categories: [컴퓨터공학, 양자컴퓨팅]
tags: [quantum computing, quantum cryptography]
author: rachihyeon 
description: 양자 상태의 복제 불가능성 정리를 이용한 양자 화폐 시스템에 대해서 알아보고 그 취약점, 해결방법에 대해서 다룬다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-15-Discrete-Logarithm-Problem/)에서는 고전적인 컴퓨터에서는 풀기 어려운 문제인 이산 로그 문제를 쇼어 알고리즘을 이용하여 다항시간 내에 해결하는 방법을 알아봤다. 

이번 포스트에서는 양자의 복제 불가능성 정리를 이용하여 양자 화폐가 어떤 방식으로 존재하는지 그리고 이 양자 화폐의 취약점 및 극복 방안에 대해서 소개하고자 한다.

<br>
<br>
<br>

## 1. Quantum Money(양자 화폐)

양자 화폐는 Wiesner가 제안한 양자 암호화 화폐 시스템이다.

전통적인(현재 우리가 사용중인 화폐 시스템) 화폐는 복제의 난이도는 어렵지만 그 복제가 불가능한 것은 아니다. 하지만, 이 양자 화폐 시스템의 화폐는 양자 상태를 복제할 수 없다는 복제 불가능성 원리에 근거하여 화폐의 위조를 불가능하게 한다.

양자 화폐 시스템의 구조는 아래와 같다.

- 각 화폐에는 <span style = "color:red;">공개된</span> 시리얼 번호 $$s$$와 
<span style = "color:red;">비공개된</span>큐비트 정보 $$|\psi\rangle$$가 있다.
- 은행은 화폐의 시리얼 번호 $$s$$에 대한 큐비트 $$|\psi\rangle$$을 검증하는 리스트가 대응되는 함수
 $$f(s) : \{0,\ 1\}^m \rightarrow \{0,\ 1,\ +,\ -,\ \}^n$$가 있다.
    + 예를 들어 $$s=1000_2$$라고 할 때 $$f(1000_2)=010+$$라면, 
    $$|\psi_{f(1000)}\rangle=|0\rangle|1\rangle|0\rangle|+\rangle$$인 것이다.
- 은행은 아래의 방법으로 화폐의 유효성을 검증한다.
    1. 화폐로부터 $$s$$를 얻어내 $$f(s)$$를 계산한다. 
    2. $$f(s)$$의 값이 $$0$$또는 $$1$$이면
    $$\{|0\rangle,\ |1\rangle \}$$로 측정하고, 
    $$+$$또는 $$-$$이면 $$\{|+\rangle,\ |-\rangle \}$$로 측정한다.
    3. 측정 결과가 $$f(s)$$값과 완전히 일치한다면 유효하다고 판정을 내린다.

<br>
<br>

## 2. Vulnerability of Quantum Money

이 양자 화폐 시스템을 어떤 공격자가 화폐를 위조하고자 공격 하는 상황을 가정해보자.

우선 양자 상태의 복제 불가능성 정리에 의해서 공개되지 않은 큐비트 $$|\psi\rangle$$를 바로 복제해내는 것은 불가능하다.
<br>
그리고 공격자가 $$s$$에 대한 큐비트 $$|\psi\rangle$$를 **임의로 결정**하여 은행에 검증 요청을 한다 할지라도, 운이 좋게 같은 기저를 선택하면 모를까 다른 기저를 선택하게 되면 그 확률이 $$1/2$$가 되기 때문에 복제 성공 확률은 $$\left(\frac{3}{4}\right)^n$$가 된다.

심지어 임의의 큐비트열을 구성해 양자 화폐의 큐비트를 측정해버리면, 그 상태가 변하기 때문에 화폐가 오염된다.

사실 그래서 $$n$$이 충분히 길다면, 복제는 거의 불가능에 가깝다.

하지만 이번 섹션에서는 어떤 조건을 추가하여 양자 화폐를 복제할 수 있는 한 가지 방법을 소개하고자 한다. 

<hr/>

+ 추가되는 조건 : 양자 화폐 $$s$$에 대한 
큐비트 $$|\psi\rangle$$ 중 하나의 큐비트 $$|\psi_i\rangle$$에 대해서 은행에 검증요청을 할 수 있다.

<hr/>

우선 0으로 초기화된 큐비트 $$c=|0\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle \in \{|0\rangle,\ |1\rangle,\ |+\rangle,\ |-\rangle \}$$을 준비한다. 이후 아래 과정을 $$\frac{\pi}{2\epsilon}(\epsilon \approx 0.01)$$회 반복한다. <br>
1. $$|c\rangle$$을 회전 게이트 
$$R_{\epsilon}=\left(\begin{array}{cc} \cos \epsilon & -\sin \epsilon \\ \sin \epsilon & \cos \epsilon \end{array} \right)$$
에 통과시킨다. <br>(후술하겠지만, $$|\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle$$일 때는, $$R_{\epsilon}$$과 $$R_{-\epsilon}$$를 교대로 적용한다.)
2. Control 큐비트를 
$$|c\rangle$$, 
target큐비트를 $$|\psi_{i,\ \mbox{forgery}}\rangle$$로 두어 CNOT게이트에 통과시킨다. 
3. 은행에 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$에 대한 유효성 검사를 요청한다.

>회전 게이트의 동작은 간단하게 블로흐 구면을 원점을 지나는 어떤 평면으로 자른 단면(원) 위에서 회전하는 게이트라고 생각하면 된다.
{: .prompt-info}

이 과정을 거치면 대략 $$(1-\epsilon^2)^{\pi/2\epsilon}\approx 0.98$$의 확률로 
$$|c\rangle$$의 값의 변화가 정해지는데 이 변화를 바탕으로 
$$|\psi_{i,\ \mbox{forgery}}\rangle=|\psi_i\rangle$$가 되도록 위조할 수 있다.

이것이 어떻게 가능한지 아래에서 알아보도록 하겠다. 
$$|\psi_i\rangle$$과 $$|\psi_{i,\ \mbox{forgery}}\rangle$$의 케이스별 자세한 내용은 아래에서 알아보도록 하겠다.

<br>

### 2-1. Case 1($$|\psi_i\rangle = |+\rangle \mbox{ or } |-\rangle$$)

회전 게이트$$R_\epsilon$$에 통과시키면, 
$$|c\rangle = |0\rangle \rightarrow \cos \epsilon |0\rangle + \sin \epsilon |1\rangle$$가 되고,

Control 큐비트를 
$$|c\rangle$$, target큐비트를 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$로 두고 CNOT게이트에 통과시키면,

$$
\begin{align}
&\mbox{CNOT}(|c\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \mbox{CNOT}(\cos \epsilon |0\rangle + \sin \epsilon |1\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \left\{ \begin{array}{lcl} 
\cos \epsilon |0\rangle |0\rangle + \sin \epsilon |1\rangle |1\rangle & \mbox{when} & |\psi_{i,\ \mbox{forgery}}\rangle = |0\rangle \\ 
\cos \epsilon |0\rangle |1\rangle + \sin \epsilon |1\rangle |0\rangle & \mbox{when} & |\psi_{i,\ \mbox{forgery}}\rangle = |1\rangle \\ 
(\cos \epsilon |0\rangle + \sin \epsilon |1\rangle)\otimes |\psi_{i,\ \mbox{forgery}}\rangle & \mbox{when} & |\psi_{i,\ \mbox{forgery}}\rangle = |+\rangle \\ 
(\cos \epsilon |0\rangle - \sin \epsilon |1\rangle)\otimes |\psi_{i,\ \mbox{forgery}}\rangle & \mbox{when} & |\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle \\
           \end{array} \right. \notag \\
\end{align}
$$

그리고 이 결과로 얻은 두 번째 레지스터의 큐비트를 은행에 검증을 요청하면 은행은 
$$\{ |+\rangle,\ |-\rangle \}$$의 기저로 측정을 하고, 큐비트는 이 기저의 큐비트 유형으로 붕괴한다.

$$|\psi_{i,\ \mbox{forgery}}\rangle = |0\rangle$$
인 경우에는

>$$
>\begin{align}
>&\cos \epsilon |0\rangle |0\rangle + \sin \epsilon |1\rangle |1\rangle \notag \\
>&=\cos \epsilon |0\rangle \otimes \frac{|+\rangle + |-\rangle}{\sqrt{2}} + \sin \epsilon |1\rangle \otimes \frac{|+\rangle - |-\rangle}{\sqrt{2}} \notag \\
>&=\frac{1}{\sqrt{2}}(\cos \epsilon |0\rangle + \sin \epsilon |1\rangle)|+\rangle+\frac{1}{\sqrt{2}}(\cos \epsilon |0\rangle - \sin \epsilon |1\rangle)|-\rangle \notag \\
>\end{align}
>$$
>
>이니 동일한 확률$$(1/2)$$로 <br>
>$$|\psi_{i,\ \mbox{forgery}}\rangle = |+\rangle$$, $$|c\rangle=\cos \epsilon |0\rangle + \sin \epsilon |1\rangle$$ <br>
>또는<br>
>$$|\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle$$, $$|c\rangle=\cos \epsilon |0\rangle - \sin \epsilon |1\rangle$$이다.

$$|\psi_{i,\ \mbox{forgery}}\rangle = |1\rangle$$
인 경우에는

>$$
>\begin{align}
>&\cos \epsilon |0\rangle |1\rangle + \sin \epsilon |1\rangle |-\rangle \notag \\
>&=\cos \epsilon |0\rangle \otimes \frac{|+\rangle - |-\rangle}{\sqrt{2}} + \sin \epsilon |1\rangle \otimes \frac{|+\rangle + |-\rangle}{\sqrt{2}} \notag \\
>&=\frac{1}{\sqrt{2}}(\cos \epsilon |0\rangle + \sin \epsilon |1\rangle)|+\rangle+\frac{1}{\sqrt{2}}(-\cos \epsilon |0\rangle + \sin \epsilon |1\rangle)|-\rangle \notag \\
>\end{align}
>$$
>
>이니 동일한 확률$$(1/2)$$로 <br>
>$$|\psi_{i,\ \mbox{forgery}}\rangle = |+\rangle$$, $$|c\rangle=\cos \epsilon |0\rangle + \sin \epsilon |1\rangle$$ <br>
>또는<br>
>$$|\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle$$, $$|c\rangle=\cos (\pi-\epsilon) |0\rangle + \sin (\pi - \epsilon) |1\rangle$$이다.

$$|\psi_{i,\ \mbox{forgery}}\rangle = |+\rangle$$
인 경우에는 $$|c\rangle=\cos \epsilon |0\rangle + \sin \epsilon |1\rangle$$가 되고,
<br>
$$|\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle$$
인 경우에는 $$|c\rangle=\cos \epsilon |0\rangle - \sin \epsilon |1\rangle$$가 된다.

위조 큐비트 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$의 경우에 따라 과정이 다르니 다시 경우를 쪼개어 설명하겠다. 

<hr/>

#### 2-1-1. Case 1-1($$|\psi_i\rangle = |+\rangle \mbox{ or } |-\rangle,\quad |\psi_{i,\ \mbox{forgery}}\rangle = |0\rangle$$)

>Remind<br>
>$$
>\begin{align}
>&\cos \epsilon |0\rangle |0\rangle + \sin \epsilon |1\rangle |1\rangle \notag \\
>&=\cos \epsilon |0\rangle \otimes \frac{|+\rangle + |-\rangle}{\sqrt{2}} + \sin \epsilon |1\rangle \otimes \frac{|+\rangle - |-\rangle}{\sqrt{2}} \notag \\
>&=\frac{1}{\sqrt{2}}(\cos \epsilon |0\rangle + \sin \epsilon |1\rangle)|+\rangle+\frac{1}{\sqrt{2}}(\cos \epsilon |0\rangle - \sin \epsilon |1\rangle)|-\rangle \notag \\
>\end{align}
>$$
>
>이니 동일한 확률$$(1/2)$$로 <br>
>$$|\psi_{i,\ \mbox{forgery}}\rangle = |+\rangle$$, $$|c\rangle=\cos \epsilon |0\rangle + \sin \epsilon |1\rangle$$ <br>
>또는<br>
>$$|\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle$$, $$|c\rangle=\cos \epsilon |0\rangle - \sin \epsilon |1\rangle$$이다.
{: .prompt-tip}

큐비트의 상태를 보면 알겠지만, 

다음 반복부터는 전자의 경우 Case 1-3의 경우와 동일, 후자의 경우 Case 1-4과 동일하므로 아래에서 같이 설명하도록 하겠다.<br>
[Case 1-3 링크](/posts/양자컴퓨팅-16-Quantum-Money/#2-1-3-case-1-3psi_irangle--rangle-mbox-or---ranglequad-psi_i-mboxforgeryrangle--rangle)<br>
[Case 1-4 링크](/posts/양자컴퓨팅-16-Quantum-Money/#2-1-4-case-1-4psi_irangle--rangle-mbox-or---ranglequad-psi_i-mboxforgeryrangle---rangle)

<hr/>

#### 2-1-2. Case 1-2($$|\psi_i\rangle = |+\rangle \mbox{ or } |-\rangle,\quad |\psi_{i,\ \mbox{forgery}}\rangle = |1\rangle$$)

>Remind<br>
>$$
>\begin{align}
>&\cos \epsilon |0\rangle |1\rangle + \sin \epsilon |1\rangle |-\rangle \notag \\
>&=\cos \epsilon |0\rangle \otimes \frac{|+\rangle - |-\rangle}{\sqrt{2}} + \sin \epsilon |1\rangle \otimes \frac{|+\rangle + |-\rangle}{\sqrt{2}} \notag \\
>&=\frac{1}{\sqrt{2}}(\cos \epsilon |0\rangle + \sin \epsilon |1\rangle)|+\rangle+\frac{1}{\sqrt{2}}(-\cos \epsilon |0\rangle + \sin \epsilon |1\rangle)|-\rangle \notag \\
>\end{align}
>$$
>
>이니 동일한 확률$$(1/2)$$로 <br>
>$$|\psi_{i,\ \mbox{forgery}}\rangle = |+\rangle$$, $$|c\rangle=\cos \epsilon |0\rangle + \sin \epsilon |1\rangle$$ <br>
>또는<br>
>$$|\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle$$, $$|c\rangle=\cos (\pi-\epsilon) |0\rangle + \sin (\pi - \epsilon) |1\rangle$$이다.
{: .prompt-tip}

큐비트의 상태를 보면 알겠지만, 

다음 반복부터는 전자의 경우 Case 1-3의 경우와 동일하니 아래에서 같이 설명하도록 하겠다.<br>
[Case 1-3 링크](/posts/양자컴퓨팅-16-Quantum-Money/#2-1-3-case-1-3psi_irangle--rangle-mbox-or---ranglequad-psi_i-mboxforgeryrangle--rangle)

문제는 후자인데, 

게이트$$R_\epsilon$$에 통과시키면, 
$$|c\rangle=\cos (\pi-\epsilon) |0\rangle + \sin (\pi - \epsilon) |1\rangle \rightarrow -|0\rangle$$가 되고,

Control 큐비트를 
$$|c\rangle$$, target큐비트를 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$로 두고 CNOT게이트에 통과시키면,

$$
\begin{align}
&\mbox{CNOT}(|c\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \mbox{CNOT}(-|0\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= -|0\rangle \otimes |\psi_{i,\ \mbox{forgery}}\rangle \notag \\
\end{align}
$$

그리고 이 결과로 얻은 두 번째 레지스터의 큐비트를 은행에 다시 검증을 요청하면 은행은 
$$\{ |+\rangle,\ |-\rangle \}$$의 기저로 측정을 하고, 큐비트는 이 기저의 큐비트 유형으로 붕괴한다.

따라서 
$$|c\rangle=-|0\rangle$$가 된다.

<hr/>

다시 게이트$$R_\epsilon$$에 통과시키면, 
$$|c\rangle=-|0\rangle \rightarrow \cos (\pi + \epsilon) |0\rangle + \sin (\pi + \epsilon) |1\rangle$$가 되고,

Control 큐비트를 
$$|c\rangle$$, target큐비트를 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$로 두고 CNOT게이트에 통과시키면,

$$
\begin{align}
&\mbox{CNOT}(|c\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \mbox{CNOT}(\cos (\pi + \epsilon) |0\rangle + \sin (\pi + \epsilon) |1\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \cos (\pi + \epsilon) |0\rangle - \sin (\pi + \epsilon) |1\rangle \otimes |\psi_{i,\ \mbox{forgery}}\rangle \notag \\
\end{align}
$$

그리고 이 결과로 얻은 두 번째 레지스터의 큐비트를 은행에 다시 검증을 요청하면 은행은 
$$\{ |+\rangle,\ |-\rangle \}$$의 기저로 측정을 하고, 큐비트는 이 기저의 큐비트 유형으로 붕괴한다.

따라서 
$$|c\rangle=-\cos \epsilon |0\rangle + \sin \epsilon |1\rangle$$가 된다.

두 번의 실행에서의 결과를 보면 알겠지만 
$$|c\rangle$$은 두 값을 반복한다. 

<hr/>

#### 2-1-3. Case 1-3($$|\psi_i\rangle = |+\rangle \mbox{ or } |-\rangle,\quad |\psi_{i,\ \mbox{forgery}}\rangle = |+\rangle$$)

다시 회전 게이트$$R_\epsilon$$에 통과시키면, 
$$|c\rangle = \cos \epsilon |0\rangle + \sin \epsilon |1\rangle \rightarrow \cos (2\epsilon) |0\rangle + \sin (2\epsilon) |1\rangle$$가 되고,

Control 큐비트를 
$$|c\rangle$$, target큐비트를 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$로 두고 CNOT게이트에 통과시키면,

$$
\begin{align}
&\mbox{CNOT}(|c\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \mbox{CNOT}(\cos (2\epsilon) |0\rangle + \sin (2\epsilon) |1\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= (\cos (2\epsilon) |0\rangle + \sin (2\epsilon) |1\rangle)\otimes |\psi_{i,\ \mbox{forgery}}\rangle \notag \\
\end{align}
$$

그리고 이 결과로 얻은 두 번째 레지스터의 큐비트를 은행에 다시 검증을 요청하면 은행은 
$$\{ |+\rangle,\ |-\rangle \}$$의 기저로 측정을 하고, 큐비트는 이 기저의 큐비트 유형으로 붕괴한다.

따라서 
$$|c\rangle=\cos (2\epsilon) |0\rangle + \sin (2\epsilon) |1\rangle$$가 된다.

수학적 귀납법에 따라, $$k$$회 이 시행을 반복하면 
$$|c\rangle \rightarrow \cos (k\epsilon) |0\rangle + \sin (k\epsilon) |1\rangle$$가 되고,

$$\pi/2\epsilon$$반복 후에는 
$$|c\rangle \rightarrow |1\rangle$$가 된다.

<hr/>

#### 2-1-4. Case 1-4($$|\psi_i\rangle = |+\rangle \mbox{ or } |-\rangle,\quad |\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle$$)

다시 회전 게이트$$R_\epsilon$$에 통과시키면, 
$$|c\rangle = \cos \epsilon |0\rangle - \sin \epsilon |1\rangle \rightarrow |0\rangle$$가 되고,

Control 큐비트를 
$$|c\rangle$$, target큐비트를 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$로 두고 CNOT게이트에 통과시키면,

$$
\begin{align}
&\mbox{CNOT}(|c\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \mbox{CNOT}(|0\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= |0\rangle |\psi_{i,\ \mbox{forgery}}\rangle \notag \\
\end{align}
$$

그리고 이 결과로 얻은 두 번째 레지스터의 큐비트를 은행에 다시 검증을 요청하면 은행은 
$$\{ |+\rangle,\ |-\rangle \}$$의 기저로 측정을 하고, 큐비트는 이 기저의 큐비트 유형으로 붕괴한다.

따라서 
$$|c\rangle=|0\rangle$$가 된다.

이후 반복은 $$(0 \rightarrow -\epsilon \rightarrow 0 \rightarrow -\epsilon \cdots)$$와 같은 방식으로 맴돈다. 

그런데 우리가 얻고자 하는 것은 
$$|c\rangle$$의 변화로부터 
$$|\psi \rangle$$을 찾아내는 것이다. <br>
그러므로 우리는 우리가 선택한 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$로부터 $$|c\rangle$$의 변화가 정확하게 하나로 결정되어야 하도록 해야한다.

<hr/>

따라서, 우리는 
$$|\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle$$일 때, 회전 게이트 적용을 $$R_\epsilon$$과 $$R_{-\epsilon}$$의 교대 적용으로 바꾼다.

회전 게이트적용 단계부터 다시 $$R_{-\epsilon}$$에 통과시키면, 
$$|c\rangle = \cos \epsilon |0\rangle - \sin \epsilon |1\rangle \rightarrow \cos (2\epsilon) |0\rangle - \sin (2\epsilon) |1\rangle$$가 되고,

Control 큐비트를 
$$|c\rangle$$, target큐비트를 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$로 두고 CNOT게이트에 통과시키면,

$$
\begin{align}
&\mbox{CNOT}(|c\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \mbox{CNOT}(\cos (2\epsilon) |0\rangle - \sin (2\epsilon) |1\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= (\cos (2\epsilon) |0\rangle + \sin (2\epsilon) |1\rangle)\otimes |\psi_{i,\ \mbox{forgery}}\rangle \notag \\
\end{align}
$$

그리고 이 결과로 얻은 두 번째 레지스터의 큐비트를 은행에 다시 검증을 요청하면 은행은 
$$\{ |+\rangle,\ |-\rangle \}$$의 기저로 측정을 하고, 큐비트는 이 기저의 큐비트 유형으로 붕괴한다.

따라서 
$$|c\rangle=\cos (2\epsilon) |0\rangle + \sin (2\epsilon) |1\rangle$$가 된다.

수학적 귀납법에 따라, $$k$$회 이 시행을 반복하면 
$$|c\rangle \rightarrow \cos (k\epsilon) |0\rangle + (-1)^k\sin (k\epsilon) |1\rangle$$가 되고,

$$\pi/2\epsilon$$반복 후에는 
$$|c\rangle \rightarrow |1\rangle$$가 된다.

<br>

### 2-2. Case 2($$|\psi_i\rangle = |0\rangle \mbox{ or } |1\rangle$$)

우선 회전 게이트$$R_\epsilon$$에 통과시키면, 
$$|c\rangle = |0\rangle \rightarrow \cos \epsilon |0\rangle + \sin \epsilon |1\rangle$$가 되고,

Control 큐비트를 
$$|c\rangle$$, target큐비트를 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$로 두고 CNOT게이트에 통과시키면,

$$
\begin{align}
&\mbox{CNOT}(|c\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \mbox{CNOT}(\cos \epsilon |0\rangle + \sin \epsilon |1\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \left\{ \begin{array}{lcl} 
\cos \epsilon |0\rangle |\psi_{i,\ \mbox{forgery}}\rangle + \sin \epsilon |1\rangle |1 \oplus \psi_{i,\ \mbox{forgery}}\rangle & \mbox{when} & |\psi_{i,\ \mbox{forgery}}\rangle = |0\rangle \mbox{ or } |1\rangle \\ 
(\cos \epsilon |0\rangle + \sin \epsilon |1\rangle)\otimes |\psi_{i,\ \mbox{forgery}}\rangle & \mbox{when} & |\psi_{i,\ \mbox{forgery}}\rangle = |+\rangle \\ 
(\cos \epsilon |0\rangle - \sin \epsilon |1\rangle)\otimes |\psi_{i,\ \mbox{forgery}}\rangle & \mbox{when} & |\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle \\
           \end{array} \right. \notag \\
\end{align}
$$

그리고 이 결과로 얻은 두 번째 레지스터의 큐비트를 은행에 검증을 요청하면 은행은 
$$\{ |0\rangle,\ |1\rangle \}$$의 기저로 측정을 하고, 큐비트는 이 기저의 큐비트 유형으로 붕괴한다.

$$|\psi_{i,\ \mbox{forgery}}\rangle = |0\rangle \mbox{ or } |1\rangle$$
인 경우에만 얽혀 있으니 $$|c\rangle=|0\rangle$$가 되고,
<br>
>$$\cos ^2 \epsilon$$의 확률로 이렇게 되지만 $$\epsilon$$이 매우 작은 수 이므로 $$\cos ^2 \epsilon \approx 1-\epsilon^2$$, 매우 높은 확률로 
>$$|c\rangle=|0\rangle$$가 된다.
{: .prompt-warning}
$$|\psi_{i,\ \mbox{forgery}}\rangle = |+\rangle$$
인 경우에는 $$|c\rangle=\cos \epsilon |0\rangle + \sin \epsilon |1\rangle$$가 되고,
<br>
$$|\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle$$
인 경우에는 $$|c\rangle=\cos \epsilon |0\rangle - \sin \epsilon |1\rangle$$가 된다.

>여기까지는 Case 1과 완벽히 동일하다.
{: .prompt-info}

위조 큐비트 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$의 경우에 따라 과정이 다르니 다시 경우를 쪼개어 설명하겠다.

<hr/>

#### 2-2-1. Case 2-1($$|\psi_i\rangle = |0\rangle \mbox{ or } |1\rangle,\quad |\psi_{i,\ \mbox{forgery}}\rangle = |0\rangle \mbox{ or } |1\rangle$$)

이 경우 바로 눈치챌 수 있겠지만, 매 반복마다 똑같이 
$$|c\rangle$$은 변하지 않는다. 

따라서 $$\pi/2\epsilon - 1$$회 반복 후에도 
$$|c\rangle=|0\rangle$$이다.

<hr/>

#### 2-2-2. Case 2-2($$|\psi_i\rangle = |0\rangle \mbox{ or } |1\rangle,\quad |\psi_{i,\ \mbox{forgery}}\rangle = |+\rangle$$)

>$$|\psi_{i,\ \mbox{forgery}}\rangle = |0\rangle \mbox{ or } |1\rangle$$
>로 붕괴된 상태임을 명심.
{: .prompt-warning}

다시 회전 게이트$$R_\epsilon$$에 통과시키면, 
$$|c\rangle = \cos \epsilon |0\rangle + \sin \epsilon |1\rangle \rightarrow \cos (2\epsilon) |0\rangle + \sin (2\epsilon) |1\rangle$$가 되고,

Control 큐비트를 
$$|c\rangle$$, target큐비트를 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$로 두고 CNOT게이트에 통과시키면,

$$
\begin{align}
&\mbox{CNOT}(|c\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \mbox{CNOT}(\cos (2\epsilon) |0\rangle + \sin (2\epsilon) |1\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \cos (2\epsilon) |0\rangle |\psi_{i,\ \mbox{forgery}}\rangle + \sin (2\epsilon) |1\rangle |1 \oplus \psi_{i,\ \mbox{forgery}}\rangle \notag \\
\end{align}
$$

그리고 이 결과로 얻은 두 번째 레지스터의 큐비트를 은행에 다시 검증을 요청하면 은행은 
$$\{ |0\rangle,\ |1\rangle \}$$의 기저로 측정을 하고, 큐비트는 이 기저의 큐비트 유형으로 붕괴한다.

따라서 $$|c\rangle=|0\rangle$$가 된다.
>위의 경우와 동일하게 $$\cos ^2 (2\epsilon)$$의 확률로 이렇게 되지만 $$\epsilon$$이 매우 작은 수 이므로 $$2\epsilon$$역시 여전히 작은 수 이기 때문에, $$\cos ^2 (2\epsilon) \approx 1-4\epsilon^2$$, 매우 높은 확률로 
>$$|c\rangle=|0\rangle$$가 된다.
{: .prompt-warning}

다음 반복부터는 Case 1-1의 경우와 동일하므로 $$\pi/2\epsilon - 2$$회 반복 후에도 
$$|c\rangle=|0\rangle$$이다.

<hr/>

#### 2-2-3. Case 2-3($$|\psi_i\rangle = |0\rangle \mbox{ or } |1\rangle,\quad |\psi_{i,\ \mbox{forgery}}\rangle = |-\rangle$$)

>$$|\psi_{i,\ \mbox{forgery}}\rangle = |0\rangle \mbox{ or } |1\rangle$$
>로 붕괴된 상태임을 명심.
{: .prompt-warning}

>[Case 2-3](/posts/양자컴퓨팅-16-Quantum-Money/#2-1-4-case-1-4psi_irangle--rangle-mbox-or---ranglequad-psi_i-mboxforgeryrangle---rangle)에서 언급했다시피 $$R_\epsilon$$과 $$R_{-\epsilon}$$게이트의 교대 적용이 필요하다.
{: .prompt-info}

회전 게이트$$R_{-\epsilon}$$에 통과시키면, 
$$|c\rangle = \cos \epsilon |0\rangle - \sin \epsilon |1\rangle \rightarrow \cos (2\epsilon) |0\rangle - \sin (2\epsilon) |1\rangle$$가 되고,

Control 큐비트를 
$$|c\rangle$$, target큐비트를 
$$|\psi_{i,\ \mbox{forgery}}\rangle$$로 두고 CNOT게이트에 통과시키면,

$$
\begin{align}
&\mbox{CNOT}(|c\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \mbox{CNOT}(\cos (2\epsilon) |0\rangle - \sin (2\epsilon) |1\rangle,\ |\psi_{i,\ \mbox{forgery}}\rangle) \notag \\
&= \cos (2\epsilon) |0\rangle |\psi_{i,\ \mbox{forgery}}\rangle - \sin (2\epsilon) |1\rangle |1 \oplus \psi_{i,\ \mbox{forgery}}\rangle \notag \\
\end{align}
$$

그리고 이 결과로 얻은 두 번째 레지스터의 큐비트를 은행에 다시 검증을 요청하면 은행은 
$$\{ |0\rangle,\ |1\rangle \}$$의 기저로 측정을 하고, 큐비트는 이 기저의 큐비트 유형으로 붕괴한다.

따라서 
$$|c\rangle=|0\rangle$$가 된다.
>위의 경우와 동일하게 $$\cos ^2 (2\epsilon)$$의 확률로 이렇게 되지만 $$\epsilon$$이 매우 작은 수 이므로 $$2\epsilon$$역시 여전히 작은 수 이기 때문에, $$\cos ^2 (2\epsilon) \approx 1-4\epsilon^2$$, 매우 높은 확률로 
>$$|c\rangle=|0\rangle$$가 된다.
{: .prompt-warning}

다음 반복부터는 Case 1-1의 경우와 동일하므로 $$\pi/2\epsilon - 2$$회 반복 후에도 
$$|c\rangle=|0\rangle$$이다.

<br>

### 2-3. Overall

위 시뮬레이션의 $$\pi/2\epsilon$$회 반복 후 
$$|c\rangle$$값의 결과들을 표로 정리해보면 아래와 같다

|$$\vert \psi_{i,\ \mbox{forgery}}\rangle$$|$$\vert 0\rangle$$     |$$\vert 1\rangle$$                                      |$$\vert +\rangle$$|$$\vert -\rangle$$|
|------------------------------------------|-----------------------|------------------                                      |------------------|------------------|
|$$\vert \psi_i\rangle=\vert 0\rangle$$    |$$\vert 0\rangle$$     |$$\vert 0\rangle$$                                      |$$\vert 0\rangle$$|$$\vert 0\rangle$$|
|$$\vert \psi_i\rangle=\vert 1\rangle$$    |$$\vert 0\rangle$$     |$$\vert 0\rangle$$                                      |$$\vert 0\rangle$$|$$\vert 0\rangle$$|
|$$\vert \psi_i\rangle=\vert +\rangle$$    |조건부$$\vert 1\rangle$$|1/4확률로$$\vert 0\rangle$$, 3/4확률로 $$\vert 1\rangle$$|$$\vert 1\rangle$$|$$\vert 1\rangle$$|
|$$\vert \psi_i\rangle=\vert -\rangle$$    |조건부$$\vert 1\rangle$$|1/4확률로$$\vert 0\rangle$$, 3/4확률로 $$\vert 1\rangle$$|$$\vert 1\rangle$$|$$\vert 1\rangle$$|

표를 보면 알겠지만, $$\vert \psi_{i,\ \mbox{forgery}}\rangle$$ 값을 $$\vert +\rangle$$또는 $$\vert -\rangle$$로 설정해야만 $$\vert \psi_i\rangle$$가 속한 기저를 정확하게 구분해낼 수 있다.

<br>
<br>

## 3. Ways to overcome

위에서 소개한 취약점을 극복하는 방법은 아주 쉽다. 특정 시리얼 넘버에 대한 인증 기저열($$f(s)$$)를 검증 때마다 새로 생성하면 된다.

또한 최근의 연구 [Quantum Money from Hidden Subspaces](https://arxiv.org/pdf/1203.4740)나 [How to Record Quantum Queries, and Applications to Quantum Indifferentiability](https://link.springer.com/chapter/10.1007/978-3-030-26951-7_9)에서는 매 검증마다 새로이 생성할 필요가 없는 방법을 제안하기도 했고, 은행 뿐 아니라 개인도 공개키 암호화나 전자 서명과 비슷한 방식으로 화폐의 유효성을 검증할 수 있는 프로토콜을 제안하기도 했다.

<br>
<br>

후기) 이번 포스트에서는 양자 화폐 시스템을 알아보고 그 취약점 극복방안에 대해서 알아봤습니다. 수식이 정말 많아서 쓰기 어려웠는데... 해냈네요... 취약점을 찾아낼 때 케이스별로 분석하는 부분에서 많이 헷갈릴 수 있지만 식을 직접 손으로 써내려가다 보면 내용 자체가 그렇게 어려운 것이 아니라는 것을 알 수 있습니다. 

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***