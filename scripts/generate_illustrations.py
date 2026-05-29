"""Generate SVG illustration plots for Exam P and FM concept pages."""

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


# ── Central Limit Theorem ─────────────────────────────────────────────────────
def plot_clt():
    rng = np.random.default_rng(42)
    fig, axes = plt.subplots(1, 4, figsize=(9, 3), sharey=False)
    ns = [1, 2, 5, 30]
    titles = ["n=1\n(Uniform)", "n=2", "n=5", "n=30\n(≈ Normal)"]
    for ax, n, title in zip(axes, ns, titles):
        samples = rng.uniform(0, 1, (50_000, n)).mean(axis=1)
        ax.hist(samples, bins=40, density=True, color="#2563eb", alpha=0.75, edgecolor="none")
        ax.set_title(title, fontsize=9, fontweight="semibold")
        ax.set_xlabel("x̄", fontsize=9)
        ax.tick_params(labelsize=8)
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
        if n == 30:
            mu, sigma = 0.5, 1 / (12**0.5 * n**0.5)
            xg = np.linspace(0.2, 0.8, 200)
            ax.plot(xg, stats.norm.pdf(xg, mu, sigma), "r-", lw=1.5, label="N(μ,σ²/n)")
            ax.legend(fontsize=7.5)
    axes[0].set_ylabel("Density", fontsize=9)
    fig.suptitle("Central Limit Theorem — Sample Mean of Uniform(0,1)", fontsize=10, fontweight="semibold", y=1.02)
    fig.tight_layout()
    save(fig, "Central_limit_theorem.svg")


# ── Correlation coefficient ────────────────────────────────────────────────────
def plot_correlation():
    rng = np.random.default_rng(7)
    rhos = [-1, -0.8, -0.4, 0, 0.4, 0.8, 1]
    fig, axes = plt.subplots(1, 7, figsize=(12, 2.2))
    n = 300
    for ax, rho in zip(axes, rhos):
        cov = [[1, rho], [rho, 1]]
        xy = rng.multivariate_normal([0, 0], cov, n)
        ax.scatter(xy[:, 0], xy[:, 1], s=4, alpha=0.5, color="#2563eb", linewidths=0)
        ax.set_title(f"ρ={rho}", fontsize=8.5, fontweight="semibold")
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_aspect("equal")
        ax.spines[:].set_linewidth(0.5)
    fig.suptitle("Pearson Correlation Coefficient", fontsize=10, fontweight="semibold", y=1.05)
    fig.tight_layout(w_pad=0.3)
    save(fig, "Correlation_examples.svg")


# ── Bayes' Theorem ────────────────────────────────────────────────────────────
def plot_bayes():
    """Visualise Bayes' theorem as a 2-D probability area diagram."""
    fig, ax = plt.subplots(figsize=(5, 3.8))

    # P(H)=0.2, P(E|H)=0.8, P(E|¬H)=0.2
    pH = 0.2
    pEnH = 0.8
    pEnNH = 0.2

    # Draw the unit square split at x=pH (prior)
    ax.add_patch(plt.Rectangle((0, 0), pH, 1, facecolor="#bfdbfe", edgecolor="white", lw=0.5))
    ax.add_patch(plt.Rectangle((pH, 0), 1 - pH, 1, facecolor="#fecaca", edgecolor="white", lw=0.5))

    # Shade the likelihood regions
    ax.add_patch(plt.Rectangle((0, 0), pH, pEnH, facecolor="#1d4ed8", alpha=0.8, edgecolor="white", lw=0.5))
    ax.add_patch(plt.Rectangle((pH, 0), 1 - pH, pEnNH, facecolor="#b91c1c", alpha=0.5, edgecolor="white", lw=0.5))

    # Labels
    ax.text(pH / 2, 1.03, "P(H)", ha="center", fontsize=9, color="#1d4ed8", fontweight="bold")
    ax.text(pH + (1 - pH) / 2, 1.03, "P(¬H)", ha="center", fontsize=9, color="#b91c1c", fontweight="bold")

    ax.text(pH / 2, pEnH / 2, "P(E|H)·P(H)\n= posterior × P(E)",
            ha="center", va="center", fontsize=7.5, color="white", fontweight="bold")
    ax.text(pH + (1 - pH) / 2, pEnNH / 2, "P(E|¬H)·P(¬H)",
            ha="center", va="center", fontsize=7.5, color="white", fontweight="bold")

    ax.axhline(pEnH, xmax=pH, color="#1d4ed8", lw=0.8, ls="--")
    ax.axhline(pEnNH, xmin=pH, color="#b91c1c", lw=0.8, ls="--")
    ax.axvline(pH, color="gray", lw=1)

    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1.15)
    ax.set_xticks([0, pH, 1])
    ax.set_xticklabels(["0", f"P(H)={pH}", "1"])
    ax.set_yticks([0, pEnNH, pEnH, 1])
    ax.set_yticklabels(["0", f"P(E|¬H)\n={pEnNH}", f"P(E|H)\n={pEnH}", "1"], fontsize=7.5)
    ax.set_xlabel("Prior probability of H", fontsize=9)
    ax.set_title("Bayes' Theorem — Area Visualisation", fontsize=10, fontweight="semibold")

    # P(H|E) arrow
    post = (pEnH * pH) / (pEnH * pH + pEnNH * (1 - pH))
    ax.annotate(f"P(H|E) = {post:.2f}", xy=(post * pH, 0.02),
                xytext=(0.55, 0.15), fontsize=8, color="#1d4ed8",
                arrowprops=dict(arrowstyle="->", color="#1d4ed8", lw=0.8))

    fig.tight_layout()
    save(fig, "Bayes_theorem_visualisation.svg")


# ── Yield curve ───────────────────────────────────────────────────────────────
def plot_yield_curve():
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    maturities = np.array([0.25, 0.5, 1, 2, 3, 5, 7, 10, 20, 30])
    normal = [4.0, 4.1, 4.2, 4.35, 4.5, 4.75, 4.95, 5.1, 5.3, 5.4]
    inverted = [5.4, 5.3, 5.1, 4.9, 4.7, 4.4, 4.2, 4.0, 3.7, 3.6]
    flat = [4.7] * len(maturities)

    ax.plot(maturities, normal, "o-", color="#16a34a", lw=2, ms=4, label="Normal (upward-sloping)")
    ax.plot(maturities, flat, "s--", color="#2563eb", lw=1.8, ms=4, label="Flat")
    ax.plot(maturities, inverted, "^-", color="#dc2626", lw=2, ms=4, label="Inverted (downward-sloping)")

    ax.set_xlabel("Maturity (years)")
    ax.set_ylabel("Yield (%)")
    ax.set_xscale("log")
    ax.set_xticks([0.25, 1, 2, 5, 10, 30])
    ax.get_xaxis().set_major_formatter(matplotlib.ticker.ScalarFormatter())
    ax.legend(loc="center right")
    ax.set_title("Yield Curve Shapes", fontsize=11, fontweight="semibold")
    fig.tight_layout()
    save(fig, "Yield_curve_types.svg")


if __name__ == "__main__":
    import matplotlib.ticker
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
    plot_clt()
    plot_correlation()
    plot_bayes()
    plot_yield_curve()
    print("Done.")
