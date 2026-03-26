---
name: pytorch-patterns
description: PyTorch deep learning patterns and best practices for building robust, efficient, and reproducible training pipelines, model architectures, and data loading.
origin: ECC
---

# PyTorch Development Patterns

Idiomatic PyTorch patterns and best practices for building robust, efficient, and reproducible deep learning applications.

## When to Activate

- Writing new PyTorch models or training scripts
- Reviewing deep learning code
- Debugging training loops or data pipelines
- Optimizing GPU memory usage or training speed
- Setting up reproducible experiments

## Core Principles

### 1. Device-Agnostic Code

```python
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = MyModel().to(device)
data = data.to(device)
```

### 2. Reproducibility First

```python
def set_seed(seed: int = 42) -> None:
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    np.random.seed(seed)
    random.seed(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
```

### 3. Explicit Shape Management

Always document and verify tensor shapes with comments.

## Model Architecture Patterns

### Clean nn.Module Structure

```python
class ImageClassifier(nn.Module):
    def __init__(self, num_classes: int, dropout: float = 0.5) -> None:
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.Dropout(dropout),
            nn.Linear(64 * 16 * 16, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.features(x)
        x = x.view(x.size(0), -1)
        return self.classifier(x)
```

## Training Loop Patterns

- Always set `model.train()` / `model.eval()` before train/eval
- Use `optimizer.zero_grad(set_to_none=True)` for efficiency
- Use mixed precision with `torch.amp.autocast` and `GradScaler`
- Clip gradients with `torch.nn.utils.clip_grad_norm_`

## Data Pipeline Patterns

- Use `num_workers > 0`, `pin_memory=True`, `persistent_workers=True` in DataLoader
- Use custom `collate_fn` for variable-length data

## Checkpointing

- Save full checkpoint: model state, optimizer state, epoch, loss
- Use `weights_only=True` for secure loading

## Performance Optimization

- Mixed precision training with AMP
- Gradient checkpointing for large models
- `torch.compile` for speed (PyTorch 2.0+)

## Quick Reference

| Idiom | Description |
|-------|-------------|
| `model.train()` / `model.eval()` | Always set mode before train/eval |
| `torch.no_grad()` | Disable gradients for inference |
| `.to(device)` | Device-agnostic tensor/model placement |
| `torch.amp.autocast` | Mixed precision for 2x speed |
| `torch.compile` | JIT compilation for speed (2.0+) |
| `weights_only=True` | Secure model loading |

## Anti-Patterns to Avoid

- Forgetting `model.eval()` during validation
- In-place operations breaking autograd
- Moving data to GPU inside the training loop repeatedly
- Using `.item()` before backward
- Saving entire model instead of `state_dict()`
- Blocking in async context (use `tokio::time::sleep`)
