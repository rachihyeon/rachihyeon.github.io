---
title: 계량경제학 12 - 자기상관성(Serial Correlation)
date: 2025-03-29 01:00:00 +0900
categories: [계량경제학, Serial Correlation]
tags: [econometric, serial correlation, stationary, auto correlation, ar, breusch-godfrey test, durbin-watson test, hac, 자기상관성, 정상성, 브로이슈-갓프리 검정, 더빈-왓슨 검정, ]
author: rachihyeon 
description: 자기상관성이란 무엇이며, Classical assumption에서 자기상관성이 없다는 판단을 어떻게 해야 하는지를 다룹니다. 그리고 그에 앞서 시계열 데이터 분석을 간략하게 다룹니다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

<br>

[계량경제학 포스트 보러가기](/categories/계량경제학/)

## 0. Introduction

우리가 마주하는 데이터의 종류 중 시계열 데이터라고 부르는 것이 있다.<br>
말 그대로 시간에 따라 수집된 데이터를 말하는데 여기서 중요한 것 관측의 대상이 같아야 한다는 것이다. <br>
쉽게 말해 **대한민국 GDP**또는 **어떤 사람의 연봉**이라든지 말이다.<br>

시계열 데이터를 일단 수집은 했는데 어떻게 분석을 해야하는가... 고민해볼 필요가 있다. 우리가 데이터 분석을 왜 하는지에 대해서는 이전에도 언급한 바가 있었다.<br>
바로 <span style = "color : red;">알려지지 않은 input</span>에 대해서 **output**이 어떻게 될지 예측해보고자 회귀분석이든 한건데, 시계열 데이터가 과거의 데이터로부터 미래의 데이터를 예측하기 위해서는 몇 가지 조건이 필요하다. <br>
그게 **정상성(Stationary)**조건인데 이게 있으면 데이터 분석 결과의 신뢰도가 높아진다는 것이다.<br>

이번 포스트에서는 이 시계열 데이터를 우선 다루고 시계열 데이터 분석의 모델 몇 가지를 살펴본 뒤 회귀분석 모형에서의 자기상관성 검정을 어떻게 해야할지 알아보고자 한다.

<br>
<br>
<br>

## 1. 정상성(Stationary)

정상성이란 늘 한결같은 성질을 의미한다. 시계열 데이터에서 정상성이란 임의 시점의 데이터가 모두 항상 같은 분포를 가진다는 것이다.

쉽게말해서, 시계열 데이터$$x$$는 확률 변수$$X$$의 분포$$D$$의 한 점이 된다는 것이다.

위 도입부에서 이 성질을 가져야 시계열 데이터 분석 결과의 신뢰도가 높아진다고 했는데, 하나의 예시를 들어보자.<br>
어떤 데이터 $$y$$에 대해서 $$y$$가 기울기가 0이 아닌 추세를 가진다고 하자.<br>
0시점부터 $$t$$시점까지의 데이터가 수집되었고 이를 통해 회귀분석을 했다.<br>
이후 $$t+1$$의 데이터를 넣고 결과가 어떻게 될지 예측하면, 우리가 얻은 모델은 분포 $$D'$$인데 $$t+1$$의 분포는 $$D''$$로 $$D' \ne D''$$이니 예측이 의미 없게 된다.
>심지어 $$t$$시점까지의 데이터로 얻은 모델의 분포 $$D'$$자체도 신뢰도가 매우 낮은 쓰레기 분포가 될 것이다.
{: .prompt-info}

여기까지 설명을 하면 한 가지 의문이 들 수 있다.(내가 그랬다.)<br>
빅데이터로 그 분포의 변화까지 학습을 시켜버리면 되지 않을까?<br>
<span style = "color : red;">그러나</span>, 우리가 하는 시계열 데이터 분석은 노이즈나 추세를 제거한 데이터 본연의 패턴을 분석하는 것에 목적이 있기 때문에 임의 데이터의 분포 변화를 학습시킬 필요가 없는 것이다.<br>
또한, 분포가 같다는 것은 평균, 분산이 일정하다는 것을 의미하기 때문에 통계적 분석이 용이하다.

이만하면 정상성이 무엇인지, 그리고 왜 필요한지에 대해서 다뤘다.

정상정 조건에는 크게 두 가지가 있다. 강정상성(Strong Stationary), 약정상성(Weak Stationary)이다.

<br>

### 1-1. Weak Stationary

약정상성 조건은 3가지가 있다.

>1. 유한 기댓값을 가진다.
>2. 유한 분산을 가진다. 
>3. 공분산은 오직 시간의 간격에만 영향을 받는다. 즉, $$Cov(X_t, X_{t+s}) = \lambda_s$$
{: .prompt-info}

위 세 가지 조건을 만족하면 약정상성 조건을 만족한다고 한다.

<br>

### 1-2. Strong Stationary

강정상성 조건은 무조건부 결합 분포의 누적분포함수가 시간에 따라 불변할 때 만족한다고 한다.

수식으로 작성하면 아래와 같다.

$$
F(X_{t_1}, X_{t_2}, \cdots, X_{t_n})=F(X_{t_1+s}, X_{t_2+s}, \cdots, X_{t_n+s}) \quad \quad \mathrm{for\ all\ n\ and\ s}
$$

조건만 봐도 알겠지만 이건 현실에서 사용하기 매우 어려운 조건이다. 그래서 실제 데이터를 다룰 때는 약정상성을 만족하게 해 수행한다.

<br>
<br>

## 2. 자기상관성(Auto Correlation)

자기상관성은 임의 데이터 사이에 관계가 있는 것을 말한다.<br>
예를 들어, 소비자의 소비 패턴을 분석하기 위해 가계의 소비를 시간별로 수집했다고 가정해보자. 그리고 월급날에 가까울 수록 많은 소비가 발생하는 양상을 보였다고 했을 때, 월급날 근방에는 자기상관성이 나타난다고 말할 수 있는 것이다.

자기 상관성은 특정한 시간 간격 내에서의 상관관계를 말한다고 했다. 자기상관계수를 수식으로 나타내보면 

$$\rho_k=\frac{Cov(X_t, X_{t+k})}{Cov(X_t, X_t)}$$

라고 써 볼 수 있다. 이때 k는 시간간격이다. ([왜 이렇게 표현 가능한지](/posts/계량경제학-12-Serial-Correlation/#2-1-ar-model)는 밑에서 알아보겠다.)

그럼 이 영향이 오래 가는지 짧게 가는지도 다를테니 아래 그림을 한 번 봐보자. (x축은 시간, y축은 자기상관계수이다.)

![자기상관 이미지](/assets/img/post_img/econometrics/autocorrelogram.png)

위 이미지에서 <span style = "color : red;">빨간 선</span>이 있고 <span style = "color : skyblue;">파란 선</span>이 있다. <span style = "color : red;">빨간 선</span>은 이전 사건이 이후 시간이 어떻게 되든 그 영향이 그대로 전달되는 것이고, <span style = "color : skyblue;">파란 선</span>은 시간이 지남에 따라 그 영향이 적어지는 경우를 보여준다.

전자를 Long-term memory, 후자를 Short-term memory라고 한다.

<br>

### 2-1. AR Model

여기선 자기상관계수를 유도해낸 모델에 대해서 다룬다.

우리는 자기상관성이란 현재의 값이 이전 값에 영향을 받는 것이라 했다. 따라서 우리는 다음과 같은 모델을 세워 볼 수 있다.

$$
Z_t=\rho^*Z_{t-1}+\eta_t
$$

이 모델을 세울 때 몇 가지 조건이 필요한데 위에서 언급한 [정상성](/posts/계량경제학-12-Serial-Correlation/#1-정상성stationary)조건이다. (위 모델을 구체적으로 AR(1)모델이라고 한다.)
>1. 임의 시점의 $$t, s$$에 대해서, $$E(Z_t)=E(Z_s)$$이다.(유한 기댓값)
>2. 임의 시점의 $$t, s$$에 대해서, $$V(Z_t)=V(Z_s)$$이다.(유한 분산)
>3. $$\eta_t$$는 예측불가능 항, $$E(\eta_t)=0$$.
>4. $$\vert \rho^* \vert < 1$$.
{: .prompt-info}

위 조건들을 갖고 이 모델의 여러 속성을 확인해보겠다.

1. 기댓값<br>
$$E(Z_t)=E(\rho^*Z_{t-1}+\eta_t)=\rho^*E(Z_{t-1})+E(\eta_t)=\rho^*E(Z_{t-1})$$

이므로 $$E(Z_t)=0$$이다.

2. 분산<br>
$$
\begin{align}
Var(Z_t)&=Var(\rho^*Z_{t-1}+\eta_t) \notag \\
&=\rho^{*2}Var(Z_{t-1})+Var(\eta_t)+2cov(\rho^*Z_{t-1}, \eta_t) \notag \\
&=\rho^{*2}Var(Z_{t-1})+\sigma_{\eta} ^2 \notag \\
\Rightarrow Var(Z_t)&=\frac{\sigma_{\eta} ^2}{1-\rho^{*2}}=\sigma_{z} ^2 \notag 
\end{align}
$$

위 값들로 시간 간격에 따른 Covaiance를 계산해보자.

3. 공분산<br>
$$
\begin{align}
Cov(Z_t, Z_{t-1})&=E(Z_t Z_{t-1})=\rho^*E(Z_{t-1} ^2)+E(\eta_t Z_{t-1}) \notag \\
&=\rho^* \sigma_z ^2 \notag \\
\notag \\
Cov(Z_t, Z_{t-2})&=E(Z_t Z_{t-2})=\rho^*E(Z_{t-1} E_{t-2})+E(\eta_t Z_{t-2}) \notag \\
&=\rho^*E(Z_{t-2} ^2)+E(\eta_{t-1} Z_{t-2}) \notag \\
&=\rho^{*2} \sigma_z ^2 \notag \\
\vdots \notag \\
Cov(Z_t, Z_{t-k})&=\rho^{*k} \sigma_z ^2 \notag \\
\end{align}
$$

시간이 지남에 따라 그 영향이 작아짐을 수식으로 확인했다.<br>
이 내용들을 갖고 Classical assumption에서 자기상관성 부재 조건을 제거하면 어떻게 되는지 알아보자.

<br>
<br>

## 3. 자기 상관성 제거

Classical assumption에서의 [자기상관성 부재 조건](/posts/계량경제학-5-Gauss-Markov-Theorem/#2-1-classical-assumption)이 깨지면 $$E(\epsilon_t ^2)=\sigma_t ^2 \ne \sigma^2$$이다.

1. 불편성<br>
$$
\begin{align}
E\left[\hat{\beta }\right]&=E\left[\left(X'X\right)^{-1}X'Y\right] \notag \\
&=E\left[\left(X'X\right)^{-1}X'\left(X\beta +\epsilon \right)\right] \notag \\
&=E\left[\left(X'X\right)^{-1}X'X\beta +\left(X'X\right)^{-1}X'\epsilon \right] \notag \\
&=E\left[\beta +\left(X'X\right)^{-1}X'\epsilon \right] \notag \\ 
&=\beta +\left(X'X\right)^{-1}X'E\left[\epsilon \right] \notag \\
&=\beta \notag \\
\end{align}
$$

자기상관성이 존재해도 OLS추정량은 불편량임은 변하지 않는 것을 알 수 있다.

2. 분산<br>
$$
\begin{align}
Var\left(\hat{\beta }\right)&=Var\left(\beta +\left(X'X\right)^{-1}X'\epsilon \right) \notag \\ 
&=Var\left(\beta \right)+Var\left(\left(X'X\right)^{-1}X'\epsilon \right)+2Cov\left(\beta ,\ \left(X'X\right)^{-1}X'\epsilon \right) \notag \\ 
&=0+Var\left(\left(X'X\right)^{-1}X'\epsilon \right)+0 \notag \\ 
&=\left(X'X\right)^{-1}X'V\left(\epsilon \right)X\left(X'X\right)^{-1} \notag \\
&\ne \left(X'X\right)^{-1}X'\sigma ^2 I X\left(X'X\right)^{-1} \notag \\ 
&=\sigma ^2\left(X'X\right)^{-1} \notag 
\end{align}
$$

자기상관성이 존재하면 $$\sigma ^2\left(X'X\right)^{-1}$$를 사용한 어떠한 추정도 유효하지 않게 된다.

그럼 이 자기상관성이 존재함을 어떻게 판단할 수 있는지 알아봐야한다.<br>
이를 알아보기 위해 공분산 행렬을 아래와 같이 정의해보자.

$$
\Omega=\sigma^2
\begin{bmatrix}
    1           &   \rho^*      & \cdots  & \rho^{*T-1} \\
    \rho^*      &   1           & \cdots  & \rho^{*T-2} \\
    \vdots      &   \vdots      & \ddots  & \vdots      \\
    \rho^{*T-1} &   \rho^{*T-2} & \cdots  & 1           \\
\end{bmatrix}
\ne \sigma^2I_T
$$

그리고 AR(1)모델을 기준으로 귀무가설과 대립가설을 아래와 같이 세워보자

$$
\begin{align}
H_0 &: \mathrm{No\ serial\ correlation} (\rho^* = 0) \notag \\
H_1 &: \mathrm{Serial\ correlation} (\rho^* \ne 0) \notag \\
\end{align}
$$

이대로 검정을 해보면 되겠지만 대부분의 경제학적 변수들은 자기상관성을 가진다.(통계적으로 이렇게 나타남) <br>
이러니까 유의수준 내에서 추정량을 맞추기가... 꽤나 까다롭다. 그래서인지는 모르겠지만 AR(p)모델을 갖고 자기상관성을 검정하는 방법이 하나 있다.

<br>

### 3-1. Breusch-Godfrey Test

이 검정방법은 자기상관성을 위한 LM test이다.<br>
우선 모델은 AR(p)를 가정한다.

$$
\epsilon_t=\rho_1^*\epsilon_{t-1}+\rho_2^*\epsilon_{t-2}+\cdots+\rho_p^*\epsilon_{t-p}+\eta_t
$$

$$
\begin{align}
H_0 &: \mathrm{No\ serial\ correlation} (\rho_1^*=\rho_2^*=\cdots=\rho_p^* = 0) \notag \\
H_1 &: \sim H_0 \notag \\
\end{align}
$$

위와 같이 가설을 설정하고 아래 과정을 따른다.

>1. 기존 모델을 회귀분석하여 잔차$$e_t$$를 계산한다.
>2. 보조 회귀식 $$e_t=\hat{\rho_1}\hat{e_{t-1}}+\hat{\rho_2}\hat{e_{t-2}}+\cdots+\hat{\rho_p}\hat{e_{t-p}}+X_t\hat{\alpha}+\eta_t$$
>3. 보조 회귀식으로부터 $$R^2$$값을 계산한다.
>4. $$T\cdot R^2\sim \mathcal{X}^2(p)$$를 사용하여 검정을 한다.
{: .prompt-info}

<br>

### 3-2. Durbin-Watson Test

이 검정법은 조금 특이하게 자기상관성을 검정한다.

$$
\epsilon_t=\rho^*\epsilon_{t-1}+\eta_t
$$

$$
\begin{align}
H_0 &: \rho^*=0 \notag \\
H_1 &: \rho^*>0 \notag \\
\end{align}
$$

위와 같이 가설을 설정하고 아래 과정을 따른다.

>1. 기존 모델을 회귀분석하여 잔차$$e_t$$를 계산한다.
>2. 다음과 같은 통계량 $$d$$를 정의한다. <br>
>$$d \equiv \frac{\sum_{t=2} ^{T} (e_t - e_{t-1})^2}{\sum_{t=1} ^{T} e_t^2} \ge 0$$<br>
>이때 이 $$d$$값은 $$2(1-\hat{\rho})$$에 근사할 수 있기 때문에 $$d=2$$이면 자기상관성이 없다는 의미이다.
{: .prompt-info}

$$2(1-\hat{\rho})$$를 그래프로 그려보면

![durbin-watson critical values](/assets/img/post_img/econometrics/durbin-watson_critical_values.png)

이고 d가 0에 가까우면 reject, 멀면 accept한다.<br>
아까 위에서 이 검정법은 특이하다고 했는데, 왜냐하면 일반적으로 귀무가설이 A면 대립가설을 not A로 설정하는게 평범해보이는데 이 검정법은 그게 아니기 때문이다. 그로인해 기각역과 채택역이 아닌 결정 불가능 구간이 존재한다. 따라서 통계량이 이 구간 내에 있으면 다른 방법을 고려해야한다.

>$$d$$통계량이 $$2(1-\rho)$$에 수렴하는 이유는 아래와 같다.
{: .prompt-tip}

$$d \equiv \frac{\sum_{t=2} ^{T} (e_t - e_{t-1})^2}{\sum_{t=1} ^{T} e_t^2}=\frac{\sum_{t=2} ^{T} (e_t^2 + e_{t-1}^2 - 2e_te_{t-1})}{\sum_{t=1} ^{T} e_t^2}$$

$$\frac{\sum_{t=2} ^{T} (e_t^2)}{\sum_{t=1} ^{T} e_t^2} \rightarrow 1$$

$$\frac{\sum_{t=2} ^{T} (e_{t-1}^2)}{\sum_{t=1} ^{T} e_t^2} \rightarrow 1$$

$$\frac{\sum_{t=2} ^{T} (e_te_{t-1})}{\sum_{t=1} ^{T} e_t^2}=\frac{\sum_{t=2} ^{T} (\rho e_{t-1}e_{t-1})}{\sum_{t=1} ^{T} e_t^2} + \frac{\sum_{t=2} ^{T} (\eta_t e_{t-1})}{\sum_{t=1} ^{T} e_t^2} \rightarrow \rho$$

$$\Rightarrow d \rightarrow 2(1-\rho)$$

<br>
<br>

## 4. HAC(Heteroskedasticity and Autocorrelation Consistent)

[지난 포스트](/posts/계량경제학-11-Heteroskedasticity/)에서는 등분산성 검정에 대해서 다뤘고 이번 포스트에서는 자기상관성에 대해서 다뤘는데 결국에는 오차항의 분산에 문제가 있다는 공통점이 있다. 그렇다면 둘을 따로 검정하지 않고 동시에 검정해낼 수 있는 방법이 있지 않을까 생각해볼 만 하다.

그래서 여기서는 이분산성과 자기상관성을 동시에 검정할 수 있는 공분산 행렬의 추정량을 하나 소개한다.

HAC추정량의 일종인 Newey-West estimator는 아래와 같다.

[분포근사](/posts/계량경제학-10-사건과-확률/)로부터,

$$
\begin{align}
&\sqrt{T}(\hat{\beta}-\beta^*)=(\frac{1}{T} \sum _{t=1}^{T} X_tX_t')^{-1}\frac{1}{\sqrt{T}}\sum _{t=1}^{T} X_t\epsilon_t \overset{d}{\to} Q^{-1}N(0, V)=N(0, Q^{-1}VQ^{-1}) \notag \\
\end{align}
$$

이때, $$Q=E(X_tX_t')$$이지만 알려져 있지 않으니 

$$\hat{Q}=\frac{1}{T}\sum _{t=1}^{T}X_tX_t'$$

를 사용한다.

$$V=E(\epsilon_t^2X_tX_t')$$도 알려져 있지 않으니 

$$
\begin{align}
Var(\frac{1}{\sqrt{T}}\sum _{t=1} ^{T} X_t\epsilon_t) &= \frac{1}{T} Var(\sum _{t=1} ^{T} X_t\epsilon_t) \notag \\
&=\frac{1}{T} \sum _{t=1} ^{T} Var(X_t\epsilon_t) + \frac{1}{T} \sum _{t=1} ^{T}\sum _{s=1, s\ne t} ^{T} Cov(X_t\epsilon_t, X_s\epsilon_s) \notag \\
\end{align}
$$

i.i.d이면 이 값은 $$Var(X_t\epsilon_t)$$가 된다.

위 계산들을 갖고 $$Q^{-1}VQ^{-1}$$f를 계산해보면,

$$
Q^{-1}VQ^{-1}=\frac{1}{T} \sum _{t=1} ^{T}e_t^2X_tX_t' + \frac{1}{T} \sum _{j=1} ^{T} \sum _{t=j+1} ^{T}(e_t^2X_{t-j}X_t' + e_t^2X_tX_{t-j}') 
$$

인데 이놈은 계산 복잡도가 $$O(N^2)$$에 수렴해서 Newey와 West는 두 번째 항에 가중치를 부여하고 적당한 기간을 절삭하여 계산해내었다. 교정된 공분산 행렬은 다음과 같다.

$$
\hat{V}=\frac{1}{T} \sum _{t=1} ^{T}e_t^2X_tX_t' + \frac{1}{T} \sum _{j=1} ^{H-1}w_j \sum _{t=j+1} ^{T}(e_t^2X_{t-j}X_t' + e_t^2X_tX_{t-j}') 
$$

여기서 $$w_j=1-\frac{j}{H}$$이고 $$H$$는 truncation lag라고 고려할 기간 정도라고 생각하면 편하다. 이 가중치는 시간이 지남에 따라 영향이 작아짐을 가정하고 있다.

<br>
<br>

후기) 오랜만에 포스트를 쓰게 됐습니다... 적어도 3일에 한 장씩 쓰고 싶었는데 쉽지않네요. 이번 포스트는 분량도 많아서 말이죠... 도움이 되셨길 바라겠습니다.

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***