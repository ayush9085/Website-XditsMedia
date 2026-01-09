// Prevent multiple initializations (global guard)
if (!window._xditsWebGLInitialized) {
  window._xditsWebGLInitialized = true;

  const canvas = document.getElementById("webgl-bg");
  // Check if canvas exists and WebGL is available
  if (canvas && window.THREE) {
    // Check for WebGL support
    let webglAvailable = true;
    try {
      const testCanvas = document.createElement('canvas');
      webglAvailable = !!(window.WebGLRenderingContext && 
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
    } catch (e) {
      webglAvailable = false;
    }

    if (webglAvailable) {
      /* ================= SCENE ================= */
      const scene = new THREE.Scene();

      /* ================= CAMERA ================= */
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      camera.position.z = 360;

      /* ================= RENDERER ================= */
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false  // Important: don't preserve buffer to prevent accumulation
        });
        // Set initial canvas size to viewport dimensions
        const updateCanvasSize = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          renderer.setSize(width, height);
          // Explicitly set canvas style dimensions for mobile
          canvas.style.width = width + 'px';
          canvas.style.height = height + 'px';
        };
        updateCanvasSize();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.autoClear = true;
        renderer.setClearColor(0x000000, 0);  // Transparent clear
      } catch (e) {
        console.warn("WebGL renderer failed to initialize:", e);
        canvas.style.display = 'none';
      }

      if (renderer) {
        // ================= COMET TEXTURE =================
        function createCometTexture() {
          const size = 128;
          const c = document.createElement("canvas");
          c.width = size;
          c.height = size;
          const ctx = c.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, size);
          gradient.addColorStop(0.0, "rgba(255,255,255,1)");
          gradient.addColorStop(0.3, "rgba(200,160,255,0.9)");
          gradient.addColorStop(0.65, "rgba(138,46,255,0.35)");
          gradient.addColorStop(1.0, "rgba(138,46,255,0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, size, size);
          const texture = new THREE.CanvasTexture(c);
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          return texture;
        }
        const cometTexture = createCometTexture();
        // ================= CONFIG =================
        function getCometCount() {
          const width = window.innerWidth;
          if (width < 480) return 8;
          if (width < 768) return 12;
          return 20;
        }
        const CONFIG = {
          SPEED_MIN: 1.2,
          SPEED_MAX: 2.2,
          LENGTH_MIN: 60,
          LENGTH_MAX: 120,
          WIDTH: 3,
          DEPTH_MIN: -400,
          DEPTH_MAX: 100,
          DIR_X: 0.87,
          DIR_Y: 0.49
        };
        // ================= MATERIAL =================
        const material = new THREE.MeshBasicMaterial({
          map: cometTexture,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        // ================= COMETS =================
        const comets = [];
        let targetCometCount = getCometCount();
        function createComet(initial = false) {
          const length = CONFIG.LENGTH_MIN + Math.random() * (CONFIG.LENGTH_MAX - CONFIG.LENGTH_MIN);
          const geometry = new THREE.PlaneGeometry(CONFIG.WIDTH, length);
          const comet = new THREE.Mesh(geometry, material);
          resetComet(comet, initial);
          scene.add(comet);
          comets.push(comet);
          return comet;
        }
        function removeComet() {
          if (comets.length > 0) {
            const comet = comets.pop();
            scene.remove(comet);
            comet.geometry.dispose();
          }
        }
        for (let i = 0; i < targetCometCount; i++) {
          createComet(true);
        }
        // ================= RESET =================
        function resetComet(comet, initial = false) {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          if (initial) {
            comet.position.x = (Math.random() - 0.5) * vw;
            comet.position.y = (Math.random() - 0.5) * vh;
          } else {
            if (Math.random() > 0.5) {
              comet.position.x = -vw / 2 - 50 - Math.random() * 200;
              comet.position.y = (Math.random() - 0.3) * vh;
            } else {
              comet.position.x = -vw / 2 + Math.random() * vw * 0.7;
              comet.position.y = -vh / 2 - 50 - Math.random() * 200;
            }
          }
          comet.position.z = CONFIG.DEPTH_MIN + Math.random() * (CONFIG.DEPTH_MAX - CONFIG.DEPTH_MIN);
          comet.userData.speed = CONFIG.SPEED_MIN + Math.random() * (CONFIG.SPEED_MAX - CONFIG.SPEED_MIN);
          comet.rotation.z = Math.atan2(CONFIG.DIR_Y, CONFIG.DIR_X) - Math.PI / 2;
        }
        // ================= ANIMATION =================
        let animationId;
        let isVisible = true;
        function animate() {
          if (!isVisible) {
            animationId = requestAnimationFrame(animate);
            return;
          }
          animationId = requestAnimationFrame(animate);
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          for (const comet of comets) {
            const s = comet.userData.speed;
            comet.position.x += CONFIG.DIR_X * s;
            comet.position.y += CONFIG.DIR_Y * s;
            if (
              comet.position.y > vh / 2 + 200 ||
              comet.position.x > vw / 2 + 200
            ) {
              resetComet(comet);
            }
          }
          renderer.clear();
          renderer.render(scene, camera);
        }
        animate();
        // ================= VISIBILITY =================
        document.addEventListener("visibilitychange", () => {
          isVisible = !document.hidden;
        });
        // ================= RESIZE =================
        let resizeTimeout;
        window.addEventListener("resize", () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            const newCount = getCometCount();
            while (comets.length < newCount) {
              createComet(true);
            }
            while (comets.length > newCount) {
              removeComet();
            }
          }, 150);
        });
        window.addEventListener("orientationchange", () => {
          setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          }, 300);
        });
      }
    }
  }
}
