---
title: 005-계량경제학 Gauss Markov Theorem
date: 2025-02-12 17:06:00 +0900
categories: [계량경제학, Gauss Markov Theorem]
tags: [econometric, gauss markov theorem, classical assumption, blue]
author: rachihyeon 
description: Gauss Markov Theorem에 대해 설명합니다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

이번에는 Gauss Markov Theorem에 대해서 다룹니다.

## 0. Prerequisite

우리는 [이전 포스트](/posts/004-계량경제학-Regression/)에서 회귀분석의 계수를 계산하는 방법을 알아보았습니다.

그렇다면 $$\hat{\beta }=\left(X'X\right)^{-1}X'Y$$이 값이 좋은 값인지에 대해서 우선 증명해 볼 필요가 있습니다.<br>
이에 대한 정리를 Gauss Markov Theorem라고 합니다.

<br>
<br>
<br>

## 1. Projection

우리는 기존 데이터에 $$\hat{\beta }$$을 결합하여 $$\hat{Y }$$를 얻을 수 있다.<br>
수식으로 작성하면 아래와 같다.

$$
\begin{align}
\hat{Y}=X\hat{\beta}=X(X'X)^{-1}X'Y=P_XY
\end{align}
$$

라고 할 때, $$P_X=X(X'X)^{-1}X'$$이고 이는 $$Y$$를 $$span(X)$$로의 사영(Projection)할 때 사용되는 선형 변환이라고 할 수 있다.<br>
그리고, 이에 대한 성질이 두 가지가 있다.

>1. $$P_X$$는 대칭$$(P_X'=P_X)$$
>2. $$P_X$$는 멱등$$(P_XP_X=X(X'X)^{-1}X'X(X'X)^{-1}X'=X(X'X)^{-1}X'=P_X$$
{: .prompt-info}

이로부터 $$\hat{Y}$$는 regrssion space의 원소임을 알 수 있다.

추가적으로, $$I-P_X$$역시 멱등성을 지닌다. $$M_X=I-P_X$$라고 하고 잔차($$e$$)에 대해 식을 정리해보자.

$$
\begin{align}
&(I-p_X)(I-p_X)=I-P_X-P_X+P_XP_X=I-P_X \\
e&=Y-\hat{Y}=Y-P_XY=(I-P_X)Y=M_X(X\beta^*+\epsilon)=M_XX\beta^*+M_X\epsilon \\ 
 &=(I-P_X)X\beta^*+M_X\epsilon=X\beta^*-P_XX\beta^*+M_X\epsilon \\ 
 &=X\beta^*-X(X'X)^{-1}X'X\beta^*+M_X\epsilon \\
 &=X\beta^*-X\beta^*+M_X\epsilon \\
 &=M_X\epsilon \\
 &\Rightarrow e=M_X\epsilon \\
\end{align}
$$

이로부터 오차를 $$span(X)$$와 직교하는 $$Y$$의 부분공간으로 사영하면 잔차가 된다는 것을 알 수 있다.

<br>

### 1-1. Estimator

이 섹션에서는 추정량이 가져야 할 몇 가지 성질을 설명한다.

1. 불편(Unbiased)<br>
>$$E(\hat{\beta})=\beta^*$$이면 $$\hat{\beta}$$를 불편 추정량이라고 한다.

2. 일치(Consistent)<br>
>$$\underset{n\to \infty}{\mathrm{plim}}{\hat{\beta}}=\beta^*$$ or $$\underset{n\to \infty }{lim}\hat{\beta } \xrightarrow {p}\beta^*$$이면 $$\hat{\beta}$$를 일치 추정량이라고 한다.

3. 유효(Efficient)<br>
>***불편추정량***들 중 variance가 가장 작은 것을 유효추정량이라고 한다.

>유효추정량과 최소분산불편추정량은 같은 말이다.
{: .prompt-tip}

<br>

### 1-2. MSE(Mean Squared Error)

불편량인지 일치량인지를 동시에 구분해내는 방법 중 하나가 MSE이다.<br>
MSE를 수식으로 작성하면 아래와 같다.

$$
\begin{align}
MSE({\hat{\beta}})&=E[(\hat{\beta }-\beta )^2]=E[(\hat{\beta }-\overline {\hat{\beta }}+\overline {\hat{\beta }}-\beta )^2]\\ 
&=E\left[\left(\hat{\beta }-\overline {\hat{\beta }}\right)^2+\left(\overline {\hat{\beta }}-\beta \right)^2+2\left(\hat{\beta }-\overline {\hat{\beta }}\right)\left(\overline {\hat{\beta }}-\beta \right)\right]\\ 
&=E\left[\left(\hat{\beta }-\overline {\hat{\beta }}\right)^2\right]+E\left[\left(\overline {\hat{\beta }}-\beta \right)^2\right]+E\left[2\left(\hat{\beta }-\overline {\hat{\beta }}\right)\left(\overline {\hat{\beta }}-\beta \right)\right]\\ 
&=E\left[\left(\hat{\beta }-\overline {\hat{\beta }}\right)^2\right]+\left(\overline {\hat{\beta }}-\beta \right)^2+2\left(\overline {\hat{\beta }}-\beta \right)E\left[\left(\hat{\beta }-\overline {\hat{\beta }}\right)\right]\\ 
&=V\left(\hat{\beta }\right)+\left(\overline {\hat{\beta }}-\beta \right)^2=V\left(\hat{\beta }\right)+\left(bias\right)^2
\end{align}
$$

이 식으로부터 MSE 값이 작을 수록 모수와 추정량 간의 오차가 작다는 것을 의미하기 때문에 더 좋은 추정량이라고 할 수 있다.

<br>
<br>

## 2. Gauss Markov Theorem

이 섹션에서는 Gauss Markov Theorem를 위한 가정부터 증명과정까지를 다룬다.<br>
사실 위에서 Gauss Markov Theorem는 $$\hat{\beta}$$가 좋은 값이라는 정리라고만 말했는데 구체적으로 말하자면, $$\hat{\beta}$$가 최소분산불편추정량이라는 정리이다.

<br>

### 2-1. Classical Assumption

모형으로부터 얻은 계수가 좋은 값이라는 것을 증명하기 위해 아래 다섯가지 가정이 필요하다.

0. $$X_t$$는 **not random**, $$\epsilon_t$$는 **random**이다.

1. $$E[\epsilon_t]$$=0

2. $$Var[\epsilon_t]=\sigma^2$$, *homoskedasticity*

3. $$Cov(\epsilon_t, \epsilon_s)=0, for \ \  t \ne s$$, *no serial correlation*

4. $$\epsilon_t\sim N(0, \sigma^2)$$.

<br>

### 2-2. Statistical Properties

여기선 증명에 필요한 값들을 계산한다.

1. Unbiasedness

$$
\begin{align}
E\left[\hat{\beta }\right]&=E\left[\left(X'X\right)^{-1}X'Y\right] \\
&=E\left[\left(X'X\right)^{-1}X'\left(X\beta +\epsilon \right)\right] \\
&=E\left[\left(X'X\right)^{-1}X'X\beta +\left(X'X\right)^{-1}X'\epsilon \right] \\
&=E\left[\beta +\left(X'X\right)^{-1}X'\epsilon \right]\\ 
&=\beta +\left(X'X\right)^{-1}X'E\left[\epsilon \right]\ \ \ by\ A0 \\
&=\beta \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ \ by\ A1 \\
\end{align}
$$

2. Variance

$$
\begin{align}
Var\left(\hat{\beta }\right)&=Var\left(\beta +\left(X'X\right)^{-1}X'\epsilon \right)\\ 
&=Var\left(\beta \right)+Var\left(\left(X'X\right)^{-1}X'\epsilon \right)+2Cov\left(\beta ,\ \left(X'X\right)^{-1}X'\epsilon \right)\\ 
&=0+Var\left(\left(X'X\right)^{-1}X'\epsilon \right)+0\\ 
&=\left(X'X\right)^{-1}X'V\left(\epsilon \right)X\left(X'X\right)^{-1}\ \ by\ A2,\ A3\\ 
&=\left(X'X\right)^{-1}X'\sigma ^2X\left(X'X\right)^{-1}\\ 
&=\sigma ^2\left(X'X\right)^{-1}
\end{align}
$$

<br>

### 2-3. 정리

>가정 A1, A2, A3가 만족되면 OLS(Ordinary Least Squares) 추정량은 선형 불편추정량 중 가장 작은 분산 값을 갖는다.
{: .prompt-tip}

증명.

임의의 선형 불편추정량을 $$\tilde{\beta }$$라고 하자.<br>
그러면 $$\tilde{\beta }=CY$$이고, $$E(\tilde{\beta })=\beta^*$$이다.

$$
\begin{align}
&Var\left(\tilde{\beta }\right)=Var\left(CY\right)=CVar\left(Y\right)C'=\sigma ^2CC'\\ 
&Let\ A=C-\left(X'X\right)^{-1}X',\\ 
&C=C-\left(X'X\right)^{-1}X'+\left(X'X\right)^{-1}X'=A+\left(X'X\right)^{-1}X'\\ 
\\ 
\Rightarrow \sigma ^2CC'&=\sigma ^2\left(A+\left(X'X\right)^{-1}X'\right)\left(A+\left(X'X\right)^{-1}X'\right)'\\ 
&=\sigma ^2\left(AA'+AX\left(X'X\right)^{-1}+\left(X'X\right)^{-1}X'A'+\left(X'X\right)^{-1}\right)\\ 
\\ 
&\beta =E\left(\tilde{\beta }\right)=E\left(CY\right)=E\left(CX\beta +C\epsilon \right)=CX\beta +0로부터\\ 
&CX=I,\ \ \ AX=CX-\left(X'X\right)^{-1}X'X=0\\ 
&\Rightarrow \sigma ^2CC'=\sigma ^2\left(AA'+0+0+\left(X'X\right)^{-1}\right)\\ 
&\Rightarrow Var\left(\tilde{\beta }\right)-Var\left(\hat{\beta }\right)=\sigma ^2AA'\\ 
\end{align}
$$

그리고, $$AA'$$는 positive semi-definite이기 때문에 $$Var\left(\tilde{\beta }\right)\succcurlyeq Var\left(\hat{\beta }\right)$$가 만족된다.

따라서, OLS추정량은 **BLUE(Best Linear Unbiased Estimator)**이다.

<br>
<br>

## 3. 검정(Test)

가설 검정이란. 우리가 얻은 값을 받아들일 수 있는 기준을 세워 판단하는 것을 의미한다.<br>
이때 우리는 두 가지 기준을 세운다. 하나는 귀무가설(Null Hypothesis), 다른 하나는 대립가설(Alternative Hypothesis)이다.

귀무가설은 처음부터 버릴 것을 예상하고 세우는 가설이다. 따라서 검정 단계에서 맞거나 맞지 않은지를 증거를 통해 증명하려는 가설이다.$$H_0$$라고 표기한다.<br>
대립가설은 입증되기를 바라는 가설이다. $$H_a$$ or $$H_1$$라고 표기한다.

<br>

### 3-1. 1형 오류, 2형 오류(Type I, II Errors)

| |Accept|Reject| |
|:---:|:---:|:---:|
|True|OK|type I error|
|False|type II error|OK|

위 표와 같이 True statements인데 reject하는 경우를 type I error라고 한다. <br>
그리고 False statements인데 accept하는 경우를 type II error라고 한다.

>| |Accept|Reject| |
>|:---:|:---:|:---:|
>|True|True Positive(TP)|True Negative(TN)|
>|False|False Positive(FP)|False Negative(FN)|
>
>라고도 표현합니다.
{: .prompt-tip}

<br>
<br>

후기) 검정에 대해서는 나중에 포스팅할 기회가 있으면 예시와 함께 작성하겠습니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***