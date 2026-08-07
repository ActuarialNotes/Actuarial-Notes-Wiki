"""Generate the distribution plots the quiz app swaps for a live simulator.

Each `Media/<Distribution>_pdf.svg` / `_pmf.svg` written here is embedded on its
concept page and replaced at render time by `DistributionSimulator` — see
`docs/distribution-simulators.md`. Every *other* Exam P / FM concept figure is
drawn by `generate_concept_figures.py` as a portrait card; see
`docs/concept-figures.md`.
"""

import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy import stats
from pathlib import Path

OUT = Path(__file__).parent.parent / "Media"
OUT.mkdir(exist_ok=True)

# ── shared style ────────────────────────────────────────────────────────────
plt.rcParams.update({
    "figure.dpi": 150,
    "axes.spines.top": False,
    "axes.spines.right": False,
    "axes.linewidth": 0.8,
    "xtick.labelsize": 9,
    "ytick.labelsize": 9,
    "axes.labelsize": 10,
    "legend.fontsize": 8.5,
    "legend.frameon": False,
    "font.family": "sans-serif",
})

PALETTE = ["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ea580c"]


def save(fig, name: str):
    path = OUT / name
    fig.savefig(path, format="svg", bbox_inches="tight", transparent=True)
    plt.close(fig)
    print(f"  wrote {path.name}")


# ── Normal distribution ──────────────────────────────────────────────────────
def plot_normal():
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    x = np.linspace(-5, 5, 400)
    params = [(0, 1, "μ=0, σ²=1"), (0, 0.5, "μ=0, σ²=0.25"), (0, 2, "μ=0, σ²=4"), (-2, 1, "μ=−2, σ²=1")]
    for (mu, sigma, label), color in zip(params, PALETTE):
        ax.plot(x, stats.norm.pdf(x, mu, sigma), color=color, lw=1.8, label=label)
    ax.set_xlabel("x")
    ax.set_ylabel("f(x)")
    ax.set_ylim(bottom=0)
    ax.legend(loc="upper right")
    ax.set_title("Normal Distribution PDF", fontsize=11, fontweight="semibold")
    fig.tight_layout()
    save(fig, "Normal_distribution_pdf.svg")


# ── Binomial distribution ─────────────────────────────────────────────────────
def plot_binomial():
    fig, axes = plt.subplots(1, 2, figsize=(6.5, 3))
    configs = [(20, 0.5), (20, 0.7), (40, 0.5), (40, 0.7)]
    for (n, p), color in zip(configs, PALETTE):
        k = np.arange(0, n + 1)
        pmf = stats.binom.pmf(k, n, p)
        label = f"n={n}, p={p}"
        axes[0].plot(k, pmf, "o-", color=color, ms=3, lw=1.2, label=label)
        axes[1].plot(k, stats.binom.cdf(k, n, p), "o-", color=color, ms=3, lw=1.2, label=label)
    for ax, title in zip(axes, ["PMF", "CDF"]):
        ax.set_xlabel("k")
        ax.set_ylim(bottom=0)
        ax.set_title(f"Binomial {title}", fontsize=10, fontweight="semibold")
        ax.legend(fontsize=7.5)
    axes[0].set_ylabel("P(X = k)")
    axes[1].set_ylabel("P(X ≤ k)")
    fig.tight_layout()
    save(fig, "Binomial_distribution_pmf.svg")


# ── Poisson distribution ──────────────────────────────────────────────────────
def plot_poisson():
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    lambdas = [1, 4, 10, 0.5]
    labels = ["λ=1", "λ=4", "λ=10", "λ=0.5"]
    for lam, label, color in zip(lambdas, labels, PALETTE):
        k = np.arange(0, 22)
        ax.plot(k, stats.poisson.pmf(k, lam), "o-", color=color, ms=4, lw=1.5, label=label)
    ax.set_xlabel("k")
    ax.set_ylabel("P(X = k)")
    ax.set_ylim(bottom=0)
    ax.set_xlim(-0.5, 21.5)
    ax.legend()
    ax.set_title("Poisson Distribution PMF", fontsize=11, fontweight="semibold")
    fig.tight_layout()
    save(fig, "Poisson_pmf.svg")


# ── Exponential distribution ──────────────────────────────────────────────────
def plot_exponential():
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    thetas = [0.5, 1, 2, 4]
    x = np.linspace(0, 6, 300)
    for theta, color in zip(thetas, PALETTE):
        ax.plot(x, stats.expon.pdf(x, scale=theta), color=color, lw=1.8,
                label=f"θ={theta} (rate={1/theta:.2g})")
    ax.set_xlabel("x")
    ax.set_ylabel("f(x)")
    ax.set_ylim(bottom=0)
    ax.set_xlim(0)
    ax.legend()
    ax.set_title("Exponential Distribution PDF", fontsize=11, fontweight="semibold")
    fig.tight_layout()
    save(fig, "Exponential_pdf.svg")


# ── Gamma distribution ────────────────────────────────────────────────────────
def plot_gamma():
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    params = [(1, 1), (2, 1), (3, 1), (5, 2)]
    x = np.linspace(0, 20, 400)
    for (alpha, theta), color in zip(params, PALETTE):
        ax.plot(x, stats.gamma.pdf(x, a=alpha, scale=theta), color=color, lw=1.8,
                label=f"α={alpha}, θ={theta}")
    ax.set_xlabel("x")
    ax.set_ylabel("f(x)")
    ax.set_ylim(bottom=0)
    ax.set_xlim(0)
    ax.legend()
    ax.set_title("Gamma Distribution PDF", fontsize=11, fontweight="semibold")
    fig.tight_layout()
    save(fig, "Gamma_distribution_pdf.svg")


# ── Beta distribution ─────────────────────────────────────────────────────────
def plot_beta():
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    params = [(0.5, 0.5), (5, 1), (1, 3), (2, 5)]
    labels = ["α=0.5, β=0.5", "α=5, β=1", "α=1, β=3", "α=2, β=5"]
    x = np.linspace(0.001, 0.999, 300)
    for (a, b), label, color in zip(params, labels, PALETTE):
        ax.plot(x, stats.beta.pdf(x, a, b), color=color, lw=1.8, label=label)
    ax.set_xlabel("x")
    ax.set_ylabel("f(x)")
    ax.set_ylim(bottom=0)
    ax.set_xlim(0, 1)
    ax.legend()
    ax.set_title("Beta Distribution PDF", fontsize=11, fontweight="semibold")
    fig.tight_layout()
    save(fig, "Beta_distribution_pdf.svg")


# ── Lognormal distribution ────────────────────────────────────────────────────
def plot_lognormal():
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    params = [(0, 1), (0, 0.5), (0, 0.25), (1, 1)]
    labels = ["μ=0, σ=1", "μ=0, σ=0.5", "μ=0, σ=0.25", "μ=1, σ=1"]
    x = np.linspace(0.001, 6, 400)
    for (mu, sigma), label, color in zip(params, labels, PALETTE):
        ax.plot(x, stats.lognorm.pdf(x, s=sigma, scale=np.exp(mu)), color=color, lw=1.8, label=label)
    ax.set_xlabel("x")
    ax.set_ylabel("f(x)")
    ax.set_ylim(bottom=0)
    ax.set_xlim(0)
    ax.legend()
    ax.set_title("Lognormal Distribution PDF", fontsize=11, fontweight="semibold")
    fig.tight_layout()
    save(fig, "Lognormal_distribution_pdf.svg")


# ── Geometric distribution ────────────────────────────────────────────────────
def plot_geometric():
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    probs = [0.1, 0.25, 0.5, 0.75]
    k = np.arange(1, 16)
    for p, color in zip(probs, PALETTE):
        ax.plot(k, stats.geom.pmf(k, p), "o-", color=color, ms=4, lw=1.5, label=f"p={p}")
    ax.set_xlabel("k (trial of first success)")
    ax.set_ylabel("P(X = k)")
    ax.set_ylim(bottom=0)
    ax.set_xlim(0.5, 15.5)
    ax.legend()
    ax.set_title("Geometric Distribution PMF", fontsize=11, fontweight="semibold")
    fig.tight_layout()
    save(fig, "Geometric_pmf.svg")


# ── Hypergeometric distribution ───────────────────────────────────────────────
def plot_hypergeometric():
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    configs = [(500, 50, 100), (500, 60, 200), (500, 400, 100)]
    labels = ["N=500, K=50, n=100", "N=500, K=60, n=200", "N=500, K=400, n=100"]
    for (N, K, n), label, color in zip(configs, labels, PALETTE):
        lo = max(0, n + K - N)
        hi = min(n, K)
        k = np.arange(lo, hi + 1)
        ax.plot(k, stats.hypergeom.pmf(k, N, K, n), "o-", color=color, ms=3, lw=1.3, label=label)
    ax.set_xlabel("k")
    ax.set_ylabel("P(X = k)")
    ax.set_ylim(bottom=0)
    ax.legend(fontsize=7.5)
    ax.set_title("Hypergeometric Distribution PMF", fontsize=11, fontweight="semibold")
    fig.tight_layout()
    save(fig, "Hypergeometric_pmf.svg")


# ── Negative Binomial distribution ────────────────────────────────────────────
def plot_negative_binomial():
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    # k = number of trials to get r successes
    configs = [(1, 0.5), (2, 0.5), (5, 0.5), (5, 0.7)]
    labels = ["r=1, p=0.5", "r=2, p=0.5", "r=5, p=0.5", "r=5, p=0.7"]
    for (r, p), label, color in zip(configs, labels, PALETTE):
        k = np.arange(r, r + 25)
        # Number of trials until r-th success: k-1 choose r-1 * p^r * (1-p)^(k-r)
        pmf = stats.nbinom.pmf(k - r, r, p)
        ax.plot(k, pmf, "o-", color=color, ms=3, lw=1.3, label=label)
    ax.set_xlabel("k (total trials)")
    ax.set_ylabel("P(X = k)")
    ax.set_ylim(bottom=0)
    ax.legend()
    ax.set_title("Negative Binomial Distribution PMF", fontsize=11, fontweight="semibold")
    fig.tight_layout()
    save(fig, "Negative_binomial_pmf.svg")


if __name__ == "__main__":
    print("Generating illustrations…")
    plot_normal()
    plot_binomial()
    plot_poisson()
    plot_exponential()
    plot_gamma()
    plot_beta()
    plot_lognormal()
    plot_geometric()
    plot_hypergeometric()
    plot_negative_binomial()
    print("Done.")
