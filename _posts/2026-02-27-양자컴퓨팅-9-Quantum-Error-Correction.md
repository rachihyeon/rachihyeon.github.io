---
title: 양자 컴퓨팅 9 - Quantum Error Correction
date: 2026-02-27 00:00:00 +0900
categories: [컴퓨터공학, 양자컴퓨팅]
tags: [quantum computing, error correction, classical error correction, quantum error correction, bit-flip, phase-flip, shor code]
author: rachihyeon 
description: 고전적인 비트 에러 수정 아이디어에서 착안하여 큐비트 에러 수정에 대해서 다룬다.
# comments: 
# media_subpath: 
# pin: true
math: true
mermaid: true
---

[양자 컴퓨팅 포스트 보러가기](/categories/양자컴퓨팅/)

## 0. Introduction

[지난 포스트](/posts/양자컴퓨팅-8-Superdense-Coding-Quantum-Teleportation/)와 [지지난 포스트](/posts/양자컴퓨팅-7-Quantum-Key-Distribution/)에서는 양측에서 서로 정보를 전달하는 알고리즘, 프로토콜에 대해서 알아봤다. 하지만 현실세계속에서는 하드웨어의 오류, 실변수로의 근사 오차 등의 이유로 큐비트 정보에 오류가 발생할 수도 있다.

그렇다면 이를 해결해야한다. 이번 포스트에서는 고전적인 오류 수정 방법에서 착안하여 큐비트 오류 수정 방법을 알아보도록 하겠다.

<br>
<br>
<br>

## 1. Classical Error Correction(오류 수정)

반복 코드(repetition code)라는 것이 있다. 노이즈가 심한 채널에서는 비트가 반전되는 경우가 잦은데 0을 000으로 길게 보내거나 1을 111으로 길게 보내는 방식을 통해 채널의 노이즈 문제를 해결하는 방법이다.

0을 000으로 인코딩하여 전송한다면 001, 010, 100으로 코드가 변형되더라도 다수결(majority votes) 방식을 채택하면, 0으로 디코딩된다.
<br>
1도 동일한 방식으로 할 수 있다. 

>코드의 길이가 n일 때, 최대 $$\frac{n-1}{2}$$의 오류가 수정될 수 있다.
{: .prompt-info}

0을 000으로 인코딩해 송신할 때, 수신부에 도달할 수 있는 데이터의 가능한 경우에 대해서 확률을 생각해보자.
<br>
1비트 에러 발생 확률을 p라고 하고 그 확률이 독립적이라고 할 때, 수신부에 도착하는 데이터의 가능한 확률은 이항분포를 따른다. 표를 그려 만들어보면,

|송신  |수신   |디코딩 |확률            |
|:----:|:-----:|:----:|:--------------:|
|0     |000    |0     |$$(1-p)^3$$     |
|      |001    |0     |$$p(1-p)^2$$    |
|      |010    |0     |$$p(1-p)^2$$    |
|      |100    |0     |$$p(1-p)^2$$    |
|      |011    |1     |$$p^2(1-p)$$    |
|      |101    |1     |$$p^2(1-p)$$    |
|      |110    |1     |$$p^2(1-p)$$    |
|      |111    |1     |$$p^3$$         |

이 8가지의 경우 중 위의 4개가 올바르게 교정될 수 있는  경우이다. p=0.01라고 할 때, $$Pr(\mathrm{올바르게\ 디코딩되는\ 경우}) \approx 0.99970$$이다.

반복 코드를 쓰지 않았을 때($$1-p=0.99)$$에 비해 매우 높은 정확도를 보인다.

그래프를 그려보면 아래와 같다.

![Repetiton coding graph](/assets/img/post_img/quantum_computing/Repetition_coding.png){: width="450" }

하지만 이 아이디어를 그대로 큐비트에 적용하기는 어려울 것이다. 왜냐하면, 큐비트의 상태는 관측 후에 결정되기 때문이다.

사실 반복 코드를 이용한 오류 교정은 비트를 굳이 볼 필요가 없다. 3비트($$b_0b_1b_2$$)를 갖고 예시를 들어보면,
<br>
- $$b_0=b_1=b_2\Rightarrow$$ 교정 필요 없음
- $$b_0=b_1\neq b_2\Rightarrow$$ $$b_2$$교정 필요
- $$b_0\neq b_1=b_2\Rightarrow$$ $$b_0$$교정 필요
- $$b_0=b_2\neq b_1\Rightarrow$$ $$b_1$$교정 필요

위의 네 경우가 존재하고 컴퓨터에서 연산해야하니 논리연산으로 표현해보면,
<br>
- $$b_0\oplus b_1=0$$ $$\mathrm{and}$$ $$b_0\oplus b_2=0 \Rightarrow$$ 교정 필요 없음
- $$b_0\oplus b_1=0$$ $$\mathrm{and}$$ $$b_0\oplus b_2=1 \Rightarrow$$ $$b_2$$교정 필요
- $$b_0\oplus b_1=1$$ $$\mathrm{and}$$ $$b_0\oplus b_2=0 \Rightarrow$$ $$b_0$$교정 필요
- $$b_0\oplus b_1=1$$ $$\mathrm{and}$$ $$b_0\oplus b_2=1 \Rightarrow$$ $$b_1$$교정 필요

<br>
<br>

## 2. Bit-flip in qubits(비트 플립)

위에서 말했다시피, 굳이 비트의 상태가 결정되어 있지 않더라도 몇 번의 연산으로 교정을 할 수 있다. 그렇다면 비트플립은 어떻게 교정할 수 있을까.

정답은 **CNOT게이트**를 이용한 반복된 **얽힌** 큐비트 생성이다.
<br>
그 전에, $$a|0>+b|1>$$라는 큐비트가 있다고 하자. 그렇다면 비트플립된 큐비트는 $$b|0>+a|1>$$일 것이다.

자 이제 어떻게 교정하는지에 대해서 알아보자.(디코딩 과정이라고 보면 된다.)
<br>
$$1$$. 우선 $$a|0>+b|1>$$를 CNOT게이트의 controll큐비트로 하고 $$|0>$$큐비트 두 개를 CNOT게이트의 target큐비트로 하여 얽힌 3큐비트 $$a|000>+b|111>$$를 만든다.

<br>
$$2$$. 큐비트 전송과정에서 **1큐비트만** 비트플립이 발생했다고 하면(no error의 경우도 포함), 
<br>
$$a|00 \textcolor{red}{1} >+b|00 \textcolor{red}{1} >$$ or $$a|0 \textcolor{red}{1} 0>+b|0 \textcolor{red}{1} 0>$$ or $$a| \textcolor{red}{1} 00>+b| \textcolor{red}{1} 00>$$그리고 오류가 없는 경우인 $$a|000>+b|111>$$가 있을 것이다.
<br>
위 경우의 큐비트를 $$a|c_0c_1c_2>+b|d_0d_1d_2>$$라고 표현하면, $$c_i$$와 $$d_i$$위치에서 동일한 에러가 발생함을 알 수 있다.
<br>
따라서 관측 결과가 어떻게 되든 index에 관심을 가지면 되고 $$c$$인지 $$d$$인지는 중요하지 않다.(관측하면 둘 중 하나로 결정될 테니)
<br>
$$|c_0c_1c_2>$$가 관측됐다고 했을 때, 고전적인 비트 에러 교정 로직과 동일하게 $$c_0 \neq c_1$$이면 $$c_0 \oplus c_1 = 1$$이고, $$c_0 \neq c_2$$이면 $$c_0 \oplus c_2 = 1$$임을 이용할 수 있다.($$d$$에 대해서도 동일하다.)

<br>
$$3$$. 측정해서 얻은 3큐비트를 control로 하는 CNOT게이트에 2개의 $$|0>$$를 target큐비트로 하여 결과를 얻는다. (아래 그림 참고)

![Bit-filp correction circuit](/assets/img/post_img/quantum_computing/Bit-filp-correction_circuit.png)

Case-by-case로 확인해보면, 
<br>
- $$c_0 \oplus c_{\textcolor{red}{1}} = d_0 \oplus d_{\textcolor{red}{1}} = 0$$이면 **4번째** 큐비트가 $$|0>$$
<br>
- $$c_0 \oplus c_{\textcolor{red}{1}} = d_0 \oplus d_{\textcolor{red}{1}} = 1$$이면 **4번째** 큐비트가 $$|1>$$
<br>
- $$c_0 \oplus c_{\textcolor{red}{2}} = d_0 \oplus d_{\textcolor{red}{2}} = 0$$이면 **5번째** 큐비트가 $$|0>$$
<br>
- $$c_0 \oplus c_{\textcolor{red}{2}} = d_0 \oplus d_{\textcolor{red}{2}} = 1$$이면 **5번째** 큐비트가 $$|1>$$
<br>
임을 알 수 있다.

직접 CNOT게이트에 큐비트를 통과시키는 계산을 해보면 알겠지만, 4번 5번 큐비트는 CNOT게이트가 두 번 적용되어 있기 때문에 얽혀있지 않다.

<br>
$$4$$. 4번, 5번 큐비트를 측정한다.
- 00이면 **"오류 없음"**
- 01이면 **세 번째** 큐비트 에러
- 10이면 **두 번째** 큐비트 에러
- 11이면 **첫 번째** 큐비트 에러

<br>
$$5$$. 측정 결과에 따라 $$X$$게이트를 적용한다.
<br>
예를 들어, 4-5번 큐비트가 01이면 세 번째 큐비트에 에러가 있는 것이니 세 번째 큐비트에 X게이트를 통과시키면 올바르게 교정된다.

전체적인 그림으로 디코딩 과정을 보면 아래와 같다.

![Bit-flip decoding overview](/assets/img/post_img/quantum_computing/Bit-flip-decoding-overview.png)

<br>
<br>

## 3. Phase flip error(위상 플립)

파동에는 진폭만 있는 것이 아니라 위상이라는 것도 있다. 위상이 다르면 물리적으로 다른 상태이므로 이 위상이 변하는 것도 교정해야할 필요가 있다.
<br>
가령, $$a|0>+b|1>$$라는 큐비트가 위상 플립되어 $$a|0>-b|1>$$이 되었다고 하자.

위에서 말한 [비트 플립 교정장치](/posts/양자컴퓨팅-9-Quantum-Error-Correction/#2-bit-flip-in-qubits비트-플립)만으로는 이 위상 플립을 해결할 수 없다. 따라서 다른 방법을 사용해야한다. 
<br>
그 방법 중 하나가 hadamard 게이트를 사용하는 것이다.

아이디어는 간단하다. 원래 큐비트를 H게이트에 통과시켜 $$a|+>+b|->$$로 만든다. 이 상태에서 위상 플립이 발생하면 $$a|->+b|+>$$가 되고 이걸 H게이트에 통과시키면 $$b|0>+a|1>$$가 된다.
<br>
이 형태 어디선가 봤다. 바로 비트 플립된 형태이다. 따라서 여기에 비트 플립 과정을 적용하면 교정이 된다.

전체적으로 자세한 과정은 아래와 같다.
<br>
$$1$$. 입력 큐비트 $$a|0>+b|1>$$와 두 개의 $$|0>$$를 CNOT게이트와 H게이트를 사용해 $$a|+++>+b|--->$$로 만들어 송신한다.

<br>
$$2$$. 노이즈가 존재하는 채널(위상 플립이 발생할 수 있는 채널)로 이 큐비트를 전송한다.

![Phase-flip encoding](/assets/img/post_img/quantum_computing/Phase-flip-encoding.png)

<br>
$$3$$. 위에서 말했다시피 다시 H게이트에 통과시킨 후 비트플립 교정 과정을 진행하면 올바르게 교정된 큐비트 정보를 얻을 수 있다.

![Phase-flip decoding](/assets/img/post_img/quantum_computing/Phase-flip-decoding.png)

<br>
<br>

## 4. Shor code(쇼어 코드)

위에서 비트 플립, 위상 플립을 교정하는 방법을 각각 알아봤다. 하지만 현실세계 속의 채널은 위 두 에러 중 하나 이하만이 발생되는 것을 보장하지 않는다. 즉, 둘 다 발생할 수도 있는 것이다. 따라서 둘 다 동시에 교정할 수 있는 방법이 필요하다. 그 방법 중 하나가 **쇼어 코드**이다.

쇼어 코드는 9큐비트 단위로 가능하다.(반복 코드의 길이가 9라는 것과 비슷한 말이다.)

인코딩 과정은 아래와 같다.
<br>
$$1$$. CNOT게이트를 사용해 $$a|0>+b|1>$$를 $$a|000>+b|111>$$로 만든다.

<br>
$$2$$. 세 개의 큐비트에 전부 H게이트를 적용해 $$a|+++>+b|--->$$로 만든다.

<br>
$$3$$. 세 개의 큐비트 각각에 2개의 CNOT게이트를 적용해 $$\frac{a}{2\sqrt{2}} (|000>+|111>)^{\otimes 3} + \frac{b}{2\sqrt{2}} (|000>-|111>)^{\otimes 3}$$로 만든다.

회로 이미지로 보면 아래와 같다.

![Shor code encoding](/assets/img/post_img/quantum_computing/Shor_code_encoding.png){: width="500"}

인코딩 과정을 보면 쇼어 코드의 작동방식을 얼추 예상해 볼 수 있다. 3개씩 묶어서 비트 플립을 해결하고 묶음 3개로 위상 플립을 해결하는 아이디어이다.

디코딩 과정은 사실 그림만 봐도 어떤 과정인지를 알 수 있기 때문에 그림으로 대체한다.

![Shor code decoding](/assets/img/post_img/quantum_computing/Shor_code_decoding.png){: width="600"}

이렇게 따로따로 교정이 가능한 이유는 위상 플립과 비트 플립은 독립이기 때문이다.

추가로, 5큐비트 만으로 Shor code와 동일한 역할을 할 수 있는 방법도 있다.(자세한 내용은 [Laflamme code](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.77.198)참고)

<br>
<br>

후기)이번엔 큐비트의 에러 교정에 대해서 알아봤습니다. 이것저것 소개하느라 자세한 설명을 못한 것 같은데, 계산 자체는 어렵지 않으니 한 번씩 해보셔도 좋을 것 같습니다. 

***오타 혹은 잘못된 정보가 있다면 댓글 이메일 등등으로 알려주시면 감사하겠습니다. (꾸벅)***