---
title: 011-계량경제학 이분산성(Heteroskedasticity)
date: 2025-03-06 22:30:00 +0900
categories: [계량경제학, Heteroskedasticity]
tags: [econometric, heteroskedasticity, white noise, pink noise, homoskedasticity, breusch-pagan test, white test, lm test]
author: rachihyeon 
description: Classical assumption에서 등분산성(homoskedasticity)의 판단을 어떻게 해야 하는지를 다룹니다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[계량경제학 포스트 보러가기](/categories/계량경제학/)

## 0. Introduces

신호처리이론에서 백색소음, 핑크소음이라는 것이 있다. 백색소음이야 우리가 여기저기에서 들어봤지만 핑크소음은 생소하다.

백색소음이란 음의 높낮이에 무관하게 일정하게 발생하는 소음이다.

핑크소음이란 음의 높낮이가 커질수록 소음의 크기가 작아지는 소음이다.

이 얘기를 왜 했냐하면... 우리가 [OLS 추정량을 계산할 적에 했던 가정들](/posts/005-계량경제학-Gauss-Markov-Theorem/#2-1-classical-assumption)에서 등분산성 조건을 세웠지만, 실제 연구에서는 그렇지 않은 경우가 많다.

여기서, 분산이 무작위적으로 발생한다면 뭐... 이건 치료의 방도가 없다. 그래서 핑크소음이 되도록, 다시 말해 이분산성 문제가 발생하더라도 그 크기가 작도록 모델링을 해야한다는 것이다.

이번 포스트에서는 등분산성 조건이 깨지게 된다면 어떤 변화가 있는지와 등분산성 조건을 검사하는 방법을 알아보겠다.

>조건부 기댓값으로 세운 가정도 있지만 그냥... 귀찮으니까 원래 했던 가정으로 진행한다. 조건부 기댓값으로 해도 변하는 것은 없다.
{: .prompt-info}

<br>
<br>
<br>

## 1. 등분산성 조건 제거

등분산성 조건을 제거하면 ols estimator에 어떤 변화가 생기는지 알아봐야한다. 

등분산성 조건이 깨지게 된다면 $$E(\epsilon_t^2)=\sigma_t^2 \ne \sigma^2$$라고 쓸 수 있다.

<br>

### 1-1. Expectation

불편성 먼저 체크해보면,

$$
\begin{align}
\hat{\beta}&=(X'X)^{-1}X'Y=(X'X)^{-1}X'(X\beta+\epsilon) \\
&\beta+(X'X)^{-1}X'\epsilon \\
& \\
E[\hat{\beta}]&=E[\beta+(X'X)^{-1}X'\epsilon] \\
&=\beta+(X'X)^{-1}X'\epsilon \\
&=\beta
\end{align}
$$

불편추정량임은 변하지 않는다.

<br>

### 1-2. Variance

분산을 계산해보자.

$$
\begin{align}
Var(\hat{\beta})&=Var(\beta+(X'X)^{-1}X'\epsilon) \\
&=Var((X'X)^{-1}X'\epsilon) \\
&=(X'X)^{-1}X'E(\epsilon \epsilon')X(X'X)^{-1} \\
&\ne (X'X)^{-1}X'\sigma^2 I X(X'X)^{-1} \\
&=\sigma^2(X'X)^{-1} \\
\end{align}
$$

variance는 달라졌다.

해석해보면 $$\hat{\beta}$$ 는 unbiased이지만 best는 아니다. 따라서 <span style="color : red;">BLUE가 아니다.</span><br>
$$\hat{\sigma^2}(X'X)^{-1}$$을 사용한 어떠한 계산도 유효하지 않게 된다.

그럼 이제 이것이 발생했는지를 검사하는 방법이 필요하다. 다음 섹션에서는 어떻게 이분산성을 검사하는지 방법을 제안한다.

<br>
<br>

## 2. 이분산성 검정

우리는 [지난 표스트에서 분포 근사](/posts/010-계량경제학-사건과-확률/#3-2-분포-근사)에 대해서 알아 보았다.

$$
\begin{align}
&\sqrt{T}(\hat{\beta}-\beta^*)=(\frac{1}{T} \sum _{t=1}^{T} X_tX_t')^{-1}\frac{1}{\sqrt{T}}\sum _{t=1}^{T} X_t\epsilon_t \overset{d}{\to} Q^{-1}N(0, \sigma^2Q) \\
\end{align}
$$

이게 그 결과였는데, 이분산성 조건이 깨지게 되면 수렴하는 분포의 분산이 달라진다.<br>
따라서 다시 작성하면, 

$$
\begin{align}
&\sqrt{T}(\hat{\beta}-\beta^*) \overset{d}{\to} Q^{-1}N(0, V)=N(0, Q^{-1}VQ^{-1}) \\
\end{align}
$$

가 된다.

여기서 $$Q=E(XX')$$지만, 모르니까 추정량으로 $$\hat{Q}=\frac{1}{T}\sum _{t=1}^{T}X_tX_t'$$를 사용한다. <br>
또한 $$V=E(\epsilon_t^2 XX')$$지만, 모르니까 추정량으로 $$\hat{V}=\frac{1}{T}\sum _{t=1}^{T} e_t^2 X_tX_t'$$를 사용한다. <br>
여기서 $$e$$는 잔차이다.

최종적으로,

$$
\begin{align}
\hat{\beta} \overset{d}{\to} N(\beta^*, (X'X)^{-1}\sum _{t=1}^{T} e_t^2 X_tX_t'(X'X)^{-1})
\end{align}
$$

이다.

<br>

### 2-1. Breusch-Pagan Test (LM Test)

OLS estimator의 분포도 알았겠다. 진짜 검정 방법을 알아보자.

일단 이분산성의 발생이 설명변수에 의해 변화한다고 가정해보자.

적당한 변수 $$\eta_t \equiv \epsilon_t^2-E(\epsilon_t^2 \vert X_t)$$잡아서 분산의 모델을 세우면,<br>
$$\sigma_t^2(X_t)=\alpha_0^*+\alpha_1^*X_t$$이고 이분산성 검정을 위한 귀무가설과 대립가설을 세워보면,

$$
\begin{align}
H_0 &: \mathrm{homoskedasticity} (\alpha_1^* = 0) \\
H_1 &: \mathrm{heteroskedasticity} (\alpha_1^* \ne 0) \\
\end{align}
$$

하지만 이 모델을 갖고 회귀분석을 하기에는 무리가 있다. 왜냐하면 오차항을 계산해낼 수 없기 때문이다. 따라서 우리는 잔차를 사용하여 오차항을 대신한다.

>1. $$Y_t=X_t\beta+\epsilon_t$$ regression 후 $$e_t$$계산
>2. $$e_t^2=X_t\alpha + \eta_t$$ regresstion
>3. [분포 근사](/posts/010-계량경제학-사건과-확률/#3-2-분포-근사)를 이용한 검정통계량 $$\frac{\hat{\alpha}}{s.e.(\hat{\alpha})} \sim N(0, 1)$$를 사용한다. (여기서 $$s.e.$$는 표준 오차를 의미한다.)
{: .prompt-info}
<br>

하지만 일반적으로 설명변수의 개수는 $$k>1$$이다. 따라서 위 방식으로 검정할 경우 어떤 변수가 이분산성에 영향을 미치는지 알 수가 없다. (두 개 이상일 수도 있으니... 경우의 수가 많아진다.)

또한, $$\eta$$를 정의할 때 사용했던, $$E(\epsilon_t^2 \vert X_t)$$의 형태를 알 수가 없다.

따라서 새로운 방법이 필요하다. <br>
이에, Trevor Breusch과 Adrian Pagan은 새로운 검정 방법을 제안했다.

>1. $$Y_t=X_t\beta+\epsilon_t$$ regression 후 $$e_t$$계산
>2. $$e_t^2=Z_t\alpha + \eta_t$$ regresstion
>3. 2번의 regression결과의 $$R^2$$값을 계산하여 $$T\dot R^2 \sim \mathcal{X}^2(\operatorname{dim}(Z))$$을 사용하여 검정한다. 여기서 $$T$$는 데이터의 수 이고 $$\operatorname{dim}(Z)$$는 2번 regression에서의 설명변수의 개수이다.
{: .prompt-info}

이 방법에서는 귀무가설과 대립가설을 아래와 같이 쓸 수 있다.

$$
\begin{align}
H_0 &: \mathrm{homoskedasticity} : (\alpha_1^* =\alpha_2^* =\dots=\alpha_k^* = 0) \\
H_1 &: \mathrm{heteroskedasticity} : \sim H_0 \\
\end{align}
$$

<br>

### 2-2. White test

그리고 Halbert White가 제안한 검정 방법도 있다. 대체로 위 방식들과 비슷하지만 보조 회귀분석식이 다르다.

>1. $$Y_t=X_t\beta+\epsilon_t$$ regression 후 $$e_t$$계산
>2. $$e$$를 종속변수로, $$X$$와 제곱식, 상호작용항을 독립변수로 보조 회귀분석식 설계 후 regression
>3. 2번의 regression결과의 $$R^2$$값을 계산하여 $$T\cdot R^2 \sim \mathcal{X}^2(\mathrm{귀무가설의 제약조건 개수})$$을 사용하여 검정한다.
{: .prompt-info}

예를 들어서 설명변수가 $$X_1, X_2$$뿐이라 하면 보조 회귀분석식은 $$e^2=\alpha_0+\alpha_1X_1+\alpha_2X_2+\alpha_3X_1^2+\alpha_4X_2^2+\alpha_5X_1X_2+\eta$$가 된다.<br>
이때, 제약식은 $$\alpha_1=\alpha_2=\alpha_3=\alpha_4=\alpha_5=0$$으로 총 5개이다.

이렇듯, 이분산성 검정에 대한 방법은 여러 가지가 있다. 실제 데이터를 분석할 적에, 한 가지 방법만으로 판단하기 보다는 여러 방법을 시도하여 판단하는 것이 연구의 신뢰도를 높일 수 있는 방법이 될 것이라고 생각한다.

<br>
<br>

후기) 학기가 시작하여 포스팅 주기가 점점 길어지겠지만 꾸준히 해보겠습니다. 읽어주셔서 감사합니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***