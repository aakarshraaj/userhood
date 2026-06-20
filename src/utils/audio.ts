let audioCtx: AudioContext | null = null;
let isMuted = localStorage.getItem("sound_muted") === "true";

export function toggleMute(): boolean {
  isMuted = !isMuted;
  localStorage.setItem("sound_muted", String(isMuted));
  return isMuted;
}

export function getMuteState(): boolean {
  return isMuted;
}

export function playTick() {
  if (isMuted) return;

  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime); // High pitch click
    osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.02, audioCtx.currentTime); // Soft, quiet volume
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch (e) {
    // Silent catch if audio is blocked by user gesture
  }
}
