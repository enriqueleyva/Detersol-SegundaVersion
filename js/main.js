const motionOK = window.matchMedia(
	"(prefers-reduced-motion:no-preference)"
).matches;

if (motionOK) {
	gsap.utils
		.toArray("#quienes .wow-fade, #quienes h2, #quienes p, #quienes li")
		.forEach((el) => {
			gsap.to(el, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power2.out",
				scrollTrigger: { trigger: el, start: "top 85%" },
			});
		});
	// Logo: desenfoque → nítido
	gsap.fromTo(
		"#logoDetersol",
		{ filter: "blur(6px)", opacity: 0.1 },
		{ filter: "blur(0px)", opacity: 1, duration: 2, ease: "power2.out" }
	);

	// CTAs: revelado secuencial
	const ctaTL = gsap.timeline({ paused: true });
	ctaTL.fromTo(
		"#ctaLinks",
		{ y: 15, opacity: 0 },
		{
			y: 0,
			opacity: 1,
			duration: 0.8,
			ease: "power2.out",
			pointerEvents: "auto",
		}
	);

	// Lanzar CTAs tras la animación principal
	gsap.delayedCall(1, () => ctaTL.play());

	// Ocultarlas cuando el cursor sale del hero
	const hero = document.getElementById("heroZone");
	let hideTO;
	function hideCTAs() {
		clearTimeout(hideTO);
		hideTO = setTimeout(() => ctaTL.reverse(), 2000);
	}
	hero.addEventListener("mouseenter", () => {
		clearTimeout(hideTO);
		ctaTL.play();
	});
	hero.addEventListener("mousemove", () => {
		clearTimeout(hideTO);
	});
	hero.addEventListener("mouseleave", hideCTAs);
} else {
	// Reduce Motion: elementos estáticos
	document.getElementById("haloBicolor").style.opacity = ".30";
	const cta = document.getElementById("ctaLinks");
	cta.style.opacity = "1";
	cta.style.pointerEvents = "auto";
}

/* ---------- FILTRO DE MARCAS ---------- */
document.querySelectorAll(".filter-pill").forEach((btn) => {
	btn.addEventListener("click", () => {
		document.querySelector(".filter-pill.active")?.classList.remove("active");
		btn.classList.add("active");
		const val = btn.dataset.filter;
		document.querySelectorAll(".brand-card").forEach((card) => {
			card.style.display =
				val === "all" || card.classList.contains(val) ? "" : "none";
		});
	});
});

/* ---------- GSAP fade-up / stagger ---------- */
if (motionOK) {
	gsap.utils.toArray(".wow-brand").forEach((el) => {
		gsap.from(el, {
			opacity: 0,
			y: 30,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: { trigger: el, start: "top 85%" },
		});
	});

	gsap.utils.toArray(".wow-philo").forEach((el) => {
		gsap.from(el, {
			opacity: 0,
			y: 30,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: { trigger: el, start: "top 85%" },
		});
	});
}

/* GSAP fade-up */
if (motionOK) {
	gsap.utils.toArray(".wow-contact").forEach((el) => {
		gsap.from(el, {
			opacity: 0,
			y: 30,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: { trigger: el, start: "top 85%" },
		});
	});
}

/* Envío simulado + ripple re-uso */
document.getElementById("contactForm").addEventListener("submit", (e) => {
	e.preventDefault();

	// micro-ripple click se dispara automáticamente en btn, luego:
	const btn = e.target.querySelector("#btnEnviar");
	btn.disabled = true;
	btn.textContent = "Enviando…";

	setTimeout(() => {
		btn.textContent = "¡Gracias! Nos pondremos en contacto.";
		btn.classList.remove("btn-food"); // quita borde verde
		btn.style.background = "var(--sage)";
		btn.style.color = "#fff";
	}, 1200);
});

/* micro-ripple para cualquier .cta-btn ya existente */
document.querySelectorAll(".cta-btn").forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const ripple = document.createElement("span");
		ripple.className = "ripple";
		btn.appendChild(ripple);
		const d = Math.max(btn.clientWidth, btn.clientHeight);
		ripple.style.width = ripple.style.height = d + "px";
		ripple.style.left = e.offsetX - d / 2 + "px";
		ripple.style.top = e.offsetY - d / 2 + "px";
		gsap.fromTo(
			ripple,
			{ scale: 0, opacity: 0.35 },
			{
				scale: 1.6,
				opacity: 0,
				duration: 0.45,
				ease: "power1.out",
				onComplete: () => ripple.remove(),
			}
		);
	});
});
