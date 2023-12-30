---
title: Machine Learning Notes
date: 2023-11-28 14:02:32
categories:
- Technical stack
tags: 
- Machine Learning
---

# Machline Learning Notes

This is a record notes of relevant knowledge in ML learning.

<!-- more -->

## TVM

Tensor Virtual Machine

深度学习的编辑器

将深度学习模型部署到硬件平台的 开源编辑器。

通俗解释就是将 模型 转化为 机器码 可以在任何设备上运行。



TVM支持不同的前端(深度学习框架)： ONNX, Pytorch

TVM支持不同的后端(执行代码的硬件平台): CUDA, LLVM(complier 可以用来加速代码的运行速度)

LLVM 支持多个GPU类型上运行代码。

CUDA 只支持 NVIDIA的GPU上进行运行。

举个例子理解

> >使用PyTorch框架来训练一个深度神经网络模型。在PyTorch中，定义模型的结构，选择优化器，训练模型，并对其进行验证。一旦模型训练完成并验证通过，需要将这个模型部署到不同的硬件上（比如GPU、CPU或专用的加速器上）。
>
> 前端就是 pyTorch， 用于 创建 和 训练 模型。
>
> 需要将训练好的模型，转变为ONNX格式，让TVM处理。
>
> TVM将模型转为 Relay IR，更加通用。
>
> 后端是 在硬件平台上运行。
>
> > >TVM中选择LLVM作为后端意味着你可以将模型编译为能在各种CPU上运行的代码，而不仅仅是特定类型的GPU。
> > >
> > >TVM中选择CUDA，适用于NVIDIA的GPU，需要学习CUDA编程知识，对于深度学习和计算密集型任务会有更好的性能。

### Official Website

https://tvm.apache.org/

### TVM使用

```
git clone --recursive https://github.com/apache/tvm tvm
cd tvm
```

#### 1. 安装依赖

CMake、Python etc。

**安装python包**

```
cd python; python setup.py install
```

#### 2. 导入模型 和 优化

**转换格式**

将深度学习模型(TensFlow, Pytorch, Keras, MXNet)转为 TVM支持的格式

可以使用TVM模型转换工具

relay.frontend.from_tensorflow 或者 relay.frontend.from_pytorch

```
import tvm
from tvm import relay
```

tensflow

```
from tvm.relay.frontend import from_tensorflow
# 假设你的模型文件是 'model.pb'
with tf.io.gfile.GFile('model.pb', 'rb') as f:
    graph_def = tf.compat.v1.GraphDef()
    graph_def.ParseFromString(f.read())
mod, params = from_tensorflow(graph_def, layout="NCHW")
```

pytorch

```
import torch
from tvm.relay.frontend import from_pytorch
# 假设你的模型是一个 PyTorch 模型
model = torch.load('model.pth')
model.eval()
input_shape = [1, 3, 224, 224]  # 例如，对于一个图像分类模型
input_data = torch.randn(input_shape)
scripted_model = torch.jit.trace(model, input_data).eval()
mod, params = from_pytorch(scripted_model, input_shapes={'input': input_shape})
```

#### 3. 使用优化器优化模型

TVM自动优化工具： AutoTVM 和 AutoScheduler

自动找到最优的内核配置和计算图优化策略，以提高在特定硬件上的性能



优化内核配置： 特定的任务 使用选择 相应的 处理器内核，从而提升性能。

##### CPU GPU FPGA

硬件平台： 是支持软件运行和执行的物理组件和设备的集合。



CPU Central processing unit： 负责解释和执行大部分计算机指令。

GPU Graphics processing unit： 最初用于处理图形和图像数据，现在也用于加速并行计算任务。

FPGA Field programmable gate array: 高度定制，适用于特定的硬件。



并行计算任务： 该任务 可以被分解为 多个子任务，斌且在多个处理器上并行执行。

#### 相关类似Item

TensorRT： NVIDIA，专门针对其GPU优化，提升深度学习在GPU运行效率。

ONNX Runtime： 方便模型 在不同框架上的迁移和使用。 通过 ONNX格式表示通用模型，这样不同框架训练的模型都可以在ONNX Runtime上运行。



### 后端

#### CUDA

#### LLVM

Low Level Virtual Machine

编译器开发的项目，主要是 用于 提供  模块化的编辑器和工具链。

开发者 可以用LLVM提供的编辑器组件 创建自己的前端，优化器 和 后端。

其核心为 IR，是一种平台无关代码，优化代码，然后应用到硬件平台。

> > 苹果公司的Clang编辑器 就是基于LLVM 构建的。
> >
> > 利用LLVM作为后端。 
> >
> > Clang 和 LLVM结合 生成 优化后的代码。
>
> 
>
> 两者都是开源项目。



## Convolutional Operator

卷积算子： 用于提取图像的特征，比如边缘、角点、纹理等。

### Kernel 或 Filter

CO是通过一个小的矩阵（称为核或过滤器）在输入图像上滑动（或“卷积”）来工作的。这个核有固定的尺寸，比如3x3或5x5。

### Sliding Window

核在图像上按照一定的步长（Stride）滑动，覆盖图像的不同区域。在每个位置上，核与其覆盖的图像区域进行元素对应的乘法操作。

### Feature Map

将核与图像区域的对应元素相乘后，结果求和，形成一个新的矩阵，这个矩阵称为特征映射或激活图。特征映射捕获了输入图像的一些特征。

### Padding

为了处理边界问题或调整输出特征图的尺寸，有时会在输入图像周围添加额外的边界（称为Padding）。

### 激活函数

在卷积操作之后，通常会应用一个激活函数（如ReLU）来引入非线性，增强网络的表达能力。
