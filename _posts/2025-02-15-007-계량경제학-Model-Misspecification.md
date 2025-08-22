---
title: 007-계량경제학 Model Misspecification
date: 2025-02-15 15:10:00 +0900
categories: [계량경제학, Model Misspecification]
tags: [econometric, model misspecification, dgp, model selection, aic, bic, 조정된 R제곱]
author: rachihyeon 
description: 모델을 잘못 설계한 경우에 어떤 문제가 발생하며, 어떻게 해결해야하는지에 대한 방법론을 다룹니다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

><span style="font-size: 20px;">**!!필독!!** <br>
>수식편집기의 버그로 수식 번호가 모두 매겨져 있는 경우가 있습니다. <br>
>이 경우 **새로고침(F5)**하여 없앤 후 읽어주시길 바랍니다.</span>
{: .prompt-danger}

<br>

한글로 *오지정*이라고 하는데 단어가 너무 와닿지 않아서 그냥 misspecification이라고 하겠습니다... 😅

[계량경제학 포스트 보러가기](/categories/계량경제학/)

## 0. Prerequisite

우선 [**Regression**](/posts/004-계량경제학-Regression/)과, [**OLS estimator**](/posts/005-계량경제학-Gauss-Markov-Theorem/)에 대해서 보고 오시는 것을 권장드립니다.

<br>
<br>
<br>

## 1. Implicit Assumptions

우리가 모델을 세울 적에 명시하지는 않지만 암묵적으로 하는 가정이 있다.

>1. $$rank(X)=\tilde{k}$$. 
>2. $$X$$와 $$Y$$는 선형관계이다.
>3. 우리는 진짜 모델의 구조를 알고 있다. 즉, True모델이 $$Y_t=\beta_0^*+\beta_1^*x_{t1}+\cdots+\beta_k^*x_{tk}+\epsilon_t$$라면, <br>Regression모델을 $$Y_t=\hat{\beta_0}+\hat{\beta_1}x_{t1}+\cdots+\hat{\beta_k}x_{tk}+e_t$$로 한다는 것이다.

>True모델을 DGP(Data Generating Process)라고 말한다.
{: .prompt-tip}

하지만 이런 가정들이 깨졌을 때는 우리가 추정한 계수들의 신뢰성이 깨지게 된다. 이 포스트에서는 구체적으로 신뢰성이 깨지게 되는 이유에 대해서 수식으로 풀어가려 한다.

<br>
<br>

## 2. Specification Error

예를들어,

$$
\begin{align}
&\mathrm{DGP} : Y_t=\beta_0^*+\beta_1^*x_{t1}+\beta_2^*x_{t2}+\epsilon_t \\
&\mathrm{Regression} : Y_t=\hat{\beta_0}+\hat{\beta_1}x_{t1}+e_t \\
\end{align}
$$

라고 해보자.(필요한 변수 하나를 누락함)

이렇게 되면 $$\hat{\beta_0}, \hat{\beta_1}$$는 편향된다.(**biased**)<br>
또한, 계수와 관련된 어떠한 결론, 추론이 유효하지 않게 된다.(**unvalid**)

<br>

### 2-1. Biased

$$\beta_1$$의 추정량을 계산해보겠다.

$$
\begin{align}
\hat{\beta _1}&=\left(x_1'x_1\right)^{-1}x_1'Y\\ 
&=\left(x_1'x_1\right)^{-1}x_1'\left(\beta _0^*+x_1\beta _1^*+x_2\beta _2^*+\epsilon _t\right) \\ 
&=\left(x_1'x_1\right)^{-1}x_1'\beta _0^*+\beta _1^*+\left(x_1'x_1\right)^{-1}x_1'x_2\beta _2^*+\left(x_1'x_1\right)^{-1}x_1'\epsilon _t \\ 
\\ 
E\left[\hat{\beta _1}\right]&=\left(x_1'x_1\right)^{-1}x_1'\beta _0^*+\beta _1^*+\left(x_1'x_1\right)^{-1}x_1'x_2\beta _2^*\ne \beta _1^* \\
\end{align}
$$

추정량이 변향된 것을 볼 수 있다.

<br>

### 2-2. Variance

이번에는 반대로 모델에 불필요한 변수 하나가 추가됐다고 하자.<br>
일반적으로,

$$
\begin{align}
&\mathrm{DGP} : Y=\beta_0^*+\beta_1^*X_{1}+\beta_2^*X_{2}+\cdots +X_{i-1}\beta _{i-1}^*+X_{i+1}\beta _{i+1}^* +\cdots +X_{k}\beta _{k}^*+\epsilon_t \\
&\mathrm{Regression} : Y=\hat{\beta _0}+X_1\hat{\beta _1}+X_2\hat{\beta _2}+\cdots +X_k\hat{\beta _k}+e_t \\
\end{align}
$$

라고 할 때,

$$
\begin{align}
Y&=\hat{\beta _0}+X_1\hat{\beta _1}+X_2\hat{\beta _2}+\cdots +X_k\hat{\beta _k}+e_t\\ 
&=\hat{\beta _0}+X_1\hat{\beta _1}+X_2\hat{\beta _2}+\cdots +X_k\hat{\beta _k}+\left(I-P_X\right)Y\\ 
&\\
&\mathrm{양변에} \ X_i'\left(I-P_{-i}\right)\mathrm{를\ 곱하면}\\ 
X_i'\left(I-P_{-i}\right)Y&=\ X_i'\left(I-P_{-i}\right)\hat{\beta _0}+X_i'\left(I-P_{-i}\right)X_1\hat{\beta _1}+X_i'\left(I-P_{-i}\right)X_2\hat{\beta _2} \\
&+\cdots+X_i'\left(I-P_{-i}\right)X_k\hat{\beta _k}+X_i'\left(I-P_{-i}\right)\left(I-P_X\right)Y\\ 
\end{align}
$$

이때, $$(I-P_{i})X_j=0\ (\mathrm{for\ } i\ne j)$$이고 $$span(X_{-i})\subseteq span(X)$$이니 $$(I-P_{-i})(I-P_X)=(I-P_X)$$만족<br>
따라서, 

$$
\begin{align}
X_i'\left(I-P_{-i}\right)Y&=\ X_i'\left(I-P_{-i}\right)\hat{\beta _0}+X_i'\left(I-P_{-i}\right)X_1\hat{\beta _1}+X_i'\left(I-P_{-i}\right)X_2\hat{\beta _2} \\
&+\cdots +X_i'\left(I-P_{-i}\right)X_k\hat{\beta _k}+X_i'\left(I-P_{-i}\right)\left(I-P_X\right)Y\\ 
&=X_i'\left(I-P_{-i}\right)X_i\hat{\beta _i}+X_i'\left(I-P_X\right)Y\\ 
&=X_i'\left(I-P_{-i}\right)X_i\hat{\beta _i}\\ 
\Rightarrow \hat{\beta _i}&=\left(X_i'\left(I-P_{-i}\right)X_i\right)^{-1}X_i'\left(I-P_{-i}\right)Y
\end{align}
$$

이고 이것이 우리의 추정량이 된다.

이에 대해서 variance를 구해보면,

$$
\begin{align}
Var\left(\hat{\beta _i}\right)&=Var\left(\left(X_i'\left(I-P_{-i}\right)X_i\right)^{-1}X_i'\left(I-P_{-i}\right)Y\right)\\ 
&=Var\left(\beta _i^*+\left(X_i'\left(I-P_{-i}\right)X_i\right)^{-1}X_i'\left(I-P_{-i}\right)\epsilon \right)\\ 
&=\left(X_i'\left(I-P_{-i}\right)X_i\right)^{-1}X_i'\left(I-P_{-i}\right)Var\left(\epsilon \right)\left(I-P_{-i}\right)X_i\left(X_i'\left(I-P_{-i}\right)X_i\right)^{-1}\\ 
&=Var\left(\epsilon \right)\left(X_i'\left(I-P_{-i}\right)X_i\right)^{-1}\\ 
&=\sigma ^2\left(X_i'\left(I-P_{-i}\right)X_i\right)^{-1}
\end{align}
$$

이 variance에 대해서 efficient를 만족하는지 보면,

$$
\begin{align}
X_i'X_i-X_i'\left(I-P_{-i}\right)X_i&=X_i'P_{-i}X_i=X_i'X_i\left(X_i'X_i\right)^{-1}X_i'X_i\\ 
&=X_i'X_i\succcurlyeq 0 \mathrm{이니}\\ 
&\\
\left(X_i'\left(I-P_{-i}\right)X_i\right)^{-1}&\succcurlyeq \left(X_i'X_i\right)^{-1} \mathrm{이다.}
\end{align}
$$

따라서 efficient를 만족하지 않는다.<br>
하지만, $$i$$번째 변수가 그 밖의 모든 변수들로 생성된 부분공간에 대해 직교한다면 $$(I-P_{-i})X_i=X_i$$가 성립하여 $$X_i'X_i=X_i'\left(I-P_{-i}\right)X_i$$가 되긴 한다.<br>
이러한 경우 efficiency loss는 발생하지 않는다. (물론 그에 따라 추정치가 0에 수렴하겠지만...)



>문자의 아래첨자에 음수를 쓰는 방식은 경제학에서 자주 쓰이는데, 아래첨자의 수를 제외한 나머지 변수 모든 것을 의미한다. 위의 예를 들면 $$P_{-i}$$란 $$X_i$$를 제외한 나머지 변수로 만든 사영(projection) 선형변환(linear transfomer)을 의미한다.
{: .prompt-info}

>다 작성하고 보니까 $$i$$번째 변수가 추가된 것이 아니라 마지막 $$k$$번째 변수가 추가된 걸로 했으면 더 보기 편했을텐데... 양해부탁드립니다...
{: .prompt-warning}

<br>
<br>

## 3. Model Selection

그렇다면 우리는 모델을 정확하게 설계해야할 필요가 있다.

모델 설계의 접근 방식은 크게 두 가지 방법이 있다.<br>
하나는 General to Simple, 다른 하나는 Simple to General이다.<br>
전자는 가능한 변수를 모두 늘여놓고 줄여가는 방식이고, 후가는 중요하다고 판단되는 변수를 하나씩 추가하면서 모델을 설계하는 방식이다.

이때 사용되는 몇 가지 지표들이 있다.

<br>

### 3-1. Adjusted R-square

조정된 결정계수는 [Regression](/posts/004-계량경제학-Regression/#4-결정-계수-r2)포스트에서 확인하시기 바랍니다.

조정된 결정계수는 중요한 설명변수가 추가됐을 때 값이 커진다.

<br>

### 3-2. AIC (Akaike Information Criterion)

아카이케 정보기준은 

$$
AIC=2k-2\ln(\hat{\mathcal{L}})
$$

로 정의된다. (이때 $$k$$는 추정된 계수의 개수, $$\mathcal{L}$$은 likelihood funcion이다.)<br>
$$\ln(\hat{\mathcal{L}})$$는 모델의 적합도를 의미하니 $$k$$가 커질 때 $$\ln(\hat{\mathcal{L}})$$가 충분히 커진다면 모델이 우수하다고 할 수 있다.<br>
즉, $$AIC$$값은 작을수록 좋다.

<br>

### 3-3. BIC (Baysian Information Criterion) 

베이지안 정보기준은 

$$
BIC=\ln(n)k-2\ln(\hat{\mathcal{L}})
$$

로 정의된다. (이때 $$k$$는 추정된 계수의 개수, $$n$$은 데이터의 수, $$\mathcal{L}$$은 likelihood funcion이다.)<br>
아카이케 정보기준과 비슷하지만 계수의 개수에 결합되는 penalty가 데이터의 수와 관련이 있다.<br>
즉, 의미있는 데이터 구성이 중요한 지표가 되겠다. 이 값 역시 작을수록 좋다.

>Likelihood function의 경우 우선은 알 필요는 없지만 궁금하면 찾아보시기 바랍니다. 이 블로그에서도 나중에 필요하다면 여러 수리통계학 내용과 함께 다루도록 하겠습니다.<br>
>(스포. 언제가 될 지는 모르지만 인공지능 관련 포스트를 진행할 때 다룰 것 같다.)
{: .prompt-tip}

<br>
<br>

후기) 이번 내용은 수식만 많지 어렵지는 않아서 쉽게 넘어가실 수 있을 것 같습니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***