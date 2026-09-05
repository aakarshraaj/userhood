import { useEffect, useRef } from "react";

export default function HeroSculpture() {
  const mountRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let teardown = () => {};

    void (async () => {
      const [THREE, { RoundedBoxGeometry }, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/geometries/RoundedBoxGeometry.js"),
        import("three/examples/jsm/environments/RoomEnvironment.js"),
      ]);

      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;

      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch {
        mount.dataset.webgl = "unavailable";
        return;
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      const clock = new THREE.Clock();
      const sculpture = new THREE.Group();
      const form = new THREE.Group();
      const pointer = new THREE.Vector2(0, 0);
      const targetPointer = new THREE.Vector2(0, 0);

      camera.position.set(0, 0.15, 12.25);
      scene.add(sculpture);
      sculpture.add(form);

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.3;
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.display = "block";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.width = "100%";
      mount.appendChild(renderer.domElement);

      const environmentGenerator = new THREE.PMREMGenerator(renderer);
      const environmentMap = environmentGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = environmentMap;
      scene.environmentIntensity = 0.82;
      environmentGenerator.dispose();

      const chrome = new THREE.MeshPhysicalMaterial({
        color: 0x171b20,
        metalness: 0.96,
        roughness: 0.17,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      });
      const darkChrome = new THREE.MeshPhysicalMaterial({
        color: 0x07090c,
        metalness: 0.9,
        roughness: 0.26,
        clearcoat: 0.85,
        clearcoatRoughness: 0.12,
      });
      const cyan = new THREE.MeshPhysicalMaterial({
        color: 0x00dce7,
        emissive: 0x00747b,
        emissiveIntensity: 1.55,
        metalness: 0.45,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
      });

      const pillarGeometry = new RoundedBoxGeometry(1.35, 5.15, 1.45, 8, 0.2);
      const bridgeGeometry = new RoundedBoxGeometry(5.55, 1.24, 1.45, 8, 0.2);
      const glowGeometry = new RoundedBoxGeometry(4.35, 0.22, 1.72, 6, 0.1);

      const leftPillar = new THREE.Mesh(pillarGeometry, chrome);
      const rightPillar = new THREE.Mesh(pillarGeometry, darkChrome);
      const bridge = new THREE.Mesh(bridgeGeometry, chrome);
      const innerGlow = new THREE.Mesh(glowGeometry, cyan);

      leftPillar.position.x = -2.1;
      rightPillar.position.x = 2.1;
      bridge.position.y = -1.92;
      innerGlow.position.set(0, -1.92, -0.54);

      form.add(leftPillar, rightPillar, innerGlow, bridge);
      form.rotation.set(-0.11, -0.34, -0.035);

      scene.add(new THREE.HemisphereLight(0xbfeeff, 0x050608, 1.55));

      const keyLight = new THREE.SpotLight(0xffffff, 95, 40, Math.PI / 5, 0.75, 1.5);
      keyLight.position.set(-6, 8, 8);
      keyLight.target = form;
      scene.add(keyLight, keyLight.target);

      const cyanLight = new THREE.PointLight(0x00f5ff, 72, 18, 2);
      cyanLight.position.set(0, -1.2, -3.5);
      scene.add(cyanLight);

      const rimLight = new THREE.PointLight(0x697cff, 44, 16, 2);
      rimLight.position.set(5, 1.5, 2.5);
      scene.add(rimLight);

      const warmLight = new THREE.PointLight(0xff4f53, 22, 13, 2);
      warmLight.position.set(-4, -4, 1);
      scene.add(warmLight);

      let formState: "u" | "h" = "u";
      let targetBridgeY = -1.92;
      let targetTurn = -0.34;
      let elapsed = 0;
      let lastChange = 0;
      let frame = 0;
      let isVisible = true;

      const changeForm = () => {
        formState = formState === "u" ? "h" : "u";
        targetBridgeY = formState === "h" ? 0 : -1.92;
        targetTurn = formState === "h" ? 0.34 : -0.34;
        lastChange = elapsed;
        mount.setAttribute("aria-label", `Interactive Userhood sculpture showing ${formState.toUpperCase()}. Activate to change its form.`);

        if (reducedMotion) {
          bridge.position.y = targetBridgeY;
          innerGlow.position.y = targetBridgeY;
          form.rotation.y = targetTurn;
          renderer.render(scene, camera);
        }
      };

      const resize = () => {
        const { width, height } = mount.getBoundingClientRect();
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        renderer.render(scene, camera);
      };

      const handlePointerMove = (event: PointerEvent) => {
        const bounds = mount.getBoundingClientRect();
        targetPointer.set(
          ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
          ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
        );
      };

      const handlePointerLeave = () => targetPointer.set(0, 0);
      const handleActivation = () => changeForm();

      const resizeObserver = new ResizeObserver(resize);
      const visibilityObserver = new IntersectionObserver((entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      });

      resizeObserver.observe(mount);
      visibilityObserver.observe(mount);
      mount.addEventListener("pointermove", handlePointerMove);
      mount.addEventListener("pointerleave", handlePointerLeave);
      mount.addEventListener("click", handleActivation);
      resize();

      const animate = () => {
        frame = window.requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (!isVisible || document.hidden) return;

        elapsed += delta;

        if (!reducedMotion && elapsed - lastChange > 5.4) changeForm();

        pointer.lerp(targetPointer, 0.055);
        const response = 1 - Math.pow(0.001, delta);
        bridge.position.y = THREE.MathUtils.lerp(bridge.position.y, targetBridgeY, response);
        innerGlow.position.y = THREE.MathUtils.lerp(innerGlow.position.y, targetBridgeY, response);
        form.rotation.y = THREE.MathUtils.lerp(form.rotation.y, targetTurn + pointer.x * 0.16, response * 0.75);
        form.rotation.x = THREE.MathUtils.lerp(form.rotation.x, -0.11 - pointer.y * 0.11, response * 0.75);
        sculpture.position.y = Math.sin(elapsed * 0.68) * 0.14;
        sculpture.rotation.z = Math.sin(elapsed * 0.43) * 0.027;
        cyanLight.intensity = 67 + Math.sin(elapsed * 1.35) * 7;

        renderer.render(scene, camera);
      };

      if (reducedMotion) {
        renderer.render(scene, camera);
      } else {
        animate();
      }

      teardown = () => {
        window.cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        mount.removeEventListener("pointermove", handlePointerMove);
        mount.removeEventListener("pointerleave", handlePointerLeave);
        mount.removeEventListener("click", handleActivation);
        pillarGeometry.dispose();
        bridgeGeometry.dispose();
        glowGeometry.dispose();
        chrome.dispose();
        darkChrome.dispose();
        cyan.dispose();
        environmentMap.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      teardown();
    };
  }, []);

  return (
    <button
      ref={mountRef}
      type="button"
      className="relative block h-[430px] w-full cursor-grab appearance-none overflow-hidden bg-transparent p-0 active:cursor-grabbing xl:h-[540px]"
      aria-label="Interactive Userhood U and H sculpture. Activate to change its form."
    />
  );
}
