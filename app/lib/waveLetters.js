export function waveLetters(text, stepMs = 160) {
  let i = -1;
  return text.split(" ").map((word, wi) => (
    <span className="wave-word" key={wi}>
      {word.split("").map((ch, ci) => {
        i += 1;
        return (
          <span key={ci} style={{ transitionDelay: `${i * stepMs}ms` }}>
            {ch}
          </span>
        );
      })}
    </span>
  ));
}
