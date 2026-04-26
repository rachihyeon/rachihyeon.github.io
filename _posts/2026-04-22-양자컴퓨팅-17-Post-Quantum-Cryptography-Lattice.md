---
title: 양자 컴퓨팅 17 - Post Quantum Cryptography(양자 내성 암호)-Lattice(격자)
date: 2026-04-22 15:00:00 +0900
categories: [컴퓨터공학, 양자컴퓨팅]
tags: [quantum computing, quantum cryptography]
author: rachihyeon 
description: 양자 컴퓨팅 시대에도 보안성을 유지하는 양자 내성 암호란 무엇인지 알아보고 그 중 하나인 격자 문제를 기반으로한 방법을 다룬다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-16-Quantum-Money/)에서는 양자의 복제 불가능성 정리에 기반한 양자 화폐 시스템에 대해서 알아봤다. 

지금까지 양자 컴퓨터로 고전적인 컴퓨터로 해결하기 어려운(비효율적인) 문제들을 해결하는 방법에 대해서 알아봤다.

대체로 지수적인 알고리즘들을 다항시간 내에 계산해내는 방향의 효율성을 볼 수 있는데, 이건 현실세계에 큰 위기가 되기도 한다. 

왜냐하면 이런 효율적인 알고리즘들은 현실의 암호 체계를 보다 쉽게 파훼할 수 있는 방법이 존재할 수 있음을 암시하기 때문이다.

이번 포스트에서는 이를 고려하여 양자 내성 암호에 대해서 알아보도록 한다.

<br>
<br>
<br>

## 1. Post Quantum Cryptography

양자 컴퓨터는 소인수 분해나 이산 로그 문제에 기반한 암호 체계가 더 이상 안전하지 않다는 것을 말한다.
<br>
하지만, 여전히 양자 컴퓨터로는 풀기 어려운 문제들이 존재하기는 한다. 우리는 이것을 양자 내성 암호라고 한다.

>계산 복잡도 이론에서는 양자 컴퓨터를 사용하여 다항 시간 내에 해결할 수 있는 문제들을 BQP로 분류한다.
{: .prompt-info}

주의 해야 할 것이 있는데 **양자 내성 암호**와 **양자 암호**는 다른 개념이다.

- 양자 내성 암호
    - 양자 컴퓨터에 대항하여 안전한 암호
    - 고전적인 컴퓨터로 구현 가능하다.
- 양자 암호
    - 양자 컴퓨터로만 구현될 수 있는 암호

양자 내성 암호는 여러 종류가 있다.

- 격자 문제
- 다변수 방정식
- 해시

정도가 있는데 본 블로그에서는 격자 문제만들 다루도록 하겠다.

<br>
<br>

## 2. Lattice(격자)

>격자란 덧셈 연산에 닫혀 있는 $$\mathbb{R}^n$$의 이산 부분군이다.
{: .prompt-info}

$$n$$차원 상의 격자 $$\mathcal{L}$$의 기저가 $$B:=\{\overrightarrow{b_1},\ \overrightarrow{b_2},...,\ \overrightarrow{b_n} \} \subseteq \mathbb{R}^n$$일 때,
격자는 아래와 같이 정의된다.

$$\mathcal{L} = \mathcal{L}(B) := \{\sum_{i=0}^{n}c_i\overrightarrow{b_i} \vert c_i \in \mathbb{Z} \}$$

쉽게 말해 기저 벡터의 정수 계수 일차 결합의 원소들을 말한다.

바둑판을 생각해보면 이해가 쉽다.

<img alt = "바둑판" src="/assets/img/post_img/quantum_computing/Baduk_board.png" style="width:50%;">

바둑판의 가로 세로 축의 한 칸을 격자의 기저라고 두고,(물론 이 바둑판의 격자를 생성하는 또다른 기저가 있을 수 있지만 설명의 편의를 위해서 가로 세로 축을 사용한다.)

K10을 원점으로 두면, 바둑판 위의 모든 점은 기저의 정수계수 일차 결합으로 표현 가능하다.

그리고 격자를 이야기 할 때 꼭 필요한 개념 하나가 있는데 아래에서 소개하도록 하겠다.

<br>
<br>

## 3. Unimodular Matrix(유니모듈러 행렬)

>어떤 정수 행렬 $$U\in \mathbb{Z}^{n\times n}$$이 정칙일 때, 우리는 이 행렬 $$U$$를 유니모듈러 행렬이라고 부른다. <br>
>그리고 이 행렬의 필요충분조건은 $$\mbox{det}(U)=\pm 1$$이다.
{: .prompt-tip}

>Proof<br>
>1. 행렬 $$U\in \mathbb{Z}^{n\times n}$$가 정칙이고 이 역행렬 $$U^{-1}\in \mathbb{Z}^{n\times n}$$라면 (충분조건 $$\Rightarrow$$)<br>
>$$UU^{-1}=I_n\ \Rightarrow \ \mbox{det}(UU^{-1})=\mbox{det}(I_n)=1 \ \Rightarrow \ \mbox{det}(U)\mbox{det}(U^{-1})=1$$<br>
>$$U$$와 $$U^{-1}$$의 원소들은 모두 정수이니 행렬식 계산의 정의에 따라 $$\mbox{det}(U),\ \mbox{det}(U^{-1}) \in \mathbb{Z}$$이므로 <br>
>$$\mbox{det}(U)=\mbox{det}(U^{-1})=1 \ \mbox{or} \ \mbox{det}(U)=\mbox{det}(U^{-1})=-1$$<br>
><br>
>2. 행렬 $$U\in \mathbb{Z}^{n\times n}$$에 대해 $$\mbox{det}(U)=\pm 1$$ 이면, (필요조건 $$\Leftarrow$$)<br>
>$$\mbox{det}(U)\ne 0$$이므로 $$U$$는 정칙이고 그 역행렬을 $$U^{-1}$$ 로 둘 수 있다.<br>
>$$U^{-1}=\frac{1}{\mbox{det}(U)}\mbox{adj}(U)=\pm \mbox{adj}(U)$$ 인데, <br>
>임의의 행렬 $$A$$에 대한 수반행렬 $$\mbox{adj}(A)$$은 $$A$$의 부분 행렬식으로 이루어진 행렬이다. <br>
>한편, $$\mbox{adj}(U)$$은 $$U$$의 부분행렬식으로 이루어져 있고 그 행렬식은 모두 정수들의 덧셈 곱셈으로 계산된다. 따라서 $$\mbox{adj}(U)\in \mathbb{Z}^{n\times n}$$<br>
>정리하면, $$U^{-1}=\frac{1}{\mbox{det}(U)}\mbox{adj}(U)=\pm \mbox{adj}(U) \in \mathbb{Z}^{n\times n}$$
{: .prompt-info}

그리고 하나의 정리를 소개하고자 한다.

>Theorem 1. <br>
>$$\mathcal{L}(B)=\mathcal{L}(C)$$라는 것은 $$B=CU$$를 만족하는 유니모듈러 행렬 $$U$$가 존재한다는 것과 필요충분조건이다.
{: .prompt-tip}

>Proof<br>
>1. $$\mathcal{L}(B)=\mathcal{L}(C)$$라면 (충분조건 $$\Rightarrow$$)<br>
>$$B$$의 각 열 $$b_j$$에 대해서 $$b_j$$은 $$\mathcal{L}(C)$$의 원소이다. 따라서 다음이 만족한다.<br>
>$$\forall j,\ b_j=Cu_j,\quad (u_j\in \mathbb{Z}^{n})$$<br>
>이 $$u_j$$를 열로 두어 $$U:=[u_1\vert u_2 \vert ... \vert u_n]\in \mathbb{Z}^{n\times n}$$라고 하면 <br>
>$$B=CU,\quad U \in \mathbb{Z}^{n\times n}$$<br>
>마찬가지로, $$C$$의 각 열 $$c_j$$에 대해서 $$c_j$$은 $$\mathcal{L}(B)$$의 원소이다. 따라서 다음이 만족한다.<br>
>$$\forall j,\ c_j=Bv_j,\quad (v_j\in \mathbb{Z}^{n})$$<br>
>이 $$v_j$$를 열로 두어 $$V:=[v_1\vert v_2 \vert ... \vert v_n]\in \mathbb{Z}^{n\times n}$$라고 하면 <br>
>$$C=BV,\quad V \in \mathbb{Z}^{n\times n}$$<br>
>위 두 식으로부터, $$B=CU=BVU$$이고 $$B$$가 가역이니 양변에 $$B^{-1}$$를 곱해 $$I_n=VU$$를 얻을 수 있다.<br>
>마찬가지로 $$C=BV=CUV$$이고 $$C$$가 가역이니 양변에 $$C^{-1}$$를 곱해 $$I_n=UV$$를 얻을 수 있다.<br>
>$$UV=VU=I_n,\ U \in \mathbb{Z}^{n\times n},\ V \in \mathbb{Z}^{n\times n}$$이니 $$B=CU$$를 만족하는 유니모듈러 행렬 $$U$$가 존재한다.<br>
><br>
>2. $$B=CU$$를 만족하는 유니모듈러 행렬 $$U$$가 존재한다면 (필요조건 $$\Leftarrow$$)<br>
>임의의 $$v \in \mathcal{L}(B)$$에 대해 적당한 $$x$$가 존재하여, $$v=Bx=CUx$$가 만족한다.<br>
>$$U \in \mathbb{Z}^{n\times n}$$이고, $$x \in \mathbb{Z}^{n}$$이므로 $$Ux \in \mathbb{Z}^{n}$$<br>
>따라서 $$v=C(Ux)\in \mathcal{L}(C)$$, 즉 $$\mathcal{L}(B) \subseteq \mathcal{L}(C)$$<br>
>마찬가지로 임의의 $$u \in \mathcal{L}(C)$$에 대해 적당한 $$y$$가 존재하여, $$u=Cy=BU^{-1}y$$가 만족한다.<br>
>$$U^{-1} \in \mathbb{Z}^{n\times n}$$이고, $$y \in \mathbb{Z}^{n}$$이므로 $$U^{-1}y \in \mathbb{Z}^{n}$$<br>
>따라서 $$u=B(U^{-1}y)\in \mathcal{L}(B)$$, 즉 $$\mathcal{L}(C) \subseteq \mathcal{L}(B)$$<br>
>위 두 결과로부터 $$\mathcal{L}(B) \subseteq \mathcal{L}(C)$$이고, $$\mathcal{L}(C) \subseteq \mathcal{L}(B)$$이므로 $$\mathcal{L}(C) = \mathcal{L}(B)$$이다.
{: .prompt-info}

<br>

### 3-1. Hermit Normal Form(에르미트 정규형)

유니모듈러 행렬과 관련된 개념 하나를 또 소개하고자 한다.

>Definition<br>
>비특이행렬 $$A \in \mathbb{Z}^{n\times n}$$에 대해서 아래의 세 조건을 만족하면 $$A$$를 에르미트 정규형(HNF)이라고 부른다.<br>
>1. $$A$$는 상삼각행렬이다. 즉, $$\forall i>j,\ a_{ij}=0$$ <br>
>2. $$A$$의 주대각선의 원소들은 모두 양수이다. 즉, $$\forall i,\ a_{ii}>0$$<br>
>3. 임의의 행 내의 모든 원소들은 주대각선의 원소보다 작다. 즉, $$a_{ii} > a_{ij} \geq 0$$
{: .prompt-info}

위 성질들을 보면 어떤 것과 비슷하다는 것을 알 수 있다. 바로 행사다리꼴 행렬이다.

행사다리꼴 행렬과 마찬가지로 어떤 행렬에 적당한 기본행 연산을 통해 HNF로 만들 수 있다.

주의해야할 점은 나눗셈 단계에서는 최대공약수를 사용해야한다는 것이다.

따라서 어떤 행렬 $$A$$에 대해서 적당한 유니모듈러 행렬 $$U$$이 존재하여 $$AU$$가 HNF가 되도록 할 수 있다.

기저 변환과 동일하게 격자를 생성하는 행렬 $$A$$에 대해서 $$A$$의 HNF인 $$AU$$로 생성된 격자는 $$A$$로 생성한 격자와 동일하다는 것을 어렵지 않게 증명할 수 있다.

<br>

### 3-2. Change of basis

어떤 격자를 생성하는 기저 $$B$$에 대해서 이는 벡터 집합이니 직교화, 정규화가 가능하다. 

그렇다면 주대각성분이 1이고 상삼각행렬인 $$T$$와 정규직교집합 $$B^*$$에 대해서 $$B=B^*T$$의 기저 변환이 가능하다.

>여기서 $$T$$를 얻는 방법은 그람-슈미츠 정규직교화 방법을 사용했지만 포스트 내용의 길이가 길어지고 포스트의 핵심과 먼 내용이기 때문에 생략하고 필요하다고 생각될 때 다루도록 하겠다.
{: .prompt-info}

$$T$$는 기본행연산을 통해 $$I_n$$가 될 수 있으므로 $$\mbox{det}(T)=1$$이다. 

또한, 우리는 이로부터 격자의 행렬식의 기하학적 의미를 생각해볼 수 있다.

$$\mathcal{L}(B)$$의 행렬식 $$\mbox{det}(B)=\mbox{det}(B^*T)=\mbox{det}(B^*)$$이므로 이 행렬식의 의미는 격자의 평행육면체의 크기와 동일하다.

>하지만 역은 성립하지 않는다. 즉, 행렬식이 같다고 같은 격자를 생성하는 것은 아니라는 것을 유의해야한다.
{: .prompt-warning}

<br>
<br>

## 4. Theorems about Lattice

다시 격자 문제로 돌아와서, 하나의 notation을 소개하고 몇 가지 정리를 소개하고자 한다.

격자 공간 $$\mathcal{L}(B)$$의 영이 아닌 가장 짧은 벡터의 길이를 $$\lambda (\mathcal{L}(B))$$라고 한다.

### 4-1. Theorem 2. $$\lambda (\mathcal{L}(B)) \geq \min_{i} \Vert b_{i}^* \Vert$$

>Theorem 2. <br>
>기저 $$B$$의 그람-슈미츠 정규직교화 기저 $$B^*$$에 대해서 다음이 성립한다.
>
>$$
>\lambda (\mathcal{L}(B)) \geq \min_{i} \Vert b_{i}^* \Vert
>$$
{: .prompt-tip}

>Proof<br>
>영이 아닌 격자 벡터 $$t\in \mathcal{L}(B)$$라고 하면, $$t=Bx=\sum b_ix_i\ \mbox{for some } x\in \mathbb{Z}^n$$<br>
>$$t$$가 영벡터가 아니므로 $$x_i\ne 0$$를 만족하는 $$x_i$$가 적어도 한 개 이상 존재한다. <br>
>따라서 $$k=\max\{ i:x_i\ne 0 \}$$라고 둘 수 있다.<br>
>그람-슈미츠 정규직교화 관계식에 의해 $$b_i=b_i^*+\sum_{j<i}\mu_{ij}b_j^*$$이니<br>
>$$t=\sum b_ix_i=\sum x_i(b_i^*+\sum_{j<i}\mu_{ij}b_j^*)$$라고 쓸 수 있다. 그리고 다음의 내적을 계산하면,<br>
>$$\langle t, b_k^*\rangle = \langle Bx, b_k^*\rangle = \langle \sum b_ix_i, b_k^*\rangle=\langle \sum x_i(b_i^*+\sum_{j<i}\mu_{ij}b_j^*), b_k^*\rangle$$인데<br>
>여기서 $$x_i = 0(i>k)$$이고, $$i<k$$인 $$i$$에 대해서는 $$\langle b_i^*, b_k^*\rangle = 0$$이기 때문에 <br>
>$$\langle \sum x_i(b_i^*+\sum_{j<i}\mu_{ij}b_j^*), b_k^*\rangle = x_k \langle b_k^*, b_k^*\rangle=x_k\Vert b_k^* \Vert ^ 2$$<br>
>한편 코시-슈바르츠 절대부등식에 의해, $$\Vert Bx \Vert \Vert b_k^* \Vert \geq \vert \langle Bx, b_k^* \rangle \vert = \vert x_k\vert \Vert b_k^* \Vert ^2$$<br>
>$$x_k$$는 영이 아닌 정수이므로 $$|x_k|\geq 1$$ 따라서, $$\vert x_k\vert \Vert b_k^* \Vert ^2 \geq \Vert b_k^* \Vert ^2$$<br>
>$$\Rightarrow \ \lambda (\mathcal{L}(B)) = \Vert Bx \Vert \geq \Vert b_k^* \Vert \geq \min_{i} \Vert b_i^* \Vert$$
{: .prompt-info}

### 4-2. Theorem 3. $$\lambda (\mathcal{L}(B)) \leq \sqrt{n}\cdot \mbox{det}(B)^{1/n}$$

이 정리를 증명하기 전에 보조정리 2개를 소개한다.

>Lemma 1.(Blichfeldt's theorem) <br>
>
>$$S\subseteq \mathbb{R}^n$$에 대해서 $$\mbox{vol}(S)\geq 1$$이면(더 정확히는 측도가 1보다 크면) $$\exists \mathbf{x}, \mathbf{y} \in S,\ (\mathbf{x}\ne \mathbf{y}) \mbox{ s.t. } \mathbf{x}- \mathbf{y} \in \mathbb{Z}^n$$
{: .prompt-tip}

>Proof<br>
>$$\mathbb{R}^n$$를 정수 격자에 대한 단위 초입방체로 분할한다. $$\mathbb{R}^n = \bigsqcup_{\mathbf{k}\in \mathbb{Z}^n} C_{\mathbf{k}}, \quad C_{\mathbf{k}}=\mathbf{k}+[0,1)^n$$<br>
>그러면 $$S_{\mathbf{k}}=S\cap C_{\mathbf{k}}$$를 정의할 수 있다. <br>
>그리고, $$S_{\mathbf{k}}$$의 각 조각을 $$-\mathbf{k}$$만큼 평행이동 시켜 원점의 단위 큐브로 옮긴다.<br>
>$$T_{\mathbf{k}}=S_{\mathbf{k}}-\mathbf{k}\subseteq [0,1)^n$$<br>
>$$\bigsqcup_{\mathbf{k}}T_{\mathbf{k}}\subseteq [0,1)^n $$<br>
>평행이동은 측도를 보존하기 때문에, $$\sum_{\mathbf{k} \in \mathbb{Z}^n}\mu (T_{\mathbf{k}}) = \sum_{\mathbf{k} \in \mathbb{Z}^n}\mu (S_{\mathbf{k}}) = \mu (S) > 1 = \mu ([0,1)^n)$$<br>
>따라서 $$T_{\mathbf{k}}$$를 단위 큐브 안에 서로소로 넣을 수 없다. (비둘기 집의 원리)<br>
>$$\exists \mathbf{k}_1\ne \mathbf{k}_2 :\ T_{\mathbf{k}_1}\cap T_{\mathbf{k}_2}\ne \emptyset$$<br>
>$$\mathbf{p}\in T_{\mathbf{k}_1}\cap T_{\mathbf{k}_2}$$ 라고 두면, $$\mathbf{p} + \mathbf{k}_1 \in S_{\mathbf{k}_1}\subseteq S,\quad \mathbf{p} + \mathbf{k}_2 \in S_{\mathbf{k}_2}\subseteq S$$<br>
>이때, $$\mathbf{x}-\mathbf{y} = \mathbf{k}_1 - \mathbf{k}_2 \in \mathbb{Z}^n$$이고 $$\mathbf{k}_1 \ne \mathbf{k}_2$$이므로 $$\mathbf{x}\ne \mathbf{y}$$가 성립한다.
{: .prompt-info}

>Lemma 2.(Minkowski's Theorem) <br>
>
>격자 $$\mathcal{L} \subset \mathbb{R}^n$$과 볼록 대칭 집합(symmetric convex set) $$S \subset \mathbb{R}^n$$에 대하여<br>
>$$\mbox{vol}(S)>2^n \mbox{det}(\mathcal{L})$$이라면 $$S$$는 적어도 하나 이상의 **영이 아닌** 격자점을 포함한다.
{: .prompt-tip}

>Proof<br>
>격자 $$\mathcal{L}(B)$$에 대한 기본 단위 평행체는 $$\mathcal{F}=\{B\mathbf{x} : \mathbf{x}\in [0,1)^n \},\quad \mbox{vol}(\mathcal{F}) = \mbox{det}(\mathcal{L(B)})$$를 만족<br>
>동시에 $$\frac{1}{2}S=\{\frac{1}{2} \mathbf{x} : \mathbf{x}\in S \}$$를 정의할 수 있고, $$\frac{1}{2}S$$는 다음을 만족한다.<br>
>$$\mbox{vol}(\frac{1}{2}S) = \frac{1}{2^n}\mbox{vol}(S) > \frac{1}{2^n}\cdot 2^n \mbox{det}(\mathcal{L}) = \mbox{det}(\mathcal{L}) = \mbox{vol}(\mathcal{F})$$<br>
>$$\mbox{vol}(\frac{1}{2}S) > \mbox{vol}(\mathcal{F})$$ 이므로 Lemma 1에 의해, $$\exists \mathbf{u}, \mathbf{v} \in \frac{1}{2}S,\ (\mathbf{u}\ne \mathbf{v}) \mbox{ s.t. } \mathbf{u}- \mathbf{v} \in \mathcal{L}(B)$$<br>
>$$\mathbf{u}, \mathbf{v} \in \frac{1}{2}S$$ 이므로 $$\mathbf{u}=\frac{1}{2}\mathbf{x}, \mathbf{v}=\frac{1}{2}\mathbf{y}$$ 인 $$\mathbf{x}, \mathbf{y} \in S$$가 존재한다.<br>
>$$S$$가 대칭 볼록 집합이므로 $$-\mathbf{y} \in S$$이고 $$\mathbf{u}-\mathbf{v} = \frac{\mathbf{x}-\mathbf{y}}{2} = \frac{\mathbf{x}+(-\mathbf{y})}{2} \in S$$<br>
>또한, $$\mathbf{u}\ne \mathbf{v}\ \Rightarrow \ \mathbf{u} - \mathbf{v} \ne \mathbf{0} $$<br>
>따라서 $$S$$에는 영이 아닌 격자점이 존재한다.
{: .prompt-info}

보조정리 두 개를 알아봤으니 이제 정리 3에 대해서 증명하겠다.

>Theorem 3. <br>
>
>$$\lambda (\mathcal{L}(B)) \leq \sqrt{n}\cdot \mbox{det}(B)^{1/n}$$
>
{: .prompt-tip}

>Proof<br>
>우선 다음의 길이를 정의한다. $$l:= \min\{ \Vert \mathbf{x} \Vert_{\infty} : \mathbf{x}\in \mathcal{L}(B)\setminus \{0\} \}$$<br>
>그리고 한 변의 길이가 $$2l$$인 $$n$$차원의 도형 $$C:=\{ (x_1,\ x_2,\ ...,\ x_n) \vert -l < x_i < l \}$$을 정의한다.<br>
>(귀류법 사용) 만약 $$l > \mbox{det}(B)^{1/n}$$이라면,<br>
>$$\mbox{vol}(C) = (2l)^n > 2^n\mbox{det}(B)$$ 가 성립하므로 Lemma 2.에 의해 $$C$$안에 영이 아닌 격자점 $$\mathbf{t}$$가 존재한다. <br>
>그런데 $$\mathbf{t}\in C$$이므로 $$C$$정의에 의해 $$\Vert \mathbf{t} \Vert_{\infty} < l$$이고 <br>
>$$l$$의 정의에 의해 모든 격자점의 $$L_{\infty}$$ norm은 $$l$$보다 크거나 같아야 한다. 즉, $$\Vert \mathbf{t} \Vert_{\infty} \geq l$$ <br>
>$$\Vert \mathbf{t} \Vert_{\infty} < l$$ 이면서 $$\Vert \mathbf{t} \Vert_{\infty} \geq l$$일 수 없으니 모순이다.<br>
>따라서 $$l \leq \mbox{det}(B)^{1/n}$$이다. <br>
>동시에 다음의 관계식이 만족하니 $$\Vert \mathbf{x} \Vert_2 = \sqrt{\sum_{i}x_i^2} \leq \sqrt{\sum_{i}\Vert \mathbf{x} \Vert_{\infty}^2} = \sqrt{n}\cdot \Vert \mathbf{x} \Vert_{\infty}$$ <br>
>$$\Vert \mathbf{x}^* \Vert_{\infty} = l$$를 만족하는 $$\mathbf{x}^*$$에 대해서<br>
>$$\lambda (\mathcal{L}(B)) \leq \Vert \mathbf{x}^* \Vert_2 \leq \sqrt{n}\cdot \Vert \mathbf{x}^* \Vert_{\infty} = \sqrt{n} \cdot l \leq \sqrt{n} \cdot \mbox{det}(B)^{1/n}$$ 가 성립한다.
{: .prompt-info}

<br>
<br>

## 5. Lattice Hard problems

격자를 기반으로 한 난해한 문제 몇 가지를 소개하고자 한다.

$$1.$$ SVP(Shortest Vector Problem) : 주어진 격자 기저 $$B$$에 대해서 가장 짧은 영이 아닌 격자점을 찾는 문제.

$$
\mathbf{0}\ne \mathbf{v} \in \mathcal{L}(B), \quad \Vert \mathbf{v} \Vert = \lambda (\mathcal{L}(B))
$$

$$2.$$ SVP$$_\gamma$$ : 주어진 격자 기저 $$B$$에 대해서 적당한 오차 $$(\gamma \geq 1)$$ 내에서 가장 짧은 영이 아닌 격자점을 찾는 문제.

$$
\mathbf{0}\ne \mathbf{v} \in \mathcal{L}(B), \quad \Vert \mathbf{v} \Vert \leq \gamma \cdot \lambda (\mathcal{L}(B))
$$

$$3.$$ GapSVP$$_\gamma$$ : 주어진 격자 기저 $$B$$와 양의 실수 $$d$$에 대해서 가장 짧은 영이 아닌 격자점까지의 거리가 어느 구역에 속해있는지를 판단하는 문제.

$$
\mbox{Determine if }\lambda (\mathcal{L}(B)) \leq d \mbox{ or } \lambda (\mathcal{L}(B)) > \gamma d
$$

$$3.$$ CVP$$_\gamma$$(Closest Vector Problem) : 주어진 격자 기저 $$B$$와 벡터 $$\overrightarrow{t}\notin \mathcal{L}(B)$$에 대해서 다음을 만족하는 벡터 $$\overrightarrow{v} \in \mathcal{L}(B)$$를 찾는 문제

$$
\Vert \overrightarrow{t} - \overrightarrow{v} \Vert \leq \gamma \min_{\overrightarrow{x} \in \mathcal{L}(B)} \Vert \overrightarrow{t} - \overrightarrow{x} \Vert
$$


위 네 문제 간에는 어떤 관계가 있다.

- 어떤 $$\gamma$$에 대해서 SVP$$_\gamma$$문제를 해결할 수 있다면, GapSVP$$_\gamma$$를 해결할 수 있다. (SVP$$_\gamma$$ $$\succeq$$ GapSVP$$_\gamma$$)

- $$\gamma = 1$$에 대해서 GapSVP$$_1$$문제를 해결할 수 있다면, SVP$$_1$$를 해결할 수 있다. (SVP$$_1$$ $$\preceq$$ GapSVP$$_1$$)

- 그런데 $$\gamma \ne 1$$에 대해서 GapSVP$$_1$$문제를 해결할 수 있다면, SVP$$_1$$를 해결할 수 있는지에 대해서는 아직 밝혀지지 않았다.

- 어떤 $$\gamma$$에 대해서 CVP$$_\gamma$$문제를 해결할 수 있다면, SVP$$_\gamma$$를 해결할 수 있다. (SVP$$_\gamma$$ $$\preceq$$ CVP$$_\gamma$$)

SVP$$_\gamma$$문제에 대해서 조금 더 자세히 이야기 해볼만 한 것이 있는데, $$\gamma$$가 1에 수렴할 수록 문제의 난이도는 어려워지는 것은 자명하다.

그렇기 때문에 이를 암호화에 적용하면 보안성이 뛰어난 암호를 만들 수 있을 것이다. 그런데 중요한 것은 암호화란 결국 복호화와 함께 가는 것이기 때문에, 복호화 비용이 많이 든다면 암호시스템 관점에서 효율적이라고 말할 수 없을 것이다.

<br>

포스트를 작성하다보니 내용이 길어져 이후 내용은 다음 포스트에서 다루도록 하겠다.

다음 포스트에서 다룰 내용은 CVP, SVP문제를 해결하는 알고리즘인 Babai's Nearest Plane Algorithm과 또다른 격자 문제인 Short Integer Solution problem(SIS), Learning with Errors problem(LWE)에 대해서 알아보고 이 두 문제들을 암호 시스템에 어떻게 적용하는지에 대해서 알아보도록 하겠다.

<br>
<br>

후기) 이번 포스트는 분량 조절 실패입니다... 양자 내성 암호 중 격자 기반 문제들을 소개하는 과정에서 이해에 도움을 드리기 위해 격자란 무엇인가부터 다뤄봤는데, 이것저것 너무 많은 수식들이 필요했던 것 같습니다... 아마 다음 포스트에서 양자 내성 암호부분을 마지막으로 양자컴퓨팅에 관한 포스팅은 끝마칠 것 같은데, 작년에 일이 너무 바빠서 반년만에 주제를 끝내게 될 것 같습니다.
<br>
다음 카테고리는 컴퓨터 자료구조 그리고 알고리즘 정도가 될 것 같습니다. 여러 분야를 다루는 블로그인만큼 주제의 비중을 균등하게 가져가야 한다는 생각은 갖고 있기 때문에, 다음 카테고리를 다루는 부분부터는 여러 카테고리의 내용을 동시에 다루고자 합니다.
<br>
긴 글 읽어주셔서 감사합니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***