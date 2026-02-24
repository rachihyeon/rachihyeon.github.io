---
title: 계량경제학 9 - 다중공선성(Multicollinearity)
date: 2025-02-17 21:00:00 +0900
categories: [계량경제학, Multicollinearity]
tags: [econometric, multicollinearity, correlogram, vif, 다중공선성, 상관도표]
author: rachihyeon 
description: 회귀모델에서 다중공선성이 발생하면 어떤 문제가 발생하는지, 어떻게 판단하는지에 대해 다룹니다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

<br>

[계량경제학 포스트 보러가기](/categories/계량경제학/)

## 0. Introduction

우리가 회귀모델을 세울 적에, $$X_i$$간에 연관성이 존재하지 않아 각각 $$Y$$를 독립적으로 잘 설명하기를 기대한다. <br>
하지만, 실제 세계에서는 그런 가정이 깨지기 매우 쉽다. <br>
가령 아파트의 가격을 예측하는 모델을 세운다고 가정했을 때, 설명변수로는 주변 상가의 가치, 학교의 수 등이 있을 수 있는데, 주변 상가의 가치와 학교의 수 간의 상관관계가 없다고 확신할 수 없기 때문에 다중공선성을 확인해봐야 하는 것이다.

물론, 회귀분석을 진행 한 뒤 [아래에서 다룰 판단방법](/posts/009-계량경제학-Multicollinearity/#2-vifvariance-inflation-factor)으로 의심이 드면 처지하면 된다.

<br>
<br>
<br>

## 1. Multicollinearity

다중공선성이란, input data의 explanatory variable($$X_i$$)간에 강한 상관관계가 있는 것을 말한다.

그렇다면, 이게 왜 문제가 되는지 알아보겠다.

다중공선성을 가진 모델의 경우 $$R^2$$값은 높으나 t값은 낮게 나오는 특징이 있다.<br>
이는 모델의 적합도는 매우 높으나 계수의 중요성이 떨어질 가능성을 의미한다.<br>
그래서 올바른 모델이라고 하기 어렵다는 것이 문제다.

<br>

### 1-1. Correlogram

설명변수간의 correlation coefficient를 나타내는 corelogram이라는 것이 있다.

이 값이 1이면 perfect라고 표현하고, 1에 근사하다면 near라고 표현한다.

ex)

|       |$$X_1$$|$$X_2$$|$$X_3$$|$$X_4$$|
|:-----:|:-----:|:-----:|:-----:|:-----:|
|$$X_2$$|0.1    |1      |       |       |
|$$X_3$$|0.2    |0.7    |1      |       |
|$$X_4$$|-0.1   |-0.3   |-0.2   |1      |

>Rule of Thumb : $$\vert C\vert >0.7$$ 이면, 심각한 다중공선성이 존재한다고 본다.
{: .prompt-tip}

<br>
<br>

## 2. VIF(Variance Inflation Factor)

다중공선성이 뭔지도 알겠고 corelogram도 알았지만, 이것은 명확한 근거가 되기에 부족한 감이 있다. 따라서 또다른 판단의 근거가 되는 지표를 알아보자.

VIF란, 다중공선성이 있는 모델의 경우 추정된 계수의 variance가 증폭된다는 것을 사용한다.<br>
접근 방식으로는, 한 설명변수가 다른 설명변수로 설명될 수 있는지를 판단한다. 

순서는 다음과 같다.

>$$1$$. 우선 각 설명변수 $$X_i$$에 대해 그 외의 설명변수로 regression을 진행한다. 

$$
X_{1i}=\alpha_1+\alpha_2X_{2i}+\cdots +\alpha_k X_{ki}+\nu_i
$$

>$$2$$. Regression을 통해 얻은 계수 $$\hat{\beta_i}$$에 대해 VIF를 계산한다.

$$
VIF(\hat{\beta_i})=\frac{1}{1-R^2_i}
$$

>이때 $$R^2_i$$는 1번에서의 보조 회귀분석의 $$R^2$$값이다.
{: .prompt-info}

>$$3$$. 계산한 $$VIF(\hat{\beta_i})$$값으로 다중공선성의 정도를 분석한다.

>Rule of Thumb : $$VIF(\hat{\beta_i})>5$$ 이면, 심각한 다중공선성이 존재한다고 본다.
{: .prompt-tip}

<br>

### 2-1. VIF 파헤치기

1번에서 세운 식을 보면, 하나 알 수 있는 것이 있다. 벡터의 종속성 독립성을 판단할 때 세우는 식과 동일 한 것을 알 수 있다.(오차항이 있지만 일단 무시)<br>
벡터가 종속이라는 것은 한 벡터가 다른 벡터들의 선형결합으로 표현 가능하다는 것이다. 1번에서 세운 식에서 종속성을 얘기해본다면, 계수 해가 존재하면 종속이다.<br>

계수 해가 존재하면 $$X_i$$로 구성된 행렬 $$X$$가 **not full rank**이고 선형계에서 무수히 많은 해를 가지게 된다. <br>
이는 계수의 variance가 커짐을 의미하고 $$\nu_i$$를 0에 수렴하게 한다. <br>
이게 무슨 의미냐 하면, $$X_1$$가 perfect collinearity이면 $$span(\{X_i\})\  (i\ne 1)$$의 원소로 설명 가능하기 때문에 자연스레 오차항인 $$\nu_i$$가 0이 되어야 한다는 것이다.<br>
또한 이런 경우에 VIF값은 $$\infty$$로 간다.

사실 실제 실험에서 perfect collinearity는 찾기 어렵고 near는 발견될 수 있는데, near의 경우 오차항이 아주 작게 되어 VIF값이 크게 나오는 편이다. 그것을 캐치하여 다중공선성을 판단하는 것이다.

>주의. Gauss Markov theorem의 가정에서는 다중공선성 이야기를 하지 않았기 때문에 OLS estimator는 여전히 BLUE이다.
{: .prompt-warning}

아까 위에서 다중공선성이 왜 문제가 되는지 대충 이야기 했었는데 VIF이야기를 아니까 자세히 말해보면,<br>
$$X_1$$이 다른 설명변수들로 적당히 설명 가능하고, 우리가 세운 모델은 $$Y=\alpha_0+\alpha_1X_1+\cdots +\alpha_kX_k+\epsilon$$라고 가정해봅시다.<br>
true모델에서 $$X_1$$이 $$Y$$를 설명할 수 있는 부분이 $$\beta$$만큼 존재할 때, 우리가 세운 모델로부터 regression을 통해 얻은 계수 $$\alpha$$들로부터 적당한 선형결합
$$\beta=p_0+p_1\alpha_0+\cdots+p_{k+1}\alpha_k$$의 해 $$\{p_0, p_1, \cdots , p_{k+1}\}$$가 존재한다. 따라서 $$\alpha_1<\beta$$가 자명하고 우리가 세운 모델에서 $$X_1$$의 설명력을 정확하게 보일 수 없게 된다. 따라서 예측력이 약해짐과 동시에 설명변수를 추가하거나 제거할 때 계수가 크게 변할 수 있어 계수의 안정성이 떨어진다.<br>
이게 문제가 되는 이유다.

### 2-2. Variance 계산

지금까지 게속 variance가 커진다는 이야기를 했는데 사실 와닿지 않을 수 있다. 그래서 간단한 계산을 통해 보이려 한다.

$$
Y=
\begin{bmatrix}
X_1 & X_2
\end{bmatrix}
\begin{bmatrix}
\hat{\beta_1} \\
\hat{\beta_2} \\
\end{bmatrix}
+e
$$

라고 모델을 세우면 Gauss-Markov 정리에 따라

$$
\begin{align}
Var(\hat{\beta})&=\sigma^2(X'X)^{-1}=
\sigma^2
\begin{bmatrix}
    \begin{bmatrix}
    X_1' \\
    X_2' \\
    \end{bmatrix}
    \begin{bmatrix}
    X_1 & X_2
    \end{bmatrix}
\end{bmatrix}^{-1} \notag \\
&=
\sigma^2
\begin{bmatrix}
    X_1'X_1 & X_1'X_2 \\
    X_2'X_1 & X_2'X_2 \\
\end{bmatrix}^{-1} \notag 
\end{align}
$$

여기서 $$\beta_1$$의 variance만 보면

$$
\begin{align}
Var(\hat{\beta_1})&=\sigma^2\frac{X_2'X_2}{(X_1'X_1)(X_2'X_2)-(X_1'X_2)^2} \notag \\
&=\frac{\sigma^2}{(X_1'X_1)[1-\frac{(X_1'X_2)^2}{(X_1'X_1)(X_2'X_2)}]} \notag \\
&=\frac{\sigma^2}{(X_1'X_1)[1-CORR(X_1, X_2)^2]} \notag \\
\end{align}
$$

이다. $$X_1, X_2$$간에 correlation이 강해진다는 것은 collinearity가 생기는 것과 동일한 이야기 이다. 따라서 variance가 $$\sigma^2$$보다는 큰 것을 알 수 있다.

<br>
<br>

후기) Multicollinearity 분석은 실제 연구에서 필수적입니다. 잘 알아두시면 도움이 됩니다...

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***